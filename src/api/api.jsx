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

    addHotels: builder.mutation({
      query: (addHotel) => ({
        url: "addHotel",
        method: "POST",
        body: addHotel,
      }),
    }),

    updateHotels: builder.mutation({
      query: ({ id, updateHotel }) => ({
        url: `updateHotel/${id}`,
        method: "PUT",
        body: updateHotel,
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

    getRooms: builder.query({
      query: () => "fetchRoom",
    }),

    addRooms: builder.mutation({
      query: (addRoom) => ({
        url: "addRoom",
        method: "POST",
        body: addRoom,
      }),
    }),

    deleteRooms: builder.mutation({
      query(id) {
        return {
          url: `deleteRoom/${id}`,
          method: "DELETE",
        };
      },
    }),

    updateRooms: builder.mutation({
      query: ({ id, updateRoom }) => ({
        url: `updateRoom/${id}`,
        method: "PUT",
        body: updateRoom,
      }),
    }),

    getDestinations: builder.query({
      query: () => "fetchDestination",
    }),

    addDestinations: builder.mutation({
      query: (addDestination) => ({
        url: "addDestination",
        method: "POST",
        body: addDestination,
      }),
    }),

    updateDestinations: builder.mutation({
      query: ({ id, updateDestination }) => ({
        url: `updateDestination/${id}`,
        method: "PUT",
        body: updateDestination,
      }),
    }),

    deleteDestinations: builder.mutation({
      query(id) {
        return {
          url: `deleteDestination/${id}`,
          method: "DELETE",
        };
      },
    }),

    addRoomReservations: builder.mutation({
      query: (addRoomReservation) => ({
        url: "addRoomReservation",
        method: "POST",
        body: addRoomReservation,
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
  useDeleteRoomsMutation,
  useDeleteDestinationsMutation,
  useUpdateHotelsMutation,
  useUpdateRoomsMutation,
  useUpdateDestinationsMutation,
} = api;
