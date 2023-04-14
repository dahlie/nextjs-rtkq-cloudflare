import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

type CloudResponse = {
  cloud_description: string;
  cloud_name: string;
  geo_latitude: number | undefined;
  geo_longitude: number | undefined;
  geo_region: string;
  provider: string;
  provider_description: string;
};

export const aivenApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.aiven.io/v1/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getClouds: builder.query<{ clouds: Array<CloudResponse> }, void>({
      query: () => "clouds",
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCloudsQuery,
  util: { getRunningQueriesThunk },
} = aivenApi;

// export endpoints for use in SSR
export const { getClouds } = aivenApi.endpoints;
