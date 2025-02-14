import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { EmployeeProvider } from "@/app/context/EmployeeContext";
import { VacancyProvider } from "@/app/context/VacancyContext";
import { ResumeProvider } from "./context/CurriculoContext";
import { ReminderProvider } from "@/app/context/ReminderContext";
import { UserProvider } from "@/app/context/UserContext";
import { HoursBankProvider } from "@/app/context/HoursBankContext"; // Added HoursBankProvider
import { AuthProvider } from "./context/LoginContext";
import "./globals.css";

// Font Configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamic Metadata
export const metadata: Metadata = {
  title: "COIF Dashboard",
  description: "Centralized dashboard for employees, reminders, and tasks.",
};

// Encapsulate Providers
const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider> {/* Added AuthProvider */}
    <UserProvider>

        <EmployeeProvider>
          <VacancyProvider>
            <ResumeProvider>
              <ReminderProvider>
                <HoursBankProvider>{children}</HoursBankProvider>
              </ReminderProvider>
            </ResumeProvider>
          </VacancyProvider>
        </EmployeeProvider>

    </UserProvider>
  </AuthProvider>
);

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        {/* Wrapping the entire application */}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
