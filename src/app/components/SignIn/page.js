"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import { AcmeLogo } from "../AcmeLogo";
import { RiShieldUserFill } from "react-icons/ri";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import AuthContext from "../BlogDashboard/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function SignIn() {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      router.push("/components/BlogDashboard");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setError("Email or username is required!");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email or username is required!");
      toast.error("Email is required to login!");
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      toast.success("Login successful!");
    } else {
      setError("Email is not found in our register data!");
      toast.error("Invalid credentials!");
    }
  };

  return user ? null : (
    <div>
      <Toaster position="top-right" richColors />
      <div className="flex justify-center items-center min-h-screen backdrop-blur-sm">
        <div className="p-2 sm:p-6">
          <div
            className={`border-2 w-full ${
              theme === "dark"
                ? "bg-[radial-gradient(circle_at_5%_95%,_rgba(85,30,128,0.8),_rgba(0,0,0,0.5)_20%),_radial-gradient(circle_at_90%_5%,_rgba(5,120,183,0.83),_rgba(0,0,0,0)_20%)]"
                : "bg-[radial-gradient(circle_at_5%_95%,_rgba(85,30,128,0.3),_rgba(0,0,0,0)_20%),_radial-gradient(circle_at_95%_0%,_rgba(5,120,183,0.3),_rgba(0,0,0,0)_20%)]"
            }
             rounded-2xl border-foreground-200 px-4 py-8 sm:px-10 sm:py-10`}
          >
            <form onSubmit={handleSubmit}>
              <h1 className="flex items-center text-2xl mb-4">
                <AcmeLogo />
                <span className="font-semibold">BLOG</span>
              </h1>
              <h2 className="text-xl font-bold mb-2 tracking-wider">Sign in</h2>
              <p className="tracking-wider">to continue to Blog - Dashboard</p>
              <div className="pt-6">
                <div className="flex w-full flex-wrap md:flex-nowrap">
                  <div className="w-full">
                    <label
                      className={`text-lg font-normal ${
                        error ? "text-danger" : ""
                      }`}
                    >
                      Email or username
                    </label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      size="lg"
                      placeholder="@email | username"
                      className="text-2xl mt-2"
                      validationState={error ? "invalid" : "valid"}
                      errorMessage={error}
                      startContent={
                        <RiShieldUserFill className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    type="submit"
                    className="w-full"
                    color="primary"
                    size="lg"
                  >
                    CONTINUE
                  </Button>
                </div>
              </div>
              <Divider className="my-8" />
              <div className="flex flex-wrap">
                <p className="text-base sm:text-lg">Ready to dive in?</p>
                <span>
                  <Link
                    href="../components/SignUp"
                    className="text-base sm:text-lg ml-0 sm:ml-3 text-primary"
                  >
                    Create an account now!
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
