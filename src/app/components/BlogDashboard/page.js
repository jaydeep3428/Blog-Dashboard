import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Snippet,
} from "@nextui-org/react";
import { AcmeLogo } from "../AcmeLogo";
import Link from "next/link";
import { SwitchThemes } from "../SwitchTheme";
import SideBar from "../SideBar";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";

export default function BlogDashboard() {
  return (
    <div className="h-screen overflow-hidden">
      <div>
        <Navbar isBlurred isBordered>
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">BLOG</p>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Button color="danger" variant="bordered">
                Visit Site
              </Button>
            </NavbarItem>
            <SwitchThemes />
            <NavbarItem>
              <Link
                color="foreground"
                className="text-tiny bg-primary px-4 pt-3 pb-3 rounded-xl"
                href="#"
              >
                G
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex w-full">
        <div>
          <SideBar />
        </div>
        <div className="w-full flex justify-center h-screen overflow-y-scroll py-4">
          <div className="w-3/5 ">
            <div className="flex gap-2 items-center py-6">
              <FaAngleLeft />
              <Link href="/" color="foreground">
                Back
              </Link>
            </div>
            <div>
              <div>
                <Image
                  src="/react-image.jpg"
                  width={925}
                  height={600}
                  alt="not found"
                  className="rounded-xl"
                />
              </div>
              <div className="py-6">
                <p className="font-semibold">
                  Dynamic routing is a routing method used in web development
                  where the routes of an application are determined dynamically.
                  Dynamic routing in React is a technique that allows for the
                  creation of flexible routes in an application based on user
                  input or the application&apos;s state.
                </p>
                <h1 className="py-6 font-semibold text-2xl text-success">
                  What is useParams?
                </h1>
                <div className="pl-3">
                  <p>
                    Definition: useParams is a hook that allows you to have
                    access to dynamic parameters in the URL(Uniform Resource
                    Locator).
                  </p>
                  <p className="py-6">
                    Use Case: React JS useParams Hook helps to access the
                    parameters of the current route to manage the dynamic routes
                    in the URL.
                  </p>
                  <h1 className="py-6 font-semibold text-2xl text-warning">
                    Setting Up React Router
                  </h1>
                  <p>
                    Before we can use useparams, we need to set up react router
                    in our application here&apos;s basic example:
                  </p>
                  <p className="py-6 text-warning-300">Install React Router:</p>
                  <Snippet className="w-full">
                    npm install react-router-dom
                  </Snippet>
                  <p className="py-6 text-success-400">App.js</p>
                  <Snippet className="w-full">
                    <span> import React from &quot;react&quot;;</span>
                    <span>import React from &quot;react&quot;;</span>
                    <span>import React from &quot;react&quot;;</span>
                    <span>
                      import useParams from &quot;next/navigation&quot;;
                    </span>
                    <span>export default function BlogPost()</span>
                  </Snippet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
