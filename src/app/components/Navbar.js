import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Divider,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { SwitchThemes } from "./SwitchTheme";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/components/SignIn";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/components/SignIn";
  };

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "?";
  return (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">BLOG</p>
      </NavbarBrand>
      <NavbarContent justify="end" as="div">
        <NavbarItem>
          <Button
            endContent={<BsBoxArrowUpRight />}
            color="danger"
            variant="bordered"
          >
            Visit Site
          </Button>
        </NavbarItem>
        <SwitchThemes />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <NavbarItem>
              <span
                color="foreground"
                className="cursor-pointer text-tiny bg-primary px-4 pt-3 pb-3 rounded-xl"
              >
                {userInitial}
              </span>
            </NavbarItem>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as an</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="system">
              <Link href="/">Home</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
