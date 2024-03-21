import { ReactNode } from "react";

interface InputProps {
  message: string | undefined;
  children?: ReactNode;
  type: "password" | "text";
}

export interface TextProps extends InputProps {
  id: string;
  label: string;
}

export interface PasswordProps extends InputProps {
  onType: (type: "password" | "text") => void;
}
