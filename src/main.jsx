import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MyState from "./context/MyState.jsx";
import { store } from "./redux/store.js"
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <MyState>
        <App />
      </MyState>
    </Provider>
  </StrictMode>
);
