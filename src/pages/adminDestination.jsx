// ExampleComponent.js
import React, { useState } from "react";
import { useGetDestinationsQuery } from "@/api/api";
import AddDestination from "@/components/AddDestination";

const adminDestination = () => {
  const { data: response, error, isLoading } = useGetDestinationsQuery();
  const destinations = response?.destinations || [];
  const [showButton, setShowButton] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  return (
    <div>
      <h1>Destinations</h1>
      {showButton && <AddDestination />}
      <button onClick={() => setShowButton(true)}> Add More Destination</button>
      <div>
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Location</td>
              <td>Description</td>
              <td>Rating</td>
              <td>Places TO Visit</td>
              <td>Cost</td>
              <td colSpan="2">Action</td>
            </tr>
          </thead>
          <tbody>
            {destinations &&
              destinations.map((i) => {
                return (
                  <tr key={i._id}>
                    <td>
                      <img src={i.image} alt={i.name} height={90} width={90} />
                    </td>
                    <td>{i.name}</td>
                    <td>{i.location}</td>
                    <td>{i.description}</td>
                    <td>{i.rating}</td>
                    <td>{i.placesToVisit}</td>
                    <td>{i.cost}</td>
                    {/* <td>
                      <a onClick={() => setRooms(i._id)}>Add Room</a>
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
export default adminDestination;
