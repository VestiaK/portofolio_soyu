"use client";

import { useEffect, useState } from "react";

interface TypewriterDialogProps {
  texts: string[];
  typingSpeed?: number;
  onComplete?: () => void;
}

export default function TypewriterDialog({
  texts,
  typingSpeed = 50,
  onComplete,
}: TypewriterDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = texts[currentIndex];
    setDisplayedText(fullText.charAt(0));
    setIsTyping(true);
    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(i));
      i++;

      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentIndex, texts, typingSpeed]);

  const handleClick = () => {
    if (isTyping) return;

    if (currentIndex < texts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer text-stone-800 p-4 rounded-xl w-full max-w-xl mx-auto min-h-[100px] flex justify-start items-center"
    >
      <p className="text-lg typingtext">{displayedText}</p>
    </div>
  );
}
