"use client";

import { ICommentData, INewComment } from "@/common/interface/restaurant";
import { useCreateFoodComment } from "@/hooks/useFood";
import { useCreateComment } from "@/hooks/useRestaurant";
import { getUser } from "@/services/authService";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import LoginModal from "../Modal/LoginModal";
import Star from "./Star";

interface ICommentListHeadProps {
  restaurantId?: string;
  foodId?: string;
  count: number;
}

const CommentListHead: React.FC<ICommentListHeadProps> = ({ restaurantId, foodId, count }) => {
  const router = useRouter();
  const { mutateAsync } = useCreateComment();
  const { mutateAsync: createFoodComment } = useCreateFoodComment();
  const [user, setUser] = useState<{ avatarUrl: string; fullName: string }>({
    avatarUrl: "",
    fullName: "",
  });
  const [data, setData] = useState<INewComment>({
    body: "",
    rate: 5,
    authorId: "",
    restaurantId: "",
    foodId: "",
  });
  const [rate, setRate] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data.body === "") {
      toast.error("متن نمی تواند خالی باشد");
      return false;
    }

    if (data.body.length < 10) {
      toast.error("متن باید بیشتر از 10 کاراکتر باشد");
      return false;
    }

    if (data.body.length > 1000) {
      toast.error("متن باید بیشتر از 1000 کاراکتر باشد");
      return false;
    }

    try {
      let msg = "";
      if (restaurantId) {
        delete data.foodId;
        const { message } = await mutateAsync({ ...data, rate });
        msg = message;
      } else {
        delete data.restaurantId;
        const { message } = await createFoodComment({ ...data, rate });
        msg = message;
      }
      toast.success(msg);
      router.refresh();
      setIsOpen(false);
      setData({ ...data, body: "", rate: 5 });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const openCommentBox = async () => {
    try {
      if (isOpen) return;
      if (user) {
        const res = await getUser();
        setUser({
          avatarUrl: res.avatarUrl,
          fullName: res.fullName as string,
        });
        if (restaurantId) {
          setData({ ...data, authorId: res._id, restaurantId });
        } else {
          setData({ ...data, authorId: res._id, foodId });
        }
      }
      setIsOpen(true);
    } catch (error: any) {
      setIsShowModal(true);
    }
  };

  const closeCommentBox = () => {
    setIsOpen(false);
    setRate(5);
  };

  return (
    <div className="p-1 font-Dana">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl">نظرات</h1>
          {count > 0 && <span>({count})</span>}
        </div>
        <div>
          <span
            className="flex h-10 w-28 cursor-pointer select-none items-center justify-between rounded-full bg-teal-600 px-3.5 text-sm transition-colors duration-300 hover:bg-teal-700 md:w-32"
            onClick={openCommentBox}
          >
            <span className="shrink-0 text-sm text-white md:text-base">ثبت نظر</span>
            <span>
              <HiOutlineChatBubbleBottomCenterText className="size-5 text-white md:size-6" />
            </span>
          </span>
        </div>
      </div>

      <form
        className={twMerge(
          "mt-4 space-y-4 transition-all",
          isOpen ? "h-fit opacity-100 duration-300 ease-in" : "h-0 overflow-hidden opacity-0",
        )}
        onSubmit={submitHandler}
      >
        <div className="flex items-center justify-between pl-2">
          <div className="flex shrink-0 items-center gap-2.5 md:gap-4">
            <div className="comment__profile shrink-0 rounded-full p-0.5 outline outline-2 outline-amber-600">
              <Image
                src={user?.avatarUrl ? `${fileRoute}user/${user?.avatarUrl}` : "/Auth.png"}
                alt=""
                width={100}
                height={100}
                priority
                className="h-full rounded-full object-cover"
              />
            </div>
            <div className="comment__box-rate">
              <h3 className="leading-5 max-md:text-sm md:leading-6">{user?.fullName}</h3>
            </div>
          </div>
          <Star rate={rate} onRate={setRate} />
        </div>
        <div className="flex-1 overflow-hidden rounded-lg">
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="نظر خود را بنویسید"
            className="w-full rounded-lg p-4 dark:bg-slate-700"
            onChange={e => setData({ ...data, body: e.target.value })}
          ></textarea>
        </div>
        <div className="flex flex-1 justify-end gap-4">
          <button
            type="reset"
            className="rounded-full border border-teal-600 px-8 py-1.5 leading-7 transition-colors duration-200 hover:border-teal-700 hover:bg-teal-700 md:px-12 md:py-2"
            onClick={closeCommentBox}
          >
            لغو
          </button>
          <button
            type="submit"
            className="rounded-full border border-teal-600 bg-teal-600 px-10 py-1.5 leading-7 text-white transition-colors duration-200 hover:border-teal-700 hover:bg-teal-700 md:px-14 md:py-2"
          >
            ارسال
          </button>
        </div>
        <hr className="my-0.5 inline-block w-full border-slate-200 md:my-1 lg:my-2 dark:border-slate-600" />
      </form>
      <LoginModal isShow={isShowModal} setIsShow={setIsShowModal} />
    </div>
  );
};

export default CommentListHead;
