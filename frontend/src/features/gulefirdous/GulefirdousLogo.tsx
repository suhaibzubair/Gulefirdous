import logoUrl from "./assets/gulefirdous-logo.png";

interface GulefirdousLogoProps {
  variant?: "login" | "sidebar";
  className?: string;
}

function GulefirdousLogo({ variant = "login", className = "" }: GulefirdousLogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Gul-e-FIRDOUS Curated Elegance"
      className={`gf-brand-logo gf-brand-logo-${variant} ${className}`.trim()}
    />
  );
}

export default GulefirdousLogo;
