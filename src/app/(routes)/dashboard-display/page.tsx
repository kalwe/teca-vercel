"use client";

import DashboardDisplay from "@/app/components/display/dashboard-display";



export default function Home() {

  return (
    <div
      className="p-0 overflow-auto h-screen"
      style={{
        background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
      }}
    >
     <DashboardDisplay/>
    </div>
  );
}
