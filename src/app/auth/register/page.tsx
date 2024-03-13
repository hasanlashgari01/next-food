"use client";

import InputPassword from "@/components/modules/Input/InputPassword";
import InputText from "@/components/modules/Input/InputText";
import { api } from "@/config/axiosConfig";
import { MobilePattern, PasswordPattern } from "@/constants/regex";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Form from "../_components/Form";
import RightSide from "../_components/RightSide";

interface Inputs {
  fullName: string;
  signUpMethod: "email" | "mobile";
  mobile: string;
  password: string;
}

const Register = () => {
  const [typePassword, setTypePassword] = useState<"password" | "text">("password");
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { touchedFields, errors, dirtyFields, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      signUpMethod: "mobile",
      mobile: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    api
      .post(`/auth/send-otp`, data)
      .then(res => {
        if (res.status === 201) {
          toast.success("کد ارسال شد");
          setShowOtp(true);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch(err => toast.error(err.response.data.message));
  };

  return (
    <Form form="Register">
      <RightSide
        showOtp={showOtp}
        setShowOtp={setShowOtp}
        formTitle="ثبت نام"
        formSubTitle="بهترین تجربه رو براتون رقم میزنیم"
        submitTitle="ثبت نام"
        submitHandler={handleSubmit(onSubmit)}
        helpText="قبلا ثبت نام کردی؟"
        helpLink="login"
        helpLinkTitle="ورود"
        isValid={isValid}
        fullName={getValues().fullName}
        signUpMethod={getValues().signUpMethod}
        mobile={getValues().mobile}
        password={getValues().password}
      >
        <InputText
          id="fullName"
          label="نام کاربری"
          type="text"
          message={errors.fullName ? errors.fullName.message : ""}
        >
          <input
            type="text"
            className={`form__input pr-6 ${errors.fullName && "border-cancel"} ${touchedFields.fullName && getValues().fullName !== "" && !errors?.fullName && "border-success"}`}
            dir="rtl"
            {...register("fullName", {
              required: { value: true, message: "نام اجباری هست" },
              minLength: { value: 3, message: "نام باید بیشتر از ۳ کاراکتر باشد" },
            })}
          />
        </InputText>
        <InputText id="mobile" label="شماره تلفن" type="text" message={errors.mobile ? errors.mobile.message : ""}>
          <input
            type="text"
            className={`form__input ${errors.mobile && "border-cancel"} ${touchedFields.mobile && getValues().mobile !== "" && !errors?.mobile && "border-success"}`}
            dir="ltr"
            {...register("mobile", {
              required: { value: true, message: "شماره تلفن اجباری هست" },
              pattern: { value: MobilePattern, message: "شماره تلفن صحیح نمی باشد" },
            })}
          />
        </InputText>
        <InputPassword
          message={errors.password ? errors.password.message : ""}
          type={typePassword}
          onType={setTypePassword}
        >
          <input
            type={typePassword}
            id="password"
            className={`form__input font-sans ${dirtyFields.password && !errors.password && "border-success"} ${errors.password && "border-cancel"}`}
            dir="ltr"
            {...register("password", {
              required: { value: true, message: "رمز عبور اجباری هست" },
              minLength: { value: 8, message: "رمز عبور بین ۸ الی  ۳۲ کاراکتر باشد" },
              maxLength: { value: 32, message: "رمز عبور بین ۸ الی ۳۲ کاراکتر باشد" },
              pattern: { value: PasswordPattern, message: "رمز عبور صحیح نمی باشد" },
            })}
          />
        </InputPassword>
      </RightSide>
    </Form>
  );
};

export default Register;
