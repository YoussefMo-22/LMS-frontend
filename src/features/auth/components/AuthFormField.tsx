import InputUI from "../../../shared/components/UI/Input";
import type { InputHTMLAttributes } from "react";

interface AuthFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  icon?: string;
}

export default function AuthFormField({ type, placeholder, icon, ...props }: AuthFormFieldProps) {
  return (
    <InputUI type={type} placeholder={placeholder} icon={icon} {...props} />
  );
}
