// src/Router.tsx
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "@/components/BaseLayout";
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from "@/constant/routes";
import { ErrorPage } from "@/components/ErrorPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { lazyRoute } from "@/helper/lazy";

// Public routes
const publicRoutes: RouteObject[] = [
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PUBLIC_ROUTES.LOGIN,
        lazy: lazyRoute(() => import("@/pages/LoginPage"), "LoginPage"),
      },
      {
        path: PUBLIC_ROUTES.REGISTER,
        lazy: lazyRoute(() => import("@/pages/RegisterPage"), "RegisterPage"),
      },
    ],
  },
];

// Protected routes
const protectedRoutes: RouteObject[] = [
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PRIVATE_ROUTES.TODOS,
            lazy: lazyRoute(() => import("@/pages/TodosPage"), "TodosPage"),
          },
        ],
      },
    ],
  },
];

const Routes: RouteObject[] = [...publicRoutes, ...protectedRoutes];
const router = createBrowserRouter(Routes);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
