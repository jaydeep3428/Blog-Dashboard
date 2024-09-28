"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  CardBody,
  Card,
  Pagination,
} from "@nextui-org/react";
import Image from "next/image";

export default function BookMark() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex w-full">
        <div className="w-full h-screen overflow-y-scroll 2xl:overflow-y-hidden flex flex-col p-8">
          <div>
            <Breadcrumbs>
              <BreadcrumbItem>App</BreadcrumbItem>
              <BreadcrumbItem>Bookmark</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="py-10">
            <h1 className="text-3xl font-medium tracking-wide">
              Our Bookmarks
            </h1>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardBody className="p-2">
                  <div>
                    <Image
                      src="/maxresdefault.jpg"
                      width={300}
                      height={250}
                      alt="#"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="px-4">
                    <p className="text-sm py-5">
                      Bookmart at
                      <span className="text-foreground-500"> 21 sep 2024</span>
                    </p>
                    <p className="line-clamp-2 mb-5 font-semibold">
                      In client-side rendering, the rendering of a web page is
                      performed in the client&apos;s browser. Unlike SSR, where
                      the server generates the full page&apos;s HTML for each
                      request, in CSR, the server sends a minimal HTML document
                      with a JavaScript bundle to the client.
                    </p>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="p-2">
                  <div>
                    <Image
                      src="/maxresdefault.jpg"
                      width={300}
                      height={250}
                      alt="#"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="px-4">
                    <p className="text-sm py-5">
                      Bookmart at
                      <span className="text-foreground-500"> 21 sep 2024</span>
                    </p>
                    <p className="line-clamp-2 mb-5 font-semibold">
                      How to Build a Progressive Web App (PWA) with Next.js and
                      React? Step by Step Guide
                    </p>
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
