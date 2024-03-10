import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل ادمین",
};

const PanelAdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="bg-background text-primary-900">{children}</div>;
};

export default PanelAdminLayout;
