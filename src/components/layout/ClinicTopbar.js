
export default function ClinicTopbar() {
  return (
    <div className="clinic-topbar">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>Healthcare Management Made Simple</span>
          </div>

          <div className="d-flex gap-3">
            <a href="mailto:sales@akhilsystems.com">
              Email Us
            </a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
