import { iranYekan } from "@/config/font";
import { Metadata } from "next";
import LayoutPUser from "./_components/LayoutPUser";

export const metadata: Metadata = {
  title: "فروشگاه | پنل کاربر",
};

const PanelUserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="fa" dir="rtl">
      <body className={iranYekan.className} suppressHydrationWarning={true}>
        <div className="text-primary-900 dark:bg-slate-800">
          <LayoutPUser>{children}</LayoutPUser>
        </div>
      </body>
    </html>
  );
};

export default PanelUserLayout;
