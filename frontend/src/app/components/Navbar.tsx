"use client";

import { useAuthContext } from "@/context/AuthContext";
import logout from "@/firebase/auth/logout";
import { LucideLogIn, LucideLogOut } from "lucide-react";
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
    <nav className="navbar min-h-14 w-full flex items-center justify-around">
      <h1>TodoApp</h1>
      {user ? (
        <button onClick={handleLogout}>
          <LucideLogOut color="white" />
        </button>
      ) : (
        <div className="flex min-w-60 justify-around flex-row-reverse">
          <button onClick={() => router.push("/login")}>
            <LucideLogIn color="white" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
