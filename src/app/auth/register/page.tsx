"use client";

import InputPassword from "@/components/modules/Input/InputPassword";
import InputText from "@/components/modules/Input/InputText";
import { useState } from "react";
import Form from "../_components/Form";
import RightSide from "../_components/RightSide";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form form="Register">
      <RightSide
        formTitle="ثبت نام"
        formSubTitle="بهترین تجربه رو براتون رقم میزنیم"
        submitTitle="ثبت نام"
        submitHandler={registerHandler}
        helpText="قبلا ثبت نام کردی؟"
        helpLink="login"
        helpLinkTitle="ورود"
      >
        <InputText
          id="username"
          label="نام کاربری"
          type="text"
          value={username}
          changeHandler={e => setUsername(e.currentTarget.value)}
          isValid={false}
          message=""
        />
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
          isValid={false}
          message=""
        />
      </RightSide>
    </Form>
  );
};

export default Register;
