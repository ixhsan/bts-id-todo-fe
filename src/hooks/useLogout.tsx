// src/hooks/useLogout.ts
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/features/auth/authSlice";
import { PUBLIC_ROUTES } from "@/constant/routes";
import { useToast } from "./useToast";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Clear any persistent data
      dispatch(logout());

      // Show success message
      toast({
        title: "Success",
        description: "Logged out successfully",
      });

      // Redirect to login
      navigate(PUBLIC_ROUTES.LOGIN);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout. Please try again.",
      });
    }
  };

  return { handleLogout };
};
