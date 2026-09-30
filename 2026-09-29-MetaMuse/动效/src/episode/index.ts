// 第32期 (Meta Muse) 的完整分镜: 52 个页面定义 (编号 P46 制作时删掉了, 空号保留) + 4 个章节. 做自己的视频时, 照这个文件的结构换成自己的内容.
import { createEpisode, EpisodeDef, takeEnd } from '../engine/Episode';
import { MEDIA } from './assets';
import { PAGES1 } from './pages1';
import { PAGES2 } from './pages2';
import { PAGES3 } from './pages3';
import SFX_TRIM from './sfx_trim.json';
import { CUTS, DURATION, LF, lineAt } from './time';

const pages = [...PAGES1, ...PAGES2, ...PAGES3];

export const EP32: EpisodeDef = {
  pages,
  // 02 / 03 章有整屏章节卡, 章节提示在卡片结束后才换; 04 章没有章节卡, 在第 224 句开头翻牌
  chapters: [
    { n: '01', t: 'Muse 能用来干什么', a: LF(17) },
    { n: '02', t: 'Meta 为什么要做', a: takeEnd(pages, LF(79)) },
    { n: '03', t: '它能不能成', a: takeEnd(pages, LF(144)) },
    { n: '04', t: '对我们有什么影响', a: LF(224) },
  ],
  cuts: CUTS,
  lineAt,
  sfxTrim: SFX_TRIM as unknown as Record<string, number>,
  presenter: MEDIA.presenter,
  presenterPreview: MEDIA.presenterPreview,
  voice: MEDIA.voice,
};

export const Episode32 = createEpisode(EP32);
export const EP32_DURATION = DURATION;
