"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

const projects = [
  {
    title: "マインドマップ",
    description:
      "Viteを使ったマインドマップアプリ。React Flowを利用してノードを自由に配置。",
    stack: ["TypeScript", "React", "Vite", "React Flow", "Tailwind CSS"],
    github: "https://github.com/latttchc/orange-mindmap",
    demo: "https://orange-mindmap.vercel.app/",
    image: "/image/mindmap.png",
  },
  {
    title: "簡単!!Todoアプリ",
    description:
      "Supabaseを利用しReact + TypeScriptで作成したシンプルなTodoアプリ。タスクの追加・削除が可能。認証機能も実装。",
    stack: ["Next.js", "React", "Supabase", " TypeScript", "Tailwind CSS"],
    github: "https://github.com/latttchc/todo_list",
    demo: "https://todo-list-welcome.vercel.app/",
    image: "/image/todo-list.png",
  },
  {
    title: "画像生成AI ✖️ モネ風プロジェクト",
    description:
      "モネの絵画データセットを用いたスタイル変換の研究。CycleGANやStyleGANで再現性を追求。",
    stack: ["Python", "PyTorch", "TensorFlow", "画像生成"],
    github: "https://github.com/yourusername/monet-stylegan",
    demo: null,
    image: null,
  },
  {
    title: "Google Books API ✖️ 書籍管理アプリ",
    description:
      "React + Next.js + Tailwind CSSで書籍検索アプリを構築。Google Books APIを活用。",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/book-search-app",
    demo: null,
    image: null,
  },
];

export default function ProjectsPage() {
  const fullText = "これまでに制作・研究したプロジェクトを紹介します。";
  const [typedText, setTypedText] = useState("");
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const delay = setTimeout(() => {
        setShowProjects(true);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [typedText]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      {/* タイピング表示 */}
      <section className="text-center space-y-2 mb-6">
        <h1 className="text-4xl font-bold text-white">Projects</h1>
        <p className="text-3xl text-white/80 min-h-[2em]">{typedText}</p>
      </section>

      {/* カード表示 */}
      {showProjects && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur border border-white/20 text-white shadow-md"
            >
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="text-white/70">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* 画像 or 作成中 */}
                <div className="mb-4">
                  {project.image ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition"
                    >
                      <Image
                        src={project.image}
                        alt=""
                        width={600}
                        height={300}
                        className="rounded-md border border-white/10 object-cover"
                      />
                    </a>
                  ) : (
                    <div className="flex items-center justify-center w-full h-[200px] rounded-md bg-white/10 text-white/70 text-sm">
                      🚧 Coming soon...
                    </div>
                  )}
                </div>

                {/* 技術スタック */}
                <div className="flex flex-wrap gap-2 text-sm mt-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/20 rounded text-white text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHubリンク */}
                <div className="mt-4">
                  {project.demo ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .5C5.72.5.5 5.72.5 12c0 5.09 3.29 9.42 7.84 10.96.57.1.78-.25.78-.55v-2.04c-3.19.7-3.86-1.51-3.86-1.51-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.01 0 0 .96-.31 3.14 1.18a10.87 10.87 0 0 1 2.86-.39c.97 0 1.95.13 2.86.39 2.17-1.49 3.13-1.18 3.13-1.18.63 1.56.24 2.72.12 3.01.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.35.78 1.04.78 2.1v3.12c0 .31.2.66.79.55C20.71 21.41 24 17.09 24 12c0-6.28-5.22-11.5-12-11.5Z" />
                      </svg>
                      GitHub リポジトリ
                    </a>
                  ) : (
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .5C5.72.5.5 5.72.5 12c0 5.09 3.29 9.42 7.84 10.96.57.1.78-.25.78-.55v-2.04c-3.19.7-3.86-1.51-3.86-1.51-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.01 0 0 .96-.31 3.14 1.18a10.87 10.87 0 0 1 2.86-.39c.97 0 1.95.13 2.86.39 2.17-1.49 3.13-1.18 3.13-1.18.63 1.56.24 2.72.12 3.01.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.35.78 1.04.78 2.1v3.12c0 .31.2.66.79.55C20.71 21.41 24 17.09 24 12c0-6.28-5.22-11.5-12-11.5Z" />
                      </svg>
                      <p>GitHubも非公開です🙇</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
