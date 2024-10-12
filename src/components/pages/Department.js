import React, { useState } from "react";
import Modal from "../reUsableCmponent/modal/Modal";

const Department = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDesignation, setSelectedDesignation] =
    useState("Total Project : 3");

  const selectRole = () => {
    setSelectedDesignation("");
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const selectProfession = (event) => {
    setSelectedDesignation(event.target.value);
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Departments</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] hover:bg-[#1ae69b] text-white rounded-full p-2 cursor-pointer"
              onClick={toggleModal}
            >
              + Add Department
            </span>
          </span>
        </div>
      </div>
      <div className="flex justify-end ml-auto space-x-6 p-4">
        <span className="flex items-center">
          <select
            value={selectedDesignation}
            onChange={selectProfession}
            className="rounded p-2 lg:w-[150px] w-full appearance-none bg-white border border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M12 5l-5 5-5-5' /%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              paddingRight: "40px",
            }}
          >
            <option value="" disabled className="text-gray-500 font-bold">
              All
            </option>
            <option value="All">All</option>
            <option value="Web Designer">Web Designer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="FrontEnd Developer">FrontEnd Developer</option>
            <option value="FrontEnd Developer">BackEnd Developer</option>
          </select>
        </span>
        <span className="flex items-center">
          <span
            onClick={selectRole}
            className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[228px] rounded text-center"
          >
            Search
          </span>
        </span>
      </div>
      <div className="overflow-x-auto">
  <table className="min-w-full table-auto border-separate border-spacing-y-2">
    <thead className="bg-teal-50">
      <tr>
        <th className="px-4 py-2 text-left">#</th>
        <th className="px-4 py-2 text-left">Department List</th>
        <th className="px-4 py-2 text-left">Department Head</th>
        <th className="px-4 py-2 text-left">Total Employee</th>
        <th className="px-4 py-2 text-left">Employees</th>
        <th className="px-4 py-2 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-teal-100">
        <td className="px-4 py-2">01</td>
        <td className="px-4 py-2">Web Development</td>
        <td className="px-4 py-2 flex items-center">
          <img alt="img" src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full mr-2" />
          Bernardo Galaviz
        </td>
        <td className="px-4 py-2">12</td>
        <td className="px-4 py-2">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/40" alt="pic" className="w-8 h-8 rounded-full border border-white" />
            <img src="https://i.pravatar.cc/41" alt="pic" className="w-8 h-8 rounded-full border border-white" />
            <img src="https://i.pravatar.cc/42" alt="pic" className="w-8 h-8 rounded-full border border-white" />
          </div>
        </td>
        <td className="px-4 py-2 text-right">
          <button className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01"></path>
            </svg>
          </button>
        </td>
      </tr>
      <tr className="bg-white">
        <td className="px-4 py-2">02</td>
        <td className="px-4 py-2">Marketing</td>
        <td className="px-4 py-2 flex items-center">
          <img alt="pics" src="https://i.pravatar.cc/43" className="w-8 h-8 rounded-full mr-2" />
          John Doe
        </td>
        <td className="px-4 py-2">07</td>
        <td className="px-4 py-2">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/44" alt="img" className="w-8 h-8 rounded-full border border-white" />
            <img src="https://i.pravatar.cc/45" alt="img" className="w-8 h-8 rounded-full border border-white" />
            <img src="https://i.pravatar.cc/46" alt="img" className="w-8 h-8 rounded-full border border-white" />
          </div>
        </td>
        <td className="px-4 py-2 text-right">
          <button className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01"></path>
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>


      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        modalHeader={"Add Department"}
      >
        <form className="space-y-4">

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="empDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                name="empDescription"
                id="empDescription"
                className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="empDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                name="empDescription"
                id="empDescription"
                className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="empDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                name="empDescription"
                id="empDescription"
                className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="empDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                name="empDescription"
                id="empDescription"
                className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
        </form>
      </Modal>
    </>
  );
};

export default Department;
