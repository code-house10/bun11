import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نقل العفش - خدمات نقل الأثاث الاحترافية",
  description: "شركة متخصصة في نقل العفش والأثاث المنزلي والمكتبي. نقدم خدمات التغليف والتخزين والنقل الآمن بأفضل الأسعار.",
  keywords: "نقل عفش, نقل أثاث, شركة نقل, تغليف أثاث, نقل منزلي, نقل مكتبي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
