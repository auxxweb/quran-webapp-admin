import React, { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import ContentArea from "./ContentArea"

function Browse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex-1 flex flex-col">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex h-[100%] bg-[#212529] ">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 bg-[#e9fffb]">
          <ContentArea /> {/* ContentArea now gets the router context */}
        </main>
      </div>
    </div>
  );
}

export default Browse;
