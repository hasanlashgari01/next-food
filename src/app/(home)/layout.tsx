import { iranYekan } from "@/config/font";
import Index from "@/layout/Index";
import { twMerge } from "tailwind-merge";
import { Providers } from "../providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={twMerge(iranYekan.className, "dark:bg-slate-900 dark:text-white")}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Index>{children}</Index>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
