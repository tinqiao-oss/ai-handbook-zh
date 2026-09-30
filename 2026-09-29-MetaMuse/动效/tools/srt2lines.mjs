// SRT 字幕 → src/episode/lines.ts (时间轴的唯一数据源).
// 用法: node tools/srt2lines.mjs <字幕.srt> [输出=src/episode/lines.ts]
//   或: npm run lines -- <字幕.srt>
// 之后分镜里就可以用 LF(第几句) / at(第几句, '某个词') 取帧号. 句号 n 与 SRT 的顺序一致, 从 1 起.
// 提示: 语音识别出来的字幕常有错字, 先在 SRT 里改对再转; at() 按字找词, 错字会导致找不到而报错.
// 任何一段解析失败都会停下报错, 不会覆盖已有的 lines.ts.
import fs from 'fs';

const [, , srtPath, outPath = 'src/episode/lines.ts'] = process.argv;
if (!srtPath) {
  console.log('用法: node tools/srt2lines.mjs <字幕.srt> [输出路径]');
  process.exit(1);
}
const toSec = (t) => {
  const m = /^(\d+):(\d{1,2}):(\d{1,2})[,.](\d{1,3})$/.exec(t.trim());
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 10 ** m[4].length : NaN;
};
const text = fs.readFileSync(srtPath, 'utf8').replace(/^﻿/, '').replace(/\r/g, '');
const lines = [];
const errors = [];
text
  .split(/\n\s*\n/)
  .map((b) => b.trim())
  .filter(Boolean)
  .forEach((block, k) => {
    const rows = block.split('\n');
    const ti = rows.findIndex((r) => r.includes('-->'));
    if (ti < 0) return errors.push(`第 ${k + 1} 段没有时间行 (xx:xx:xx,xxx --> xx:xx:xx,xxx): ${rows[0]}`);
    const [a, b] = rows[ti].split('-->').map(toSec);
    const t = rows.slice(ti + 1).join('').trim();
    if (!(a >= 0) || !(b > a)) return errors.push(`第 ${k + 1} 段时间不对: ${rows[ti]}`);
    if (!t) return errors.push(`第 ${k + 1} 段没有文字: ${rows[ti]}`);
    const prev = lines[lines.length - 1];
    if (prev && a < prev[0]) errors.push(`第 ${k + 1} 段比上一段开始得还早 (字幕要按时间顺序): ${rows[ti]}`);
    lines.push([Math.round(a * 1000) / 1000, Math.round(b * 1000) / 1000, t]);
  });
if (!lines.length) errors.push('一句字幕都没读到, 请确认这是 SRT 文件');
if (errors.length) {
  console.error(`没有写入 ${outPath} (原文件保持不变), 请先改好字幕:\n  ` + errors.join('\n  '));
  process.exit(1);
}
const src = `// 全片字幕 (由 SRT 生成: tools/srt2lines.mjs), [开始秒, 结束秒, 文本]\nimport type { Line } from '../engine/timeline';\n\nexport const FULL_LINES: Line[] = ${JSON.stringify(lines)};\n`;
fs.writeFileSync(outPath, src);
console.log(`写好 ${outPath}: ${lines.length} 句, 最后一句结束于 ${lines.at(-1)[1]} 秒`);
