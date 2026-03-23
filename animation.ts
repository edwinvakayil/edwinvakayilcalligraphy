import { HeroAnimation } from "./types";

const STYLE_ID = "rts-hero-animations";

const CSS = `
/* ─── Easing tokens (reused across all keyframes) ──────────────────────────
   All durations are tuned for perceptual smoothness:
   - spring  = cubic-bezier(0.16,1,0.3,1)   — soft, natural overshoot
   - snap    = cubic-bezier(0.77,0,0.18,1)   — fast-in, crisp-out
   - bounce  = cubic-bezier(0.34,1.56,0.64,1)— elastic overshoot
   - cinema  = cubic-bezier(0.4,0,0.2,1)     — material easing
   ──────────────────────────────────────────────────────────────────────── */

/* ── Batch 1 — originals ─────────────────────────────────────────────────── */
@keyframes rts-rise      {from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes rts-clip      {from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
@keyframes rts-pop       {0%{opacity:0;transform:scale(0.75)}60%{opacity:1;transform:scale(1.04)}100%{transform:scale(1)}}
@keyframes rts-blur      {from{opacity:0;filter:blur(14px);transform:scale(1.04)}to{opacity:1;filter:blur(0);transform:scale(1)}}
@keyframes rts-flip      {from{opacity:0;transform:perspective(600px) rotateX(30deg) translateY(20px)}to{opacity:1;transform:perspective(600px) rotateX(0) translateY(0)}}
@keyframes rts-swipe     {from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
@keyframes rts-bounce    {0%{opacity:0;transform:translateY(-60px)}60%{opacity:1;transform:translateY(10px)}80%{transform:translateY(-5px)}100%{transform:translateY(0)}}
@keyframes rts-type      {from{width:0}to{width:100%}}
@keyframes rts-blink     {50%{border-color:transparent}}
@keyframes rts-word-rise {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes rts-letter-in {from{opacity:0;transform:translateX(-16px) rotate(-4deg)}to{opacity:1;transform:none}}

/* ── Batch 2 — modern ────────────────────────────────────────────────────── */
@keyframes rts-velvet    {from{opacity:0;transform:translate(-12px,20px) skewX(4deg)}to{opacity:1;transform:none}}
@keyframes rts-curtain   {from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0% 0)}}
@keyframes rts-morph     {0%{opacity:0;transform:scaleY(0.3) scaleX(1.3) translateY(10px)}60%{opacity:1;transform:scaleY(1.08) scaleX(0.97)}100%{transform:none}}
@keyframes rts-ground    {from{transform:translateY(110%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes rts-cascade   {from{opacity:0;transform:translateY(-28px) translateX(10px) rotate(8deg)}to{opacity:1;transform:none}}
@keyframes rts-spotlight {0%{opacity:0;letter-spacing:0.3em;transform:scaleX(1.15)}100%{opacity:1;letter-spacing:-0.03em;transform:scaleX(1)}}
@keyframes rts-ink       {0%{opacity:0;transform:translateY(6px) scale(0.96)}100%{opacity:1;transform:none}}
@keyframes rts-hinge     {from{opacity:0;transform:perspective(400px) rotateY(-40deg) translateX(-20px)}to{opacity:1;transform:perspective(400px) rotateY(0) translateX(0)}}
@keyframes rts-stretch   {0%{opacity:0;transform:scaleX(0.05)}60%{transform:scaleX(1.04)}100%{opacity:1;transform:none}}
@keyframes rts-peel      {from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0% 0 0 0)}}
@keyframes rts-fold      {from{opacity:0;transform:rotateZ(-8deg) translateY(18px)}to{opacity:1;transform:none}}
@keyframes rts-shear     {from{opacity:0;transform:skewY(8deg) translateY(12px)}to{opacity:1;transform:none}}
/* ripple — elastic scale from compressed point, outward wave delay */
@keyframes rts-ripple-w  {
  0%  {opacity:0;transform:scale(0.4) translateY(20px)}
  55% {opacity:1;transform:scale(1.08) translateY(-3px)}
  75% {transform:scale(0.97) translateY(1px)}
  100%{opacity:1;transform:scale(1) translateY(0)}
}
/* cinch — character pinches on scaleX then snaps open with skew */
@keyframes rts-cinch {
  0%  {opacity:0;transform:scaleX(0) skewX(20deg)}
  50% {opacity:1;transform:scaleX(1.12) skewX(-4deg)}
  75% {transform:scaleX(0.95) skewX(1deg)}
  100%{opacity:1;transform:scaleX(1) skewX(0)}
}
/* tiltrise — words rise while untilting from a sideways lean */
@keyframes rts-tiltrise {
  0%  {opacity:0;transform:translateY(36px) rotate(-6deg) skewX(8deg)}
  65% {opacity:1;transform:translateY(-3px) rotate(0.5deg) skewX(-1deg)}
  100%{opacity:1;transform:translateY(0) rotate(0) skewX(0)}
}
@keyframes rts-cardflip  {from{opacity:0;transform:perspective(300px) rotateX(-90deg)}to{opacity:1;transform:perspective(300px) rotateX(0)}}
@keyframes rts-conv-l    {from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes rts-conv-r    {from{opacity:0;transform:translateX( 40px)}to{opacity:1;transform:translateX(0)}}
@keyframes rts-splitrise-t{from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:translateY(0)}}
@keyframes rts-splitrise-b{from{opacity:0;transform:translateY( 24px)}to{opacity:1;transform:translateY(0)}}

/* ── Batch 3 — new mechanics ─────────────────────────────────────────────── */

/* tectonic: words slam from alternating sides with skew — unique X+skew combo */
@keyframes rts-tec-l{from{opacity:0;transform:translateX(-55px) skewX(-7deg)}to{opacity:1;transform:none}}
@keyframes rts-tec-r{from{opacity:0;transform:translateX( 55px) skewX( 7deg)}to{opacity:1;transform:none}}

/* stratify: each word enters from deep Z with blur — different from blur (which is whole-el) */
@keyframes rts-strat{
  from{opacity:0;transform:perspective(900px) translateZ(-200px) rotateX(10deg);filter:blur(6px)}
  to  {opacity:1;transform:perspective(900px) translateZ(0)     rotateX(0);    filter:blur(0)}
}

/* unfurl: line expands from center — horizontal center-clip, not edge-clip */
@keyframes rts-unfurl{from{clip-path:inset(0 50% 0 50%)}to{clip-path:inset(0 0% 0 0%)}}

/* gravityWell: chars fall from sky with precise physics micro-rotation */
@keyframes rts-gwell{
  0%  {opacity:0;transform:translateY(-72px) scale(1.18) rotate(-3.5deg)}
  52% {opacity:1;transform:translateY(7px)  scale(0.98) rotate(0.4deg)}
  78% {transform:translateY(-3px) scale(1.005) rotate(0)}
  100%{opacity:1;transform:none}
}

/* orbit: words grow from dot, rotating on Z — scale+rotation combo, unique */
@keyframes rts-orbit{
  from{opacity:0;transform:scale(0.12) rotate(-28deg)}
  58% {opacity:1;transform:scale(1.07) rotate(2.5deg)}
  100%{opacity:1;transform:none}
}

/* liquid: per-word squash then overshoot spring — scaleY+scaleX cross-axis */
@keyframes rts-liquid{
  0%  {opacity:0;transform:scaleY(0.08) scaleX(1.5)  translateY(28px)}
  40% {opacity:1;transform:scaleY(1.12) scaleX(0.94) translateY(-4px)}
  65% {transform:scaleY(0.97) scaleX(1.015)}
  100%{opacity:1;transform:none}
}

/* noiseFade: 3 random opacity waveforms per word — signal-lock feel */
@keyframes rts-nf0{0%{opacity:0}22%{opacity:.7}44%{opacity:.1}66%{opacity:.95}88%{opacity:.4}100%{opacity:1}}
@keyframes rts-nf1{0%{opacity:0}18%{opacity:.8}38%{opacity:.15}58%{opacity:1}78%{opacity:.5}100%{opacity:1}}
@keyframes rts-nf2{0%{opacity:0}28%{opacity:.3}50%{opacity:.9}70%{opacity:.05}88%{opacity:.85}100%{opacity:1}}

/* slab: scaleX from-left stamp — fastest entrance, print-press energy */
@keyframes rts-slab{
  0%  {opacity:0;transform:scaleX(0)    skewX(8deg)}
  52% {opacity:1;transform:scaleX(1.05) skewX(-1deg)}
  100%{opacity:1;transform:none}
}

/* thread: chars ride individual sine-wave Y offsets set via CSS var */
@keyframes rts-thread{from{opacity:0;transform:translateY(var(--ty,18px))}to{opacity:1;transform:translateY(0)}}

/* billboard: whole-line rotateY — different axis from flip (rotateX) */
@keyframes rts-billboard{
  from{opacity:0;transform:perspective(800px) rotateY(-32deg) translateX(-24px);filter:blur(3px)}
  to  {opacity:1;transform:perspective(800px) rotateY(0)      translateX(0);    filter:blur(0)}
}

/* ═══════════════════════════════════════════════════════════════════════════
   CLASS DECLARATIONS — all animations use animation-fill-mode: both so
   the element stays at its final state without needing JS cleanup.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Batch 1 whole-element ───────────────────────────────────────────────── */
.rts-rise       {animation:rts-rise  0.9s  cubic-bezier(0.16,1,0.3,1)   both}
.rts-clip       {animation:rts-clip  1.1s  cubic-bezier(0.77,0,0.18,1)  both}
.rts-pop        {animation:rts-pop   0.7s  cubic-bezier(0.34,1.56,0.64,1) both}
.rts-blur       {animation:rts-blur  1s    cubic-bezier(0.16,1,0.3,1)   both}
.rts-flip       {animation:rts-flip  0.9s  cubic-bezier(0.16,1,0.3,1)   both;transform-origin:center bottom}
.rts-swipe      {animation:rts-swipe 0.8s  cubic-bezier(0.16,1,0.3,1)   both}
.rts-bounce     {animation:rts-bounce 0.9s cubic-bezier(0.36,0.07,0.19,0.97) both}
.rts-typewriter {overflow:hidden;white-space:nowrap;border-right:2px solid currentColor;width:0;animation:rts-type 1.6s steps(22,end) both,rts-blink 0.7s step-end 1.6s 3}

/* ── Batch 2 whole-element ───────────────────────────────────────────────── */
.rts-morph      {animation:rts-morph   0.8s cubic-bezier(0.34,1.56,0.64,1) both}
.rts-spotlight  {animation:rts-spotlight 1s cubic-bezier(0.16,1,0.3,1)    both}
.rts-stretch    {animation:rts-stretch 0.9s cubic-bezier(0.34,1.56,0.64,1) both}

/* ── Batch 3 whole-element ───────────────────────────────────────────────── */
.rts-unfurl     {animation:rts-unfurl    0.95s cubic-bezier(0.77,0,0.18,1) both}
.rts-billboard  {animation:rts-billboard 0.95s cubic-bezier(0.16,1,0.3,1)  both;transform-origin:left center}

/* ── Per-word / per-char spans (batch 1+2) ───────────────────────────────── */
.rts-word         {display:inline-block;opacity:0;transform:translateY(24px);animation:rts-word-rise 0.7s cubic-bezier(0.16,1,0.3,1) both}
.rts-letter       {display:inline-block;opacity:0;transform:translateX(-16px) rotate(-4deg);animation:rts-letter-in 0.5s cubic-bezier(0.16,1,0.3,1) both}
.rts-velvet-word  {display:inline-block;opacity:0;animation:rts-velvet  0.65s cubic-bezier(0.16,1,0.3,1) both}
.rts-curtain-word {display:inline-block;overflow:hidden;animation:rts-curtain 0.7s cubic-bezier(0.77,0,0.18,1) both}
.rts-ground-wrap  {display:inline-block;overflow:hidden;vertical-align:bottom}
.rts-ground-inner {display:inline-block;animation:rts-ground 0.65s cubic-bezier(0.16,1,0.3,1) both}
.rts-cascade-ch   {display:inline-block;opacity:0;animation:rts-cascade  0.45s cubic-bezier(0.34,1.56,0.64,1) both}
.rts-ink-word     {display:inline-block;opacity:0;animation:rts-ink      0.9s  cubic-bezier(0.16,1,0.3,1) both}
.rts-hinge-word   {display:inline-block;opacity:0;transform-origin:left center;animation:rts-hinge 0.6s cubic-bezier(0.16,1,0.3,1) both}
.rts-peel-word    {display:inline-block;overflow:hidden;animation:rts-peel 0.6s cubic-bezier(0.77,0,0.18,1) both}
.rts-fold-word    {display:inline-block;opacity:0;transform-origin:center bottom;animation:rts-fold 0.6s cubic-bezier(0.34,1.4,0.64,1) both}
.rts-shear-word   {display:inline-block;opacity:0;animation:rts-shear   0.65s cubic-bezier(0.16,1,0.3,1) both}
.rts-ripple-word  {display:inline-block;opacity:0;animation:rts-ripple-w 0.75s cubic-bezier(0.34,1.4,0.64,1) both}
.rts-cinch-ch     {display:inline-block;opacity:0;transform-origin:center;animation:rts-cinch 0.55s cubic-bezier(0.34,1.2,0.64,1) both}
.rts-tiltrise-word{display:inline-block;opacity:0;animation:rts-tiltrise 0.8s cubic-bezier(0.16,1,0.3,1) both}
.rts-cardflip-ch  {display:inline-block;opacity:0;transform-origin:center bottom;animation:rts-cardflip 0.4s cubic-bezier(0.34,1.4,0.64,1) both}
.rts-conv-l       {display:inline-block;opacity:0;animation:rts-conv-l  0.7s cubic-bezier(0.16,1,0.3,1) both}
.rts-conv-r       {display:inline-block;opacity:0;animation:rts-conv-r  0.7s cubic-bezier(0.16,1,0.3,1) both}
.rts-splitrise-t  {display:inline-block;opacity:0;animation:rts-splitrise-t 0.65s cubic-bezier(0.16,1,0.3,1) both}
.rts-splitrise-b  {display:inline-block;opacity:0;animation:rts-splitrise-b 0.65s cubic-bezier(0.16,1,0.3,1) both}

/* ── Per-word / per-char spans (batch 3) ────────────────────────────────── */
.rts-tec-l      {display:inline-block;opacity:0;animation:rts-tec-l  0.65s cubic-bezier(0.16,1,0.3,1) both}
.rts-tec-r      {display:inline-block;opacity:0;animation:rts-tec-r  0.65s cubic-bezier(0.16,1,0.3,1) both}
.rts-strat-word {display:inline-block;opacity:0;animation:rts-strat  0.85s cubic-bezier(0.16,1,0.3,1) both}
.rts-gwell-ch   {display:inline-block;opacity:0;animation:rts-gwell  0.62s cubic-bezier(0.36,0.07,0.19,0.97) both}
.rts-orbit-word {display:inline-block;opacity:0;transform-origin:center;animation:rts-orbit 0.65s cubic-bezier(0.34,1.4,0.64,1) both}
.rts-liquid-word{display:inline-block;opacity:0;transform-origin:center bottom;animation:rts-liquid 0.72s cubic-bezier(0.34,1.56,0.64,1) both}
.rts-nf0        {display:inline-block;opacity:0;animation:rts-nf0 0.9s ease both}
.rts-nf1        {display:inline-block;opacity:0;animation:rts-nf1 0.9s ease both}
.rts-nf2        {display:inline-block;opacity:0;animation:rts-nf2 0.9s ease both}
.rts-slab-word  {display:inline-block;opacity:0;transform-origin:left center;animation:rts-slab 0.5s cubic-bezier(0.77,0,0.18,1) both}
.rts-thread-ch  {display:inline-block;opacity:0;animation:rts-thread 0.55s cubic-bezier(0.16,1,0.3,1) both}

/* ── Batch 7 — 8 genuinely new mechanics ────────────────────────────────── */

/* glassReveal — backdrop-filter blur evaporates as text solidifies */
@keyframes rts-glass {
  0%  { opacity:0; filter:blur(0px); backdrop-filter:blur(20px); transform:scale(1.03) }
  35% { opacity:0.6; filter:blur(2px) }
  100%{ opacity:1; filter:blur(0px); backdrop-filter:blur(0px); transform:scale(1) }
}
.rts-glass { animation:rts-glass 1.2s cubic-bezier(0.16,1,0.3,1) both }

/* wordPop — per-word springs from 0 at its own center, pure scale */
@keyframes rts-wpop {
  0%  { opacity:0; transform:scale(0) }
  55% { opacity:1; transform:scale(1.08) }
  75% { transform:scale(0.97) }
  100%{ transform:scale(1) }
}
.rts-wpop-word { display:inline-block; opacity:0; animation:rts-wpop 0.55s cubic-bezier(0.34,1.56,0.64,1) both }

/* charDrop — pure gravity fall, no overshoot, no rotation */
@keyframes rts-cdrop {
  0%  { opacity:0; transform:translateY(-48px) }
  100%{ opacity:1; transform:translateY(0) }
}
.rts-cdrop-ch { display:inline-block; opacity:0; animation:rts-cdrop 0.6s cubic-bezier(0.55,0,1,0.45) both }

/* scanline — single-pixel horizontal clip expands to full height */
@keyframes rts-scan {
  0%  { clip-path:inset(49% 0 49% 0); opacity:0 }
  15% { opacity:1 }
  100%{ clip-path:inset(0% 0 0% 0) }
}
.rts-scan { animation:rts-scan 0.9s cubic-bezier(0.77,0,0.18,1) both }

/* chromaShift — RGB channel offsets collapse to zero */
@keyframes rts-chroma {
  0%  { opacity:0; text-shadow: -8px 0 0 rgba(255,0,80,0.7), 8px 0 0 rgba(0,200,255,0.7) }
  40% { opacity:1; text-shadow: -4px 0 0 rgba(255,0,80,0.35), 4px 0 0 rgba(0,200,255,0.35) }
  100%{ text-shadow:none }
}
.rts-chroma { animation:rts-chroma 1s cubic-bezier(0.16,1,0.3,1) both }

/* wordFade — pure cross-dissolve with warmth scale, no Y movement */
@keyframes rts-wfade {
  0%  { opacity:0; transform:scale(0.97) }
  100%{ opacity:1; transform:scale(1) }
}
.rts-wfade-word { display:inline-block; opacity:0; animation:rts-wfade 0.9s cubic-bezier(0.4,0,0.2,1) both }

/* rotateIn — full Y-axis card flip per word */
@keyframes rts-rotatein {
  0%  { opacity:0; transform:perspective(500px) rotateY(90deg) }
  55% { opacity:1; transform:perspective(500px) rotateY(-8deg) }
  100%{ transform:perspective(500px) rotateY(0deg) }
}
.rts-rotatein-word { display:inline-block; opacity:0; transform-origin:center; animation:rts-rotatein 0.6s cubic-bezier(0.34,1.4,0.64,1) both }

/* pressIn — presses down to 0.92 then springs outward past 1 */
@keyframes rts-pressin {
  0%  { opacity:0; transform:scale(0.5) }
  30% { opacity:1; transform:scale(0.92) }
  60% { transform:scale(1.06) }
  80% { transform:scale(0.98) }
  100%{ transform:scale(1) }
}
.rts-pressin-word { display:inline-block; opacity:0; animation:rts-pressin 0.65s cubic-bezier(0.34,1.56,0.64,1) both }
`;

