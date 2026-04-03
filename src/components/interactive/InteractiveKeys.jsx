import { useKeyboardPress } from "../../hooks/useKeyboardPress";
import { C, borderRadius } from "../../constants/theme";

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const ALL_KEYS = KEY_ROWS.flat();

export const InteractiveKeys = () => {
  const { pressed, typed, pressKey, setTyped } = useKeyboardPress(ALL_KEYS);
  const MAX_LENGTH = 24;

  const handleSpacePress = () => {
    setTyped(prev => (prev + " ").slice(-MAX_LENGTH));
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Display Screen */}
      <div style={{
        background: "#0d0d0d", 
        border: `1px solid ${C.border}`,
        borderRadius: borderRadius.lg, 
        padding: "12px 20px", 
        marginBottom: 20,
        fontFamily: C.mono, 
        fontSize: 14, 
        color: C.copper,
        minHeight: 44, 
        display: "flex", 
        alignItems: "center",
        boxShadow: "inset 0 2px 8px #00000088",
        letterSpacing: 2,
      }}>
        <span style={{ color: C.muted, marginRight: 10, fontSize: 11 }}>
          &gt;
        </span>
        {typed || <span style={{ color: "#444", fontSize: 12 }}>ketik sesuatu...</span>}
        <span style={{ 
          animation: "blink 1s infinite", 
          marginLeft: 1, 
          color: C.copper 
        }}>
          ▌
        </span>
      </div>
      
      {/* Keyboard */}
      <div style={{ display: "inline-block" }}>
        {KEY_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} style={{
            display: "flex", 
            gap: 5, 
            justifyContent: "center",
            marginBottom: 5, 
            marginLeft: rowIndex * 12,
          }}>
            {row.map(key => {
              const isPressed = pressed[key];
              return (
                <div 
                  key={key} 
                  onClick={() => pressKey(key)} 
                  style={{
                    width: 38, 
                    height: 38, 
                    borderRadius: borderRadius.md,
                    background: isPressed
                      ? `linear-gradient(180deg, ${C.copperDim}, #1a1a1a)`
                      : "linear-gradient(180deg, #2b2b2b, #202020)",
                    boxShadow: isPressed
                      ? "0 1px 0 #080808, inset 0 2px 4px #00000066"
                      : "0 4px 0 #080808, 0 5px 0 #060606, inset 0 1px 0 #363636",
                    border: `1px solid ${isPressed ? C.copper + "66" : "#303030"}`,
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    cursor: "pointer", 
                    userSelect: "none",
                    transform: isPressed ? "translateY(3px)" : "translateY(0)",
                    transition: "all 0.1s ease",
                  }}>
                  <span style={{ 
                    fontFamily: C.mono, 
                    fontSize: 12, 
                    color: isPressed ? C.copper : C.text, 
                    fontWeight: 600 
                  }}>
                    {key}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Space Bar */}
        <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 5 }}>
          <div 
            onClick={handleSpacePress} 
            style={{
              width: 240, 
              height: 36, 
              borderRadius: borderRadius.md,
              background: "linear-gradient(180deg, #2b2b2b, #202020)",
              boxShadow: "0 4px 0 #080808, 0 5px 0 #060606, inset 0 1px 0 #363636",
              border: `1px solid #303030`,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer", 
              userSelect: "none",
            }}>
            <span style={{ fontFamily: C.mono, fontSize: 10, color: C.muted }}>
              SPACE
            </span>
          </div>
        </div>
      </div>
      
      <p style={{ 
        fontFamily: C.mono, 
        fontSize: 11, 
        color: "#444", 
        marginTop: 14 
      }}>
        klik tombol atau ketik di keyboard fisikmu
      </p>
    </div>
  );
};