import React from 'react';

const Modal = ({ isVisible, onClose, children, modalHeader }) => {
  if (!isVisible) return null;

  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[500px] md:w-[100%]">
            {/* Header Container */}
            <div className='flex items-center justify-between mb-4'> {/* Adjusted the flex properties */}
            <h3 className="text-lg font-bold ">{modalHeader}</h3>
            <button onClick={onClose} className="text-gray-600 text-lg font-semibold border-2 rounded-full w-8 border-gray-600">X</button>
            </div>
            {children}
        </div>
        </div>

  );
};

export default Modal;
