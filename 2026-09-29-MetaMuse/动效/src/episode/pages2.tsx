// 第三部分: Meta 为什么要做 Muse (2:17 – 4:22)
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { siAndroid, siApple, siFacebook, siInstagram, siShopify, siStripe, siWhatsapp } from './brands';
import { Brain, Cloud, Coins, Glasses, Megaphone, Smartphone, Store, Users } from 'lucide-react';
import { E, prog, spr } from '../engine/anim';
import { FONT } from '../engine/fonts';
import { Brand } from '../engine/icons';
import { RemapClip } from '../engine/media';
import { MEDIA, MuseAvatar, MuseIcon } from './assets';
import { AppTile, Body, Card, Chapter, Chip, Cue, Donut, In, K, Kicker, Note, PageDef, Pop, Quote, Shell, SideCard, Stat, Steps, X0 } from '../engine/kit';
import { at, LF } from './time';

// ========== P21 章节卡 ==========
const P21: React.FC = () => <Chapter a={6865} b={6992} n="02" title="Meta 为什么要做 Muse" sub="把这一年多的动作连起来看" />;

// ========== P22 放在一起看 ==========
const PILLARS = [
  { t: '模型', d: '自研 Muse Spark', s: '2026 年 4 月发布', icon: <Brain size={40} color={K.blue} strokeWidth={2.2} />, at: at(81, '模型') },
  {
    t: '社交应用',
    d: (
      <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
        <Brand icon={siWhatsapp} size={30} />
        <Brand icon={siInstagram} size={30} />
        <Brand icon={siFacebook} size={30} />
      </span>
    ),
    s: 'WhatsApp、Instagram、Facebook',
    icon: <Users size={40} color={K.blue} strokeWidth={2.2} />,
    at: at(81, '社交'),
  },
  { t: '眼镜', d: 'AI 眼镜、Muse Charm', s: '2026 年 9 月发布会', icon: <Glasses size={40} color={K.blue} strokeWidth={2.2} />, at: LF(82) },
];
const P22: React.FC = () => {
  const fr = useCurrentFrame();
  const a = 6995;
  const three = at(83, '三个');
  return (
    <Shell a={a} b={7433} kicker="THE BIGGER PICTURE ｜ 放在一起看" title="单独看是 AI 助手，放在一起看……" source="注：2025 年 6 月 Meta 成立超级智能实验室，7 月扎克伯格发表公开信《Personal Superintelligence》。来源：CNBC 2025-06-30；Meta 官网">
      <In at={LF(80)} style={{ position: 'absolute', left: X0, top: 268 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <MuseIcon size={60} style={{ borderRadius: 14 }} />
          <Body size={32} color={K.ink} weight={800}>Muse：一个 AI 助手</Body>
        </div>
      </In>
      {PILLARS.map((p, i) => (
        <Card key={p.t} x={X0 + i * 340} y={380} w={320} h={270} at={p.at - 4} hot tone="blue">
          {p.icon}
          <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 38, color: K.ink, marginTop: 12 }}>{p.t}</div>
          <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 24, color: K.ink, marginTop: 10 }}>{p.d}</div>
          <div style={{ fontFamily: FONT.cn, fontSize: 19, color: K.mute, marginTop: 8 }}>{p.s}</div>
        </Card>
      ))}
      <In at={three - 4} style={{ position: 'absolute', left: X0, top: 700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Body size={28} color={K.ink} weight={800}>至少有三个目的：</Body>
          {['入口', '用户', '赚钱'].map((t, i) => (
            <span key={t} style={{ opacity: prog(fr, three + 8 + i * 8, three + 20 + i * 8) }}>
              <Chip tone="blue" size={28}>{`${i + 1} ${t}`}</Chip>
            </span>
          ))}
        </div>
      </In>
    </Shell>
  );
};
const P22cues: Cue[] = [
  { f: 6995, s: 'whoosh_in', v: 0.28 },
  { f: LF(80), s: 'tick', v: 0.3 },
  ...PILLARS.map((p) => ({ f: p.at - 4, s: 'pop', v: 0.3 })),
  ...[0, 1, 2].map((i) => ({ f: at(83, '三个') + 8 + i * 8, s: 'tick', v: 0.3 })),
];

