import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./api/store";
import Browse from "./components/semntics/Browse";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Browse />
        {/* Wrap your app in BrowserRouter */}
      </Provider>
    </BrowserRouter>
  );
}

export default App;
