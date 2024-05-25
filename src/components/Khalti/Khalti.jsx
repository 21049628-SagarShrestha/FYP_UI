import React, { useEffect } from "react";
import { useVerifyPaymentsMutation } from "../../api/api";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 function from uuid

const Khalti = ({ amounto, purpose }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { reservationStatus } = useSelector((state) => state.reservation);
  const [verifyPayments] = useVerifyPaymentsMutation();
  useEffect(() => {
    const submitAlbum = async () => {
      try {
        const purchase_order_id = uuidv4();

        const payload = {
          return_url: `http://localhost:5173/khaltiSuccess`,
          website_url: "http://localhost:5173",
          amount: amounto * 100,
          purchase_order_id: purchase_order_id,
          purchase_order_name: purpose,
          customer_info: {
            name: currentUser.email,
          },
        };
        const response = await verifyPayments(payload);

        if (response) {
          window.location.href = `${response?.data?.payment_url}`;
        }
      } catch (error) {
        console.error(error);
      }
    };

    submitAlbum(); // Call the function once
  }, []); // Empty dependency array ensures the effect runs only once
  return null;
};

export default Khalti;
