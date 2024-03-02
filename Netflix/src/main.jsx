import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./assets/Components/Loginin/login.jsx";
import Body, { loadInitialData } from "./assets/Components/Body/Body.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./assets/Components/Signup/Signup.jsx";
import { Provider } from "react-redux";
import store from "./assets/Store/Mainstore.jsx";
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
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
