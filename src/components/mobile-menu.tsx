"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/data/portfolio";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="icon-button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open ? (
        <div id="mobile-navigation" className="mobile-panel">
          <nav aria-label="Navegação mobile">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="mobile-resume" href="/resume" onClick={() => setOpen(false)}>
            Recruiter Mode
          </a>
        </div>
      ) : null}
    </div>
  );
}
