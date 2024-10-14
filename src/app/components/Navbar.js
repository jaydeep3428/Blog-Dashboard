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
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { SwitchThemes } from "./SwitchTheme";
import { useContext } from "react";
import AuthContext from "./BlogDashboard/Context/AuthContext";

export default function App() {
  const { user, logout } = useContext(AuthContext);

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
            className="md:flex hidden"
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
            <DropdownItem
              key="profile"
              className="h-14 gap-2 border-b-2 border-foreground-200 rounded-none"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="system"
              className="border-b-2 border-foreground-200 rounded-none"
            >
              <Link href="/">Home</Link>
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="rounded-none"
              color="danger"
              onClick={logout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
