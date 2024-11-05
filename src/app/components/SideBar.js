"use client";
import Link from "next/link";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoIosReturnLeft, IoIosReturnRight } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getLinkClasses = (linkPath) => {
    return pathname === linkPath
      ? "font-semibold text-primary-500 bg-primary-50 hover:text-primary-400"
      : "font-semibold hover:bg-foreground-50";
  };

  const getIconClasses = (linkPath) => {
    return pathname === linkPath
      ? "text-primary-500" // Active icon styles
      : ""; // Default icon styles
  };

  return (
    <div>
      <aside
        className={`flex flex-col h-screen border-r border-divider transition-width duration-300 ${
          isCollapsed ? "w-20" : "w-72"
        } hidden lg:flex`} // Hide on mobile screens
      >
        <div className="py-3 px-3">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div>
              {!isCollapsed && (
                <p className="text-primary font-semibold">Dashboard</p>
              )}
            </div>
            <Tooltip
              content={isCollapsed ? "Expand" : "Collapse"}
              placement="right"
            >
              <div
                className="border-2 border-foreground-200 rounded-xl p-2 hover:bg-foreground-200 cursor-pointer"
                onClick={toggleSidebar}
              >
                {isCollapsed ? (
                  <IoIosReturnRight size={20} />
                ) : (
                  <IoIosReturnLeft size={20} />
                )}
              </div>
            </Tooltip>
          </div>
          <div className="pt-6">
            <div>
              <ul className="flex flex-col gap-y-2">
                <li
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } gap-8 rounded-xl p-3.5 cursor-pointer transition-all duration-300 ${getLinkClasses(
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
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } gap-8 rounded-xl p-3.5 cursor-pointer transition-all duration-300 ${getLinkClasses(
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
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } gap-8 rounded-xl p-3.5 cursor-pointer transition-all duration-300 ${getLinkClasses(
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
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } gap-8 rounded-xl p-3.5 cursor-pointer transition-all duration-300 ${getLinkClasses(
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

      {/* Mobile version showing only icons */}
      <aside className="flex flex-col h-screen border-r border-foreground-200">
        <div className="py-3 px-2">
          <div className="pt-2 sm:pt-10 md:pt-2">
            <div>
              <ul className="flex flex-col">
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/Analytics"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/Analytics">
                    <MdOutlineAnalytics
                      size={20}
                      className={getIconClasses(
                        "/components/BlogDashboard/Analytics"
                      )}
                    />
                  </Link>
                </li>
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/Bloglist"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/Bloglist">
                    <FaBook
                      size={20}
                      className={getIconClasses(
                        "/components/BlogDashboard/Bloglist"
                      )}
                    />
                  </Link>
                </li>
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/Blog"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/Blog">
                    <FaPencilAlt
                      size={20}
                      className={getIconClasses(
                        "/components/BlogDashboard/Blog"
                      )}
                    />
                  </Link>
                </li>
                <li
                  className={`flex items-center gap-8 rounded-xl p-3.5 cursor-pointer ${getLinkClasses(
                    "/components/BlogDashboard/BookMark"
                  )}`}
                >
                  <Link href="/components/BlogDashboard/BookMark">
                    <GiBookCover
                      size={20}
                      className={getIconClasses(
                        "/components/BlogDashboard/BookMark"
                      )}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
