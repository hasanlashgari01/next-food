import { ICompletionDelivery } from "@/common/interface/cart-page";
import SelectRadio from "@/components/modules/Cart/SelectRadio";
import { completionDeliveryValues } from "@/constants/radioValues";
import { HiOutlineTruck } from "react-icons/hi2";

interface ICompletionDeliveryProps {
  delivery: ICompletionDelivery;
  setDelivery: (delivery: ICompletionDelivery) => void;
}

const CompletionDelivery: React.FC<ICompletionDeliveryProps> = ({ delivery, setDelivery }) => {
  return (
    <SelectRadio
      data={completionDeliveryValues}
      radio={delivery}
      setRadio={setDelivery}
      name="delivery"
      icon={HiOutlineTruck}
      title="روش تحویل سفارش"
    />
  );
};

export default CompletionDelivery;
