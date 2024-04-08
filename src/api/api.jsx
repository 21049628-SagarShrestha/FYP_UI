// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_port } from "../../config";

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
    //payment with khalti route
    verifyPayments: builder.mutation({
      query: (verifyPayment) => ({
        url: "khaltiApi",
        method: "POST",
        body: verifyPayment,
      }),
    }),
    verifySuccesses: builder.mutation({
      query: (verifySuccess) => ({
        url: "khaltiSuccess",
        method: "POST",
        body: verifySuccess,
      }),
    }),

    //set all endpoint/routes
    getHotels: builder.query({
      query: () => "fetchHotel",
    }),

    getHotelsAdmin: builder.query({
      query: () => "fetchHotelAdmin",
    }),

    addReviews: builder.mutation({
      query: (addReview) => ({
        url: "addReview",
        method: "POST",
        body: addReview,
      }),
    }),
    addReviewsA: builder.mutation({
      query: (addReviewA) => ({
        url: "addReviewA",
        method: "POST",
        body: addReviewA,
      }),
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

    getDestinationsAdmin: builder.query({
      query: () => "fetchDestinationAdmin",
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

    getAdventuresAdmin: builder.query({
      query: () => "fetchAdventureAdmin",
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

    getAdventureReservations: builder.query({
      query: () => "fetchAdventureReservation",
    }),

    getFlights: builder.query({
      query: () => "fetchFlight",
    }),

    getFlightsAdmin: builder.query({
      query: () => "fetchFlightAdmin",
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

    getUsers: builder.query({
      query: () => "fetchUser",
    }),

    changePasswords: builder.mutation({
      query: (changePassword) => ({
        url: "changePassword",
        method: "POST",
        body: changePassword,
      }),
    }),

    registerUsers: builder.mutation({
      query: (registerUser) => ({
        url: "signup",
        method: "POST",
        body: registerUser,
      }),
    }),
    passwordResets: builder.mutation({
      query: (passwordReset) => ({
        url: "passwordReset",
        method: "POST",
        body: passwordReset,
      }),
    }),
    resetPasswords: builder.mutation({
      query: (resetPassword) => ({
        url: "resetPassword",
        method: "POST",
        body: resetPassword,
      }),
    }),
  }),
});

export const {
  useAddHotelsMutation,
  useGetHotelsQuery,
  useGetHotelsAdminQuery,
  useUpdateHotelsMutation,
  useDeleteHotelsMutation,
  useAddRoomsMutation,
  useGetRoomsQuery,
  useUpdateRoomsMutation,
  useDeleteRoomsMutation,
  useAddDestinationsMutation,
  useGetDestinationsQuery,
  useGetDestinationsAdminQuery,
  useDeleteDestinationsMutation,
  useUpdateDestinationsMutation,
  useAddAdventuresMutation,
  useGetAdventuresQuery,
  useGetAdventuresAdminQuery,
  useUpdateAdventuresMutation,
  useDeleteAdventuresMutation,
  useAddAdventureReservationsMutation,
  useGetAdventureReservationsQuery,
  useAddRoomReservationsMutation,
  useGetRoomReservationsQuery,
  useUpdateRoomResevationsMutation,
  useDeleteRoomReservationsMutation,
  useGetFlightsQuery,
  useGetFlightsAdminQuery,
  useAddFlightReservationsMutation,
  useAddUsersMutation,
  useGetUsersQuery,
  useChangePasswordsMutation,
  useRegisterUsersMutation,
  usePasswordResetsMutation,
  useResetPasswordsMutation,
  useVerifyPaymentsMutation,
  useVerifySuccessesMutation,
  useAddReviewsMutation,
  useAddReviewsAMutation,
} = api;
