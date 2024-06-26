import { dana } from "@/config/font";
import { Metadata } from "next";
import LayoutPAdmin from "./_components/LayoutPAdmin";

export const metadata: Metadata = {
  title: "فروشگاه | پنل ادمین",
};

const PanelAdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="fa" dir="rtl">
      <body className={dana.className} suppressHydrationWarning={true}>
        <div className="text-primary-900 dark:bg-slate-800">
          <LayoutPAdmin>{children}</LayoutPAdmin>
        </div>
      </body>
    </html>
  );
};

export default PanelAdminLayout;
