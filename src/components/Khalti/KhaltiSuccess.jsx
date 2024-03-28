import React, { useEffect, useState } from "react";
import { useVerifySuccessesMutation } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const [verifySuccesses] = useVerifySuccessesMutation();

  const [isSuccess, setIsSuccess] = useState(false);

  const pidx = searchParams.get("pidx");
  console.log(isSuccess);
  useEffect(() => {
    const submitAlbum = async () => {
      try {
        console.log(pidx);
        const response = await verifySuccesses({ pidx });

        console.log(response.data.status, "res");
        if (response.data.status) {
          alert("Thank You! Payment has been received.");
          navigate("/hotels");
        }
      } catch (error) {
        console.error(error);
      }
    };

    submitAlbum(); // Call the function once
  }, []);
};
export default Success;
