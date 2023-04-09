import React, { createContext } from "react";
import useFetch from "@/src/hooks/useFetch";

export const ProfileContext = createContext(null);

const ProfileProvider = (props) => {
  return (
    <ProfileContext.Provider value={props.data}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
