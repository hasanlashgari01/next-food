import { iranYekan } from "@/config/font";
import { Metadata } from "next";
import { Providers } from "../providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "فروشگاه | سبد خرید",
};

const PanelUserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="fa" dir="rtl" className="text-primary-900 dark:bg-slate-900">
      <body className={iranYekan.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default PanelUserLayout;
