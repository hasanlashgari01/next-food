import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import { useState } from "react";
import { HiTrash } from "react-icons/hi2";

interface IImageUpload {
  isLoading?: boolean;
  formImage: string;
  setValue: any;
}

const ImageUpload: React.FC<IImageUpload> = ({ isLoading, formImage, setValue }) => {
  const [image, setImage] = useState<string | null>(null);

  const imageUploadHandler = (selectorFiles: FileList) => {
    const file = selectorFiles.item(0);

    setValue("image", file as any);
    setImage(URL.createObjectURL(file as any));
  };

  const removeImageHandler = async () => setImage(null);

  return (
    <div className="relative flex flex-col gap-2">
      <input
        type="file"
        id="avatar"
        accept="image/png, image/webp, image/jpeg, image/jpg"
        className="hidden pr-6"
        onChange={e => imageUploadHandler(e.target.files as FileList)}
      />
      <label
        htmlFor="avatar"
        className="size-32 cursor-pointer rounded-full border border-slate-100 p-2 dark:border-slate-700"
      >
        <Image
          src={image ? image : formImage ? `${fileRoute}user/${formImage}` : "/Auth.png"}
          alt="پروفایل"
          width={100}
          height={100}
          loading="lazy"
          className="size-full rounded-full object-cover object-top transition-transform duration-500 hover:scale-110"
        />
      </label>
      {image !== null && (
        <span
          className="group absolute bottom-0 right-0 cursor-pointer rounded-full bg-red-600 p-2 text-white max-sm:bottom-2 max-sm:right-2 sm:p-3"
          onClick={removeImageHandler}
        >
          <HiTrash className="transition-transform duration-300 group-hover:scale-125" />
        </span>
      )}
    </div>
  );
};
export default ImageUpload;
