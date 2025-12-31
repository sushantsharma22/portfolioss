import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sushant Sharma - AI Research Engineer & Full-Stack Developer",
  description: "AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems. Available for full-time opportunities.",
  keywords: "AI Research Engineer, Machine Learning, Deep Learning, Full Stack Developer, Python, PyTorch, TensorFlow",
  authors: [{ name: "Sushant Sharma" }],
  openGraph: {
    title: "Sushant Sharma - AI Research Engineer",
    description: "AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems",
    type: "website",
    url: "https://sushantsharma22.github.io/Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushant Sharma - AI Research Engineer",
    description: "AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨‍💻</text></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a365d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
