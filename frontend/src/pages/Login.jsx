import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { UserContext } from "../context/AuthContext";

function Login() {
  const { login_user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    login_user(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        // Optionally handle success, e.g., redirect user
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Optionally handle error, e.g., show error message
      });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

   const toggleNav = () => {
     setIsNavOpen(!isNavOpen);
   };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed h-screen"
      style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
    >
      <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md w-full bg-white bg-opacity-90 shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Login
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?
            </span>{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
