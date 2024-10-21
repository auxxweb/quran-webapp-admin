import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import { getUserCredential, publicRoutes } from "../../common/utils";

function Browse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = getUserCredential();
  const getBasePath = (pathname) => {
    const pathParts = pathname.split("/").filter(Boolean);
    return `/${pathParts[0]}`;
  };
  const basePath = getBasePath(location.pathname);
  useEffect(() => {
    if (publicRoutes.includes(basePath)) {
      if (userData) {
        navigate("/");
      } else {
        navigate(location.pathname);
      }
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
    //eslint-disable-next-line
  }, []);

  if (publicRoutes.includes(basePath)) {
    return (
      <div className="flex-1 flex flex-col">
        <ContentArea /> 
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <Header
          className="w-full fixed top-0 left-0 z-10"
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          <main
            className={`flex-1 overflow-y-auto  p-4 ${
              location.pathname === "/" ? "bg-white" : "bg-[#e9fffb]"
            }`}
          >
            <ContentArea />
          </main>
        </div>
      </div>
    );
  }
}

export default Browse;
