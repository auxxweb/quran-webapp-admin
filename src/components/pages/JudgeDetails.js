import { useLocation, useNavigate } from "react-router-dom";
import {
  useBlockJudgeMutation,
  useGetJudgeDetailQuery,
  useUpdateJudgePasswordMutation,
} from "../../api/judges";
import { BiSolidDownArrow } from "react-icons/bi";
import Modal from "../reUsableCmponent/modal/Modal";
import { useState } from "react";

const JudgeDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const judgeId = location.pathname?.split("/")[2];
  console.log("judgeId", judgeId);
  const { data, refetch, isLoading } = useGetJudgeDetailQuery(judgeId);
  const [blockJudge, { isLoading: isLoadingBlock }] = useBlockJudgeMutation();
  const [updatePassword, { isLoading: isLoadingUpdatePassword }] =
    useUpdateJudgePasswordMutation();
  console.log("data", data);
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleBlockJudge = async (id) => {
    try {
      const body = {
        judgeId: id,
      };
      const deleteres = await blockJudge?.(body);
      if (deleteres?.data?.success) {
        refetch();
      } else {
        alert(deleteres.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    try {
      const body = {
        judgeId: data?.judge?._id,
        password,
        confirmPassword,
      };
      const updateres = await updatePassword?.(body);
      if (updateres?.data?.success) {
        refetch();
        handleModalClose();
      } else {
        alert(updateres.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <svg
        onClick={() => navigate("/judges")}
        className="cursor-pointer mb-4"
        width="13"
        height="22"
        viewBox="0 0 13 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.505997 9.77797L10.284 0L12.728 2.44406L4.17209 11L12.728 19.5559L10.284 22L0.505997 12.222C0.181958 11.8979 -7.72476e-05 11.4583 -7.72476e-05 11C-7.72476e-05 10.5417 0.181958 10.1021 0.505997 9.77797Z"
          fill="black"
        />
      </svg>
      <div className="m-4 mx-auto bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200">
        <div className="flex items-start">
          <div>
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.judge?.name}
              </h2>
              <p className="text-gray-500 mt-1 flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-10 10a1 1 0 01-.581.293l-5 1a1 1 0 01-1.212-1.212l1-5a1 1 0 01.293-.581l10-10zM16 4l-3 3-1-1 3-3 1 1z" />
                </svg>
                {data?.judge?.zone?.name}
              </p>
            </div>
          </div>
          {/* Profile Picture */}

          {/* Contact Details */}
          <div className="flex flex-col flex-end">
            <div className="mt-4 space-y-2">
              <div>
                <span className="font-semibold text-gray-600">Phone: </span>
                <a href="tel:9876543210" className="text-green-500">
                  {data?.judge?.phone}
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Email: </span>
                <a href="mailto:hari@example.com" className="text-green-500">
                  {data?.judge?.email}
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Address: </span>
                <p>{data?.judge?.address}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Gender: </span>
                <p>{data?.judge?.gender}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Password: </span>
                <p>{data?.judge?.password}</p>
              </div>
            </div>

            {/* Status and Update Password */}
            <div className="ml-6 mt-6 flex flex-end">
              {/* Status Dropdown */}
              <button
                disabled={isLoadingBlock || isLoading}
                onClick={() => handleBlockJudge(data?.judge?._id)}
                className={`py-2 px-5 flex space-x-2 items-center ${
                  data?.judge?.isBlocked
                    ? " text-[#FF0404] border-[#FF0404]"
                    : "  border-[#1DB290] text-[#1DB290]"
                } rounded-full  border `}
              >
                <span>
                  {isLoadingBlock
                    ? "loading..."
                    : data?.judge?.isBlocked
                    ? "Blocked"
                    : "Unblocked"}
                </span>
                <BiSolidDownArrow className="text-black" />
              </button>

              {/* Update Password Button */}
              <button
                onClick={() => setIsModalVisible(true)}
                className="ml-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                UPDATE PASSWORD
              </button>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
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
    </>
  );
};

export default JudgeDetails;
