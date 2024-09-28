"use client";
import { Breadcrumbs, BreadcrumbItem, CardBody, Card } from "@nextui-org/react";
import Productchart2 from "../../ProductCChart2";
import ProductCChart1 from "../../ProductCChart1";
import ProductCChart3 from "../../ProuctCChart3";
import ProductCChart4 from "../../ProductCChart4";

export default function Analytics() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex w-full">
        <div className="w-full h-screen overflow-y-scroll 2xl:overflow-y-hidden flex flex-col p-8">
          <div>
            <Breadcrumbs>
              <BreadcrumbItem>App</BreadcrumbItem>
              <BreadcrumbItem>Analytics</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="py-8">
            <h1 className="text-3xl font-medium tracking-wide">
              Hello, Welcome back 👋
            </h1>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <Card className="border border-foreground-200 bg-[radial-gradient(circle_at_10%_10%,_rgba(75,0,128,0.838),_hsl(240,6%,10%,1)_40%)]">
                <CardBody>
                  <div className="flex justify-between px-1 py-1">
                    <div>
                      <div className="text-2xl">👀</div>
                      <div className="text-2xl font-semibold mt-5 mb-2">10</div>
                      <div className="text-sm">View Distribution</div>
                    </div>
                    <div className="flex items-center">
                      <ProductCChart1 />
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="border border-foreground-200 bg-[radial-gradient(circle_at_10%_10%,_rgba(150,0,119,0.954),_hsl(240,6%,10%,1)_40%)]">
                <CardBody>
                  <div className="flex justify-between px-1 py-1">
                    <div>
                      <div className="text-2xl">🩷</div>
                      <div className="text-2xl font-semibold mt-5 mb-2">14</div>
                      <div className="text-sm">Blog Likes</div>
                    </div>
                    <div className="flex items-center">
                      <Productchart2 />
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="border border-foreground-200 bg-[radial-gradient(circle_at_10%_10%,_rgba(3,79,121,0.89),_hsl(240,6%,10%,1)_40%)]">
                <CardBody>
                  <div className="flex justify-between px-1 py-1">
                    <div>
                      <div className="text-2xl">📖</div>
                      <div className="text-2xl font-semibold mt-5 mb-2">
                        6/6
                      </div>
                      <div className="text-sm">Total Blogs</div>
                    </div>
                    <div className="flex items-center">
                      <ProductCChart3 />
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="border border-foreground-200 bg-[radial-gradient(circle_at_10%_10%,_rgba(112,112,0,0.8),_hsl(240,6%,10%,1)_40%)]">
                <CardBody>
                  <div className="flex justify-between px-1 py-1">
                    <div>
                      <div className="text-2xl">👁️</div>
                      <div className="text-2xl font-semibold mt-5 mb-2">2</div>
                      <div className="text-sm">Total Comments</div>
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
      </div>
    </div>
  );
}
