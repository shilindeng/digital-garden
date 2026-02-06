import type { Metadata } from "next";
import { Inter, Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "士林的数字花园",
    template: "%s | 士林的数字花园",
  },
  description: "探索 AI Agent、自动化工作流与现代 Web 开发的无限可能。在这里记录数字足迹与技术思考。",
  keywords: ["AI Agent", "全栈开发", "Next.js", "技术博客", "数字花园"],
  authors: [{ name: "士林" }],
  creator: "士林",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://digital-garden-15m.pages.dev",
    title: "士林的数字花园",
    description: "探索 AI Agent、自动化工作流与现代 Web 开发的无限可能",
    siteName: "数字花园",
  },
  twitter: {
    card: "summary_large_image",
    title: "士林的数字花园",
    description: "探索 AI Agent、自动化工作流与现代 Web 开发的无限可能",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansSC.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
