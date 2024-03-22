"use client";

import Loading from "@/app/components/Loading";
import firebaseApp from "@/firebase/config";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const auth = getAuth(firebaseApp);

const DEFAULT_DATA: { user: User | null } = { user: null };

export const AuthContext = createContext(DEFAULT_DATA);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading loading={loading} /> : children}
    </AuthContext.Provider>
  );
};
