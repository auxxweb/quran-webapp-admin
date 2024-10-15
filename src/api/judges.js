// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const judgesApi = tagInjection.injectEndpoints({
    endpoints: (builder) => ({
        getJudges: builder.query({
      query: (body) => {
        return {
          body,
          url: "/api/admin/judge",
          method: "get",
        };
      },
    }),
    addJudge: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/judge",
          method: "post",
        };
      },
    }),
    editJudge: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/judge",
          method: "patch",
        };
      },
    }),
    deleteJudge: builder.mutation({
      query: (params) => {
        return {
          params,
          url: "/api/admin/judge",
          method: "delete",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddJudgeMutation,
  useGetJudgesQuery,
  useEditJudgeMutation,
  useDeleteJudgeMutation,
} = judgesApi;
