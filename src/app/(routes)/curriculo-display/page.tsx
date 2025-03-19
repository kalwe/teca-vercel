"use client";


import ResumeForm from "@/app/components/display/resume-form"

import { Navigation } from "@/app/components/navigation/navigation"

export default function ResumeRoutes() {



  return (
    <div
    style={{
      background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
  }}>
    <Navigation/>
      <ResumeForm

      />
    </div>
  );
}
