import { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { User } from "../types/User";
import HomePage from "../components/pages/home/HomePage";
import LoginPage from "../components/pages/login/LoginPage";

export default function AppRoutes() {
  const { watch } = useFormContext<User>();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const element =
    watch("isLoggedIn") === true || isLoggedIn === "true" ? (
      <HomePage />
    ) : (
      <LoginPage />
    );

  const handleNavigate = useCallback(() => {
    if (
      (watch("isLoggedIn") === true && isLoggedIn === "true") ||
      isLoggedIn === "true"
    ) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate, watch, isLoggedIn]);

  useEffect(() => {
    handleNavigate();
  }, [handleNavigate]);

  return (
    <Routes>
      <Route path="*" element={element} />
      <Route path="/" element={element} />
      <Route path="/login" element={element} />
      <Route path="/home" element={element} />
    </Routes>
  );
}
