import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/css/globals.css";

const font = localFont({
  src: [
    {
      path: "../../public/fonts/CookieRun-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CookieRun-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CookieRun-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-cookie",
});

export const metadata: Metadata = {
  title: "Buzzer Bidder",
  description: "실시간 경매 플랫폼 버저비더 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${font.className} min-h-screen`}>
        <div className="bg-bg-main mx-auto min-h-screen w-full max-w-7xl">{children}</div>
      </body>
    </html>
  );
}
