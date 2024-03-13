import { PasswordProps } from "@/ts/interface/input";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const InputPassword: React.FC<PasswordProps> = ({ type, onType, message, children }) => {
  const showPassword = () => onType("password");
  const hidePassword = () => onType("text");

  return (
    <label htmlFor="password" className="text-xs sm:text-sm">
      <div className="mb-2 flex justify-between px-4">
        <span className="font-semibold text-primary-900">رمز عبور</span>
        {message && <span className="w-48 text-left font-semibold text-red-500 sm:w-60">{message}</span>}
      </div>
      <div className="relative">
        {children}
        <span className="absolute right-6 top-1/2 size-5 -translate-y-1/2 cursor-pointer">
          {type === "password" ? (
            <HiOutlineEyeOff className="size-5" onClick={hidePassword} />
          ) : (
            <HiOutlineEye className="size-5" onClick={showPassword} />
          )}
        </span>
      </div>
    </label>
  );
};

export default InputPassword;
