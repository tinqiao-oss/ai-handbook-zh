// 第四、五部分: 能不能成 (四关) + 总结 (4:22 – 7:31)
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { siShopify } from './brands';
import { Ban, Car, CheckCircle2, Clock, Hand, HelpCircle, KeyRound, MapPin, MessageSquareText, ShieldAlert, Wallet, Zap } from 'lucide-react';
import { E, prog, spr } from '../engine/anim';
import { FONT } from '../engine/fonts';
import { Brand } from '../engine/icons';
import { MEDIA, MuseIcon } from './assets';
import { AppTile, Body, Card, Chapter, Chip, Cue, In, K, Kicker, Note, PageDef, Pop, Quote, Shell, SideCard, Stat, Steps, Strike, VTimeline, X0 } from '../engine/kit';
import { at, LF } from './time';

// ========== P34 章节 + 四关 ==========
const P34a: React.FC = () => <Chapter a={13091} b={13270} n="03" title="能不能成" sub="这套布局，至少要过四关" />;
const GATES = ['能不能真的省事', '商家和平台让不让进门', '这笔账算不算得过来', '用户能不能放心'];
const P34b: React.FC = () => {
  const fr = useCurrentFrame();
  const first = at(146, '第一关');
  return (
    <Shell a={13274} b={13428} kicker="FOUR GATES ｜ 四关" title="至少要过这四关">
      {GATES.map((g, i) => {
        const a0 = 13290 + i * 12;
        if (fr < a0) return null;
        const p = prog(fr, a0, a0 + 14, E.out);
        const on = i === 0 && fr >= first;
        return (
          <div key={g} style={{ position: 'absolute', left: X0, top: 280 + i * 130, width: 1000, height: 110, display: 'flex', alignItems: 'center', gap: 28, background: on ? '#fff' : 'transparent', borderLeft: `6px solid ${on ? K.blue : K.rule}`, paddingLeft: 26, boxSizing: 'border-box', opacity: p, transform: `translateX(${(1 - p) * 30}px)`, boxShadow: on ? '0 10px 26px rgba(14,17,22,.08)' : undefined }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 52, color: on ? K.blue : K.gray, width: 60 }}>{i + 1}</div>
            <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 42, color: K.ink }}>{g}</div>
          </div>
        );
      })}
    </Shell>
  );
};

// ========== P35 第一关: 省不省事 ==========
const P35: React.FC = () => {
  const fr = useCurrentFrame();
  const self = LF(149);
  const items = [
    { t: '问了你 10 次', i: <MessageSquareText size={30} color={K.red} strokeWidth={2.2} />, at: LF(151) },
    { t: '帮它登录', i: <KeyRound size={30} color={K.red} strokeWidth={2.2} />, at: at(152, '登录') },
    { t: '帮它纠错', i: <ShieldAlert size={30} color={K.red} strokeWidth={2.2} />, at: at(152, '纠错') },
    { t: '重新选商品', i: <Ban size={30} color={K.red} strokeWidth={2.2} />, at: LF(153) },
  ];
  const bar = prog(fr, LF(150), LF(153) + 30, E.linear);
  return (
    <Shell a={13432} b={14203} kicker="GATE 1 ｜ 省不省事" title="第一关：能不能真的让人省事">
      <In at={self - 6} style={{ position: 'absolute', left: X0, top: 280 }}>
        <Body size={26} color={K.mute} weight={800}>自己办</Body>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
          <div style={{ width: 150 * prog(fr, self, self + 20), height: 44, background: K.blue }} />
          <Stat v="5" unit="分钟" label="" size={56} color={K.blue} />
        </div>
      </In>
      <In at={LF(150)} style={{ position: 'absolute', left: X0, top: 440 }}>
        <Body size={26} color={K.mute} weight={800}>交给 AI 之后</Body>
        <div style={{ width: 150 + 700 * bar, height: 44, background: K.red, marginTop: 8, opacity: 0.85 }} />
      </In>
      {items.map((it, i) => {
        if (fr < it.at) return null;
        const p = prog(fr, it.at, it.at + 14, E.out);
        return (
          <div key={it.t} style={{ position: 'absolute', left: X0 + (i % 2) * 500, top: 560 + Math.floor(i / 2) * 76, display: 'flex', alignItems: 'center', gap: 14, opacity: p, transform: `translateY(${(1 - p) * 12}px)` }}>
            {it.i}
            <Body size={30} color={K.ink} weight={800}>{it.t}</Body>
          </div>
        );
      })}
      <In at={LF(155)} style={{ position: 'absolute', left: X0, top: 750, width: 1000 }}>
        <div style={{ borderLeft: `6px solid ${K.red}`, paddingLeft: 22 }}>
          <Body size={34} color={K.ink} weight={900}>
            不是在替你干活，而是在让你<span style={{ color: K.red }}>监督它干活</span>
          </Body>
        </div>
      </In>
    </Shell>
  );
};
const P35cues: Cue[] = [
  { f: 13432, s: 'swish', v: 0.25 },
  { f: LF(149), s: 'pop', v: 0.3 },
  { f: LF(150), s: 'data_run', v: 0.2 },
  { f: LF(151), s: 'pop_hi', v: 0.3 },
  { f: at(152, '登录'), s: 'pop_hi', v: 0.3 },
  { f: at(152, '纠错'), s: 'pop_hi', v: 0.3 },
  { f: LF(153), s: 'pop_hi', v: 0.3 },
  { f: LF(155), s: 'pop_lo', v: 0.35 },
];

