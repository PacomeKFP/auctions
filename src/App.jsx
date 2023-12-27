import { ToastContainer } from "react-toastify";
import AppRouter from "./Router";
import ContextsProvider from "./context/ContextProvider";
import Utils from "./utils/Utils";

function App() {
  /**
   * Set Utils.lang to "fr-FR" for french language
   */
  Utils.lang = "fr-FR";
  return (
    <div id="app">
      <ContextsProvider >
        <AppRouter />
      </ContextsProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
