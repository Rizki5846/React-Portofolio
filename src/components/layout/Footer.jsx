import { useTheme } from "../../context/themeContext";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Rizki5846",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rizkiardiansyah02/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:rizkiardiansyah584@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export const Footer = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      style={{
        borderTop: `1px solid ${colors.border}`,
        background: colors.surface,
        padding: "clamp(32px, 6vw, 48px) 20px clamp(20px, 4vw, 28px)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "clamp(24px, 5vw, 40px)",
            marginBottom: "clamp(28px, 5vw, 40px)",
          }}
        >
          {/* Branding */}
          <div style={{ maxWidth: 280 }}>
            <span
              style={{
                fontFamily: colors.mono,
                fontSize: "clamp(13px, 3.5vw, 15px)",
                fontWeight: 700,
                color: colors.copper,
                display: "block",
                marginBottom: 8,
              }}
            >
              &lt;mrizki /&gt;
            </span>
            <p
              style={{
                fontSize: "clamp(12px, 3vw, 13px)",
                color: colors.muted,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              IoT Enthusiast · Web Developer · IT Support
              <br />
              Cianjur, Indonesia 🇮🇩
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <p
              style={{
                fontFamily: colors.mono,
                fontSize: 10,
                color: colors.copper,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Navigasi
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.muted,
                    fontSize: "clamp(12px, 3vw, 13px)",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    fontFamily: colors.sans,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.copper)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.muted)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p
              style={{
                fontFamily: colors.mono,
                fontSize: 10,
                color: colors.copper,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Kontak
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: colors.muted,
                    textDecoration: "none",
                    fontSize: "clamp(12px, 3vw, 13px)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.copper)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.muted)}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: `1px solid ${colors.border}`,
            paddingTop: "clamp(16px, 3vw, 20px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: colors.mono,
              fontSize: "clamp(10px, 2.5vw, 11px)",
              color: colors.muted,
            }}
          >
            © {currentYear} Muhamad Rizki Ardiansyah — All rights reserved.
          </span>
          <span
            style={{
              fontFamily: colors.mono,
              fontSize: "clamp(10px, 2.5vw, 11px)",
              color: colors.muted,
            }}
          >
            Built with React ⚛️ &amp; ☕
          </span>
        </div>
      </div>
    </footer>
  );
};