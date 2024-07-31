import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Contact() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyI04ke_TVCc4ANx4GymYEUb7BwYbMn2d2JO5OExSYdC45w3m42H5xDh11Qdc7HA1nKSA/exec";
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(scriptURL, { method: "POST", body: new FormData(e.target) })
      .then((response) => {
        setMessage("Message sent successfully");
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
      })
      .catch((error) => {
        console.error("Error!", error.message);
        setMessage("An error occurred. Please try again.");
      });
  };

   const toggleNav = () => {
     setIsNavOpen(!isNavOpen);
   };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          name="submit-to-google-sheet"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
      {/* <Footer /> cannot read properties of undefined companyName */}
    </div>
  );
}

export default Contact;