export function injectAnimationStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

// ─── Whole-element animation map ─────────────────────────────────────────────

const WHOLE_CLASS_MAP: Partial<Record<HeroAnimation, string>> = {
  rise:       "rts-rise",
  clip:       "rts-clip",
  pop:        "rts-pop",
  blur:       "rts-blur",
  flip:       "rts-flip",
  swipe:      "rts-swipe",
  bounce:     "rts-bounce",
  typewriter: "rts-typewriter",
  morph:      "rts-morph",
  spotlight:  "rts-spotlight",
  stretch:    "rts-stretch",
  unfurl:     "rts-unfurl",
  billboard:  "rts-billboard",
  // Batch 7 — whole-element
  glassReveal:"rts-glass",
  scanline:   "rts-scan",
  chromaShift:"rts-chroma",
};

export function getAnimationClass(animation: HeroAnimation): string {
  return WHOLE_CLASS_MAP[animation] ?? "";
}

export function isSplitAnimation(animation: HeroAnimation): boolean {
  return !(animation in WHOLE_CLASS_MAP);
}

// ─── HTML split builders ──────────────────────────────────────────────────────

function wrapWords(html: string, cls: string, step: number): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens.map((tok, i) => {
    const delay = (i * step).toFixed(2);
    if (tok.startsWith("<em>")) {
      return `<em><span class="${cls}" style="animation-delay:${delay}s">${tok.slice(4, -5)}</span></em>`;
    }
    return `<span class="${cls}" style="animation-delay:${delay}s">${tok}</span>`;
  }).join(" ");
}

