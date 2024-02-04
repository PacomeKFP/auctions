import { createContext, useState } from "react";
import { FilterContextInterface, FilterTag } from "../interfaces/ContextsInterfaces";


export const FilterContext = createContext<FilterContextInterface | null>(null);

export function FilterContextProvider({children}:{children: React.ReactNode}) {
  //creating User state
  const [currentTags, setCurrentTags] = useState<FilterTag[]>(["PENDING", "IN_PROGRESS", "COMPLETED"]);
  const [searchText, setSearchText] = useState("");

  //toggle method for User
  const toggleTag = (tag: FilterTag) => {
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
