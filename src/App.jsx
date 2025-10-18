import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useState } from "react";

import Authentication from "./features/Authentication/Authentication";
import AppRouter from "./routes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {!isLoggedIn ? (
          <Authentication onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <AppRouter isLoggedIn={isLoggedIn} />
        )}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
