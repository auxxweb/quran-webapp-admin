import React from "react";
import DashBoardSection2 from "../DashBoardSection2";
import DashBoard1Top from "../DashBoard1Top";
import DashBoard3Chart from "../DashBoard3Chart";

const DashBoard = () => {
  return (
    <>
        <DashBoard1Top />
      <div className="bg-white rounded-lg border border-gray-300 p-4 w-50 drop-shadow-lg">
        <DashBoardSection2 />
      </div>
      <DashBoard3Chart />

    </>
  );
};

export default DashBoard;
