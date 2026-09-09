import { Download } from "lucide-react";
import { cvAssetPath, cvAvailable } from "@/lib/site";

type CvButtonProps = {
  className?: string;
  compact?: boolean;
};

export function CvButton({ className = "", compact = false }: CvButtonProps) {
  if (!cvAvailable) {
    return (
      <span
        className={`button button-disabled ${compact ? "button-small" : ""} ${className}`}
        aria-disabled="true"
        title="Currículo em PDF ainda não foi adicionado"
      >
        <Download size={16} aria-hidden="true" />
        CV em breve
      </span>
    );
  }

  return (
    <a
      className={`button ${compact ? "button-small" : ""} ${className}`}
      href={cvAssetPath}
      download
    >
      <Download size={16} aria-hidden="true" />
      Download CV
    </a>
  );
}