// ========== P23 目的一: 入口 ==========
const P23: React.FC = () => {
  const fr = useCurrentFrame();
  const box = (y: number, at0: number, children: React.ReactNode, hot?: boolean) => {
    if (fr < at0) return null;
    const p = prog(fr, at0, at0 + 16, E.out);
    return (
      <div style={{ position: 'absolute', left: X0, top: y, width: 540, height: 96, border: `3px solid ${hot ? K.red : K.ink}`, background: hot ? K.redSoft : '#fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}>
        {children}
      </div>
    );
  };
  const arrow = (y: number, at0: number, label: string) => {
    if (fr < at0) return null;
    const p = prog(fr, at0, at0 + 12);
    return (
      <div style={{ position: 'absolute', left: X0 + 40, top: y, height: 56, display: 'flex', alignItems: 'center', gap: 14, opacity: p }}>
        <div style={{ width: 3, height: 56 * p, background: K.ink }} />
        <Body size={22} color={K.mute} weight={700}>{label}</Body>
      </div>
    );
  };
  const platform = LF(89);
  return (
    <Shell a={7440} b={7988} kicker="PURPOSE 1 ｜ 入口" title="目的一：争一个自己说了算的入口" source="来源：CNBC 2022-02-02（Meta 首席财务官在财报电话会上的估计）">
      {box(270, LF(85), <Body size={30} color={K.ink} weight={800}>你想办一件事</Body>)}
      {arrow(370, LF(86), '先拿出手机')}
      {box(430, LF(86) + 10, (
        <>
          <Smartphone size={34} color={K.ink} />
          <Body size={30} color={K.ink} weight={800}>手机系统</Body>
          <span style={{ display: 'inline-flex', gap: 10, marginLeft: 8 }}>
            <Brand icon={siApple} size={30} color="#111" />
            <Brand icon={siAndroid} size={30} />
          </span>
        </>
      ), fr >= platform)}
      {arrow(530, LF(87), '再打开对应的 App')}
      {box(590, LF(87) + 10, (
        <>
          <Body size={30} color={K.ink} weight={800}>各家 App</Body>
          <span style={{ display: 'inline-flex', gap: 10, marginLeft: 8 }}>
            <Brand icon={siWhatsapp} size={30} />
            <Brand icon={siInstagram} size={30} />
            <Brand icon={siFacebook} size={30} />
          </span>
        </>
      ))}
      <In at={LF(88)} style={{ position: 'absolute', left: 700, top: 440, width: 410 }}>
        <div style={{ borderLeft: `6px solid ${K.red}`, paddingLeft: 20 }}>
          <Body size={30} color={K.ink} weight={800}>Meta 的产品，</Body>
          <Body size={30} color={K.red} weight={800}>跑在苹果和谷歌的平台里</Body>
        </div>
      </In>
      <Card x={700} y={620} w={410} h={210} at={platform + 20} tone="red" hot>
        <Stat v="$100亿" label="苹果改了隐私规则后，Meta 估计 2022 年收入因此减少约这么多" color={K.red} size={52} />
      </Card>
    </Shell>
  );
};
const P23cues: Cue[] = [
  { f: 7440, s: 'swish', v: 0.25 },
  { f: LF(85), s: 'tick', v: 0.28 },
  { f: LF(86) + 10, s: 'tick', v: 0.28 },
  { f: LF(87) + 10, s: 'tick', v: 0.28 },
  { f: LF(88), s: 'pop_lo', v: 0.3 },
  { f: LF(89) + 20, s: 'pop', v: 0.3 },
];

// ========== P24 谁先接到这句话 (全屏 + 侧卡) ==========
const P24: React.FC = () => {
  const fr = useCurrentFrame();
  const say = LF(91);
  const first = at(92, '最先');
  const imp = LF(93);
  return (
    <SideCard a={7996} b={8344} w={620} kicker="WHO GETS THE CALL ｜ 谁先接到">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, opacity: prog(fr, say - 6, say + 10) }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, background: '#E3E5EA', flex: 'none' }} />
        <div style={{ background: K.blue, color: '#fff', fontFamily: FONT.cn, fontWeight: 800, fontSize: 34, padding: '14px 24px', borderRadius: '6px 22px 22px 22px' }}>帮我把这件事办了</div>
      </div>
      <div style={{ marginLeft: 26, width: 3, height: 46 * prog(fr, first - 6, first + 8), background: K.ink, margin: '12px 0 12px 26px' }} />
      <div style={{ opacity: prog(fr, first, first + 14), display: 'flex', alignItems: 'center', gap: 14 }}>
        <Chip tone="ink" size={28}>最先接到这句话的产品</Chip>
      </div>
      <div style={{ marginTop: 18, opacity: prog(fr, imp, imp + 16) }}>
        <Body size={30} color={K.ink} weight={800}>
          会变得<span style={{ color: K.blue }}>越来越重要</span>
        </Body>
      </div>
    </SideCard>
  );
};
const P24cues: Cue[] = [
  { f: 7996, s: 'whoosh_in', v: 0.28 },
  { f: LF(91) - 6, s: 'pop_hi', v: 0.3 },
  { f: at(92, '最先'), s: 'tick', v: 0.3 },
  { f: LF(93), s: 'ding_lo', v: 0.2 },
];

