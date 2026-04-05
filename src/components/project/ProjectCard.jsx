import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../context/themeContext";

/* ─────────────────────────────────────────────────────────────
   PREMIUM PROJECT DETAIL MODAL
   Uses React createPortal → rendered directly into document.body
   → always perfectly centered, always above everything
───────────────────────────────────────────────────────────── */
const ProjectDetailModal = ({ project, onClose, colors }) => {
  const {
    title, tech, description, type,
    emoji = "🚀", color = "#c87941",
    image_url, link, created_at,
  } = project;

  const [imgError, setImgError] = useState(false);
  const [entered, setEntered] = useState(false);

  /* enter animation */
  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(t);
      document.body.style.overflow = "";
    };
  }, []);

  /* exit with animation */
  const handleClose = () => {
    setEntered(false);
    setTimeout(onClose, 320);
  };

  /* ESC to close */
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const content = (
    <>
      <style>{`
        @keyframes _bgIn  { from{opacity:0} to{opacity:1} }
        @keyframes _bgOut { from{opacity:1} to{opacity:0} }
        @keyframes _mdIn  { from{opacity:0;transform:scale(0.94) translateY(28px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes _mdOut { from{opacity:1;transform:scale(1) translateY(0)} to{opacity:0;transform:scale(0.96) translateY(16px)} }
        ._pm-scroll::-webkit-scrollbar{width:4px}
        ._pm-scroll::-webkit-scrollbar-thumb{background:${color}44;border-radius:99px}
        ._pm-scroll::-webkit-scrollbar-track{background:transparent}
        ._pm-close-btn:hover{background:rgba(255,255,255,0.12)!important}
        ._pm-visit:hover{filter:brightness(1.15);transform:translateY(-2px);box-shadow:0 12px 36px ${color}55!important}
        ._pm-dismiss:hover{border-color:rgba(255,255,255,0.25)!important;color:#ccc!important}
      `}</style>

      {/* ── Full-screen backdrop ── */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "rgba(2, 2, 6, 0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(16px, 4vw, 24px)",
          animation: `${entered ? "_bgIn" : "_bgOut"} 0.32s ease forwards`,
        }}
      >
        {/* ── Modal container ── */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="_pm-scroll"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 780,
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: 28,
            background: `linear-gradient(170deg, #13131a 0%, #0d0d12 60%, #0b0b10 100%)`,
            border: `1px solid ${color}28`,
            boxShadow: `
              0 0 0 1px ${color}15,
              0 40px 100px rgba(0,0,0,0.75),
              0 0 80px ${color}12,
              inset 0 1px 0 rgba(255,255,255,0.05)
            `,
            animation: `${entered ? "_mdIn" : "_mdOut"} 0.34s cubic-bezier(0.34,1.15,0.64,1) forwards`,
          }}
        >
          {/* ══ HERO ══ */}
          <div style={{
            height: "clamp(220px, 32vh, 320px)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "28px 28px 0 0",
            flexShrink: 0,
            background: `
              radial-gradient(ellipse at 25% 60%, ${color}2a 0%, transparent 65%),
              radial-gradient(ellipse at 75% 20%, ${color}18 0%, transparent 55%),
              linear-gradient(160deg, #16161f 0%, #0d0d14 100%)
            `,
          }}>
            {/* animated glow orbs */}
            <div style={{
              position: "absolute",
              width: 300, height: 300,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
              top: "-80px", left: "-60px",
              animation: "none",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              width: 200, height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}16 0%, transparent 70%)`,
              bottom: 0, right: "10%",
              pointerEvents: "none",
            }} />

            {/* image or emoji */}
            {image_url && !imgError ? (
              <img
                src={image_url}
                alt={title}
                onError={() => setImgError(true)}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  opacity: 0.7,
                  mixBlendMode: "luminosity",
                }}
              />
            ) : (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {/* glow ring */}
                  <div style={{
                    position: "absolute",
                    width: 180, height: 180,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${color}28 0%, transparent 70%)`,
                  }} />
                  {/* icon box */}
                  <div style={{
                    width: 120, height: 120,
                    borderRadius: 32,
                    background: `linear-gradient(145deg, ${color}30, ${color}14)`,
                    border: `1px solid ${color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                    boxShadow: `0 8px 48px ${color}36, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    position: "relative",
                    zIndex: 1,
                  }}>{emoji}</div>
                </div>
              </div>
            )}

            {/* bottom fade */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 25%, #0d0d12 100%)",
              pointerEvents: "none",
            }} />

            {/* top-right close */}
            <button
              onClick={handleClose}
              className="_pm-close-btn"
              style={{
                position: "absolute", top: 18, right: 18, zIndex: 10,
                width: 40, height: 40,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#999",
                fontSize: 17,
                lineHeight: 1,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.18s",
              }}
            >✕</button>

            {/* top-left type pill */}
            <div style={{
              position: "absolute", top: 18, left: 18, zIndex: 10,
              padding: "5px 14px",
              borderRadius: 99,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: color,
              border: `1px solid ${color}50`,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(10px)",
              fontFamily: "'JetBrains Mono', monospace",
            }}>{type}</div>

            {/* title overlay */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              padding: "0 32px 24px",
            }}>
              <h2 style={{
                margin: 0,
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#f0f0f6",
                textShadow: `0 2px 20px rgba(0,0,0,0.6), 0 0 40px ${color}20`,
                lineHeight: 1.2,
              }}>
                {emoji} {title}
              </h2>
            </div>

            {/* colored accent line at bottom */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 32, right: 32,
              height: 2,
              background: `linear-gradient(90deg, ${color}80, ${color}00)`,
              borderRadius: 1,
            }} />
          </div>

          {/* ══ BODY ══ */}
          <div style={{ padding: "clamp(24px, 4vw, 36px)" }}>

            {/* description */}
            <p style={{
              margin: "0 0 32px",
              fontSize: 15,
              lineHeight: 1.9,
              color: "#8a8aa0",
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: "0.01em",
            }}>{description}</p>

            {/* section divider */}
            <div style={{
              height: 1,
              background: `linear-gradient(90deg, ${color}50 0%, rgba(255,255,255,0.04) 100%)`,
              marginBottom: 28,
            }} />

            {/* tech stack */}
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}>
                <div style={{
                  width: 20, height: 2,
                  background: `linear-gradient(90deg, ${color}, ${color}00)`,
                  borderRadius: 1,
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: color,
                }}>Tech Stack</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tech && tech.map((t, i) => (
                  <span key={i} style={{
                    padding: "7px 16px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#c8c8d8",
                    background: `${color}12`,
                    border: `1px solid ${color}35`,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.02em",
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* date */}
            {created_at && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 32,
              }}>
                <div style={{
                  width: 6, height: 6,
                  borderRadius: "50%",
                  background: color,
                  opacity: 0.6,
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#3a3a4a",
                  letterSpacing: "0.04em",
                }}>
                  Added{" "}
                  {new Date(created_at).toLocaleDateString("id-ID", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </span>
              </div>
            )}

            {/* ── ACTIONS ── */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="_pm-visit"
                  style={{
                    flex: 1,
                    minWidth: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "15px 28px",
                    borderRadius: 16,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    textDecoration: "none",
                    background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
                    boxShadow: `0 6px 28px ${color}40`,
                    transition: "transform 0.2s, filter 0.2s, box-shadow 0.2s",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span>🔗</span> Visit Project
                </a>
              )}
              <button
                onClick={handleClose}
                className="_pm-dismiss"
                style={{
                  flex: link ? "0 0 auto" : 1,
                  minWidth: 120,
                  padding: "15px 28px",
                  borderRadius: 16,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#555",
                  transition: "border-color 0.2s, color 0.2s",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
};

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { colors } = useTheme();

  const {
    title, tech, description, type,
    emoji = "🚀", color = "#c87941",
    image_url, link,
  } = project;

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetail(true)}
        style={{
          background: isHovered ? colors.surface : colors.card,
          border: `1px solid ${isHovered ? color + "55" : colors.border}`,
          borderRadius: 16,
          transform: isHovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${color}22, 0 0 28px ${color}16`
            : colors.shadow,
          transition: "all 0.32s cubic-bezier(0.4,0,0.2,1)",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* number badge */}
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 2,
          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
          color: "#fff",
          width: 28, height: 28,
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700,
          boxShadow: `0 2px 10px ${color}55`,
        }}>{index + 1}</div>

        {/* live badge */}
        {link && (
          <div style={{
            position: "absolute", top: 12, right: 12, zIndex: 2,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            border: `1px solid ${color}44`,
            borderRadius: 99,
            padding: "4px 10px",
            fontSize: 10,
            color: color,
            fontFamily: "'JetBrains Mono', monospace",
            display: "flex", alignItems: "center", gap: 4,
          }}>🔗 Live</div>
        )}

        {/* thumbnail */}
        <div style={{
          height: 200, position: "relative", overflow: "hidden",
          background: `linear-gradient(135deg, ${color}22, ${colors.bg})`,
          flexShrink: 0,
        }}>
          {image_url ? (
            <img src={image_url} alt={title} style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }} />
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: 20,
                background: `linear-gradient(135deg, ${color}33, ${color}66)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 46,
                transition: "transform 0.3s",
                transform: isHovered ? "scale(1.12) rotate(5deg)" : "scale(1)",
              }}>{emoji}</div>
            </div>
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, ${colors.card} 0%, transparent 55%)`,
            opacity: isHovered ? 0.95 : 0.65,
            transition: "opacity 0.3s",
          }} />
          <span style={{
            position: "absolute", bottom: 10, right: 12, zIndex: 2,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, fontWeight: 600, color: color,
            border: `1px solid ${color}44`, borderRadius: 99,
            padding: "3px 10px",
            background: `${colors.bg}cc`, backdropFilter: "blur(4px)",
          }}>{type}</span>
        </div>

        {/* card content */}
        <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ minHeight: 58, marginBottom: 8 }}>
            <h3 style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 17, fontWeight: 700, color: colors.text,
              margin: 0, lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{title}</h3>
          </div>

          <div style={{ minHeight: 72, marginBottom: 14 }}>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13, color: colors.muted, lineHeight: 1.65, margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{description}</p>
          </div>

          <div style={{ minHeight: 52, marginBottom: 14 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {tech && tech.slice(0, 4).map((t, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: isHovered ? colors.text : colors.muted,
                  background: colors.surface,
                  border: `1px solid ${isHovered ? color + "44" : colors.border}`,
                  borderRadius: 6, padding: "4px 10px",
                  transition: "all 0.2s",
                }}>{t}</span>
              ))}
              {tech && tech.length > 4 && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: color,
                  background: `${color}12`,
                  border: `1px solid ${color}30`,
                  borderRadius: 6, padding: "4px 10px",
                }}>+{tech.length - 4} more</span>
              )}
            </div>
          </div>

          {/* footer */}
          <div style={{
            marginTop: "auto", paddingTop: 12,
            borderTop: `1px solid ${isHovered ? color + "44" : colors.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            transition: "border-color 0.3s",
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: isHovered ? color : colors.muted,
              display: "flex", alignItems: "center", gap: 4,
              transition: "color 0.25s",
            }}>
              View details
              <span style={{
                display: "inline-block",
                transform: isHovered ? "translateX(5px)" : "translateX(0)",
                transition: "transform 0.25s",
              }}>→</span>
            </span>

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "5px 12px", borderRadius: 8,
                  background: isHovered ? `${color}22` : "transparent",
                  border: `1px solid ${isHovered ? color + "80" : colors.border}`,
                  color: isHovered ? color : colors.muted,
                  fontSize: 11, fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.2s",
                }}
              >🔗 Visit</a>
            )}
          </div>
        </div>
      </div>

      {/* modal via portal */}
      {showDetail && (
        <ProjectDetailModal
          project={project}
          onClose={() => setShowDetail(false)}
          colors={colors}
        />
      )}
    </>
  );
};

export default ProjectCard;