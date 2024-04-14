import { IBasketItem } from "@/common/interface/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBasket {
  items: IBasketItem[];
  invoice: {
    total: number;
    isCheckedOut: boolean;
  };
  actions: {
    addBasketItem: (item: IBasketItem) => void;
    removeBasketItem: (item: IBasketItem, isDelete?: boolean) => void;
  };
}

export const useBasket = create(
  persist<IBasket>(
    (set, get) => ({
      items: [],
      invoice: {
        total: 0,
        isCheckedOut: false,
      },
      actions: {
        addBasketItem: item => {
          const alreadyExists = get().items.find(i => i._id === item._id);

          console.log(alreadyExists);
        },
        removeBasketItem: (item, isDelete = false) => {
          const findItem = get().items.find(i => i._id === item._id);
          const shouldRemove = Boolean(findItem?.quantity > 1);

          if (!isDelete && shouldRemove) {
            return set(oldBasket => ({
              invoice: {
                total: oldBasket.invoice.total - +item.price,
              },
              items: oldBasket.items.map(_item => {
                if (_item.id === item.id) {
                  return { ..._item, quantity: _item.quantity - 1 };
                }
                return _item;
              }),
            }));
          } else {
            set(oldBasket => ({
              invoice: {
                total: oldBasket.invoice.total - +item.price * findItem?.quantity,
              },
              items: [...oldBasket.items.filter(i => i._id !== item._id)],
            }));
          }
        },
        checkout: () => {
          set(() => ({
            invoice: {
              total: 0,
              isCheckedOut: true,
            },
            items: [],
          }));

          setTimeout(() => {
            set(() => ({
              invoice: {
                total: 0,
                isCheckedOut: false,
              },
            }));
          }, 5000);
        },
      },
    }),
    {
      name: "basket",
      partialize: state =>
        Object.fromEntries(Object.entries(state).filter(([key]) => !["actions"].includes(key))) as IBasket,
    },
  ),
);
