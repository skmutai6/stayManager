import React from "react";

export default function Footer({ companyInfo }) {
  return (
    <footer className="text-center text-lg-start text-white bg-blue-400">
      {/* Section: Social media */}
      <section className="flex justify-center justify-between p-4 border-b border-gray-300">
        {/* Left */}
        <div className="me-5 d-none lg:block ">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* Left */}

        {/* Right */}
        <div>
          <a href="#" className="me-4 text-white hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="me-4 text-white hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href={`https://wa.me/${companyInfo.phone}`} 
            className="me-4 text-white hover:text-gray-300 d-none d-lg-block"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#" className="me-4 text-red hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="me-4 text-white hover:text-gray-300">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="me-4 text-white hover:text-gray-300">
            <i className="fab fa-github"></i>
          </a>
        </div>
        {/* Right */}
      </section>
      {/* Section: Social media */}

      {/* Section: Links */}
      <section className="bg-blue-500">
        <div className="container mx-auto py-5">
          {/* Grid row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Grid column */}
            <div className="mb-4">
              {/* Content */}
              <h6 className="text-xs text-white uppercase font-bold mb-2">
                <i className="fas fa-gem me-2"></i>Company name
              </h6>
              <p className="text-sm text-white">{companyInfo.companyName}</p>
              <p className="text-sm text-white">{companyInfo.address}</p>
              <p className="text-sm text-white">{companyInfo.email}</p>
              <p className="text-sm text-white">{companyInfo.phone}</p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="mb-4">
              {/* Links */}
              <h6 className="text-xs text-white uppercase font-bold mb-2">
                Products
              </h6>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Bed & Breakfast
                </a>
              </p>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Accomodation
                </a>
              </p>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Conference Facilities
                </a>
              </p>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Outdoor Activities
                </a>
              </p>
            </div>{" "}
            {/* Grid column */}
            {/* Grid column */}
            <div className="mb-4">
              {/* Links */}
              <h6 className="text-xs text-white uppercase font-bold mb-2">
                Useful links
              </h6>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Pricing
                </a>
              </p>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Settings
                </a>
              </p>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Orders
                </a>
              </p>
              <p className="text-sm text-white">
                <a href="#" className="hover:text-gray-300">
                  Help
                </a>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="mb-4">
              {/* Links */}
              <h6 className="text-xs text-white uppercase font-bold mb-2">
                Contact
              </h6>
              <p className="text-sm text-white">
                <i className="fas fa-home me-2"></i> Nairobi, Nrb 44773, Kenya
              </p>
              <p className="text-sm text-white">
                <i className="fas fa-envelope me-2"></i> thefourshotel@gmail.com
              </p>
              <p className="text-sm text-white">
                <i className="fas fa-phone me-2"></i> +254704372525
              </p>
              <p className="text-sm text-white">
                <i className="fas fa-print me-2"></i> +254797274881
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links */}

      {/* Copyright */}
      <div className="text-center py-4 bg-blue-600 text-white">
        © {new Date().getFullYear()} Copyright:
        <a href="#" className="text-white font-bold">
          {" "}
          Hetelogix
        </a>
      </div>
    </footer>
  );
}
