import { PropTypes } from "prop-types";
import { FilterContextProvider } from "./FilterContext";
export default function ContextsProvider({ children }) {
  return <FilterContextProvider>{children}</FilterContextProvider>;
}

ContextsProvider.propTypes = {
  children: PropTypes.element,
};
