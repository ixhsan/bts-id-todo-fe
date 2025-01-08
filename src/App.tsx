import { Provider } from "react-redux";
import Router from "./router/Router";
import { store } from "./store/store";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <Provider store={store}>
      <Router />
      <Toaster/>
    </Provider>
  );
}

export default App;
