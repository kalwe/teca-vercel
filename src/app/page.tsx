// App.js
"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./(routes)/login-display/page";
import { EmployeeProvider } from "./context/EmployeeContext"; // Adjust the path to your context

export default function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}
