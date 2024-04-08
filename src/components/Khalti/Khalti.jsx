import React, { useEffect } from "react";
import { useVerifyPaymentsMutation } from "../../api/api";
import { useSelector } from "react-redux";

const Khalti = ({ amounto, purpose }) => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(purpose, "p1");
  const { reservationStatus } = useSelector((state) => state.reservation);
  console.log(reservationStatus);
  const [verifyPayments] = useVerifyPaymentsMutation();
  useEffect(() => {
    const submitAlbum = async () => {
      try {
        const payload = {
          return_url: `http://localhost:5173/khaltiSuccess/`,
          website_url: "http://localhost:5173/",
          amount: 1000,
          purchase_order_id: "S8",
          purchase_order_name: purpose,
          customer_info: {
            name: currentUser.email,
          },
        };

        const response = await verifyPayments(payload);
        console.log(response?.data?.data?.payment_url);

        if (response) {
          window.location.href = `${response?.data?.data?.payment_url}`;
        }
      } catch (error) {
        console.error(error);
      }
    };

    submitAlbum(); // Call the function once
  }, []); // Empty dependency array ensures the effect runs only once
};

export default Khalti;
