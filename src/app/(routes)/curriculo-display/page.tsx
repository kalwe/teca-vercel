"use client";


import CvForm from "@/app/components/display/cv-form";

import { Navigation } from "@/app/components/navigation/navigation";

export default function CvRoutes() {



  return (
    <div
    style={{
      background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
  }}>
    <Navigation/>
      <CvForm
         mode="create"

         isEditable={true}
      />
    </div>
  );
}
