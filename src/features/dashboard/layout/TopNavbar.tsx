import profile from "../../../assets/profile.png";
import { Search } from "lucide-react";
import noti from "../../../assets/notification-bing.svg"
type NavbarLoginProps = {
  user: {
    name: string;
    email: string;
    profilePicture?: string;
    [key: string]: any;
  };
};
export default function TopNavbar({ user }: NavbarLoginProps) {

  return (
    <header className="py-4 bg-white container mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 w-full max-w-3xl bg-primary-100 p-3 rounded-lg">
          <Search className="text-primary-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 border-none focus:ring-0 focus:outline-none text-primary-400 placeholder:text-primary-400 bg-primary-100"
          />
        </div>
        
        <div className="flex items-center space-x-5">
          <div className="rounded-full bg-primary-100 p-2 hover:bg-primary-200 transition-colors cursor-pointer border border-primary-400">
          <img src={noti} alt="Notifications" />
        </div>
          <div className="flex items-center space-x-2"><img src={user?.profilePicture || profile} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          <span>{user?.name || "Guest"}</span></div>
        </div>
      </div>
    </header>
  );
}