// ========== P25 硬件: AI 眼镜 + Muse Charm ==========
const Charm: React.FC<{ at: number }> = ({ at: a }) => {
  const fr = useCurrentFrame();
  if (fr < a) return null;
  const p = spr(fr, a, { damping: 14, stiffness: 120 });
  const bob = Math.sin((fr - a) / 18) * 4;
  return (
    <div style={{ position: 'relative', width: 230, height: 300, transform: `translateY(${(1 - Math.min(1, p)) * 60 + bob}px) rotate(-6deg)`, opacity: Math.min(1, p * 1.5) }}>
      {/* 钥匙环 */}
      <div style={{ position: 'absolute', left: 88, top: 0, width: 54, height: 54, borderRadius: 27, border: `6px solid ${K.gray}` }} />
      <div style={{ position: 'absolute', left: 20, top: 40, width: 190, height: 240, borderRadius: 54, background: 'linear-gradient(160deg, #F5F2EC, #DCD6CC)', boxShadow: '0 20px 40px rgba(14,17,22,.25), inset 0 2px 0 rgba(255,255,255,.8)' }}>
        <div style={{ position: 'absolute', left: 24, top: 32, width: 142, height: 142, borderRadius: 30, background: '#10131A', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MuseAvatar size={112} />
        </div>
        <div style={{ position: 'absolute', left: 88, top: 196, width: 14, height: 14, borderRadius: 7, background: '#10131A' }} />
      </div>
    </div>
  );
};
const P25: React.FC = () => {
  const fr = useCurrentFrame();
  const a = 8373;
  const glasses = LF(97);
  const charm = at(98, 'Muse Charm') - 10;
  const facts = [
    { t: '钥匙扣大小，按一下就能说话', at: LF(99) },
    { t: '不用解锁手机、不用打开 App', at: LF(99) + 30 },
    { t: '2 英寸屏幕显示 Muse 形象', at: LF(100) },
    { t: '前后各一个摄像头，计划 12 月发货', at: LF(100) + 30 },
  ];
  return (
    <Shell a={a} b={9010} kicker="HARDWARE ｜ 2026 Connect 发布会" title="所以要把 Muse 和硬件放在一起做" titleSize={52} source="来源：Meta 新闻稿（Connect 2026）；Connect 开场演讲实录；TechCrunch 2026-09-23。右图为示意，非产品实拍">
      <In at={glasses - 10} style={{ position: 'absolute', left: X0, top: 262 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          <div style={{ width: 300, height: 389, overflow: 'hidden', border: `3px solid ${K.ink}`, background: '#000', flex: 'none' }}>
            <RemapClip src={MEDIA.demo.glasses} keys={[[glasses - 10, 27.6]]} />
          </div>
          <div style={{ width: 270, paddingTop: 4 }}>
            <Glasses size={36} color={K.blue} strokeWidth={2.2} />
            <Body size={30} color={K.ink} weight={900} style={{ marginTop: 8 }}>Muse 要上 AI 眼镜</Body>
            <Note>未来几个月推出</Note>
            <Body size={22} color={K.sub} style={{ marginTop: 12 }}>叫出它的名字，它就能针对你眼前看到的东西行动</Body>
            <Note style={{ marginTop: 14 }}>画面：Meta Connect 2026 官方视频（和你的 Muse 实时对话）</Note>
          </div>
        </div>
      </In>
      <div style={{ position: 'absolute', left: 740, top: 250 }}>
        <Charm at={charm} />
      </div>
      <In at={charm + 6} style={{ position: 'absolute', left: 975, top: 300 }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 38, color: K.ink, lineHeight: 1.1 }}>
          Muse
          <br />
          Charm
        </div>
        <Chip tone="mute" size={18}>示意</Chip>
      </In>
      {facts.map((f, i) => (
        <In key={f.t} at={f.at} style={{ position: 'absolute', left: X0 + (i % 2) * 500, top: 700 + Math.floor(i / 2) * 56, width: 490 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, background: K.blue, flex: 'none' }} />
            <Body size={24} color={K.ink} weight={700}>{f.t}</Body>
          </div>
        </In>
      ))}
    </Shell>
  );
};
const P25cues: Cue[] = [
  { f: 8373, s: 'swish', v: 0.25 },
  { f: LF(97) - 10, s: 'pop_lo', v: 0.3 },
  { f: at(98, 'Muse Charm') - 10, s: 'pop', v: 0.35 },
  { f: LF(99), s: 'tick', v: 0.25 },
  { f: LF(99) + 30, s: 'tick', v: 0.25 },
  { f: LF(100), s: 'tick', v: 0.25 },
  { f: LF(100) + 30, s: 'tick', v: 0.25 },
];

// ========== P26 少走几步 ==========
const P26: React.FC = () => {
  const fr = useCurrentFrame();
  const now = LF(102);
  const later = LF(104);
  const dim = prog(fr, later, later + 20);
  return (
    <Shell a={9018} b={9470} kicker="FEWER STEPS ｜ 背后的想法" title="想到什么，直接交给 AI">
      <In at={now - 6} style={{ position: 'absolute', left: X0, top: 285 }}>
        <Body size={26} color={K.mute} weight={800}>现在</Body>
      </In>
      <div style={{ opacity: 1 - dim * 0.55 }}>
        <Steps
          y={330}
          h={100}
          gap={46}
          size={30}
          items={[
            { t: '找手机', at: now, w: 200, tone: 'ink' },
            { t: '解锁', at: now + 16, w: 180, tone: 'ink' },
            { t: '打开 App', at: now + 32, w: 220, tone: 'ink' },
            { t: '再操作', at: now + 48, w: 200, tone: 'ink' },
          ]}
        />
      </div>
      <In at={later - 6} style={{ position: 'absolute', left: X0, top: 505 }}>
        <Body size={26} color={K.blue} weight={800}>以后</Body>
      </In>
      <Steps
        y={550}
        h={120}
        gap={60}
        size={34}
        items={[
          { t: '说一句 / 按一下', at: later + 4, w: 360, tone: 'blue' },
          { t: '需求直接交给 AI', at: LF(105), w: 400, tone: 'blue' },
        ]}
      />
    </Shell>
  );
};
const P26cues: Cue[] = [
  { f: 9018, s: 'swish', v: 0.25 },
  ...[0, 1, 2, 3].map((i) => ({ f: LF(102) + i * 16, s: 'tick', v: 0.25 })),
  { f: LF(104) + 4, s: 'pop', v: 0.32 },
  { f: LF(105), s: 'pop_hi', v: 0.32 },
];

// ========== P27 目的二: 自家应用 ==========
const P27: React.FC = () => {
  const fr = useCurrentFrame();
  const rows = [
    { icon: siWhatsapp, name: 'WhatsApp', t: '直接在 WhatsApp 里用 Muse', n: '今年 1 月 15 日起，WhatsApp 移出了 ChatGPT、Copilot、Perplexity，只留自家 AI（欧洲经济区 7 月起有例外）', at: LF(109) },
    { icon: siInstagram, name: 'Instagram', t: '可以搜 Reels 短视频库', n: '', at: at(110, 'Instagram') },
    { icon: siFacebook, name: 'Facebook', t: '接入 Marketplace 二手市场', n: '', at: at(110, 'Facebook') },
  ];
  return (
    <Shell a={9480} b={10268} kicker="PURPOSE 2 ｜ 用户" title="目的二：用自家应用，接触会用 agent 的人" titleSize={50} source="来源：The Decoder 2026-07-14；WIRED 2026-09-20；TechCrunch 2026-09-25（引 Sensor Tower）">
      {rows.map((r, i) => (
        <In key={r.name} at={r.at - 4} style={{ position: 'absolute', left: X0, top: [280, 430, 540][i] }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <AppTile size={72}>
              <Brand icon={r.icon} size={44} />
            </AppTile>
            <div>
              <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 32, color: K.ink }}>{r.t}</div>
              {r.n && <Note style={{ width: 880, marginTop: 6 }}>{r.n}</Note>}
            </div>
          </div>
        </In>
      ))}
      <Card x={X0} y={660} w={1000} h={160} at={LF(111)} hot tone="blue">
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <Stat v="10" unit="天" label="" color={K.blue} size={70} />
          <Body size={26} color={K.ink} weight={700}>9 月 9 日起在自家 App 里投放推广，10 天内拿下自家推广位的大多数，不必从零培养用户习惯</Body>
        </div>
      </Card>
    </Shell>
  );
};
const P27cues: Cue[] = [
  { f: 9480, s: 'swish', v: 0.25 },
  { f: LF(109) - 4, s: 'pop', v: 0.3 },
  { f: at(110, 'Instagram') - 4, s: 'pop', v: 0.3 },
  { f: at(110, 'Facebook') - 4, s: 'pop', v: 0.3 },
  { f: LF(111), s: 'pop_lo', v: 0.32 },
];

// ========== P28 别人 vs Meta (全屏 + 侧卡) ==========
const P28: React.FC = () => {
  const fr = useCurrentFrame();
  const other = LF(113);
  const meta = LF(115);
  return (
    <SideCard a={10276} b={10660} w={640} kicker="DISTRIBUTION ｜ 起跑线">
      <div style={{ opacity: prog(fr, other, other + 14) * (1 - 0.45 * prog(fr, meta, meta + 16)) }}>
        <Body size={24} color={K.mute} weight={800}>别家</Body>
        <Body size={32} color={K.ink} weight={800}>先说服你，下载一个陌生的 App</Body>
      </div>
      <div style={{ height: 2, background: K.rule, margin: '20px 0' }} />
      <div style={{ opacity: prog(fr, meta, meta + 14) }}>
        <Body size={24} color={K.blue} weight={800}>Meta</Body>
        <Body size={32} color={K.ink} weight={800}>
          在你<span style={{ color: K.blue }}>已经在用的 App</span> 里，
          <br />
          直接把助手递到你面前
        </Body>
      </div>
    </SideCard>
  );
};
const P28cues: Cue[] = [{ f: 10276, s: 'whoosh_in', v: 0.28 }, { f: LF(113), s: 'tick', v: 0.28 }, { f: LF(115), s: 'pop', v: 0.3 }];

// ========== P29 目的三: 广告占 98% ==========
const P29: React.FC = () => {
  const fr = useCurrentFrame();
  const d = LF(120);
  return (
    <Shell a={10690} b={11235} kicker="PURPOSE 3 ｜ 赚钱" title="目的三：在广告之外，再开一门生意" source="来源：Meta 2026 年二季度财报（广告收入 $593.6 亿 / 总收入 $608.0 亿）">
      <Donut cx={330} cy={500} r={150} pct={0.976} at={d - 10}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 76, color: K.blue, lineHeight: 1 }}>98%</div>
        <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 24, color: K.ink, marginTop: 6 }}>来自广告</div>
      </Donut>
      <In at={d} style={{ position: 'absolute', left: 620, top: 330, width: 490 }}>
        <Body size={24} color={K.mute} weight={700}>2026 年二季度</Body>
        <Stat v="$593.6亿" label="广告收入" color={K.blue} size={56} />
        <div style={{ height: 16 }} />
        <Stat v="$608.0亿" label="总收入" size={56} />
      </In>
      <In at={LF(121)} style={{ position: 'absolute', left: X0, top: 700 }}>
        <Body size={24} color={K.mute} weight={800}>广告模式</Body>
      </In>
      <Steps
        y={740}
        h={80}
        gap={56}
        size={26}
        items={[
          { t: '商家', at: LF(122), w: 180 },
          { t: '花钱买广告', at: LF(122) + 14, w: 220 },
          { t: '争取让你看到', at: LF(123), w: 260, tone: 'blue' },
        ]}
      />
    </Shell>
  );
};
const P29cues: Cue[] = [
  { f: 10690, s: 'swish', v: 0.25 },
  { f: LF(120) - 10, s: 'data_run', v: 0.25 },
  { f: LF(120) + 20, s: 'pop', v: 0.3 },
  { f: LF(122), s: 'tick', v: 0.25 },
  { f: LF(122) + 14, s: 'tick', v: 0.25 },
  { f: LF(123), s: 'tick', v: 0.25 },
];

