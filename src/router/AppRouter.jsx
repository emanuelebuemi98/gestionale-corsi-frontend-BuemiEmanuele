import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { NotFound } from "../pages/NotFound/NotFound";
import { CoursesPage } from "../pages/Courses/CoursesPage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { LoginPage } from '../pages/Login/LoginPage';
import { Layout } from "../components/layouts/MainLayout/Layout";
import { AuthContextProvider } from "../contexts/AuthContext/AuthContextProvider";
import { UserAccess } from "../pages/UserAccess/UserAccess";
import { ProtectedRoute } from '../components/ProtectedRoute';
import { UserPage } from '../pages/Users/UsersPage';


export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: (
        <AuthContextProvider>
          <Layout />
        </AuthContextProvider>
      ),
      children: [
        {
          path: "/",
          children: [
            {
              path: "",
              element: <UserAccess />
            },
            {
              path: "home",
              element: <ProtectedRoute><Home /> </ProtectedRoute>
            },
            {
              path: "login",
              element: <LoginPage/>
            },
            {
              path: "register",
              element: <RegisterPage/>
            },
            {
              path: "users",
              element: <ProtectedRoute><UserPage/></ProtectedRoute>
            },
            {
              path: "courses/",
              element: <ProtectedRoute><CoursesPage/></ProtectedRoute>
            },
          ]
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return <RouterProvider router={router} />;
};
