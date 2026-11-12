/**
 * Creates a cleanup scope for a section script.
 * Tracks event listeners, timers, animation frames,
 * and IntersectionObservers for safe cleanup.
 */

export type Scope = {
  root: HTMLElement | Document;
  setInterval: (handler: TimerHandler, ms?: number) => number;
  setTimeout: (handler: TimerHandler, ms?: number) => number;
  raf: (callback: FrameRequestCallback) => number;
  IO: typeof IntersectionObserver;
  run: (fn: (scope: Scope) => void) => void;
  dispose: () => void;
  signal: AbortSignal;
};

export function createScope(root: HTMLElement | Document): Scope {
  if (typeof window === "undefined") {
    throw new Error("createScope can only run in the browser.");
  }

  const ac = new AbortController();

  // टाइप स्पष्ट करें ताकि unknown की समस्या न आए
  const intervals = new Set<number>();
  const timeouts = new Set<number>();
  const frames = new Set<number>();
  const observers = new Set<IntersectionObserver>();

  let disposed = false;

  // Track IntersectionObservers
  class TrackedIO extends IntersectionObserver {
    constructor(
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      super(callback, options);
      observers.add(this);
    }

    override disconnect(): void {
      observers.delete(this);
      super.disconnect();
    }
  }

  // Scope object
  const scope: Scope = {
    root,

    setInterval(handler: TimerHandler, ms?: number): number {
      if (disposed) return 0;
      const id = window.setInterval(handler, ms);
      intervals.add(id);
      return id;
    },

    setTimeout(handler: TimerHandler, ms?: number): number {
      if (disposed) return 0;
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (!disposed && typeof handler === "function") {
          handler();
        }
      }, ms);
      timeouts.add(id);
      return id;
    },

    raf(callback: FrameRequestCallback): number {
      if (disposed) return 0;
      const id = window.requestAnimationFrame((time) => {
        frames.delete(id);
        if (!disposed) callback(time);
      });
      frames.add(id);
      return id;
    },

    IO: TrackedIO,

    run(fn) {
      if (disposed) return;
      fn(scope);
    },

    dispose() {
      if (disposed) return;
      disposed = true;

      ac.abort();

      // अब id का प्रकार number है, इसलिए कोई एरर नहीं
      intervals.forEach((id) => {
        window.clearInterval(id);
      });

      timeouts.forEach((id) => {
        window.clearTimeout(id);
      });

      frames.forEach((id) => {
        window.cancelAnimationFrame(id);
      });

      // observer का प्रकार IntersectionObserver है
      observers.forEach((observer) => {
        observer.disconnect();
      });

      intervals.clear();
      timeouts.clear();
      frames.clear();
      observers.clear();
    },

    signal: ac.signal,
  };

  return scope;
}

// अगर पिछली बार यह लाइन नहीं जोड़ी थी, तो यह भी रखें (ज़रूरी नहीं, क्योंकि ऊपर export type Scope है)
// export type Scope = ReturnType<typeof createScope>;