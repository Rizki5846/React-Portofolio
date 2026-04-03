import { Reveal } from "../ui/Reveal";
import { InteractiveKeys } from "../interactive/InteractiveKeys";
import { C, spacing } from "../../constants/theme";

export const InteractiveSection = () => {
  return (
    <div style={{ padding: `80px ${spacing.xl}px`, background: "#0c0c0c" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <p style={{ 
            fontFamily: C.mono, 
            fontSize: 11, 
            color: C.copper, 
            marginBottom: spacing.sm, 
            textAlign: "center" 
          }}>
            // keyboard.addEventListener('keydown')
          </p>
          <h2 style={{ 
            fontSize: 22, 
            fontWeight: 700, 
            margin: `0 0 ${spacing.sm}px`, 
            textAlign: "center" 
          }}>
            Try It
          </h2>
          <p style={{ 
            fontSize: 13, 
            color: C.muted, 
            textAlign: "center", 
            marginBottom: spacing.xl 
          }}>
            Mini mechanical keyboard interaktif — klik atau ketik!
          </p>
          <InteractiveKeys />
        </Reveal>
      </div>
    </div>
  );
};