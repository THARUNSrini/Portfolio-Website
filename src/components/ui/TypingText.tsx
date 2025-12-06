"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
}

export default function TypingText({
    text,
    className = "",
    speed = 50,
    delay = 500
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            let index = 0;
            const intervalId = setInterval(() => {
                if (index < text.length) {
                    setDisplayedText(text.slice(0, index + 1));
                    index++;
                } else {
                    setIsComplete(true);
                    clearInterval(intervalId);
                }
            }, speed);

            return () => clearInterval(intervalId);
        }, delay);

        return () => clearTimeout(timer);
    }, [text, speed, delay]);

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-primary"
                >
                    |
                </motion.span>
            )}
        </span>
    );
}
