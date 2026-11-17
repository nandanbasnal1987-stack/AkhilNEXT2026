import { Bell, Building2, Mail, CalendarDays, ClipboardList, Pill, Stethoscope, UserRound, Users } from 'lucide-react';
import { COMPANY } from './config';

export interface PreviewData {
  clinicName: string;
  clinicType: string;
  facilities: string[];
  contactName: string;
  isDoctor: boolean;
  planName: string;
}

const MENU = [
  { icon: CalendarDays, label: 'Appointments' },
  { icon: UserRound, label: 'Registration' },
  { icon: Stethoscope, label: 'OPD & EMR' },
  { icon: Pill, label: 'Pharmacy' },
  { icon: ClipboardList, label: 'Billing' },
  { icon: Users, label: 'Staff' },
];

const initials = (s: string) => (s.match(/[A-Za-z0-9]+/g) ?? []).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'A';

/** Live, scripted mock of the applicant's own Augastam: it fills in as the wizard fields are typed. No API calls. */
export default function ClinicPreview({ d }: { d: PreviewData }) {
  const name = d.clinicName.trim() || 'Your clinic';
  const sites = d.facilities.length ? d.facilities : ['Main facility'];
  const roles = d.isDoctor ? ['Clinics Admin', 'Doctor'] : ['Clinics Admin'];
  const who = d.contactName.trim() || 'You';

  return (
    <aside className="pv" aria-label="Preview of your Augastam workspace">
      <p className="pv-cap">Live preview · your workspace</p>
      <div className="pv-app">
        <div className="pv-side">
          <span className="pv-logo">{initials(name)}</span>
          {MENU.map((m) => <span key={m.label} className="pv-ico" title={m.label}><m.icon size={14} /></span>)}
        </div>
        <div className="pv-main">
          <div className="pv-top">
            <div>
              <strong className="pv-name" key={name}>{name}</strong>
              <small>{d.clinicType || 'Clinic'} · {d.planName} plan</small>
            </div>
            <Bell size={15} />
          </div>

          <div className="pv-row">
            <span className="pv-lab">Facility</span>
            <div className="pv-chips">
              {sites.slice(0, 4).map((f) => <span key={f} className="pv-chip"><Building2 size={11} /> {f}</span>)}
              {sites.length > 4 && <span className="pv-chip">+{sites.length - 4}</span>}
            </div>
          </div>

          <div className="pv-row">
            <span className="pv-lab">Sign in as</span>
            <div className="pv-chips">
              <span className="pv-user">{who}</span>
              {roles.map((r) => <span key={r} className="pv-chip pv-role">{r}</span>)}
            </div>
          </div>

          <div className="pv-menu">
            {MENU.map((m) => <span key={m.label}><m.icon size={13} /> {m.label}</span>)}
          </div>
          <p className="pv-foot">Forms, workflows and roles are copied from a ready-made template at approval.</p>
        </div>
      </div>

      <div className="pv-next">
        <p className="pv-cap">What happens next</p>
        <ol>
          <li><b>You get a reference number</b><span>Straight after you submit.</span></li>
          <li><b>Our team reviews</b><span>We may call to confirm details.</span></li>
          <li><b>Your workspace is created</b><span>Your admin receives sign-in details by email.</span></li>
        </ol>
        <div className="pv-help">
          <a href={`mailto:${COMPANY.email}`}><Mail size={14} /> {COMPANY.email}</a>
          <a href="#" data-onboard-status data-onboard-source="wizard-preview">Already applied? Track your application</a>
        </div>
      </div>
    </aside>
  );
}
