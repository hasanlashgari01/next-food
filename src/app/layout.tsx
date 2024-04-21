import { iranYekan } from "@/config/font";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import "./globals.css";

export const metadata: Metadata = {
  title: "صفحه اصلی | فروشگاه",
  description: "صفحه اصلی فروشگاه",
  icons: {
    icon: "/Auth.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={twMerge(iranYekan.className, "dark:bg-slate-900 dark:text-white")}>{children}</body>
    </html>
  );
}
