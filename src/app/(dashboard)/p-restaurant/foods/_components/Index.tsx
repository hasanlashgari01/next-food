import Link from "next/link";
import FoodTable from "./FoodTable";

const Index = () => {
  return (
    <div>
      <div className="mt-2 flex justify-end">
        <Link href="/p-restaurant/foods/add" className="btn btn-primary inline-flex">
          ایجاد غذا
        </Link>
      </div>
      <FoodTable />
    </div>
  );
};

export default Index;
