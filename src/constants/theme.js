export const C = {
  bg: "#0e0e0e",
  surface: "#161616",
  card: "#1c1c1c",
  border: "#2a2a2a",
  copper: "#c87941",
  copperLight: "#e8935a",
  copperDim: "#8a5229",
  text: "#e8e8e8",
  muted: "#777777",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'Outfit', system-ui, sans-serif",
};

export const buttonStyles = {
  primary: {
    background: `linear-gradient(135deg, ${C.copper}, ${C.copperLight})`,
    boxShadow: `0 4px 0 ${C.copperDim}, 0 6px 20px ${C.copper}33`,
  },
  secondary: {
    background: "none",
    border: `1px solid ${C.border}`,
    boxShadow: "0 4px 0 #080808",
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  xxl: 16,
};