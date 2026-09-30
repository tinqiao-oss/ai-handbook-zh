// 第一、二部分: 开场 + Muse 能用来干什么 (0:00 – 2:17)
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { siAppstore, siFacebook, siGoogleplay, siInstagram, siMessenger, siShopify, siThreads } from './brands';
import { Bell, CalendarDays, FileText, FolderOpen, Heart, Lock, Mail, Search, ShieldCheck, Smartphone, CreditCard, Globe, Server } from 'lucide-react';
import { E, env, prog, spr } from '../engine/anim';
import { FONT } from '../engine/fonts';
import { Brand } from '../engine/icons';
import { MediaImg, RemapClip } from '../engine/media';
import { MEDIA, MuseIcon, SRC } from './assets';
import { Phone } from '../engine/ui';
import { AppTile, Bars, Body, Card, Chip, Cue, Hair, In, K, Kicker, Note, PageDef, PhoneBox, Pop, Quote, Ring, Shell, SideCard, Stat, Steps, Strike, Title, X0, X1 } from '../engine/kit';
import { at, LF, LT } from './time';

const MuseSmall = () => <MuseIcon size={36} style={{ borderRadius: 9 }} />;
const GrayDot = () => <div style={{ width: 36, height: 36, borderRadius: 9, background: '#E3E5EA' }} />;

// ========== P01 标题卡 (全屏) ==========
const P01: React.FC = () => {
  const fr = useCurrentFrame();
  if (fr < 40 || fr > 142) return null;
  const p = prog(fr, LF(2), LF(2) + 22, E.out);
  const q = prog(fr, 122, 140, E.in);
  return (
    <div style={{ position: 'absolute', left: 70, top: 80, width: 740, padding: '30px 36px 32px', background: 'rgba(247,246,242,.96)', boxShadow: '0 18px 50px rgba(0,0,0,.28)', transform: `translate(${(1 - p) * -760}px, ${-q * 30}px)`, opacity: 1 - q, borderLeft: `8px solid ${K.blue}` }}>
      <Kicker>科技 ｜ AI 助手</Kicker>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16 }}>
        <MuseIcon size={74} style={{ borderRadius: 17, boxShadow: '0 6px 16px rgba(0,0,0,.15)' }} />
        <Title size={54}>
          Meta 发布
          <br />
          个人 AI 助手 Muse
        </Title>
      </div>
      <div style={{ height: 2, background: K.rule, margin: '22px 0 14px' }} />
      <div style={{ fontFamily: FONT.cn, fontSize: 24, color: K.sub }}>2026 年 9 月 8 日，美国上线</div>
    </div>
  );
};

// ========== P02 时间轴: 不到两周登顶 ==========
const dayX = (d: number) => X0 + (d - 7) * (1000 / 14);
const AX = 560;
const Ev: React.FC<{ d: number; at: number; up: number; date: string; text: string; icon?: any; iconColor?: string; right?: boolean }> = ({ d, at: a, up, date, text, icon, iconColor, right }) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const p = prog(fr, a, a + 16, E.out);
  const top = up > 0;
  const len = Math.abs(up) * p;
  return (
    <>
      <div style={{ position: 'absolute', left: dayX(d) - 1.5, top: top ? AX - len : AX, width: 3, height: len, background: K.ink }} />
      <div style={{ position: 'absolute', left: dayX(d) - 9, top: AX - 9, width: 18, height: 18, borderRadius: 9, background: K.blue, border: '3px solid #fff', boxShadow: `0 0 0 2px ${K.blue}`, transform: `scale(${spr(fr, a, { damping: 11, stiffness: 200 })})` }} />
      <div style={{ position: 'absolute', left: dayX(d) + (right ? 8 : -8), top: top ? AX - up - 86 : AX + Math.abs(up) + 8, opacity: p, transform: `translate(${right ? '-100%' : '0'}, ${(1 - p) * (top ? 12 : -12)}px)`, whiteSpace: 'nowrap', textAlign: right ? 'right' : 'left' }}>
        <div style={{ fontFamily: FONT.geistMono, fontSize: 21, color: K.blue, fontWeight: 600 }}>{date}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, justifyContent: right ? 'flex-end' : 'flex-start' }}>
          {icon && <Brand icon={icon} size={30} color={iconColor} />}
          <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 30, color: K.ink }}>{text}</div>
        </div>
      </div>
    </>
  );
};
const P02: React.FC = () => {
  const fr = useCurrentFrame();
  const a = 166;
  const axis = prog(fr, a + 10, a + 40, E.inOut);
  const br = prog(fr, a + 30, at(5, '谷歌') + 8, E.inOut);
  const x0 = dayX(8);
  const x1 = dayX(19);
  return (
    <Shell a={a} b={404} kicker="MILESTONE ｜ 应用商店排名" title="不到两周，登顶两大应用商店" source="来源：Meta 官方新闻稿；TechCrunch 2026-09-25">
      <div style={{ position: 'absolute', left: X0, top: AX, width: 1000 * axis, height: 3, background: K.ink }} />
      {Array.from({ length: 15 }, (_, i) => {
        const d = 7 + i;
        const o = prog(fr, a + 14 + i * 1.5, a + 24 + i * 1.5);
        const major = d % 4 === 0;
        return (
          <React.Fragment key={d}>
            <div style={{ position: 'absolute', left: dayX(d) - 1, top: AX, width: 2, height: major ? 16 : 9, background: K.ink, opacity: o }} />
            {major && <div style={{ position: 'absolute', left: dayX(d) - 30, width: 60, textAlign: 'center', top: AX + 22, fontFamily: FONT.geistMono, fontSize: 19, color: K.mute, opacity: o }}>9/{d}</div>}
          </React.Fragment>
        );
      })}
      <div style={{ position: 'absolute', left: x0, top: AX - 44, width: (x1 - x0) * br, height: 16, borderTop: `3px solid ${K.blue}`, borderLeft: `3px solid ${K.blue}`, borderRight: br > 0.98 ? `3px solid ${K.blue}` : undefined, opacity: br > 0 ? 1 : 0 }} />
      <div style={{ position: 'absolute', left: (x0 + x1) / 2 - 90, width: 180, textAlign: 'center', top: AX - 92, fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.blue, opacity: prog(fr, at(5, '谷歌') + 6, at(5, '谷歌') + 20) }}>11 天</div>
      <Ev d={8} at={a + 22} up={140} date="9月8日" text="Muse 发布" />
      <Ev d={18} at={at(4, '苹果') - 6} up={215} date="9月18日" text="美国 App Store 免费榜第 1" icon={siAppstore} iconColor="#0D96F6" right />
      <Ev d={19} at={at(5, '谷歌') - 6} up={-150} date="9月19日" text="Google Play 第 1" icon={siGoogleplay} iconColor="#1F8E3D" right />
    </Shell>
  );
};
const P02cues: Cue[] = [
  { f: 188, s: 'tick', v: 0.3 },
  { f: at(4, '苹果') - 6, s: 'pop', v: 0.4 },
  { f: at(5, '谷歌') - 6, s: 'pop', v: 0.4 },
  { f: at(5, '谷歌') + 8, s: 'ding', v: 0.2 },
];

