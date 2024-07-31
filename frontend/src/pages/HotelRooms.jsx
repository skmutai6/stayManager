import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { server_url } from "../../config";

function HotelRooms() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { hotelId } = useParams(); //gets the hotelId from the URL
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${server_url}/hotels/${hotelId}/rooms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }

      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching rooms");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

   const toggleNav = () => {
     setIsNavOpen(!isNavOpen);
   };

  return (
    <div>
      <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Hotel Rooms
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={
                    room.image ||
                    "https://via.placeholder.com/300x200?text=Room+Image"
                  }
                  alt={`Room ${room.room_number}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-xl mb-2">
                    Room {room.room_number}
                  </h2>
                  <p className="text-gray-700 text-base mb-2">
                    {room.description}
                  </p>
                  <p className="text-gray-600">
                    Price: Ksh. {room.price} per night
                  </p>
                  <p className="text-gray-600">
                    Capacity: {room.capacity} guests
                  </p>
                  <p className="text-gray-600">Status: {room.status}</p>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelRooms;
