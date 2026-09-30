import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
// 想用本机的 Chrome 而不是 Remotion 自动下载的浏览器, 可以设环境变量 REMOTION_BROWSER_EXECUTABLE=<chrome 路径>
if (process.env.REMOTION_BROWSER_EXECUTABLE) Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
// Studio 防误改: 所有会进时间轴的元素 (AbsoluteFill / Sequence / 视频 / 音频) 都加了 showInTimeline={false},
// 时间轴上没有可点可拖可删的色条 (否则在时间轴上误拖、按 Delete 会直接改写源码), 顶部时间刻度照常拖动定位. 新增这类元素时也记得加上.
