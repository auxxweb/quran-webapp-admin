// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const participantApi = tagInjection.injectEndpoints({
  endpoints: (builder) => ({
    getParticipant: builder.query({
      query: (body) => {
        return {
          body,
          url: "/api/admin/participant",
          method: "get",
        };
      },
    }),
    addParticipant: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/participant",
          method: "post",
        };
      },
    }),
    editParticipant: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/participant",
          method: "patch",
        };
      },
    }),
    deleteParticipant: builder.mutation({
      query: (params) => {
        return {
          params,
          url: "/api/admin/participant",
          method: "delete",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddParticipantMutation,
  useGetParticipantQuery,
  useDeleteParticipantMutation,
  useEditParticipantMutation,
} = participantApi;
