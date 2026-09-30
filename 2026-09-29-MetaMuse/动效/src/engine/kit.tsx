// 数据新闻风 (版面在左、人物在右) 的组件库: 文字 / 进出场 / 版面外壳 / 侧卡 / 条形图 / 时间线 / 流程 / 引语 / 卡片 / 章节卡
import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { E, env, prog, spr } from './anim';
import { FONT } from './fonts';
import { Phone } from './ui';
import { H, W } from './config';

export const K = {
  page: '#F7F6F2',
  paper: '#FFFFFF',
  ink: '#0E1116',
  sub: '#4A5160',
  mute: '#8A909C',
  rule: '#D8DAE0',
  blue: '#1F5EFF',
  blueSoft: '#E6EDFF',
  red: '#E5484D',
  redSoft: '#FFF1F1',
  green: '#16A34A',
  gray: '#A3A9B4',
  bar: '#0E1116',
};
export const PAGE_W = 1200;
export const BAR_H = 110; // 底部字幕条高度 (字幕 64 号, 与原片剪映字幕同大)
export const X0 = 110; // 版面左边距
export const X1 = 1110; // 版面右边界

/** 音效提示点: f 帧, s 音效名 (public/sfx/*.wav), v 音量 0..1 */
export type Cue = { f: number; s: string; v?: number };
export type Mode = 'split' | 'full' | 'take';
export type PageDef = { id: string; a: number; b: number; mode: Mode; C: React.FC; sfx?: Cue[] };

// ---------- 文字 ----------
export const Kicker: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontFamily: FONT.geistMono, fontSize: 21, fontWeight: 600, letterSpacing: '0.14em', color: K.blue, textTransform: 'uppercase', whiteSpace: 'nowrap', ...style }}>
    {children}
  </div>
);
export const Title: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 56, style }) => (
  <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: size, color: K.ink, lineHeight: 1.2, letterSpacing: '0.01em', ...style }}>{children}</div>
);
export const Note: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontFamily: FONT.cn, fontSize: 19, color: K.mute, lineHeight: 1.55, ...style }}>{children}</div>
);
export const Body: React.FC<{ children: React.ReactNode; size?: number; color?: string; weight?: number; style?: React.CSSProperties }> = ({ children, size = 28, color = K.sub, weight = 500, style }) => (
  <div style={{ fontFamily: FONT.cn, fontSize: size, color, fontWeight: weight, lineHeight: 1.5, ...style }}>{children}</div>
);

