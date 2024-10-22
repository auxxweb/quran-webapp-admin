
// export const PUBLIC_USER_FRONTEND_URL = "http://localhost:3000"
export const PUBLIC_USER_FRONTEND_URL = "https://gedexoquiz.auxxweb.in"



export const getUserCredential = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUserCredStr = window.localStorage.getItem("userCredential");
  if (storedUserCredStr) {
    try {
      return JSON.parse(storedUserCredStr);
    } catch (error) {
      console.error("Error parsing user credential:", error);
    }
  }
  return null;
};

export const publicRoutes = ["/login", "/forgotPassword", "/changePassword"];


const formatOptions = {
  day: "2-digit",
  month: "short",
  year: "2-digit",
};

const dateAndTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
};

const timeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
};

export const dateFormater = (date) => {
  const formatedDate = new Date(date).toLocaleString("en-IN", formatOptions);
  return formatedDate;
};

export const dateAndTimeFormater = (date) => {
  const formatedDate = new Date(date).toLocaleString(
    "en-IN",
    dateAndTimeFormatOptions
  );
  return formatedDate;
};

export const timeFormater = (date) => {
  const formatedTime = new Date(date).toLocaleString("en-IN", timeFormatOptions);
  return formatedTime;
};
