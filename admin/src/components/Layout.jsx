import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow p-4 flex justify-between z-10">
        <h1 className="font-bold">PRABHAV ADMIN</h1>

        <button
          onClick={() => setOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* PAGE CONTENT */}
      <div className="pt-16 w-full bg-gray-100 min-h-screen">
        <Outlet />
      </div>

    </div>
  );
}