/** 整块上浮淡入 */
export const In: React.FC<{ at: number; dy?: number; dx?: number; dur?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at: a, dy = 18, dx = 0, dur = 18, style, children }) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const p = prog(fr, a, a + dur, E.out);
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)`, ...style }}>{children}</div>;
};
/** 弹出 (弹簧缩放) */
export const Pop: React.FC<{ at: number; style?: React.CSSProperties; origin?: string; children: React.ReactNode }> = ({ at: a, style, origin = 'center', children }) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const s = spr(fr, a, { damping: 13, stiffness: 190 });
  return <div style={{ transform: `scale(${s})`, transformOrigin: origin, opacity: Math.min(1, s * 2), ...style }}>{children}</div>;
};
/** 横线 (从左画出) */
export const Hair: React.FC<{ x: number; y: number; w: number; at: number; color?: string; h?: number }> = ({ x, y, w, at: a, color = K.rule, h = 2 }) => {
  const fr = useCurrentFrame();
  return <div style={{ position: 'absolute', left: x, top: y, width: w * prog(fr, a, a + 22, E.inOut), height: h, background: color }} />;
};
/** 删除线 (线从 0 长度开始画; 两端各出头 4px 也按进度一起伸出, 不会提前露出一个点) */
export const Strike: React.FC<{ at: number; color?: string; children: React.ReactNode; dim?: number }> = ({ at: a, color = K.red, children, dim = 0.45 }) => {
  const fr = useCurrentFrame();
  const p = prog(fr, a, a + 16, E.inOut);
  return (
    <span style={{ position: 'relative', display: 'inline-block', opacity: 1 - p * dim }}>
      {children}
      {p > 0 && (
        <span
          style={{
            position: 'absolute',
            left: -4,
            right: -4,
            top: '52%',
            height: 4,
            background: color,
            borderRadius: 2,
            transform: `scaleX(${p})`,
            transformOrigin: 'left center',
          }}
        />
      )}
    </span>
  );
};

// ---------- 页面外壳 ----------
/**
 * 左侧版面的一页: 标题区 (kicker + 标题 + 粗线) + 内容 + 出处.
 * a..b 是可见区间; 页面之间 12 帧淡入淡出.
 */
export const Shell: React.FC<{
  a: number;
  b: number;
  kicker: string;
  title: React.ReactNode;
  titleSize?: number;
  source?: React.ReactNode;
  sourceY?: number;
  children?: React.ReactNode;
}> = ({ a, b, kicker, title, titleSize = 56, source, sourceY = 894, children }) => {
  const fr = useCurrentFrame();
  if (fr < a || fr > b) return null;
  const o = env(fr, a, b, 12, 12);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <In at={a + 2}>
        <Kicker style={{ position: 'absolute', left: X0, top: 84 }}>{kicker}</Kicker>
      </In>
      <In at={a + 6}>
        <Title size={titleSize} style={{ position: 'absolute', left: X0 - 2, top: 122, width: X1 - X0 }}>
          {title}
        </Title>
      </In>
      <Hair x={X0} y={236} w={X1 - X0} at={a + 8} color={K.ink} h={3} />
      {children}
      {source && (
        <In at={a + 20}>
          <Note style={{ position: 'absolute', left: X0, top: sourceY, width: X1 - X0 }}>{source}</Note>
        </In>
      )}
    </div>
  );
};

/** 当前分屏程度 (0 = 人物全屏, 1 = 左版面右人物), 由 engine/Episode.tsx 提供 */
export const SplitCtx = React.createContext(0);

/** 全屏人物时的左上角信息卡 (分屏没收完时自动隐去, 不和版面叠在一起) */
export const SideCard: React.FC<{ a: number; b: number; w?: number; x?: number; y?: number; kicker?: string; children: React.ReactNode }> = ({ a, b, w = 620, x = 60, y = 70, kicker, children }) => {
  const fr = useCurrentFrame();
  const sp = React.useContext(SplitCtx);
  if (fr < a || fr > b) return null;
  const o = env(fr, a, b, 16, 14) * (1 - sp);
  const p = prog(fr, a, a + 22, E.out);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: o, transform: `translateX(${(1 - p) * -60}px)` }}>
      <div style={{ background: 'rgba(247,246,242,.96)', padding: '24px 28px 26px', boxShadow: '0 18px 50px rgba(0,0,0,.28)', borderTop: `6px solid ${K.blue}` }}>
        {kicker && <Kicker style={{ marginBottom: 14 }}>{kicker}</Kicker>}
        {children}
      </div>
    </div>
  );
};

// ---------- 条形图 ----------
export type BarRow = { name: string; v: number; unit: string; dec?: number; at: number; hot?: boolean; icon?: React.ReactNode; label?: string };
export const Bars: React.FC<{ y: number; rows: BarRow[]; max: number; w?: number; rowH?: number; x?: number; nameW?: number; barH?: number }> = ({
  y,
  rows,
  max,
  w = 640,
  rowH = 72,
  x = X0,
  nameW = 190,
  barH = 50,
}) => {
  const fr = useCurrentFrame();
  return (
    <>
      {rows.map((r, i) => {
        const p = prog(fr, r.at, r.at + 36, E.out);
        const bw = w * (r.v / max) * p;
        const top = y + i * rowH;
        return (
          <React.Fragment key={r.name + i}>
            <div style={{ position: 'absolute', left: x, top: top + (barH - 36) / 2, display: 'flex', alignItems: 'center', gap: 12, opacity: prog(fr, r.at - 6, r.at + 6) }}>
              {r.icon}
              <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: r.hot ? K.ink : K.sub, whiteSpace: 'nowrap' }}>{r.name}</div>
            </div>
            <div style={{ position: 'absolute', left: x + nameW, top, width: bw, height: barH, background: r.hot ? K.blue : K.gray }} />
            <div
              style={{
                position: 'absolute',
                left: x + nameW + bw + 14,
                top: top + (barH - 44) / 2,
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 36,
                color: r.hot ? K.ink : K.sub,
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
                opacity: prog(fr, r.at + 4, r.at + 14),
              }}
            >
              {r.label ?? (r.v * p).toFixed(r.dec ?? 0)}
              <span style={{ fontFamily: FONT.cn, fontSize: 22, fontWeight: 700, marginLeft: 4 }}>{r.unit}</span>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

// ---------- 竖向时间线 ----------
export type VItem = { date: string; text: React.ReactNode; at: number; sub?: React.ReactNode; hot?: boolean };
export const VTimeline: React.FC<{ x?: number; y: number; items: VItem[]; gap?: number; w?: number }> = ({ x = X0, y, items, gap = 118, w = 1000 }) => {
  const fr = useCurrentFrame();
  const last = items.reduce((acc, it, i) => (fr >= it.at ? i : acc), -1);
  const lineH = Math.max(0, last) * gap;
  return (
    <>
      <div style={{ position: 'absolute', left: x + 9, top: y + 18, width: 3, height: lineH * prog(fr, items[0].at, items[0].at + 20), background: K.rule }} />
      {items.map((it, i) => {
        if (fr < it.at) return null;
        const p = prog(fr, it.at, it.at + 18, E.out);
        const top = y + i * gap;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top, width: w, opacity: p, transform: `translateX(${(1 - p) * 24}px)` }}>
            <div style={{ position: 'absolute', left: 0, top: 10, width: 21, height: 21, borderRadius: 11, background: it.hot ? K.blue : '#fff', border: `3px solid ${K.blue}`, boxSizing: 'border-box' }} />
            <div style={{ position: 'absolute', left: 44, top: 0, fontFamily: FONT.geistMono, fontWeight: 600, fontSize: 22, color: K.blue, whiteSpace: 'nowrap' }}>{it.date}</div>
            <div style={{ position: 'absolute', left: 44, top: 32, fontFamily: FONT.cn, fontWeight: 800, fontSize: 32, color: K.ink, whiteSpace: 'nowrap' }}>{it.text}</div>
            {it.sub && <div style={{ position: 'absolute', left: 44, top: 78, fontFamily: FONT.cn, fontSize: 20, color: K.mute, whiteSpace: 'nowrap' }}>{it.sub}</div>}
          </div>
        );
      })}
    </>
  );
};

// ---------- 流程框 ----------
export type StepItem = { t: React.ReactNode; at: number; hot?: boolean; sub?: React.ReactNode; w?: number; tone?: 'ink' | 'blue' | 'red' | 'mute' };
export const Steps: React.FC<{ x?: number; y: number; items: StepItem[]; gap?: number; h?: number; arrowAt?: (i: number) => number; size?: number }> = ({
  x = X0,
  y,
  items,
  gap = 56,
  h = 96,
  size = 28,
}) => {
  const fr = useCurrentFrame();
  let cx = x;
  return (
    <>
      {items.map((it, i) => {
        const w = it.w ?? 220;
        const left = cx;
        cx += w + gap;
        if (fr < it.at) return null;
        const p = prog(fr, it.at, it.at + 16, E.out);
        const tone = it.tone ?? (it.hot ? 'blue' : 'ink');
        const border = { ink: K.ink, blue: K.blue, red: K.red, mute: K.rule }[tone];
        const bg = { ink: '#fff', blue: K.blueSoft, red: K.redSoft, mute: '#fff' }[tone];
        const color = { ink: K.ink, blue: K.blue, red: K.red, mute: K.mute }[tone];
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <div style={{ position: 'absolute', left: left - gap + 8, top: y + h / 2 - 2, width: (gap - 16) * p, height: 3, background: K.ink }}>
                <div style={{ position: 'absolute', right: -2, top: -7, width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: `12px solid ${K.ink}`, opacity: p > 0.9 ? 1 : 0 }} />
              </div>
            )}
            <div style={{ position: 'absolute', left, top: y, width: w, height: h, border: `3px solid ${border}`, background: bg, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * 14}px)`, textAlign: 'center', padding: '0 10px' }}>
              <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: size, color, lineHeight: 1.25 }}>{it.t}</div>
              {it.sub && <div style={{ fontFamily: FONT.cn, fontSize: 18, color: K.mute, marginTop: 4 }}>{it.sub}</div>}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

