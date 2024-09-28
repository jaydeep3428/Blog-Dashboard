"use client";
import { useEffect, useState } from "react";
import {
  Link,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  CardBody,
  Card,
  Pagination,
} from "@nextui-org/react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

export default function Bloglist() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/components/SignIn";
    }
  }, []);

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "?";

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex w-full">
        <div className="w-full h-screen overflow-y-scroll flex flex-col p-8">
          <div className="flex justify-between items-center">
            <div>
              <Breadcrumbs>
                <BreadcrumbItem>App</BreadcrumbItem>
                <BreadcrumbItem>Blog</BreadcrumbItem>
                <BreadcrumbItem>List</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div>
              <Button as={Link} href="Blog" startContent={<FaPlus />}>
                Create Blog
              </Button>
            </div>
          </div>
          <div className="py-10">
            <h1 className="text-3xl font-medium tracking-wide">Our Blogs</h1>
          </div>
          <div>
            <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardBody className="p-2">
                  <div className="flex">
                    <div className="px-4 w-3/5">
                      <p className="text-sm py-5">
                        Bookmart at
                        <span className="text-foreground-500">
                          {" "}
                          21 sep 2024
                        </span>
                      </p>
                      <p className="line-clamp-2 mb-5 font-semibold">
                        In client-side rendering, the rendering of a web page is
                        performed in the client&apos;s browser. Unlike SSR,
                        where the server generates the full page&apos;s HTML for
                        each request, in CSR, the server sends a minimal HTML
                        document with a JavaScript bundle to the client.
                      </p>
                      <p className="text-sm">
                        sigfsfhjsdfhjsbfsdjdbhv.kbdjhdgldbflsjgfliygfjlsfkuawgfuesrf
                      </p>

                      <BsThreeDots className="my-6" />
                    </div>
                    <div className="realtive">
                      <Image
                        src="/maxresdefault.jpg"
                        width={300}
                        height={250}
                        alt="#"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="absolute right-4 top-6">
                      <span
                        color="foreground"
                        className="text-tiny bg-foreground-200 px-4 pt-3 pb-3 rounded-xl"
                      >
                        {userInitial}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="flex justify-center py-12">
            <Pagination showControls total={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
