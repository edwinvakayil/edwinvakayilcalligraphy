import { HeroAnimation } from "./types";

const STYLE_ID = "rts-hero-animations";

const CSS = `
@keyframes rts-rise        { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes rts-clip        { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
@keyframes rts-pop         { 0%{opacity:0;transform:scale(0.75)} 60%{opacity:1;transform:scale(1.04)} 100%{transform:scale(1)} }
@keyframes rts-blur        { from{opacity:0;filter:blur(14px);transform:scale(1.04)} to{opacity:1;filter:blur(0);transform:scale(1)} }
@keyframes rts-flip        { from{opacity:0;transform:perspective(600px) rotateX(30deg) translateY(20px)} to{opacity:1;transform:perspective(600px) rotateX(0) translateY(0)} }
@keyframes rts-swipe       { from{opacity:0;transform:translateX(60px)} to{opacity:1;transform:translateX(0)} }
@keyframes rts-bounce      { 0%{opacity:0;transform:translateY(-60px)} 60%{opacity:1;transform:translateY(10px)} 80%{transform:translateY(-5px)} 100%{transform:translateY(0)} }
@keyframes rts-type        { from{width:0} to{width:100%} }
@keyframes rts-blink       { 50%{border-color:transparent} }
@keyframes rts-word-rise   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes rts-letter-in   { from{opacity:0;transform:translateX(-16px) rotate(-4deg)} to{opacity:1;transform:none} }

/* ── New modern animations ─────────────────────────────────────────────── */

@keyframes rts-velvet      { from{opacity:0;transform:translate(-12px,20px) skewX(4deg)} to{opacity:1;transform:translate(0,0) skewX(0deg)} }
@keyframes rts-curtain     { from{clip-path:inset(0 0 100% 0)} to{clip-path:inset(0 0 0% 0)} }
@keyframes rts-morph       { 0%{opacity:0;transform:scaleY(0.3) scaleX(1.3) translateY(10px)} 60%{opacity:1;transform:scaleY(1.08) scaleX(0.97)} 100%{transform:scaleY(1) scaleX(1)} }
@keyframes rts-ground      { from{transform:translateY(110%);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes rts-cascade     { from{opacity:0;transform:translateY(-28px) translateX(10px) rotate(8deg)} to{opacity:1;transform:none} }
@keyframes rts-spotlight   { 0%{opacity:0;letter-spacing:0.3em;transform:scaleX(1.15)} 100%{opacity:1;letter-spacing:-0.03em;transform:scaleX(1)} }
@keyframes rts-ink         { 0%{opacity:0;transform:translateY(6px) scale(0.96)} 100%{opacity:1;transform:translateY(0) scale(1)} }
@keyframes rts-hinge       { from{opacity:0;transform:perspective(400px) rotateY(-40deg) translateX(-20px)} to{opacity:1;transform:perspective(400px) rotateY(0) translateX(0)} }
@keyframes rts-stretch     { 0%{opacity:0;transform:scaleX(0.05)} 60%{transform:scaleX(1.04)} 100%{opacity:1;transform:scaleX(1)} }
@keyframes rts-peel        { from{clip-path:inset(100% 0 0 0)} to{clip-path:inset(0% 0 0 0)} }

/* ── Whole-element classes (no splitting needed) ───────────────────────── */
.rts-rise       { animation: rts-rise 0.9s cubic-bezier(0.16,1,0.3,1) both }
.rts-clip       { animation: rts-clip 1.1s cubic-bezier(0.77,0,0.18,1) both }
.rts-pop        { animation: rts-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) both }
.rts-blur       { animation: rts-blur 1s cubic-bezier(0.16,1,0.3,1) both }
.rts-flip       { animation: rts-flip 0.9s cubic-bezier(0.16,1,0.3,1) both; transform-origin: center bottom }
.rts-swipe      { animation: rts-swipe 0.8s cubic-bezier(0.16,1,0.3,1) both }
.rts-bounce     { animation: rts-bounce 0.9s cubic-bezier(0.36,0.07,0.19,0.97) both }
.rts-typewriter { overflow: hidden; white-space: nowrap; border-right: 2px solid currentColor; width: 0; animation: rts-type 1.6s steps(22,end) both, rts-blink 0.7s step-end 1.6s 3 }
.rts-morph      { animation: rts-morph 0.8s cubic-bezier(0.34,1.56,0.64,1) both }
.rts-spotlight  { animation: rts-spotlight 1s cubic-bezier(0.16,1,0.3,1) both }
.rts-stretch    { animation: rts-stretch 0.9s cubic-bezier(0.34,1.56,0.64,1) both }

/* ── Per-word / per-character span classes ─────────────────────────────── */
.rts-word           { display:inline-block;opacity:0;transform:translateY(24px);animation:rts-word-rise 0.7s cubic-bezier(0.16,1,0.3,1) both }
.rts-letter         { display:inline-block;opacity:0;transform:translateX(-16px) rotate(-4deg);animation:rts-letter-in 0.5s cubic-bezier(0.16,1,0.3,1) both }
.rts-velvet-word    { display:inline-block;opacity:0;animation:rts-velvet 0.65s cubic-bezier(0.16,1,0.3,1) both }
.rts-curtain-word   { display:inline-block;overflow:hidden;animation:rts-curtain 0.7s cubic-bezier(0.77,0,0.18,1) both }
.rts-ground-wrap    { display:inline-block;overflow:hidden;vertical-align:bottom }
.rts-ground-inner   { display:inline-block;animation:rts-ground 0.65s cubic-bezier(0.16,1,0.3,1) both }
.rts-cascade-ch     { display:inline-block;opacity:0;animation:rts-cascade 0.45s cubic-bezier(0.34,1.56,0.64,1) both }
.rts-ink-word       { display:inline-block;opacity:0;animation:rts-ink 0.9s cubic-bezier(0.16,1,0.3,1) both }
.rts-hinge-word     { display:inline-block;opacity:0;transform-origin:left center;animation:rts-hinge 0.6s cubic-bezier(0.16,1,0.3,1) both }
.rts-peel-word      { display:inline-block;overflow:hidden;animation:rts-peel 0.6s cubic-bezier(0.77,0,0.18,1) both }
`;

