import { useState } from "react";
import { C, spacing, borderRadius } from "../../constants/theme";

export const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, tech, description, type, emoji, color, image_url } = project;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      style={{
        background: isHovered ? "#222" : C.card,
        border: `1px solid ${isHovered ? C.copper + "55" : C.border}`,
        borderRadius: borderRadius.xl,
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered 
          ? `0 12px 40px ${C.copper}18, 0 4px 0 #080808` 
          : "0 4px 0 #080808",
        transition: "all 0.3s ease", 
        cursor: "default", 
        overflow: "hidden",
      }}
    >
      {/* Thumbnail Section */}
      <div style={{
        height: 200, 
        position: "relative", 
        overflow: "hidden",
        background: `linear-gradient(135deg, #181818, #202020)`,
      }}>
        {image_url ? (
          <img 
            src={image_url} 
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <>
            {/* Grid pattern untuk placeholder */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
              <defs>
                <pattern id={`g-${title.replace(/\s/g, "")}`} width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#888" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#g-${title.replace(/\s/g, "")})`}/>
            </svg>
          </>
        )}
        
        {/* Glow Effect */}
        <div style={{
          position: "absolute", 
          inset: 0,
          background: `radial-gradient(ellipse at 50% 60%, ${color}22, transparent 70%)`,
          transition: "opacity 0.3s",
          opacity: isHovered ? 1 : 0.5,
        }} />
        
        {/* Copper Top Bar */}
        <div style={{
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 3,
          background: isHovered 
            ? `linear-gradient(90deg, ${C.copper}, ${C.copperLight}, ${C.copper})` 
            : C.border,
          transition: "background 0.3s",
        }} />
        
        {/* Icon - tampilkan hanya jika tidak ada gambar */}
        {!image_url && (
          <div style={{
            position: "absolute", 
            inset: 0,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            flexDirection: "column", 
            gap: spacing.sm,
          }}>
            <div style={{
              width: 70, 
              height: 70, 
              borderRadius: 16,
              background: `linear-gradient(135deg, ${color}22, ${color}44)`,
              border: `1px solid ${color}55`,
              boxShadow: `0 4px 0 #080808, 0 0 24px ${color}33`,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: 32,
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}>
              {emoji}
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <span style={{
          position: "absolute", 
          top: 12, 
          right: 12,
          fontFamily: C.mono, 
          fontSize: 10, 
          color: C.copper,
          border: `1px solid ${C.copper}44`, 
          borderRadius: borderRadius.sm, 
          padding: "4px 10px",
          background: "#0e0e0ecc",
          backdropFilter: "blur(4px)",
          zIndex: 2,
          fontWeight: 500,
        }}>
          {type}
        </span>
      </div>

      {/* Content Section */}
      <div style={{ padding: `20px 20px 24px` }}>
        <h3 style={{ 
          fontFamily: C.sans, 
          fontSize: 16, 
          fontWeight: 600, 
          color: C.text, 
          margin: `0 0 ${spacing.sm}px` 
        }}>
          {title}
        </h3>
        <p style={{ 
          fontFamily: C.sans, 
          fontSize: 13, 
          color: C.muted, 
          lineHeight: 1.6, 
          margin: `0 0 ${spacing.md}px` 
        }}>
          {description}
        </p>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tech.map(techItem => (
            <span key={techItem} style={{
              fontFamily: C.mono, 
              fontSize: 10, 
              color: "#999",
              background: "#1a1a1a", 
              border: `1px solid ${C.border}`,
              borderRadius: borderRadius.sm, 
              padding: "4px 10px", 
              boxShadow: "0 2px 0 #080808",
            }}>
              {techItem}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};