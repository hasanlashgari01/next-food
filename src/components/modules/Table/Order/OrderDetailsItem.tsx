interface IProps {
  itemText: string;
  itemValue: string | number | undefined | null;
  showLine?: boolean;
}

const OrderDetailsItem: React.FC<IProps> = ({ itemText, itemValue, showLine = true }) => {
  return (
    <>
      <li>
        <span>{itemText}</span>
        <span className="overflow-hidden max-xs:max-w-20">{itemValue ? itemValue : "..................."}</span>
      </li>
      {showLine && <hr className="dark:border-slate-800" />}
    </>
  );
};

export default OrderDetailsItem;
