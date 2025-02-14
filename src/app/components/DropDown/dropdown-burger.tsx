"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext"; // Import the user context
import { DropDownBurgerProps } from "@/app/types/dropdown";


export function DropDownBurger({ isOpen }: DropDownBurgerProps) {
  const router = useRouter();
  const { loggedInUser } = useUserContext(); // Access the logged-in user

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: isOpen ? 0 : "-100%", opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-full bg-[#2F3E29] bg-opacity-90 z-40 backdrop-blur-md"
    >
      <div className="flex flex-col items-center justify-center h-full space-y-6 text-lg text-white font-semibold">
        {/* Display the username if logged in */}
        {loggedInUser && (
          <div className="text-center text-xl font-bold">

            <p>{loggedInUser.name}</p>
          </div>
        )}

        <ul className="space-y-6 text-center">
          <li
            className="hover:text-gray-300 transition duration-300 cursor-pointer"
            onClick={() => router.push('/user-display/user-list')} // Absolute path
          >
            Usuário
          </li>
          <li
            className="hover:text-gray-300 transition duration-300 cursor-pointer"
            onClick={() => router.push('/vagas-display/')} // Absolute path
          >
            Vacancy
          </li>
          <li
            className="hover:text-gray-300 transition duration-300 cursor-pointer"
            onClick={() => router.push('/hoursbank-display/')}
          >
            Banco de Horas
          </li>
          <li
            className="hover:text-gray-300 transition duration-300 cursor-pointer"
          >
            Lembretes
          </li>
          <li
            className="hover:text-gray-300 transition duration-300 cursor-pointer"
            onClick={() => router.push('/curriculo-display/visualize-resume')}
          >
            Banco de Currículos
          </li>
          <li
            className="hover:text-gray-300 transition duration-300 cursor-pointer"
          >
            Suporte
          </li>
          <li
            className="hover:text-red-500 transition duration-300 cursor-pointer"
            onClick={() => router.push('/login-display/')}
          >
            Sair
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
