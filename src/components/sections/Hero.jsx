import { useState, useEffect } from "react";
import { TypeWriter } from "../ui/TypeWriter";
import { KeyboardStrip } from "../layout/KeyboardStrip";
import { useTheme } from "../../context/themeContext";

export const Hero = ({ scrollTo }) => {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Sky blue values (2nd accent)
  const sky = isDark ? "#38bdf8" : "#0ea5e9";
  const skyDim = isDark ? "#075985" : "#0284c7";

  const handleButtonPress = (e, type) => {
    const btn = e.currentTarget;
    btn.style.transform = "translateY(3px)";
    if (type === 'primary') {
      btn.style.boxShadow = `0 1px 0 ${colors.copperDim}`;
    } else {
      btn.style.boxShadow = `0 1px 0 ${colors.border}`;
    }
  };

  const handleButtonRelease = (e, type) => {
    const btn = e.currentTarget;
    btn.style.transform = "";
    if (type === 'primary') {
      btn.style.boxShadow = `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`;
    } else {
      btn.style.boxShadow = colors.shadow;
    }
  };

  return (
    <div id="home" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px 40px",
      gap: "clamp(30px, 8vw, 48px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background Image — lebih terlihat di light mode */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        opacity: isDark ? 0.15 : 0.70,
        zIndex: 0,
      }} />

      {/* Overlay — indigo→sky tint, tidak menutupi gambar sepenuhnya */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: isDark
          ? `linear-gradient(135deg, ${colors.bg}d9 0%, ${colors.bg}66 50%, ${colors.bg}d9 100%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(238,242,255,0.10) 50%, rgba(240,249,255,0.40) 100%)`,

        zIndex: 0,
      }} />

      {/* Decorative ambient blobs (light mode only) */}
      {!isDark && (
        <>
          <div style={{
            position: "absolute", top: "10%", right: "5%",
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            zIndex: 0, pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "15%", left: "5%",
            width: 260, height: 260, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)",
            zIndex: 0, pointerEvents: "none",
          }} />
        </>
      )}

      {/* Content */}
      <div style={{
        textAlign: "center",
        maxWidth: "min(90%, 680px)",
        position: "relative",
        zIndex: 1
      }}>
        {/* Status Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: colors.mono,
          fontSize: "clamp(10px, 3vw, 11px)",
          color: colors.copper,
          border: `1px solid ${colors.copper}44`,
          borderRadius: 6,
          padding: "5px 14px",
          marginBottom: "clamp(20px, 5vw, 28px)",
          background: `${colors.copper}0f`,
          backdropFilter: "blur(8px)",
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#4ade80", boxShadow: "0 0 8px #4ade8088",
            display: "inline-block"
          }} />
          Open to Work
        </div>

        {/* H1 */}
        <h1 style={{
          fontSize: "clamp(1.8rem, 8vw, 3.5rem)",
          fontWeight: 800,
          lineHeight: 1.2,
          margin: "0 0 14px",
          // Dark: gradient white→indigo | Light: solid deep slate (reliable)
          ...(isDark
            ? {
              background: `linear-gradient(135deg, ${colors.text} 40%, #818cf8)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }
            : {
              color: "#0f172a",
              WebkitTextFillColor: "#0f172a",
            }
          ),
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
        }}>
          Muhamad Rizki<br />Ardiansyah
        </h1>

        {/* TypeWriter */}
        <div style={{
          fontSize: "clamp(12px, 4vw, 14px)",
          marginBottom: 14,
          height: "clamp(20px, 6vw, 24px)",
          color: colors.muted,
        }}>
          <TypeWriter text="IoT Enthusiast  ·  Web Developer  ·  IT Support" speed={55} />
        </div>

        {/* Description */}
        <p style={{
          fontSize: "clamp(13px, 3.5vw, 14px)",
          color: colors.muted,
          lineHeight: 1.8,
          margin: "0 auto 36px",
          maxWidth: "min(90%, 480px)",
        }}>
          Halo! Saya lulusan Teknik Informatika yang antusias menghubungkan solusi digital dengan dunia nyata. Mulai dari merancang aplikasi web modern, bereksperimen dengan perangkat IoT, hingga merawat keandalan infrastruktur IT dari balik layar.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          gap: "clamp(10px, 4vw, 14px)",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "0 10px",
        }}>
          {/* Primary — Indigo solid */}
          <button
            onClick={() => scrollTo("projects")}
            style={{
              background: `linear-gradient(135deg, ${colors.copper}, ${colors.copperLight})`,
              border: "none",
              borderRadius: 8,
              padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "clamp(12px, 3.5vw, 14px)",
              cursor: "pointer",
              boxShadow: `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`,
              transition: "transform 0.1s, box-shadow 0.1s",
              fontFamily: colors.sans,
              whiteSpace: "nowrap",
            }}
            onMouseDown={(e) => handleButtonPress(e, 'primary')}
            onMouseUp={(e) => handleButtonRelease(e, 'primary')}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`;
            }}
          >
            Lihat Proyek
          </button>

          {/* Secondary — Sky Blue */}
          <a
            href="/files/CV_Rizki_Ardiansyah.pdf"
            download="CV_Rizki_Ardiansyah.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: isDark ? `rgba(14,165,233,0.12)` : `rgba(14,165,233,0.10)`,
              border: `1px solid ${sky}66`,
              borderRadius: 8,
              padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)",
              color: sky,
              fontWeight: 600,
              fontSize: "clamp(12px, 3.5vw, 14px)",
              cursor: "pointer",
              fontFamily: colors.sans,
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: `0 4px 0 ${skyDim}44`,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = isDark ? `rgba(14,165,233,0.22)` : `rgba(14,165,233,0.18)`;
              e.currentTarget.style.borderColor = sky;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = isDark ? `rgba(14,165,233,0.12)` : `rgba(14,165,233,0.10)`;
              e.currentTarget.style.borderColor = `${sky}66`;
              e.currentTarget.style.transform = "";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>

          {/* Tertiary — Outline */}
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)",
              color: colors.text,
              fontSize: "clamp(12px, 3.5vw, 14px)",
              cursor: "pointer",
              fontFamily: colors.sans,
              boxShadow: colors.shadow,
              transition: "transform 0.1s, box-shadow 0.1s",
              whiteSpace: "nowrap",
              backdropFilter: "blur(4px)",
            }}
            onMouseDown={(e) => handleButtonPress(e, 'outline')}
            onMouseUp={(e) => handleButtonRelease(e, 'outline')}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = colors.shadow;
            }}
          >
            Hubungi Saya
          </button>
        </div>
      </div>

      <KeyboardStrip />

      <div style={{
        fontFamily: colors.mono,
        fontSize: "clamp(10px, 3vw, 11px)",
        color: colors.muted,
        animation: "blink 2s infinite",
        position: "relative",
        zIndex: 1,
      }}>
        ↓ scroll
      </div>
    </div>
  );
};