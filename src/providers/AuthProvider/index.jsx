import React, { createContext, useEffect, useState } from "react";
import { getAuth, signOut } from "@/src/services/auth";
import { useRouter } from "next/router";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const setAuth = async () => {
    try {
      const auth = await getAuth();
      setUser(auth);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      const res = await signOut();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setAuth();
  }, []);
  if (loading) return <>Loading</>;
  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, user, setUser, signout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
