import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import { server_url } from "../../config";

export default function AdminRooms({ onAddRoom }) {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

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
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        throw new Error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to fetch rooms");
    }
  };

  const handleEdit = (room) => {
    setEditingRoom({ ...room });
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
  };

  const handleInputChange = (e) => {
    const value =
      e.target.name === "price" || e.target.name === "capacity"
        ? Number(e.target.value)
        : e.target.value;
    setEditingRoom({
      ...editingRoom,
      [e.target.name]: value,
    });
  };

  const handleSaveEdit = async () => {
    if (
      !editingRoom.description ||
      !editingRoom.price ||
      !editingRoom.capacity ||
      !editingRoom.status ||
      !editingRoom.image
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const response = await fetch(`${server_url}/rooms/${editingRoom.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(editingRoom),
      });

      if (response.ok) {
        toast.success("Room updated successfully");
        setEditingRoom(null);
        fetchRooms();
      } else {
        throw new Error("Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update room");
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="bg-gray-700 rounded-lg shadow-md p-6 mt-8 mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-200">Rooms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gray-600 rounded-lg p-4 flex flex-col justify-between"
            >
              {editingRoom && editingRoom.id === room.id ? (
                <div>
                  <input
                    type="text"
                    name="description"
                    value={editingRoom.description}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editingRoom.price}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                  />
                  <input
                    type="number"
                    name="capacity"
                    value={editingRoom.capacity}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                  />
                  <select
                    name="status"
                    value={editingRoom.status}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Booked</option>
                  </select>
                  <input
                    type="text"
                    name="image"
                    value={editingRoom.image}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <img
                      src={room.image}
                      alt={room.description}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-lg font-semibold text-gray-200 mb-2">
                      Room {room.room_number}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      {room.description}
                    </p>
                    <p className="text-lg font-semibold text-green-600">
                      Ksh. {room.price}
                    </p>
                    <p className="text-sm text-gray-400">
                      Capacity: {room.capacity}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`text-sm font-semibold uppercase px-3 py-1 rounded-full ${
                        room.status === "available"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {room.status}
                    </span>
                    <button
                      onClick={() => handleEdit(room)}
                      className="inline-block px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
