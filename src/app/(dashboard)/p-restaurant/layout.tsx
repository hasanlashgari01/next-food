import { iranYekan } from "@/config/font";
import { Metadata } from "next";
import LayoutPRestaurant from "./_components/LayoutPRestaurant";

export const metadata: Metadata = {
  title: "فروشگاه | پنل رستوران",
};

const PanelUserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="fa" dir="rtl">
      <body className={iranYekan.className} suppressHydrationWarning={true}>
        <div className="text-primary-900 dark:bg-slate-800">
          <LayoutPRestaurant>{children}</LayoutPRestaurant>
        </div>
      </body>
    </html>
  );
};

export default PanelUserLayout;
