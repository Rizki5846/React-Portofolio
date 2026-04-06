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
    <div style={{ textAlign: "center", width: "100%", overflowX: "hidden" }}>
      <style>
        {`
          .interactive-key-row {
            display: flex;
            gap: 5px;
            justify-content: center;
            margin-bottom: 5px;
          }
          .interactive-key {
            width: 38px;
            height: 38px;
          }
          .interactive-space {
            width: 240px;
            height: 36px;
          }
          .offset-0 { margin-left: 0; }
          .offset-1 { margin-left: 12px; }
          .offset-2 { margin-left: 24px; }
          
          @media (max-width: 480px) {
            .interactive-key-row { gap: 3px; }
            .interactive-key { 
              width: clamp(26px, 8vw, 38px); 
              height: clamp(32px, 10vw, 38px); 
            }
            .interactive-key span { 
              font-size: clamp(9px, 3.5vw, 12px) !important; 
            }
            .interactive-space { 
              width: clamp(160px, 60vw, 240px); 
            }
            .offset-1 { margin-left: clamp(6px, 4vw, 12px); }
            .offset-2 { margin-left: clamp(12px, 8vw, 24px); }
            .interactive-display {
              font-size: 12px !important;
              padding: 10px 14px !important;
              letter-spacing: 1px !important;
            }
          }
        `}
      </style>

      {/* Display Screen */}
      <div className="interactive-display" style={{
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
        maxWidth: "100%",
        overflow: "hidden"
      }}>
        <span style={{ color: C.muted, marginRight: 8, fontSize: 11, flexShrink: 0 }}>
          &gt;
        </span>
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {typed || <span style={{ color: "#444", fontSize: 12 }}>ketik sesuatu...</span>}
        </span>
        <span style={{ 
          animation: "blink 1s infinite", 
          marginLeft: 1, 
          color: C.copper,
          flexShrink: 0
        }}>
          ▌
        </span>
      </div>
      
      {/* Keyboard */}
      <div style={{ display: "inline-block", maxWidth: "100%" }}>
        {KEY_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className={`interactive-key-row offset-${rowIndex}`}>
            {row.map(key => {
              const isPressed = pressed[key];
              return (
                <div 
                  key={key} 
                  className="interactive-key"
                  onClick={() => pressKey(key)} 
                  style={{
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
        <div className="interactive-key-row" style={{ marginTop: 5 }}>
          <div 
            className="interactive-space"
            onClick={handleSpacePress} 
            style={{
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