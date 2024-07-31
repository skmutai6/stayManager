import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { server_url } from "../../config";
import { FaSpinner } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(6);
  const [sortMethod, setSortMethod] = useState('recent'); // 'recent' or 'rating'

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${server_url}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    sortReviews();
  }, [sortMethod]);

  const sortReviews = () => {
    let sortedReviews = [...reviews];
    if (sortMethod === 'recent') {
      sortedReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortMethod === 'rating') {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    }
    setReviews(sortedReviews);
  };

  const handleViewMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 6, reviews.length));
  };

  const handleSeeLess = () => {
    setDisplayCount(6);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        </div>
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Reviews</h1>
          <div className="flex items-center">
            <select
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value)}
              className="mr-4 p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
            </select>
            <Link
              to="/reviews/form"
              className="bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Add Review
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, displayCount).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-200">
                <p className="font-semibold"> {review.username}</p>
                <div className="flex items-center mt-1">
                  {[...Array(review.rating)].map((_, index) => (
                    <svg
                      key={index}
                      className="h-5 w-5 fill-current text-yellow-400"
                      viewBox="0 0 28 28"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 14.2l-5.76 3.39a.75.75 0 01-1.16-.65v-7.28L.57 7.12a.75.75 0 01.43-1.28L8.8 5.2l3.66-6.58a.75.75 0 011.34 0l3.66 6.58 7.8.72a.75.75 0 01.43 1.28l-4.52 4.64v7.28a.75.75 0 01-1.16.65L10 14.2z"
                      />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">
                    Rating: {review.rating}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-700 mt-2 ">
                  <b>Comment:</b> {review.comment}
                </p>
                <p className="text-gray-600 mt-2">
                  <b>
                    Date: <span className="text-blue-400 ml-2 text-sm">{review.created_at}</span>
                  </b>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          {displayCount < reviews.length && (
            <button
              onClick={handleViewMore}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              View More
            </button>
          )}
          {displayCount > 6 && (
            <button
              onClick={handleSeeLess}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              See Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
