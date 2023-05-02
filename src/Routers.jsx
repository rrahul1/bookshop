import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import List from "./pages/List";
import BookDetails from "./pages/BookDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/book/list" element={<List />} />
      <Route path="/books/view/:bookId" element={<BookDetails />} />
      <Route path="/book/orders" element={<Orders />} />
      <Route path="/books/orders/:bookId" element={<OrderDetails />} />
    </Routes>
  );
}

export default Routers;
