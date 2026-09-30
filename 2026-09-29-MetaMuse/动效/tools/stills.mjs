// 批量渲染静帧 (改完分镜后逐页看图检查用): node tools/stills.mjs <compId> <outDir> <frame,frame,...> [scale=0.5]
// 例: node tools/stills.mjs Ep32 out/stills 100,500,1200
// 想用本机 Chrome: 设环境变量 REMOTION_BROWSER_EXECUTABLE=<chrome 路径>; 不设就用 Remotion 自动下载的浏览器
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition, openBrowser } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';

const [, , id, outDir, framesArg, scaleArg] = process.argv;
if (!framesArg) {
  console.log('用法: node tools/stills.mjs <compId> <outDir> <frame,frame,...> [scale]');
  process.exit(1);
}
const frames = framesArg.split(',').map(Number);
const scale = Number(scaleArg ?? 0.5);
fs.mkdirSync(outDir, { recursive: true });

const serveUrl = await bundle({
  entryPoint: path.resolve('src/index.ts'),
  publicDir: path.resolve('public'),
  onProgress: () => {},
});
const browser = await openBrowser('chrome', {
  browserExecutable: process.env.REMOTION_BROWSER_EXECUTABLE || null,
});
const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser });
for (const frame of frames) {
  const out = path.join(outDir, `${id}_${String(frame).padStart(4, '0')}.jpg`);
  await renderStill({
    composition,
    serveUrl,
    frame,
    output: out,
    imageFormat: 'jpeg',
    jpegQuality: 88,
    scale,
    puppeteerInstance: browser,
  });
  console.log('ok', out);
}
await browser.close({ silent: true });
