"use client";

import InputPassword from "@/components/modules/Input/InputPassword";
import InputText from "@/components/modules/Input/InputText";
import { useState } from "react";
import Form from "../_components/Form";
import RightSide from "../_components/RightSide";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form form="Login">
      <RightSide
        formTitle="ورود"
        formSubTitle="خوش اومدی"
        submitTitle="ورود"
        submitHandler={loginHandler}
        helpText="حساب کاربری نداری؟"
        helpLink="register"
        helpLinkTitle="ثبت نام"
      >
        <InputText
          id="email"
          label="ایمیل"
          type="text"
          value={email}
          changeHandler={e => setEmail(e.currentTarget.value)}
          isValid={false}
          message=""
        />
        <InputPassword
          value={password}
          changeHandler={e => setPassword(e.currentTarget.value)}
          message=""
          isValid={false}
        />
      </RightSide>
    </Form>
  );
};

export default Login;
