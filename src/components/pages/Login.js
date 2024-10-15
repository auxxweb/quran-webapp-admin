import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/auth";
import { getUserCredential } from "../../common/utils";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userData = getUserCredential();
  const [login, { isLoading }] = useLoginMutation();

  console.log("user", userData);

  if (userData) return <>Loading</>;

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const email = formData.get("email"); // Get email input value
    const password = formData.get("password");
    try {
      const body = {
        email,
        password,
      };
      const res = await login?.(body);
      if (res?.data?.success) {
        localStorage.setItem(
          "userCredential",
          JSON.stringify(res?.data?.admin?.token)
        );
        navigate("/"); // Redirect after form submission
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div>
        <title>Login | Bay Fitness</title>
      </div>
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("/quranBackground.jpeg")' }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center border border-[#C19D5C]">
          <div className="flex flex-row w-25 h-auto justify-center">
            <img src="/quranLogo.svg" alt="Bay Fitness Logo" priority />
          </div>
          <div className="w-auto h-auto">
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-lg p-8 max-w-md w-full"
            >
              <h1 className="text-xl text-[#C19D5C] font-semibold">Login</h1>
              <h3 className="text-xl text-[#C19D5C]">
                Enter your username and password to Login in!
              </h3>

              {/* Email Input Field */}
              <div className="relative mb-10 group items-center">
                {/* Increased margin for spacing */}
                <label
                  className="px-3 py-1 text-base text-[#C19D5C] bg-transparent m-auto" // Increased padding and adjusted label positioning
                  htmlFor="name"
                >
                  User Name
                </label>
                <input
                  className="w-full px-6 py-4 border border-gold-500 text-gold-500 placeholder-gold-500 rounded-full bg-transparent outline-none focus:border-gold-600 focus:border-white focus:text-white"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>

              {/* Password Input Field */}
              <div className="relative mb-4 group">
                <label
                  className="px-3 py-1 text-base text-[#C19D5C] bg-transparent m-auto" // Increased padding and adjusted label positioning
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-6 py-4 border border-gold-500 text-gold-500 placeholder-gold-500 rounded-full bg-transparent outline-none"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  class="absolute inset-y-0 end-0 flex items-center z-20 px-3 mt-5 mr-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                >
                  <svg
                    class="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      class="hs-password-active:hidden"
                      d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                    ></path>
                    <path
                      class="hs-password-active:hidden"
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    ></path>
                    <path
                      class="hs-password-active:hidden"
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    ></path>
                    <line
                      class="hs-password-active:hidden"
                      x1="2"
                      x2="22"
                      y1="2"
                      y2="22"
                    ></line>
                    <path
                      class="hidden hs-password-active:block"
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
                    <circle
                      class="hidden hs-password-active:block"
                      cx="12"
                      cy="12"
                      r="3"
                    ></circle>
                  </svg>
                </button>
              </div>

              {/* Forgot Password Link (Right-aligned under Password) */}
              <div className="flex justify-end mb-8text-sm text-[#C19D5C] hover:underline">
                Forgot Password?
              </div>

              {/* Sign In Button */}
              <button
                disabled={isLoading}
                className="w-full mt-5 py-4 bg-gold-500 text-[#C19D5C] font-bold rounded-full hover:bg-gold-600 focus:outline-none focus:ring focus:ring-gold-500 focus:ring-opacity-50"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
