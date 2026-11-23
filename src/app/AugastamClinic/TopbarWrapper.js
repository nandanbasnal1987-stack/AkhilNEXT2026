'use client';

import { usePathname } from 'next/navigation';
import ClinicTopbar from '@/components/layout/ClinicTopbar';

const HIDDEN_ON = ['/augastamclinic'];

export default function TopbarWrapper() {
  const pathname = usePathname();
  const hide = HIDDEN_ON.some(
    (p) => pathname.toLowerCase().startsWith(p)
  );
  if (hide) return null;
  return <ClinicTopbar />;
}