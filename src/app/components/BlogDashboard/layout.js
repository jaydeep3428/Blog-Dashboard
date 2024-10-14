"use client";
import SideBar from "../SideBar";
import Navbar from "../Navbar";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <SideBar />
        <div className="flex-grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
