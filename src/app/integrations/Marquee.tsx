import { MARQUEE_ROWS } from "@/lib/integrations-data";

export default function Marquee() {
  return (
    <div className="integrations-rows" aria-label="All supported integrations">
      {MARQUEE_ROWS.map((list, r) => {
        const html = list.map((t) => (
          <div className="integration-tag" key={t}>
            {t}
          </div>
        ));
        // duplicate list twice so the animation loops seamlessly
        const trackContent = [...html, ...html];

        return (
          <div key={r} className={`integrations-row${r ? " rev" : ""}`}>
            <div className="integrations-track">{trackContent}</div>
            <div className="integrations-track" aria-hidden="true">
              {trackContent}
            </div>
          </div>
        );
      })}
    </div>
  );
}