function wrapChars(html: string, cls: string, step: number): string {
  const result: string[] = [];
  let inEm = false, delay = 0, i = 0;
  while (i < html.length) {
    if (html.startsWith("<em>", i))  { inEm = true;  i += 4; continue; }
    if (html.startsWith("</em>", i)) { inEm = false; i += 5; continue; }
    const ch = html[i];
    if (ch === " ") { result.push(" "); i++; continue; }
    const span = `<span class="${cls}" style="animation-delay:${delay.toFixed(2)}s">${ch}</span>`;
    result.push(inEm ? `<em>${span}</em>` : span);
    delay += step;
    i++;
  }
  return result.join("");
}

function wrapGround(html: string, step: number): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens.map((tok, i) => {
    const delay = (i * step).toFixed(2);
    const inner = tok.startsWith("<em>") ? `<em>${tok.slice(4, -5)}</em>` : tok;
    return `<span class="rts-ground-wrap"><span class="rts-ground-inner" style="animation-delay:${delay}s">${inner}</span></span>`;
  }).join(" ");
}

function wrapTectonic(html: string): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens.map((tok, i) => {
    const cls   = i % 2 === 0 ? "rts-tec-l" : "rts-tec-r";
    const delay = (i * 0.09).toFixed(2);
    if (tok.startsWith("<em>")) {
      return `<em><span class="${cls}" style="animation-delay:${delay}s">${tok.slice(4, -5)}</span></em>`;
    }
    return `<span class="${cls}" style="animation-delay:${delay}s">${tok}</span>`;
  }).join(" ");
}

