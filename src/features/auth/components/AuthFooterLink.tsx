import { Link } from "react-router-dom";

interface AuthFooterLinkProps {
 text: string;
 to: string;
 linkText: string;
}

export default function AuthFooterLink({ text, to, linkText }: AuthFooterLinkProps) {
  return (
    <p className="text-sm mt-4 text-center">
      {text} <Link to={to} className="text-blue-800 font-semibold">{linkText}</Link>
    </p>
 )
}
