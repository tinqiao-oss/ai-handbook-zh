// 这一期用到的外部素材. 开源版里全部留空 (null) → 画面上显示占位块, 照样能完整预览和渲染.
// 原片里这些位置放的是: 口播者本人的出镜底片和声音、Meta 官方演示视频与界面截图、各产品的 App 图标 ——
// 它们的版权 / 肖像权不属于这个仓库, 所以没有放进来.
// 做自己的视频时: 把文件放进 public/media/, 在这里填相对 public/ 的路径, 例如 'media/me.mp4'.
import React from 'react';
import { Logo } from '../engine/media';

export const MEDIA = {
  /** 口播底片: 横屏 1920×1080 (或同比例更高分辨率), 与全片等长, 人物居中 */
  presenter: null as string | null,
  /** Studio 预览用的低分辨率代理 (可选) */
  presenterPreview: null as string | null,
  /** 人声 + 音乐音轨 */
  voice: null as string | null,
  /** 产品图标 / 头像 */
  museIcon: null as string | null,
  museAvatar: null as string | null,
  openclawIcon: null as string | null,
  doubaoIcon: null as string | null,
  /** 官方演示视频片段 (竖屏手机录屏为主), 用 RemapClip 按口播重映射时间 */
  demo: {
    shop: null as string | null,
    field: null as string | null,
    japan: null as string | null,
    rel: null as string | null,
    glasses: null as string | null,
  },
  /** 产品界面截图 (P04 图墙) */
  stills: {
    shop_list: null,
    japan_itin: null,
    rel_map: null,
    field_form: null,
    shop_done: null,
    rel_cal: null,
  } as Record<string, string | null>,
};

/** 兼容原分镜里的写法: SRC.shop 等 */
export const SRC = MEDIA.demo;

export const MuseIcon: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Logo src={MEDIA.museIcon} letter="M" size={size} style={style} />
);
export const MuseAvatar: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Logo src={MEDIA.museAvatar} letter="M" size={size} round style={style} />
);
