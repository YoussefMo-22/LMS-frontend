import InputUI from "../../../shared/components/UI/Input";

export default function AuthFormField({ type, placeholder, icon, ...props }: { type: string; placeholder: string; icon?:  string }) {
  return (
    <InputUI type={type} placeholder={placeholder} icon={icon} {...props} />
  );
}
