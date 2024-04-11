import { ReactNode } from "react";

interface InputProps {
  message?: string | undefined;
  children?: ReactNode;
  type: "password" | "text";
  label?: string;
}

export interface TextProps extends InputProps {
  id: string;
  label: string;
  msgWidth?: string;
}

export interface PasswordProps extends InputProps {
  onType: (type: "password" | "text") => void;
}

export interface IInputImage {
  id?: string;
  fieldName?: string;
  title?: string;
  alt?: string;
  acceptTypes?: string;
  imageValue?: string | null;
  size?: number;
}
