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

  useEffect(() => {
    if (publicRoutes.includes(location.pathname)) {
      if (userData) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
    //eslint-disable-next-line
  }, []);

  if (publicRoutes.includes(location.pathname)) {
    return (
      <div className="flex-1 flex flex-col">
        <ContentArea /> {/* ContentArea now gets the router context */}
      </div>
    );
  } else {
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
}

export default Browse;
