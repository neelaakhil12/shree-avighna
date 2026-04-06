import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Shree Avighna | 100% Natural Wood Cold Pressed Oils",
    template: "%s | Shree Avighna"
  },
  description: "Buy premium 100% pure and natural wood cold-pressed edible oils. Traditionally extracted Groundnut, Sesame, Coconut, and Sunflower oils for healthy living.",
  keywords: ["wood cold pressed oil", "natural edible oils", "shree avighna", "groundnut oil", "sesame oil", "coconut oil", "healthy oils hyderabad", "traditional ghani oil"],
  authors: [{ name: "Shree Avighna" }],
  creator: "Shree Avighna",
  publisher: "Shree Avighna",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://shreeavighna.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shree Avighna | Natural Wood Cold Pressed Oils',
    description: '100% pure and natural wood cold-pressed edible oils. Healthy, traditional, and pure.',
    url: 'https://shreeavighna.com',
    siteName: 'Shree Avighna',
    images: [
      {
        url: '/hero-v15.png', // Main sharing image
        width: 1200,
        height: 630,
        alt: 'Shree Avighna Premium Oils',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Avighna | Natural Wood Cold Pressed Oils',
    description: '100% pure and natural wood cold-pressed edible oils.',
    images: ['/hero-v15.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here', // USER: Replace with your actual code from Search Console
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