// ========== P03 条形图: 头 12 天 ==========
const Delta: React.FC<{ at: number; x: number; y: number; children: React.ReactNode }> = ({ at: a, x, y, children }) => (
  <Pop at={a} origin="left center" style={{ position: 'absolute', left: x, top: y }}>
    <div style={{ padding: '6px 14px', background: K.blueSoft, color: K.blue, fontFamily: FONT.display, fontWeight: 800, fontSize: 26, whiteSpace: 'nowrap' }}>{children}</div>
  </Pop>
);
const P03: React.FC = () => {
  const beat = at(8, '超过');
  return (
    <Shell a={404} b={800} kicker="DATA ｜ Apptopia 估算" title="上线头 12 天：跑赢当年的 ChatGPT" titleSize={54}>
      <In at={430}>
        <div style={{ position: 'absolute', left: X0, top: 268, display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 34, color: K.ink }}>下载量</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 22, color: K.mute }}>美国和加拿大 iOS</div>
        </div>
      </In>
      <Bars y={336} max={180} rows={[{ name: 'Muse', v: 180, unit: '万', at: 446, hot: true, icon: <MuseSmall /> }, { name: 'ChatGPT', v: 130, unit: '万', at: 456, icon: <GrayDot /> }]} />
      <Delta at={beat} x={960} y={270}>高出 38%</Delta>
      <Hair x={X0} y={496} w={1000} at={470} />
      <In at={476}>
        <div style={{ position: 'absolute', left: X0, top: 528, display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 34, color: K.ink }}>日活跃用户</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 22, color: K.mute }}>只算 iOS</div>
        </div>
      </In>
      <Bars y={596} max={35.9} rows={[{ name: 'Muse', v: 35.9, unit: '万', dec: 1, at: 488, hot: true, icon: <MuseSmall /> }, { name: 'ChatGPT', v: 23.1, unit: '万', dec: 1, at: 498, icon: <GrayDot /> }]} />
      <Delta at={beat + 8} x={960} y={530}>高出 55%</Delta>
      <In at={520}>
        <Note style={{ position: 'absolute', left: X0, top: 800, width: 1000 }}>
          注：均为第三方估算；ChatGPT 取其 App 上线后头 12 天。
          <br />
          来源：TechCrunch 2026-09-21（援引 Apptopia）
        </Note>
      </In>
    </Shell>
  );
};
const P03cues: Cue[] = [
  { f: 404, s: 'swish', v: 0.25 },
  { f: 446, s: 'data_run', v: 0.3 },
  { f: 488, s: 'data_run', v: 0.3 },
  { f: at(8, '超过'), s: 'pop', v: 0.4 },
  { f: at(8, '超过') + 8, s: 'pop_hi', v: 0.35 },
];

// ========== P04 评论区晒图 (全屏人物, 左侧图墙) ==========
const WALL = ['shop_list', 'japan_itin', 'rel_map', 'field_form', 'shop_done', 'rel_cal'];
const P04: React.FC = () => {
  const fr = useCurrentFrame();
  const a = LF(10);
  return (
    <SideCard a={a} b={980} w={560} kicker="SCREENSHOTS ｜ Muse 界面">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {WALL.map((n, i) => {
          const p = prog(fr, a + 10 + i * 6, a + 26 + i * 6);
          return (
            <div key={n} style={{ height: 250, overflow: 'hidden', borderRadius: 10, border: `1px solid ${K.rule}`, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
              <MediaImg src={MEDIA.stills[n]} label="截图（占位）" style={{ objectPosition: 'top' }} />
            </div>
          );
        })}
      </div>
      <Note style={{ marginTop: 12 }}>图：Meta 官方演示截图</Note>
    </SideCard>
  );
};

// ========== P05 目录 ==========
const TOC = [
  { n: '01', c: '用途', t: 'Muse 能用来干什么', a: at(13, 'Muse') - 6 },
  { n: '02', c: '动机', t: 'Meta 为什么要做', a: LF(14) },
  { n: '03', c: '前景', t: '它能不能成', a: LF(15) },
  { n: '04', c: '影响', t: '对我们有什么影响', a: LF(16) },
];
const P05: React.FC = () => {
  const fr = useCurrentFrame();
  const active = TOC.reduce((acc, r, i) => (fr >= r.a ? i : acc), -1);
  return (
    <Shell a={1010} b={1352} kicker="CONTENTS ｜ 本期结构" title="接下来讲四件事">
      {TOC.map((r, i) => {
        const on = i === active;
        const y = 262 + i * 150;
        const p = prog(fr, r.a, r.a + 18);
        return (
          <React.Fragment key={r.n}>
            <div style={{ position: 'absolute', left: X0, top: y, width: 1000, height: 128, background: on ? '#fff' : 'transparent', boxShadow: on ? '0 10px 30px rgba(14,17,22,.08)' : undefined, opacity: p }} />
            <div style={{ position: 'absolute', left: X0, top: y, width: 6, height: 128 * (on ? prog(fr, r.a, r.a + 14) : 0), background: K.blue }} />
            <div style={{ position: 'absolute', left: 146, top: y + 26, display: 'flex', alignItems: 'center', gap: 34, opacity: p * (i < active ? 0.45 : 1), transform: `translateX(${(1 - p) * 30}px)` }}>
              <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 60, color: on ? K.blue : K.gray, width: 90 }}>{r.n}</div>
              <div>
                <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 22, color: K.mute, letterSpacing: '0.2em' }}>{r.c}</div>
                <div style={{ fontFamily: FONT.cnSerif, fontWeight: 800, fontSize: 46, color: K.ink }}>{r.t}</div>
              </div>
            </div>
            {i < 3 && <Hair x={X0} y={y + 139} w={1000} at={r.a + 6} />}
          </React.Fragment>
        );
      })}
    </Shell>
  );
};
const P05cues: Cue[] = TOC.map((r) => ({ f: r.a, s: 'tick', v: 0.35 }));

// ========== P06 对话交互 (全屏人物 + 侧卡) ==========
const P06: React.FC = () => {
  const fr = useCurrentFrame();
  return (
    <SideCard a={1370} b={1570} w={620}>
      <div style={{ display: 'flex', gap: 26 }}>
        <Phone w={250} bezel={9} frameColor="#111" edge="rgba(255,255,255,.1)">
          <RemapClip src={SRC.rel} keys={[[1372, 2.2]]} />
        </Phone>
        <div style={{ width: 260, paddingTop: 6 }}>
          <Kicker>HOW ｜ 使用方式</Kicker>
          <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 46, color: K.ink, marginTop: 18, lineHeight: 1.25 }}>
            像聊天
            <br />
            一样下指令
          </div>
          <div style={{ height: 2, background: K.rule, margin: '20px 0' }} />
          <div style={{ fontFamily: FONT.cn, fontSize: 24, color: K.sub, lineHeight: 1.6, opacity: prog(fr, at(19, '对话'), at(19, '对话') + 16) }}>
            交互方式：对话
            <br />
            发消息就能交代任务
          </div>
          <Note style={{ marginTop: 26 }}>画面：Meta 官方演示</Note>
        </div>
      </div>
    </SideCard>
  );
};