// ========== P30 个人 agent 往前走一步 ==========
const P30: React.FC = () => {
  const fr = useCurrentFrame();
  const show = LF(126);
  const cmp = at(127, '比较');
  const pick = at(127, '选择');
  const deal = LF(128);
  const bracket = (x: number, w: number, y: number, a: number, text: string, color: string) => {
    if (fr < a) return null;
    const p = prog(fr, a, a + 18, E.out);
    return (
      <div style={{ position: 'absolute', left: x, top: y, width: w * p, opacity: p }}>
        <div style={{ height: 14, borderLeft: `3px solid ${color}`, borderRight: `3px solid ${color}`, borderBottom: `3px solid ${color}` }} />
        <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 26, color, marginTop: 10, whiteSpace: 'nowrap' }}>{text}</div>
      </div>
    );
  };
  return (
    <Shell a={11240} b={11736} kicker="ONE STEP FURTHER ｜ 交易链条" title="个人 agent 可能再往前走一步">
      <Steps
        y={330}
        h={110}
        gap={50}
        size={32}
        items={[
          { t: '展示商品', at: show, w: 210 },
          { t: '比较', at: cmp, w: 190, tone: 'blue' },
          { t: '选择', at: pick, w: 190, tone: 'blue' },
          { t: '完成交易', at: deal, w: 210, tone: 'blue' },
        ]}
      />
      {bracket(X0, 210, 460, show + 20, '广告：做到这一步', K.mute)}
      {bracket(X0, 950, 580, deal + 10, '个人 agent：可能参与全程', K.blue)}
    </Shell>
  );
};
const P30cues: Cue[] = [
  { f: 11240, s: 'swish', v: 0.25 },
  { f: LF(126), s: 'tick', v: 0.28 },
  { f: at(127, '比较'), s: 'tick', v: 0.28 },
  { f: at(127, '选择'), s: 'tick', v: 0.28 },
  { f: LF(128), s: 'pop', v: 0.32 },
  { f: LF(128) + 10, s: 'swish', v: 0.2 },
];

