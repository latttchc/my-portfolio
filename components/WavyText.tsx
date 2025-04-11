"use client";

import { motion } from "framer-motion";

export default function WavyText({ text }: { text: string }) {
    return (
        <h1 className="text-4xl font-bold text-white flex flex-wrap justify-center">
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.07, // ← 文字ごとにずらして波っぽく
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </h1>
    );
}
