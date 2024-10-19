import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import { useGetResultsQuery } from "../../api/responseAndResult";

const ResponseAndResult = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const { data } = useGetResultsQuery({
    limit,
    page: currentPage,
    search: searchValue,
  });

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
        <h2 className="text-2xl font-semibold text-gray-700">
          Response & Result
        </h2>
        <div className="ml-auto flex items-center space-x-4"></div>
      </div>
      <div className="flex justify-end ml-auto space-x-6 p-4">
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
              <th className="px-4 py-2 text-left">Participant Name</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Zone</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Score</th>
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
    </>
  );
};

export default ResponseAndResult;