function wrapNoiseFade(html: string): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens.map((tok, i) => {
    const cls   = `rts-nf${i % 3}`;
    const delay = (i * 0.12).toFixed(2);
    if (tok.startsWith("<em>")) {
      return `<em><span class="${cls}" style="animation-delay:${delay}s">${tok.slice(4, -5)}</span></em>`;
    }
    return `<span class="${cls}" style="animation-delay:${delay}s">${tok}</span>`;
  }).join(" ");
}

function wrapConverge(html: string): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  const mid = Math.ceil(tokens.length / 2);
  return tokens.map((tok, i) => {
    const isLeft = i < mid;
    const dist   = isLeft ? mid - 1 - i : i - mid;
    const delay  = (dist * 0.07).toFixed(2);
    const cls    = isLeft ? "rts-conv-l" : "rts-conv-r";
    const inner  = tok.startsWith("<em>") ? `<em>${tok.slice(4, -5)}</em>` : tok;
    return `<span class="${cls}" style="animation-delay:${delay}s">${inner}</span>`;
  }).join(" ");
}

function wrapRipple(html: string): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  const mid = Math.floor(tokens.length / 2);
  return tokens.map((tok, i) => {
    const delay = (Math.abs(i - mid) * 0.1).toFixed(2);
    if (tok.startsWith("<em>")) {
      return `<em><span class="rts-ripple-word" style="animation-delay:${delay}s">${tok.slice(4, -5)}</span></em>`;
    }
    return `<span class="rts-ripple-word" style="animation-delay:${delay}s">${tok}</span>`;
  }).join(" ");
}

