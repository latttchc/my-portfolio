"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import StarBackground from "@/components/StarBackground";
import WavyText from "@/components/WavyText";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    "ようこそ！僕の洗練されたポートフォリオへ! \n Menuからページを選んでください。",
    "About meで自分のことを紹介しています!!",
    "Projectsでは過去に作成したものが見れます!!",
    "Contactでお問い合わせください",
  ];

  const currentText = texts[currentTextIndex];

  useEffect(() => {
    const DELAY_MS = 1000;

    const startDelay = setTimeout(() => {
      setStartTyping(true);
    }, DELAY_MS);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (startTyping && typedText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100); // タイピング速度

      return () => clearTimeout(timeout);
    }
  }, [typedText, startTyping, currentText]);

  const handleButtonClick = () => {
    const nextIndex = (currentTextIndex + 1) % texts.length;
    setCurrentTextIndex(nextIndex);
    setTypedText("");
    setStartTyping(false);

    setTimeout(() => {
      setStartTyping(true);
    }, 200);
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <StarBackground />
      {/* ようこそメッセージ */}
      {
        <motion.div
          className="absolute top-1/16 z-20 text-3xl font-bold text-white drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {typedText.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </motion.div>
      }
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <Image
            src="/image/my_portfolio.png"
            alt="プロフィール画像"
            width={300}
            height={300}
            className="rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
          />
          <WavyText text="Yuuk1's Portfolio" />
          <Button
            className="px-6 py-3 text-lg font-semibold text-black bg-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            variant="default"
            onClick={handleButtonClick}
          >
            PUSH ME!!🙄
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
