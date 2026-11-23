'use client';

import { useEffect, useMemo, useState } from 'react';
import { BadgePercent, Check, Info, Loader2, Sparkles, Tag, X } from 'lucide-react';
import { api } from './api/onboarding';
import type { BillingCycle, Plan, PlanCode, PricingCurrencies, PricingPlan, PricingPlans, Quote } from './api/onboarding';
import SearchSelect from './SearchSelect';
import { loadCountries } from './geo';
import type { CountryInfo } from './geo';

/**
 * Step 3: choose the plan and how to pay for it.
 * Prices come from the server (currency by country, local plan rates, festive offers, coupons); when the server cannot be reached the
 * built-in USD list prices are shown instead and coupons are unavailable.
 */
export default function PlanStep({ plans, plansReady, onContact, planError, planCode, cycle, country, currency, couponCode, email, couponError, notice, onPlan, onCycle, onCurrency, onCoupon, onQuote }: {
  plans: Plan[];
  /** False until the server has answered with the plan list. */
  plansReady: boolean;
  onContact?: () => void;
  planError?: string;
  planCode: PlanCode;
  cycle: BillingCycle;
  country: string;
  currency: string;
  couponCode: string;
  email: string;
  couponError?: string;
  notice?: string;
  onPlan: (code: PlanCode) => void;
  onCycle: (c: BillingCycle) => void;
  onCurrency: (code: string) => void;
  onCoupon: (code: string) => void;
  onQuote: (q: Quote | null) => void;
}) {
  const [pricing, setPricing] = useState<PricingPlans | null>(null);
  const [currencies, setCurrencies] = useState<PricingCurrencies | null>(null);
  const [where, setWhere] = useState<CountryInfo | null | undefined>(undefined); // undefined = countries not loaded yet
  const [quote, setQuote] = useState<Quote | null>(null);
  const [couponText, setCouponText] = useState(couponCode);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    api.pricingCurrencies().then((o) => { if (live) setCurrencies(o); }).catch(() => { /* the currency picker simply stays hidden */ });
    return () => { live = false; };
  }, []);

  // the applicant's country gives its ISO code and its own currency, used until a currency is picked by hand
  useEffect(() => {
    let live = true;
    loadCountries().then((all) => { if (live) setWhere(all.find((c) => c.name.toLowerCase() === country.toLowerCase()) ?? null); }).catch(() => { if (live) setWhere(null); });
    return () => { live = false; };
  }, [country]);
  const countryCode = where?.iso ?? '';
  const askCurrency = currency || (where && currencies?.currencies.some((c) => c.code === where.currency) ? where.currency : '');
  const ready = where !== undefined;

  useEffect(() => {
    if (!ready) return undefined;
    let live = true;
    api.pricingPlans({ country: countryCode, currency: askCurrency || undefined }).then((p) => { if (live) setPricing(p); }).catch(() => { if (live) setPricing(null); });
    return () => { live = false; };
  }, [ready, countryCode, askCurrency]);

  // two groups, both straight from the server: plans you can choose (price_monthly set, 0 = free) and "contact us" plans (price_monthly null)
  const listed = useMemo(() => plans.filter((p) => p.price_monthly !== null), [plans]);
  const contact = plans.find((p) => p.price_monthly === null);
  const chosen: Plan = listed.find((p) => p.code === planCode) ?? listed[0] ?? { code: '', name: '', blurb: '', price_label: '', price_monthly: null, max_facilities: null, features: [] };
  const priced = !!chosen.price_monthly;

  // the full breakdown of the chosen plan: offers, coupon, total (debounced while typing)
  useEffect(() => {
    if (!ready) return undefined;
    if (!priced) { setQuote(null); onQuote(null); return undefined; }
    let live = true;
    setBusy(true);
    const t = window.setTimeout(() => {
      api.pricingQuote({ plan_code: planCode, billing_cycle: cycle, country: countryCode, currency: askCurrency || undefined, coupon_code: couponCode || undefined, email_id: email || undefined })
        .then((q) => { if (live) { setQuote(q); onQuote(q); } })
        .catch(() => { if (live) { setQuote(null); onQuote(null); } })
        .finally(() => { if (live) setBusy(false); });
    }, 300);
    return () => { live = false; window.clearTimeout(t); };
  }, [ready, planCode, cycle, countryCode, askCurrency, couponCode, email, priced, onQuote]);

  const symbol = pricing?.currency.symbol ?? '$';
  const decimals = pricing?.currency.decimals ?? 2;
  const money = (n: number) => `${symbol}${n.toLocaleString(pricing?.currency.code === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

  const rowOf = (p: Plan): PricingPlan | undefined => pricing?.plans.find((x) => x.code === p.code);
  const usdMonthly = (p: Plan) => (p.price_monthly ?? 0);
  const activeCurrency = pricing?.currency.code ?? (currency || 'USD');
  const currencyOptions = useMemo(() => (currencies?.currencies ?? []).map((c) => ({ code: c.code, text: `${c.code} · ${c.label}${c.symbol && c.symbol !== c.code ? ` (${c.symbol})` : ''}` })), [currencies]);
  const currentText = currencyOptions.find((o) => o.code === activeCurrency)?.text ?? activeCurrency;
  const savingLabel = useMemo(() => {
    const r = pricing && rowOf(chosen.price_monthly ? chosen : (listed.find((p) => p.price_monthly) ?? chosen));
    return r ? `Save ${r.annual.saving_formatted}` : 'Save 2 months';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricing, chosen, listed]);

  const price = (p: Plan) => {
    if (p.price_monthly === null) return <div className="pl-price"><b>{p.price_label || 'Contact us'}</b></div>;
    if (!p.price_monthly) return <div className="pl-price"><b>Free</b></div>;
    const r = rowOf(p);
    const block = r ? (cycle === 'annual' ? r.annual : r.monthly) : null;
    const per = cycle === 'annual' ? '/year' : '/month';
    if (!block) {
      const total = cycle === 'annual' ? usdMonthly(p) * 10 : usdMonthly(p);
      return <div className="pl-price"><b>${total.toLocaleString()}<i>{per}</i></b></div>;
    }
    return (
      <div className="pl-price">
        {block.discount_total > 0 && <s>{block.list_price_formatted}</s>}
        <b>{block.total_formatted}<i>{per}</i></b>
        {cycle === 'annual' && <small>≈ {money(block.per_month_total)}/month</small>}
        {cycle === 'annual' && r && r.annual.saving_vs_monthly > 0 && <small className="pl-save">Save {r.annual.saving_formatted} vs monthly</small>}
      </div>
    );
  };

  const applyCoupon = () => onCoupon(couponText.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, ''));
  const clearCoupon = () => { setCouponText(''); onCoupon(''); };
  const couponHit = quote?.offers_applied.find((o) => o.kind === 'coupon');
  const couponProblem = couponCode && quote?.coupon && !quote.coupon.valid ? quote.coupon.reason : undefined;
  const dateOf = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '');
  const offers = pricing?.offers.active ?? [];
  const features = quote?.what_you_get?.length ? quote.what_you_get : chosen.features;

  if (!plansReady) return <div className="pl"><p className="pl-note"><Loader2 size={14} className="spin" aria-hidden="true" /> Loading plans…</p></div>;
  // the Contact us block: its name and line come from the server's "contact us" plan when there is one; the only fixed text is the button
  const contactCard = (
    <div className="pl-contact">
      {contact && <span className="pl-main"><b>{contact.name}</b><small>{contact.blurb}</small></span>}
      {onContact && <button type="button" className="ob-btn ob-btn-primary ob-btn-sm" onClick={onContact}>{contact?.price_label || 'Contact us'}</button>}
    </div>
  );

  if (!listed.length) {
    return (
      <div className="pl">
        {contactCard}
        {planError && <p className="pl-bad" role="alert">{planError}</p>}
      </div>
    );
  }

  return (
    <div className="pl">
      {offers.length > 0 && (
        <div className="pl-offers" role="status">
          {offers.map((o) => (
            <p key={o.code}><Sparkles size={15} aria-hidden="true" /> <b>{o.banner || o.label}</b>{o.valid_to ? <span> · ends {dateOf(o.valid_to)}</span> : null}</p>
          ))}
        </div>
      )}

      <div className="pl-bar">
        <div className="w-cycle" role="group" aria-label="Billing cycle">
          <button type="button" className={cycle === 'monthly' ? 'on' : ''} aria-pressed={cycle === 'monthly'} onClick={() => onCycle('monthly')}>Monthly</button>
          <button type="button" className={cycle === 'annual' ? 'on' : ''} aria-pressed={cycle === 'annual'} onClick={() => onCycle('annual')}>Annual <small>{savingLabel}</small></button>
        </div>
        {currencyOptions.length > 1 && (
          <div className="pl-cur">
            <span id="pl-cur-l">Prices in</span>
            <SearchSelect
              id="w-currency"
              strict
              value={currentText}
              options={currencyOptions.map((o) => o.text)}
              placeholder="Search currency"
              onPick={(text) => { const hit = currencyOptions.find((o) => o.text === text); if (hit) onCurrency(hit.code); }}
            />
          </div>
        )}
      </div>

      <fieldset className="pl-list">
        <legend className="sr-only">Choose your plan</legend>
        {listed.map((p) => {
          const on = p.code === planCode;
          return (
            <label key={p.code} className={`pl-card${on ? ' on' : ''}`}>
              <input type="radio" name="w-plan" checked={on} onChange={() => onPlan(p.code)} />
              <span className="pl-dot" aria-hidden="true">{on && <Check size={12} />}</span>
              <span className="pl-main"><b>{p.name}</b><small>{p.blurb}</small></span>
              {price(p)}
              {on && (
                <ul className="pl-feats" aria-label={`${p.name} includes`}>
                  {(p.code === planCode ? features : p.features).map((f) => <li key={f}><Check size={13} aria-hidden="true" /> {f}</li>)}
                </ul>
              )}
            </label>
          );
        })}
      </fieldset>
      {notice && <p className="w-notice"><Info size={14} /> {notice}</p>}
      {contactCard}

      {priced && (
        <>
          <div className="pl-coupon">
            <label htmlFor="w-coupon"><Tag size={14} aria-hidden="true" /> Have a coupon?</label>
            <div>
              <input
                id="w-coupon" value={couponText} maxLength={30} autoComplete="off" placeholder="Enter coupon code" aria-invalid={couponProblem || couponError ? true : undefined}
                onChange={(e) => setCouponText(e.target.value.toUpperCase())}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyCoupon(); } }}
              />
              {couponCode
                ? <button type="button" className="w-ms-control" onClick={clearCoupon}><X size={14} /> Remove</button>
                : <button type="button" className="w-ms-control" disabled={!couponText.trim()} onClick={applyCoupon}>Apply</button>}
            </div>
            {couponHit && <p className="pl-ok"><BadgePercent size={14} /> {couponHit.code} applied: you save {quote ? money(couponHit.discount) : ''}</p>}
            {(couponProblem || couponError) && <p className="pl-bad" role="alert">{couponProblem || couponError}</p>}
            {quote?.coupon?.valid && !couponHit && quote.coupon.reason && <p className="pl-note">{quote.coupon.reason}</p>}
          </div>

          <div className="pl-sum" aria-live="polite">
            <div className="pl-sum-h">Your plan {busy && <Loader2 size={14} className="spin" aria-hidden="true" />}</div>
            {quote ? (
              <dl>
                <div><dt>{quote.plan.name} · {quote.billing_cycle === 'annual' ? 'Annual' : 'Monthly'}</dt><dd>{quote.list_price_formatted}</dd></div>
                {quote.offers_applied.map((o) => <div key={o.code} className="pl-disc"><dt>{o.label}</dt><dd>−{money(o.discount)}</dd></div>)}
                <div className="pl-total"><dt>Total {quote.billing_cycle === 'annual' ? 'per year' : 'per month'}</dt><dd>{quote.total_formatted}</dd></div>
                {quote.billing_cycle === 'annual' && <div><dt>That is about</dt><dd>{money(quote.per_month_total)}/month</dd></div>}
                {quote.valid_until && <div><dt>Offer valid until</dt><dd>{dateOf(quote.valid_until)}</dd></div>}
                <div><dt>Includes</dt><dd>{quote.facilities}</dd></div>
              </dl>
            ) : (
              <dl>
                <div><dt>{chosen.name} · {cycle === 'annual' ? 'Annual' : 'Monthly'}</dt><dd>${(cycle === 'annual' ? usdMonthly(chosen) * 10 : usdMonthly(chosen)).toLocaleString()}</dd></div>
                <div><dt>Includes</dt><dd>{chosen.max_facilities === null ? 'Unlimited facilities' : `Up to ${chosen.max_facilities} ${chosen.max_facilities === 1 ? 'facility' : 'facilities'}`}</dd></div>
              </dl>
            )}
            {quote?.rates && (
              <p className="pl-fine">Converted at {quote.currency.rate_per_usd.toLocaleString(undefined, { maximumFractionDigits: 4 })} {quote.currency.code} per US dollar, updated {dateOf(quote.rates.updated_at)}. {quote.rates.attribution}.</p>
            )}
            <p className="pl-fine">No payment is taken now. An invoice is sent after your application is approved.</p>
          </div>
        </>
      )}
    </div>
  );
}
