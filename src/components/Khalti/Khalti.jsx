import React, { useEffect } from "react";
import { useVerifyPaymentsMutation } from "../../api/api";
import { useSelector } from "react-redux";

const Khalti = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [verifyPayments] = useVerifyPaymentsMutation();

  useEffect(() => {
    const submitAlbum = async () => {
      try {
        const payload = {
          return_url: "http://localhost:5173/hotels",
          website_url: "http://localhost:5173",
          amount: parseInt(900) * 100,
          purchase_order_id: "test123",
          purchase_order_name: "test",
          customer_info: {
            name: "ss",
            email: currentUser.email,
            phone: "980111",
          },
        };

        const response = await verifyPayments(payload);

        console.log(response?.data?.data?.payment_url); // Log the response or use it as required

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
