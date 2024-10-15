import { useState } from "react";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import { BiSolidDownArrow } from "react-icons/bi";

import {
  useAddJudgeMutation,
  useDeleteJudgeMutation,
  useEditJudgeMutation,
  useGetJudgesQuery,
} from "../../api/judges";
import { useDebouncedCallback } from "use-debounce";

const Judges = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedJudgeId, setSelectedJudgeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2;

  const { data, isLoading, refetch } = useGetJudgesQuery({
    limit,
    page: currentPage,
    search: searchValue,
  });
  const [addJudge, { isLoading: isLoadingMutation }] = useAddJudgeMutation({});
  const [deleteJudge, { isLoading: isLoadingDelete }] = useDeleteJudgeMutation();
  const [EditJudge, { isLoading: isLoadingEdit }] = useEditJudgeMutation();
  const [blockJudge, { isLoading: isLoadingBlock }] = useEditJudgeMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const name = formData.get("fullName"); // Get email input value
    const email = formData.get("email");
    const phone = formData.get("phoneNumber");
    const address = formData.get("address");
    const gender = formData.get("gender");
    // const zone = formData.get("zone");
    const isMain = !!formData.get("isMain");

    try {
      if (editPopupData) {
        const body = {
          name,
          email,
          phone,
          address,
          gender,
          zone: ["670e5df063e12ac02509fc9b"],
          isMain,
        };
        const res = await EditJudge?.(body);
        if (res?.data?.success) {
          refetch();
          toggleModal();
          setEditPopupData(null);
        } else {
          alert(res.data.message);
        }
      } else {
        const body = {
          name,
          email,
          phone,
          address,
          gender,
          zone: ["670e5df063e12ac02509fc9b"],
          isMain,
        };
        const res = await addJudge?.(body);
        if (res?.data?.success) {
          refetch();
          toggleModal();
        } else {
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditClick = (zone) => {
    toggleModal();
    setEditPopupData(zone);
  };

  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedJudgeId(id);
  };
  const handleDelete = async () => {
    try {
      const body = {
        judgeId: selectedJudgeId,
      };
      const deleteres = await deleteJudge?.(body);
      if (deleteres?.data?.success) {
        refetch();
        setSelectedJudgeId(null);
        setShowDeletePopup(false);
      } else {
        alert(deleteres.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
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

  const handleModalClose = () => {
    toggleModal();
    setEditPopupData(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };

  const handleSearchChange = useDebouncedCallback(
    // function
    (value) => {
      setSearchValue(value ?? "");
    },
    500
  );
  const totalItems = 100;
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Judges</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Add New Judges
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={handleModalClose}
              modalHeader={"Add judge"}
            >
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Zone
                    </label>
                    <input
                      type="text"
                      name="zone"
                      id="zone"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Zone"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="mt-1 h-24 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="main"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    name="isMain"
                    id="isMain"
                    className="mr-2 border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label
                    htmlFor="image"
                    className="block text-m font-medium text-gray-700"
                  >
                    Main Judge
                  </label>
                </div>
                <div className="flex justify-center p-6">
                  <button
                    disabled={isLoadingMutation || isLoadingEdit}
                    type="submit"
                    className="bg-[#0EB599] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-3xl"
                  >
                    {isLoadingMutation || isLoadingEdit
                      ? "loading..."
                      : "Submit"}
                  </button>
                </div>
              </form>
            </Modal>
            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
              <h3 className="flex self-center text-lg font-bold">
                Are you sure want to Delete?
              </h3>
              <div className="flex justify-center p-6">
                <button
                  onClick={handleDeleteModalClose}
                  type="submit"
                  className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl"
                >
                  No
                </button>
                <button
                  disabled={isLoadingDelete}
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl"
                >
                  YES
                </button>
              </div>
            </Modal>
          </span>
        </div>
      </div>

      <div className="flex rounded-lg p-4 pt-0">
        <div className="ml-auto flex items-center space-x-4">
          {/* Parent div for span elements */}
          <span className="flex items-center justify-center">
            <input
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
              className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-500"
              placeholder="Search by name"
            />
          </span>
          <span className="flex items-center">
            <span
              // onClick={selectRole} // Call selectRole when the Search button is clicked
              className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[260px] text-center"
            >
              Search
            </span>
          </span>
        </div>
      </div>

      <table className="min-w-full table-auto ">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-4 text-left">Sl No</th>
            <th className="px-4 py-4 text-left">Image</th>
            <th className="px-4 py-4 text-left">Name</th>
            <th className="px-4 py-4 text-left">Zone</th>
            <th className="px-4 py-4 text-left">Email</th>
            <th className="px-4 py-4 text-left">Password</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-50 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            data?.judge?.map((judge, index) => (
              <tr
                className=" odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}
              >
                <td className="px-4 py-2">{index}</td>
                <td className="px-4 py-2 flex items-center">
                  <img
                    alt="img"
                    src={judge?.image}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                </td>
                <td className="px-4 py-2">{judge?.name}</td>
                <td className="px-4 py-2">{judge?.zone?.name}</td>
                <td className="px-4 py-2">{judge?.email}</td>
                <td className="px-4 py-2">{judge?.password}</td>
                <td className="px-4 py-2 ">
                  <button className={`py-2 px-5 flex space-x-2 items-center ${judge?.isBlocked? " text-[#FF0404] border-[#FF0404]":"  border-[#1DB290] text-[#1DB290]"} rounded-full  border `}> <span>{judge?.isBlocked ? "Blocked" : "Unblocked"}</span><BiSolidDownArrow className="text-black"/></button>
                </td>
                <td className="px-4 py-2 text-right">
                  <button onClick={() => handleEditClick(judge)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(judge?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="m-auto flex justify-end ">
        <Pagination
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={data?.totalPages}
        />
      </div>
    </>
  );
};

export default Judges;
