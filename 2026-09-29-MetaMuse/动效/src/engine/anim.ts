import { Easing, interpolate, spring } from 'remotion';
import { FPS } from './config';

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const E = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // expo-ish out, 苹果式
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.55, 0, 1, 0.45),
  outBack: Easing.bezier(0.34, 1.56, 0.64, 1),
  soft: Easing.bezier(0.25, 0.1, 0.25, 1),
  linear: (t: number) => t,
};

/** frame 在 [a,b] 间的进度 0..1 (带缓动, 两端钳制) */
export const prog = (frame: number, a: number, b: number, ease = E.out) =>
  interpolate(frame, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

/** 值域映射 (钳制) */
export const map = (frame: number, input: number[], output: number[], ease?: (t: number) => number) =>
  interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    ...(ease ? { easing: ease } : {}),
  });

/** 弹簧 0..1 (从 start 帧开始) */
export const spr = (frame: number, start: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) =>
  spring({
    frame: frame - start,
    fps: FPS,
    config: { damping: cfg.damping ?? 18, stiffness: cfg.stiffness ?? 140, mass: cfg.mass ?? 1 },
  });

/** 出现+消失包络: [in, in+fi] 淡入, [out-fo, out] 淡出 */
export const env = (frame: number, a: number, b: number, fi = 14, fo = 14) =>
  Math.min(prog(frame, a, a + fi, E.soft), 1 - prog(frame, b - fo, b, E.soft));

/** 在区间内? */
export const within = (frame: number, a: number, b: number) => frame >= a && frame < b;

/** 数字滚动 (整数/小数) */
export const count = (frame: number, a: number, b: number, to: number, decimals = 0, ease = E.out) => {
  const v = to * prog(frame, a, b, ease);
  return v.toFixed(decimals);
};

/** 伪随机但确定的数 (与 remotion random 等价思路, 这里用简单 hash 以便在纯函数里用) */
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
