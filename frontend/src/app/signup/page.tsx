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

    console.log(result);
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
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign Up</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              id="email"
              required
              type="email"
              onChange={handleChange}
              value={formData.email}
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              id="password"
              required
              type="password"
              onChange={handleChange}
              value={formData.password}
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
