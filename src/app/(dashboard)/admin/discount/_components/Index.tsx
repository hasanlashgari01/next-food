import TopPage from "../../_components/TopPage";
import DiscountsTable from "./DiscountsTable";

const Index = () => {
  return (
    <>
      <TopPage title="لیست کد تخفیف" link="/admin/discount/add" linkText="افزودن کد تخفیف" />
      <DiscountsTable />
    </>
  );
};

export default Index;
