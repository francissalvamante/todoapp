"use client";

import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();

    const { result, error } = await signUp(formData.email, formData.password);

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
    <div className="wrapper flex justify-center items-center flex-auto bg-gray-500 w-1/5 p-10 rounded-lg">
      <div className="form-wrapper flex flex-col items-center">
        <h1 className="text-2xl font-bold">Signup</h1>
        <form
          onSubmit={handleSubmit}
          className="form flex flex-col gap-3 my-5 items-center"
        >
          <input
            type="email"
            id="email"
            required
            onChange={handleChange}
            className="py-2 bg-white rounded-full px-6 placeholder:text-xs"
            aria-placeholder="Email Address"
            placeholder="Email Address"
          />
          <input
            type="password"
            id="password"
            required
            onChange={handleChange}
            className="py-2 bg-white rounded-full px-6 placeholder:text-xs"
            aria-placeholder="Password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="py-2 bg-blue-400 rounded-full px-6 w-1/2"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
