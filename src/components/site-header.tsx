import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link href="/" className="brand" aria-label="Samuel Lisboa — início">
          <Image
            className="brand-logo"
            src="/images/brand/samuel-mark.png"
            alt=""
            width={30}
            height={30}
            priority
          />
          <span><span className="brand-mark">//</span> LISBOA.SAMU</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="nav-github"
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <Link className="button button-small" href="/resume">
            Resume
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
