import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import { SwitchThemes } from "./components/SwitchTheme";
import { AcmeLogo } from "./components/AcmeLogo";
import SideBar from "./components/SideBar";
import Analytics from "./components/Analytics/page";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";
import SignUp from "./components/SignUp/page";

export default function App() {
  return (
    <div className="h-auto">
      <div>
        <SignUp />
      </div>
    </div>
  );
}
