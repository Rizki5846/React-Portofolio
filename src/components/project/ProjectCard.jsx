import { useState } from "react";
import { useTheme } from "../../context/themeContext";

// Pastikan ini adalah export default, bukan export const
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colors } = useTheme();
  const { title, tech, description, type, emoji, color, image_url } = project;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      style={{
        background: isHovered ? colors.surface : colors.card,
        border: `1px solid ${isHovered ? colors.copper + "55" : colors.border}`,
        borderRadius: 16,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered ? colors.shadowHover : colors.shadow,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        overflow: "hidden",
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Badge Index */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        background: colors.copper,
        color: '#fff',
        width: 28,
        height: 28,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        zIndex: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        {index + 1}
      </div>

      {/* Thumbnail Section - Fixed Height */}
      <div style={{
        height: 200, 
        position: "relative", 
        overflow: "hidden",
        background: `linear-gradient(135deg, ${color}22, ${colors.bg})`,
        flexShrink: 0,
      }}>
        {image_url ? (
          <img 
            src={image_url} 
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${color}33, ${color}66)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}>
              {emoji}
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div style={{
          position: "absolute", 
          inset: 0,
          background: `linear-gradient(to top, ${colors.card} 0%, transparent 50%)`,
          opacity: isHovered ? 0.8 : 0.6,
          transition: "opacity 0.3s",
        }} />
        
        {/* Type Badge */}
        <span style={{
          position: "absolute", 
          bottom: 12, 
          right: 12,
          fontFamily: colors.mono, 
          fontSize: 10, 
          color: colors.copper,
          border: `1px solid ${colors.copper}44`, 
          borderRadius: 20, 
          padding: "4px 12px",
          background: `${colors.bg}cc`,
          backdropFilter: "blur(4px)",
          zIndex: 2,
          fontWeight: 500,
        }}>
          {type}
        </span>
      </div>

      {/* Content Section - Flexible Height dengan min/max */}
      <div style={{ 
        padding: "20px", 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Title - Fixed height area */}
        <div style={{ minHeight: '65px' }}>
          <h3 style={{ 
            fontFamily: colors.sans, 
            fontSize: 18, 
            fontWeight: 600, 
            color: colors.text, 
            margin: "0 0 8px",
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {title}
          </h3>
        </div>
        
        {/* Description - Fixed height area */}
        <div style={{ minHeight: '80px', marginBottom: 16 }}>
          <p style={{ 
            fontFamily: colors.sans, 
            fontSize: 13, 
            color: colors.muted, 
            lineHeight: 1.6, 
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {description}
          </p>
        </div>
        
        {/* Tech Badges - Auto height dengan min */}
        <div style={{ 
          minHeight: '60px',
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tech && tech.slice(0, 4).map((techItem, i) => (
              <span key={i} style={{
                fontFamily: colors.mono, 
                fontSize: 10, 
                color: colors.muted,
                background: colors.surface, 
                border: `1px solid ${colors.border}`,
                borderRadius: 6, 
                padding: "4px 10px", 
              }}>
                {techItem}
              </span>
            ))}
            {tech && tech.length > 4 && (
              <span style={{
                fontFamily: colors.mono, 
                fontSize: 10, 
                color: colors.copper,
                background: colors.surface, 
                border: `1px solid ${colors.border}`,
                borderRadius: 6, 
                padding: "4px 10px", 
              }}>
                +{tech.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Link - Fixed at bottom */}
        <div style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <span style={{
            color: colors.copper,
            fontSize: 12,
            fontFamily: colors.mono,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            transition: 'gap 0.2s',
          }}>
            Click to view details
            <span style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s' }}>→</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; // <-- Pastikan ini ada