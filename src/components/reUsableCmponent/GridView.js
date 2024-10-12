import React from 'react'
import { employeeData } from '../../api/constents'
import { useNavigate } from 'react-router-dom'

const GridView = ({ selectedDesignation, selectedRole }) => {
  // Filter employees based on selectedDesignation
//   const filteredEmployees = (selectedDesignation === "" || selectedDesignation === "All")
//   ? employeeData
//   : employeeData.filter(employee => employee.role === selectedDesignation);
const navigate = useNavigate()
const filteredEmployees = employeeData.filter(employee => {
    const matchesDesignation = 
      selectedDesignation === "" || 
      selectedDesignation === "client" || 
      selectedDesignation === "All" || 
      employee.role === selectedDesignation;
  
    const matchesRole = 
      selectedRole === "" || 
      selectedRole === "All" || 
    //   employee.employId === selectedRole || 
      employee.employId.toLowerCase().includes(selectedRole.toLowerCase()) ||
      employee.name.toLowerCase().includes(selectedRole.toLowerCase()) 
    // Both conditions must be true for the employee to be included in the filtered list
    return matchesDesignation && matchesRole;
  });
  

  return (
    <div className="flex flex-wrap justify-center cursor-pointer" onClick={() => navigate("/developerdetails")}> {/* Parent wrapper for the grid layout */}
      {filteredEmployees.map((employee, index) => (
        <div 
          key={index} 
          className="m-2 bg-white shadow-md rounded-[40px] rounded-tr-none p-4 sm:p-6 md:p-4 w-[227px] h-[210px]"
        >
        {selectedDesignation === 'client' ?
          <h2 onClick={() => navigate('/clientsdetails')} align='right' className='cursor-pointer mt-[-8px] font-extrabold'>...</h2>
        :
        <h2 align='right' className='mt-[-8px] font-extrabold'>...</h2>
        }
          <div className="text-center items-center sm:flex-col md:flex-row">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-20 h-20 rounded-full mb-4 sm:mb-4 md:ml-14"
            />
            <h2 className="text-lg font-bold">{employee.name}</h2>
            <p className="text-gray-700">{employee.designation}</p>
            <p className='mb-4 text-sm text-gray-500 font-semibold'>{selectedDesignation === 'client' ? employee.department : <span className='text-green-400 font-semibold text-xl'>{employee.strideCode}</span>}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GridView;
