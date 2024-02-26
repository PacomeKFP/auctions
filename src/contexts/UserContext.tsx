import { createContext, useState } from "react";
import { UserContextInterface } from "../interfaces/ContextsInterfaces";

// const CURRENT_USER_KEY = import.meta.env.VITE_CURRENT_USER_LOCAL_STORAGE_KEY;
const CURRENT_USER_MAIL: string = import.meta.env.VITE_CURRENT_USER_MAIL || "";
const CURRENT_USER_KEY: string = import.meta.env.VITE_CURRENT_USER_KEY || 'currentUser';

const CURRENT_USER_ID_KEY: string = import.meta.env.VITE_CURRENT_USER_ID_KEY || 'userId';

export const UserContext = createContext<UserContextInterface | null>(null);

export function UserContextProvider({ children }: { children: React.ReactNode }) {

  //creating User state

  localStorage.setItem(CURRENT_USER_KEY, CURRENT_USER_MAIL);

  const [currentUser, setCurrentUser] = useState<string>(
    localStorage.getItem(CURRENT_USER_KEY) || ""
  );
  const [currentUserId, setCurrentUserId] = useState<Array<string>>(
    getCurrentUserIdFromStorage() || []
  )

  //toggle method for User
  const changeCurentUser = (user: string) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
  };

  const changeCurentUserId = (userIds: Array<string>) => {
    setCurrentUserIdInStorage(userIds)
    setCurrentUserId(userIds);
  };

  return (
    <UserContext.Provider value={{ currentUser, changeCurentUser, currentUserId, changeCurentUserId }}>
      {children}
    </UserContext.Provider>
  );
}


export function getCurrentUser(): string {
  return localStorage.getItem(CURRENT_USER_KEY) || "";
}
export function setCurrentUserIdInStorage(userIds: Array<string>) {
  return localStorage.setItem(CURRENT_USER_ID_KEY, JSON.stringify(userIds))
}
export function getCurrentUserIdFromStorage(): Array<string> {
  const data = localStorage.getItem(CURRENT_USER_ID_KEY)
  if (!data || data === null || data === undefined){
    return []
  }
  console.log(data)
  return JSON.parse(data)
}