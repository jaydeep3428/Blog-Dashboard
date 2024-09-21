"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import { AcmeLogo } from "../AcmeLogo";
import { RiShieldUserFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      router.push("../components/BlogDashboard"); // Redirect to dashboard
    } else {
      setError(data.message);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen backdrop-blur-sm">
        <div className="w-1/3">
          <div className="border-2 w-full rounded-2xl border-gray-800 px-10 py-10">
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
                    <label className="text-lg font-normal">
                      Email or username
                    </label>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="@email | username"
                      className="text-2xl mt-2"
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
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
              <Divider className="my-8" />
              <div>
                <p className="text-lg">
                  Ready to dive in?
                  <span className="ml-3">
                    <Link
                      href="../components/SignUp"
                      className="text-lg text-primary"
                    >
                      Create an account now!
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
