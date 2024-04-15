import { ICart, ICartItem } from "@/common/interface/cart";
import { IMainComment } from "@/common/interface/restaurant";

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

const calculateTotalCart = (foods: ICart["foods"], shippingAmount: number) => {
  let total = 0;
  let sum = 0;
  let discount = 0;
  if (foods) {
    foods.forEach((food: ICartItem) => {
      if (food.food?.discount && food.food?.discount?.percent !== null && food.food?.discount?.percent > 0) {
        let discountPrice = calcFoodDiscount(Number(food.food?.price), food.food?.discount.percent);
        sum += calcFoodPriceWithQuantity(discountPrice, food.quantity || 1);
        total += calcFoodPriceWithQuantity(food.food?.price || 0, food.quantity || 1);
      } else {
        sum += calcFoodPriceWithQuantity(food.food?.price || 0, food.quantity || 1);
        total += calcFoodPriceWithQuantity(food.food?.price || 0, food.quantity || 1);
      }
    });
    discount = total - sum;
    sum += shippingAmount;
  }

  return { sum, discount };
};

const calcFoodPriceWithQuantity = (price: string | number, quantity: number) => {
  return Number(price) * Number(quantity);
};

const calcFoodDiscount = (price: string | number, percent: number) => {
  if (percent) {
    return Number(price) - Number(price) * (percent / 100);
  }
  return 0;
};

const imageValidate = (file: File, size: number = 1): { message: string } => {
  const validFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validFileTypes.includes(file.type)) {
    return { message: "فرمت عکس معتبر نمی باشد" };
  }

  if (file.size > size * 1024 * 1024) {
    return { message: `حجم عکس باید کمتر از ${size} مگابایت باشد` };
  }

  return { message: "" };
};

const calulatedScore = (comments: IMainComment[]) => {
  const scores = comments.map(comment => comment.rate);
  const scoresAverage = scores.reduce((acc, score) => acc + score, 0) / scores.length;

  return Math.round(scoresAverage);
};

export {
  fixNumbers,
  recursivePath,
  toPersianDate,
  calculateTotalCart,
  calcFoodDiscount,
  imageValidate,
  calulatedScore,
};
