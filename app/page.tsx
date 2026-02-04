import Link from "next/link"; // Next.js専用のリンク機能

export default function Home() {
  return (
    // Tailwind CSSの解説:
    // min-h-screen: 最低でも画面いっぱいの高さにする
    // flex, flex-col: 要素を縦並びにする
    // items-center, justify-center: 真ん中（中央）に寄せる
    // bg-gray-950: 背景色を濃いグレーにする
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white gap-8">
      
      {/* タイトル部分 */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Code Typer
        </h1>
        <p className="text-gray-400 text-xl">
          エンジニアのための、高速タイピングゲーム
        </p>
      </div>

      <Link 
        href="/game" 
        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full text-xl font-bold transition-all shadow-lg hover:shadow-blue-500/50"
      >
        Game Start
      </Link>
      
    </main>
  );
}