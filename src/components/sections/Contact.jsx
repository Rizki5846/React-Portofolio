import { Reveal } from "../ui/Reveal";
import { C, spacing, borderRadius } from "../../constants/theme";
import { contactInfo } from "../../constants/data";

export const Contact = () => {
  return (
    <div id="contact" style={{ padding: `80px ${spacing.xl}px` }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontFamily: C.mono, fontSize: 11, color: C.copper, marginBottom: spacing.sm }}>
            // send_message()
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: `0 0 ${spacing.md}px` }}>
            Mari Terhubung
          </h2>
          <p style={{ 
            fontSize: 14, 
            color: C.muted, 
            lineHeight: 1.8, 
            marginBottom: spacing.xl 
          }}>
            Sedang mencari kesempatan kerja pertama. Punya posisi yang cocok atau ingin berkenalan? Jangan ragu!
          </p>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: spacing.md, 
            flexWrap: "wrap", 
            marginBottom: spacing.xl 
          }}>
            {contactInfo.map(contact => (
              <a 
                key={contact.label} 
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: C.card, 
                  border: `1px solid ${C.border}`,
                  borderRadius: borderRadius.lg, 
                  padding: "18px 24px", 
                  minWidth: 140,
                  boxShadow: "0 5px 0 #080808", 
                  transition: "transform 0.1s, box-shadow 0.1s",
                  cursor: "pointer",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translateY(3px)";
                  e.currentTarget.style.boxShadow = "0 2px 0 #080808";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 5px 0 #080808";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 5px 0 #080808";
                }}>
                  <div style={{ fontSize: 22, marginBottom: spacing.sm }}>{contact.ic}</div>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: C.copper, marginBottom: spacing.xs }}>
                    {contact.label}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>{contact.val}</div>
                </div>
              </a>
            ))}
          </div>
          
          <a 
            href="mailto:rizki@email.com" 
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${C.copper}, ${C.copperLight})`,
              borderRadius: borderRadius.lg, 
              padding: "13px 36px",
              color: "#fff", 
              fontWeight: 600, 
              fontSize: 14, 
              textDecoration: "none",
              boxShadow: `0 5px 0 ${C.copperDim}, 0 8px 24px ${C.copper}33`,
              fontFamily: C.sans,
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(3px)";
              e.currentTarget.style.boxShadow = `0 2px 0 ${C.copperDim}, 0 8px 24px ${C.copper}33`;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 5px 0 ${C.copperDim}, 0 8px 24px ${C.copper}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 5px 0 ${C.copperDim}, 0 8px 24px ${C.copper}33`;
            }}
          >
            Kirim Pesan ✉️
          </a>
        </Reveal>
      </div>
    </div>
  );
};