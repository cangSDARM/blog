/// based on: https://codepen.io/erevan/pen/MYKBjdZ
import { clamp, defaults } from "lodash";
import React from "react";
import classes from "./style.module.scss";
import clsx from "clsx";

const animatedClassName = classes["active-ascii-animate"];
// Constants for wave animation behavior
const WAVE_THRESH = 3;
const CHAR_MULT = 3;
const ANIM_STEP = 40;
const WAVE_BUF = 5;

type GlitchOptions = {
  msPerLength: number;
  chars: string;
  preserveSpaces: boolean;
  spread: number;
};

/**
 * ASCII ripple animation instance for an element
 */
export const createASCIIShift = (
  el: HTMLElement,
  opts: Partial<GlitchOptions> = {}
) => {
  let origTxt = "";
  let origChars = origTxt.split("");
  let isAnim = false;
  let cursorPos = 0;
  let waves: { startPos: number; startTime: number; id: number }[] = [];
  let animId: Maybe<number> = null;
  let isHover = false;
  let origW: Maybe<number> = null;

  const cfg: GlitchOptions = defaults(opts, {
    msPerLength: 20,
    chars: '.,·-─~+:;=*π"ABCDEFGHIJKLMNOPQRSTUVWXYZ!?&#$@0123456789*',
    preserveSpaces: true,
    spread: 0.3,
  });

  const getDur = () => clamp(origChars.length * cfg.msPerLength, 500, 2000);

  const getRange = (e: MouseEvent) => {
    let textNode: Maybe<Node> = null;
    let range: Maybe<CaretPosition | Range> = null;
    let offset = 0;
    if (document.caretPositionFromPoint) {
      range = document.caretPositionFromPoint(e.clientX, e.clientY);
      textNode = range?.offsetNode;
      offset = range?.offset ?? 0;
    } else if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(e.clientX, e.clientY);
      textNode = range?.startContainer;
      offset = range?.startOffset ?? 0;
    } else {
      // 两个方法都不支持，什么都不做
      return;
    }
    if (!(textNode instanceof Text)) return;

    return { textNode, range, offset };
  };

  const updateCursorPos = (_tn: Text, offset: number) => {
    cursorPos = offset;
  };

  const isHoveringAtText = (textNode: Text, offset: number) => {
    const range = document.createRange();
    range.setStart(textNode, offset);
    range.setEnd(textNode, textNode.textContent?.length ?? offset);

    return range.startOffset < range.endOffset;
  };

  /**
   * Starts a new wave animation from current cursor pos
   */
  const startWave = () => {
    waves.push({
      startPos: cursorPos,
      startTime: Date.now(),
      id: Math.random(),
    });

    if (!isAnim) start();
  };

  /**
   * Clean up expired waves that have exceeded their duration
   */
  const cleanupWaves = (t: number) => {
    waves = waves.filter((w) => t - w.startTime < getDur());
  };

  /**
   * Calculates wave fx for a character at given index
   * Returns whether to animate and which character to show
   */
  const calcWaveEffect = (charIdx: number, t: number) => {
    let shouldAnim = false;
    let resultChar = origChars[charIdx];

    for (const w of waves) {
      const age = t - w.startTime;
      const prog = Math.min(age / getDur(), 1);
      const dist = Math.abs(charIdx - w.startPos);
      const maxDist = Math.max(w.startPos, origChars.length - w.startPos - 1);
      const rad = (prog * (maxDist + WAVE_BUF)) / cfg.spread;

      if (dist <= rad) {
        shouldAnim = true;
        const intens = Math.max(0, rad - dist);

        // Chars in the wave zone shift through character sequence
        if (intens <= WAVE_THRESH && intens > 0) {
          const charIdx =
            (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % cfg.chars.length;
          resultChar = cfg.chars[charIdx];
        }
      }
    }

    return { shouldAnim, char: resultChar };
  };

  /**
   * Generates scrambled text based on current waves
   */
  const genScrambledTxt = (t: number) =>
    origChars
      .map((char, i) => {
        if (cfg.preserveSpaces && char === " ") return " ";
        const res = calcWaveEffect(i, t);
        return res.shouldAnim ? res.char : char;
      })
      .join("");

  /**
   * Stops the animation and resets to original text
   */
  const stop = () => {
    el.dataset.scrambled = origTxt;
    el.classList.remove(animatedClassName);

    // Reset width to allow natural text flow
    if (origW !== null) {
      el.style.width = "";
      origW = null;
    }
    isAnim = false;
  };

  /**
   * Start the animation loop
   */
  const start = () => {
    if (isAnim) return;

    // Preserve original width to prevent layout shifts
    if (!Number.isFinite(origW)) {
      origW = el.getBoundingClientRect().width;
      el.style.width = `${origW}px`;
    }

    isAnim = true;
    el.classList.add(animatedClassName);

    const animate = () => {
      const t = Date.now();

      // Clean up expired waves first
      cleanupWaves(t);

      if (waves.length === 0) {
        stop();
        return;
      }

      // Generate scrambled text
      el.dataset.scrambled = genScrambledTxt(t);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
  };

  /**
   * Event handlers
   */
  const handleMouseEnter = (e: MouseEvent) => {
    isHover = true;
    const range = getRange(e);
    if (!range) return;
    updateCursorPos(range.textNode, range.offset);
    if (!isHoveringAtText(range.textNode, range.offset)) return;
    startWave();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isHover) return;
    const old = cursorPos;
    const range = getRange(e);
    if (!range) return;
    updateCursorPos(range.textNode, range.offset);
    if (cursorPos === old) return;
    if (!isHoveringAtText(range.textNode, range.offset)) return;
    startWave();
  };

  const handleMouseLeave = () => {
    isHover = false;
  };

  const events = [
    ["mouseenter", handleMouseEnter],
    ["mousemove", handleMouseMove],
    ["mouseleave", handleMouseLeave],
  ] as const;

  /**
   * Resets animation to original state
   */
  const resetToOrig = () => {
    waves = [];
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }

    // Reset width preservation
    if (Number.isFinite(origW)) {
      el.style.width = "";
      origW = null;
    }
    stop();
  };

  /**
   * Destroys the instance and cleans up event listeners
   */
  const destroy = () => {
    resetToOrig();
    events.forEach(([evt, handler]) => el.removeEventListener(evt, handler));
  };

  /**
   * Initializes event listeners
   */
  const init = () => {
    destroy();
    updateTxt(el.textContent ?? "");
    el.style.setProperty("--text-color", getComputedStyle(el).color);
    events.forEach(([evt, handler]) => el.addEventListener(evt, handler));
  };

  /**
   * Updates the text content
   */
  const updateTxt = (newTxt: string) => {
    origTxt = newTxt;
    origChars = Array.from(origTxt);
    if (!isAnim) el.dataset.scrambled = newTxt;
  };

  // Initialize the instance
  init();

  // public API
  return { updateTxt, resetToOrig, destroy };
};

export type GlitchProps = Partial<GlitchOptions>;

const Glitch = <T extends React.ElementType = "div">({
  children,
  as,
  // @ts-ignore
  msPerLength = 10,
  chars,
  preserveSpaces,
  // @ts-ignore
  spread = 1,
  className,
  ...tagAttr
}: Omit<PolymorphicComponentProps<T, GlitchProps>, "ref">) => {
  const Tag = as || "div";
  const ref = React.useRef<React.ComponentProps<T>["ref"]>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const { updateTxt } = createASCIIShift(ref.current, {
      msPerLength,
      spread,
      preserveSpaces,
      chars,
    });

    if (typeof children === "string") {
      updateTxt(children);
    }
  }, [ref.current, children, msPerLength, chars, preserveSpaces, spread]);

  return (
    // @ts-ignore
    <Tag className={clsx(className, classes.glitchable)} {...tagAttr} ref={ref}>
      {children}
    </Tag>
  );
};

export default Glitch;
