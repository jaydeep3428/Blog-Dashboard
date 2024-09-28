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
import { IoEyeOff } from "react-icons/io5";
import { toast, Toaster } from "sonner";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let tempErrors = { ...errors };

    if (name === "name") {
      if (value === "") {
        tempErrors.name = "Full Name is required!";
      } else {
        delete tempErrors.name;
      }
    }

    if (name === "mobile") {
      if (value === "") {
        tempErrors.mobile = "Mobile number is required!";
      } else if (!/^\d{10}$/.test(value)) {
        tempErrors.mobile = "Mobile number must be at least 10 digits!";
      } else {
        delete tempErrors.mobile;
      }
    }

    if (name === "email") {
      if (value === "") {
        tempErrors.email = "Email is required!";
      } else {
        delete tempErrors.email;
      }
    }

    if (name === "password") {
      if (value === "") {
        tempErrors.password = "Password is required!";
      } else if (!/^\d{4}$/.test(value)) {
        tempErrors.password = "Password must be at least 4 digits long!";
      } else {
        delete tempErrors.password;
      }
    }

    setErrors(tempErrors);
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Full Name is required!";
    if (!formData.mobile) {
      tempErrors.mobile = "Mobile number is required!";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      tempErrors.mobile = "Mobile number must be at least 10 digits!";
    }

    if (!formData.email) tempErrors.email = "Email is required!";

    if (!formData.password) {
      tempErrors.password = "Password is required!";
    } else if (!/^\d{4,}$/.test(formData.password)) {
      tempErrors.password =
        "Password must be at least 4 digits characters long!";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting!");
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success("Registration successfully!");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
      });
    } else {
      toast.danger("Please Enter Valid Data!");
    }
  };
  return (
    <div>
      <Toaster position="top-right" richColors />
      <div className="flex justify-center items-center my-4 mx-2 sm:mx-0 sm:my-10 backdrop-blur-sm">
        <div className="w-full sm:w-3/5 md:w-2/4 lg:w-5/12 xl:w-1/3">
          <div className="border-2 w-full bg-[radial-gradient(circle_at_5%_95%,_rgba(85,30,128,0.8),_rgba(0,0,0,0.5)_20%),_radial-gradient(circle_at_90%_5%,_rgba(5,120,183,0.83),_#000_20%)] rounded-2xl border-foreground-200 px-4 py-8 sm:px-10 sm:py-10">
            <form onSubmit={handleSubmit} action="#" method="#">
              <h1 className="flex items-center text-2xl mb-4">
                <AcmeLogo />
                <span className="font-semibold">Blog</span>
              </h1>
              <h2 className="text-xl font-bold mb-2 tracking-wider">Sign up</h2>
              <p className="tracking-wider">to continue to Blog - Dashboard</p>
              <div className="pt-6">
                <div className="flex w-full flex-wrap md:flex-nowrap">
                  <div className="w-full">
                    <label
                      className={`text-lg font-normal ${
                        errors.name ? "text-danger" : ""
                      }`}
                    >
                      Full Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      size="lg"
                      placeholder="Enter your full name.."
                      className="text-2xl mt-2"
                      startContent={
                        <FaAddressCard className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      validationState={errors.name ? "invalid" : "valid"}
                      errorMessage={errors.name}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mt-2">
                  <div className="w-full">
                    <label
                      className={`text-lg font-normal ${
                        errors.mobile ? "text-danger" : ""
                      }`}
                    >
                      Mobile No.
                    </label>
                    <Input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      type="text"
                      size="lg"
                      placeholder="Enter your mobile number.."
                      className="text-2xl font-medium mt-2"
                      startContent={
                        <BsTelephoneFill className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      validationState={errors.mobile ? "invalid" : "valid"}
                      errorMessage={errors.mobile}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mt-2">
                  <div className="w-full">
                    <label
                      className={`text-lg font-normal ${
                        errors.email ? "text-danger" : ""
                      }`}
                    >
                      E-Mail
                    </label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      size="lg"
                      placeholder="Enter your email address.."
                      className="text-2xl mt-2"
                      startContent={
                        <PiMailboxFill className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      validationState={errors.email ? "invalid" : "valid"}
                      errorMessage={errors.email}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mt-2">
                  <div className="w-full">
                    <label
                      className={`text-lg font-normal ${
                        errors.password ? "text-danger" : ""
                      }`}
                    >
                      Password
                    </label>
                    <Input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      placeholder="*******"
                      className="text-2xl mt-2"
                      startContent={
                        <BsFillShieldLockFill className="text-2xl rounded-md text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      endContent={
                        <div
                          onClick={togglePasswordVisibility}
                          className="cursor-pointer"
                        >
                          {showPassword ? <IoEyeOff /> : <IoEye />}
                        </div>
                      }
                      validationState={errors.password ? "invalid" : "valid"}
                      errorMessage={errors.password}
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
                </div>
              </div>
              <Divider className="my-8" />
              <div>
                <p className="text-sm sm:text-lg">
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
