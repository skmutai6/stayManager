import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { toast } from 'react-toastify'; 
import Header from './Header';

function Register() {
  const navigate = useNavigate();
  const { register_user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [is_admin, setIs_admin] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);


  // function handleSubmit(e) {
  //   e.preventDefault();

  //   // Password length check
  //   if (password.length < 4) {
  //     toast.error("Password must be at least 4 characters long");
  //     return;
  //   }

  //   // Matching passwords check
  //   if (password !== repeatPassword) {
  //     toast.error("Passwords do not match");
  //     return;
  //   }

  //   // Password complexity check
  //   if (!isPasswordValid(password)) {
  //     toast.error("Password should contain at least one digit and should not be a simple sequence.");
  //     setPasswordError(true);
  //     return;
  //   }

  //   register_user(username, email, password, phone_number, is_admin)
  //     .then(() => {
  //       // Clear the form fields
  //       setEmail("");
  //       setPassword("");
  //       setRepeatPassword("");
  //       setUsername("");
  //       setPhone_number("");
  //       setIs_admin(false);

  //       // Redirect or navigate to another page after successful registration
  //       navigate('/login'); 
  //     })
  //     .catch(error => {
  //       if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
  //         toast.error("Email already exists. Please use a different email.");
  //         setEmailError(true);
  //       } else {
  //         toast.error(`Registration failed: ${error.message}`);
  //       }
  //     });
  // }
  function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    if (username.trim() === "") {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (phone_number.trim() === "") {
      setPhoneError("Phone number is required");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
      hasError = true;
    } else if (!isPasswordValid(password)) {
      setPasswordError(
        "Password should contain at least one digit and should not be a simple sequence."
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
      hasError = true;
    } else {
      setRepeatPasswordError("");
    }

    if (hasError) {
      return;
    }

    register_user(username, email, password, phone_number, is_admin)
      .then(() => {
        // Clear the form fields
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setUsername("");
        setPhone_number("");
        setIs_admin(false);

        // Redirect or navigate to another page after successful registration
        navigate("/login");
      })
      .catch((error) => {
        if (
          (error.response &&
            error.response.data &&
            error.response.data.error === "Email already exists" || error.response.data.error === "Phone number already exists")
        ) {
          if (error.response.data.error === "Email already exists") {
            toast.error("Email already exists. Please use a different email.");
            setEmailError(true);
          } else if (error.response.data.error === "Phone number already exists") {
            toast.error("Phone number already exists. Please use a different phone number.");
            setPhoneError(true);
          }
          
          setEmailError(true);
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      });

    //set general error
    if (hasError) {
      setGeneralError("Please correct the errors in the form.");
      return;
    }
  }

  function isPasswordValid(password) {
    const containsDigit = /\d/.test(password);
    const isSequential = /(123|234|345|456|567|678|789|890|901)/.test(password);
    
    return containsDigit && !isSequential;
  }

   const toggleNav = () => {
     setIsNavOpen(!isNavOpen);
   };

  return (
    <div>
      <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4 text-center text-blue-500">
            Register
          </h1>
          {generalError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {generalError}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-md font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Enter your username"
                required
              />
              {usernameError && (
                <p className="mt-1 text-sm text-red-600">{usernameError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
                className={`mt-1 block w-full px-3 py-2 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                  emailError ? "text-red-500" : ""
                }`}
                placeholder="Enter your email address"
                required
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-md font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                value={phone_number}
                onChange={(e) => {
                  setPhone_number(e.target.value);
                  setPhoneError(false);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Enter your phone number"
                required
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600">{phoneError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(isPasswordValid(e.target.value));
                }}
                className={`mt-1 block w-full px-3 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                  passwordError ? "text-red-500" : ""
                }`}
                placeholder="Enter your password"
                required
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="repeatPassword"
                className="block text-md font-medium text-gray-700"
              >
                Repeat Password
              </label>
              <input
                type="password"
                id="repeatPassword"
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                  setPasswordError(isPasswordValid(e.target.value));
                }}
                className={`mt-1 block w-full px-3 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                  passwordError ? "text-red-500" : ""
                }`}
                placeholder="Repeat your password"
                required
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />

              <label
                htmlFor="terms"
                className="ml-2 block text-md text-gray-900"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-blue-500">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-base text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>
          <div className="mt-6 border-t border-gray-200"></div>
          <div className="mt-6">
            <p className="text-md text-center text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
