import { FilterContextProvider } from "./FilterContext";
import { UserContextProvider } from "./UserContext";
export default function ContextsProvider({children}:{children: React.ReactElement}) {
  return (
    <UserContextProvider>
      <FilterContextProvider>{children}</FilterContextProvider>;
    </UserContextProvider>
  );
}

