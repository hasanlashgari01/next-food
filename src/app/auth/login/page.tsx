"use client";

import InputPassword from "@/components/modules/Input/InputPassword";
import InputText from "@/components/modules/Input/InputText";
import { MobilePattern, PasswordPattern } from "@/constants/regex";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../_components/Form";
import RightSide from "../_components/RightSide";

type Inputs = {
  signUpMethod: "email" | "mobile";
  mobile: string;
  password: string;
};

const Login = () => {
  const [typePassword, setTypePassword] = useState<"password" | "text">("password");
  const [showOtp, setShowOtp] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { touchedFields, errors, dirtyFields, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      signUpMethod: "mobile",
      mobile: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);

    axios.post(`${process.env.NEXT_PUBLIC_API}/auth/send-otp`, data).then(res => {
      if (res.status === 201) {
        setShowOtp(true);
      }
    });
  };

  return (
    <Form form="Login">
      <RightSide
        showOtp={showOtp}
        setShowOtp={setShowOtp}
        formTitle="ورود"
        formSubTitle="خوش اومدی"
        submitTitle="ورود"
        submitHandler={handleSubmit(onSubmit)}
        helpText="حساب کاربری نداری؟"
        helpLink="register"
        helpLinkTitle="ثبت نام"
        isValid={isValid}
        signUpMethod={getValues().signUpMethod}
        mobile={getValues().mobile}
      >
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

export default Login;
