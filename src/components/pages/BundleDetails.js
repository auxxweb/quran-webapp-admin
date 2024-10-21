import { useLocation, useNavigate } from "react-router-dom";
import { useGetBundleDetailQuery } from "../../api/bundle";
import Modal from "../reUsableCmponent/modal/Modal";
import { useState } from "react";

const BundleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bundleId = location.pathname?.split("/")[2];
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { data } = useGetBundleDetailQuery(bundleId);
  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };

  return (
    <>
      <svg
        onClick={() => navigate("/bundles")}
        className="cursor-pointer mb-4"
        width="13"
        height="22"
        viewBox="0 0 13 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.505997 9.77797L10.284 0L12.728 2.44406L4.17209 11L12.728 19.5559L10.284 22L0.505997 12.222C0.181958 11.8979 -7.72476e-05 11.4583 -7.72476e-05 11C-7.72476e-05 10.5417 0.181958 10.1021 0.505997 9.77797Z"
          fill="black"
        />
      </svg>
      <div className="m-4 mx-auto bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200">
        <div className="flex items-start">
          <div className="flex">
            <div className="w-40 h-40 rounded-[15px] overflow-hidden border-2 border-gray-300">
              <img
                src="/bundle.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 mt-6 space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.bundle?.title}
              </h2>
              <div>
                <span className="font-semibold text-gray-600">Bundle Id: </span>
                <a href="tel:9876543210" className="text-green-500 ml-6">
                  {data?.bundle?.bundleId}
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-600">
                  No Of Questions:
                </span>
                <a
                  href="mailto:hari@example.com"
                  className="text-green-500 ml-6">
                  {data?.bundle?.questions?.length}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-white ">
            <tr className="">
              <th className="px-4 py-2 text-left font-medium">Qs ID</th>
              <th className="px-4 py-2 text-center font-medium">Question</th>
              <th className="px-4 py-2 text-center font-medium">Answers</th>
              <th className="px-4 py-2 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="border-[2px] border-opacity-50 border-[#969696]">
            {data?.bundle?.questions?.map((question, index) => (
              <tr
                className="font-light odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}>
                <td className="w-6 px-4 py-2">{question?.questionId}</td>
                <td className="px-4 py-2 flex justify-center items-center">
                  {question?.question}
                </td>
                <td className="px-4 py-2 text-center">{question?.answer}</td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => handleDeleteClick(question?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
        <h3 className="flex self-center text-lg font-bold">
          Are you sure want to Delete?
        </h3>
        <div className="flex justify-center p-6">
          <button
            onClick={handleDeleteModalClose}
            type="submit"
            className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl">
            No
          </button>
          <button
            // disabled={isLoadingDelete}
            // onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl">
            YES
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BundleDetails;
