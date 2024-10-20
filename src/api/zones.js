// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const zonesApi = tagInjection.injectEndpoints({
  endpoints: (builder) => ({
    getZones: builder.query({
      query: (params) => {
        return {
          params,
          url: "/api/admin/zone",
          method: "get",
        };
      },
    }),
    addZone: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/zone",
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        };
      },
    }),
    editZone: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/zone",
          method: "patch",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        };
      },
    }),
    deleteZone: builder.mutation({
      query: (params) => {
        return {
          params,
          url: "/api/admin/zone",
          method: "delete",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetZonesQuery,
  useAddZoneMutation,
  useEditZoneMutation,
  useDeleteZoneMutation,
} = zonesApi;
