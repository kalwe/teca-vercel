"use client"



import VisualizeCV from '@/app/components/display/visualize-resumes';
import '../style.css'
import { useRouter } from "next/navigation";

import { Navigation } from "@/app/components/navigation/navigation";
import ComebackButton from '@/app/components/button/comeback';


export default function Contract() {

/* Change page */

const router = useRouter()

const handleClick = () => {
  router.push('/dashboard-display/')
}


  return (
    <div>
     <Navigation/>
      <VisualizeCV/>
        {/* Botão "Voltar" */}
<ComebackButton/>
    </div>
  );
}