// ---------- 卡片 ----------
export const Card: React.FC<{ x: number; y: number; w: number; h?: number; at: number; hot?: boolean; tone?: 'blue' | 'red' | 'ink'; children: React.ReactNode; pad?: string; dim?: number }> = ({
  x,
  y,
  w,
  h,
  at: a,
  hot,
  tone = 'blue',
  children,
  pad = '22px 26px',
  dim = 0,
}) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const p = prog(fr, a, a + 18, E.out);
  const c = { blue: K.blue, red: K.red, ink: K.ink }[tone];
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        boxSizing: 'border-box',
        background: '#fff',
        border: `2px solid ${hot ? c : K.rule}`,
        borderTop: `6px solid ${hot ? c : K.ink}`,
        padding: pad,
        opacity: p * (1 - dim * 0.6),
        transform: `translateY(${(1 - p) * 20}px)`,
        boxShadow: hot ? '0 12px 30px rgba(14,17,22,.10)' : undefined,
      }}
    >
      {children}
    </div>
  );
};

/** 大数字 + 说明 */
export const Stat: React.FC<{ v: React.ReactNode; unit?: string; label: React.ReactNode; color?: string; size?: number }> = ({ v, unit, label, color = K.ink, size = 64 }) => (
  <div>
    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: size, color, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
      {v}
      {unit && <span style={{ fontFamily: FONT.cn, fontSize: size * 0.42, fontWeight: 700, marginLeft: 6 }}>{unit}</span>}
    </div>
    <div style={{ fontFamily: FONT.cn, fontSize: 22, color: K.sub, marginTop: 8, lineHeight: 1.45 }}>{label}</div>
  </div>
);

