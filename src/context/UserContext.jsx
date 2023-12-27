import { createContext, useState } from "react";

const CURRENT_USER_KEY = import.meta.env.VITE_CURRENT_USER_LOCAL_STORAGE_KEY;
import { PropTypes } from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  //creating User state
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem(CURRENT_USER_KEY)
  );

  //toggle method for User
  const changeCurentUser = (user) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={{ currentUser, changeCurentUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.element,
};
