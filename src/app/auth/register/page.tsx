"use client";

import InputPassword from "@/components/modules/Input/InputPassword";
import InputText from "@/components/modules/Input/InputText";
import { EmailPattern, PasswordPattern, UsernamePattern } from "@/constants/regex";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../_components/Form";
import RightSide from "../_components/RightSide";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const [typePassword, setTypePassword] = useState<"password" | "text">("password");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { touchedFields, errors, dirtyFields, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <Form form="Register">
      <RightSide
        formTitle="ثبت نام"
        formSubTitle="بهترین تجربه رو براتون رقم میزنیم"
        submitTitle="ثبت نام"
        submitHandler={handleSubmit(onSubmit)}
        helpText="قبلا ثبت نام کردی؟"
        helpLink="login"
        helpLinkTitle="ورود"
        isValid={isValid}
      >
        <InputText
          id="username"
          label="نام کاربری"
          type="text"
          message={errors.username ? errors.username.message : ""}
        >
          <input
            type="text"
            className={`form__input ${errors.username && "border-cancel"} ${touchedFields.username && getValues().username !== "" && !errors?.username && "border-success"}`}
            dir="ltr"
            {...register("username", {
              required: { value: true, message: "نام کاربری اجباری هست" },
              pattern: { value: UsernamePattern, message: "نام کاربری صحیح نمی باشد" },
            })}
          />
        </InputText>
        <InputText id="email" label="ایمیل" type="text" message={errors.email ? errors.email.message : ""}>
          <input
            type="text"
            className={`form__input ${errors.email && "border-cancel"} ${touchedFields.email && getValues().email !== "" && !errors?.email && "border-success"}`}
            dir="ltr"
            {...register("email", {
              required: { value: true, message: "ایمیل اجباری هست" },
              pattern: { value: EmailPattern, message: "ایمیل صحیح نمی باشد" },
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
            className={`form__input ${dirtyFields.password && !errors.password && "border-success"} ${errors.password && "border-cancel"}`}
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
