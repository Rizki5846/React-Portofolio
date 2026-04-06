import { Reveal } from "../ui/Reveal";
import { InteractiveKeys } from "../interactive/InteractiveKeys";
import { spacing } from "../../constants/theme";
import { useTheme } from "../../context/themeContext";

export const InteractiveSection = () => {
  const { colors, theme } = useTheme();
  
  return (
    <div style={{ 
      padding: `80px ${spacing.xl}px`, 
      background: theme === 'dark' ? "#0c0c0c" : colors.surface,
      borderTop: `1px solid ${colors.border}`,
      borderBottom: `1px solid ${colors.border}`,
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <p style={{ 
            fontFamily: colors.mono, 
            fontSize: 11, 
            color: colors.copper, 
            marginBottom: spacing.sm, 
            textAlign: "center" 
          }}>
            // keyboard.addEventListener('keydown')
          </p>
          <h2 style={{ 
            fontSize: 22, 
            fontWeight: 700, 
            margin: `0 0 ${spacing.sm}px`, 
            textAlign: "center",
            color: colors.text,
          }}>
            Try It
          </h2>
          <p style={{ 
            fontSize: 13, 
            color: colors.muted, 
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