/** 胶囊标签 */
export const Chip: React.FC<{ children: React.ReactNode; tone?: 'blue' | 'red' | 'ink' | 'mute'; size?: number }> = ({ children, tone = 'blue', size = 22 }) => {
  const c = { blue: K.blue, red: K.red, ink: K.ink, mute: K.mute }[tone];
  const bg = { blue: K.blueSoft, red: K.redSoft, ink: '#EEF0F3', mute: '#F0F1F3' }[tone];
  return <span style={{ display: 'inline-block', padding: '5px 14px', background: bg, color: c, fontFamily: FONT.cn, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap' }}>{children}</span>;
};

/** 引语 (英文原话 + 中文意思 + 出处) */
export const Quote: React.FC<{ x?: number; y: number; w?: number; at: number; en: string; zh: string; who: React.ReactNode; size?: number; zhAt?: number }> = ({
  x = X0,
  y,
  w = 1000,
  at: a,
  en,
  zh,
  who,
  size = 34,
  zhAt,
}) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const p = prog(fr, a, a + 20, E.out);
  const zp = prog(fr, zhAt ?? a + 24, (zhAt ?? a + 24) + 18, E.out);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>
      <div style={{ position: 'absolute', left: -6, top: -40, fontFamily: FONT.serif, fontSize: 150, color: K.blue, opacity: 0.25, lineHeight: 1 }}>“</div>
      <div style={{ borderLeft: `6px solid ${K.blue}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONT.serif, fontSize: size, color: K.ink, lineHeight: 1.32 }}>{en}</div>
        <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: size * 0.8, color: K.sub, lineHeight: 1.5, marginTop: 16, opacity: zp }}>{zh}</div>
        <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.mute, marginTop: 16, opacity: zp }}>{who}</div>
      </div>
    </div>
  );
};

/** 官方演示片段装在手机壳里 */
export const PhoneBox: React.FC<{ x: number; y: number; w: number; at: number; children: React.ReactNode; out?: number }> = ({ x, y, w, at: a, children, out }) => {
  const fr = useCurrentFrame();
  if (fr < a - 2) return null;
  const p = spr(fr, a, { damping: 16, stiffness: 110 });
  const q = out !== undefined ? prog(fr, out, out + 12, E.in) : 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translateY(${(1 - Math.min(1, p)) * 60}px)`, opacity: Math.min(1, p * 1.5) * (1 - q) }}>
      <Phone w={w} bezel={Math.round(w * 0.036)} frameColor="#111" edge="rgba(255,255,255,.1)" shadow="0 24px 50px rgba(14,17,22,.22)">
        {children}
      </Phone>
    </div>
  );
};

