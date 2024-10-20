import React from "react";
import DashBoardSection2 from "../DashBoardSection2";
import DashBoard3Chart from "../DashBoard3Chart";

const DashBoard = () => {
  return (
    <>
        {/* <DashBoard1Top /> */}
      <div className="p-4 w-50">
        <DashBoardSection2 />
      </div>
      <DashBoard3Chart />

    </>
  );
};

export default DashBoard;
