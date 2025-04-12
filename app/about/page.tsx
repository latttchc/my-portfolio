"use client";
import Image from "next/image";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-3xl mx-auto px-4">
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        {/* 左：プロフィール画像 */}
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-md shrink-0">
                            <Image
                                src="/image/my_portfolio.png"
                                alt="プロフィール画像"
                                width={160}
                                height={160}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* 右：自己紹介テキスト */}
                        <div className="flex-1 space-y-2">
                            <CardHeader className="p-0">
                                <CardTitle className="text-2xl">Yuuki</CardTitle>
                                <CardDescription>
                                    ソフトウェアエンジニア / 研究では機械学習・画像生成をしています。
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-0 space-y-4 text-sm leading-relaxed text-gray-700">
                                <p>
                                    最近はモネ風の絵を再現する画像生成や、機械学習を活かした
                                    アート系プロジェクトにも取り組んでおり、技術と芸術の融合に挑戦！！！
                                </p>
                                <p>
                                    <strong>趣味：</strong>
                                    ゲーム🎮・美食探求🍚・筋トレ💪
                                </p>
                            </CardContent>
                        </div>
                    </div>
                </Card>
                <Card className="mt-6 p-6">
                    <CardHeader>
                        <CardTitle className="text-2xl">スキルセット</CardTitle>
                        <CardDescription>
                            フロントエンドからバックエンドまで、幅広い技術スタックを持っています。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4 text-sm leading-relaxed text-gray-700">
                        <div className="flex flex-wrap gap-4 items-center justify-center">
                            {[
                                { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg" },
                                { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg" },
                                { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                                { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                                { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                                { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                                {
                                    name: "C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
                                },
                                { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
                                { name: "C#", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
                                { name: "Golang", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
                            ].map((tech) => (
                                <div
                                    key={tech.name}
                                    className="flex items-center justify-center px-2"
                                >
                                    <Image src={tech.src} alt={tech.name} width={28} height={28} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardContent className="p-0 space-y-4 text-sm leading-relaxed text-gray-700">
                        <ul className="list-disc list-inside">
                            <li>フロントエンド: React, Next.js, Vite</li>
                            <li>バックエンド: Node.js, Flask, Django</li>
                            <li>データベース: MongoDB, PostgreSQL</li>
                            <li>デザイン: TailwindCss, shadcn/ui, Bootstrap</li>
                            <li>CI/CD: GitHub Actions, Docker(基礎程度)</li>
                            <li>機械学習: TensorFlow, PyTorch</li>
                            <li>画像生成: GAN, DCGAN, StyleGAN, CycleGAN,</li>
                            <li>その他: Git, GitHub, Unity</li>
                        </ul>
                        <p className="mt-4">
                            これらの技術を駆使して、ユーザーにとって価値のある製品を提供することを目指しています。
                        </p>
                        <p className="-mt-4">
                            常に新しい技術を学び、成長し続けることが
                            私のモットーです。😁
                        </p>
                    </CardContent>
                </Card>
            </div>
        </motion.div >
    );
}
