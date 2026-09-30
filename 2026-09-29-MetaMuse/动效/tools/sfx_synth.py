"""程序合成的 UI 音效 (全部原创, 无授权问题). 输出 48kHz 立体声 WAV 到 public/sfx/.

python tools/sfx_synth.py
"""
import os
import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(32)


def t_axis(dur):
    return np.arange(int(SR * dur)) / SR


def env_adsr(n, a, d, s_level, r, total):
    """简单包络 (秒)"""
    t = np.arange(n) / SR
    e = np.zeros(n)
    a_n = max(1, int(a * SR))
    d_n = int(d * SR)
    r_n = int(r * SR)
    s_n = max(0, n - a_n - d_n - r_n)
    e[:a_n] = np.linspace(0, 1, a_n) ** 1.5
    e[a_n:a_n + d_n] = np.linspace(1, s_level, d_n)
    e[a_n + d_n:a_n + d_n + s_n] = s_level
    e[a_n + d_n + s_n:] = np.linspace(s_level, 0, n - (a_n + d_n + s_n)) ** 2
    return e


def pink(n):
    w = rng.normal(0, 1, n)
    b, a = [0.049922035, -0.095993537, 0.050612699, -0.004408786], [1, -2.494956002, 2.017265875, -0.522189400]
    return signal.lfilter(b, a, w)


def bandpass(x, lo, hi, order=4):
    sos = signal.butter(order, [lo, hi], btype="band", fs=SR, output="sos")
    return signal.sosfilt(sos, x)


def lowpass(x, f, order=4):
    return signal.sosfilt(signal.butter(order, f, btype="low", fs=SR, output="sos"), x)


def highpass(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, btype="high", fs=SR, output="sos"), x)


def sweep_filter(x, f0, f1, q=1.2, curve=1.0):
    """时变带通: 用 STFT 在频域乘一个随时间移动的高斯带"""
    f, t, Z = signal.stft(x, SR, nperseg=1024, noverlap=768)
    T = len(t)
    centers = f0 * (f1 / f0) ** (np.linspace(0, 1, T) ** curve)
    mask = np.exp(-0.5 * (np.log(np.maximum(f[:, None], 1) / centers[None, :]) / (0.55 / q)) ** 2)
    _, y = signal.istft(Z * mask, SR, nperseg=1024, noverlap=768)
    return y[: len(x)]


def reverb(x, decay=0.25, mix=0.18):
    """便宜的混响: 指数衰减噪声卷积; 输出比输入长 (保留尾巴, 不硬截断)"""
    n = int(decay * SR * 2)
    ir = rng.normal(0, 1, n) * np.exp(-np.arange(n) / (decay * SR))
    ir = lowpass(ir, 5000)
    ir /= np.sqrt(np.sum(ir ** 2))
    k = min(len(x), int(0.004 * SR))
    x = x.copy()
    x[-k:] *= np.linspace(1, 0, k)  # 干声结尾先淡出
    wet = signal.fftconvolve(x, ir)
    dry = np.concatenate([x, np.zeros(len(wet) - len(x))])
    return dry * (1 - mix) + wet * mix


def stereo(mono, pan=0.0, width=0.0):
    """pan: -1 左 ~ 1 右 (可为数组); width: 左右轻微差异"""
    pan = np.asarray(pan, float)
    if pan.ndim and len(pan) != len(mono):
        pan = np.interp(np.linspace(0, 1, len(mono)), np.linspace(0, 1, len(pan)), pan)
    l = mono * np.sqrt((1 - pan) / 2)
    r = mono * np.sqrt((1 + pan) / 2)
    if width > 0:
        d = int(width * SR)
        r = np.concatenate([np.zeros(d), r[:-d]]) if d > 0 else r
    return np.stack([l, r], 1)


def save(name, st, peak_db=-3.0, tail=0.05):
    st = np.asarray(st, float)
    if st.ndim == 1:
        st = stereo(st)
    pad = np.zeros((int(tail * SR), 2))
    st = np.concatenate([st, pad])
    peak = np.max(np.abs(st)) + 1e-9
    st = st / peak * (10 ** (peak_db / 20))
    # 头尾 2ms 淡入淡出, 防爆音
    k = int(0.002 * SR)
    st[:k] *= np.linspace(0, 1, k)[:, None]
    st[-k:] *= np.linspace(1, 0, k)[:, None]
    wavfile.write(os.path.join(OUT, name + ".wav"), SR, (st * 32767).astype(np.int16))
    print("sfx", name, f"{len(st) / SR:.2f}s")


# ---------- 呼啸 (页面滑入) ----------
def whoosh(dur=0.55, f0=250, f1=3200, rise=0.45, name="whoosh", pan_from=-0.6, pan_to=0.6, bright=1.0):
    n = int(dur * SR)
    x = pink(n) * 0.8 + rng.normal(0, 1, n) * 0.2
    x = sweep_filter(x, f0, f1 * bright, q=1.1, curve=0.8)
    t = np.linspace(0, 1, n)
    e = np.where(t < rise, (t / rise) ** 2, ((1 - t) / (1 - rise)) ** 1.6)
    x *= e
    x += lowpass(rng.normal(0, 1, n), 180) * e * 0.35  # 低频气流
    x = reverb(x, 0.18, 0.2)
    pan = pan_from + (pan_to - pan_from) * t
    save(name, stereo(x, pan))


