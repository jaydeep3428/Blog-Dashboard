"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  CardBody,
  Card,
  Pagination,
} from "@nextui-org/react";
import Image from "next/image";
import AuthContext from "../Context/AuthContext";

export default function BookMark() {
  // Example data for bookmarks
  const bookmarks = [
    {
      id: 1,
      image: "/maxresdefault.jpg",
      date: "21 Sep 2024",
      description:
        "In client-side rendering, the rendering of a web page is performed in the client's browser.",
    },
    {
      id: 2,
      image: "/maxresdefault.jpg",
      date: "21 Sep 2024",
      description:
        "How to Build a Progressive Web App (PWA) with Next.js and React? Step by Step Guide.",
    },
    {
      id: 3,
      image: "/maxresdefault.jpg",
      date: "21 Sep 2024",
      description: "Another Bookmark Description for Test Purposes.",
    },
    {
      id: 4,
      image: "/maxresdefault.jpg",
      date: "22 Sep 2024",
      description: "Fourth Bookmark Description for Test Purposes.",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3); // Default to 3

  // Determine number of cards to show based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return 1; // Mobile
      } else if (window.innerWidth < 1024) {
        return 2; // Tablet
      } else {
        return 3; // Laptop/Desktop
      }
    }
    return 3; // Default to 3 if window is not defined
  };

  useEffect(() => {
    setCardsPerPage(getItemsPerPage());

    const handleResize = () => {
      setCardsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * cardsPerPage;
  const indexOfFirstItem = indexOfLastItem - cardsPerPage;
  const currentItems = bookmarks.slice(indexOfFirstItem, indexOfLastItem);

  const { user } = useContext(AuthContext);

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "?";

  return (
    <div className="w-full flex flex-col p-2 sm:p-8">
      {/* Breadcrumbs */}
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>App</BreadcrumbItem>
          <BreadcrumbItem>Bookmark</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Title */}
      <div className="py-10">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-wide">
          Our Bookmarks
        </h1>
      </div>

      {/* Bookmark Cards */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {currentItems.map((bookmark) => (
            <Card key={bookmark.id}>
              <CardBody className="p-2">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={bookmark.image}
                    width={300}
                    height={250}
                    alt="#"
                    className="w-full h-56 object-cover rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-125"
                  />
                </div>
                <div className="px-1 sm:px-4">
                  <p className="text-sm py-5">
                    Bookmarked at
                    <span className="text-foreground-500">
                      {" "}
                      {bookmark.date}
                    </span>
                  </p>
                  <p className="line-clamp-2 mb-5 font-semibold">
                    {bookmark.description}
                  </p>
                </div>
                <div className="absolute right-4 top-6">
                  <span
                    color="foreground"
                    className="text-tiny bg-foreground-200 px-4 pt-3 pb-3 rounded-xl"
                  >
                    {userInitial}
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-8">
        <Pagination
          total={Math.ceil(bookmarks.length / cardsPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
