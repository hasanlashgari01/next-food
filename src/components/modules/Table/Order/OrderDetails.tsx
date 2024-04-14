"use client";

import { IData } from "@/common/interface/getData";
import { IOrder } from "@/common/interface/order";
import { toPersianDate } from "@/utils/func";
import OrderDetailsItem from "./OrderDetailsItem";

const OrderDetails: React.FC<IData<IOrder>> = ({ isLoading, data }) => {
  const { _id, user, foods, total, status, address, coupon, couponAmount, province } = data || {};
  const { deliveryStatus, discount, discountType, orderDate, payment, paymentDate, paymentStatus } = data || {};

  const orderDatePersian = toPersianDate(orderDate);
  const paymentDatePersian = paymentDate && toPersianDate(paymentDate);

  return (
    <div>
      <h2 className="mt-5 text-center text-2xl">صفحه جزئیات سفارش</h2>
      {!isLoading && (
        <ul className="mt-5 grid grid-cols-1 border font-IranYekan sm:mx-auto sm:w-4/5 xl:mt-10 xl:grid-cols-2 xl:gap-10 dark:border-slate-800">
          <div className="order-list">
            <OrderDetailsItem itemText="شماره سفارش" itemValue={_id} />
            <OrderDetailsItem itemText="نام مشتری" itemValue={user?.fullName} />
            <OrderDetailsItem
              itemText="شماره موبایل"
              itemValue={user?.mobile?.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}
            />
            <OrderDetailsItem itemText="ایمیل" itemValue={user?.email} />
            <OrderDetailsItem itemText="آدرس" itemValue={address} />
            <OrderDetailsItem itemText="استان" itemValue={province} />
            <OrderDetailsItem
              itemText="وضعیت"
              itemValue={
                status === "PENDING" ? "در انتظار پرداخت" : status === "COMPLETED" ? "پرداخت شده" : "پرداخت شده"
              }
            />
            <OrderDetailsItem itemText="وضعیت پرداخت" itemValue={paymentStatus === "PAID" ? "موفق" : "ناموفق"} />
            <OrderDetailsItem itemText="غذا ها" itemValue={foods?.length} />
            <OrderDetailsItem
              itemText="مبلغ کل"
              itemValue={total?.toLocaleString("fa-IR") + " تومان"}
              showLine={false}
            />
          </div>

          <hr className="xl:hidden dark:border-slate-800" />

          <div className="order-list">
            <OrderDetailsItem
              itemText="وضعیت ارسال"
              itemValue={
                deliveryStatus === "PENDING"
                  ? "در حال ارسال"
                  : deliveryStatus === "COMPLETED"
                    ? "ارسال شده"
                    : "ارسال نشده"
              }
            />
            <OrderDetailsItem
              itemText="نوع پرداخت"
              itemValue={payment === "CASH_ON_DELIVERY" ? "پرداخت نقدی" : "پرداخت اینترنتی"}
            />
            <OrderDetailsItem itemText="کد تخفیف" itemValue={coupon} />
            <OrderDetailsItem itemText="مقدار تخفیف" itemValue={couponAmount} />
            <OrderDetailsItem itemText="تخفیف" itemValue={discount} />
            <OrderDetailsItem itemText="نوع تخفیف" itemValue={discountType === "fixedProduct" ? "مبلغ ثابت" : "درصد"} />
            <OrderDetailsItem itemText="تاریخ ثبت سفارش" itemValue={orderDatePersian.persianDate} />
            <OrderDetailsItem itemText="ساعت ثبت سفارش" itemValue={orderDatePersian.persianTime} />
            <OrderDetailsItem itemText="تاریخ پرداخت" itemValue={paymentDatePersian?.persianDate} />
            <OrderDetailsItem itemText="ساعت پرداخت" itemValue={paymentDatePersian?.persianTime} showLine={false} />

            <hr className="dark:border-slate-800" />
          </div>
        </ul>
      )}
    </div>
  );
};

export default OrderDetails;
