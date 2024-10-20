import React from "react";
import BarChart from "./reUsableCmponent/barChart";

const DashBoard3Chart = () => {
  return (
    <>
      <div className="mt-4">
        {/* Your content for the first column */}
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
          <div className="flex flex-col items-center bg-white p-6 w-full max-w-md mx-auto">
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard3Chart;
