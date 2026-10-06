import { brand } from "@/lib/barbershop-data";

export function AnimatedLogo() {
  return (
    <div className="logo-stage" aria-hidden="true">
      <span className="logo-glow" />
      <span className="logo-ring logo-ring--gold" />
      <span className="logo-ring logo-ring--dash" />
      <span className="logo-float">
        <img src={brand.logoImage} alt="" width={280} height={280} className="logo-core" />
        <span className="logo-sheen" />
      </span>
      <span className="logo-spark logo-spark--a" />
      <span className="logo-spark logo-spark--b" />
      <span className="logo-spark logo-spark--c" />
    </div>
  );
}
