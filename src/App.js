import React from "react"
import { BrowserRouter } from "react-router-dom"
import Browse from "./components/semntics/Browse"

function App() {
  return (
    <BrowserRouter> {/* Wrap your app in BrowserRouter */}
      <Browse />
    </BrowserRouter>
  );
}

export default App
