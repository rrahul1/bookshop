import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routers from "./Routers";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routers />
    </>
  );
}

export default App;
