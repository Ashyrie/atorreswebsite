import { useState, useEffect, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const GLITCH_CHARS = "01ABCDEF!@#$%^&*()_+-=[]{}|;':\",./<>?~`";

export default function GlitchText({ text, className = "", speed = 30 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const textRef = useRef(text);
  textRef.current = text;

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);

    let iterations = 0;
    const targetText = textRef.current;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // If the iteration progress has passed this character, reveal the true letter
            if (index < iterations) {
              return targetText[index];
            }
            // Otherwise, show a random glitch character
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      ) as any;

      if (iterations >= targetText.length) {
        setIsGlitching(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      // Progressively reveal the letters (slower or faster based on speed)
      iterations += 1 / 3; 
    }, speed) as any;
  };

  useEffect(() => {
    triggerGlitch();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={triggerGlitch}
      className={`cursor-default select-none transition-all duration-300 ${className}`}
    >
      {displayText}
    </span>
  );
}
