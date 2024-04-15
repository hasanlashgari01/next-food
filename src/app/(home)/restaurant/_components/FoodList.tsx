import { IMenu } from "@/common/interface/restaurant";
import AsideTop from "./AsideTop";
import Food from "@/components/modules/Food/Food";
import Empty from "@/components/modules/Error/Empty";

const FoodList: React.FC<{ menus: IMenu[] }> = ({ menus }) => {
  return (
    <div className="-z-10">
      <ul id="menu" className="space-y-10">
        {menus.length > 0 ? (
          menus.map(
            item =>
              item.foods.length > 0 && (
                <li key={item._id} id={item._id}>
                  <AsideTop title={item.title as string} />
                  <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                    {item.foods.map(food => (
                      <Food key={food._id} {...food} />
                    ))}
                  </div>
                </li>
              ),
          )
        ) : (
          <Empty text="منو یافت نشد" />
        )}
      </ul>
    </div>
  );
};

export default FoodList;