/** 高亮框 (套在官方画面某个按钮上) */
export const Ring: React.FC<{ x: number; y: number; w: number; h: number; at: number; color?: string }> = ({ x, y, w, h, at: a, color = K.red }) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const p = prog(fr, a, a + 12);
  return <div style={{ position: 'absolute', left: x - 6, top: y - 6, width: w + 12, height: h + 12, border: `4px solid ${color}`, borderRadius: 10, opacity: p, transform: `scale(${1.15 - 0.15 * p})` }} />;
};

/** 环形图 */
export const Donut: React.FC<{ cx: number; cy: number; r: number; pct: number; at: number; stroke?: number; color?: string; children?: React.ReactNode }> = ({ cx, cy, r, pct, at: a, stroke = 44, color = K.blue, children }) => {
  const fr = useCurrentFrame();
  const p = prog(fr, a, a + 50, E.out);
  const C = 2 * Math.PI * r;
  return (
    <div style={{ position: 'absolute', left: cx - r - stroke, top: cy - r - stroke, width: (r + stroke) * 2, height: (r + stroke) * 2, opacity: prog(fr, a - 4, a + 8) }}>
      <svg width={(r + stroke) * 2} height={(r + stroke) * 2}>
        <circle cx={r + stroke} cy={r + stroke} r={r} stroke="#E3E5EA" strokeWidth={stroke} fill="none" />
        <circle cx={r + stroke} cy={r + stroke} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeDasharray={`${C * pct * p} ${C}`} transform={`rotate(-90 ${r + stroke} ${r + stroke})`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
};

/** App 图标方块 */
export const AppTile: React.FC<{ src?: string | null; letter?: string; size?: number; children?: React.ReactNode; bg?: string }> = ({ src, letter, size = 64, children, bg = '#fff' }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.23, background: bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${K.rule}`, flex: 'none' }}>
    {src ? (
      <Img showInTimeline={false} src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      children ?? (letter ? <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: size * 0.46, color: K.blue }}>{letter}</span> : null)
    )}
  </div>
);

/** 整屏章节卡 (盖住人物) */
export const Chapter: React.FC<{ a: number; b: number; n: string; title: string; sub?: string }> = ({ a, b, n, title, sub }) => {
  const fr = useCurrentFrame();
  if (fr < a || fr > b) return null;
  const pin = prog(fr, a, a + 22, E.out);
  const pout = prog(fr, b - 18, b, E.in);
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H - BAR_H, background: K.page, transform: `translateX(${(1 - pin) * -W + pout * W}px)` }}>
      <div style={{ position: 'absolute', left: 150, top: 250, fontFamily: FONT.display, fontWeight: 800, fontSize: 260, color: K.blue, lineHeight: 1, opacity: prog(fr, a + 8, a + 24) }}>{n}</div>
      <div style={{ position: 'absolute', left: 150, top: 540, width: 1600, height: 4, background: K.ink, transform: `scaleX(${prog(fr, a + 10, a + 34, E.inOut)})`, transformOrigin: 'left' }} />
      <div style={{ position: 'absolute', left: 146, top: 580, fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 96, color: K.ink, opacity: prog(fr, a + 14, a + 30), transform: `translateY(${(1 - prog(fr, a + 14, a + 34, E.out)) * 20}px)` }}>{title}</div>
      {sub && <div style={{ position: 'absolute', left: 150, top: 720, fontFamily: FONT.cn, fontSize: 34, color: K.sub, opacity: prog(fr, a + 24, a + 40) }}>{sub}</div>}
    </div>
  );
};
