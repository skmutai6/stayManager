import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import Spinner from "./components/Spinner"; 

// replacing components with lazy load components
const Home = lazy(() => import("./pages/Home"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Reviews_Form = lazy(() => import("./pages/Reviews_Form"));
const RoomList = lazy(() => import("./pages/RoomList"));
const RoomDetail = lazy(() => import("./pages/RoomDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const ResetPasswordForm = lazy(() => import("./pages/ResetPasswordForm"));
const Hotels = lazy(() => import("./pages/Hotels"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const HotelRooms = lazy(() => import("./pages/HotelRooms"));
const AdminHotels = lazy(() => import("./pages/AdminHotels"));
const AdminBookings = lazy(() => import("./pages/AdminBookings"));
const AdminRooms = lazy(() => import("./pages/AdminRooms"));
const AdminProfile = lazy(() => import("./pages/AdminProfile"));

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer />
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* PrivateRoute for authenticated users */}
            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reviews-form" element={<Reviews_Form />} />
            </Route>

            {/* Route for login */}
            <Route
              path="/login"
              element={
                localStorage.getItem("access_token") ? <Home /> : <Login />
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/hotels" element={<AdminHotels />} />
            <Route path="/admin/rooms" element={<AdminRooms />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/profile" element={<AdminProfile />} />

            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/room-list" element={<RoomList />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotel/:hotelId/rooms" element={<HotelRooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/form" element={<Reviews_Form />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