// ========== P31 支付配套 + 扎克伯格原话 ==========
const P31: React.FC = () => {
  const fr = useCurrentFrame();
  const q = LF(132);
  return (
    <Shell a={11742} b={12253} kicker="PAYMENTS ｜ 支付配套" title="支付已经在接入，Meta 还想抽佣" source="来源：Meta 研究博客 2026-09-08；PYMNTS；Yahoo Finance；Meta Connect 2026 开场演讲（2026-09-23）">
      <div style={{ position: 'absolute', inset: 0 }}>
        <Card x={X0} y={268} w={490} h={200} at={at(130, 'Stripe') - 4} hot={fr < q} tone="blue">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Brand icon={siStripe} size={40} />
            <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 32, color: K.ink }}>Stripe Link</div>
          </div>
          <Body size={22} style={{ marginTop: 12 }}>上线时的付款合作方；每笔用一次性卡号</Body>
        </Card>
        <Card x={620} y={268} w={490} h={200} at={at(130, 'Shop Pay') - 4} hot={fr < q} tone="blue">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Brand icon={siShopify} size={40} />
            <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 32, color: K.ink }}>Shop Pay</div>
          </div>
          <Body size={22} style={{ marginTop: 12 }}>9 月 21 日起，对符合条件的美国商家默认开启 Muse 结账（可关闭）</Body>
        </Card>
      </div>
      <Quote
        y={540}
        at={q}
        zhAt={at(133, '抽')}
        size={31}
        en="We believe that Muse will make you money, and we're standing behind this by making Muse free for a huge number of tokens with the expectation that over time, we will profit by taking a small fee from transactions."
        zh="我们相信 Muse 能帮你赚钱……以后，我们会从交易里抽一小笔佣金。"
        who="扎克伯格，Connect 2026 开场演讲（抽多少、谁来付、何时开始，Meta 都还没公布）"
      />
    </Shell>
  );
};
const P31cues: Cue[] = [
  { f: 11742, s: 'swish', v: 0.25 },
  { f: at(130, 'Stripe') - 4, s: 'pop', v: 0.3 },
  { f: at(130, 'Shop Pay') - 4, s: 'pop', v: 0.3 },
  { f: LF(132), s: 'click_soft', v: 0.35 },
  { f: at(133, '抽'), s: 'ding_lo', v: 0.2 },
];

