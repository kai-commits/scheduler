import {useState} from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => {
        return [...prev.slice(0, history.length - 1), newMode]
      });
    } else {
      setHistory([...history, newMode]);
    }
  }

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        return [...prev.slice(0, history.length - 1)];
      });
    }
  }

  return { mode: history[history.length - 1], transition, back };
}