// ========== P36 该看的指标 ==========
const METRICS = [
  { t: '任务完成率', i: <CheckCircle2 size={40} color={K.blue} strokeWidth={2.2} />, at: at(156, '任务') },
  { t: '人工接管次数', i: <Hand size={40} color={K.blue} strokeWidth={2.2} />, at: at(157, '人工') },
  { t: '省下多少时间', i: <Clock size={40} color={K.blue} strokeWidth={2.2} />, at: LF(158) },
];
const P36: React.FC = () => {
  return (
    <Shell a={14217} b={14853} kicker="WHAT MATTERS ｜ 看什么" title="比下载量更重要的，是这三个数">
      <In at={LF(156)} style={{ position: 'absolute', left: X0, top: 268 }}>
        <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 40, color: K.mute }}>
          <Strike at={LF(156) + 30}>下载量</Strike>
        </div>
      </In>
      {METRICS.map((m, i) => (
        <Card key={m.t} x={X0 + i * 340} y={360} w={320} h={210} at={m.at - 4} hot tone="blue">
          {m.i}
          <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 36, color: K.ink, marginTop: 14 }}>{m.t}</div>
        </Card>
      ))}
      <In at={LF(159)} style={{ position: 'absolute', left: X0, top: 630 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Body size={30} color={K.mute} weight={800}>偶尔成功</Body>
          <Body size={30} color={K.mute}>→</Body>
          <Body size={30} color={K.mute} weight={800}>让人发一次截图</Body>
        </div>
      </In>
      <In at={LF(161)} style={{ position: 'absolute', left: X0, top: 710 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Body size={36} color={K.ink} weight={900}>稳定省事</Body>
          <Body size={36} color={K.blue}>→</Body>
          <Body size={36} color={K.blue} weight={900}>才可能长期使用</Body>
        </div>
      </In>
    </Shell>
  );
};
const P36cues: Cue[] = [
  { f: 14217, s: 'swish', v: 0.25 },
  { f: LF(156) + 30, s: 'swipe', v: 0.4 },
  ...METRICS.map((m) => ({ f: m.at - 4, s: 'pop', v: 0.3 })),
  { f: LF(159), s: 'tick', v: 0.25 },
  { f: LF(161), s: 'ding_lo', v: 0.2 },
];

// ========== P37 第二关: 让不让进门 ==========
const P37: React.FC = () => {
  const fr = useCurrentFrame();
  const amz = LF(167);
  const why1 = LF(168);
  const why2 = LF(169);
  const shop = LF(171);
  return (
    <Shell a={14860} b={15676} kicker="GATE 2 ｜ 让不让进门" title="第二关：其他商家和平台，让不让它进门" titleSize={48} source="来源：TechCrunch、GeekWire 2026-09-21；PYMNTS；Yahoo Finance">
      <In at={amz - 6} style={{ position: 'absolute', left: X0, top: 268, width: 560 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 36, color: K.ink }}>Amazon</div>
          <Chip tone="red" size={24}>拦截</Chip>
        </div>
        <div style={{ marginTop: 16, background: '#fff', border: `2px solid ${K.rule}`, boxShadow: '0 10px 24px rgba(14,17,22,.08)', padding: '18px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldAlert size={26} color={K.red} strokeWidth={2.2} />
            <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 20, color: K.red }}>9 月 20 日晚起弹窗（原文）</div>
          </div>
          <div style={{ fontFamily: FONT.serif, fontSize: 26, color: K.ink, lineHeight: 1.3, marginTop: 10 }}>“Continued access by an unauthorized AI agent violates Amazon's Conditions of Use.”</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 20, color: K.mute, marginTop: 8 }}>未经授权的 AI agent 继续访问，违反亚马逊使用条件</div>
        </div>
      </In>
      {[
        { t: '不表明自己是 AI', at: why1 },
        { t: '疑似保存了登录凭证', at: why1 + 30 },
        { t: '事先没打招呼', at: why2 },
      ].map((w, i) => (
        <In key={w.t} at={w.at} style={{ position: 'absolute', left: X0, top: 660 + i * 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, background: K.red }} />
            <Body size={26} color={K.ink} weight={700}>{w.t}</Body>
          </div>
        </In>
      ))}
      <div style={{ position: 'absolute', left: 700, top: 268, width: 2, height: 560, background: K.rule, opacity: prog(fr, shop - 10, shop) }} />
      <In at={shop - 4} style={{ position: 'absolute', left: 740, top: 268, width: 370 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Brand icon={siShopify} size={36} />
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 36, color: K.ink }}>Shopify</div>
          <Chip tone="blue" size={24}>接入</Chip>
        </div>
        <Body size={26} color={K.ink} weight={700} style={{ marginTop: 18 }}>
          9 月 21 日起，对符合条件的美国商家
          <span style={{ color: K.blue }}>默认开启</span>在 Muse 里用 Shop Pay 结账
        </Body>
        <Note style={{ marginTop: 10 }}>商家可以手动关闭</Note>
      </In>
    </Shell>
  );
};
const P37cues: Cue[] = [
  { f: 14860, s: 'swish', v: 0.25 },
  { f: LF(167) - 6, s: 'pop_lo', v: 0.35 },
  { f: LF(168), s: 'tick', v: 0.25 },
  { f: LF(168) + 30, s: 'tick', v: 0.25 },
  { f: LF(169), s: 'tick', v: 0.25 },
  { f: LF(171) - 4, s: 'pop', v: 0.32 },
];

// ========== P38 各算各的账 ==========
const P38: React.FC = () => {
  const fr = useCurrentFrame();
  const l = LF(174);
  const r = LF(175);
  const eq = LF(176);
  const hi = LF(178);
  const tilt = fr < r ? -6 * prog(fr, l, l + 20, E.out) : -6 + 12 * prog(fr, r, r + 30, E.inOut) - 6 * prog(fr, r + 30, r + 60, E.inOut);
  return (
    <Shell a={15680} b={16398} kicker="THE MATH ｜ 平台的账" title="各个平台，都会算自己的账">
      <div style={{ position: 'absolute', left: 560, top: 290, opacity: prog(fr, LF(173), LF(173) + 16) }}>
        <div style={{ position: 'absolute', left: -6, top: 30, width: 12, height: 250, background: K.ink }} />
        <div style={{ position: 'absolute', left: -80, top: 270, width: 160, height: 14, background: K.ink }} />
        <div style={{ position: 'absolute', left: -380, top: 20, width: 760, height: 10, background: K.ink, transform: `rotate(${tilt}deg)`, transformOrigin: 'center' }}>
          <div style={{ position: 'absolute', left: 0, top: 10, width: 2, height: 90, background: K.ink }} />
          <div style={{ position: 'absolute', right: 0, top: 10, width: 2, height: 90, background: K.ink }} />
        </div>
      </div>
      <In at={l} style={{ position: 'absolute', left: X0, top: 420 + tilt * 5, width: 360 }}>
        <div style={{ background: K.blueSoft, border: `3px solid ${K.blue}`, padding: '18px 20px', textAlign: 'center' }}>
          <Body size={30} color={K.blue} weight={900}>增加订单</Body>
        </div>
      </In>
      <In at={r} style={{ position: 'absolute', left: 750, top: 420 - tilt * 5, width: 360 }}>
        <div style={{ background: K.redSoft, border: `3px solid ${K.red}`, padding: '18px 20px', textAlign: 'center' }}>
          <Body size={28} color={K.red} weight={900}>交出用户关系和交易入口</Body>
        </div>
      </In>
      <In at={eq} style={{ position: 'absolute', left: X0, top: 640, width: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'nowrap' }}>
          <Body size={30} color={K.ink} weight={900}>Muse 的能力上限 =</Body>
          <Chip tone="ink" size={28}>AI 会不会操作</Chip>
          <Body size={30} color={K.ink} weight={900}>×</Body>
          <span style={{ transform: `scale(${fr >= hi ? 1 + 0.08 * Math.sin(Math.min(1, (fr - hi) / 12) * Math.PI) : 1})`, display: 'inline-block' }}>
            <Chip tone={fr >= hi ? 'blue' : 'mute'} size={28}>别人允不允许它操作</Chip>
          </span>
        </div>
      </In>
    </Shell>
  );
};
const P38cues: Cue[] = [
  { f: 15680, s: 'swish', v: 0.25 },
  { f: LF(174), s: 'pop', v: 0.3 },
  { f: LF(175), s: 'pop_lo', v: 0.32 },
  { f: LF(176), s: 'tick', v: 0.25 },
  { f: LF(178), s: 'ding', v: 0.2 },
];

// ========== P39 WhatsApp 的门 ==========
const P39: React.FC = () => {
  const end = LF(183);
  return (
    <Shell a={16409} b={16987} kicker="NO PERMANENT MOAT ｜ 渠道" title="自家渠道，也不是永久的独家优势" titleSize={50} source="来源：The Decoder 2026-07-14；WABetaInfo 2026-09-04；Business Standard 2026-09-07">
      <VTimeline
        y={268}
        gap={112}
        items={[
          { date: '2026.01.15', text: 'WhatsApp 移出第三方通用 AI，只留自家', at: LF(179) + 10 },
          { date: '2026.06', text: '欧盟下达临时措施：重新向其他 AI 开放', at: LF(181), hot: true },
          { date: '2026.07.13', text: 'ChatGPT 在欧洲经济区回到 WhatsApp', at: LF(182), hot: true },
          { date: '2026.09', text: 'WhatsApp 小范围测试接入第三方 agent', sub: '少数国家的部分安卓测试用户，每个账号最多接 5 个', at: LF(182) + 50 },
        ]}
      />
      <In at={end} style={{ position: 'absolute', left: X0, top: 745 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Chip tone="ink" size={30}>有分发优势</Chip>
          <Body size={40} color={K.ink} weight={900}>≠</Body>
          <Chip tone="blue" size={30}>能永远排除竞争</Chip>
        </div>
      </In>
    </Shell>
  );
};
const P39cues: Cue[] = [
  { f: 16409, s: 'swish', v: 0.25 },
  { f: LF(179) + 10, s: 'tick', v: 0.28 },
  { f: LF(181), s: 'tick', v: 0.28 },
  { f: LF(182), s: 'tick', v: 0.28 },
  { f: LF(182) + 50, s: 'tick', v: 0.28 },
  { f: LF(183), s: 'pop_lo', v: 0.32 },
];

// ========== P40 第三关: 成本 ==========
const P40: React.FC = () => {
  const fr = useCurrentFrame();
  const cost = LF(187);
  const out = LF(188);
  const tag = (x: number, a: number) =>
    fr >= a ? (
      <div style={{ position: 'absolute', left: x, top: 430, display: 'flex', alignItems: 'center', gap: 6, opacity: prog(fr, a, a + 12) }}>
        <Zap size={22} color={K.red} strokeWidth={2.4} />
        <Body size={21} color={K.red} weight={800}>算力成本</Body>
      </div>
    ) : null;
  return (
    <Shell a={16993} b={17515} kicker="GATE 3 ｜ 账算不算得过来" title="第三关：这笔账能不能算得过来" titleSize={52}>
      <Steps
        y={300}
        h={100}
        gap={60}
        size={30}
        items={[
          { t: '查资料', at: LF(185), w: 250 },
          { t: '开网页', at: at(186, '开网页'), w: 250 },
          { t: '比较商品', at: at(186, '比较'), w: 290 },
        ]}
      />
      {tag(X0 + 60, cost)}
      {tag(X0 + 370, cost + 8)}
      {tag(X0 + 700, cost + 16)}
      <In at={out} style={{ position: 'absolute', left: X0, top: 540, width: 1000 }}>
        <div style={{ display: 'flex', gap: 40 }}>
          <div style={{ flex: 1, border: `3px solid ${K.ink}`, padding: '20px 24px', background: '#fff' }}>
            <Body size={30} color={K.ink} weight={900}>最后买了</Body>
            <Body size={22} color={K.sub}>成本已经花出去了</Body>
          </div>
          <div style={{ flex: 1, border: `3px solid ${K.red}`, padding: '20px 24px', background: K.redSoft }}>
            <Body size={30} color={K.red} weight={900}>最后没买</Body>
            <Body size={22} color={K.sub}>成本同样已经花出去了</Body>
          </div>
        </div>
      </In>
    </Shell>
  );
};
const P40cues: Cue[] = [
  { f: 16993, s: 'swish', v: 0.25 },
  { f: LF(185), s: 'tick', v: 0.28 },
  { f: at(186, '开网页'), s: 'tick', v: 0.28 },
  { f: at(186, '比较'), s: 'tick', v: 0.28 },
  { f: LF(187), s: 'data_run', v: 0.25 },
  { f: LF(188), s: 'pop_lo', v: 0.32 },
];

// ========== P41a 预测是交易额 ==========
const RangeBar: React.FC<{ y: number; name: string; lo: number; hi: number; at: number; label: string; hot?: boolean }> = ({ y, name, lo, hi, at: a, label, hot }) => {
  const fr = useCurrentFrame();
  const W = 760;
  const x0 = 340;
  const p = prog(fr, a, a + 30, E.out);
  if (fr < a - 4) return null;
  return (
    <>
      <div style={{ position: 'absolute', left: X0, top: y + 6, fontFamily: FONT.cn, fontWeight: 800, fontSize: 28, color: K.ink, opacity: prog(fr, a - 4, a + 8) }}>{name}</div>
      <div style={{ position: 'absolute', left: x0, top: y, width: W, height: 48, background: '#EEF0F3' }} />
      <div style={{ position: 'absolute', left: x0 + (W * lo) / 10000, top: y, width: ((W * (hi - lo)) / 10000) * p, height: 48, background: hot ? K.blue : K.gray }} />
      <div style={{ position: 'absolute', left: Math.min(x0 + (W * lo) / 10000, x0 + W - 300), width: 300, textAlign: lo > 5000 ? 'right' : 'left', top: y + 56, fontFamily: FONT.display, fontWeight: 800, fontSize: 26, color: hot ? K.blue : K.sub, opacity: prog(fr, a + 10, a + 24), whiteSpace: 'nowrap' }}>{label}</div>
    </>
  );
};
const P41a: React.FC = () => {
  const fr = useCurrentFrame();
  const opt = LF(193);
  return (
    <Shell a={17519} b={18040} kicker="FORECASTS ｜ 机构预测" title="大数字是交易额，不是收入" source="2030 年美国 AI 代购的交易额预测。来源：Morgan Stanley 2025-12；McKinsey 2025-10（前提：18% 的零售交给 agent）">
      <In at={LF(190)} style={{ position: 'absolute', left: 340, top: 268, width: 760, display: 'flex', justifyContent: 'space-between' }}>
        {['$0', '$2500亿', '$5000亿', '$7500亿', '$1万亿'].map((t) => (
          <span key={t} style={{ fontFamily: FONT.geistMono, fontSize: 18, color: K.mute }}>{t}</span>
        ))}
      </In>
      <RangeBar y={320} name="摩根士丹利" lo={1900} hi={3850} at={LF(191)} label="$1900亿到$3850亿" />
      <RangeBar y={460} name="麦肯锡" lo={9000} hi={10000} at={LF(192)} label="$9000亿到$1万亿" hot />
      {fr > opt && (
        <div style={{ position: 'absolute', left: 340 + 380, top: 600, width: 380 * prog(fr, opt, opt + 24, E.out), height: 16, borderLeft: `3px solid ${K.blue}`, borderRight: `3px solid ${K.blue}`, borderBottom: `3px solid ${K.blue}`, opacity: prog(fr, opt, opt + 5) }} />
      )}
      <In at={opt + 10} style={{ position: 'absolute', left: 340 + 380, top: 632, width: 380, textAlign: 'center' }}>
        <Body size={26} color={K.blue} weight={900}>乐观：$5000亿到$1万亿</Body>
        <Note>这是交易额，不是 Meta 的收入</Note>
      </In>
    </Shell>
  );
};
const P41acues: Cue[] = [
  { f: 17519, s: 'swish', v: 0.25 },
  { f: LF(191), s: 'data_run', v: 0.25 },
  { f: LF(192), s: 'data_run', v: 0.25 },
  { f: LF(193) + 10, s: 'pop', v: 0.3 },
];

// ========== P41b 粗算 vs 一季度广告 ==========
const P41b: React.FC = () => {
  const fr = useCurrentFrame();
  const eqA = LF(196);
  const res = LF(197);
  const cmp = LF(198);
  const cost = LF(200);
  const W = 800;
  const MAX = 600;
  return (
    <Shell a={18043} b={18627} kicker="BACK OF ENVELOPE ｜ 粗算" title="就算独占市场、抽成 4%……" source="4% 参考：ChatGPT 结账据报道向商家收取 4%（PYMNTS，OpenAI 未公开）。粗算只说明量级。来源：Meta 2026 年二季度财报">
      <In at={eqA} style={{ position: 'absolute', left: X0, top: 280 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, fontFamily: FONT.display, fontWeight: 800, fontSize: 38, color: K.ink, whiteSpace: 'nowrap' }}>
          <span>$5000亿到$1万亿</span>
          <span style={{ color: K.mute }}>×</span>
          <span style={{ color: K.blue }}>4%</span>
          <span style={{ color: K.mute, opacity: prog(fr, res, res + 10) }}>≈</span>
          <span style={{ color: K.blue, opacity: prog(fr, res, res + 14) }}>$200亿到$400亿</span>
          <span style={{ fontFamily: FONT.cn, fontSize: 26, color: K.sub, opacity: prog(fr, res, res + 14) }}>/ 年</span>
        </div>
      </In>
      {fr >= cmp && (
        <>
          <div style={{ position: 'absolute', left: X0, top: 430, fontFamily: FONT.cn, fontWeight: 800, fontSize: 26, color: K.ink }}>粗算：一年的抽成收入</div>
          <div style={{ position: 'absolute', left: X0, top: 474, width: ((W * 200) / MAX) * prog(fr, cmp, cmp + 30, E.out), height: 50, background: K.blue }} />
          <div style={{ position: 'absolute', left: X0 + (W * 200) / MAX, top: 474, width: ((W * 200) / MAX) * prog(fr, cmp + 10, cmp + 40, E.out), height: 50, background: K.blue, opacity: 0.45 }} />
          <div style={{ position: 'absolute', left: X0 + (W * 400) / MAX + 14, top: 480, fontFamily: FONT.display, fontWeight: 800, fontSize: 32, color: K.blue, opacity: prog(fr, cmp + 30, cmp + 44) }}>$200亿到$400亿</div>
        </>
      )}
      {fr >= LF(199) && (
        <>
          <div style={{ position: 'absolute', left: X0, top: 570, fontFamily: FONT.cn, fontWeight: 800, fontSize: 26, color: K.ink }}>Meta 一个季度的广告收入（2026 Q2）</div>
          <div style={{ position: 'absolute', left: X0, top: 614, width: ((W * 594) / MAX) * prog(fr, LF(199), LF(199) + 30, E.out), height: 50, background: K.ink }} />
          <div style={{ position: 'absolute', left: X0 + (W * 594) / MAX - 150, top: 680, fontFamily: FONT.display, fontWeight: 800, fontSize: 32, color: K.ink, opacity: prog(fr, LF(199) + 26, LF(199) + 40) }}>$594亿</div>
        </>
      )}
      <In at={cost} style={{ position: 'absolute', left: X0, top: 760, width: 1000 }}>
        <Body size={28} color={K.ink} weight={800}>
          还要减去算力等业务成本 → <span style={{ color: K.red }}>能不能盈利，还说不好</span>
        </Body>
      </In>
    </Shell>
  );
};
const P41bcues: Cue[] = [
  { f: 18043, s: 'swish', v: 0.25 },
  { f: LF(196), s: 'tick', v: 0.28 },
  { f: LF(197), s: 'pop', v: 0.32 },
  { f: LF(198), s: 'data_run', v: 0.22 },
  { f: LF(199), s: 'data_run', v: 0.22 },
  { f: LF(200), s: 'pop_lo', v: 0.3 },
];

// ========== P42 疯狂砸钱 ==========
const P42: React.FC = () => {
  const q = LF(205);
  return (
    <Shell a={18632} b={18933} kicker="SPENDING ｜ 投入" title="Meta 在疯狂砸钱" source="注：这是公司整体投入，不全是 Muse 的成本。来源：Meta 2026 年二季度财报；路透社 2026-07-29">
      <Card x={X0} y={270} w={490} h={220} at={18640} hot tone="ink">
        <Stat v="$1300亿到$1450亿" label="2026 年计划资本开支，大量投向 AI 基础设施" size={40} />
      </Card>
      <Card x={620} y={270} w={490} h={220} at={18660} hot tone="red">
        <Stat v="$7.84亿" label="二季度自由现金流（去年同期 $85.5 亿）；财报后股价盘后跌约 10%" size={40} color={K.red} />
      </Card>
      <In at={LF(204)} style={{ position: 'absolute', left: X0, top: 560, width: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Pop at={q}>
            <HelpCircle size={96} color={K.blue} strokeWidth={2} />
          </Pop>
          <Body size={34} color={K.ink} weight={900}>这个商业模式最终能不能赚钱，还要打个问号</Body>
        </div>
      </In>
    </Shell>
  );
};
const P42cues: Cue[] = [{ f: 18632, s: 'swish', v: 0.25 }, { f: 18640, s: 'pop', v: 0.3 }, { f: 18660, s: 'pop', v: 0.3 }, { f: LF(205), s: 'pop_lo', v: 0.35 }];

// ========== P43 第四关: 放不放心 (全屏 + 侧卡) ==========
const P43: React.FC = () => {
  const fr = useCurrentFrame();
  const q1 = LF(208) - 4;
  const q2 = LF(210) - 4;
  return (
    <SideCard a={18940} b={19384} w={660} kicker="GATE 4 ｜ 放不放心">
      <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 40, color: K.ink, lineHeight: 1.3 }}>第四关：用户能不能放心把事情交给它</div>
      <div style={{ height: 2, background: K.rule, margin: '18px 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: prog(fr, q1, q1 + 14) }}>
        <Wallet size={40} color={K.red} strokeWidth={2} />
        <Body size={30} color={K.ink} weight={900}>会不会乱用我的数据、乱花我的钱？</Body>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, opacity: prog(fr, q2, q2 + 14) }}>
        <HelpCircle size={40} color={K.red} strokeWidth={2} />
        <Body size={30} color={K.ink} weight={900}>它到底优先替谁考虑？</Body>
      </div>
    </SideCard>
  );
};
const P43cues: Cue[] = [{ f: 18940, s: 'whoosh_in', v: 0.26 }, { f: LF(208) - 4, s: 'pop_lo', v: 0.32 }, { f: LF(210) - 4, s: 'pop_lo', v: 0.32 }];

// ========== P44 训练数据规则 + 争议 ==========
const P44: React.FC = () => {
  const worry = LF(216);
  return (
    <Shell a={19412} b={20047} kicker="THE RULES ｜ 按 Meta 公开的规则" title="对话记录，默认会拿去训练" source="来源：Meta 研究博客《How We Built Safety Into Muse》2026-09-08；WIRED 2026-09-20（记者试用后的评价与 Meta 的回应）">
      <Steps
        y={270}
        h={96}
        gap={56}
        size={25}
        items={[
          { t: '对话 + 执行记录', at: LF(212), w: 270 },
          { t: '去掉关键个人信息', at: LF(213), w: 290, tone: 'ink' },
          { t: '默认用于训练模型', at: LF(214), w: 290, tone: 'red' },
        ]}
      />
      <Pop at={LF(215)} origin="left center" style={{ position: 'absolute', left: X0, top: 392 }}>
        <Chip tone="blue" size={26}>可以在设置里关闭</Chip>
      </Pop>
      <div style={{ position: 'absolute', left: X0, top: 470, width: 1000, opacity: 1 }}>
        <Quote
          x={0}
          y={0}
          w={480}
          at={worry}
          zhAt={worry + 20}
          size={24}
          en="I'm convinced this AI tool is more obsessed with collecting data about me than actually getting stuff done."
          zh="我确信，它更热衷于收集我的数据，而不是真把事办成。"
          who="WIRED 记者试用几天后"
        />
        <Quote
          x={530}
          y={0}
          w={470}
          at={worry + 40}
          zhAt={worry + 60}
          size={24}
          en="…with built-in protections and user controls that put people absolutely in charge…"
          zh="Muse 内置了保护措施和用户控制，让人们完全做主。"
          who="Meta 发言人的回应"
        />
      </div>
    </Shell>
  );
};
const P44cues: Cue[] = [
  { f: 19412, s: 'swish', v: 0.25 },
  { f: LF(212), s: 'tick', v: 0.25 },
  { f: LF(213), s: 'tick', v: 0.25 },
  { f: LF(214), s: 'pop_lo', v: 0.3 },
  { f: LF(215), s: 'pop_hi', v: 0.3 },
  { f: LF(216), s: 'click_soft', v: 0.3 },
  { f: LF(216) + 40, s: 'click_soft', v: 0.3 },
];

// ========== P45 推荐的理由 (全屏 + 侧卡) ==========
const P45: React.FC = () => {
  const fr = useCurrentFrame();
  const ask = LF(220);
  const a1 = at(220, '更适合');
  const a2 = LF(221);
  return (
    <SideCard a={20053} b={20605} w={600} kicker="THE QUESTION ｜ 用户有理由问">
      <Body size={26} color={K.sub} weight={700}>如果以后助手能从交易里收费……</Body>
      <div style={{ height: 2, background: K.rule, margin: '18px 0' }} />
      <div style={{ opacity: prog(fr, ask, ask + 14) }}>
        <Body size={32} color={K.ink} weight={900}>它推荐这家店，是因为：</Body>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <div style={{ flex: 1, padding: '16px 18px', border: `3px solid ${K.blue}`, background: K.blueSoft, opacity: prog(fr, a1, a1 + 12) }}>
          <Body size={26} color={K.blue} weight={900}>A 更适合你</Body>
        </div>
        <div style={{ flex: 1, padding: '16px 18px', border: `3px solid ${K.red}`, background: K.redSoft, opacity: prog(fr, a2, a2 + 12) }}>
          <Body size={26} color={K.red} weight={900}>B 给的钱更多</Body>
        </div>
      </div>
    </SideCard>
  );
};
const P45cues: Cue[] = [{ f: 20053, s: 'whoosh_in', v: 0.28 }, { f: LF(220), s: 'tick', v: 0.28 }, { f: at(220, '更适合'), s: 'pop', v: 0.3 }, { f: LF(221), s: 'pop_lo', v: 0.3 }];

// ========== P47 上线地区 ==========
const P47: React.FC = () => {
  const fr = useCurrentFrame();
  return (
    <Shell a={20812} b={21022} kicker="AVAILABILITY ｜ 上线地区" title="Muse 目前只在美国和加拿大上线">
      <In at={20830} style={{ position: 'absolute', left: X0, top: 300 }}>
        <div style={{ display: 'flex', gap: 24 }}>
          {['美国', '加拿大'].map((c, i) => (
            <div key={c} style={{ padding: '26px 40px', border: `3px solid ${K.blue}`, background: K.blueSoft, opacity: prog(fr, 20830 + i * 10, 20844 + i * 10) }}>
              <Body size={44} color={K.blue} weight={900}>{c} ✓</Body>
            </div>
          ))}
        </div>
      </In>
      <In at={LF(225)} style={{ position: 'absolute', left: X0, top: 480 }}>
        <div style={{ padding: '22px 34px', border: `3px dashed ${K.gray}`, display: 'inline-block' }}>
          <Body size={36} color={K.mute} weight={800}>其他地区：暂时还不支持</Body>
        </div>
      </In>
    </Shell>
  );
};
const P47cues: Cue[] = [{ f: 20830, s: 'pop', v: 0.3 }, { f: 20840, s: 'pop', v: 0.3 }, { f: LF(225), s: 'tick', v: 0.28 }];

// ========== P48 降低门槛 ==========
const P48: React.FC = () => {
  const fr = useCurrentFrame();
  const who = LF(228);
  return (
    <Shell a={21027} b={21296} kicker="IN SHORT ｜ 本质" title="Muse 更多是降低了使用门槛">
      <In at={21040} style={{ position: 'absolute', left: X0, top: 300 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <AppTile src={MEDIA.openclawIcon} letter="O" size={90} />
          <div>
            <Body size={30} color={K.ink} weight={900}>OpenClaw</Body>
            <Body size={24} color={K.mute}>自己部署、自己维护</Body>
          </div>
          <div style={{ width: 120 * prog(fr, 21060, 21090, E.inOut), height: 4, background: K.ink, marginLeft: 10 }} />
          <div style={{ opacity: prog(fr, 21085, 21100) }}>
            <MuseIcon size={90} style={{ borderRadius: 21 }} />
          </div>
          <div style={{ opacity: prog(fr, 21085, 21100) }}>
            <Body size={30} color={K.ink} weight={900}>Muse</Body>
            <Body size={24} color={K.blue}>下载就能用</Body>
          </div>
        </div>
      </In>
      <In at={who} style={{ position: 'absolute', left: X0, top: 500 }}>
        <div style={{ borderLeft: `6px solid ${K.blue}`, paddingLeft: 22 }}>
          <Body size={40} color={K.ink} weight={900}>
            一个面向<span style={{ color: K.blue }}>普通人</span>的个人 AI 助理
          </Body>
        </div>
      </In>
    </Shell>
  );
};
const P48cues: Cue[] = [{ f: 21027, s: 'swish', v: 0.25 }, { f: 21085, s: 'pop', v: 0.3 }, { f: LF(228), s: 'ding_lo', v: 0.18 }];

// ========== P49 / P50 / P51 结尾 (全屏) ==========
// P49 国内 + 豆包打车: 「比如豆包」头像弹出 →「现在已经在部分」打车 + 小车沿路线开 →「城市推出了打车功能」三城依次亮
const DB = { who: LF(231), what: LF(232), cities: LF(233) };
const CITIES = ['北京', '杭州', '苏州'];
const RideRoute: React.FC<{ at: number }> = ({ at: a }) => {
  const fr = useCurrentFrame();
  const W = 440;
  const draw = prog(fr, a, a + 20, E.inOut);
  const car = prog(fr, a + 8, a + 70, E.inOut);
  const arrive = spr(fr, a + 70, { damping: 10, stiffness: 220 });
  return (
    <div style={{ position: 'relative', width: W + 60, height: 58, opacity: prog(fr, a, a + 8) }}>
      <MapPin size={34} color={K.mute} strokeWidth={2.2} style={{ position: 'absolute', left: 0, top: 10 }} />
      <div style={{ position: 'absolute', left: 42, right: 42, top: 29, height: 0, borderTop: `3px dashed ${K.rule}` }} />
      <div style={{ position: 'absolute', left: 42, top: 27, width: (W - 24) * draw, height: 5, background: K.blue, borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: 30 + (W - 30) * car, top: 8, transform: 'translateX(-50%)' }}>
        <div style={{ width: 44, height: 40, borderRadius: 12, background: K.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(31,94,255,.35)' }}>
          <Car size={26} color="#fff" strokeWidth={2.4} />
        </div>
      </div>
      <MapPin size={34} color={K.blue} strokeWidth={2.4} style={{ position: 'absolute', right: 0, top: 10, transform: `scale(${fr >= a + 70 ? 0.8 + 0.2 * Math.min(1.2, arrive) : 0.8})`, transformOrigin: '50% 100%' }} />
    </div>
  );
};
const P49: React.FC = () => {
  const fr = useCurrentFrame();
  const pop = spr(fr, DB.who, { damping: 10, stiffness: 190 });
  const dim = prog(fr, DB.who - 6, DB.who + 10);
  return (
    <SideCard a={21312} b={21724} w={620} kicker="AT HOME ｜ 国内">
      <div style={{ opacity: 1 - dim * 0.45 }}>
        <Body size={34 - 6 * dim} color={K.ink} weight={900}>
          国内也已经有不止一家，
          <br />
          在推个人 AI 助理的功能
        </Body>
      </div>
      {fr >= DB.who - 2 && (
        <>
          <div style={{ height: 2, background: K.rule, margin: '18px 0 16px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ transform: `scale(${pop})`, transformOrigin: '50% 60%' }}>
              <AppTile src={MEDIA.doubaoIcon} letter="豆" size={92} bg="#DCEBFF" />
            </div>
            <div style={{ opacity: prog(fr, DB.who + 4, DB.who + 16), transform: `translateX(${(1 - prog(fr, DB.who + 4, DB.who + 20, E.out)) * 14}px)` }}>
              <div style={{ fontFamily: FONT.cn, fontWeight: 900, fontSize: 52, color: K.ink, lineHeight: 1.05 }}>豆包</div>
              <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 22, color: K.sub, marginTop: 4 }}>字节跳动的 AI 助手</div>
            </div>
          </div>
        </>
      )}
      {fr >= DB.what - 2 && (
        <div style={{ marginTop: 18, opacity: prog(fr, DB.what, DB.what + 12) }}>
          <Body size={32} color={K.ink} weight={900}>
            已在部分城市上线<span style={{ color: K.blue }}>打车</span>
          </Body>
          <div style={{ marginTop: 10 }}>
            <RideRoute at={DB.what + 4} />
          </div>
        </div>
      )}
      {fr >= DB.cities - 2 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {CITIES.map((c, i) => {
              const s = spr(fr, DB.cities + i * 9, { damping: 12, stiffness: 200 });
              return (
                <div key={c} style={{ transform: `scale(${s})`, opacity: Math.min(1, s * 2) }}>
                  <Chip tone="blue" size={26}>{c}</Chip>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 14, opacity: prog(fr, DB.cities + 24, DB.cities + 40) }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{ fontFamily: FONT.geistMono, fontSize: 19, color: K.blue, width: 64 }}>6 月</span>
              <Body size={21}>北京、杭州部分用户灰度测试</Body>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{ fontFamily: FONT.geistMono, fontSize: 19, color: K.blue, width: 64 }}>9 月</span>
              <Body size={21}>与曹操出行合作，北京、杭州、苏州首批上线</Body>
            </div>
            <Note style={{ marginTop: 8 }}>来源：TechNode 2026-06-23；曹操出行新闻稿 2026-09-10</Note>
          </div>
        </div>
      )}
    </SideCard>
  );
};
const P49cues: Cue[] = [
  { f: 21312, s: 'whoosh_in', v: 0.25 },
  { f: DB.who, s: 'pop_hi', v: 0.42 },
  { f: DB.who + 6, s: 'ding', v: 0.22 },
  { f: DB.what + 12, s: 'swish', v: 0.3 },
  { f: DB.what + 74, s: 'click', v: 0.35 },
  ...CITIES.map((_, i) => ({ f: DB.cities + i * 9, s: 'tick', v: 0.3 })),
];
const P50: React.FC = () => {
  const fr = useCurrentFrame();
  return (
    <SideCard a={21730} b={22120} w={600} kicker="SO ｜ 所以">
      <div style={{ opacity: prog(fr, 21730, 21746) }}>
        <Body size={34} color={K.ink} weight={900}>不用费劲去注册</Body>
      </div>
      <div style={{ opacity: prog(fr, LF(236), LF(236) + 14), marginTop: 8 }}>
        <Body size={34} color={K.ink} weight={900}>更不需要焦虑</Body>
      </div>
      <div style={{ height: 2, background: K.rule, margin: '18px 0', opacity: prog(fr, LF(237), LF(237) + 10) }} />
      <div style={{ opacity: prog(fr, LF(237), LF(237) + 16) }}>
        <Body size={30} color={K.blue} weight={900}>等一个更符合国情的「Muse」</Body>
      </div>
    </SideCard>
  );
};
const P51: React.FC = () => {
  const fr = useCurrentFrame();
  const ask = LF(241);
  const bye = LF(243);
  return (
    <SideCard a={22130} b={22552} w={620} kicker="YOUR TURN ｜ 聊聊">
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <MuseIcon size={70} style={{ borderRadius: 16 }} />
        <Body size={36} color={K.ink} weight={900}>你用上 Muse 了吗？</Body>
      </div>
      <div style={{ opacity: prog(fr, ask, ask + 16), marginTop: 18 }}>
        <Body size={28} color={K.sub} weight={700}>使用体验如何？欢迎在评论区分享</Body>
      </div>
      <div style={{ opacity: prog(fr, bye, bye + 16), marginTop: 20 }}>
        <Chip tone="blue" size={30}>下期见</Chip>
      </div>
    </SideCard>
  );
};

export const PAGES3: PageDef[] = [
  { id: 'P34a', a: 13091, b: 13270, mode: 'take', C: P34a, sfx: [{ f: 13091 - 62, s: 'riser', v: 0.3 }, { f: 13094, s: 'thud', v: 0.45 }] },
  { id: 'P34b', a: 13274, b: 13428, mode: 'split', C: P34b, sfx: [0, 1, 2, 3].map((i) => ({ f: 13290 + i * 12, s: 'tick', v: 0.3 })) },
  { id: 'P35', a: 13432, b: 14203, mode: 'split', C: P35, sfx: P35cues },
  { id: 'P36', a: 14217, b: 14853, mode: 'split', C: P36, sfx: P36cues },
  { id: 'P37', a: 14860, b: 15676, mode: 'split', C: P37, sfx: P37cues },
  { id: 'P38', a: 15680, b: 16398, mode: 'split', C: P38, sfx: P38cues },
  { id: 'P39', a: 16409, b: 16987, mode: 'split', C: P39, sfx: P39cues },
  { id: 'P40', a: 16993, b: 17515, mode: 'split', C: P40, sfx: P40cues },
  { id: 'P41a', a: 17519, b: 18040, mode: 'split', C: P41a, sfx: P41acues },
  { id: 'P41b', a: 18043, b: 18627, mode: 'split', C: P41b, sfx: P41bcues },
  { id: 'P42', a: 18632, b: 18933, mode: 'split', C: P42, sfx: P42cues },
  { id: 'P43', a: 18940, b: 19384, mode: 'full', C: P43, sfx: P43cues },
  { id: 'P44', a: 19412, b: 20047, mode: 'split', C: P44, sfx: P44cues },
  { id: 'P45', a: 20053, b: 20605, mode: 'full', C: P45, sfx: P45cues },
  { id: 'P47', a: 20812, b: 21022, mode: 'split', C: P47, sfx: P47cues },
  { id: 'P48', a: 21027, b: 21296, mode: 'split', C: P48, sfx: P48cues },
  { id: 'P49', a: 21312, b: 21724, mode: 'full', C: P49, sfx: P49cues },
  { id: 'P50', a: 21730, b: 22120, mode: 'full', C: P50, sfx: [{ f: 21730, s: 'whoosh_in', v: 0.25 }, { f: LF(236), s: 'tick', v: 0.25 }, { f: LF(237), s: 'pop', v: 0.28 }] },
  { id: 'P51', a: 22130, b: 22552, mode: 'full', C: P51, sfx: [{ f: 22130, s: 'whoosh_in', v: 0.25 }, { f: LF(241), s: 'tick', v: 0.25 }, { f: LF(243), s: 'ding', v: 0.22 }] },
];
