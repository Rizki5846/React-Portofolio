import { useState, useEffect } from "react";

export const useTypeWriter = (text, speed = 60) => {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setIsComplete(false);
    
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, ++i));
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);
      }
    }, speed);

    const cursorInterval = setInterval(() => setCursor(v => !v), 530);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, [text, speed]);

  return { displayed, cursor, isComplete };
};