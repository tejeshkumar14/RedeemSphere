import React from "react";
import { useState } from "react";
import { createBrowserRouter , RouterProvider } from "react-router-dom"
import HomePage from "./components/HomePage";
import CouponsPage from "./components/CouponsPage";
import OfferPage from "./components/OfferPage";
import HelpPage from "./components/HelpPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const router = createBrowserRouter( // contains arrays of paths
    [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/coupons",
        element:
          <CouponsPage />
      },
      {
        path: "/offer",
        element:
          <OfferPage />
      },
      {
        path: "/help",
        element:
          <HelpPage />
      },
      {
        path: "/login",
        element:
          <LoginPage setUser={setUser}/>
      },
      {
        path: "/register",
        element:
          <RegisterPage />
      },
      {
        path: "/profile",
        element:
          <ProfilePage />
      },
      {
        path: "*",
        element:
          <h1>Page Not Found</h1>
      }
    ]
  );
  return (
    <RouterProvider router={router} />
  );
};

export default App;