// ProgressBar.tsx

import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import './ProgressBar.css';

interface ProgressBarProps {
  title: string;
  value: number;
  max: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ title, value, max }) => {
  const [progress, setProgress] = useState(0);
  const props = useSpring({ value: progress, from: { value: 0 } });

  useEffect(() => {
    setTimeout(() => setProgress(value), 1000);
  }, [value]);

  return (
    <div className="progress-container">
      <div className="progress-title">{title}</div>
      <div className="progress-bar">
        <animated.div className="progress-fill" style={{ width: props.value.interpolate(v => `${(v / max) * 100}%`) }} />
        <div className="progress-value">{value}/{max}</div> {/* Move this line inside .progress-bar */}
      </div>
    </div>
  );
};



  