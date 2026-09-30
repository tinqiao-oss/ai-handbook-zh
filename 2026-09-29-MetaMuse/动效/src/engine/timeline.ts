// 口播时间轴: 把「第 n 句」「第 n 句里的某个词」换算成帧号.
// 所有元素的出现时刻都用它来写, 这样换一版口播 (字幕时间变了) 时, 画面会自动跟着对齐.
import { FPS } from './config';

/** 一句字幕: [开始秒, 结束秒, 文本]. 由 SRT 生成 (tools/srt2lines.mjs), 句号 n 从 1 起 */
export type Line = [number, number, string];

// 字的「音节权重」: 汉字 1, 字母 0.3, 数字 0.5, 标点 0. 句内按权重均分时间, 估出某个词开始念出的时刻
const weight = (ch: string) => {
  if (/[一-鿿]/.test(ch)) return 1;
  if (/[A-Za-z]/.test(ch)) return 0.3;
  if (/[0-9]/.test(ch)) return 0.5;
  return 0;
};

export const makeTimeline = (lines: Line[]) => {
  const sec = (s: number) => Math.round(s * FPS);
  const line = (n: number) => {
    const l = lines[n - 1];
    if (!l) throw new Error(`没有第 ${n} 句 (共 ${lines.length} 句)`);
    return l;
  };
  /** 第 n 句的起止帧 */
  const L = (n: number) => ({ from: sec(line(n)[0]), to: sec(line(n)[1]) });
  /** 第 n 句开始的帧 */
  const LF = (n: number) => L(n).from;
  /** 第 n 句结束的帧 */
  const LT = (n: number) => L(n).to;
  /** 第 n 句里 needle 开始念出的帧 (第 occ 次出现, 从 0 起). 句子里没有这个词会直接报错, 防止写错字悄悄错位 */
  const at = (n: number, needle: string, occ = 0): number => {
    const [s, e, t] = line(n);
    if (!Number.isInteger(occ) || occ < 0) throw new Error(`at() 的 occ 要是 0 起的整数, 收到 ${occ}`);
    let idx = -1;
    for (let k = 0; k <= occ; k++) {
      idx = t.indexOf(needle, idx + 1);
      if (idx < 0) throw new Error(`第 ${n} 句里没有第 ${k + 1} 个「${needle}」: ${t}`);
    }
    const total = [...t].reduce((a, c) => a + weight(c), 0);
    const before = [...t.slice(0, idx)].reduce((a, c) => a + weight(c), 0);
    return sec(s + (e - s) * (before / total));
  };
  /** 当前帧该显示哪句字幕 (句尾留 6 帧, 避免字幕闪断) */
  const lineAt = (frame: number): string | null => {
    for (let i = 0; i < lines.length; i++) {
      const a = sec(lines[i][0]);
      const next = i + 1 < lines.length ? sec(lines[i + 1][0]) : Infinity;
      const b = Math.min(sec(lines[i][1]) + 6, next);
      if (frame >= a && frame < b) return lines[i][2];
    }
    return null;
  };
  return { sec, L, LF, LT, at, lineAt };
};
