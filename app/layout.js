import {
  Cormorant_Garamond,
  Great_Vibes,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { business, getJsonLd } from "@/data/sistersOfPearl";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const micro = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-micro",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata = {
  title: "Sisters of Pearl | Chinese Restaurant in Glen Waverley",
  description:
    "Discover Sisters of Pearl at 8 Kerrie Road, Glen Waverley, with Chinese dining, seafood and dishes for sharing.",
  openGraph: {
    title: "Sisters of Pearl | Chinese Restaurant in Glen Waverley",
    description: business.description,
    url: business.website,
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = getJsonLd();

  return (
    <html
      lang="en-AU"
      className={`${display.variable} ${body.variable} ${micro.variable} ${script.variable} h-full antialiased`}
    >
      <body className="pearl-texture min-h-full bg-pearl text-ink font-[family-name:var(--font-body)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
