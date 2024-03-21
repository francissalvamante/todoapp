"use client";

import { useAuthContext } from "@/context/AuthContext";
import logout from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Navbar = (props: any) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  const handleLogout = async () => {
    const { result, error } = await logout();

    console.log(result, error);
    if (error) return console.error(error);

    router.push("/login");
  };

  return (
    <nav className="navbar min-h-14 flex items-center justify-around">
      <h1>TodoApp</h1>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => router.push("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
