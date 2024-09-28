"use client";
import Link from "next/link";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getLinkClasses = (linkPath) => {
    // Function to return active link styles
    return pathname === linkPath
      ? "font-semibold text-primary-500 bg-primary-50" // Active link styles
      : "font-semibold"; // Default link styles
  };
  return (
    <div>
      <aside
        className={`flex flex-col h-screen border-r border-foreground-200 transition-width duration-300 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="py-3 px-3">
          <div className="flex justify-between items-center">
            <div>
              {!isCollapsed && (
                <p className="text-primary font-semibold">Dashboard</p>
              )}
            </div>
            <div
              className="border-2 border-foreground-200 rounded-xl p-2 cursor-pointer"
              onClick={toggleSidebar}
            >
              <IoIosReturnLeft size={20} />
            </div>
          </div>
          <div className="pt-10">
            <div>
              <ul className="flex flex-col">
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/Analytics"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/Analytics">
                    <MdOutlineAnalytics size={20} />
                  </Link>
                  {!isCollapsed && (
                    <Link href="/components/BlogDashboard/Analytics">
                      Analytics
                    </Link>
                  )}
                </li>
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/Bloglist"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/Bloglist">
                    <FaBook size={20} />
                  </Link>
                  {!isCollapsed && (
                    <Link
                      className="font-semibold"
                      href="/components/BlogDashboard/Bloglist"
                    >
                      Blog list
                    </Link>
                  )}
                </li>
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/Blog"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/Blog">
                    <FaPencilAlt size={20} />
                  </Link>
                  {!isCollapsed && (
                    <Link
                      className="font-semibold"
                      href="/components/BlogDashboard/Blog"
                    >
                      Create a Blog
                    </Link>
                  )}
                </li>
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/BookMark"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/BookMark">
                    <GiBookCover size={20} />
                  </Link>
                  {!isCollapsed && (
                    <Link
                      className="font-semibold"
                      href="/components/BlogDashboard/BookMark"
                    >
                      Bookmarks
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
