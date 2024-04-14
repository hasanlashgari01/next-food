import { iranYekan } from "@/config/font";
import Index from "@/layout/Index";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { Providers } from "../providers";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={twMerge(iranYekan.className, "dark:bg-slate-900 dark:text-white")}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Index>{children}</Index>
        </Providers>
      </body>
    </html>
  );
}
