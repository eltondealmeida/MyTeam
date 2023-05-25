import { Routes, Route, useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { User } from "../types/User";
import HomePage from "../components/pages/home/HomePage";
import LoginPage from "../components/pages/login/LoginPage";
import { useEffect, useCallback } from "react";

export default function AppRoutes() {
  const { watch } = useFormContext<User>();

  const navigate = useNavigate();

  const patch = "*" || "/home" || "/login";
  const element = watch("isLoggedIn") ? <HomePage /> : <LoginPage />;

  const handleNavigate = useCallback(() => {
    if (watch("isLoggedIn")) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate, watch]);

  useEffect(() => {
    handleNavigate();
  }, [handleNavigate]);

  return (
    <Routes>
      <Route path={patch} element={element} />
    </Routes>
  );
}
