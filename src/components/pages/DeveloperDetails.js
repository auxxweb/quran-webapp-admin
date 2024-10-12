import { useState } from "react";
import ProjectDetailsCard from "../reUsableCmponent/ProjectDetailsCard";

const DeveloperDetails = () => {

    const [speed, setSpeed] = useState(70); 
    const needleAngle = (speed / 100) * 180 - 90; 
  
  return (
    <>
      <div className="m-4">
        <h1 className=" mb-6 text-2xl font-semibold">Profile</h1>

        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
          <img
            src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
            alt="Scene from Avatar: The Last Airbender"
            className="w-28 h-28 rounded-full mr-4 mt-[-120px]"
          />
          <div className="flex flex-col w-full border-1 border-r-gray-800">
            <h2 className="text-lg font-bold">Global Technologies</h2>
            <p className="text-gray-700">Adarsh Raj</p>
            <p className="text-gray-500">CEO</p>
            <p className="text-gray-500">Client ID: CL-0001</p>
            <button className="bg-green-600 text-white py-2 w-40 rounded-md mt-14 mb-8">
              Send Mail
            </button>
          </div>
          <div className="flex flex-col w-full mt-[-80px]">
            {" "}
            {/* Apply w-full to each flex-col */}
            <p className="text-gray-700 font-bold">Contact Information</p>
            <p className="text-gray-500">Phone: 9876543210</p>
            <p className="text-gray-500">Email: hari@example.com</p>
            <p className="text-gray-500">
              Address: 1861 Bayonne Ave, Manchester Township, NJ, 08759
            </p>
          </div>
        </div>
        <h1 className="mt-8 mb-8 text-2xl font-semibold">Projects</h1>

        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white rounded-lg shadow-md flex-1">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <table className="table-auto">
            <tbody>
                <tr>
                    <td className="font-semibold text-gray-800 pr-8">Tel</td>
                    <td className="text-orange-500">9876543210</td>
                </tr>
                <tr>
                    <td className="font-semibold text-gray-800 pr-8">Emergency No</td>
                    <td className="text-orange-500">9876543210</td>
                </tr>
                <tr>
                    <td className="font-semibold text-gray-800 pr-8">Marital status</td>
                    <td className="text-gray-500">Married</td>
                </tr>
                <tr>
                    <td className="font-semibold text-gray-800 pr-8">PAN</td>
                    <td className="text-gray-500">Gh45Df4</td>
                </tr>
                <tr>
                    <td className="font-semibold text-gray-800 pr-8">Adhar Number</td>
                    <td className="text-gray-500">4325 7654 8765</td>
                </tr>
            </tbody>
        </table>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md flex-1 h-52">
      <h2 className="text-xl font-semibold mb-4">Stride Score</h2>

      <table width={'100%'}>
        <tr>
            <td width={'45%'} valign="top">
                <table>
                <thead>
                    <tr>
                    <td aligin='left'>Score</td>
                    <td aligin='right'>&nbsp; 87</td>
                    </tr>

                    <tr>
                    <td aligin='left'>Avg Attendance</td>
                    <td aligin='right'>&nbsp; 8.4</td>
                    </tr>

                    <tr>
                    <td aligin='left'>Task Completion</td>  
                    <td aligin='right'>&nbsp; 9.2</td>
                    </tr>

                </thead>
                </table>
            </td>
            <td  width={'55%'}>
            <div className="flex flex-col items-center">
      {/* Container with background image */}
      <div className="relative w-72 h-10">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-contain h-64 bg-no-repeat z-0 mt-[-20px]"
          style={{ backgroundImage: 'url("/speedometer.png")' }} // Use your image path
        ></div>

        {/* Needle */}
        <div
          className="absolute top-[-22%] left-1/2 transform -translate-x-1/2 origin-bottom z-10"
          style={{ transform: `rotate(${needleAngle}deg)` }}
        >
          {/* The needle length adjusted so it ends in the center of the circle */}
          <div className="w-1 h-28 bg-[#213A5C]"></div>
          {/* <svg width="77" height="23" viewBox="0 0 77 23" fill="#1d4ed8" xmlns="http://www.w3.org/2000/svg">
<path d="M5.16354 12.232L75.6467 0.586196C76.3946 0.457251 76.8088 1.57065 76.0325 1.80285L8.44376 22.5782C0.937826 24.5024 -2.46573 13.8763 5.16354 12.232Z" fill="#1d4ed8"/>
</svg> */}

        </div>

        {/* Center pivot for needle */}
        <div className="absolute top-[250%] left-1/2 w-10 h-10 bg-[#213A5C] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
      </div>

      {/* Display the speed */}
      <div className=" font-bold mt-12 z-20 text-white text-md">{speed}</div>

      {/* Slider to change the speed value */}
      <input
        type="range"
        min="0"
        max="100"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="mt-4 w-64 hidden"
      />
    </div>
            </td>
        </tr>
      </table>

          
          </div>
        </div>
      </div>
      <div className="m-4">
      <h1 className="mt-0 mb-8 text-2xl font-semibold">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
        <ProjectDetailsCard isGrid={true} />
        <ProjectDetailsCard />

        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">More</h2>
            <svg width="150" height="30">
            <circle cx="10" cy="15" r="5" fill="#009688" />
            <line x1="15" y1="15" x2="130" y2="15" stroke="#009688" stroke-width="3" />
            <polygon points="135 10, 145 15, 135 20" fill="#009688" />
            </svg>
        </div>
        </div>



      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Attendance</h2>
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="flex justify-between items-center">
            <button className="font-bold text-xl text-green-300">&lt;</button>
            <span className="font-semibold text-lg">June</span>
            <button className="font-bold text-xl text-green-300">&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4 text-sm">
            <div className="font-bold">S</div>
            <div className="font-bold">M</div>
            <div className="font-bold">T</div>
            <div className="font-bold">W</div>
            <div className="font-bold">T</div>
            <div className="font-bold">F</div>
            <div className="font-bold">S</div>
            <div className="text-gray-400">27</div>
            <div className="text-gray-400">28</div>
            <div className="text-gray-400">29</div>
            <div className="text-gray-400">30</div>
            <div className="text-gray-400">31</div>
            <div>1</div>
            <div>2</div>
            <div className="font-bold bg-green-300 p-4 rounded-full">3</div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Today's Status</h2>
    <ul>
      <li className="mb-2"><strong>Attendance:</strong> Present <span className="text-green-500">●</span></li>
      <li className="mb-2"><strong>Location:</strong> Palazhi, Kozhikode</li>
      <li className="mb-2"><strong>Work/Task:</strong> Yolo App</li>
    </ul>
  </div>
</div>


<div className="flex justify-center items-center p-4">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31345.38888194014!2d76.29088499796678!3d10.874396559333672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d05da6d13fb1%3A0x1776c71d3d63d8de!2sCherpulassery%2C%20Kerala!5e0!3m2!1sen!2sin!4v1727846724698!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
        </>
  );
};

export default DeveloperDetails;
