import { createContext, useState } from "react";

import { PropTypes } from "prop-types";

export const FilterContext = createContext({});

export function FilterContextProvider({ children }) {
  //creating User state
  const [currentTags, setCurrentTags] = useState([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]);
  const [searchText, setSearchText] = useState("");

  //toggle method for User
  const toggleTag = (tag) => {
    if (currentTags.includes(tag)) {
      setCurrentTags(currentTags.filter((t) => t !== tag));
    } else {
      setCurrentTags([...currentTags, tag]);
    }
  };

  return (
    <FilterContext.Provider
      value={{ currentTags, toggleTag, searchText, setSearchText }}
    >
      {children}
    </FilterContext.Provider>
  );
}

FilterContextProvider.propTypes = {
  children: PropTypes.element,
};
