import { iranYekan } from "@/config/font";
import { twMerge } from "tailwind-merge";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={twMerge(iranYekan.className, "dark:bg-slate-900 dark:text-white")}>{children}</body>
    </html>
  );
}
