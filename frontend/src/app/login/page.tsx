"use client";

import signIn from "@/firebase/auth/signin";
import { LucideLogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();

    const { result, error } = await signIn(formData.email, formData.password);

    if (error) return console.error(error);

    return router.push("/");
  };

  const handleChange = (evt: any) => {
    const { id, value } = evt.target;

    setFormData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  return (
    <div className="wrapper flex justify-center items-center flex-auto bg-gray-500 w-1/4 p-10 rounded-lg">
      <div className="form-wrapper flex flex-col items-center w-full">
        <h1 className="text-2xl font-bold">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="form flex flex-col gap-3 my-5 items-center w-full"
        >
          <input
            type="email"
            id="email"
            required
            onChange={handleChange}
            className="py-2 bg-white rounded-full px-6 placeholder:text-xs w-full"
            aria-placeholder="Email Address"
            placeholder="Email Address"
          />
          <input
            type="password"
            id="password"
            required
            onChange={handleChange}
            className="py-2 bg-white rounded-full px-6 placeholder:text-xs w-full"
            aria-placeholder="Password"
            placeholder="Password"
          />
          <div className="flex gap-3 w-full">
            <button
              type="submit"
              className="py-2 bg-green-400 rounded-full px-6 w-1/2"
            >
              Login
            </button>
            <button
              type="button"
              className="py-2 bg-blue-400 rounded-full px-6 w-1/2"
              onClick={() => router.push("/signup")}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
