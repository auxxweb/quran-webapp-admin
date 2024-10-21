import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetResultDetailQuery } from "../../api/responseAndResult";

function ResultDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const resultId = location.pathname?.split("/")[2];
  const { data } = useGetResultDetailQuery(resultId);

  return (
    <>
      <svg
        onClick={() => navigate("/result")}
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
      <div className="m-6 bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start w-full">
          {/* Left Section: Profile Image & User Info */}
          <div className="flex lg:w-1/2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src="/quranLogo.svg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.result?.participant_id?.name}
              </h2>
              <p className="text-gray-500 mt-1 flex items-center">
                {data?.result?.zone?.name}
              </p>
              <p className="text-green-500 mt-1 flex items-center">
                {data?.result?.participant_id?.phone}
              </p>
              <p className="text-green-500 mt-1 flex items-center">
                {data?.result?.participant_id?.email}
              </p>
              <p className="text-gray-500 mt-1 flex items-center">
                {data?.result?.participant_id?.address}
              </p>
            </div>
          </div>
          <table className="table-auto border-separate border-spacing-4">
            <tbody>
              <tr>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  Date
                </td>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  12/1/1334
                </td>
              </tr>
              <tr>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  Quiz Time
                </td>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  11 AM - 12 PM
                </td>
              </tr>
              <tr>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  TotalScore
                </td>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="items-center m-6 justify-center">
        {/* Main Container */}
        {data?.questions?.map((question, index) => (
          <div className="bg-white  align-center shadow-md rounded-lg mb-6 bg-[#D9D9D9] w-full">
            <div className="border-b rounded-t-lg p-3 bg-white">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Question {index + 1}</h1>
                <div className="text-lg text-black">
                  <span className="font-bold"> Time Taken: 20 Mins</span>
                  <span className="text-[#939393]">| 09:00 AM - 9:20 AM </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-[#D9D9D9]  p-4 rounded-md">
                <p className="text-lg font-semibold">{question?.question}</p>
                <p className="mt-2 text-sm text-black">
                  Answer: {question?.answer}
                </p>
              </div>

              {/* Participant Response Section */}
              <div>
                <div className="flex justify-between bg-white shadow-md rounded-lg p-3 mb-3 w-full">
                  <h2 className="font-bold text-lg mb-2">
                    Participant Response
                  </h2>
                  <h2 className="font-bold text-lg mb-2 mr-2">
                    Total Score: 00
                  </h2>
                </div>

                {/* Participant Response Card */}
                <div className="bg-white border border-gray-200 mt-6 p-4 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-[#373B3E]">Judge: </p>
                      </div>
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Judge"
                        className="ml-3 w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-bold text-[#373B3E]">Muhammed Ali</p>
                      </div>
                      <div className="flex text-lg font-bold ml-10 text-[#373B3E]">
                        <p>Score Given:</p>
                        <p className="font-bold text-2xl ml-6">00</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-black mt-3">
                    Answer: Competition where participants answer questions to
                    test their knowledge on a topic or topics. Quizzes can be
                    short and consist of a few questions, or they can be
                    large-scale events with hundreds of participants.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 mt-6 p-4 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-[#373B3E]">Judge: </p>
                      </div>
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Judge"
                        className="ml-3 w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-bold text-[#373B3E]">Muhammed Ali</p>
                      </div>
                      <div className="flex text-lg font-bold ml-10 text-[#373B3E]">
                        <p>Score Given:</p>
                        <p className="font-bold text-2xl ml-6">00</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-black mt-3">
                    Answer: Competition where participants answer questions to
                    test their knowledge on a topic or topics. Quizzes can be
                    short and consist of a few questions, or they can be
                    large-scale events with hundreds of participants.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 p-4 mt-6 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-[#373B3E]">Judge: </p>
                      </div>
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Judge"
                        className="ml-3 w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-bold text-[#373B3E]">Muhammed Ali</p>
                      </div>
                      <div className="flex text-lg font-bold ml-10 text-[#373B3E]">
                        <p>Score Given:</p>
                        <p className="font-bold text-2xl ml-6">00</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-black mt-3">
                    Answer: Competition where participants answer questions to
                    test their knowledge on a topic or topics. Quizzes can be
                    short and consist of a few questions, or they can be
                    large-scale events with hundreds of participants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResultDetails;
