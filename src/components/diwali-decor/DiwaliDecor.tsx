"use client";

import { useEffect } from "react";
import "./diwali-decor.css";

const G = "url(#jh-gold)";
const DEFS =
  '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
  '<linearGradient id="jh-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b3"/><stop offset=".45" stop-color="#e7b13c"/><stop offset="1" stop-color="#8a5a12"/></linearGradient>' +
  '<radialGradient id="jh-halo"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffb627" stop-opacity="0"/></radialGradient>' +
  '<linearGradient id="jh-clay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0864a"/><stop offset="1" stop-color="#7a2a0c"/></linearGradient>' +
  '<linearGradient id="jh-flame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a00"/><stop offset="1" stop-color="#ffe27a"/></linearGradient>' +
  "</defs></svg>";

const CHAR =
  '<svg viewBox="0 0 80 110" aria-hidden="true" focusable="false">' +
  '<ellipse class="c-sh" cx="40" cy="106" rx="20" ry="3.6" fill="rgba(0,0,0,.28)"/><g class="c-body">' +
  '<g class="c-leg c-legb"><rect x="32" y="74" width="9" height="26" rx="4.5" fill="#25224d"/><ellipse cx="38" cy="101" rx="8" ry="4" fill="#5a2d12"/></g>' +
  '<g class="c-leg c-legf"><rect x="39" y="74" width="9" height="26" rx="4.5" fill="#2e2a5c"/><ellipse cx="45" cy="101" rx="8" ry="4" fill="#5a2d12"/></g>' +
  '<g class="c-arm c-armb"><rect x="23" y="49" width="8" height="26" rx="4" fill="#c97a08"/><circle cx="27" cy="76" r="4.2" fill="#e9b88c"/></g>' +
  '<path d="M27 48Q27 44 33 44H47Q53 44 53 48V72Q53 80 46 80H34Q27 80 27 72Z" fill="#f5a30f"/>' +
  '<path d="M27 72H53" stroke="#fff3c4" stroke-width="2"/><path d="M34 44Q40 53 46 44" stroke="#fff3c4" stroke-width="2" fill="none"/>' +
  '<circle cx="40" cy="58" r="1.8" fill="#fff3c4"/><circle cx="40" cy="65" r="1.8" fill="#fff3c4"/>' +
  '<g class="c-arm c-armf"><rect x="49" y="49" width="8" height="26" rx="4" fill="#f5a30f"/><circle cx="53" cy="76" r="4.2" fill="#f2c29b"/></g>' +
  '<g class="c-head"><circle cx="40" cy="30" r="16" fill="#f2c29b"/>' +
  '<path d="M24 28Q24 12 40 12Q56 12 56 28Q50 20 40 21Q30 20 24 28Z" fill="#241510"/>' +
  '<g class="c-eyes"><ellipse cx="36" cy="31" rx="2" ry="2.6" fill="#241510"/><ellipse cx="47" cy="31" rx="2" ry="2.6" fill="#241510"/></g>' +
  '<circle cx="32" cy="37" r="3" fill="#f08a80" opacity=".5"/><circle cx="51" cy="37" r="3" fill="#f08a80" opacity=".5"/>' +
  '<path d="M37 38Q42 42 46 38" stroke="#7a3b22" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
  '<circle cx="41" cy="24" r="1.6" fill="#d6281e"/></g></g></svg>';

const DIYA =
  '<svg viewBox="0 0 40 30" aria-hidden="true" focusable="false">' +
  '<circle class="jh-dg" cx="20" cy="13" r="17" fill="url(#jh-halo)"/>' +
  '<path d="M3 17Q5 28 20 28Q35 28 37 17Z" fill="url(#jh-clay)"/><ellipse cx="20" cy="17" rx="17" ry="3.2" fill="#e08a45"/>' +
  '<ellipse cx="20" cy="17" rx="13" ry="2" fill="#4a1a08"/><path d="M8 21Q10 25 15 26" stroke="#ffd7a0" stroke-width="1.2" fill="none" opacity=".5" stroke-linecap="round"/>' +
  '<g class="jh-fl"><path d="M20 3C25 9 26 12.500 20 16.500C14 12.500 15 9 20 3Z" fill="url(#jh-flame)"/>' +
  '<path d="M20 8C22.500 11 22.500 13.500 20 15.500C17.500 13.500 17.500 11 20 8Z" fill="#fff6cc"/></g></svg>';

