import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {  Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./assets/Components/Signup/Signup.jsx";
const router = createBrowserRouter([
  {path:"/",element:<App/>,
  children:[{
    path:"/",element:<App/>
  }]
},{
  path:"/signup",element:<Signup/>
}
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}><Outlet></Outlet></RouterProvider>
  </React.StrictMode>
);
