import { HeroAnimation } from "./types";

const STYLE_ID = "rts-hero-animations";

const CSS = `
@keyframes rts-rise{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes rts-clip{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
@keyframes rts-pop{0%{opacity:0;transform:scale(0.75)}60%{opacity:1;transform:scale(1.04)}100%{transform:scale(1)}}
@keyframes rts-blur{from{opacity:0;filter:blur(14px);transform:scale(1.04)}to{opacity:1;filter:blur(0);transform:scale(1)}}
@keyframes rts-flip{from{opacity:0;transform:perspective(600px) rotateX(30deg) translateY(20px)}to{opacity:1;transform:perspective(600px) rotateX(0) translateY(0)}}
@keyframes rts-swipe{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
@keyframes rts-bounce{0%{opacity:0;transform:translateY(-60px)}60%{opacity:1;transform:translateY(10px)}80%{transform:translateY(-5px)}100%{transform:translateY(0)}}
@keyframes rts-type{from{width:0}to{width:100%}}
@keyframes rts-blink{50%{border-color:transparent}}
@keyframes rts-word-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes rts-letter-in{from{opacity:0;transform:translateX(-16px) rotate(-4deg)}to{opacity:1;transform:none}}

.rts-rise      { animation: rts-rise 0.9s cubic-bezier(0.16,1,0.3,1) both }
.rts-clip      { animation: rts-clip 1.1s cubic-bezier(0.77,0,0.18,1) both }
.rts-pop       { animation: rts-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) both }
.rts-blur      { animation: rts-blur 1s cubic-bezier(0.16,1,0.3,1) both }
.rts-flip      { animation: rts-flip 0.9s cubic-bezier(0.16,1,0.3,1) both; transform-origin: center bottom }
.rts-swipe     { animation: rts-swipe 0.8s cubic-bezier(0.16,1,0.3,1) both }
.rts-bounce    { animation: rts-bounce 0.9s cubic-bezier(0.36,0.07,0.19,0.97) both }
.rts-typewriter{ overflow: hidden; white-space: nowrap; border-right: 2px solid currentColor; width: 0; animation: rts-type 1.6s steps(22,end) both, rts-blink 0.7s step-end 1.6s 3 }
.rts-word      { display: inline-block; opacity: 0; transform: translateY(24px); animation: rts-word-rise 0.7s cubic-bezier(0.16,1,0.3,1) both }
.rts-letter    { display: inline-block; opacity: 0; transform: translateX(-16px) rotate(-4deg); animation: rts-letter-in 0.5s cubic-bezier(0.16,1,0.3,1) both }
`;

export function injectAnimationStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id    = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

export function getAnimationClass(animation: HeroAnimation): string {
  const map: Record<HeroAnimation, string> = {
    rise:       "rts-rise",
    clip:       "rts-clip",
    pop:        "rts-pop",
    blur:       "rts-blur",
    flip:       "rts-flip",
    swipe:      "rts-swipe",
    bounce:     "rts-bounce",
    typewriter: "rts-typewriter",
    stagger:    "",
    letters:    "",
  };
  return map[animation] ?? "";
}

/**
 * Wraps each word in an animated span.
 * <em> tokens are preserved as-is in the HTML — Typography's useEffect
 * will apply inline styles to them after mount.
 */
export function buildStaggerHTML(html: string): string {
  const tokens = html.match(/(<em>[\s\S]*?<\/em>|[^\s]+)/g) ?? [];
  return tokens
    .map((tok, i) => {
      const delay = (i * 0.07).toFixed(2);
      if (tok.startsWith("<em>")) {
        // Wrap the inner text in the animated span, keep <em> outside
        const inner = tok.slice(4, -5);
        return `<em><span class="rts-word" style="animation-delay:${delay}s">${inner}</span></em>`;
      }
      return `<span class="rts-word" style="animation-delay:${delay}s">${tok}</span>`;
    })
    .join(" ");
}

/**
 * Wraps each character in an animated span.
 * <em> tags are preserved in the output — Typography's useEffect applies
 * the actual italic/non-italic inline styles after the DOM is ready.
 */
export function buildLettersHTML(html: string): string {
  const result: string[] = [];
  let inEm  = false;
  let delay = 0;
  const step = 0.04;
  let i = 0;

  while (i < html.length) {
    if (html.startsWith("<em>", i))  { inEm = true;  i += 4; continue; }
    if (html.startsWith("</em>", i)) { inEm = false; i += 5; continue; }

    const ch = html[i];
    if (ch === " ") { result.push(" "); i++; continue; }

    const span = `<span class="rts-letter" style="animation-delay:${delay.toFixed(2)}s">${ch}</span>`;
    // Preserve <em> wrapper in DOM — styles applied by useEffect
    result.push(inEm ? `<em>${span}</em>` : span);
    delay += step;
    i++;
  }

  return result.join("");
}