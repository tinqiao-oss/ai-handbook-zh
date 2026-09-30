import React from 'react';
import { useCurrentFrame } from 'remotion';
import { E, prog, spr } from './anim';

/** 整体飘入: 位移 + 透明 + 模糊 (可选弹簧) */
export const Rise: React.FC<{
  at: number;
  dur?: number;
  dy?: number;
  dx?: number;
  blur?: number;
  scale?: number;
  out?: number; // 可选: 退场起始帧
  outDur?: number;
  outDy?: number;
  springy?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, dur = 24, dy = 40, dx = 0, blur = 10, scale = 1, out, outDur = 16, outDy = -24, springy, style, children }) => {
  const frame = useCurrentFrame();
  const p = springy ? Math.min(1, spr(frame, at, { damping: 16, stiffness: 120 })) : prog(frame, at, at + dur, E.out);
  const q = out !== undefined ? prog(frame, out, out + outDur, E.in) : 0;
  if (frame < at) return null;
  if (out !== undefined && frame > out + outDur) return null;
  const o = Math.min(1, p * 1.4) * (1 - q);
  const ty = (1 - p) * dy + q * outDy;
  const tx = (1 - p) * dx;
  const s = scale + (1 - scale) * p;
  const b = (1 - p) * blur + q * blur * 0.6;
  return (
    <div
      style={{
        opacity: o,
        transform: `translate(${tx}px, ${ty}px) scale(${s})`,
        filter: b > 0.2 ? `blur(${b}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** 手机外框 + 屏幕 (屏幕宽高比取官方录屏 726:1572) */
export const PHONE_ASPECT = 1572 / 726;
export const Phone: React.FC<{
  w: number; // 屏幕宽
  bezel?: number;
  frameColor?: string;
  edge?: string;
  shadow?: string;
  style?: React.CSSProperties;
  screenStyle?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ w, bezel = 12, frameColor = '#0B0C10', edge = 'rgba(255,255,255,.16)', shadow, style, screenStyle, children }) => {
  const h = w * PHONE_ASPECT;
  const r = w * 0.105;
  return (
    <div
      style={{
        width: w + bezel * 2,
        height: h + bezel * 2,
        borderRadius: r + bezel,
        background: frameColor,
        boxShadow: `inset 0 0 0 1.5px ${edge}${shadow ? ', ' + shadow : ''}`,
        padding: bezel,
        boxSizing: 'border-box',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          borderRadius: r,
          overflow: 'hidden',
          position: 'relative',
          background: '#F4F4F6',
          isolation: 'isolate',
          ...screenStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** 逐字母/逐字 错峰出现 */
export const Stagger: React.FC<{
  text: string;
  at: number;
  step?: number;
  dur?: number;
  dy?: number;
  blur?: number;
  charStyle?: (i: number) => React.CSSProperties;
  style?: React.CSSProperties;
}> = ({ text, at, step = 3, dur = 26, dy = 0.5, blur = 14, charStyle, style }) => {
  const frame = useCurrentFrame();
  const chars = [...text];
  return (
    <span style={{ display: 'inline-block', whiteSpace: 'pre', ...style }}>
      {chars.map((c, i) => {
        const p = prog(frame, at + i * step, at + i * step + dur, E.out);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: Math.min(1, p * 1.5),
              transform: `translateY(${(1 - p) * dy}em)`,
              filter: p < 0.98 ? `blur(${(1 - p) * blur}px)` : undefined,
              ...charStyle?.(i),
            }}
          >
            {c}
          </span>
        );
      })}
    </span>
  );
};
