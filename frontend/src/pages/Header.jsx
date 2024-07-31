import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../index.css";

function Header({ toggleNav, isNavOpen, setIsNavOpen }) {
  const { currentUser, logout } = useContext(UserContext);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    logout();
  };

  return (
    <div>
      <nav className="mx-auto px-4 py-2 max-w-7xl bg-blue-500 shadow-lg mt-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white">
            HETELOGIX
          </Link>

          {/* Navbar toggler for small screens */}
          <button
            className="block lg:hidden focus:outline-none"
            onClick={toggleNav}
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Navbar links for large screens */}
          <div className="hidden lg:flex lg:flex-grow items-center justify-end">
            <NavLinks currentUser={currentUser} handleLogout={handleLogout} />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 w-1/2 bg-blue-500 z-50 transform transition-transform duration-300 ease-in-out ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/"
              className="text-xl font-bold text-white"
              onClick={() => setIsNavOpen(false)}
            >
              HETELOGIX
            </Link>
            <button className="text-white" onClick={toggleNav}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <NavLinks
            currentUser={currentUser}
            handleLogout={handleLogout}
            setIsNavOpen={setIsNavOpen}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
}

function NavLinks({ currentUser, handleLogout, setIsNavOpen, isMobile }) {
  const linkClass = isMobile
    ? "block py-2 text-white hover:text-gray-300 focus:outline-none"
    : "px-3 py-2 text-white hover:text-gray-300 focus:outline-none";

  const handleClick = () => {
    if (isMobile && setIsNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <ul className={isMobile ? "flex flex-col" : "flex flex-row list-none"}>
      <li>
        <Link to="/" className={linkClass} onClick={handleClick}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/hotels" className={linkClass} onClick={handleClick}>
          Hotels
        </Link>
      </li>
      <li>
        <Link to="/room-list" className={linkClass} onClick={handleClick}>
          Rooms
        </Link>
      </li>
      <li>
        <Link to="/contact" className={linkClass} onClick={handleClick}>
          Contact
        </Link>
      </li>
      {currentUser && (
        <li>
          <Link to="/profile" className={linkClass} onClick={handleClick}>
            Profile
          </Link>
        </li>
      )}
      <li>
        {currentUser ? (
          <button className={linkClass} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className={linkClass} onClick={handleClick}>
            Login
          </Link>
        )}
      </li>
    </ul>
  );
}

export default Header;
