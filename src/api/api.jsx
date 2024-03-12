// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api_port from "../../config";

export const api = createApi({
  reducerPath: "api",
  // set baseURL
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_port}`,
    credentials: "include", // Include credentials (cookies) with the request
    prepareHeaders: (headers, { getState }) => {
      const currentUser = getState().user.currentUser;
      if (currentUser) {
        headers.set("Email", currentUser.email);
      }
      return headers;
    },
  }),

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

    getRoomReservations: builder.query({
      query: () => "fetchRoomReservation",
    }),

    updateRoomResevations: builder.mutation({
      query: ({ id, updateRoomReservation }) => ({
        url: `updateRoomReservation/${id}`,
        method: "PUT",
        body: updateRoomReservation,
      }),
    }),

    deleteRoomReservations: builder.mutation({
      query(id) {
        return {
          url: `deleteRoomReservation/${id}`,
          method: "DELETE",
        };
      },
    }),

    addAdventures: builder.mutation({
      query: (addAdventure) => ({
        url: "addAdventure",
        method: "POST",
        body: addAdventure,
      }),
    }),

    getAdventures: builder.query({
      query: () => "fetchAdventure",
    }),

    updateAdventures: builder.mutation({
      query: ({ id, updateAdventure }) => ({
        url: `updateAdventure/${id}`,
        method: "PUT",
        body: updateAdventure,
      }),
    }),

    deleteAdventures: builder.mutation({
      query(id) {
        return {
          url: `deleteAdventure/${id}`,
          method: "DELETE",
        };
      },
    }),

    addAdventureReservations: builder.mutation({
      query: (addAdventureReservation) => ({
        url: "addAdventureReservation",
        method: "POST",
        body: addAdventureReservation,
      }),
    }),

    getFlights: builder.query({
      query: () => "fetchFlight",
    }),

    addFlightReservations: builder.mutation({
      query: (addFlightReservation) => ({
        url: "addFlightReservation",
        method: "POST",
        body: addFlightReservation,
      }),
    }),

    addUsers: builder.mutation({
      query: (login) => ({
        url: "login",
        method: "POST",
        body: login,
      }),
    }),
  }),
});

export const {
  useAddHotelsMutation,
  useGetHotelsQuery,
  useUpdateHotelsMutation,
  useDeleteHotelsMutation,
  useAddRoomsMutation,
  useGetRoomsQuery,
  useUpdateRoomsMutation,
  useDeleteRoomsMutation,
  useAddDestinationsMutation,
  useGetDestinationsQuery,
  useDeleteDestinationsMutation,
  useUpdateDestinationsMutation,
  useAddAdventuresMutation,
  useGetAdventuresQuery,
  useUpdateAdventuresMutation,
  useDeleteAdventuresMutation,
  useAddAdventureReservationsMutation,
  useAddRoomReservationsMutation,
  useGetRoomReservationsQuery,
  useUpdateRoomResevationsMutation,
  useDeleteRoomReservationsMutation,
  useGetFlightsQuery,
  useAddFlightReservationsMutation,
  useAddUsersMutation,
} = api;
