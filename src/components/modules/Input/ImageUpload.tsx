import { DefaultImage } from "@/common/enum/default.enum";
import { IInputImage } from "@/common/interface/input";
import { imageValidate } from "@/utils/func";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiArrowUpTray } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface IImageUploadProps extends IInputImage {
  setImageValue: (file: File) => void;
  isLogo?: boolean;
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  fieldName = "image",
  title = "پروفایل",
  alt = "پروفایل",
  acceptTypes = "image/png, image/webp, image/jpeg, image/jpg",
  imageValue = "",
  size = 1,
  isLogo = false,
  setImageValue,
}) => {
  const [image, setImage] = useState<string | null>(imageValue);
  const sourceImage = image ? image : DefaultImage.Logo;

  const imageUploadHandler = async (file: FileList) => {
    const selectFile = file.item(0);
    if (selectFile) {
      const { message } = imageValidate(selectFile, size);

      if (message === "") {
        setImage(URL.createObjectURL(selectFile as any));
        setImageValue(selectFile as File);
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div className={twMerge("relative flex size-36 flex-col gap-2", isLogo ? "lg:w-64" : "lg:size-48")}>
      <input
        type="file"
        id={fieldName}
        accept={acceptTypes}
        className="hidden pr-6"
        onChange={e => imageUploadHandler(e?.target?.files as FileList)}
      />

      <div className={twMerge("input__image-logo max-h-full", !isLogo && "rounded-xl")}>
        <Image src={sourceImage} alt={alt} width={100} height={100} priority className="w-full object-cover" />
      </div>

      <div className="input__image-action logo group">
        <label htmlFor={fieldName}>
          <div className="input__image-button bg-cyan-600">
            <HiArrowUpTray className="shrink-0 text-lg" />
            <p className="input__image-text">آپلود کاور {title}</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
