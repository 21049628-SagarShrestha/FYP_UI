// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api_port from "../../config";
export const api = createApi({
  reducerPath: "api",
  // set baseURL
  baseQuery: fetchBaseQuery({ baseUrl: `${api_port}` }),
  endpoints: (builder) => ({
    //set all endpoint/routes
    getHotels: builder.query({
      query: () => "fetchHotel",
    }),
    getDestinations: builder.query({
      query: () => "fetchDestination",
    }),
    getRooms: builder.query({
      query: () => "fetchRoom",
    }),

    addHotels: builder.mutation({
      query: (addHotel) => ({
        url: "addHotel",
        method: "POST",
        body: addHotel,
      }),
    }),
    addDestinations: builder.mutation({
      query: (addDestination) => ({
        url: "addDestination",
        method: "POST",
        body: addDestination,
      }),
    }),

    addRoomReservations: builder.mutation({
      query: (addRoomReservation) => ({
        url: "addRoomReservation",
        method: "POST",
        body: addRoomReservation,
      }),
    }),

    addRooms: builder.mutation({
      query: (addRoom) => ({
        url: "addRoom",
        method: "POST",
        body: addRoom,
      }),
    }),

    deleteHotels: builder.mutation({
      query(id) {
        return {
          url: `deleteHotel/${id}`,
          method: "DELETE",
        };
      },
    }),

    updateHotels: builder.mutation({
      query: ({ id, updateHotel }) => ({
        url: `updateHotel/${id}`,
        method: "PUT",
        body: updateHotel,
      }),
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetDestinationsQuery,
  useGetRoomsQuery,
  useAddHotelsMutation,
  useAddRoomReservationsMutation,
  useAddRoomsMutation,
  useAddDestinationsMutation,
  useDeleteHotelsMutation,
  useUpdateHotelsMutation,
} = api;
