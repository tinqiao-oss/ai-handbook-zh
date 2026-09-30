// 一期视频的总装: 人物在「全屏 / 右侧竖幅」之间切换, 左侧是版面, 章节处整屏卡, 底部字幕条, 右上角章节提示, 音效轨.
// 这里不含任何具体内容 —— 分镜 (pages)、章节、字幕、素材都由 episode/ 传进来 (见 episode/index.ts).
import React from 'react';
import { AbsoluteFill, Audio, getRemotionEnvironment, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { E, prog } from './anim';
import { H, W } from './config';
import { FONT } from './fonts';
import { BAR_H, Cue, K, PAGE_W, PageDef, SplitCtx } from './kit';
import { PresenterPlaceholder } from './media';

export type ChapterDef = { n: string; t: string; a: number };
export type EpisodeDef = {
  /** 全部分镜页, 按时间顺序 */
  pages: PageDef[];
  /** 右上角章节提示; a = 从哪一帧起显示这一章 */
  chapters: ChapterDef[];
  /** 底片里的跳剪点 (帧号). 每过一个剪辑点人物景别在两档之间交替 (全屏 1.00/1.06 倍, 分屏 1.00/1.12 倍), 让跳剪看起来是有意为之. 没有就留空数组 */
  cuts: number[];
  /** 当前帧显示哪句字幕 (来自 makeTimeline) */
  lineAt: (frame: number) => string | null;
  /** 各音效的音量修正 (相对 1) */
  sfxTrim?: Record<string, number>;
  /** 口播底片 (public/ 下的相对路径); 留空 = 占位人像 */
  presenter?: string | null;
  /** Studio 预览时用的低分辨率代理 (可选, 拖动更流畅); 留空就用 presenter */
  presenterPreview?: string | null;
  /** 人声 + 音乐音轨; 留空 = 只有音效 */
  voice?: string | null;
};
export type EpisodeProps = { sfx: boolean; sfxGain: number; chapterTag: boolean };

/** 某一帧之后最近的一张整屏章节卡在第几帧结束 (章节提示在卡片结束后再出现) */
export const takeEnd = (pages: PageDef[], from: number) =>
  pages.filter((p) => p.mode === 'take').find((p) => p.a >= from - 20)?.b ?? from;

const T_IN = 28; // 分屏展开用的帧数
const SFX_MAX = 300; // 每个音效最长播 6 秒 (自带音效都在 2.2 秒以内); 加更长的音效时调大
const T_OUT = 26; // 分屏收起用的帧数

export const createEpisode = (ep: EpisodeDef): React.FC<EpisodeProps> => {
  const { pages, chapters, cuts } = ep;

  // ---------- 分屏区间: 相邻的分屏页 / 章节页 (间隔 ≤30 帧) 合并成一段, 中间不收起 ----------
  type R = [number, number];
  const splitRanges: R[] = [];
  for (const p of pages) {
    if (p.mode === 'full') continue;
    const last = splitRanges[splitRanges.length - 1];
    if (last && p.a - last[1] <= 30) last[1] = Math.max(last[1], p.b);
    else splitRanges.push([p.a, p.b]);
  }
  const splitAt = (fr: number) => {
    for (const [a, b] of splitRanges) {
      if (fr >= a - T_IN && fr < b + T_OUT) {
        const i = prog(fr, a - T_IN, a + 2, E.inOut);
        const o = 1 - prog(fr, b - 4, b + T_OUT, E.inOut);
        return Math.min(i, o);
      }
    }
    return 0;
  };
  const segIdx = (fr: number) => cuts.reduce((n, c) => (fr >= c ? n + 1 : n), 0);

  // ---------- 底部字幕条 ----------
  const Ticker: React.FC = () => {
    const t = ep.lineAt(useCurrentFrame());
    return (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: BAR_H, background: K.bar, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: FONT.cn, fontWeight: 800, fontSize: 64, color: '#fff', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{t ?? ''}</div>
      </div>
    );
  };

  // ---------- 右上角章节提示 ----------
  // 有整屏章节卡的章: 卡片出现前隐去, 卡片结束后换成新章节再出来; 没有章节卡的章: 标签原地翻牌切换
  const takes = pages.filter((p) => p.mode === 'take').map((p) => [p.a, p.b] as [number, number]);
  const TagBody: React.FC<{ i: number }> = ({ i }) => (
    <div style={{ display: 'flex', alignItems: 'center', height: 48 }}>
      <div style={{ width: 58, height: 48, background: K.blue, color: '#fff', fontFamily: FONT.display, fontWeight: 800, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {chapters[i].n}
      </div>
      <div style={{ padding: '0 20px 0 14px', fontFamily: FONT.cnSerif, fontWeight: 900, fontSize: 24, color: K.ink, whiteSpace: 'nowrap' }}>{chapters[i].t}</div>
    </div>
  );
  const ChapterTag: React.FC = () => {
    const fr = useCurrentFrame();
    if (!chapters.length || fr < chapters[0].a) return null;
    let hide = 0;
    for (const [a, b] of takes) {
      if (fr >= a - 12 && fr < b + 18) hide = prog(fr, a - 12, a, E.in) * (1 - prog(fr, b, b + 18, E.out));
    }
    const vis = prog(fr, chapters[0].a, chapters[0].a + 18, E.out) * (1 - hide);
    if (vis <= 0.001) return null;
    const idx = chapters.reduce((acc, c, k) => (fr >= c.a ? k : acc), 0);
    const flipP = idx > 0 && hide === 0 ? prog(fr, chapters[idx].a, chapters[idx].a + 16, E.inOut) : 1;
    const flipping = flipP < 1 && fr >= chapters[idx].a && !takes.some(([, b]) => Math.abs(b - chapters[idx].a) < 2);
    return (
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: 34,
          height: 48,
          overflow: 'hidden',
          background: 'rgba(247,246,242,.96)',
          boxShadow: '0 8px 24px rgba(0,0,0,.22)',
          opacity: vis,
          transform: `translateX(${(1 - vis) * 40}px)`,
        }}
      >
        {flipping ? (
          <div style={{ position: 'relative' }}>
            <div style={{ transform: `translateY(${-flipP * 48}px)`, opacity: 1 - flipP }}>
              <TagBody i={idx - 1} />
            </div>
            <div style={{ position: 'absolute', left: 0, top: 0, transform: `translateY(${(1 - flipP) * 48}px)`, opacity: flipP }}>
              <TagBody i={idx} />
            </div>
          </div>
        ) : (
          <TagBody i={idx} />
        )}
      </div>
    );
  };

  // ---------- 音效轨: 分屏展开 / 收起自动配「嗖」声, 再加每页自己的音效点 ----------
  const autoSfx: Cue[] = splitRanges.flatMap(([a, b]) => [
    { f: a - T_IN, s: 'whoosh_in', v: 0.3 },
    { f: b - 4, s: 'whoosh_out', v: 0.2 },
  ]);
  const pageSfx: Cue[] = pages
    .flatMap((p) => p.sfx ?? [])
    .filter((c) => !(['swish', 'whoosh_in'].includes(c.s) && autoSfx.some((w) => w.s === 'whoosh_in' && c.f >= w.f && c.f - w.f < 45)));
  // 3 帧内挨着的两个音效只留音量大的那个 (同音量留先到的), 避免叠声发糊
  const merged: Cue[] = [...autoSfx, ...pageSfx].sort((x, y) => x.f - y.f);
  const allSfx: Cue[] = merged.filter(
    (c, i) => !merged.some((d, j) => j !== i && Math.abs(d.f - c.f) <= 3 && ((d.v ?? 0.3) > (c.v ?? 0.3) || ((d.v ?? 0.3) === (c.v ?? 0.3) && j < i))),
  );
  const trim = ep.sfxTrim ?? {};
  const SfxTrack: React.FC<{ gain: number }> = ({ gain }) => (
    <>
      {allSfx.map((c, i) => (
        <Sequence showInTimeline={false} key={i} from={Math.max(0, c.f)} durationInFrames={SFX_MAX} layout="none">
          <Audio showInTimeline={false} src={staticFile(`sfx/${c.s}.wav`)} volume={(c.v ?? 0.3) * (trim[c.s] ?? 1) * gain} />
        </Sequence>
      ))}
    </>
  );

  // ---------- 总装 ----------
  const Stage: React.FC<EpisodeProps> = ({ sfx, sfxGain, chapterTag }) => {
    const fr = useCurrentFrame();
    const sp = splitAt(fr);
    const odd = segIdx(fr) % 2 === 1;
    const s = (odd ? 1.06 : 1) * (1 - sp) + (odd ? 1.12 : 1) * sp;
    const winX = PAGE_W * sp;
    const winW = W - winX;
    const src = getRemotionEnvironment().isRendering ? ep.presenter : (ep.presenterPreview ?? ep.presenter);
    return (
      <AbsoluteFill showInTimeline={false} style={{ background: K.page }}>
        {/* 左侧版面 */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: PAGE_W, height: H - BAR_H, transform: `translateX(${(sp - 1) * PAGE_W * 0.35}px)`, opacity: sp }}>
          {pages.filter((p) => p.mode === 'split').map((p) => (
            <p.C key={p.id} />
          ))}
        </div>
        {/* 人物 */}
        <div style={{ position: 'absolute', left: winX, top: 0, width: winW, height: H, overflow: 'hidden', boxShadow: sp > 0.01 ? '-20px 0 40px rgba(0,0,0,.18)' : undefined }}>
          <div style={{ position: 'absolute', width: W * s, height: H * s, left: winW / 2 - (W / 2) * s, top: H / 2 - (H / 2) * s }}>
            {src ? <OffthreadVideo showInTimeline={false} src={staticFile(src)} muted style={{ width: '100%', height: '100%' }} /> : <PresenterPlaceholder />}
          </div>
        </div>
        {sp > 0.01 && <div style={{ position: 'absolute', left: winX, top: 0, width: 3, height: H, background: K.ink, opacity: sp }} />}
        {/* 全屏人物时的侧卡 + 整屏章节卡 */}
        <SplitCtx.Provider value={sp}>
          {pages.filter((p) => p.mode !== 'split').map((p) => (
            <p.C key={p.id} />
          ))}
        </SplitCtx.Provider>
        {chapterTag && <ChapterTag />}
        <Ticker />
        {/* 人声 + 音乐. 带音效时压低约 0.7 dB 留余量, 防止叠加削波 */}
        {ep.voice && <Audio showInTimeline={false} src={staticFile(ep.voice)} volume={sfx ? 0.92 : 1} />}
        {sfx && <SfxTrack gain={sfxGain} />}
      </AbsoluteFill>
    );
  };

  // 最外层只负责「整片在时间轴上的位置」; 分屏、版面、人物、字幕、音频都在 Stage 里用同一个帧号计算, 不会错位
  const Episode: React.FC<EpisodeProps> = (props) => (
    <AbsoluteFill showInTimeline={false} style={{ background: K.page }}>
      <Stage {...props} />
    </AbsoluteFill>
  );
  return Episode;
};