const DEFAULT_MESSAGES = [
  "Happy Diwali! \uD83E\uDE94",
  "Shubh Deepavali!",
  "Wishing you light and joy \u2728",
  "May your days glow bright",
];

const R = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const pick = <T,>(arr: T[]): T => arr[(Math.random() * arr.length) | 0];
const div = (c: string) => {
  const d = document.createElement("div");
  d.className = c;
  return d;
};
const svg = (h: number, body: string) =>
  `<svg viewBox="0 0 40 ${h}" aria-hidden="true" focusable="false">${body}</svg>`;
const halo = (cx: number, cy: number, r: number) =>
  `<circle class="jh-halo" cx="${cx}" cy="${cy}" r="${r}" fill="url(#jh-halo)" style="--gd:${R(
    6,
    11
  ).toFixed(1)}s;--gl:-${R(0, 8).toFixed(1)}s"/>`;

/* ---------- SVG pieces for the hanging strands ---------- */
function thread(h: number) {
  let b = `<line x1="20" y1="0" x2="20" y2="${h}" stroke="#c99a3c" stroke-width="1.4"/><rect x="15" y="0" width="10" height="5" rx="2" fill="${G}"/>`;
  for (let y = 14, i = 0; y < h - 6; y += 16, i++) {
    b +=
      `<circle cx="20" cy="${y}" r="${i % 2 ? 4.4 : 3.4}" fill="${
        i % 3 === 2 ? "#c0392b" : G
      }"/>` + `<circle cx="19" cy="${y - 1}" r="1" fill="#fff" opacity=".6"/>`;
  }
  return svg(h, b);
}
function flower() {
  let b =
    `<line x1="20" y1="0" x2="20" y2="54" stroke="#c99a3c" stroke-width="1.4"/>` +
    halo(20, 28, 24);
  for (let i = 0; i < 10; i++)
    b += `<ellipse cx="20" cy="18" rx="4.8" ry="9" transform="rotate(${i * 36} 20 28)" fill="${
      i % 2 ? "#f59e0b" : "#ffbf2e"
    }"/>`;
  for (let i = 0; i < 8; i++)
    b += `<ellipse cx="20" cy="22" rx="3.4" ry="5.6" transform="rotate(${
      i * 45 + 22
    } 20 28)" fill="#e67e00"/>`;
  return svg(54, b + '<circle cx="20" cy="28" r="3.6" fill="#8a3b00"/>');
}
function bell() {
  return svg(
    60,
    '<line x1="20" y1="0" x2="20" y2="14" stroke="#c99a3c" stroke-width="1.4"/>' +
      halo(20, 34, 24) +
      `<circle cx="20" cy="13" r="3" fill="${G}"/>` +
      `<path d="M9 40C9 24 13 17 20 17S31 24 31 40L35 46H5Z" fill="${G}"/>` +
      '<path d="M14 38C14 29 16 24 19 21" stroke="#fff6c8" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"/>' +
      `<rect x="4" y="44" width="32" height="5" rx="2.5" fill="${G}"/><circle cx="20" cy="52" r="3.2" fill="${G}"/>`
  );
}
function tassel() {
  let b =
    '<line x1="20" y1="0" x2="20" y2="10" stroke="#c99a3c" stroke-width="1.4"/>' +
    halo(20, 16, 14) +
    `<circle cx="20" cy="12" r="4.5" fill="${G}"/><rect x="16" y="15" width="8" height="8" rx="3" fill="${G}"/>`;
  for (let i = -4; i <= 4; i++) {
    b += `<path d="M20 23Q${20 + i * 2} 40 ${20 + i * 2.6} 62" stroke="${
      i % 2 ? "#e0a030" : "#b3261e"
    }" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  }
  return svg(64, b);
}

/* ---------- Component ---------- */
type Strand = {
  p: HTMLDivElement;
  k: HTMLDivElement;
  segs: HTMLDivElement[];
  d: number;
  cool: number;
  r: { l: number; r: number; b: number } | null;
};

type Walker = {
  x: number;
  dir: number;
  max: number;
  cw: number;
  paused: boolean;
  turning: boolean;
  last: number;
  acc: number;
  visible: boolean;
  msg: number;
  // ✅ ReturnType<typeof setTimeout> handles both browser (number) and Node (Timeout)
  t: ReturnType<typeof setTimeout> | null;
};

export default function DiwaliDecor({
  topbarSelector = "header, nav, .topbar, .navbar",
  speed = 54,
  messages = DEFAULT_MESSAGES,
}: {
  topbarSelector?: string;
  speed?: number;
  messages?: string[];
}) {
  useEffect(() => {
    const cleanup: Array<() => void> = [];

    // ✅ `op` made optional so calls without options type-check
    const on = (
      target: EventTarget,
      ev: string,
      fn: EventListenerOrEventListenerObject,
      op?: boolean | AddEventListenerOptions
    ) => {
      target.addEventListener(ev, fn, op);
      cleanup.push(() => target.removeEventListener(ev, fn, op));
    };

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ========== Jhaalar ========== */
    const root = div("jh-root");
    root.setAttribute("aria-hidden", "true");
    root.insertAdjacentHTML("afterbegin", DEFS);

    const S: Strand[] = [];

    const buildStrand = (slot: number, side: "l" | "r"): Strand => {
      const p = div("jh-p");
      const k = div("jh-k");
      const s = div("jh-s");
      const mid = pick([flower, bell]);
      const last = mid === bell ? tassel : pick([tassel, bell]);
      const pieces = [thread(Math.round(R(70, 150))), mid(), last()];
      const base = R(1.6, 3);
      const dl = -R(0, 5);
      const dur = R(3.4, 5.6);
      const segs: HTMLDivElement[] = [];
      let parent: HTMLDivElement = s;

      pieces.forEach((html, i) => {
        const seg = div("jh-seg");
        seg.innerHTML = html;
        seg.style.setProperty("--a", (base * (1 + i * 0.55)).toFixed(2) + "deg");
        seg.style.setProperty("--d", dur.toFixed(2) + "s");
        seg.style.setProperty("--dl", (dl + i * 0.3).toFixed(2) + "s");
        parent.appendChild(seg);
        parent = seg;
        segs.push(seg);
      });

      s.style.setProperty("--fd", R(5, 8).toFixed(1) + "s");
      s.style.setProperty("--fl", "-" + R(0, 6).toFixed(1) + "s");
      k.appendChild(s);
      p.appendChild(k);
      p.style[side === "l" ? "left" : "right"] =
        (slot * 2.7 + R(0, 0.3)).toFixed(2) + "em";
      p.style.top = (0.3 + R(0, 0.15)).toFixed(2) + "em";

      return { p, k, segs, d: R(0.5, 1.2), cool: 0, r: null };
    };

    (["l", "r"] as const).forEach((side) => {
      const col = div("jh-col " + side);
      for (let i = 0; i < 3; i++) {
        const st = buildStrand(i, side);
        S.push(st);
        col.appendChild(st.p);
      }
      root.appendChild(col);
    });
    document.body.appendChild(root);

    /* ========== Measure ========== */
    const measure = () => {
      S.forEach((s) => {
        const bb = s.p.getBoundingClientRect();
        if (!bb.width) {
          s.r = null;
          return;
        }
        let h = 0;
        s.segs.forEach((g) => {
          const first = g.firstElementChild as HTMLElement | null;
          h += first ? first.getBoundingClientRect().height : 0;
        });
        s.r = { l: bb.left, r: bb.right, b: h + 10 };
      });
    };
    const t1 = setTimeout(measure, 80);
    cleanup.push(() => clearTimeout(t1));
    on(window, "resize", measure);
    on(window, "load", measure);

    /* ========== Pointer / scroll inertia ========== */
    const m = { x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0, raf: 0 };
    let lastX = 0;
    let lastY = window.scrollY;

    const loop = () => {
      m.x += (m.tx - m.x) * 0.07;
      m.y += (m.ty - m.y) * 0.07;
      m.tr *= 0.92;
      m.r += (m.tr - m.r) * 0.1;
      S.forEach((s) => {
        s.p.style.transform = `translate3d(${(-m.x * s.d * 7).toFixed(
          2
        )}px,${(-m.y * s.d * 4).toFixed(2)}px,0) rotate(${(m.r * s.d).toFixed(
          3
        )}deg)`;
      });
      m.raf =
        Math.abs(m.tx - m.x) +
          Math.abs(m.ty - m.y) +
          Math.abs(m.r) +
          Math.abs(m.tr) >
        0.004
          ? requestAnimationFrame(loop)
          : 0;
    };
    const wake = () => {
      if (!m.raf && !reduce) m.raf = requestAnimationFrame(loop);
    };
    const kick = (s: Strand, dir: number, amp: number) => {
      s.cool = performance.now() + 900;
      s.k.classList.remove("kick");
      void s.k.offsetWidth;
      s.k.style.setProperty("--kd", String(dir));
      s.k.style.setProperty("--ka", amp.toFixed(1) + "deg");
      s.k.classList.add("kick");
    };

    on(
      window,
      "pointermove",
      ((e: PointerEvent) => {
        const vx = e.clientX - lastX;
        lastX = e.clientX;
        m.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        m.ty = (e.clientY / window.innerHeight - 0.5) * 2;
        wake();
        if (reduce) return;
        const now = performance.now();
        S.forEach((s) => {
          const r = s.r;
          if (
            r &&
            now > s.cool &&
            e.clientX > r.l - 8 &&
            e.clientX < r.r + 8 &&
            e.clientY < r.b
          ) {
            kick(
              s,
              Math.abs(vx) > 1
                ? vx > 0
                  ? 1
                  : -1
                : e.clientX > (r.l + r.r) / 2
                ? -1
                : 1,
              clamp(Math.abs(vx) * 0.8, 5, 12)
            );
          }
        });
      }) as EventListener,
      { passive: true }
    );

    on(
      window,
      "scroll",
      (() => {
        const v = window.scrollY - lastY;
        lastY = window.scrollY;
        m.tr = clamp(v * 0.05, -3, 3);
        wake();
      }) as EventListener,
      { passive: true }
    );

    S.forEach((s) => {
      s.k.addEventListener("animationend", (e) => {
        if (e.target === s.k) s.k.classList.remove("kick");
      });
    });

    /* ========== Topbar walker ========== */
    let raf = 0;
    let lane: HTMLDivElement | null = null;
    let restoreBar: HTMLElement | null = null;
    let barAttempts = 0;

    const attachTopbar = () => {
      const bars = document.querySelectorAll<HTMLElement>(topbarSelector);
      // ✅ Cast to HTMLElement so `.style` is available
      const bar: HTMLElement | undefined = bars[0];

      if (!bar) {
        if (barAttempts++ < 30) {
          requestAnimationFrame(attachTopbar);
        }
        return;
      }

      if (getComputedStyle(bar).position === "static") {
        bar.style.position = "relative";
        restoreBar = bar;
      }

      lane = div("jh-lane");
      lane.setAttribute("aria-hidden", "true");

      const walker = div("jh-walker is-walking");
      const flip = div("jh-flip");
      const hit = div("jh-hit");
      const bubble = div("jh-bubble");
      flip.innerHTML = CHAR;
      walker.appendChild(flip);
      walker.appendChild(hit);

      const row = div("jh-diyas");
      lane.appendChild(row);
      lane.appendChild(walker);
      lane.appendChild(bubble);

      bar.appendChild(lane);

      const w: Walker = {
        x: 0,
        dir: 1,
        max: 0,
        cw: 0,
        paused: false,
        turning: false,
        last: 0,
        acc: 0,
        visible: true,
        msg: 0,
        t: null,
      };

      const buildRow = () => {
        const n = clamp(Math.floor(lane!.clientWidth / 60), 3, 60);
        if (row.children.length === n) return;
        row.innerHTML = "";
        for (let i = 0; i < n; i++) {
          const d = div("jh-diya");
          d.innerHTML = DIYA;
          d.style.setProperty("--ig", (0.5 + i * 0.1).toFixed(2) + "s");
          d.style.setProperty("--fk", R(0.45, 0.9).toFixed(2) + "s");
          d.style.setProperty("--gp", R(2, 3.6).toFixed(1) + "s");
          d.addEventListener("animationend", (e) => {
            // ✅ Cast to HTMLElement for `classList`
            const el = e.currentTarget as HTMLElement;
            if (e.animationName === "jh-flare") {
              el.classList.remove("flare");
            }
          });
          row.appendChild(d);
        }
      };

      const layout = () => {
        buildRow();
        w.cw = walker.offsetWidth;
        w.max = Math.max(0, lane!.clientWidth - w.cw);
        w.x = Math.min(w.x, w.max);
      };
      layout();

      if (typeof window.ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(layout);
        ro.observe(bar);
        cleanup.push(() => ro.disconnect());
      } else {
        on(window, "resize", layout);
      }

      if (typeof window.IntersectionObserver !== "undefined") {
        const io = new IntersectionObserver((en) => {
          w.visible = en[0].isIntersecting;
          if (w.visible) row.classList.add("lit");
        });
        io.observe(bar);
        cleanup.push(() => io.disconnect());
      } else {
        row.classList.add("lit");
      }
      if (reduce) row.classList.add("lit");

      const place = () => {
        walker.style.transform = `translate3d(${w.x.toFixed(1)}px,0,0)`;
      };
      const turn = (d: number) => {
        w.turning = true;
        w.dir = d;
        walker.classList.add("is-turning");
        flip.style.transform = `scaleX(${d})`;
        const t = setTimeout(() => {
          w.turning = false;
          walker.classList.remove("is-turning");
        }, 420);
        cleanup.push(() => clearTimeout(t));
      };
      const fx = () => {
        if (lane!.querySelectorAll(".jh-fx").length > 14) return;
        const f = div("jh-fx " + (Math.random() < 0.7 ? "jh-dust" : "jh-spark"));
        f.style.left =
          (w.x + w.cw * (w.dir > 0 ? 0.3 : 0.6) + R(-4, 4)).toFixed(1) + "px";
        f.style.setProperty("--dx", (-w.dir * R(4, 18)).toFixed(1) + "px");
        f.addEventListener("animationend", () => f.remove());
        lane!.appendChild(f);
      };
      const frame = (t: number) => {
        raf = requestAnimationFrame(frame);
        if (!w.visible || document.hidden) {
          w.last = 0;
          return;
        }
        const dt = w.last ? Math.min(0.05, (t - w.last) / 1000) : 0;
        w.last = t;
        if (!w.paused && !w.turning) {
          w.x += w.dir * speed * dt;
          if (w.x >= w.max) {
            w.x = w.max;
            turn(-1);
          } else if (w.x <= 0) {
            w.x = 0;
            turn(1);
          }
          if ((w.acc += dt) > 0.22) {
            w.acc = 0;
            fx();
          }
        }
        place();
      };

      const say = () => {
        bubble.textContent = messages[w.msg++ % messages.length];
        const bw = bubble.offsetWidth;
        const cx = w.x + w.cw / 2;
        const left = clamp(cx - bw / 2, 4, Math.max(4, lane!.clientWidth - bw - 4));
        bubble.style.left = left + "px";
        bubble.style.setProperty("--tail", cx - left + "px");
        bubble.classList.add("show");
      };

      on(hit, "pointerenter", () => {
        if (w.t) clearTimeout(w.t);
        w.paused = true;
        walker.classList.add("is-paused", "is-wave");
        say();
      });
      on(hit, "pointerleave", ((e: PointerEvent) => {
        if (w.t) clearTimeout(w.t);
        w.t = setTimeout(
          () => {
            w.paused = false;
            walker.classList.remove("is-paused", "is-wave");
            bubble.classList.remove("show");
          },
          e.pointerType === "mouse" ? 0 : 1800
        );
      }) as EventListener);

      on(
        window,
        "pointermove",
        ((e: PointerEvent) => {
          if (reduce) return;
          const lr = lane!.getBoundingClientRect();
          if (
            e.clientX < lr.left ||
            e.clientX > lr.right ||
            e.clientY < lr.top ||
            e.clientY > lr.bottom
          )
            return;
          for (let i = 0; i < row.children.length; i++) {
            const d = row.children[i] as HTMLElement;
            const r = d.getBoundingClientRect();
            if (
              Math.abs(e.clientX - (r.left + r.width / 2)) < r.width * 0.8 &&
              !d.classList.contains("flare")
            )
              d.classList.add("flare");
          }
        }) as EventListener,
        { passive: true }
      );

      if (reduce) {
        w.x = w.max * 0.82;
        place();
      } else {
        place();
        raf = requestAnimationFrame(frame);
      }
    };

    attachTopbar();

    /* ========== Cleanup ========== */
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(m.raf);
      cleanup.forEach((f) => f());
      root.remove();
      if (lane) lane.remove();
      if (restoreBar) restoreBar.style.position = "";
    };
  }, [topbarSelector, speed, messages]);

  return null;
}