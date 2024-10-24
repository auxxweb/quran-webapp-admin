import React, { useEffect, useState } from "react";
import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useGetQuestionsQuery,
} from "../../api/questions";
import Modal from "../reUsableCmponent/modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Questions = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editPopupData, setEditPopupData] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const limit = 10;
  const { data, refetch } = useGetQuestionsQuery({
    limit,
    page: currentPage,
    search: searchValue,
  });

  useEffect(()=>{
    refetch({ limit, page: currentPage, search: searchValue });
  },[])
  const [addQuestion, { isLoading: isLoadingMutation }] =
    useAddQuestionMutation();
  const [deleteQuestion, { isLoading: isLoadingDelete }] =
    useDeleteQuestionMutation();
  const [editQuestion, { isLoading: isLoadingEdit }] =
    useEditQuestionMutation();

  // const [selectedDesignation, setSelectedDesignation] =
  //   useState("Total Project : 3");

  // const selectRole = () => {
  //   setSelectedDesignation("");
  // };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  // const selectProfession = (event) => {
  //   setSelectedDesignation(event.target.value);
  // };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const question = formData.get("question"); // Get email input value
    const answer = formData.get("answer");
    try {
      if (editPopupData) {
        const body = {
          questionId: editPopupData?._id,
          question,
          answer,
        };
        const res = await editQuestion?.(body);
        if (res?.data?.success) {
          refetch({ limit, page: currentPage, search: searchValue });
          toggleModal();
          setEditPopupData(null);
        } else {
          toast.error(res.data.message,{
            position: "top-right",
            duration: 2000,  
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF", // Text color
            },
            dismissible: true,  
          });
        }
      } else {
        const body = {
          question,
          answer,
        };
        const res = await addQuestion?.(body);
        if (res?.data?.success) {
          refetch({ limit, page: currentPage, search: searchValue });
          toggleModal();
        } else {
          toast.error(res.data.message,{
            position: "top-right",
            duration: 2000,  
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF", // Text color
            },
            dismissible: true,  
          });
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

  const handleEditClick = (question) => {
    toggleModal();
    setEditPopupData(question);
  };

  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedQuestionId(id);
  };
  const handleDelete = async () => {
    try {
      const body = {
        questionId: selectedQuestionId,
      };
      const deleteres = await deleteQuestion?.(body);
      if (deleteres?.data?.success) {
        refetch();
        setSelectedQuestionId(null);
        setShowDeletePopup(false);
      } else {
        toast.error(deleteres.data.message,{
          position: "top-right",
          duration: 2000,  
          style: {
            backgroundColor: "#fb0909", // Custom green color for success
            color: "#FFFFFF", // Text color
          },
          dismissible: true,  
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Questions</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] hover:bg-[#1ae69b] text-white rounded-full p-2 cursor-pointer"
              onClick={toggleModal}
            >
              + Add Qs & Ans
            </span>
          </span>
        </div>
      </div>
      <div className="flex justify-end ml-auto space-x-6 p-4">
        {/* <span className="flex items-center">
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
        </span> */}
        <span className="flex items-center justify-center">
          <input
            className="p-2 lg:w-[300px] w-full appearance-none bg-white border border-gray-500"
            placeholder="Qs ID"
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
          />
        </span>
        <span className="flex items-center">
          <span className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[228px] rounded text-center">
            SEARCH
          </span>
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-teal-50">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Question</th>
              <th className="px-4 py-2 text-left">Answer</th>
              <th className="px-4 py-2 text-left">Question Id</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="border-[2px] border-opacity-50 border-[#969696]">
            {data?.questions?.map((question, index) => (
              <tr
                onClick={() => navigate(`/questions/${question?._id}`)}
                className=" odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{question?.question}</td>
                <td className="px-4 py-2 flex items-center">
                  {question?.answer}
                </td>
                <td className="px-4 py-2">{question?.questionId}</td>
                <td className="px-4 py-2 text-right w-[10%]">
                  <button onClick={() => handleEditClick(question)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(question?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={data?.totalPages}
        />
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        modalHeader={"Add Qs and Ans"}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="q&a"
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <textarea
                type="text"
                name="question"
                id="question"
                className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={
                  editPopupData?.question ? editPopupData?.question : ""
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="q&a"
                className="block text-sm font-medium text-gray-700"
              >
                Answer
              </label>
              <textarea
                type="text"
                name="answer"
                id="answer"
                className="p-2 mt-1 block h-24 w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={
                  editPopupData?.answer ? editPopupData?.answer : ""
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={isLoadingMutation || isLoadingEdit}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
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
    </>
  );
};

export default Questions;
