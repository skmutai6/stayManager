import React from 'react'
import Header from './Header'

export default function About_us() {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  
  return (
    <div>
      <Header toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-8">About Us</h1>
        </div>
      </div>
    </div>
  );
}
