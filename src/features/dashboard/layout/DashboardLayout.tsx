import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { useSelector } from "react-redux";
import type { RootState } from "../../../shared/store";

export default function DashboardLayout() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <TopNavbar user={user} />
        <main className="p-6 bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}