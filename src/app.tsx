import React from "react";
import "./styles/main.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Categories from "./pages/categories";
import Category from "./pages/category";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categories/:category",
    element: <Category />,
  },

]);

const App = () => {
  return (
    <div className = "App">
      <Navbar />
      <RouterProvider router = {router} />
      <Footer />
    </div>
  );
};

export default App;
