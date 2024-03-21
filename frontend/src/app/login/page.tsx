"use client";

import signIn from "@/firebase/auth/signin";
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
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Login</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input onChange={handleChange} id="email" required type="email" />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={handleChange}
              id="password"
              required
              type="password"
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
