import { useState } from "react";
import { DropDownBurger } from "../DropDown/dropdown-burger";

export function Navigation(){
    
    /* burger action */

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

    return (

        <div>
             {/* Navbar */}
      <nav
           style={{ backgroundColor: '#53594BCC' }}
           className="w-full border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
         >
           <div className="flex items-center justify-between px-4 py-3">
             <a href="#" className="text-2xl font-semibold whitespace-nowrap text-white">
               COIF
             </a>
              {/* Botão Hamburger */}
              <button
     onClick={toggleMenu}
     className="fixed top-4 right-4 z-50 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-lg"
   >
     <div className="relative w-[20px] h-[20px]">
       {/* Linha diagonal 1 */}
       <span
         className={`absolute top-1/2 left-1/2 bg-white w-[20px] h-[2px] rounded transform transition-transform duration-300 ${
           isMenuOpen
             ? "rotate-45 -translate-x-1/2 -translate-y-1/2"
             : "-translate-x-1/2 -translate-y-[6px]"
         }`}
       ></span>
       {/* Linha diagonal 2 */}
       <span
         className={`absolute top-1/2 left-1/2 bg-white w-[20px] h-[2px] rounded transform transition-transform duration-300 ${
           isMenuOpen
             ? "-rotate-45 -translate-x-1/2 -translate-y-1/2"
             : "-translate-x-1/2 translate-y-[6px]"
         }`}
       ></span>
     </div>
   </button>
   
   
   
           <DropDownBurger isOpen={isMenuOpen}/>
           </div>
         </nav>
   
        </div>
    )
}