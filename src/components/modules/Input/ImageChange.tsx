import { DefaultImage } from "@/common/enum/default.enum";
import { IInputImage } from "@/common/interface/input";
import { fileRoute } from "@/services/routeService";
import { imageValidate } from "@/utils/func";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface IImageChangeProps extends IInputImage {
  serverImage: string;
  isCover?: boolean;
  uploadAction?: ({ id, data }: { id: string; data: File }) => Promise<{ message: string }>;
  removeAction?: () => Promise<{ message: string }>;
  refetch: () => void;
}

const ImageChange: React.FC<IImageChangeProps> = ({
  id,
  fieldName = "image",
  title = "پروفایل",
  alt = "پروفایل",
  acceptTypes = "image/png, image/webp, image/jpeg, image/jpg",
  serverImage,
  imageValue = null,
  isCover = false,
  size = 1,
  uploadAction,
  removeAction,
  refetch,
}) => {
  const [image, setImage] = useState<string | null>(imageValue ?? "");
  const defaultImage = isCover ? DefaultImage.Cover : DefaultImage.Logo;
  const sourceImage = serverImage ? `${fileRoute}restaurant/${serverImage}` : image ? image : defaultImage;

  const imageUploadHandler = async (file: FileList) => {
    if (!uploadAction) return false;
    const selectFile = file.item(0);
    if (selectFile) {
      const { message } = imageValidate(selectFile, isCover ? 2 : size);

      if (message === "") {
        setImage(URL.createObjectURL(selectFile as any));
        try {
          const { message } = await uploadAction({ id: id ?? "", data: selectFile });
          toast.success(message);
          refetch();
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        }
      } else {
        toast.error(message);
      }
    }
  };

  const removeHandler = async () => {
    try {
      if (!removeAction) return false;

      const { message } = await removeAction();
      toast.success(message);
      setImage(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className={twMerge("relative flex flex-col gap-2", !isCover && "size-36 lg:size-48")}>
      <input
        type="file"
        id={fieldName}
        accept={acceptTypes}
        className="hidden pr-6"
        onChange={e => imageUploadHandler(e?.target?.files as FileList)}
      />

      <div className={twMerge("max-h-full", isCover ? "input__image-bg-cover" : "input__image-logo")}>
        <Image
          src={sourceImage}
          alt={alt}
          width={isCover ? 1000 : 100}
          height={isCover ? 1000 : 100}
          priority
          className="w-full object-cover"
        />
      </div>

      <div className={twMerge("input__image-action group", isCover ? "cover" : "logo")}>
        <label htmlFor={fieldName}>
          <div className="input__image-button bg-emerald-600">
            <HiPencil className="shrink-0" />
            <p className="input__image-text">ویرایش عکس {title}</p>
          </div>
        </label>
        {serverImage && (
          <div className={twMerge("input__image-button bg-red-600")} onClick={removeHandler}>
            <HiTrash className="shrink-0" />
            <p className="input__image-text">حذف عکس {title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageChange;
