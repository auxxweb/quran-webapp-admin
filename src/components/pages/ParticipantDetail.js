import { useLocation, useNavigate } from "react-router-dom";
import { useGetParticipantDetailQuery } from "../../api/participants";

const ParticipantDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const participantId = location.pathname?.split("/")[2];
  const { data } = useGetParticipantDetailQuery(participantId);
  return (
    <>
      <svg
        onClick={() => navigate("/participants")}
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
      <div className="m-4 mx-auto bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row items-start w-full">
          {/* Left Section: Profile Image & User Info */}
          <div className="flex lg:w-1/2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={data?.participant?.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.participant?.name}
              </h2>
              <p className="text-gray-500 mt-1 flex items-center">
                <img
                  src="/icons/zoneIcon.svg"
                  alt="Profile"
                  className="w-6 h-6 mr-3 object-cover"
                />
                {data?.participant?.zone?.name}
              </p>
            </div>
          </div>

          {/* Right Section: Contact Details */}
          <div className="flex flex-col lg:w-1/2">
            <div className="mt-4 lg:mt-0">
              <table className="w-full">
                <tbody className="space-y-2">
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">Phone</td>
                    <td>
                      <a
                        href={`tel:${data?.participant?.phone}`}
                        className="text-green-500"
                      >
                        {data?.participant?.phone}
                      </a>
                    </td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">Email</td>
                    <td>
                      <a
                        href={`mailto:${data?.participant?.email}`}
                        className="text-green-500"
                      >
                        {data?.participant?.email}
                      </a>
                    </td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">Age</td>
                    <td>{data?.participant?.age}</td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">
                      Gender
                    </td>
                    <td>{data?.participant?.gender}</td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">
                      Address
                    </td>
                    <td>{data?.participant?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-6 mt-8">
        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Competition History
        </h2>

        {/* Competition Card */}
        <div className="flex bg-white items-center border border-[#1DB290] p-4 rounded-md">
          {/* Competition Image */}
          <div className="w-24 h-24 rounded-md overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Competition"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Competition Info */}
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-semibold text-gray-700">
              {data?.participant?.zone?.name} Competition
            </h3>
            <p className="text-gray-500 mt-3">
              <span className="font-semibold text-gray-600">Date: </span>
              04/04/2024
            </p>
            <p className="text-gray-500 mt-3">
              <span className="font-semibold text-gray-600">Time: </span>
              09:00 AM - 12:00 PM
            </p>
            <p className="flex text-gray-500 mt-3">
              <span className="font-semibold text-gray-600">Mark: </span>
              <div className="ml-3 tex  text-white font-semibold text-xl">
                <span className="px-4 py-2 bg-green-600 rounded-full">9.4</span>
              </div>
            </p>
          </div>

          {/* Mark and View Button */}
          <div className="ml-4 flex flex-col items-center">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md mb-2 hover:bg-green-600">
              View
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantDetails;