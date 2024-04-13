import { TRole } from "@/common/interface/user";
import Profile from "./Profile";
import Cart from "@/components/modules/Cart/Cart";

interface ILeftSideProps {
  role: TRole | null;
}

const LeftSide: React.FC<ILeftSideProps> = ({ role }) => {
  return (
    <div className="flex gap-[18px]">
      <Cart />
      <Profile role={role} />
    </div>
  );
};

export default LeftSide;
