import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function Layout() {
  return (
    <div className="layout_container">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
