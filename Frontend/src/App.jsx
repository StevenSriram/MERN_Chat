import { Routes, Route } from "react-router-dom";
import React from "react";

import { Toaster } from "react-hot-toast";

import { NavBar, DotLoader } from "./components";
import {
  HomePage,
  SignUpPage,
  LoginPage,
  SettingsPage,
  ProfilePage,
} from "./pages";
const App = () => {
  return (
    <main>
      <NavBar />

      <Routes>
        <Route path="/" element={<DotLoader />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Toaster />
    </main>
  );
};
export default App;
