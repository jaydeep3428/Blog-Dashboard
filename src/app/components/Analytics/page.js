import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "../AcmeLogo";
import { SwitchThemes } from "../SwitchTheme";
import SideBar from "../SideBar";

export default function Analytics() {
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
        <div className="w-full">
          <div>hello</div>
        </div>
      </div>
    </div>
  );
}
