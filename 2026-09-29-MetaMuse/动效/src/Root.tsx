import React from 'react';
import { Composition } from 'remotion';
import { FPS, H, W } from './engine/config';
import { loadAllFonts } from './engine/fonts';
import { EP32_DURATION, Episode32 } from './episode';

loadAllFonts();

// 右侧 Props 面板可以改: sfx 音效开关, sfxGain 音效整体音量 (1 = 默认), chapterTag 右上角章节提示开关
export const Root: React.FC = () => (
  <>
    <Composition id="Ep32" component={Episode32} durationInFrames={EP32_DURATION} fps={FPS} width={W} height={H} defaultProps={{ sfx: true, sfxGain: 1, chapterTag: true }} />
  </>
);
