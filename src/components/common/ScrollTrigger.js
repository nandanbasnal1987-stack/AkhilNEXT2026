'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Drop-in replacement for `react-scroll-trigger`, which relies on
 * ReactDOM.findDOMNode (removed in React 19).
 *
 * Supports the props this project uses: onEnter, onExit, onProgress, component,
 * triggerOnLoad. Fires onEnter when the element touches the viewport and
 * onExit when it leaves, same as the original (a scroll/resize listener that
 * checks getBoundingClientRect).
 */
export default function ScrollTrigger({
  children,
  component: Component = 'div',
  onEnter,
  onExit,
  onProgress,
  triggerOnLoad = true,
  throttleScroll = 100,
  throttleResize = 100,
  ...rest
}) {
  const ref = useRef(null);
  const inViewportRef = useRef(false);
  const handlers = useRef({ onEnter, onExit, onProgress });
  handlers.current = { onEnter, onExit, onProgress };

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const check = () => {
      const rect = el.getBoundingClientRect();
      const viewportEnd = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      const inViewport = rect.top <= viewportEnd && rect.bottom >= 0;

      if (inViewport) {
        const progress = Math.max(
          0,
          Math.min(1, 1 - rect.bottom / (viewportEnd + rect.height))
        );
        if (!inViewportRef.current) {
          inViewportRef.current = true;
          handlers.current.onEnter?.({ progress, velocity: null });
        }
        handlers.current.onProgress?.({ progress, velocity: null });
      } else if (inViewportRef.current) {
        inViewportRef.current = false;
        const progress = rect.top <= viewportEnd ? 1 : 0;
        handlers.current.onProgress?.({ progress, velocity: null });
        handlers.current.onExit?.({ progress, velocity: null });
      }
    };

    const throttle = (fn, wait) => {
      let last = 0;
      return () => {
        const now = Date.now();
        if (now - last >= wait) {
          last = now;
          fn();
        }
      };
    };

    const onScroll = throttle(check, throttleScroll);
    const onResize = throttle(check, throttleResize);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    if (triggerOnLoad) check();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [throttleScroll, throttleResize, triggerOnLoad]);

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
}
