"use client";
import { FaAddressCard } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { PiMailboxFill } from "react-icons/pi";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import { AcmeLogo } from "../AcmeLogo";
import { useState } from "react";
import { IoEye } from "react-icons/io5";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

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
      alert("Registration successful!");
      setFormData("");
    } else {
      setError(data.message);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen backdrop-blur-sm">
        <div className="w-1/3">
          <div className="border-2 w-full rounded-2xl border-gray-800 px-10 py-10">
            <form onSubmit={handleSubmit} action="#" method="#">
              <h1 className="flex items-center text-2xl mb-4">
                <AcmeLogo />
                <span className="font-semibold">BLOG</span>
              </h1>
              <h2 className="text-xl font-bold mb-2 tracking-wider">Sign up</h2>
              <p className="tracking-wider">to continue to Blog - Dashboard</p>
              <div className="pt-6">
                <div className="flex w-full flex-wrap md:flex-nowrap">
                  <div className="w-full">
                    <label className="text-lg font-normal">Full Name</label>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="Enter Your Full Name.."
                      className="text-2xl mt-2"
                      startContent={
                        <FaAddressCard className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mt-2">
                  <div className="w-full">
                    <label className="text-lg font-normal">Mobile No.</label>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="Enter Your Mobile Number.."
                      className="text-2xl font-medium mt-2"
                      startContent={
                        <BsTelephoneFill className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mt-2">
                  <div className="w-full">
                    <label className="text-lg font-normal">E-Mail</label>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="Enter Your Email Address.."
                      className="text-2xl mt-2"
                      startContent={
                        <PiMailboxFill className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mt-2">
                  <div className="w-full">
                    <label className="text-lg font-normal">Password</label>
                    <Input
                      type="password"
                      size="lg"
                      placeholder="*******"
                      className="text-2xl mt-2"
                      startContent={
                        <BsFillShieldLockFill className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      endContent={<IoEye />}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    type="submit"
                    color="primary"
                    className="w-full text-xl"
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
                  Already Have An Account?
                  <span className="ml-3">
                    <Link
                      href="../components/SignIn"
                      className="text-lg text-primary"
                    >
                      Login
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
