// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api_port from "../../config";
export const api = createApi({
  reducerPath: "api",
  // set baseURL
  baseQuery: fetchBaseQuery({ baseUrl: `${api_port}` }),
  endpoints: (builder) => ({
    //set all endpoint/routes
    getPosts: builder.query({
      query: () => "fetchHotel",
    }),
    getDestinations: builder.query({
      query: () => "fetchDestination",
    }),

    addHotels: builder.mutation({
      query: (addHotel) => ({
        url: "addHotel",
        method: "POST",
        body: addHotel,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetDestinationsQuery,
  useAddHotelsMutation,
} = api;