whoosh(0.55, 260, 3200, 0.5, "whoosh_in")
whoosh(0.42, 2600, 300, 0.25, "whoosh_out", 0.5, -0.5)
whoosh(0.9, 180, 2400, 0.62, "whoosh_long", -0.8, 0.8)
whoosh(0.28, 900, 5000, 0.4, "swish", -0.3, 0.3, 1.0)


# ---------- 点击 / 滴答 ----------
def click(name="click", f=2200, dur=0.06, noise_band=(2500, 9000), body=0.6, peak=-3):
    n = int(dur * SR)
    t = t_axis(dur)
    nz = bandpass(rng.normal(0, 1, n), *noise_band) * np.exp(-t / 0.004)
    tone = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.012) * body
    thump = np.sin(2 * np.pi * 180 * t) * np.exp(-t / 0.02) * 0.35
    x = nz + tone + thump
    save(name, stereo(reverb(x, 0.08, 0.12), 0.0, 0.0004), peak)


click("click", 2100)
click("tick", 3400, 0.04, (4000, 12000), 0.35)
click("click_soft", 1400, 0.07, (1500, 6000), 0.8)

# 打字键 (5 个变体, 随机轮换)
for i in range(5):
    f = 1600 + rng.uniform(-300, 400)
    click(f"key{i}", f, 0.05, (1800 + rng.uniform(-200, 600), 8000), 0.5 + rng.uniform(-0.1, 0.1))


# ---------- 弹出 (数字/卡片出现) ----------
def pop(name="pop", f0=720, f1=260, dur=0.12):
    t = t_axis(dur)
    f = f1 + (f0 - f1) * np.exp(-t / 0.018)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) * np.exp(-t / 0.035)
    x += bandpass(rng.normal(0, 1, len(t)), 1500, 7000) * np.exp(-t / 0.003) * 0.4
    save(name, stereo(reverb(x, 0.12, 0.15)))


pop("pop", 760, 280)
pop("pop_hi", 1100, 520, 0.1)
pop("pop_lo", 520, 160, 0.16)


# ---------- 提示铃 (高光) ----------
def ding(name="ding", f=1568.0, dur=1.3, ratio=2.0, idx=1.6):
    t = t_axis(dur)
    I = idx * np.exp(-t / 0.25)
    x = np.sin(2 * np.pi * f * t + I * np.sin(2 * np.pi * f * ratio * t)) * np.exp(-t / 0.45)
    x += 0.35 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / 0.18)
    x += 0.2 * np.sin(2 * np.pi * f * 0.5 * t) * np.exp(-t / 0.6)
    x *= np.minimum(1, t / 0.004)
    save(name, stereo(reverb(x, 0.35, 0.25), 0.0, 0.0006), -5)


ding("ding")
ding("ding_lo", 1046.5, 1.4, 2.0, 1.2)


# ---------- 划线 (删除线/打叉) ----------
def swipe(name="swipe", dur=0.22):
    n = int(dur * SR)
    x = sweep_filter(rng.normal(0, 1, n), 7000, 1200, q=1.6, curve=1.0)
    t = np.linspace(0, 1, n)
    x *= np.sin(np.pi * t) ** 0.8
    save(name, stereo(x, -0.4 + 0.8 * t), -4)


swipe("swipe")


# ---------- 低沉落定 (章节/大数字) ----------
def thud(name="thud", dur=0.5):
    t = t_axis(dur)
    f = 55 + 70 * np.exp(-t / 0.05)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) * np.exp(-t / 0.16)
    x += lowpass(rng.normal(0, 1, len(t)), 900) * np.exp(-t / 0.02) * 0.5
    x = np.tanh(x * 1.6)
    save(name, stereo(reverb(x, 0.3, 0.22)), -4)


thud("thud")


# ---------- 上升 (章节前的铺垫) ----------
def riser(name="riser", dur=1.4):
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    x = sweep_filter(pink(n), 200, 6000, q=0.9, curve=1.6) * t ** 2.2
    f = 180 * (8 ** (t ** 1.4))
    x += 0.25 * np.sin(2 * np.pi * np.cumsum(f) / SR) * t ** 2
    x *= np.minimum(1, (1 - t) / 0.03)
    save(name, stereo(reverb(x, 0.3, 0.2), (t - 0.5) * 0.6), -6)


riser("riser")


# ---------- 数据流 (条形图增长时的细碎声) ----------
def data_run(name="data_run", dur=0.7):
    n = int(dur * SR)
    x = np.zeros(n)
    k = 0
    while k < n - 2000:
        f = 2500 + rng.uniform(-600, 1800) * (k / n)
        m = int(0.012 * SR)
        tt = np.arange(m) / SR
        x[k:k + m] += np.sin(2 * np.pi * f * tt) * np.exp(-tt / 0.004) * rng.uniform(0.4, 1)
        k += int(rng.uniform(0.018, 0.035) * SR)
    t = np.linspace(0, 1, n)
    x *= np.minimum(1, t / 0.1) * np.minimum(1, (1 - t) / 0.2)
    save(name, stereo(reverb(x, 0.1, 0.15), (t - 0.5) * 0.8), -8)


data_run("data_run")

print("done ->", os.path.abspath(OUT))
