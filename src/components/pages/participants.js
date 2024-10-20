import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination";
// import EmpCard from "../reUsableCmponent/EmpCard";
import Modal from "../reUsableCmponent/modal/Modal";
import {
  useAddParticipantMutation,
  //   useDeleteParticipantMutation,
  useEditParticipantMutation,
  useGetParticipantQuery,
} from "../../api/participants";
import { useGetZonesListQuery } from "../../api/common";
import FilterPopup from "../reUsableCmponent/filterPopup";

const Participants = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [zonesList, setZonesList] = useState({});
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [filterZonesList, setFilterZonesList] = useState([]);
  const [selectedZones, setSelectedZones] = useState();
  const [editPopupData, setEditPopupData] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const limit = 10;
  const { data, isLoading, refetch } = useGetParticipantQuery({
    limit,
    page: currentPage,
    search: searchValue,
    zones: selectedZones,
  });
  const { data: zoneList, refetch: ZoneListsRefetch } = useGetZonesListQuery();
  const [addParticipant, { isLoading: isLoadingMutation }] =
    useAddParticipantMutation();
  //   const [deleteParticipant, { isLoading: isLoadingDelete }] =
  //     useDeleteParticipantMutation();
  const [editParticipant, { isLoading: isLoadingEdit }] =
    useEditParticipantMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleFilterPopup = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    formData?.append("zone", zonesList?.value);
    try {
      if (editPopupData) {
        formData?.append("participantId", editPopupData?._id);
        const res = await editParticipant?.(formData);
        if (res?.data?.success) {
          refetch();
          ZoneListsRefetch();
          toggleModal();
          setEditPopupData(null);
        } else {
          alert(res.data.message);
        }
      } else {
        const res = await addParticipant?.(formData);
        if (res?.data?.success) {
          refetch();
          ZoneListsRefetch();
          toggleModal();
        } else {
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearchChange = useDebouncedCallback(
    // function
    (value) => {
      setSearchValue(value ?? "");
    },
    500
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleModalClose = () => {
    toggleModal();
  };

  const handleChange = (selectedOptions) => {
    setZonesList(selectedOptions || {});
  };

  const handleFilterChange = (selectedOptions) => {
    setFilterZonesList(selectedOptions || {});
  };

  const selectOption = zoneList?.zones?.map((zone) => {
    return { value: zone?._id, label: zone?.name };
  });
  const handleRemoveZone = (zonesToRemove) => {
    setFilterZonesList(
      filterZonesList.filter((zone) => zone.value !== zonesToRemove.value)
    );
  };

  const handleFilterClick = () => {
    setSelectedZones(filterZonesList?.map((zone) => zone?.value));
    toggleFilterPopup();
  };

  const handleEditClick = (zone) => {
    toggleModal();
    setEditPopupData(zone);
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
            modalHeader={"Add Participant"}
          >
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Full Name"
                    required
                    defaultValue={
                      editPopupData?.name ? editPopupData?.name : ""
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="zone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zone
                  </label>
                  <Select
                    className="border-gray-400"
                    options={selectOption}
                    onChange={handleChange}
                    value={zonesList}
                    isMulti={false}
                    // hideSelectedOptions
                    closeMenuOnSelect={false} // Keep the dropdown open for multiple selections
                    placeholder="Select Zones"
                    components={{ MultiValue: () => null }} // Hide selected options in input
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
                    defaultValue={
                      editPopupData?.email ? editPopupData?.email : ""
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Phone Number"
                    required
                    defaultValue={
                      editPopupData?.phone ? editPopupData?.phone : ""
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="address"
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
                    defaultValue={
                      editPopupData?.address ? editPopupData?.address : ""
                    }
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
                      defaultValue={
                        editPopupData?.age ? editPopupData?.age : ""
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700 mt-3"
                    >
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      defaultValue={
                        editPopupData?.gender ? editPopupData?.gender : ""
                      }
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
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
              <div className="flex justify-center p-6">
                <button
                  disabled={isLoadingMutation || isLoadingEdit}
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
      <div className="flex rounded-lg p-4 pt-0">
        <FilterPopup
          filterHeader="Zone"
          isOpen={isFilterPopupOpen}
          togglePopup={toggleFilterPopup}
        >
          <div className="space-y-4">
            {/* Example Filter Option 1 */}
            {selectOption && (
              <div className="m-4 w-60">
                <Select
                  className="border-gray-400"
                  options={selectOption}
                  onChange={handleFilterChange}
                  value={filterZonesList}
                  isMulti
                  hideSelectedOptions
                  closeMenuOnSelect={false} // Keep the dropdown open for multiple selections
                  placeholder="Select Zones"
                  components={{ MultiValue: () => null }} // Hide selected options in input
                />
                <div className="pt-2">
                  {filterZonesList.length > 0 && (
                    <ul className="flex flex-wrap gap-1">
                      {filterZonesList.map((zone) => (
                        <li
                          key={zone.value}
                          className="bg-[#1DB290] flex items-center justify-between text-white rounded-full py-0.5 px-2 text-xs font-light"
                        >
                          <span>{zone.label}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveZone(zone)}
                            className="ml-2"
                          >
                            <IoIosClose className="text-lg" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
            {/* Apply Filters Button */}
            <div className="flex justify-center">
              <button
                onClick={handleFilterClick}
                type="submit"
                className="bg-[#0EB599] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-3xl"
              >
                Apply
              </button>
            </div>
          </div>
        </FilterPopup>
        <div className="ml-auto lg:mr-4 flex items-center space-x-8 justify-end">
          {/* Parent div for span elements */}
          <span className="flex items-center justify-center">
            <input
              className="p-2 lg:w-[300px] w-full appearance-none bg-white border border-gray-500"
              placeholder="Search by name"
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
            />
          </span>
          <span className="flex items-center">
            <span className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[250px] text-center">
              Search
            </span>
          </span>
        </div>
      </div>
      <table className="min-w-full table-auto mt-6">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-4 text-left">Sl No</th>
            <th className="px-4 py-4 text-left">Name</th>
            <th className="px-4 py-4 text-left">Image</th>
            <th className="px-4 py-4 text-left">zone</th>
            <th className="px-4 py-4 text-left">email</th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-50 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            data?.participant?.map((participant, index) => (
              <tr
                className=" odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}
              >
                <td
                  onClick={() => navigate(`/participants/${participant?._id}`)}
                  className="px-4 py-2"
                >
                  {index + 1}
                </td>
                <td
                  onClick={() => navigate(`/participants/${participant?._id}`)}
                  className="px-4 py-2"
                >
                  {participant?.name}
                </td>
                <td
                  onClick={() => navigate(`/participants/${participant?._id}`)}
                  className="px-3 py-2 flex items-center"
                >
                  <img
                    alt="img"
                    src={participant?.image}
                    className="w-14 h-14 rounded-full mr-2 mt-2"
                  />
                </td>
                <td
                  onClick={() => navigate(`/participants/${participant?._id}`)}
                  className="px-4 py-2"
                >
                  {participant?.zone?.name}
                </td>
                <td
                  onClick={() => navigate(`/participants/${participant?._id}`)}
                  className="px-4 py-2"
                >
                  <div className="flex -space-x-2">{participant?.email}</div>
                </td>
                <td>
                  <button onClick={() => handleEditClick(participant)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* <div className="flex flex-wrap justify-center mt-4">
        <EmpCard
          cardArray={data?.participant}
          selectedRole={""}
          selectedDesignation={"client"}
          isGrid={true}
        />
      </div> */}
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

export default Participants;
