"use client";

import { getUser } from "@/services/authService";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import LoginModal from "../Modal/LoginModal";
import { ICommentData } from "@/common/interface/restaurant";
import { useCreateComment } from "@/hooks/useRestaurant";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CommentListHead: React.FC<{ restaurantId: string; count: number }> = ({ restaurantId, count }) => {
  const router = useRouter();
  const { mutateAsync } = useCreateComment();
  const [user, setUser] = useState<{ avatarUrl: string; fullName: string }>({
    avatarUrl: "",
    fullName: "",
  });
  const [data, setData] = useState<ICommentData>({
    body: "",
    rate: 5,
    authorId: "",
    restaurantId: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
      router.refresh();
      setIsOpen(false);
      setData({ ...data, body: "" });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const openCommentBox = async () => {
    try {
      if (isOpen) return;
      if (user) {
        const res = await getUser();
        console.log("🚀 ~ openCommentBox ~ res:", res);
        setUser({
          avatarUrl: res.avatarUrl,
          fullName: res.fullName as string,
        });
        setData({ ...data, authorId: res._id, restaurantId });
      }
      setIsOpen(true);
    } catch (error: any) {
      setIsShowModal(true);
    }
  };

  const closeCommentBox = () => setIsOpen(false);

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
            <span className="shrink-0 text-sm md:text-base">ثبت نظر</span>
            <span>
              <HiOutlineChatBubbleBottomCenterText className="size-5 md:size-6" />
            </span>
          </span>
        </div>
      </div>

      <form
        className={twMerge(
          "mt-4 space-y-4 overflow-hidden transition-all",
          isOpen ? "h-fit opacity-100 duration-300 ease-in" : "h-1 opacity-0",
        )}
        onSubmit={submitHandler}
      >
        <div className="flex shrink-0 items-center gap-2.5 md:gap-4">
          <div className="comment__profile shrink-0 overflow-hidden rounded-full p-0.5 outline outline-2 outline-amber-600">
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
            className="rounded-full border border-teal-600 px-8 py-1.5 leading-7 transition-colors duration-200 hover:border-teal-700 hover:bg-teal-700 md:px-12 md:py-2"
            onClick={closeCommentBox}
          >
            لغو
          </button>
          <button
            type="submit"
            className="rounded-full border border-teal-600 bg-teal-600 px-10 py-1.5 leading-7 transition-colors duration-200 hover:border-teal-700 hover:bg-teal-700 md:px-14 md:py-2"
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
