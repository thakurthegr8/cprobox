import axios from "axios";
import React, { useEffect, useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth");
      const data = await res.data;
      if (data) {
        setAuth(data);
      }
    } catch (fetchError) {
      setError(fetchError);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return { data: auth, loading, error };
};

export default useAuth;