// ========== P32 拼图 ==========
const PIECES = [
  { k: '思考', v: '自家模型 Muse Spark', icon: <Brain size={44} color={K.blue} strokeWidth={2.2} />, at: LF(136), from: [-300, 0] },
  { k: '执行', v: '云端电脑', icon: <Cloud size={44} color={K.blue} strokeWidth={2.2} />, at: LF(137), from: [300, 0] },
  { k: '接触用户', v: '社交应用和硬件', icon: <Users size={44} color={K.blue} strokeWidth={2.2} />, at: LF(138), from: [-300, 0] },
  { k: '变现', v: '订阅 + 未来可能的交易手续费', icon: <Coins size={44} color={K.blue} strokeWidth={2.2} />, at: LF(139), from: [300, 0] },
];
const P32: React.FC = () => {
  const fr = useCurrentFrame();
  return (
    <Shell a={12259} b={12823} kicker="PUT TOGETHER ｜ 拼起来看" title="这些东西拼起来，思路就清楚了">
      {PIECES.map((p, i) => {
        if (fr < p.at - 4) return null;
        const s = spr(fr, p.at - 4, { damping: 15, stiffness: 140 });
        const x = X0 + (i % 2) * 505;
        const y = 280 + Math.floor(i / 2) * 290;
        return (
          <div key={p.k} style={{ position: 'absolute', left: x, top: y, width: 495, height: 270, transform: `translate(${(1 - Math.min(1, s)) * p.from[0]}px, 0)`, opacity: Math.min(1, s * 1.6), background: '#fff', border: `3px solid ${K.ink}`, boxSizing: 'border-box', padding: '26px 30px' }}>
            {p.icon}
            <div style={{ fontFamily: FONT.cn, fontWeight: 700, fontSize: 24, color: K.mute, marginTop: 14 }}>负责{p.k}</div>
            <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 36, color: K.ink, marginTop: 6, lineHeight: 1.3 }}>{p.v}</div>
          </div>
        );
      })}
    </Shell>
  );
};
const P32cues: Cue[] = [{ f: 12259, s: 'swish', v: 0.25 }, ...PIECES.map((p) => ({ f: p.at - 4, s: 'pop_lo', v: 0.35 }))];

