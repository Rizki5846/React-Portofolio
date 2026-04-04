import { Reveal } from "../ui/Reveal";
import { useTheme } from "../../context/themeContext";
import { contactInfo } from "../../constants/data";

export const Contact = () => {
  const { colors } = useTheme();

  return (
    <div id="contact" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper, marginBottom: 8 }}>
            // get_in_touch
          </p>
          <h2 style={{ fontSize: "clamp(1.3rem, 5vw, 1.8rem)", fontWeight: 700, margin: "0 0 14px", color: colors.text }}>
            Let's Connect
          </h2>
          <p style={{ 
            fontSize: "clamp(13px, 3.5vw, 14px)", 
            color: colors.muted, 
            lineHeight: 1.8, 
            marginBottom: "clamp(30px, 8vw, 40px)" 
          }}>
            Looking for new opportunities. Feel free to reach out!
          </p>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "clamp(12px, 4vw, 20px)", 
            flexWrap: "wrap", 
            marginBottom: "clamp(30px, 8vw, 40px)" 
          }}>
            {contactInfo.map(contact => (
              <a 
                key={contact.label} 
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", flex: "1 1 auto", minWidth: "min(100%, 120px)" }}
              >
                <div style={{
                  background: colors.card, 
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10, 
                  padding: "clamp(16px, 4vw, 18px) clamp(16px, 4vw, 24px)", 
                  minWidth: "min(100%, 120px)",
                  boxShadow: colors.shadow, 
                  transition: "transform 0.1s, box-shadow 0.1s",
                  cursor: "pointer",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translateY(3px)";
                  e.currentTarget.style.boxShadow = "0 2px 0 #080808";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = colors.shadow;
                }}>
                  <div style={{ fontSize: "clamp(20px, 6vw, 22px)", marginBottom: 8 }}>{contact.ic}</div>
                  <div style={{ fontFamily: colors.mono, fontSize: "clamp(9px, 2.5vw, 10px)", color: colors.copper, marginBottom: 4 }}>
                    {contact.label}
                  </div>
                  <div style={{ fontSize: "clamp(10px, 3vw, 11px)", color: colors.muted, wordBreak: "break-all" }}>{contact.val}</div>
                </div>
              </a>
            ))}
          </div>
          
          <a 
            href="mailto:rizki@email.com" 
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${colors.copper}, ${colors.copperLight})`,
              borderRadius: 8, 
              padding: "clamp(12px, 3.5vw, 13px) clamp(24px, 6vw, 36px)",
              color: "#fff", 
              fontWeight: 600, 
              fontSize: "clamp(13px, 3.5vw, 14px)", 
              textDecoration: "none",
              boxShadow: `0 5px 0 ${colors.copperDim}, 0 8px 24px ${colors.copper}33`,
              fontFamily: colors.sans,
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(3px)";
              e.currentTarget.style.boxShadow = `0 2px 0 ${colors.copperDim}, 0 8px 24px ${colors.copper}33`;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 5px 0 ${colors.copperDim}, 0 8px 24px ${colors.copper}33`;
            }}
          >
            Send Message ✉️
          </a>
        </Reveal>
      </div>
    </div>
  );
};