"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WORDS = [
    "print('Hello')",
    "import numpy as np",
    "def main():",
    "return True",
    "class User:",
    "for i in range(10):",
    "if x > 0:",
    "while True:",
    "pip install fastapi",
    "git commit -m 'fix'",
];

export default function Game() {
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [input, setInput] = useState("");
    const [targetText, setTargetText] = useState("");


    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(30);
        setInput("");
        setTargetText(WORDS[Math.floor(Math.random() * WORDS.length)]);
    };

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if  (value === targetText) {
            setScore(score + 10);
            setInput("");

            const nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];
            setTargetText(nextWord);
        }
    };
    useEffect(() => {
        if (isPlaying && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
        }
    }, [isPlaying, timeLeft]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">

            <div className="flex gap-10 text-2xl mb-10 font-mono">
                <div>Time: <span className="text-yellow-400">{timeLeft}</span></div>
                <div>Score: <span className="text-green-400">{score}</span></div>
            </div>

            <div className="bg-gray-800 p-10 rounded-xl shadow-2xl text-center border border-gray-700 max-w-2xl w-full">
                {!isPlaying ? (
                    <div>
                        <h2 className="text-4xl mb-6">Ready?</h2>
                        <div className="text-gray-400 mb-6">
                            {score > 0 && <p>前回のスコア: {score}</p>}
                        </div>
                        <button
                            onClick={startGame}
                            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold text-lg transition"
                            >
                                スタート
                            </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-400 mb-2">Type this:</p>
                        <h1 className="text-4xl font-bold mb-8 tracking-wider font-mono h-12">{targetText}</h1>

                        <input
                            type="text"
                            className="bg-gray-700 text-white text-2xl px-4 py-2 rounded-gray-600 focus:border-blue-500 focus:outline-none w-full"
                            placeholder="ここに入力..."
                            autoFocus
                            value={input}
                            onChange={handleInput}
                        />
                    </div>
                )}
        </div>

        <Link href="/" className="mt-10 text-blue-500 hover:text-white underline">
        トップに戻る
        </Link>

    </div>
    );
}