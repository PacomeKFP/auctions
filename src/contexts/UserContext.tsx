import { createContext, useState } from "react";
import { UserContextInterface } from "../interfaces/ContextsInterfaces";

// const CURRENT_USER_KEY = import.meta.env.VITE_CURRENT_USER_LOCAL_STORAGE_KEY;
const CURRENT_USER_MAIL: string = import.meta.env.VITE_CURRENT_USER_MAIL || "";
const CURRENT_USER_KEY: string = import.meta.env.VITE_CURRENT_USER_KEY || 'currentUser';

export const UserContext = createContext<UserContextInterface | null>(null);

export function UserContextProvider({ children }: { children: React.ReactNode }) {

  //creating User state

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(CURRENT_USER_MAIL));

  const [currentUser, setCurrentUser] = useState<string>(
    localStorage.getItem(CURRENT_USER_KEY) || ""
  );

  //toggle method for User
  const changeCurentUser = (user: string) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={{ currentUser, changeCurentUser }}>
      {children}
    </UserContext.Provider>
  );
}


export const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER_KEY) || "";
}
