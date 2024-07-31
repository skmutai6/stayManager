import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import { server_url } from "../../config";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [editingHotel, setEditingHotel] = useState(null);
  const [showRooms, setShowRooms] = useState({});

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch(`${server_url}/hotels`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      } else {
        throw new Error("Failed to fetch hotels");
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast.error("Failed to fetch hotels");
    }
  };

  const createHotel = async () => {
    try {
      const response = await fetch(`${server_url}/hotels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(newHotel),
      });
      if (response.ok) {
        toast.success("Hotel created successfully");
        setShowAddHotel(false);
        setNewHotel({ name: "", description: "", image: "" });
        fetchHotels();
      } else {
        throw new Error("Failed to create hotel");
      }
    } catch (error) {
      console.error("Error creating hotel:", error);
      toast.error("Failed to create hotel");
    }
  };

  const updateHotel = async (id) => {
    try {
      const response = await fetch(`${server_url}/hotels/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(editingHotel),
      });
      if (response.ok) {
        toast.success("Hotel updated successfully");
        setEditingHotel(null);
        fetchHotels();
      } else {
        throw new Error("Failed to update hotel");
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Failed to update hotel");
    }
  };

  const deleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        const response = await fetch(`${server_url}/hotels/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.ok) {
          toast.success("Hotel deleted successfully");
          fetchHotels();
        } else {
          throw new Error("Failed to delete hotel");
        }
      } catch (error) {
        console.error("Error deleting hotel:", error);
        toast.error("Failed to delete hotel");
      }
    }
  };

  const fetchRooms = async (hotelId) => {
    try {
      const response = await fetch(`${server_url}/hotels/${hotelId}/rooms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setShowRooms((prev) => ({ ...prev, [hotelId]: data }));
      } else {
        throw new Error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to fetch rooms");
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="mt-8 bg-gray-700 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-200">Hotels</h3>
        <button
          onClick={() => setShowAddHotel(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Hotel
        </button>
        {showAddHotel && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Hotel Name"
              value={newHotel.name}
              onChange={(e) =>
                setNewHotel({ ...newHotel, name: e.target.value })
              }
              className="w-full p-2 mb-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="Description"
              value={newHotel.description}
              onChange={(e) =>
                setNewHotel({ ...newHotel, description: e.target.value })
              }
              className="w-full p-2 mb-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newHotel.image}
              onChange={(e) =>
                setNewHotel({ ...newHotel, image: e.target.value })
              }
              className="w-full p-2 mb-2 text-gray-800"
            />
            <button
              onClick={createHotel}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Hotel
            </button>
          </div>
        )}
        {hotels && hotels.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <li
                key={hotel.id}
                className="bg-gray-600 rounded-lg shadow-md p-4"
              >
                {editingHotel && editingHotel.id === hotel.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingHotel.name}
                      onChange={(e) =>
                        setEditingHotel({
                          ...editingHotel,
                          name: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 text-gray-800"
                    />
                    <input
                      type="text"
                      value={editingHotel.description}
                      onChange={(e) =>
                        setEditingHotel({
                          ...editingHotel,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 text-gray-800"
                    />
                    <input
                      type="text"
                      value={editingHotel.image}
                      onChange={(e) =>
                        setEditingHotel({
                          ...editingHotel,
                          image: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 text-gray-800"
                    />
                    <button
                      onClick={() => updateHotel(hotel.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingHotel(null)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="p-4">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-lg font-semibold text-gray-200">
                      {hotel.name}
                    </p>
                    <p className="text-sm text-gray-400">{hotel.description}</p>
                    <button
                      onClick={() => setEditingHotel(hotel)}
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2 mt-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHotel(hotel.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded mt-2 "
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => fetchRooms(hotel.id)}
                      className="bg-indigo-500 text-white px-4 py-1 rounded mt-2  ml-2"
                    >
                      Show Rooms
                    </button>
                    {showRooms[hotel.id] && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-200 mb-2">
                          Rooms
                        </h4>
                        <ul>
                          {showRooms[hotel.id].map((room) => (
                            <li key={room.id} className="text-sm text-gray-400">
                              Room {room.room_number} - {room.description} (Ksh. 
                              {room.price})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No hotels available.</p>
        )}
      </div>
    </div>
  );
}
