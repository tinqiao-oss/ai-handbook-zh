import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

// 全部是开源字体, 许可证在 public/fonts/LICENSES/:
//   思源黑体 / 思源宋体 (Noto Sans SC / Noto Serif SC, OFL-1.1) —— 已裁剪到 GB2312 常用字 + 常用符号, 文件更小;
//     生僻字会缺字, 需要时从 Google Fonts 下载完整版替换同名文件即可
//   Inter / Inter Display (OFL-1.1), Instrument Serif (OFL-1.1), Geist Mono (OFL-1.1)
const f = (family: string, file: string, weight?: string, style?: string) =>
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, style });

let loaded = false;
export const loadAllFonts = () => {
  if (loaded) return;
  loaded = true;
  f('NotoSansSC', 'NotoSansSC-VF.woff2', '100 900');
  f('NotoSerifSC', 'NotoSerifSC-VF.woff2', '200 900');
  f('Inter', 'InterVariable.ttf', '100 900');
  f('InterDisplay', 'InterDisplay-SemiBold.ttf', '600');
  f('InterDisplay', 'InterDisplay-Bold.ttf', '700');
  f('InterDisplay', 'InterDisplay-ExtraBold.ttf', '800');
  f('InterDisplay', 'InterDisplay-Black.ttf', '900');
  f('GeistMono', 'GeistMono-VF.ttf', '100 900');
  f('InstrumentSerif', 'InstrumentSerif-Regular.ttf', '400', 'normal');
  f('InstrumentSerif', 'InstrumentSerif-Italic.ttf', '400', 'italic');
};

/** 版面里用的字体族 (CSS font-family). 中文正文用 cn, 大标题用 cnSerif, 数字 / 英文大字用 display, 小标签用 geistMono */
export const FONT = {
  sans: '"Inter", "NotoSansSC", sans-serif',
  cn: '"NotoSansSC", sans-serif',
  display: '"InterDisplay", "NotoSansSC", sans-serif',
  serif: '"InstrumentSerif", "NotoSerifSC", serif',
  cnSerif: '"NotoSerifSC", serif',
  geistMono: '"GeistMono", "NotoSansSC", monospace',
};
