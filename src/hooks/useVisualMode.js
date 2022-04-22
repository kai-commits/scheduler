import {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      setHistory([initialMode]);
    } else {
      setHistory([...history, newMode]);
    }
  }

  const back = () => {
    if (history.length === 1) return setMode(history[0]);
    history.pop();
    setHistory([...history]);
    setMode(history.pop());
  }

  return { mode, transition, back };
}