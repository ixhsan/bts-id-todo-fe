// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Suspense } from "react";
import { PUBLIC_ROUTES } from "@/constant/routes";

function Loading() {
  return <p>loading...</p>;
}
export const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};
