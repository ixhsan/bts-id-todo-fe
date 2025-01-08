// src/components/AuthNavigation.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constant/routes";

export const AuthNavigation = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(PRIVATE_ROUTES.TODOS);
    } else {
      navigate(PUBLIC_ROUTES.LOGIN);
    }
  }, [token, navigate]);

  return null;
};
