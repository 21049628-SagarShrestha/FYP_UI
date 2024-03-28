import React, { useEffect } from "react";
import { useVerifyPaymentsMutation } from "../../api/api";
import { useSelector } from "react-redux";

const Khalti = ({ amounto }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [verifyPayments] = useVerifyPaymentsMutation();
  useEffect(() => {
    const submitAlbum = async () => {
      try {
        const payload = {
          return_url: "http://localhost:5173/khaltiSuccess",
          website_url: "http://localhost:5173",
          amount: 1000,
          purchase_order_id: "test5",
          purchase_order_name: "test",
          customer_info: {
            name: currentUser.email,
          },
        };

        const response = await verifyPayments(payload);

        if (response) {
          window.location.href = `${response?.data?.data?.payment_url}`;
        }
      } catch (error) {
        console.error(error);
      }
    };

    submitAlbum(); // Call the function once
  }, []); // Empty dependency array ensures the effect runs only once

  return <div>Khalti</div>;
};

export default Khalti;
