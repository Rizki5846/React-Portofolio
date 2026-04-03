import { Keycap } from "../ui/Keycap";
import { navItems } from "../../constants/data";

export const KeyboardNav = ({ active, scrollTo }) => {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
      {navItems.map(item => (
        <Keycap
          key={item.id}
          label={item.label}
          active={active === item.id}
          onClick={() => scrollTo(item.id)}
        />
      ))}
    </div>
  );
};