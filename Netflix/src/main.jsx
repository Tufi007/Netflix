import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./assets/Components/Loginin/login.jsx";
import Body, { loadInitialData } from "./assets/Components/Body/Body.jsx";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./assets/Components/Signup/Signup.jsx";
import axios from "axios";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Body />,
        loader: loadInitialData,
      },
    ],
  },
  { path: "/login", element: <Login></Login> },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
