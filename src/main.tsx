
//@ts-ignore
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
//@ts-ignore
import "./styles/index.css";
import { Provider } from 'react-redux'
import { store } from './redux'

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
