import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRouter from "./routes";
import {Provider} from "react-redux"
import store from "./redux/store";
function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
    </BrowserRouter>
  );
}

export default App;
