import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FormDataProvider } from "@/app/context/FormDataContext";
import { EmployeeProvider } from "@/app/context/EmployeeContext";
import { VagasProvider } from "@/app/context/VagasContext";
import { CurriculoProvider } from "@/app/context/CurriculoContext";
import { ReminderProvider } from "@/app/context/ReminderContext";
import { UserProvider } from "@/app/context/UserContext"; // Add User Provider
import "./globals.css";

// Configuração de fontes
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
  <UserProvider>
    <FormDataProvider>
      <EmployeeProvider>
        <VagasProvider>
          <CurriculoProvider>
            <ReminderProvider>{children}</ReminderProvider>
          </CurriculoProvider>
        </VagasProvider>
      </EmployeeProvider>
    </FormDataProvider>
  </UserProvider>
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
