"use client";
import { useTheme } from "next-themes";
import { Breadcrumbs, BreadcrumbItem, CardBody, Card } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import chart components to render them only on the client side
const Productchart2 = dynamic(() => import("../../ProductCChart2"), {
  ssr: false,
});
const ProductCChart1 = dynamic(() => import("../../ProductCChart1"), {
  ssr: false,
});
const ProductCChart3 = dynamic(() => import("../../ProuctCChart3"), {
  ssr: false,
});
const ProductCChart4 = dynamic(() => import("../../ProductCChart4"), {
  ssr: false,
});

export default function Analytics() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure that the theme is loaded before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the theme hasn't been resolved yet, don't render the page
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col p-2 sm:p-8">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>App</BreadcrumbItem>
          <BreadcrumbItem>Analytics</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="py-8">
        <h1 className="text-lg sm:text-3xl font-medium tracking-wide">
          Hello, Welcome back 👋
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <Card
            className={`border border-foreground-200 ${
              resolvedTheme === "dark"
                ? "bg-[radial-gradient(circle_at_10%_10%,_rgba(75,0,128,0.838),_hsl(240,6%,10%,1)_40%)]"
                : "bg-[radial-gradient(circle_at_10%_10%,_rgba(75,0,128,0.4),_hsl(0,0%,98%,1)_35%)]"
            }`}
          >
            <CardBody>
              <div className="flex justify-between px-1 py-1">
                <div>
                  <div className="text-2xl">👀</div>
                  <div className="text-2xl font-semibold mt-5 mb-2">10</div>
                  <div className="text-xs">View Distribution</div>
                </div>
                <div className="flex items-center">
                  <ProductCChart1 />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card
            className={`border border-foreground-200 ${
              resolvedTheme === "dark"
                ? "bg-[radial-gradient(circle_at_10%_10%,_rgba(150,0,119,0.954),_hsl(240,6%,10%,1)_40%)]"
                : "bg-[radial-gradient(circle_at_10%_10%,_rgba(150,0,119,0.4),_hsl(0,0%,98%,1)_35%)]"
            }`}
          >
            <CardBody>
              <div className="flex justify-between px-1 py-1">
                <div>
                  <div className="text-2xl">🩷</div>
                  <div className="text-2xl font-semibold mt-5 mb-2">14</div>
                  <div className="text-xs">Blog Likes</div>
                </div>
                <div className="flex items-center">
                  <Productchart2 />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card
            className={`border border-foreground-200 ${
              resolvedTheme === "dark"
                ? "bg-[radial-gradient(circle_at_10%_10%,_rgba(3,79,121,0.89),_hsl(240,6%,10%,1)_40%)]"
                : "bg-[radial-gradient(circle_at_10%_10%,_rgba(3,79,121,0.4),_hsl(0,0%,98%,1)_35%)]"
            }`}
          >
            <CardBody>
              <div className="flex justify-between px-1 py-1">
                <div>
                  <div className="text-2xl">📖</div>
                  <div className="text-2xl font-semibold mt-5 mb-2">6/6</div>
                  <div className="text-xs">Total Blogs</div>
                </div>
                <div className="flex items-center">
                  <ProductCChart3 />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card
            className={`border border-foreground-200 ${
              resolvedTheme === "dark"
                ? "bg-[radial-gradient(circle_at_10%_10%,_rgba(112,112,0,0.8),_hsl(240,6%,10%,1)_40%)]"
                : "bg-[radial-gradient(circle_at_10%_10%,_rgba(112,112,0,0.4),_hsl(0,0%,98%,1)_35%)]"
            }`}
          >
            <CardBody>
              <div className="flex justify-between px-1 py-1">
                <div>
                  <div className="text-2xl">👁️</div>
                  <div className="text-2xl font-semibold mt-5 mb-2">2</div>
                  <div className="text-xs">Total Comments</div>
                </div>
                <div className="flex items-center">
                  <ProductCChart4 />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