export function injectAnimationStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

// ─── Whole-element class map ──────────────────────────────────────────────────

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
};

/** Returns the CSS class for whole-element animations, or "" for split ones. */
export function getAnimationClass(animation: HeroAnimation): string {
  return WHOLE_CLASS_MAP[animation] ?? "";
}

/** True if the animation needs the HTML to be split into word/char spans. */
export function isSplitAnimation(animation: HeroAnimation): boolean {
  return !(animation in WHOLE_CLASS_MAP);
}

// ─── HTML builders for split animations ──────────────────────────────────────

function wrapWords(
  html: string,
  cls: string,
  delayStep: number
): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens
    .map((tok, i) => {
      const delay = (i * delayStep).toFixed(2);
      if (tok.startsWith("<em>")) {
        return `<em><span class="${cls}" style="animation-delay:${delay}s">${tok.slice(4, -5)}</span></em>`;
      }
      return `<span class="${cls}" style="animation-delay:${delay}s">${tok}</span>`;
    })
    .join(" ");
}

function wrapChars(html: string, cls: string, delayStep: number): string {
  const result: string[] = [];
  let inEm = false;
  let delay = 0;
  let i = 0;
  while (i < html.length) {
    if (html.startsWith("<em>", i))  { inEm = true;  i += 4; continue; }
    if (html.startsWith("</em>", i)) { inEm = false; i += 5; continue; }
    const ch = html[i];
    if (ch === " ") { result.push(" "); i++; continue; }
    const span = `<span class="${cls}" style="animation-delay:${delay.toFixed(2)}s">${ch}</span>`;
    result.push(inEm ? `<em>${span}</em>` : span);
    delay += delayStep;
    i++;
  }
  return result.join("");
}

function wrapGround(html: string, delayStep: number): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens
    .map((tok, i) => {
      const delay = (i * delayStep).toFixed(2);
      const inner = tok.startsWith("<em>")
        ? `<em>${tok.slice(4, -5)}</em>`
        : tok;
      return `<span class="rts-ground-wrap"><span class="rts-ground-inner" style="animation-delay:${delay}s">${inner}</span></span>`;
    })
    .join(" ");
}

export function buildSplitHTML(animation: HeroAnimation, html: string): string {
  switch (animation) {
    case "stagger":  return wrapWords(html, "rts-word",        0.07);
    case "letters":  return wrapChars(html, "rts-letter",      0.04);
    case "velvet":   return wrapWords(html, "rts-velvet-word", 0.08);
    case "curtain":  return wrapWords(html, "rts-curtain-word",0.10);
    case "ground":   return wrapGround(html,                   0.09);
    case "cascade":  return wrapChars(html, "rts-cascade-ch",  0.05);
    case "ink":      return wrapWords(html, "rts-ink-word",    0.10);
    case "hinge":    return wrapWords(html, "rts-hinge-word",  0.09);
    case "peel":     return wrapWords(html, "rts-peel-word",   0.10);
    default:         return html;
  }
}

// Legacy named exports kept for backwards compatibility
export const buildStaggerHTML = (html: string) => buildSplitHTML("stagger", html);
export const buildLettersHTML = (html: string) => buildSplitHTML("letters", html);