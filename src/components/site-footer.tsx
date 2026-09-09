import { socials } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>SAMUEL LISBOA</strong>
          <p>SOFTWARE ENGINEERING / AUTOMATION / AI</p>
        </div>
        <div>
          <p>São Paulo, Brazil</p>
          <nav aria-label="Links sociais no rodapé">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-signoff">
          <p>© 2026 Samuel Lisboa</p>
          <p>BUILT BY SAMUEL. OBVIOUSLY.</p>
        </div>
      </div>
    </footer>
  );
}
