import { Toaster } from "sonner";
import ContextsProvider from "./contexts/ContextProvider";
import AppRouter from "./router/router";
import Utils from "./utils/utils";

function App() {
  /**
   * Set Utils.lang to "fr-FR" for french language
   */

  Utils.lang = "fr-FR";
  return (
    <div id="app">
      <ContextsProvider>
        <AppRouter />
      </ContextsProvider>

      <Toaster closeButton={true} position="bottom-right" />
    </div>
  );
}

export default App;
