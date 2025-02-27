"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./(routes)/login-display/page";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider> {/* Wrapping with AuthProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}
