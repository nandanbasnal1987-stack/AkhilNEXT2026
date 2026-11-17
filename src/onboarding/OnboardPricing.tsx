import { Check } from 'lucide-react';
import { plans } from './data';
import './pricing-cards.css';

const PLAN_CODE = ['free', 'standard', 'custom'] as const;

/**
 * Three plan cards (Free / $100 Standard / Contact us) for the Augastam EMR and Clinic pages.
 * Every button carries `data-onboard=<plan>`, which OnboardProvider turns into "open the onboarding form on that plan".
 * Prices and features come from the same `plans` list the wizard uses, so the two never disagree.
 */
export default function OnboardPricing({ source = 'pricing-cards' }: { source?: string }) {
  return (
    <section className="obp" id="pricing" aria-labelledby="obp-title">
      <div className="obp-inner">
        <h2 id="obp-title">Simple pricing for every clinic</h2>
        <p className="obp-lead">Start free, upgrade when you grow, or talk to us for a tailored setup.</p>

        <div className="obp-grid">
          {plans.map((p, i) => {
            const code = PLAN_CODE[i];
            const custom = code === 'custom';
            return (
              <article key={p.name} className={`obp-card${p.popular ? ' obp-pop' : ''}`}>
                {p.popular && <span className="obp-badge">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="obp-price">
                  <b className={custom ? 'obp-contact' : ''}>{p.price}</b>
                  {p.suffix && <small>{p.suffix}</small>}
                </div>
                <p className="obp-blurb">{p.blurb}</p>
                <ul>
                  {p.features.map((f) => <li key={f}><Check size={16} aria-hidden="true" /> {f}</li>)}
                </ul>
                <a href="#" className={`obp-btn${p.popular ? ' obp-btn-primary' : ''}`} data-onboard={code} data-onboard-source={`${source}:${code}`}>
                  {custom ? 'Contact us' : code === 'free' ? 'Start free' : 'Get started'}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
