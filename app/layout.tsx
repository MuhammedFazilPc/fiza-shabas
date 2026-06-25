import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Poppins,
  Cinzel,
  Amiri,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-body",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHABAS Weds FIZA  — Wedding Invitation",
  description: "You are invited to our wedding.",
  openGraph: {
    title: "You are invited to our wedding",
    description:
      "Join us on our special day to celebrate the Marriage of SHABAS & FIZA .",
    url: "https://fiza-weds-shabas.vercel.app", // Adjust if actual endpoint is known
    siteName: "Shabas Weds Fiza",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SHABAS & FIZA Marriage Invitation Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/moon-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${greatVibes.variable} ${poppins.variable} ${cinzel.variable} ${amiri.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
