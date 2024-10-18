import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../reUsableCmponent/modal/Modal";
import {
  useAddZoneMutation,
  useDeleteZoneMutation,
  useEditZoneMutation,
  useGetZonesQuery,
} from "../../api/zones";
import Pagination from "../Pagination";

const Zones = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const { data, isLoading, refetch } = useGetZonesQuery({
    limit,
    page: currentPage,
    search: searchValue,
  });
  const [addZone, { isLoading: isLoadingMutation }] = useAddZoneMutation();
  const [deleteZone, { isLoading: isLoadingDelete }] = useDeleteZoneMutation();
  const [EditZone, { isLoading: isLoadingEdit }] = useEditZoneMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    try {
      if (editPopupData) {
        formData.append("zoneId", editPopupData?._id);
        const res = await EditZone?.(formData);
        if (res?.data?.success) {
          refetch({ page: 1 });
          toggleModal();
          setEditPopupData(null);
        } else {
          alert(res.data.message);
        }
      } else {
        const res = await addZone?.(formData);
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
    setSelectedZoneId(id);
  };
  const handleDelete = async () => {
    try {
      const body = {
        zoneId: selectedZoneId,
      };
      const deleteres = await deleteZone?.(body);
      if (deleteres?.data?.success) {
        refetch();
        setSelectedZoneId(null);
        setShowDeletePopup(false);
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Zones</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Add New Zone
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={handleModalClose}
              modalHeader={"Add Zone"}
            >
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="zoneName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zone Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    defaultValue={editPopupData ? editPopupData?.name : null}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="mt-1 block w-full h-20 border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    defaultValue={
                      editPopupData ? editPopupData?.description : null
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
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

      <table className="min-w-full table-auto mt-6">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-4 text-left">Sl No</th>
            <th className="px-4 py-4 text-left">Name</th>
            <th className="px-4 py-4 text-left">Image</th>
            <th className="px-4 py-4 text-left">Link</th>
            <th className="px-4 py-4 text-left">Description</th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-50 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            data?.zones?.map((zone, index) => (
              <tr
                className=" odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}
              >
                <td className="px-4 py-2">{index}</td>
                <td className="px-4 py-2">{zone?.name}</td>
                <td className="px-3 py-2 flex items-center">
                  <img
                    alt="img"
                    src={zone?.image}
                    className="w-14 h-14 rounded-full mr-2 mt-2"
                  />
                </td>
                <td className="px-4 py-2">Competition Link</td>
                <td className="px-4 py-2">
                  <div className="flex -space-x-2">{zone?.description}</div>
                </td>
                <td>
                  <button onClick={() => handleEditClick(zone)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(zone?._id)}>
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
      <div className="m-auto flex justify-end">
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

export default Zones;
