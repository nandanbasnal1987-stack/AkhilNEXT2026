import ClinicTopbar from "@/components/layout/ClinicTopbar";
import ClinicHeader from "@/components/layout/ClinicHeader";
import "../../styles/clinic-header.css";

export default function AugastamClinicLayout({ children }) {
  return (
    <>
      <ClinicTopbar />
      <ClinicHeader />

      <main>{children}</main>
    </>
  );
}