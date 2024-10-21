import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LiaEdit } from "react-icons/lia";

import avatar from "../../assets/images/avatar.png";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Modal from "../reUsableCmponent/modal/Modal";
import { useUpdatePasswordMutation } from "../../api/auth";
import { toast } from "sonner";
function Header({ toggleSidebar }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatePassword, { isLoading: isLoadingUpdatePassword }] =
    useUpdatePasswordMutation();
  const navigate = useNavigate();
  const handleSignout = () => {
    window.localStorage.removeItem("userCredential");
    navigate("/login");
  };

  const handleChangePasswordClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    const oldPassword = formData.get("oldPassword"); 
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword"); 
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }
    try {
      const body = {
        oldPassword,
        password,
      };
      const updateres = await updatePassword?.(body);
      if (updateres?.data?.success) {
        handleModalClose();
      } else {
        alert(updateres.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <header
      className="flex items-center justify-between p-4"
      style={{ background: "linear-gradient(135deg, #068A55, #16CABB)" }}
    >
      <button
        className="text-gray-200 focus:outline-none lg:hidden"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <svg
        width="41"
        height="43"
        viewBox="0 0 41 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.8461 0.0775834C21.8461 0.0775834 11.8913 -1.40491 4.03832 8.59101C4.03832 8.59101 0.191035 13.7159 0.111811 19.7725C0.111811 19.7725 -1.03823 26.888 4.03832 34.1307C4.03832 34.1307 10.0671 43.4487 21.4894 42.9831C21.4894 42.9831 28.3508 42.8985 34.2605 37.2229C34.2605 37.2229 39.8528 32.098 40.3287 25.3635C40.3287 25.3635 36.5606 32.2672 30.8099 33.7923C30.8099 33.7923 24.3052 36.7147 17.8803 32.9878C17.8803 32.9878 14.6678 31.336 12.5655 27.8203C12.5655 27.8203 15.5797 30.192 18.5146 30.4463C18.5146 30.4463 25.376 31.6324 30.175 26.5922C30.175 26.5922 33.3083 24.3471 35.0139 18.3331C35.0139 18.3331 35.4504 16.9352 35.4105 15.2835C35.4105 15.2835 32.4358 21.9335 25.9316 22.1452C25.9316 22.1452 20.2202 22.8652 16.6904 17.8249C16.6904 17.8249 15.9763 17.3588 14.8661 13.6318C14.8661 13.6318 13.5178 7.32085 17.9201 2.70416C17.9201 2.70416 20.3792 0.374525 21.8467 0.0781363L21.8461 0.0775834Z"
          fill="white"
        />
      </svg>

      <div className="flex items-center space-x-2">
        <img src={avatar} className="h-9 w-9 object-contain rounded-full" />
        <span className="text-white">Admin</span>
        <div className=" group cursor-pointer relative">
          <div>
            <HiDotsVertical className="text-white h-5 w-5" />
          </div>
          <div className="hidden cursor-default w-max max-w-xs group-hover:block absolute right-1 ">
            <div className="p-2  space-y-3  bg-white  rounded-md border border-slate-100 mt-2 shadow-lg  dark:border-slate-50/10 dark:bg-gray-800 dark:text-slate-200">
              <div
                onClick={() => handleChangePasswordClick()}
                className="border-b  p-1 sm:p-2 hover:bg-slate-100 cursor-pointer flex flex-row space-x-1 items-center dark:border-slate-50/25 "
              >
                <LiaEdit className="text-black h-5 w-5 dark:text-white" />{" "}
                <span>Change Password</span>
              </div>
              <div
                onClick={handleSignout}
                className="p-1 sm:p-2 cursor-pointer hover:bg-slate-100 flex space-x-1 items-center dark:hover:bg-slate-400/25"
              >
                <PiSignOut className="text-black h-5 w-5 dark:text-white" />{" "}
                <span>Signout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        modalHeader={"Update Password"}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Old Password
              </label>
              <input
                type="text"
                name="oldPassword"
                id="oldPassword"
                className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="flex justify-center p-6">
            <button
              disabled={isLoadingUpdatePassword}
              type="submit"
              className="bg-[#0EB599] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-3xl"
            >
              {isLoadingUpdatePassword ? "loading..." : "Update"}
            </button>
          </div>
        </form>
      </Modal>
    </header>
  );
}

export default Header;
