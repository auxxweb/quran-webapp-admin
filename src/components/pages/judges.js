import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import { BiSolidDownArrow } from "react-icons/bi";

import {
  useAddJudgeMutation,
  useBlockJudgeMutation,
  useDeleteJudgeMutation,
  useEditJudgeMutation,
  useGetJudgesQuery,
} from "../../api/judges";
import { useGetZonesListQuery } from "../../api/common";
import { IoIosClose } from "react-icons/io";
import FilterPopup from "../reUsableCmponent/filterPopup";

const Judges = () => {
  const navigate = useNavigate();
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedJudgeId, setSelectedJudgeId] = useState(null);
  const [zonesList, setZonesList] = useState({});
  const [filterZonesList, setFilterZonesList] = useState([]);
  const [selectedZones, setSelectedZones] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useGetJudgesQuery({
    limit,
    page: currentPage,
    search: searchValue,
    zones: selectedZones,
  });
  const { data: zoneList, refetch: ZoneListsRefetch } = useGetZonesListQuery();
  const [addJudge, { isLoading: isLoadingMutation }] = useAddJudgeMutation({});
  const [deleteJudge, { isLoading: isLoadingDelete }] =
    useDeleteJudgeMutation();
  const [EditJudge, { isLoading: isLoadingEdit }] = useEditJudgeMutation();
  const [blockJudge, { isLoading: isLoadingBlock }] = useBlockJudgeMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    const isMain = !!formData?.get("isMain");

    formData?.append("zone", zonesList?.value);
    formData?.set("isMain", isMain);

    try {
      if (editPopupData) {
        formData?.append("judgeId", editPopupData?._id);
        const res = await EditJudge?.(formData);
        if (res?.data?.success) {
          refetch();
          ZoneListsRefetch();
          setZonesList({});
          toggleModal();
          setEditPopupData(null);
        } else {
          alert(res.data.message);
        }
      } else {
        const res = await addJudge?.(formData);
        if (res?.data?.success) {
          refetch();
          ZoneListsRefetch();
          setZonesList({});
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

  const handleChange = (selectedOptions) => {
    setZonesList(selectedOptions || {});
  };
  const handleFilterChange = (selectedOptions) => {
    setFilterZonesList(selectedOptions || {});
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
    setZonesList({});
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const selectOption = zoneList?.zones?.map((zone) => {
    return { value: zone?._id, label: zone?.name };
  });

  const toggleFilterPopup = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };
  const handleRemoveZone = (zonesToRemove) => {
    setFilterZonesList(
      filterZonesList.filter((zone) => zone.value !== zonesToRemove.value)
    );
  };

  const handleFilterClick = () => {
    setSelectedZones(filterZonesList?.map((zone) => zone?.value));
    toggleFilterPopup();
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Judges</h2>
        <div className="ml-auto flex items-center space-x-4">
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
                    {/* <div className="pt-2">
                      {zonesList.length > 0 && (
                        <ul className="flex flex-wrap gap-1">
                          {zonesList.map((zone) => (
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
                    </div> */}
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
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="mt-1 h-28 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        defaultValue={
                          editPopupData?.gender ? editPopupData?.gender : ""
                        }
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    {!editPopupData && (
                      <div className="mt-5">
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
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    name="isMain"
                    id="isMain"
                    className="mr-2 border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={editPopupData?.isMain ? true : "off"}
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
      <div>
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
                className="odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}
              >
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2"
                >
                  {index + 1}
                </td>
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2 flex items-center"
                >
                  <img
                    alt="img"
                    src={judge?.image}
                    className="w-14 h-14 rounded-full mr-2 mt-2"
                  />
                </td>
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2"
                >
                  {judge?.name}
                </td>
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2"
                >
                  {judge?.zone?.name}
                </td>
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2"
                >
                  {judge?.email}
                </td>
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2"
                >
                  {judge?.password}
                </td>
                <td className="px-4 py-2 ">
                  <button
                    onClick={() => handleBlockJudge(judge?._id)}
                    className={`py-2 px-5 flex space-x-2 items-center ${
                      judge?.isBlocked
                        ? " text-[#FF0404] border-[#FF0404]"
                        : "  border-[#1DB290] text-[#1DB290]"
                    } rounded-full  border `}
                  >
                    {" "}
                    <span>{judge?.isBlocked ? "Blocked" : "Unblocked"}</span>
                    <BiSolidDownArrow className="text-black" />
                  </button>
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    disabled={isLoadingBlock}
                    onClick={() => handleEditClick(judge)}
                  >
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
