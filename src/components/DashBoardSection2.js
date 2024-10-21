import React, { useEffect, useState } from "react";
import { useGetDashboardDetailQuery } from "../api/dashboard";
import participats from '../assets/images/participats.png'
import judges from '../assets/images/judges.png'
import zones from '../assets/images/zones.png'
const DashBoardSection2 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { data, refetch, isLoading } = useGetDashboardDetailQuery();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the time as HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Function to add the suffix to the day (st, nd, rd, th)
  const formatDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`; // Special case for 11th-19th
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  // Get the current date
  const currentDate = new Date();
  const dayWithSuffix = formatDayWithSuffix(currentDate.getDate());
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <>
      <div className="flex flex-col space-y-4 sm:flex-row md:space-y-0">
        {/* Left Column (Large Section) */}
        <div className="w-full sm:w-96 px-2 py-5 text-left bg-white shadow-md border border-gray-300 gap-4  mr-4 flex flex-col items-center justify-center rounded-2xl">
          <div className="text-gray-500 text-3xl font-light pl-7 ">
            {formattedTime}
          </div>

          <div className="text-left">
            <span className="mx-4 pl-7 cursor-pointer text-xl text-left">Today</span>
            <div className="flex justify-center items-center text-xl  text-gray-700">
              {/* Left arrow */}
              <span className="mx-4 cursor-pointer text-xl">&lt;</span>

              {/* Date */}
              <span>{`${dayWithSuffix} ${month} ${year}`}</span>

              {/* Right arrow */}
              <span className="mx-4 cursor-pointer text-xl">&gt;</span>
            </div>
          </div>
        </div>

        {/* Right Column (Grid of 6 items in 2 rows, 3 columns) */}
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl flex items-center space-x-3 justify-between shadow-md border border-gray-300">
            <div className="flex flex-col ">
              <h2 className="text-3xl font-semibold">
                {data?.data?.participants}
              </h2>

              <p className=" text-black ">Total Participants</p>
            </div>{" "}
            <div>
              <img src={participats} className="h-9 w-9 object-contain"/>
    
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl flex items-center space-x-3 justify-between shadow-md border border-gray-300">
            <div className="flex flex-col ">
              <h2 className="text-3xl font-semibold">
                {data?.data?.judges}
              </h2>

              <p className=" text-black ">Total Judges</p>
            </div>{" "}
            <div>
            <img src={judges} className="h-9 w-9 object-contain"/>

            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl flex items-center space-x-3 justify-between shadow-md border border-gray-300">
            <div className="flex flex-col ">
              <h2 className="text-3xl font-semibold">
                {data?.data?.zones}
              </h2>

              <p className=" text-black ">Total Zones</p>
            </div>{" "}
            <div>
            <img src={zones} className="h-9 w-9 object-contain"/>

            </div>
          </div>
       
        </div>
      </div>
    </>
  );
};

export default DashBoardSection2;
