import React from "react";
// import { employeeData } from "../../api/constents";
import { useNavigate } from "react-router-dom";

const GridView = ({ selectedDesignation, selectedRole }) => {
  // Filter employees based on selectedDesignation
  //   const filteredEmployees = (selectedDesignation === "" || selectedDesignation === "All")
  //   ? employeeData
  //   : employeeData.filter(employee => employee.role === selectedDesignation);
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-wrap justify-center cursor-pointer"
      onClick={() => navigate("/developerdetails")}
    >
      {/* Parent wrapper for the grid layout */}
      <div className="m-2 bg-white shadow-md rounded-[40px] rounded-tr-none p-4 sm:p-6 md:p-4 w-[227px] h-[210px]">
        <div className="text-center items-center sm:flex-col md:flex-row">
          <img
            src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
            alt="name"
            className="w-20 h-20 rounded-full mb-4 sm:mb-4 md:ml-14"
          />
          <h2 className="text-lg font-bold">name</h2>
          <p className="text-gray-700">designation</p>
        </div>
      </div>
      <div className="m-2 bg-white shadow-md rounded-[40px] rounded-tr-none p-4 sm:p-6 md:p-4 w-[227px] h-[210px]">
        <div className="text-center items-center sm:flex-col md:flex-row">
          <img
            src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
            alt="name"
            className="w-20 h-20 rounded-full mb-4 sm:mb-4 md:ml-14"
          />
          <h2 className="text-lg font-bold">name</h2>
          <p className="text-gray-700">designation</p>
        </div>
      </div>
      <div className="m-2 bg-white shadow-md rounded-[40px] rounded-tr-none p-4 sm:p-6 md:p-4 w-[227px] h-[210px]">
        <div className="text-center items-center sm:flex-col md:flex-row">
          <img
            src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
            alt="name"
            className="w-20 h-20 rounded-full mb-4 sm:mb-4 md:ml-14"
          />
          <h2 className="text-lg font-bold">name</h2>
          <p className="text-gray-700">designation</p>
        </div>
      </div>
      <div className="m-2 bg-white shadow-md rounded-[40px] rounded-tr-none p-4 sm:p-6 md:p-4 w-[227px] h-[210px]">
        <div className="text-center items-center sm:flex-col md:flex-row">
          <img
            src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
            alt="name"
            className="w-20 h-20 rounded-full mb-4 sm:mb-4 md:ml-14"
          />
          <h2 className="text-lg font-bold">name</h2>
          <p className="text-gray-700">designation</p>
        </div>
      </div>
      <div className="m-2 bg-white shadow-md rounded-[40px] rounded-tr-none p-4 sm:p-6 md:p-4 w-[227px] h-[210px]">
        <div className="text-center items-center sm:flex-col md:flex-row">
          <img
            src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
            alt="name"
            className="w-20 h-20 rounded-full mb-4 sm:mb-4 md:ml-14"
          />
          <h2 className="text-lg font-bold">name</h2>
          <p className="text-gray-700">designation</p>
        </div>
      </div>
    </div>
  );
};

export default GridView;
