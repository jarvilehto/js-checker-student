import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleAssg, { loader as assgLoader } from "./singleAssg";
import ErrorPage from "./pages/error-page";
import MainPage from "./MainPage";
import "./css/index.css";
import "./css/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test/:testId",
    element: <SingleAssg />,
    loader: assgLoader,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
