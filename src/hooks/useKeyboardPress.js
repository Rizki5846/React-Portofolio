import { useState, useCallback, useEffect } from "react";

export const useKeyboardPress = (validKeys = []) => {
  const [pressed, setPressed] = useState({});
  const [typed, setTyped] = useState("");
  const MAX_LENGTH = 24;

  const pressKey = useCallback((key) => {
    setPressed(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setPressed(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    }, 200);
    setTyped(prev => (prev + key).slice(-MAX_LENGTH));
  }, []);

  const resetTyped = useCallback(() => {
    setTyped("");
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toUpperCase();
      if (validKeys.includes(key)) {
        pressKey(key);
      }
      if (e.key === " ") {
        setTyped(prev => (prev + " ").slice(-MAX_LENGTH));
      }
      if (e.key === "Backspace") {
        setTyped(prev => prev.slice(0, -1));
      }
      if (e.key === "Escape") {
        resetTyped();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pressKey, validKeys, resetTyped]);

  return { pressed, typed, pressKey, setTyped, resetTyped };
};