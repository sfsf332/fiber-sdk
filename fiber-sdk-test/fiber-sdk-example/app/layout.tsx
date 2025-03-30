import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fiber SDK Example',
  description: 'Fiber SDK 示例应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              首页
            </Link>
            <Link href="/channel" className="hover:text-gray-300">
              通道管理
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
} 