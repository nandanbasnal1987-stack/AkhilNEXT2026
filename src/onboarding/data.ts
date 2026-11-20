export const stats = [
  { value: '32+', label: 'Years in Healthcare Technology' },
  { value: '100+', label: 'Hospital Groups & Organisations' },
  { value: '600+', label: 'Customers Across Workflows' },
  { value: '12+', label: 'Countries with Global Presence' },
];

export const features = [
  { icon: 'UserPlus', title: 'Provider Onboarding', text: 'Simplified process for adding new practitioners to your medical facility.' },
  { icon: 'ShieldCheck', title: 'Compliance Tracking', text: 'Easily track and manage regulatory compliance requirements.' },
  { icon: 'BadgeCheck', title: 'Staff Credentialing', text: 'Streamline credential verification and management for all providers.' },
  { icon: 'CalendarClock', title: 'Scheduling Tools', text: 'Efficient tools for managing appointments and staff schedules.' },
] as const;

export const testimonials = [
  {
    quote: 'This platform has revolutionized how we onboard new clinics. What used to take weeks now happens in days, with far fewer headaches for everyone involved.',
    name: 'Dr. Sarah Johnson',
    role: 'Medical Director, Sunshine Medical Group',
  },
  {
    quote: "The compliance tracking feature alone has saved us countless hours of administrative work. It's like having an extra staff member dedicated to paperwork.",
    name: 'Michael Chen',
    role: 'Practice Manager, Westside Family Practice',
  },
  {
    quote: 'We expanded from 3 to 8 locations in a year, and this platform made scaling our operations so much smoother than I anticipated.',
    name: 'Dr. Robert Williams',
    role: 'CEO, Cascade Health Network',
  },
];

export interface Plan {
  name: string;
  price: string;
  suffix?: string;
  blurb: string;
  features: string[];
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    suffix: '/month',
    blurb: '45 days free trial - Perfect for small clincs.',
    features: ['1 Facility onboarding', 'Basic dashboard access', 'Email support', '48-hour response time'],
  },
  {
    name: 'Standard',
    price: '$39',
    suffix: '/month',
    blurb: '2 doctors + 1 staff',
    popular: true,
    features: ['5 Facility onboarding', 'Advanced analytics', 'Priority email support', '24-hour response time', 'Custom branding options'],
  },
  {
    name: 'Custom',
    price: 'Contact us',
    blurb: 'For large healthcare networks with unique needs.',
    features: ['Unlimited facility onboarding', 'Dedicated account manager', 'Phone and email support', '4-hour response time', 'Custom workflow automation', 'API access'],
  },
];

export const tech = [
  { icon: 'BrainCircuit', title: 'AI-Powered Diagnostics', text: 'Integrate powerful AI algorithms to assist with diagnostics, treatment planning, and patient risk assessment.' },
  { icon: 'FileHeart', title: 'Customized EMR Solutions', text: 'Tailor electronic medical records to your specific workflows and specialties for maximum efficiency.' },
  { icon: 'CalendarCheck', title: 'Smart Appointment Scheduling', text: 'Dynamic scheduling system that optimizes provider time and improves patient satisfaction.' },
  { icon: 'BarChart3', title: 'Dynamic Data Analytics', text: 'Real-time insights into clinic performance, patient outcomes, and operational efficiency.' },
] as const;

export const footerLinks = {
  quick: ['Home', 'About', 'Features', 'Pricing', 'Contact'],
  services: ['Clinic Onboarding', 'Provider Management', 'Patient Registration', 'Billing Solutions', 'Analytics Dashboard'],
};