// ========== P07 对照表: 回答 vs 去做 ==========
const P07: React.FC = () => {
  const fr = useCurrentFrame();
  const doIt = at(22, '直接');
  const hl = prog(fr, doIt - 4, doIt + 16);
  const how = at(21, '怎么做');
  const cell = (x: number, y: number, w: number, h: number, children: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, display: 'flex', alignItems: 'center', padding: '0 24px', boxSizing: 'border-box', ...style }}>{children}</div>
  );
  return (
    <Shell a={1600} b={1862} kicker="COMPARE ｜ 区别在哪" title="从「回答」到「去做」" source="据 Meta 官方介绍整理" sourceY={700}>
      <In at={1616}>
        {cell(330, 256, 360, 80, <span style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 28, color: K.sub }}>一般的 AI 助手</span>)}
        {cell(700, 256, 410, 80, <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.ink }}><MuseIcon size={40} style={{ borderRadius: 10 }} /> Muse</span>)}
      </In>
      <Hair x={X0} y={338} w={1000} at={1620} />
      <In at={1624}>
        {cell(X0, 346, 220, 130, <span style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 26, color: K.mute }}>交互方式</span>)}
        {cell(330, 346, 360, 130, <span style={{ fontFamily: FONT.cnSerif, fontWeight: 800, fontSize: 40, color: K.ink }}>对话</span>)}
        {cell(700, 346, 410, 130, <span style={{ fontFamily: FONT.cnSerif, fontWeight: 800, fontSize: 40, color: K.ink }}>对话</span>)}
      </In>
      <Hair x={X0} y={478} w={1000} at={1630} />
      <In at={at(20, '回答') - 4}>
        {cell(X0, 486, 220, 180, <span style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 26, color: K.mute }}>给你什么</span>)}
        {cell(330, 486, 360, 180, <span style={{ fontFamily: FONT.cnSerif, fontWeight: 800, fontSize: 40, color: K.ink }}><Strike at={how + 16}>告诉你怎么做</Strike></span>)}
      </In>
      {fr >= LF(22) - 4 &&
        cell(
          700,
          486,
          410,
          180,
          <span style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 44, color: hl > 0.5 ? '#fff' : K.ink, lineHeight: 1.25, opacity: prog(fr, LF(22) - 4, LF(22) + 12) }}>
            接过任务
            <br />
            直接去做
          </span>,
          { background: `rgba(31,94,255,${hl})` },
        )}
      <Hair x={X0} y={668} w={1000} at={1640} />
    </Shell>
  );
};
const P07cues: Cue[] = [
  { f: at(21, '怎么做') + 16, s: 'swipe', v: 0.45 },
  { f: at(22, '直接') - 4, s: 'pop_lo', v: 0.45 },
  { f: at(22, '直接') + 4, s: 'ding', v: 0.2 },
];

