// 素材层: 视频片段 / 图片 / 图标. 每个组件的 src 都可以留空 (null) —— 留空时画一个占位块,
// 所以没有任何素材也能完整预览和渲染. 做自己的视频时, 把文件放进 public/ 下, 在 episode/assets.tsx 里填路径即可.
import React from 'react';
import { Freeze, Img, OffthreadVideo, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from './config';
import { FONT } from './fonts';

/** 斜纹占位块: 一眼能看出「这里要换成真素材」 */
export const Placeholder: React.FC<{ label?: string; sub?: string; dark?: boolean; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  label,
  sub,
  dark = false,
  style,
  children,
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      background: dark
        ? 'repeating-linear-gradient(135deg, #2A2F3A 0 18px, #242833 18px 36px)'
        : 'repeating-linear-gradient(135deg, #EDEFF3 0 18px, #E4E7ED 18px 36px)',
      color: dark ? '#C9CED8' : '#6B7280',
      fontFamily: FONT.cn,
      textAlign: 'center',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
    {label && <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, padding: '0 10px' }}>{label}</div>}
    {sub && <div style={{ fontFamily: FONT.geistMono, fontSize: 16, opacity: 0.8 }}>{sub}</div>}
  </div>
);

/** 图片; src 为空时显示占位块 */
export const MediaImg: React.FC<{ src?: string | null; label?: string; style?: React.CSSProperties }> = ({ src, label = '图片（占位）', style }) =>
  src ? (
    <Img showInTimeline={false} src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }} />
  ) : (
    <Placeholder label={label} />
  );

/** 方形图标 (App 图标、头像等); src 为空时显示首字母方块 */
export const Logo: React.FC<{ src?: string | null; letter: string; size: number; round?: boolean; color?: string; style?: React.CSSProperties }> = ({
  src,
  letter,
  size,
  round = false,
  color = '#1F5EFF',
  style,
}) =>
  src ? (
    <Img showInTimeline={false} src={staticFile(src)} style={{ width: size, height: size, display: 'block', borderRadius: round ? '50%' : undefined, ...style }} />
  ) : (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: round ? '50%' : undefined,
        background: `linear-gradient(135deg, ${color}, #6E8BFF)`,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT.display,
        fontWeight: 800,
        fontSize: size * 0.5,
        flex: 'none',
        ...style,
      }}
    >
      {letter}
    </div>
  );

/**
 * 演示视频片段 + 时间重映射: keys = [[合成帧, 源片秒], ...], 分段线性; 相邻两个 key 的源片秒相同 = 定格.
 * 用它把「点一下按钮」这类动作精确卡到口播的某个字上. 最后一个 key 之后按原速继续播.
 * src 为空时显示占位块, 并实时标出此刻对应源片第几秒, 方便对照调 keys.
 */
export const RemapClip: React.FC<{
  src?: string | null;
  keys: [number, number][];
  label?: string;
  style?: React.CSSProperties;
}> = ({ src, keys, label = '演示视频（占位）', style }) => {
  const frame = useCurrentFrame();
  if (!keys.length) throw new Error('RemapClip 的 keys 至少要有一个 [合成帧, 源片秒]');
  let t = keys[0][1];
  if (frame >= keys[keys.length - 1][0]) {
    const [f1, t1] = keys[keys.length - 1];
    t = t1 + (frame - f1) / FPS;
  } else {
    for (let i = 0; i < keys.length - 1; i++) {
      const [fa, ta] = keys[i];
      const [fb, tb] = keys[i + 1];
      if (frame >= fa && frame < fb) {
        t = ta + ((tb - ta) * (frame - fa)) / (fb - fa);
        break;
      }
    }
  }
  if (!src) return <Placeholder dark label={label} sub={`源片 ${Math.max(0, t).toFixed(1)} 秒`} style={style} />;
  return (
    <Freeze frame={Math.max(0, Math.round(t * FPS))}>
      <OffthreadVideo
        showInTimeline={false}
        src={staticFile(src)}
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
      />
    </Freeze>
  );
};

/** 口播人像占位: 深色背景 + 人形剪影 + 时间码. 有真底片时不会用到 */
export const PresenterPlaceholder: React.FC = () => {
  const frame = useCurrentFrame();
  const s = frame / FPS;
  const tc = `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(2).padStart(5, '0')}`;
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(ellipse at 50% 38%, #4B5363 0%, #2B303B 55%, #1C2028 100%)', overflow: 'hidden' }}>
      <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx={960} cy={470} r={150} fill="#687184" />
        <path d="M 600 1080 C 620 800, 780 690, 960 690 C 1140 690, 1300 800, 1320 1080 Z" fill="#687184" />
      </svg>
      {/* 文字放在头顶下方一点: 分屏时人像窗变窄, 放太高会压到右上角的章节提示 */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 190, textAlign: 'center', fontFamily: FONT.cn, fontWeight: 700, fontSize: 40, color: '#D5DAE3' }}>
        口播画面（占位）
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 244, textAlign: 'center', fontFamily: FONT.geistMono, fontSize: 30, color: '#AEB5C2' }}>{tc}</div>
    </div>
  );
};
