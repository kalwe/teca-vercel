import { motion } from "framer-motion";


interface DropDownBurgerProps {
    isOpen: boolean;
  }
  
  export function DropDownBurger({ isOpen }: DropDownBurgerProps) {
    return (
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: isOpen ? 0 : "-100%", opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full h-full bg-[#2F3E29] bg-opacity-90 z-40 backdrop-blur-md"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 text-lg text-white font-semibold">
          <ul className="space-y-6 text-center">
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Usuário
            </li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Vagas
            </li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Banco de Horas
            </li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Lembretes
            </li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Banco de Currículos
            </li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Suporte
            </li>
            <li className="hover:text-red-500 transition duration-300 cursor-pointer">
              Sair
            </li>
          </ul>
        </div>
      </motion.div>
    );
  }
  