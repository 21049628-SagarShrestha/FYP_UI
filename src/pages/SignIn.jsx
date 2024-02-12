import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../state/slices/userSlice";

export default function SignIn() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <h1>The user is {user}</h1>
        <div>
          <button onClick={() => dispatch(setUser("sagar"))}>Set Name</button>
          <button onClick={() => dispatch(clearUser())}>Clear Name</button>
        </div>
      </div>
    </>
  );
}
