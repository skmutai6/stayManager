import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { server_url } from "../../config";

function RoomDetail() {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingError, setBookingError] = useState(null);
  const { id } = useParams();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    fetchRoomDetail();
  }, [id]);

  const fetchRoomDetail = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${server_url}/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch room details");
      }

      const data = await response.json();
      setRoom(data);
    } catch (err) {
      setError(
        err.message ||
          "An error occurred while fetching room details. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookRoom = () => {
    setBookingError(null);
    setBookingModalOpen(true);
  };

  const confirmBooking = async () => {
    try {
      const response = await fetch(`${server_url}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          room_id: id,
          check_in: checkIn,
          check_out: checkOut,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await response.json();
      toast.success("Booking successful");
      setBookingModalOpen(false);
      fetchRoomDetail();
    } catch (err) {
      setBookingError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500 font-bold text-lg mb-8">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center mt-8 text-red-500 font-bold text-lg mb-8">
        <p>No room data available.</p>
      </div>
    );
  }

   const toggleNav = () => {
     setIsNavOpen(!isNavOpen);
   };

  return (
    <>
      <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="bg-gray-100 min-h-screen py-12 ml-14 mr-14">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Room {room.room_number}
          </h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Room Image */}
              <div className="md:w-1/2">
                <img
                  src={room.image}
                  alt={`Room ${room.room_number}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right side - Room Details */}
              <div className="md:w-1/2 p-6 md:p-8 bg-white border-t md:border-t-0 md:border-l border-gray-200">
                <div className="grid grid-cols-1 gap-1 md:gap-4 md:grid-cols-2 mb-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Room Number
                    </h2>
                    <p className="text-gray-600">{room.room_number}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Description
                    </h2>
                    <p className="text-gray-600">{room.description}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Price
                    </h2>
                    <p className="text-gray-600">Ksh. {room.price} per night</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Capacity
                    </h2>
                    <p className="text-gray-600">{room.capacity} guests</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Status
                    </h2>
                    <p
                      className={`text-lg font-bold ${
                        room.status === "available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {room.status}
                    </p>
                  </div>
                </div>

                {/* Availability and Booking */}
                <div className="mt-6">
                  {room.status === "available" && (
                    <button
                      onClick={handleBookRoom}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Book Room
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {isBookingModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">
                Book Room {room.room_number}
              </h3>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="checkIn"
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkIn"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="checkOut"
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOut"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {bookingError && (
                <p className="text-red-500 text-xs italic mb-4">
                  {bookingError}
                </p>
              )}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RoomDetail;
