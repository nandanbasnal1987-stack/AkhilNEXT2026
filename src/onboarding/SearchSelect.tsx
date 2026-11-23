'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, KeyboardEvent, UIEvent } from 'react';
import { Check, ChevronDown, Loader2, Search } from 'lucide-react';

export interface Page { items: string[]; total: number }

const PAGE_SIZE = 30;

/**
 * Dropdown with a text search, for long lists (clinic types from India and the world).
 * With `fetchPage` the options come from the server a page at a time: the first page loads when the list opens, typing searches on the
 * server (debounced) and scrolling to the bottom loads the next page. Without it, or when the server cannot be reached, the built-in
 * `options` are filtered in the browser. Arrow keys and Enter pick; a value that is not in the list can still be used ("Use ...").
 */
export default function SearchSelect({ id, value, options, placeholder, invalid, strict, fetchPage, onPick, onBlur }: {
  id?: string;
  value: string;
  options: string[];
  placeholder?: string;
  invalid?: boolean;
  /** Only values from the list can be picked (no "Use ..." row). */
  strict?: boolean;
  fetchPage?: (search: string, page: number, limit: number) => Promise<Page>;
  onPick: (value: string) => void;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [hi, setHi] = useState(0);
  const [remote, setRemote] = useState<{ items: string[]; total: number; page: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState<CSSProperties | null>(null);
  const seq = useRef(0); // ignores answers of searches that were replaced meanwhile

  const q = text.trim().toLowerCase();

  // first page + every new search (debounced); falls back to the local list when the server has nothing or fails
  useEffect(() => {
    if (!open || !fetchPage) return;
    const mine = ++seq.current;
    setLoading(true);
    const t = window.setTimeout(() => {
      fetchPage(text.trim(), 1, PAGE_SIZE)
        .then((p) => { if (mine === seq.current) setRemote(p.items.length || text.trim() ? { items: p.items, total: p.total, page: 1 } : null); })
        .catch(() => { if (mine === seq.current) setRemote(null); })
        .finally(() => { if (mine === seq.current) setLoading(false); });
    }, text ? 250 : 0);
    return () => window.clearTimeout(t);
  }, [open, text, fetchPage]);

  const loadMore = useCallback(() => {
    if (!fetchPage || !remote || loading || remote.items.length >= remote.total) return;
    const mine = seq.current;
    setLoading(true);
    fetchPage(text.trim(), remote.page + 1, PAGE_SIZE)
      .then((p) => { if (mine === seq.current) setRemote((cur) => (cur ? { items: [...cur.items, ...p.items.filter((x) => !cur.items.includes(x))], total: p.total, page: cur.page + 1 } : cur)); })
      .catch(() => { /* the loaded part stays */ })
      .finally(() => { if (mine === seq.current) setLoading(false); });
  }, [fetchPage, remote, loading, text]);

  const onScroll = (e: UIEvent<HTMLUListElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) loadMore();
  };

  const shown = useMemo(() => {
    if (remote) return remote.items;
    return q ? options.filter((o) => o.toLowerCase().includes(q)) : options;
  }, [remote, options, q]);
  const custom = !strict && text.trim() && !shown.some((o) => o.toLowerCase() === q) && !options.some((o) => o.toLowerCase() === q) ? text.trim().slice(0, 60) : '';
  const more = !!remote && remote.items.length < remote.total;
  const rows = custom && !more ? [...shown, `\u0000${custom}`] : shown; // the last row offers the typed text as it is

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { const t = e.target as Node; if (!root.current?.contains(t) && !list.current?.contains(t)) { setOpen(false); setText(''); setRemote(null); onBlur?.(); } };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open, onBlur]);

  // The list floats above the dialog (fixed, in the .ob-root layer) so the scrolling form body and the footer never clip it.
  // It opens downwards, or upwards when there is more room above the field.
  useEffect(() => {
    if (!open) { setPos(null); return; }
    const place = () => {
      const el = root.current?.querySelector('input');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const below = window.innerHeight - r.bottom - 12;
      const above = r.top - 12;
      const up = below < 220 && above > below;
      const max = Math.max(140, Math.min(280, up ? above : below));
      setPos({
        position: 'fixed', left: r.left, width: r.width, right: 'auto', zIndex: 100002, maxHeight: max, overflowY: 'auto',
        ...(up ? { bottom: window.innerHeight - r.top + 6, top: 'auto' } : { top: r.bottom + 6, bottom: 'auto' }),
      });
    };
    place();
    const again = (e: Event) => { if (!list.current?.contains(e.target as Node)) place(); };
    window.addEventListener('resize', place);
    window.addEventListener('scroll', again, true);
    return () => { window.removeEventListener('resize', place); window.removeEventListener('scroll', again, true); };
  }, [open]);

  useEffect(() => { setHi(0); }, [q]);
  useEffect(() => { (list.current?.children[hi] as HTMLElement | undefined)?.scrollIntoView?.({ block: 'nearest' }); }, [hi, open]);

  const close = () => { setOpen(false); setText(''); setRemote(null); };
  const pick = (row: string) => { onPick(row.startsWith('\u0000') ? row.slice(1) : row); close(); onBlur?.(); };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) { e.stopPropagation(); close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else { setHi((i) => Math.min(i + 1, rows.length - 1)); if (hi >= rows.length - 3) loadMore(); }
    } else if (e.key === 'ArrowUp' && open) { e.preventDefault(); setHi((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && open) { e.preventDefault(); if (rows[hi]) pick(rows[hi]); }
  };

  return (
    <div className="w-pp" ref={root} onKeyDown={onKey}>
      <div style={{ position: 'relative' }}>
        <Search size={16} aria-hidden="true" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.6, pointerEvents: 'none' }} />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={id ? `${id}-list` : undefined}
          aria-autocomplete="list"
          aria-invalid={invalid ? true : undefined}
          autoComplete="off"
          style={{ paddingLeft: 38, paddingRight: 38, width: '100%' }}
          placeholder={placeholder}
          value={open ? text : value}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(e) => { setText(e.target.value); setOpen(true); }}
        />
        <ChevronDown size={18} className={`w-pp-caret${open ? ' on' : ''}`} aria-hidden="true" style={{ position: 'absolute', right: 14, top: '50%', transform: open ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
      {open && pos && createPortal(
        <ul id={id ? `${id}-list` : undefined} ref={list} className="w-pp-list" role="listbox" onScroll={onScroll} style={pos}>
          {rows.length === 0 && !loading && <li className="w-pp-opt" style={{ cursor: 'default', opacity: 0.7 }}>No match. Keep typing or choose Other.</li>}
          {rows.map((row, i) => {
            const isCustom = row.startsWith('\u0000');
            const label = isCustom ? row.slice(1) : row;
            return (
              <li key={`${i}-${label}`} role="option" aria-selected={!isCustom && label === value}
                className={`w-pp-opt${i === hi ? ' hi' : ''}${!isCustom && label === value ? ' on' : ''}`}
                onMouseEnter={() => setHi(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(row)}>
                <span className="w-pp-name"><b>{isCustom ? `Use “${label}”` : label}</b></span>
                {!isCustom && label === value && <Check size={16} aria-hidden="true" />}
              </li>
            );
          })}
          {(loading || more) && (
            <li className="w-pp-opt" aria-live="polite" style={{ cursor: 'default', opacity: 0.7, justifyContent: 'center' }}>
              {loading ? <><Loader2 size={14} className="spin" aria-hidden="true" /> Loading…</> : 'Scroll for more'}
            </li>
          )}
        </ul>,
        root.current?.closest('.ob-root') ?? document.body,
      )}
    </div>
  );
}
