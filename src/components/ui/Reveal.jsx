import { useScrollReveal } from "../../hooks/UseScrollReveal";

export const Reveal = ({ children, style = {}, threshold = 0.1, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal(threshold);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};