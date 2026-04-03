import { C } from "../../constants/theme";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      borderTop: `1px solid ${C.border}`, 
      padding: "24px 32px", 
      textAlign: "center" 
    }}>
      <span style={{ fontFamily: C.mono, fontSize: 11, color: "#444" }}>
        © {currentYear} &lt;Muhamad Rizki Ardiansyah /&gt; — crafted with React & ☕
      </span>
    </footer>
  );
};