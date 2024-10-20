import React from "react";
import { useNavigate } from "react-router-dom";

function ResultDetails() {
  const navigate = useNavigate();
  return (
    <>
      <svg
        onClick={() => navigate("/results")}
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
      <div className="m-6 bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200">
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
                Mohammed Ali
              </h2>
              <p className="text-gray-500 mt-1 flex items-center">
                Calicut zone
              </p>
              <p className="text-green-500 mt-1 flex items-center">
                9876543210
              </p>
              <p className="text-green-500 mt-1 flex items-center">
                qwert@wert.com
              </p>
              <p className="text-gray-500 mt-1 flex items-center">
                Calicut zone
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-6 min-h-screen flex flex-col items-center">
        <div className="bg-white w-full  p-6 rounded-lg shadow-lg">
          {/* Question Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Question 1</h3>
              <p>Time Taken: 20 Mins | 09:00 AM - 9:20 AM</p>
            </div>
            <p className="mt-4 text-gray-700">
              What are some other names for the Quran?
            </p>
            <div className="bg-white p-4 mt-4 rounded-lg shadow">
              <p className="text-gray-500">
                Answer: Competition where participants answer questions...
              </p>
            </div>
          </div>

          {/* Participant Response Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Participant Response</h3>
            <div className="mt-4 border-t pt-4">
              {["Muhammed Ali", "Muhammed Ali", "Muhammed Ali"].map(
                (judge, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="Judge"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <p className="font-semibold">{judge}</p>
                      </div>
                      <p>
                        Score Given: <strong>00</strong>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 mt-2 rounded-lg">
                      <p className="text-gray-600">
                        Answer: Competition where participants answer questions
                        to test their knowledge...
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultDetails;
