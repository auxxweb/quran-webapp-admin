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

export const publicRoutes = ["/login"];
