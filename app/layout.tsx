import './globals.css'
import Link from 'next/link'
import StarBackground from '@/components/StarBackground'
import { Html } from 'next/document'
import { cn } from "@/lib/utils" // shadcn/uiに含まれるユーティリティ（クラス結合）

export const metadata = {
  title: "Yuuki's Portfolio",
  description: 'ポートフォリオサイト',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="relative bg-black text-white">
        <StarBackground />

        <header className="relative z-50 border-b border-white/10 bg-black/60 backdrop-blur">
          <nav className="container mx-auto flex items-center justify-between p-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors"
            >
              Yuuk1.dev
            </Link>
            <div className="flex space-x-4 text-sm font-medium">
              <NavLink href="/about" label="About me" />
              <NavLink href="/projects" label="Projects" />
              <NavLink href="/contact" label="Contact" />
            </div>
          </nav>
        </header>

        {/* 🔽 メインコンテンツ */}
        <main className="relative z-10 container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="relative z-10 text-center text-sm text-white/70 py-6 border-t border-white/10">
          © 2025 Yuuk1's Portfolio. All rights reserved.
        </footer>
      </body>
    </html>
  );
}


// 共通ナビリンク用コンポーネント
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-white hover:text-blue-400 transition-colors",
        "px-3 py-2 rounded-md"
      )}
    >
      {label}
    </Link>
  );
}

