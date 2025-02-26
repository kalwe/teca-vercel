"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./(routes)/login-display/page";
import { EmployeeProvider } from "./context/EmployeeContext";
import { LoginProvider } from "./context/LoginContext";

export default function App() {
  return (
    <LoginProvider> {/* Wrapping with LoginProvider */}
      <EmployeeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
      </EmployeeProvider>
    </LoginProvider>
  );
}
