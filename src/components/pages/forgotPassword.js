import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center "
        style={{ backgroundImage: 'url("/quranBackground.jpeg")' }}
      >
        <div className="relative z-10 flex flex-col h-full items-center space-y-20 justify-center p-3 ">
          <div className="flex flex-row w-28 h-auto justify-center">
            <img
              src="/quranLogo.svg"
              alt=" Logo"
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="w-full max-w-lg ">
            <form className="bg-white border space-y-3 sm:space-y-4 border-[#C19D5C] shadow-lg rounded-lg text-center py-8 sm:py-10 px-3 sm:px-8  w-full">
              <h3 className=" text-2xl sm:text-5xl text-[#C19D5C] font-semibold">
                Forgot Password
              </h3>
              <h3 className=" text-sm sm:text-base text-[#686219]">
                Enter Your email id To Create New Password
              </h3>

              {/* Email Input Field */}
              <div className="relative mb-10 group space-y-1 items-center">
                {/* Increased margin for spacing */}
                <label
                  className=" px-2 sm:px-3 py-1 text-base sm:text-lg font-medium text-[#C19D5C] bg-transparent m-auto" // Increased padding and adjusted label positioning
                  htmlFor="name"
                >
                  Email Id
                </label>
                <input
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-[#CCCCCC] text-gold-500 placeholder-gold-500 rounded-[22px] bg-transparent outline-none focus:border-gold-600 "
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>
              {/* Sign In Button */}
              <div className="pt-3">
                <button
                  onClick={() => navigate("/changePassword")}
                  className="w-full  py-3 max-w-[217px] hover:-translate-y-1 transform transition rounded-lg bg-gradient-to-r from-[#C19D5C] to-[#5F4D2D]  text-white  "
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;