import { Snippet } from "@nextui-org/react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";
import ProtectedRoute from "./Context/ProtectedRoute";

export default function BlogDashboard() {
  return (
    <ProtectedRoute>
      <div className="w-full flex justify-center py-2 sm:py-4">
        <div className="w-11/12 sm:w-3/5">
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
                  <span style={{ color: "greenyellow" }}>Definition: </span>
                  useParams is a hook that allows you to have access to dynamic
                  parameters in the URL(Uniform Resource Locator).
                </p>
                <p className="py-6">
                  <span style={{ color: "greenyellow" }}>Use case: </span>
                  React JS useParams Hook helps to access the parameters of the
                  current route to manage the dynamic routes in the URL.
                </p>
              </div>
              <div>
                <h1 className="py-6 font-semibold text-2xl text-warning">
                  Setting Up React Router
                </h1>
                <p>
                  Before we can use useparams, we need to set up react router in
                  our application here&apos;s basic example:
                </p>
                <p className="py-6 text-warning-300">Install React Router:</p>
                <Snippet className="w-full">
                  npm install react-router-dom
                </Snippet>
                <p className="py-6 text-success-400">App.js</p>
                <Snippet className="w-full">
                  <span style={{ color: "purple" }}>
                    import React from &quot;react&quot;;
                  </span>
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
    </ProtectedRoute>
  );
}
