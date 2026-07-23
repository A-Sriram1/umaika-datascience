import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/lib/user-context";

export const metadata: Metadata = {
  title: "FactoryMind AI — Smart Manufacturing Process Optimization",
  description: "AI-powered platform that optimizes manufacturing efficiency, predicts machine failures, monitors production lines, and autonomously improves factory operations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-white text-slate-900 selection:bg-emerald-500 selection:text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
