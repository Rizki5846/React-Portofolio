import { useTypeWriter } from "../../hooks/useTypeWriter";
import { C } from "../../constants/theme";

export const TypeWriter = ({ text, speed = 60, color, onComplete }) => {
  const { displayed, cursor, isComplete } = useTypeWriter(text, speed);

  // Trigger onComplete callback when typing is complete
  if (isComplete && onComplete) {
    onComplete();
  }

  return (
    <span style={{ fontFamily: C.mono, color: color || C.copper }}>
      {displayed}
      <span style={{ opacity: cursor ? 1 : 0 }}>▌</span>
    </span>
  );
};