import Link from "next/link";
import MenuTable from "./MenuTable";

const Index = () => {
  return (
    <>
      <div className="mt-2 flex justify-end">
        <Link href="/p-restaurant/menus/add" className="btn btn-primary inline-flex">
          ایجاد منو
        </Link>
      </div>
      <MenuTable />
    </>
  );
};

export default Index;
