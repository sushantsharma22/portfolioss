import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Sushant Sharma - AI Research Engineer & Full-Stack Developer",
  description: "AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems. Master's in Applied Computing from University of Windsor. Available for full-time opportunities.",
  keywords: ["AI Research Engineer", "Machine Learning", "Deep Learning", "Full Stack Developer", "Python", "PyTorch", "TensorFlow", "React", "Next.js", "TypeScript", "NLP", "Computer Vision"],
  authors: [{ name: "Sushant Sharma", url: "https://github.com/sushantsharma22" }],
  creator: "Sushant Sharma",
  publisher: "Sushant Sharma",
  openGraph: {
    title: "Sushant Sharma - AI Research Engineer & Full-Stack Developer",
    description: "AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems. Available for full-time opportunities.",
    type: "website",
    url: "https://sushantsharma22.github.io/Portfolio",
    siteName: "Sushant Sharma Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushant Sharma - AI Research Engineer",
    description: "AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

// Web Vitals Monitoring Component
function WebVitalsReporter() {
  return null; // Web Vitals are reported via Next.js built-in instrumentation
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-body">
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