// ========== P08 结构图: Muse 的工作方式 ==========
const SVCS = [
  { k: 'mail', n: <Mail size={28} color="#EA4335" strokeWidth={2.2} /> },
  { k: 'ig', n: <Brand icon={siInstagram} size={26} /> },
  { k: 'fb', n: <Brand icon={siFacebook} size={26} /> },
  { k: 'ms', n: <Brand icon={siMessenger} size={26} /> },
  { k: 'th', n: <Brand icon={siThreads} size={26} /> },
  { k: 'sh', n: <Brand icon={siShopify} size={26} /> },
];
const FlowArrow: React.FC<{ x1: number; x2: number; y: number; at: number; label?: string }> = ({ x1, x2, y, at: a, label }) => {
  const fr = useCurrentFrame();
  const p = prog(fr, a, a + 20, E.inOut);
  if (p <= 0) return null;
  const w = (x2 - x1) * p;
  return (
    <>
      <div style={{ position: 'absolute', left: x1, top: y - 1.5, width: w, height: 3, background: K.ink }} />
      <div style={{ position: 'absolute', left: x1 + w - 14, top: y - 9, width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: `16px solid ${K.ink}`, opacity: p > 0.95 ? 1 : 0 }} />
      {p > 0.95 &&
        [0, 1, 2].map((i) => {
          const t = ((fr - a) / 40 + i / 3) % 1;
          return <div key={i} style={{ position: 'absolute', left: x1 + (x2 - x1 - 20) * t - 5, top: y - 5, width: 10, height: 10, borderRadius: 5, background: K.blue }} />;
        })}
      {label && <div style={{ position: 'absolute', left: x1, width: x2 - x1, textAlign: 'center', top: y - 44, fontFamily: FONT.cn, fontSize: 22, fontWeight: 700, color: K.sub, opacity: p }}>{label}</div>}
    </>
  );
};
const P08: React.FC = () => {
  const fr = useCurrentFrame();
  const give = LF(24);
  const vm = spr(fr, give + 10, { damping: 16, stiffness: 120 });
  const vmT = at(25, '云端');
  const title = prog(fr, vmT - 4, vmT + 12);
  const br = prog(fr, LF(26) - 4, LF(26) + 14);
  const sv = prog(fr, LF(27) - 4, LF(27) + 14);
  const auth = at(27, '授权');
  const typed = Math.floor(3 * prog(fr, LF(26) + 14, LF(26) + 60, E.linear));
  return (
    <Shell a={1862} b={2366} kicker="HOW IT WORKS ｜ 据 Meta 介绍" title="Muse 的工作方式" source="示意图，依据 Meta 官方新闻稿与研究博客">
      <In at={give - 6} style={{ position: 'absolute', left: X0, top: 380 }}>
        <div style={{ width: 170, height: 200, border: `3px solid ${K.ink}`, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Smartphone size={60} color={K.ink} strokeWidth={1.8} />
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 28, color: K.ink }}>你</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 19, color: K.mute }}>手机 App</div>
        </div>
      </In>
      <FlowArrow x1={290} x2={420} y={480} at={give + 6} label="下任务" />
      <div style={{ position: 'absolute', left: 430, top: 280, width: 680, height: 420, border: `3px solid ${K.ink}`, background: '#fff', transform: `scale(${0.9 + 0.1 * Math.min(1, vm)})`, opacity: Math.min(1, vm * 1.5), transformOrigin: 'left center' }}>
        <div style={{ height: 70, borderBottom: `3px solid ${K.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: K.blueSoft }}>
          <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 34, color: K.ink, opacity: title }}>云端虚拟电脑</div>
          <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 20, color: K.blue, border: `2px solid ${K.blue}`, padding: '4px 12px', opacity: title }}>每人一台，彼此隔离</div>
        </div>
        <div style={{ position: 'absolute', left: 24, top: 96, width: 300, height: 290, border: `2px solid ${K.ink}`, opacity: br, transform: `translateY(${(1 - br) * 16}px)` }}>
          <div style={{ height: 36, borderBottom: `2px solid ${K.ink}`, display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: 5, border: `2px solid ${K.ink}` }} />
            ))}
            <div style={{ flex: 1, height: 14, marginLeft: 8, border: `2px solid ${K.rule}` }} />
          </div>
          {['姓名', '日期', '人数'].map((f, i) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 16px 0' }}>
              <div style={{ width: 42, fontFamily: FONT.cn, fontSize: 18, color: K.sub }}>{f}</div>
              <div style={{ flex: 1, height: 34, border: `2px solid ${i < typed ? K.blue : K.rule}`, background: i < typed ? K.blueSoft : '#fff' }} />
            </div>
          ))}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontFamily: FONT.cn, fontWeight: 800, fontSize: 24, color: K.ink }}>浏览器</div>
        </div>
        <div style={{ position: 'absolute', left: 350, top: 96, width: 306, height: 290, border: `2px solid ${K.ink}`, opacity: sv, transform: `translateY(${(1 - sv) * 16}px)` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, padding: 22 }}>
            {SVCS.map((s, i) => {
              const ok = spr(fr, auth + i * 4, { damping: 12, stiffness: 180 });
              return (
                <div key={s.k} style={{ position: 'relative', height: 70, border: `2px solid ${K.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                  {s.n}
                  <div style={{ position: 'absolute', right: -8, top: -8, width: 24, height: 24, borderRadius: 12, background: K.blue, color: '#fff', fontSize: 15, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ok})` }}>✓</div>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontFamily: FONT.cn, fontWeight: 800, fontSize: 24, color: K.ink }}>你授权的服务</div>
        </div>
      </div>
      {[
        { t: '查资料', i: <Search size={26} color={K.blue} strokeWidth={2.4} />, a: at(28, '查资料') },
        { t: '填表', i: <FileText size={26} color={K.blue} strokeWidth={2.4} />, a: at(28, '填表') },
        { t: '安排事情', i: <CalendarDays size={26} color={K.blue} strokeWidth={2.4} />, a: at(28, '安排') },
      ].map((q, i) => (
        <In key={q.t} at={q.a - 4} style={{ position: 'absolute', left: 430 + i * 230, top: 740 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', background: '#fff', border: `3px solid ${K.blue}`, fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.ink }}>
            {q.i}
            {q.t}
          </div>
        </In>
      ))}
    </Shell>
  );
};
const P08cues: Cue[] = [
  { f: 1862, s: 'swish', v: 0.25 },
  { f: LF(24) + 10, s: 'pop_lo', v: 0.35 },
  { f: LF(26) - 4, s: 'click_soft', v: 0.3 },
  ...[0, 1, 2].map((i) => ({ f: LF(26) + 14 + i * 15, s: `key${i}`, v: 0.2 })),
  ...[0, 1, 2, 3, 4, 5].map((i) => ({ f: at(27, '授权') + i * 4, s: 'tick', v: 0.22 })),
  { f: at(28, '查资料') - 4, s: 'pop', v: 0.3 },
  { f: at(28, '填表') - 4, s: 'pop', v: 0.3 },
  { f: at(28, '安排') - 4, s: 'pop', v: 0.3 },
];

// ========== P09 时间线: App 关了任务还在跑 ==========
const P09: React.FC = () => {
  const fr = useCurrentFrame();
  const XA = X0;
  const XC = 520;
  const XB = 1080;
  const close = at(30, '关了');
  const appBar = prog(fr, 2376, 2410, E.inOut);
  const muse = prog(fr, 2380, LF(31) + 50, E.inOut);
  const mark = prog(fr, close - 2, close + 12);
  return (
    <Shell a={2368} b={2530} kicker="TIMELINE ｜ 耗时任务" title="App 关了，任务还在跑" source="示意；依据 Meta 官方新闻稿">
      <div style={{ position: 'absolute', left: XA, top: 330, fontFamily: FONT.cn, fontWeight: 700, fontSize: 26, color: K.sub }}>你在 App 里</div>
      <div style={{ position: 'absolute', left: XA, top: 376, width: (XC - XA) * appBar, height: 56, background: K.gray }} />
      <div style={{ position: 'absolute', left: XA, top: 480, fontFamily: FONT.cn, fontWeight: 700, fontSize: 26, color: K.ink }}>Muse 在云端执行</div>
      <div style={{ position: 'absolute', left: XA, top: 526, width: (XB - XA) * muse, height: 56, background: K.blue, backgroundImage: fr > close ? 'repeating-linear-gradient(-45deg, rgba(255,255,255,.22) 0 12px, transparent 12px 24px)' : undefined, backgroundPosition: `${fr * 2}px 0` }} />
      <div style={{ position: 'absolute', left: XC - 1.5, top: 300, width: 3, height: 340 * mark, background: K.red }} />
      <div style={{ position: 'absolute', left: XC + 14, top: 300, fontFamily: FONT.cn, fontWeight: 800, fontSize: 28, color: K.red, opacity: mark }}>关闭 App</div>
      <div style={{ position: 'absolute', left: XC + 30, top: 600, fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.blue, opacity: prog(fr, LF(31), LF(31) + 14) }}>→ 继续执行</div>
      <div style={{ position: 'absolute', left: XA, top: 660, width: 1000, height: 3, background: K.ink, opacity: appBar }} />
    </Shell>
  );
};
const P09cues: Cue[] = [
  { f: 2368, s: 'swish', v: 0.25 },
  { f: at(30, '关了') - 2, s: 'click', v: 0.45 },
  { f: LF(31), s: 'data_run', v: 0.25 },
];

// ========== P10 敏感动作先确认 ==========
const k10 = 230 / 300;
const P10: React.FC = () => {
  const fr = useCurrentFrame();
  const mail = at(32, '发邮件');
  const pay = at(32, '付款');
  const sens = LF(34);
  return (
    <Shell a={2530} b={2753} kicker="SAFEGUARD ｜ 敏感动作" title="发邮件、付款之前，先回来问你">
      <Steps
        y={270}
        h={84}
        gap={78}
        items={[
          { t: '执行任务', at: 2546, w: 250 },
          { t: '发邮件 / 付款？', at: mail, tone: 'red', w: 300 },
          { t: '请求你确认', at: sens, tone: 'blue', w: 290 },
        ]}
      />
      <div style={{ position: 'absolute', left: 250, top: 390, opacity: prog(fr, mail, mail + 16) }}>
        <Phone w={230} bezel={8} frameColor="#111" edge="rgba(255,255,255,.1)">
          <RemapClip src={SRC.field} keys={[[2526, 21.9], [2566, 22.7], [2705, 22.7], [2706, 23.3]]} />
          <Ring x={25 * k10} y={461 * k10} w={253 * k10} h={28 * k10} at={sens} />
        </Phone>
      </div>
      <div style={{ position: 'absolute', left: 620, top: 390, opacity: prog(fr, pay - 6, pay + 10) }}>
        <Phone w={230} bezel={8} frameColor="#111" edge="rgba(255,255,255,.1)">
          <RemapClip src={SRC.shop} keys={[[pay - 14, 16.2], [pay + 24, 16.96], [2711, 16.96], [2712, 17.8]]} />
          <Ring x={154 * k10} y={494 * k10} w={122 * k10} h={28 * k10} at={sens + 6} />
        </Phone>
      </div>
      <Note style={{ position: 'absolute', left: 900, top: 820, width: 210, textAlign: 'right', opacity: prog(fr, mail + 10, mail + 24) }}>画面：Meta 官方演示</Note>
    </Shell>
  );
};
const P10cues: Cue[] = [
  { f: 2530, s: 'swish', v: 0.25 },
  { f: at(32, '发邮件'), s: 'pop', v: 0.35 },
  { f: at(32, '付款') - 6, s: 'pop', v: 0.35 },
  { f: LF(34), s: 'ding_lo', v: 0.22 },
  { f: 2740, s: 'click', v: 0.5 },
];

// ========== P11 官方购物演示: 从给链接到把订单准备好 ==========
const k11 = 300 / 300;
const P11: React.FC = () => {
  const fr = useCurrentFrame();
  const a = 2753;
  const s1 = LF(35);
  const s2 = LF(38);
  const s3 = LF(39);
  const s4 = LF(40);
  const steps = [
    { n: '1', t: '说出需求', sub: '「帮我买辆婴儿车」', at: s1 + 6 },
    { n: '2', t: '按预算去查、去比较', sub: '挑出最合适的一款', at: s2 },
    { n: '3', t: '把选项和订单准备好', sub: '在网页上填好结账信息', at: s3 },
    { n: '4', t: '交给你确认', sub: '你点「允许」才付款', at: s4 },
  ];
  const cur = steps.reduce((acc, s, i) => (fr >= s.at ? i : acc), -1);
  return (
    <Shell a={a} b={3315} kicker="EXAMPLE ｜ 官方演示：买婴儿车" title="不只给链接，而是把订单准备好" source="画面：Meta 官方演示（Muse 替用户买婴儿车）" sourceY={900}>
      <In at={LF(36)} style={{ position: 'absolute', left: X0, top: 270 }}>
        <div style={{ fontFamily: FONT.cn, fontSize: 28, color: K.mute, fontWeight: 700 }}>
          不再只是 <Strike at={LF(38) - 10}>几条推荐链接</Strike>
        </div>
      </In>
      {steps.map((s, i) => {
        if (fr < s.at) return null;
        const p = prog(fr, s.at, s.at + 16, E.out);
        const on = i === cur;
        return (
          <div key={s.n} style={{ position: 'absolute', left: X0, top: 340 + i * 132, width: 560, height: 112, opacity: p * (on ? 1 : 0.55), transform: `translateX(${(1 - p) * -30}px)`, display: 'flex', alignItems: 'center', gap: 22, background: on ? '#fff' : 'transparent', boxShadow: on ? '0 10px 26px rgba(14,17,22,.08)' : undefined, borderLeft: `6px solid ${on ? K.blue : K.rule}`, paddingLeft: 22, boxSizing: 'border-box' }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 44, color: on ? K.blue : K.gray, width: 40 }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 32, color: K.ink }}>{s.t}</div>
              <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.mute, marginTop: 4 }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
      <PhoneBox x={760} y={266} w={300} at={a + 6}>
        <RemapClip
          src={SRC.shop}
          keys={[
            [a, 0.0],
            [LF(38), 4.6],
            [LF(38) + 1, 5.6],
            [LF(39), 8.2],
            [LF(39) + 1, 15.7],
            [LF(39) + 34, 16.38],
            [LF(39) + 35, 17.0],
            [s4 + 18, 17.0],
            [s4 + 19, 17.8],
          ]}
        />
        <Ring x={154 * k11} y={494 * k11} w={122 * k11} h={28 * k11} at={s4 + 4} />
      </PhoneBox>
    </Shell>
  );
};
const P11cues: Cue[] = [
  { f: 2753, s: 'swish', v: 0.25 },
  { f: LF(35) + 6, s: 'tick', v: 0.3 },
  { f: LF(38) - 10, s: 'swipe', v: 0.4 },
  { f: LF(38), s: 'tick', v: 0.3 },
  { f: LF(39), s: 'tick', v: 0.3 },
  { f: LF(40), s: 'tick', v: 0.3 },
  { f: LF(40) + 49, s: 'click', v: 0.5 },
];

// ========== P12 不只是购物 ==========
const CAPS = [
  { t: '整理文件', d: '从邮件里找出表格并填好', icon: <FolderOpen size={40} color={K.blue} strokeWidth={2.2} />, at: at(42, '整理'), clip: SRC.field, clipAt: 2.4 },
  { t: '制作计划', d: '把机票、酒店排成行程', icon: <CalendarDays size={40} color={K.blue} strokeWidth={2.2} />, at: at(42, '制作'), clip: SRC.japan, clipAt: 3.6 },
  { t: '记住你的偏好', d: '越用越懂你', icon: <Heart size={40} color={K.blue} strokeWidth={2.2} />, at: at(42, '记住') },
  { t: '主动提醒你', d: '按你的目标主动提议', icon: <Bell size={40} color={K.blue} strokeWidth={2.2} />, at: at(43, '根据'), clip: SRC.rel, clipAt: 3.2 },
];
const P12: React.FC = () => {
  const fr = useCurrentFrame();
  return (
    <Shell a={3315} b={3736} kicker="BEYOND SHOPPING ｜ 不只是购物" title="它想覆盖的，是这些日常的事" source="据 Meta 官方介绍；画面：Meta 官方演示">
      {CAPS.map((c, i) => {
        const x = X0 + (i % 2) * 510;
        const y = 280 + Math.floor(i / 2) * 300;
        return (
          <Card key={c.t} x={x} y={y} w={490} h={270} at={c.at - 4} hot={fr >= c.at && fr < (CAPS[i + 1]?.at ?? 3740)}>
            <div style={{ display: 'flex', gap: 18 }}>
              <div style={{ flex: 1 }}>
                {c.icon}
                <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 38, color: K.ink, marginTop: 14 }}>{c.t}</div>
                <div style={{ fontFamily: FONT.cn, fontSize: 22, color: K.sub, marginTop: 8, lineHeight: 1.45 }}>{c.d}</div>
              </div>
              {c.clipAt !== undefined && (
                <div style={{ width: 104, height: 216, borderRadius: 14, overflow: 'hidden', border: `3px solid ${K.ink}`, flex: 'none' }}>
                  <RemapClip src={c.clip} keys={[[c.at - 4, c.clipAt ?? 0]]} />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </Shell>
  );
};
const P12cues: Cue[] = [{ f: 3315, s: 'swish', v: 0.25 }, ...CAPS.map((c) => ({ f: c.at - 4, s: 'pop', v: 0.3 }))];

// ========== P13 OpenClaw (全屏 + 侧卡): 念到「是的，就是那只」才揭晓 ==========
const P13A = LF(47) - 4;
const P13: React.FC = () => {
  const fr = useCurrentFrame();
  const a = P13A;
  const pop = spr(fr, a + 2, { damping: 9, stiffness: 170 });
  const wob = fr >= a ? Math.sin((fr - a) / 3) * 12 * Math.max(0, 1 - (fr - a) / 26) : 0;
  const facts = a + 40;
  const lob = LF(48) + 10; // 「龙虾」本身念到时下一页已开始分屏, 所以在这句开头就亮出
  return (
    <SideCard a={a} b={4254} w={640} kicker="ORIGIN ｜ 技术来源">
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ transform: `scale(${pop}) rotate(${wob}deg)`, transformOrigin: '50% 60%' }}>
          <AppTile src={MEDIA.openclawIcon} letter="O" size={110} />
        </div>
        <div style={{ opacity: prog(fr, a + 6, a + 18), transform: `translateX(${(1 - prog(fr, a + 6, a + 22, E.out)) * 16}px)` }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 56, color: K.ink }}>OpenClaw</div>
          <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 24, color: K.sub }}>开源的个人 AI 助手项目</div>
        </div>
      </div>
      <div style={{ height: 2, background: K.rule, margin: '22px 0 18px' }} />
      <div style={{ opacity: prog(fr, facts, facts + 16) }}>
        <div style={{ fontFamily: FONT.geistMono, fontSize: 20, color: K.blue }}>2025.11</div>
        <Body size={24}>以 Clawdbot 之名开源</Body>
        <div style={{ fontFamily: FONT.geistMono, fontSize: 20, color: K.blue, marginTop: 12 }}>2026.01.30</div>
        <Body size={24}>改名 OpenClaw，随后火遍全网</Body>
      </div>
      <div style={{ marginTop: 18, opacity: prog(fr, lob, lob + 18) }}>
        <Chip tone="red" size={24}>国内昵称「龙虾」</Chip>
        <Note style={{ marginTop: 8 }}>国家互联网应急中心《OpenClaw 安全使用实践指南》写作「OpenClaw（龙虾）」</Note>
      </div>
      <Note style={{ marginTop: 14 }}>来源：CNBC、Forbes 2026-01/02；国家互联网应急中心 2026-03-23</Note>
    </SideCard>
  );
};
const P13cues: Cue[] = [
  { f: P13A + 2, s: 'pop_hi', v: 0.42 },
  { f: P13A + 8, s: 'ding', v: 0.24 },
  { f: P13A + 40, s: 'tick', v: 0.28 },
  { f: LF(48) + 10, s: 'pop', v: 0.35 },
];

// ========== P14 OpenClaw vs Muse ==========
const P14: React.FC = () => {
  const fr = useCurrentFrame();
  const col = (x: number, head: React.ReactNode, items: { t: string; at: number; tone?: 'red' | 'blue' }[], foot: React.ReactNode, footAt: number, hot: boolean) => (
    <>
      <In at={items[0].at - 10} style={{ position: 'absolute', left: x, top: 270, width: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 16, borderBottom: `3px solid ${hot ? K.blue : K.ink}` }}>{head}</div>
      </In>
      {items.map((it, i) => (
        <In key={it.t} at={it.at} style={{ position: 'absolute', left: x, top: 372 + i * 92, width: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: hot ? K.blue : K.ink }} />
            <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 34, color: K.ink }}>{it.t}</div>
          </div>
        </In>
      ))}
      <In at={footAt} style={{ position: 'absolute', left: x, top: 660, width: 480 }}>
        {foot}
      </In>
    </>
  );
  return (
    <Shell a={4283} b={4610} kicker="COMPARE ｜ 部署方式" title="同样的能力，门槛差很多" source="注：OpenClaw 官方文档提供本地安装路径；国家互联网应急中心建议用专用设备、虚拟机或容器安装">
      {col(
        X0,
        <>
          <AppTile src={MEDIA.openclawIcon} letter="O" size={52} />
          <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 36, color: K.ink }}>OpenClaw</span>
        </>,
        [
          { t: '自己的电脑或服务器', at: LF(49) + 20 },
          { t: '自己安装、配置', at: LF(50) + 20 },
          { t: '自己维护', at: LF(51) + 10 },
        ],
        <Chip tone="red" size={30}>对普通人：门槛高</Chip>,
        at(52, '门槛'),
        false,
      )}
      {col(
        630,
        <>
          <MuseIcon size={52} style={{ borderRadius: 12 }} />
          <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 36, color: K.ink }}>Muse</span>
        </>,
        [
          { t: '官方的云端电脑', at: LF(50) + 30 },
          { t: '下载 App 就能用', at: LF(51) + 20 },
          { t: '官方负责维护', at: LF(52) },
        ],
        <Chip tone="blue" size={30}>普通人：打开就用</Chip>,
        at(52, '门槛') + 10,
        true,
      )}
      <div style={{ position: 'absolute', left: 600, top: 270, width: 2, height: 460, background: K.rule, opacity: prog(fr, 4300, 4320) }} />
    </Shell>
  );
};
const P14cues: Cue[] = [
  { f: 4283, s: 'whoosh_in', v: 0.3 },
  { f: LF(49) + 20, s: 'tick', v: 0.28 },
  { f: LF(50) + 20, s: 'tick', v: 0.28 },
  { f: LF(51) + 10, s: 'tick', v: 0.28 },
  { f: at(52, '门槛'), s: 'pop_lo', v: 0.35 },
  { f: at(52, '门槛') + 10, s: 'pop_hi', v: 0.3 },
];

// ========== P15 同款 SOUL.md ==========
const FileCard: React.FC<{ x: number; at: number; owner: React.ReactNode; seed: number; hot?: boolean }> = ({ x, at: a, owner }) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const p = prog(fr, a, a + 18, E.out);
  const lines = [0.92, 0.7, 0.84, 0.55, 0.88, 0.62, 0.78, 0.4];
  const fill = prog(fr, at(56, '内容'), at(56, '内容') + 30);
  return (
    <div style={{ position: 'absolute', left: x, top: 290, width: 420, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
      <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 22, color: K.mute, marginBottom: 10 }}>{owner}</div>
      <div style={{ background: '#fff', border: `2px solid ${K.ink}`, boxShadow: '8px 10px 0 rgba(14,17,22,.08)' }}>
        <div style={{ height: 56, borderBottom: `2px solid ${K.ink}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', background: K.blueSoft }}>
          <FileText size={28} color={K.ink} strokeWidth={2} />
          <span style={{ fontFamily: FONT.geistMono, fontWeight: 700, fontSize: 28, color: K.ink }}>SOUL.md</span>
        </div>
        <div style={{ padding: '20px 20px 24px' }}>
          {lines.map((w, i) => (
            <div key={i} style={{ height: 14, width: `${w * 100 * Math.max(0, Math.min(1, fill * 8 - i))}%`, background: i === 0 ? K.ink : '#C7CBD3', marginBottom: 14 }} />
          ))}
        </div>
      </div>
    </div>
  );
};
const P15: React.FC = () => {
  const eq = at(57, '几乎');
  return (
    <Shell a={4615} b={5010} kicker="FOUND BY USERS ｜ 网友发现" title="定义 AI 性格的文件：几乎一样" source="来源：TechCrunch 2026-09-22（网友在 X 上比对工作区文件）">
      <FileCard x={X0} at={LF(55) - 10} owner="OpenClaw 的工作区" seed={1} />
      <FileCard x={690} at={LF(55) + 6} owner="Muse 的工作区" seed={1} />
      <Pop at={at(56, '文件名')} style={{ position: 'absolute', left: 545, top: 420 }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 90, color: K.blue }}>=</div>
      </Pop>
      <In at={eq} style={{ position: 'absolute', left: X0, top: 720 }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <Chip tone="blue" size={30}>文件名相同</Chip>
          <Chip tone="blue" size={30}>内容几乎一样</Chip>
        </div>
      </In>
    </Shell>
  );
};
const P15cues: Cue[] = [
  { f: 4615, s: 'swish', v: 0.25 },
  { f: LF(55) - 10, s: 'pop_lo', v: 0.3 },
  { f: LF(55) + 6, s: 'pop_lo', v: 0.3 },
  { f: at(56, '文件名'), s: 'pop_hi', v: 0.35 },
  { f: at(57, '几乎'), s: 'ding', v: 0.2 },
];

// ========== P16 Meta 公开承认 ==========
const P16: React.FC = () => (
  <Shell a={5013} b={5352} kicker="ON THE RECORD ｜ Meta 的说法" title="Meta 也公开承认" source="来源：TechCrunch 2026-09-22（引 Meta 超级智能实验室产品负责人的 X 帖文）">
    <Quote
      y={330}
      at={LF(59) - 20}
      zhAt={LF(59) + 30}
      size={40}
      en="We built Muse from scratch, but it is definitely heavily inspired as a product by OpenClaw."
      zh="Muse 是我们从零搭起来的，但在产品层面，确实深受 OpenClaw 启发。"
      who="Meta 超级智能实验室 产品负责人"
    />
  </Shell>
);
const P16cues: Cue[] = [{ f: 5013, s: 'swish', v: 0.25 }, { f: LF(59) - 20, s: 'click_soft', v: 0.35 }];

// ========== P17 三件事 (全屏 + 侧卡) ==========
const THREE = [
  { n: '1', t: '模型', a: at(65, '模型') },
  { n: '2', t: '运行环境和权限', a: at(69, '运行') },
  { n: '3', t: '使用门槛', a: at(73, '使用') },
];
const P17: React.FC = () => {
  const fr = useCurrentFrame();
  const list = LF(64);
  return (
    <SideCard a={5356} b={5740} w={640} kicker="FOCUS ｜ 值得关注的地方">
      <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 42, color: K.ink, lineHeight: 1.3 }}>
        把这套能力，
        <br />
        变成<span style={{ color: K.blue }}>普通人能直接用</span>的服务
      </div>
      <div style={{ height: 2, background: K.rule, margin: '22px 0 16px', opacity: prog(fr, list - 10, list) }} />
      <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 24, color: K.mute, opacity: prog(fr, list, list + 14) }}>Meta 重点整合了三件事</div>
      {THREE.map((t, i) => (
        <div key={t.n} style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14, opacity: prog(fr, list + 20 + i * 12, list + 34 + i * 12), transform: `translateX(${(1 - prog(fr, list + 20 + i * 12, list + 38 + i * 12, E.out)) * -20}px)` }}>
          <div style={{ width: 48, height: 48, background: K.blue, color: '#fff', fontFamily: FONT.display, fontWeight: 800, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.n}</div>
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 34, color: K.ink }}>{t.t}</div>
        </div>
      ))}
    </SideCard>
  );
};
const P17cues: Cue[] = [{ f: 5356, s: 'whoosh_in', v: 0.28 }, ...THREE.map((_, i) => ({ f: LF(64) + 20 + i * 12, s: 'tick', v: 0.3 }))];

