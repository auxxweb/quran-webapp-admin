import { useState } from "react";
import Pagination from "../Pagination";
import EmpCard from "../reUsableCmponent/EmpCard";
import Modal from "../reUsableCmponent/modal/Modal";
import {
  useAddParticipantMutation,
  //   useDeleteParticipantMutation,
  useEditParticipantMutation,
  useGetParticipantQuery,
} from "../../api/participants";

const Participants = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const { data, isLoading, refetch } = useGetParticipantQuery();
  const [addParticipant, { isLoading: isLoadingMutation }] =
    useAddParticipantMutation();
  //   const [deleteParticipant, { isLoading: isLoadingDelete }] =
  //     useDeleteParticipantMutation();
  const [editParticipant, { isLoading: isLoadingEdit }] =
    useEditParticipantMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  console.log("data", data);
  console.log(
    "loading",
    isLoading,
    // isLoadingDelete,
    isLoadingEdit,
    isLoadingMutation
  );

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const name = formData.get("fullName"); // Get email input value
    const email = formData.get("email");
    const phone = formData.get("phoneNumber");
    const address = formData.get("address");
    const gender = formData.get("gender");
    // const zone = formData.get("zone");
    const age = formData.get("age");

    try {
      if (editPopupData) {
        const body = {
          name,
          email,
          phone,
          address,
          gender,
          zone:["670e5df063e12ac02509fc9b"],
          age,
        };
        const res = await editParticipant?.(body);
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
          zone:["670e5df063e12ac02509fc9b"],
          age,
        };
        const res = await addParticipant?.(body);
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

  const totalItems = 100;
  const itemsPerPage = 10;
  const currentPage = 1;

  const handlePageChange = (page) => {
    console.log("Page changed:", page);
  };
  const handleModalClose = () => {
    toggleModal();
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Participants</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Add Participant
            </span>
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
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Age
                    </label>
                    <input
                      type="age"
                      name="age"
                      id="age"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Age"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mt-3"
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
                </div>
              </div>
              <div className="flex justify-center p-6">
                <button
                  //   disabled={isLoadingMutation || isLoadingEdit}
                  type="submit"
                  className="bg-[#0EB599] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-3xl"
                >
                  Submit
                  {/* {isLoadingMutation || isLoadingEdit ? "loading..." : "Submit"} */}
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
      <div className="ml-auto lg:mr-4 flex items-center space-x-8 justify-end">
        {/* Parent div for span elements */}
        <span className="flex items-center justify-center">
          <input
            className="p-2 lg:w-[300px] w-full appearance-none bg-white border border-gray-500"
            placeholder="Search by name"
          />
        </span>
        <span className="flex items-center">
          <span className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[250px] text-center">
            Search
          </span>
        </span>
      </div>
      <div className="flex flex-wrap justify-center mt-4">
        <EmpCard
          selectedRole={""}
          selectedDesignation={"client"}
          isGrid={true}
        />
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Participants;
