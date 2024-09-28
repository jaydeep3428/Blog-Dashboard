"use client";
import SideBar from "../SideBar";
import Navbar from "../Navbar";

export default function Layout({ children }) {
  return (
    <div className="h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="flex-grow md:overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
