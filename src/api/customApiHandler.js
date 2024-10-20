import axios from "axios";
import { getUserCredential } from "../common/utils";

const BE_API_KEY = "http://localhost:5000";

const customApiHandler =
  () =>
  async ({ url, method, body, params, headers }) => {
    try {
      axios.interceptors.request.use(
        (config) => {
          const userData = getUserCredential();
          if (userData) {
            config.headers.Authorization = `Bearer ${userData}`;
          }
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );
      let payload = {
        url: BE_API_KEY + url,
        method,
        data: body,
        params,
      };
      if (headers) payload = { ...payload, headers, formData: true };
      const result = await axios(payload);
      //  successCode &&
      //  successMessage(successCode && isNumber(successCode) ? successCode : result?.data?.message);
      return { data: result.data };
    } catch (error) {
      alert(error);

      //  needError && errorMessage(needError && isNumber(needError) ? needError : showError);

      return { data: error?.response?.data };
    }
  };
export default customApiHandler;
