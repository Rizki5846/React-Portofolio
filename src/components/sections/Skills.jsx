import { Reveal } from "../ui/Reveal";
import { SkillBar } from "../ui/SkillBar";
import { useTheme } from "../../context/themeContext";
import { skills } from "../../constants/data";

export const Skills = () => {
  const { colors } = useTheme();

  const categoryIcons = {
    "Web Development": "🌐",
    "Web Development & IoT Dev": "🌐",
    "IoT": "📡",
    "IT Support": "🔧",
    "Mobile Dev": "📱",
    "DevOps": "⚙️",
  };

  return (
    <div id="skills" style={{ padding: "80px 32px", background: colors.surface }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper, marginBottom: 8 }}>
            // skills.map(s =&gt; s.level)
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 40px", color: colors.text }}>
            Keahlian
          </h2>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: 40 
          }}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} style={{
                background: colors.card, 
                border: `1px solid ${colors.border}`,
                borderRadius: 12, 
                padding: 24,
                boxShadow: colors.shadow,
              }}>
                <div style={{ 
                  display: "flex", 
                  gap: 10, 
                  alignItems: "center", 
                  marginBottom: 20, 
                  paddingBottom: 14, 
                  borderBottom: `1px solid ${colors.border}` 
                }}>
                  <span style={{ fontSize: 18 }}>{categoryIcons[category] || "📚"}</span>
                  <span style={{ fontFamily: colors.mono, fontSize: 12, color: colors.text, fontWeight: 600 }}>
                    {category}
                  </span>
                </div>
                {items.map(skill => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};