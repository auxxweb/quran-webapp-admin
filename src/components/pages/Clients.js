import React, { useState } from 'react'
import Modal from '../reUsableCmponent/modal/Modal'
import EmpCard from '../reUsableCmponent/EmpCard'

const Clients = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };



  return (
    <>
    <div className="flex rounded-lg p-4">
    <h2 className="text-2xl font-semibold text-gray-700">Clients</h2>
    <div className="ml-auto flex items-center space-x-4">
      {" "}

      <span className="flex items-center">
        <span
          className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
          onClick={toggleModal}
        >
          + Add Employees
        </span>

        <Modal isVisible={isModalVisible} onClose={toggleModal} modalHeader={'Add Client'}>
        <form className="space-y-4">
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="First Name"
        required
      />
    </div>
    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Last Name"
        required
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Username"
        required
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Email"
        required
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Password"
        required
      />
    </div>
    <div>
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Confirm Password"
        required
      />
    </div>
  </div>

  <div>
    <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
      Client ID
    </label>
    <input
      type="text"
      name="clientId"
      id="clientId"
      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="Client ID"
      required
    />
  </div>

  <div>
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
      Phone
    </label>
    <input
      type="tel"
      name="phone"
      id="phone"
      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="Phone Number"
      required
    />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
        Address
      </label>
      <input
        type="text"
        name="address"
        id="address"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Address"
        required
      />
    </div>
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <input
        type="text"
        name="location"
        id="location"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Location"
        required
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
        Company Name
      </label>
      <input
        type="text"
        name="companyName"
        id="companyName"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Company Name"
        required
      />
    </div>
    <div>
      <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
        Designation
      </label>
      <input
        type="text"
        name="designation"
        id="designation"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Designation"
        required
      />
    </div>
  </div>

  <div className="flex justify-end">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Submit
    </button>
  </div>
</form>
        </Modal>
      </span>
    </div>

  </div>
  <div className="ml-auto lg:mr-4 flex items-center space-x-8 justify-end">
  {/* Parent div for span elements */}
  <span className="flex items-center justify-center">
    <input
      className="p-2 lg:w-[300px] w-full appearance-none bg-white border border-gray-500"
      placeholder="Employee Name, Id"
    />
  </span>
  <span className="flex items-center">
    <span
      className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[250px] text-center"
    >
      Search
    </span>
  </span>
</div>

<div className="flex flex-wrap justify-center mt-4">
        <EmpCard
          selectedRole={''}
          selectedDesignation={'client'}
          isGrid={true}
        />
      </div>
  </>
  )
}

export default Clients