// ========== P18 模型 Muse Spark ==========
const P18: React.FC = () => {
  const fr = useCurrentFrame();
  const a = 5768;
  const rank = prog(fr, LF(67), LF(67) + 60, E.out);
  return (
    <Shell a={a} b={6112} kicker="FOCUS 1/3 ｜ 模型" title="Meta 自研模型：Muse Spark" source="来源：Quartz、CNBC 2026-04-08；Meta 研究博客 2026-09-02；artificialanalysis.ai（2026-09-27 读取，数字会变动）">
      <VFacts a={a} />
      <Card x={600} y={270} w={510} h={520} at={LF(67) - 10} hot tone="blue" pad="26px 30px">
        <Kicker style={{ fontSize: 18 }}>Artificial Analysis 综合榜</Kicker>
        <div style={{ fontFamily: FONT.cn, fontSize: 20, color: K.mute, marginTop: 6 }}>Muse Spark 1.3（最高推理档）</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 18 }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 88, color: K.blue, lineHeight: 1 }}>{Math.round(48 * rank)}</div>
          <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 26, color: K.ink }}>智能指数</div>
        </div>
        <div style={{ fontFamily: FONT.cn, fontSize: 24, color: K.sub, marginTop: 6 }}>211 个模型里排第 17</div>
        {/* 名次条 */}
        <div style={{ position: 'relative', height: 26, marginTop: 18, background: '#EEF0F3' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(17 / 211) * 100 * rank}%`, background: K.blue, opacity: 0.25 }} />
          <div style={{ position: 'absolute', left: `calc(${(17 / 211) * 100}% - 3px)`, top: -8, width: 6, height: 42, background: K.blue, opacity: rank }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.geistMono, fontSize: 16, color: K.mute, marginTop: 6 }}>
          <span>第 1</span>
          <span>第 211</span>
        </div>
        <div style={{ height: 2, background: K.rule, margin: '20px 0 16px' }} />
        <div style={{ opacity: prog(fr, LF(68), LF(68) + 16) }}>
          {[
            { v: '第 11', l: '输出速度（约每秒 210 token）' },
            { v: '$1.60', l: '每道评测题的成本' },
          ].map((r) => (
            <div key={r.v} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
              <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 40, color: K.ink, width: 140, whiteSpace: 'nowrap' }}>{r.v}</div>
              <div style={{ fontFamily: FONT.cn, fontSize: 22, color: K.sub }}>{r.l}</div>
            </div>
          ))}
        </div>
      </Card>
    </Shell>
  );
};
const VFacts: React.FC<{ a: number }> = ({ a }) => (
  <>
    {[
      { d: '2026.04.08', t: '首发，闭源', at: LF(66) },
      { d: '2026.09 初', t: '更新到 1.3 版', at: LF(66) + 40 },
      { d: '持续优化', t: '针对 agent 执行任务', at: LF(67) },
    ].map((f, i) => (
      <In key={f.d} at={f.at} style={{ position: 'absolute', left: X0, top: 290 + i * 150, width: 440 }}>
        <div style={{ fontFamily: FONT.geistMono, fontWeight: 600, fontSize: 22, color: K.blue }}>{f.d}</div>
        <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 36, color: K.ink, marginTop: 6 }}>{f.t}</div>
        <div style={{ height: 2, background: K.rule, marginTop: 20, width: 420 }} />
      </In>
    ))}
  </>
);
const P18cues: Cue[] = [
  { f: 5768, s: 'swish', v: 0.25 },
  { f: LF(66), s: 'tick', v: 0.3 },
  { f: LF(66) + 40, s: 'tick', v: 0.3 },
  { f: LF(67) - 10, s: 'pop_lo', v: 0.3 },
  { f: LF(67), s: 'data_run', v: 0.25 },
  { f: LF(68), s: 'pop', v: 0.3 },
];

// ========== P19 运行环境和权限: 安全外壳 ==========
const P19: React.FC = () => {
  const fr = useCurrentFrame();
  const a = 6118;
  const box = (x: number, y: number, w: number, h: number, at0: number, children: React.ReactNode, hot?: boolean) => {
    if (fr < at0) return null;
    const p = prog(fr, at0, at0 + 16, E.out);
    return (
      <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, border: `3px solid ${hot ? K.blue : K.ink}`, background: hot ? K.blueSoft : '#fff', boxSizing: 'border-box', padding: '16px 20px', opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}>
        {children}
      </div>
    );
  };
  const conn = at(70, '账号');
  const confirm = LF(71);
  const noBuild = LF(72);
  return (
    <Shell a={a} b={6442} kicker="FOCUS 2/3 ｜ 运行环境和权限" title="安全措施默认配好，不用自己搭" source="来源：Meta 研究博客《How We Built Safety Into Muse》2026-09-08">
      {box(X0, 280, 330, 230, LF(70), (
        <>
          <Server size={34} color={K.blue} strokeWidth={2.2} />
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.ink, marginTop: 8 }}>隔离的云端电脑</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.sub, marginTop: 6, lineHeight: 1.45 }}>每人一台，AI 跑在独立容器里</div>
        </>
      ), true)}
      {box(470, 280, 300, 230, conn, (
        <>
          <ShieldCheck size={34} color={K.blue} strokeWidth={2.2} />
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.ink, marginTop: 8 }}>守门程序</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.sub, marginTop: 6, lineHeight: 1.45 }}>所有出网请求都要过它，AI 绕不开</div>
        </>
      ))}
      {box(830, 280, 280, 230, conn + 10, (
        <>
          <Globe size={34} color={K.ink} strokeWidth={2.2} />
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.ink, marginTop: 8 }}>网站和服务</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.sub, marginTop: 6, lineHeight: 1.45 }}>真实账号凭证在这一步才由系统换上</div>
        </>
      ))}
      {fr >= conn && <div style={{ position: 'absolute', left: 440, top: 393, width: 30 * prog(fr, conn, conn + 10), height: 3, background: K.ink }} />}
      {fr >= conn + 10 && <div style={{ position: 'absolute', left: 770, top: 393, width: 60 * prog(fr, conn + 10, conn + 20), height: 3, background: K.ink }} />}
      <In at={conn + 16} style={{ position: 'absolute', left: X0, top: 540 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Lock size={26} color={K.blue} strokeWidth={2.4} />
          <Body size={26} color={K.ink} weight={700}>AI 拿不到你真正的登录凭证</Body>
        </div>
      </In>
      {box(X0, 620, 1000, 150, confirm, (
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <CreditCard size={44} color={K.red} strokeWidth={2.2} />
          <div>
            <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 30, color: K.ink }}>付款用一次性卡号，每一笔都要你确认</div>
            <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.sub, marginTop: 6 }}>卡号绑定商家、金额和有效期</div>
          </div>
        </div>
      ))}
      <Pop at={noBuild + 10} style={{ position: 'absolute', left: 820, top: 800 }}>
        <Chip tone="blue" size={28}>默认配好，不用自己搭</Chip>
      </Pop>
    </Shell>
  );
};
const P19cues: Cue[] = [
  { f: 6118, s: 'swish', v: 0.25 },
  { f: LF(70), s: 'pop_lo', v: 0.3 },
  { f: at(70, '账号'), s: 'tick', v: 0.3 },
  { f: at(70, '账号') + 10, s: 'tick', v: 0.3 },
  { f: LF(71), s: 'pop', v: 0.3 },
  { f: LF(72) + 10, s: 'ding_lo', v: 0.2 },
];

// ========== P20 使用门槛 + 收费 ==========
const TIERS = [
  { n: '免费', p: '$0', q: '约 1 亿*', at: LF(77) },
  { n: 'Power', p: '$20', q: '5 亿', at: LF(78) },
  { n: 'Max', p: '$100', q: '30 亿', at: LF(78) + 20 },
];
const P20: React.FC = () => {
  const fr = useCurrentFrame();
  const a = 6448;
  return (
    <Shell a={a} b={6860} kicker="FOCUS 3/3 ｜ 使用门槛" title="下载就能用，还有免费档" source="*免费档额度为媒体报道。Muse token 是产品自己的用量单位，与模型 token 如何换算 Meta 未公布。来源：Meta 帮助中心；The Information 2026-09-08">
      <In at={LF(74)} style={{ position: 'absolute', left: X0, top: 268 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Body size={26} color={K.mute} weight={700}>支持地区</Body>
          <Chip tone="blue">美国</Chip>
          <Chip tone="blue">加拿大</Chip>
          <Body size={26} color={K.mute} weight={700} style={{ marginLeft: 24, opacity: prog(fr, LF(75), LF(75) + 14) }}>
            不用先学会 <Strike at={LF(75) + 30}>部署服务器</Strike>
          </Body>
        </div>
      </In>
      {TIERS.map((t, i) => (
        <Card key={t.n} x={X0 + i * 340} y={370} w={320} h={380} at={t.at} hot={i === 0 ? fr < LF(78) : fr >= LF(78)} tone="blue" pad="26px 28px">
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 38, color: K.ink }}>{t.n}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 14 }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: K.blue }}>{t.p}</div>
            <div style={{ fontFamily: FONT.cn, fontSize: 22, color: K.mute }}>/ 月</div>
          </div>
          <div style={{ height: 2, background: K.rule, margin: '18px 0' }} />
          <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.mute }}>每周额度</div>
          <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 38, color: K.ink, marginTop: 4 }}>{t.q}</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 21, color: K.mute }}>Muse token</div>
        </Card>
      ))}
    </Shell>
  );
};
const P20cues: Cue[] = [{ f: 6448, s: 'swish', v: 0.25 }, { f: LF(74), s: 'tick', v: 0.3 }, { f: LF(75) + 30, s: 'swipe', v: 0.35 }, ...TIERS.map((t) => ({ f: t.at, s: 'pop', v: 0.3 }))];

export const PAGES1: PageDef[] = [
  { id: 'P01', a: 40, b: 142, mode: 'full', C: P01, sfx: [{ f: 45, s: 'whoosh_in', v: 0.3 }] },
  { id: 'P02', a: 166, b: 404, mode: 'split', C: P02, sfx: P02cues },
  { id: 'P03', a: 404, b: 800, mode: 'split', C: P03, sfx: P03cues },
  { id: 'P04', a: 813, b: 980, mode: 'full', C: P04, sfx: [{ f: 815, s: 'whoosh_in', v: 0.28 }] },
  { id: 'P05', a: 1010, b: 1352, mode: 'split', C: P05, sfx: P05cues },
  { id: 'P06', a: 1370, b: 1570, mode: 'full', C: P06, sfx: [{ f: 1372, s: 'whoosh_in', v: 0.28 }] },
  { id: 'P07', a: 1600, b: 1862, mode: 'split', C: P07, sfx: P07cues },
  { id: 'P08', a: 1862, b: 2366, mode: 'split', C: P08, sfx: P08cues },
  { id: 'P09', a: 2368, b: 2530, mode: 'split', C: P09, sfx: P09cues },
  { id: 'P10', a: 2530, b: 2753, mode: 'split', C: P10, sfx: P10cues },
  { id: 'P11', a: 2753, b: 3315, mode: 'split', C: P11, sfx: P11cues },
  { id: 'P12', a: 3315, b: 3736, mode: 'split', C: P12, sfx: P12cues },
  { id: 'P13', a: P13A, b: 4254, mode: 'full', C: P13, sfx: P13cues },
  { id: 'P14', a: 4283, b: 4610, mode: 'split', C: P14, sfx: P14cues },
  { id: 'P15', a: 4615, b: 5010, mode: 'split', C: P15, sfx: P15cues },
  { id: 'P16', a: 5013, b: 5352, mode: 'split', C: P16, sfx: P16cues },
  { id: 'P17', a: 5356, b: 5740, mode: 'full', C: P17, sfx: P17cues },
  { id: 'P18', a: 5768, b: 6112, mode: 'split', C: P18, sfx: P18cues },
  { id: 'P19', a: 6118, b: 6442, mode: 'split', C: P19, sfx: P19cues },
  { id: 'P20', a: 6448, b: 6860, mode: 'split', C: P20, sfx: P20cues },
];
