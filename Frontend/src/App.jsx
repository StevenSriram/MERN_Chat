import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { NavBar, DotLoader, Authorization } from "./components";
import {
  HomePage,
  SignUpPage,
  LoginPage,
  SettingsPage,
  ProfilePage,
} from "./pages";
import { Toaster } from "react-hot-toast";

import useAuthStore from "./store/useAuthStore";

const App = () => {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    checkAuth().finally(() => setAppReady(true));
  }, [checkAuth]);

  if (isCheckingAuth || !appReady) {
    return <DotLoader />;
  }

  return (
    <main>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <Authorization>
              <HomePage />
            </Authorization>
          }
        />

        <Route
          path="/signup"
          element={
            <Authorization>
              <SignUpPage />
            </Authorization>
          }
        />
        <Route
          path="/login"
          element={
            <Authorization>
              <LoginPage />
            </Authorization>
          }
        />

        <Route
          path="/settings"
          element={
            <Authorization>
              <SettingsPage />
            </Authorization>
          }
        />
        <Route
          path="/profile"
          element={
            <Authorization>
              <ProfilePage />
            </Authorization>
          }
        />
      </Routes>

      <Toaster />
    </main>
  );
};
export default App;
