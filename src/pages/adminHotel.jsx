// ExampleComponent.js
import React from "react";
import { useGetPostsQuery } from "../api/api";
import api_port from "../../config";
import AddHotel from "../components/addHotel";

const adminHotel = () => {
  const { data: response, error, isLoading } = useGetPostsQuery();
  const hotels = response?.Hotels || [];
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  return (
    <div>
      <AddHotel />
      <div>
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Location</td>
              <td>Description</td>
              <td>Room</td>
              <td>Facilities</td>
              <td>Rating</td>
              <td>Contact</td>
              <td colSpan="2">Action</td>
            </tr>
          </thead>
          <tbody>
            {hotels &&
              hotels.map((i) => {
                return (
                  <tr key={i._id}>
                    <td>
                      <img
                        src={`${api_port}images/hotels/${i.image}`}
                        alt={i.name}
                        height={90}
                        width={90}
                      />
                    </td>
                    <td>{i.name}</td>
                    <td>{i.location}</td>
                    <td>{i.description}</td>
                    <td>{i.room}</td>
                    <td>{i.facilities}</td>
                    <td>{i.rating}</td>
                    <td>{i.contact}</td>
                    {/* <td>
                      <a
                        onClick={() => update(i._id)}
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => remove(i._id)}
                        className={styles.delbtn}
                      >
                        Delete
                      </a>
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default adminHotel;
