import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FormDataProvider } from "@/app/context/FormDataContext";
import { EmployeeProvider } from "@/app/context/EmployeeContext";
import { VagasProvider } from "@/app/context/VagasContext";
import { CurriculoProvider } from "@/app/context/CurriculoContext";
import { ReminderProvider } from "@/app/context/ReminderContext";
import { UserProvider } from "@/app/context/UserContext";
import { HoursBankProvider } from "@/app/context/HoursBankContext"; // Added HoursBankProvider
import { LoginProvider } from "@/app/context/LoginContext"; // Import LoginProvider
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
  <LoginProvider> {/* Added LoginProvider */}
    <UserProvider>
      <FormDataProvider>
        <EmployeeProvider>
          <VagasProvider>
            <CurriculoProvider>
              <ReminderProvider>
                <HoursBankProvider>{children}</HoursBankProvider>
              </ReminderProvider>
            </CurriculoProvider>
          </VagasProvider>
        </EmployeeProvider>
      </FormDataProvider>
    </UserProvider>
  </LoginProvider>
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
