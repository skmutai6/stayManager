import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { server_url } from "../../config";
import { FaSpinner } from "react-icons/fa";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${server_url}/rooms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch rooms. Please Login ");
      }

      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching rooms");
    }
  };

   const toggleNav = () => {
     setIsNavOpen(!isNavOpen);
   };

  if (error) {
    return (
      <>
        <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
        <div className="container mx-auto py-8">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </>
    );
  }

  if (!rooms) {
    return (
      <>
        <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
        <div className="container mx-auto py-8">
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-4xl text-indigo-600" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="bg-gray-100 ml-8 mr-8 min-h-screen flex items-center justify-center">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold underline text-center mb-8">
            Explore Hotel Rooms
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="max-w-xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={room.image}
                  className="w-full h-64 object-cover object-center mb-4"
                  alt={`Room ${room.room_number}`}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-indigo-600">
                    Room {room.room_number}
                  </div>
                  <p className="text-gray-700 text-base mb-4 font-bold">
                    {room.description}
                  </p>
                  <div className="flex justify-between space-evenly flex-wrap items-center mb-4 ">
                    <p className="text-gray-600 ">
                      <b>Price:</b> Ksh. {room.price}
                    </p>
                    <p className="text-gray-600">
                      <b>Capacity:</b> {room.capacity}
                    </p>
                    <br />

                    <p
                      className={`text-gray-600 ${
                        room.status === "available"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      <b>Status:</b> {room.status}
                    </p>
                  </div>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    style={{ textDecoration: "none" }}
                  >
                    View Room Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomList;