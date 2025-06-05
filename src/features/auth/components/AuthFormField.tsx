import Input from "../../../shared/components/UI/Input";

export default function AuthFormField({ type, placeholder, icon, ...props }: { type: string; placeholder: string; icon?:  string }) {
  return (
    <Input type={type} placeholder={placeholder} icon={icon} {...props} />
  );
}