function wrapSplitRise(html: string): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens.map((tok, i) => {
    const cls   = i % 2 === 0 ? "rts-splitrise-t" : "rts-splitrise-b";
    const delay = (i * 0.08).toFixed(2);
    if (tok.startsWith("<em>")) {
      return `<em><span class="${cls}" style="animation-delay:${delay}s">${tok.slice(4, -5)}</span></em>`;
    }
    return `<span class="${cls}" style="animation-delay:${delay}s">${tok}</span>`;
  }).join(" ");
}

/**
 * Thread: each char gets a sine-wave Y offset injected as a CSS custom
 * property --ty so the keyframe can read it. Must be post-processed by
 * Typography after innerHTML is set — see applyThreadOffsets().
 */
function wrapThread(html: string): string {
  return wrapChars(html, "rts-thread-ch", 0.04);
}

/**
 * Called by Typography after dangerouslySetInnerHTML for "thread" animation.
 * Stamps the sine-wave Y offset as --ty on each character span.
 */
export function applyThreadOffsets(container: HTMLElement): void {
  const spans = container.querySelectorAll<HTMLElement>(".rts-thread-ch");
  spans.forEach((el, i) => {
    const offset = Math.sin(i * 0.85) * 22;
    el.style.setProperty("--ty", `${offset.toFixed(1)}px`);
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function buildSplitHTML(animation: HeroAnimation, html: string): string {
  switch (animation) {
    // Batch 1
    case "stagger":    return wrapWords(html, "rts-word",          0.07);
    case "letters":    return wrapChars(html, "rts-letter",        0.04);
    // Batch 2
    case "velvet":     return wrapWords(html, "rts-velvet-word",   0.08);
    case "curtain":    return wrapWords(html, "rts-curtain-word",  0.10);
    case "ground":     return wrapGround(html,                     0.09);
    case "cascade":    return wrapChars(html, "rts-cascade-ch",    0.05);
    case "ink":        return wrapWords(html, "rts-ink-word",      0.10);
    case "hinge":      return wrapWords(html, "rts-hinge-word",    0.09);
    case "peel":       return wrapWords(html, "rts-peel-word",     0.10);
    case "fold":       return wrapWords(html, "rts-fold-word",     0.09);
    case "shear":      return wrapWords(html, "rts-shear-word",    0.08);
    case "ripple":     return wrapRipple(html);
    case "cinch":      return wrapChars(html, "rts-cinch-ch",       0.048);
    case "tiltrise":   return wrapWords(html, "rts-tiltrise-word",  0.09);
    case "cardFlip":   return wrapChars(html, "rts-cardflip-ch",   0.045);
    case "converge":   return wrapConverge(html);
    case "splitRise":  return wrapSplitRise(html);
    // Batch 3
    case "tectonic":   return wrapTectonic(html);
    case "stratify":   return wrapWords(html, "rts-strat-word",    0.10);
    case "gravityWell":return wrapChars(html, "rts-gwell-ch",      0.05);
    case "orbit":      return wrapWords(html, "rts-orbit-word",    0.10);
    case "liquid":     return wrapWords(html, "rts-liquid-word",   0.09);
    case "noiseFade":  return wrapNoiseFade(html);
    case "slab":       return wrapWords(html, "rts-slab-word",     0.11);
    case "thread":     return wrapThread(html);
    // Batch 7 — split
    case "wordPop":    return wrapWords(html, "rts-wpop-word",     0.07);
    case "charDrop":   return wrapChars(html, "rts-cdrop-ch",      0.04);
    case "wordFade":   return wrapWords(html, "rts-wfade-word",    0.09);
    case "rotateIn":   return wrapWords(html, "rts-rotatein-word", 0.08);
    case "pressIn":    return wrapWords(html, "rts-pressin-word",  0.08);
    default:           return html;
  }
}

// Legacy exports — backwards compat
export const buildStaggerHTML = (html: string) => buildSplitHTML("stagger", html);
export const buildLettersHTML = (html: string) => buildSplitHTML("letters", html);