// ========== P33 总结一句 (全屏 + 侧卡) ==========
const P33: React.FC = () => {
  const fr = useCurrentFrame();
  const plus = LF(142);
  return (
    <SideCard a={12829} b={13060} w={660} kicker="IN SHORT ｜ 一句话">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: prog(fr, LF(141), LF(141) + 14) }}>
        <Megaphone size={44} color={K.mute} strokeWidth={2} />
        <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 48, color: K.mute }}>卖广告</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, opacity: prog(fr, plus, plus + 14) }}>
        <Store size={44} color={K.blue} strokeWidth={2} />
        <div style={{ fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 44, color: K.ink, lineHeight: 1.25 }}>
          <span style={{ color: K.blue }}>+</span> 替你办事、帮你下单的平台
        </div>
      </div>
    </SideCard>
  );
};
const P33cues: Cue[] = [{ f: 12829, s: 'whoosh_in', v: 0.26 }, { f: LF(141), s: 'tick', v: 0.28 }, { f: LF(142), s: 'pop_lo', v: 0.35 }];

export const PAGES2: PageDef[] = [
  { id: 'P21', a: 6865, b: 6992, mode: 'take', C: P21, sfx: [{ f: 6865 - 62, s: 'riser', v: 0.3 }, { f: 6868, s: 'thud', v: 0.45 }] },
  { id: 'P22', a: 6995, b: 7433, mode: 'split', C: P22, sfx: P22cues },
  { id: 'P23', a: 7440, b: 7988, mode: 'split', C: P23, sfx: P23cues },
  { id: 'P24', a: 7996, b: 8344, mode: 'full', C: P24, sfx: P24cues },
  { id: 'P25', a: 8373, b: 9010, mode: 'split', C: P25, sfx: P25cues },
  { id: 'P26', a: 9018, b: 9470, mode: 'split', C: P26, sfx: P26cues },
  { id: 'P27', a: 9480, b: 10268, mode: 'split', C: P27, sfx: P27cues },
  { id: 'P28', a: 10276, b: 10660, mode: 'full', C: P28, sfx: P28cues },
  { id: 'P29', a: 10690, b: 11235, mode: 'split', C: P29, sfx: P29cues },
  { id: 'P30', a: 11240, b: 11736, mode: 'split', C: P30, sfx: P30cues },
  { id: 'P31', a: 11742, b: 12253, mode: 'split', C: P31, sfx: P31cues },
  { id: 'P32', a: 12259, b: 12823, mode: 'split', C: P32, sfx: P32cues },
  { id: 'P33', a: 12829, b: 13060, mode: 'full', C: P33, sfx: P33cues },
];
