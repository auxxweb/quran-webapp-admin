// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const commonApi = tagInjection.injectEndpoints({
  endpoints: (builder) => ({
    getZonesList: builder.query({
      query: (params) => {
        return {
          params,
          url: "/api/admin/zone/all",
          method: "get",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetZonesListQuery } = commonApi;
