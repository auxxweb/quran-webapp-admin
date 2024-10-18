import { useLocation, useNavigate } from "react-router-dom";
import { useGetBundleDetailQuery } from "../../api/bundle";

const BundleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bundleId = location.pathname?.split("/")[2];
  console.log("bundleId", bundleId);
  const { data, isLoading } = useGetBundleDetailQuery(bundleId);
  console.log("data", data, isLoading);
  return (
    <>
      <svg
        onClick={() => navigate("/bundles")}
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
        <div className="flex items-start">
          <div className="flex">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 mt-6 space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.bundle?.title}
              </h2>
              <div>
                <span className="font-semibold text-gray-600">Bundle Id: </span>
                <a href="tel:9876543210" className="text-green-500 ml-6">
                  {data?.bundle?.bundleId}
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-600">
                  No Of Questions:
                </span>
                <a
                  href="mailto:hari@example.com"
                  className="text-green-500 ml-6"
                >
                  {data?.bundle?.questions?.length}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-white ">
            <tr className="">
              <th className="px-4 py-2 text-left font-medium">Qs ID</th>
              <th className="px-4 py-2 text-center font-medium">Question</th>
              <th className="px-4 py-2 text-center font-medium">Answer</th>
            </tr>
          </thead>
          <tbody className="border-[2px] border-opacity-50 border-[#969696]">
            {data?.bundle?.questions?.map((question, index) => (
              <tr
                className="font-light odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}
              >
                <td className="w-6 px-4 py-2">{question?.questionId}</td>
                <td className="px-4 py-2 flex justify-center items-center">
                  {question?.question}
                </td>
                <td className="px-4 py-2 text-center">{question?.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BundleDetails;
