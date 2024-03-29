import { ICart } from "@/common/interface/cart";

const recursivePath = (pathname: string) => {
  const currentPath = pathname?.split("/")?.slice(-1)?.toString();
  const parentPath = pathname?.split("/")[2]?.toString();

  return { currentPath, parentPath };
};

const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  fixNumbers = function (str: string | number) {
    if (typeof str === "string") {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i.toString());
      }
    }
    return str;
  };

const toPersianDate = (date?: Date) => {
  if (!date) return { persianDate: "", persianTime: "" };
  let d = new Date(date);
  let persianDate = d.toLocaleDateString("fa-IR");
  let persianTime = d.toLocaleTimeString("fa-IR");

  return { persianDate, persianTime };
};

const calculateTotalCart = (foods: ICart["foods"]) => {
  let sum = 0;
  if (foods) {
    foods.forEach(food => {
      sum += Number(food.kindId?.price) * Number(food.quantity!);
    });
  }
  return sum;
};

export { fixNumbers, recursivePath, toPersianDate, calculateTotalCart };
