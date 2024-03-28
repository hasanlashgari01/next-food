"use client";

import { useGetOrder } from "@/hooks/useAdmin";
import { toPersianDate } from "@/utils/func";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetOrder(String(id));
  const { _id, user, foods, total, status, address, coupon, couponAmount, province } = data || {};
  const { deliveryStatus, discount, discountType, orderDate, payment, paymentDate, paymentStatus } = data || {};

  const orderDatePersian = toPersianDate(orderDate);
  const paymentDatePersian = paymentDate && toPersianDate(paymentDate);

  return (
    <div>
      <h2 className="my-2 text-2xl">صفحه جزئیات سفارش</h2>
      {!isLoading && (
        <ul className="mt-2 grid grid-cols-1 border font-IranYekan sm:mx-auto sm:w-4/5 xl:mt-10 xl:grid-cols-2 xl:gap-10 dark:border-slate-800">
          <div className="order-list">
            <li>
              <span>شماره سفارش</span>
              <span className="overflow-hidden max-xs:max-w-20">{_id}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>نام مشری</span>
              <span>{user?.fullName}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>شماره موبایل</span>
              <span>{user?.mobile.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>ایمیل</span>
              <span className="empty:hidden">{user?.email ? user?.email : ""}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>آدرس</span>
              <span>{address}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>استان</span>
              <span>{province}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>وضعیت</span>
              <span>
                {status === "PENDING" ? "در انتظار پرداخت" : status === "COMPLETED" ? "پرداخت شده" : "پرداخت شده"}
              </span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>وضعیت پرداخت</span>
              <span>{paymentStatus === "PAID" ? "موفق" : "ناموفق"}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>غذا ها</span>
              <span>{foods?.length}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>مبلغ کل</span>
              <span>{total?.toLocaleString("fa-IR")}</span>
            </li>
          </div>

          <hr className="xl:hidden dark:border-slate-800" />

          <div className="order-list">
            <hr className="dark:border-slate-800" />
            <li>
              <span>وضعیت ارسال</span>
              <span>
                {deliveryStatus === "PENDING"
                  ? "در حال ارسال"
                  : deliveryStatus === "COMPLETED"
                    ? "ارسال شده"
                    : "ارسال نشده"}
              </span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>نوع پرداخت</span>
              <span>{payment === "CASH_ON_DELIVERY" ? "پرداخت نقدی" : "پرداخت اینترنتی"}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>کد تخفیف</span>
              <span className="min-w-20 text-center empty:hidden">{coupon ? coupon : ""}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>مقدار تخفیف</span>
              <span className="min-w-20 text-center empty:hidden">{couponAmount ? couponAmount : ""}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>تخفیف</span>
              <span>{discount}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>نوع تخفیف</span>
              <span>{discountType === "fixedProduct" ? "مبلغ ثابت" : "درصد"}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>تاریخ ثبت سفارش</span>
              <span>{orderDatePersian.persianDate}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>ساعت ثبت سفارش</span>
              <span>{orderDatePersian.persianTime}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>تاریخ پرداخت</span>
              <span>{paymentDatePersian?.persianDate}</span>
            </li>
            <hr className="dark:border-slate-800" />
            <li>
              <span>ساعت پرداخت</span>
              <span>{paymentDatePersian?.persianTime}</span>
            </li>
            <hr className="dark:border-slate-800" />
          </div>
        </ul>
      )}
    </div>
  );
};

export default OrderDetails;
