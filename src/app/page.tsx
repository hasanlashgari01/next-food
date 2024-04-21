import Navbar from "@/components/templates/Navbar/Navbar";
import SelectProvinceModal from "@/components/templates/SelectProvinceModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <SelectProvinceModal />
      </div>
    </>
  );
}
