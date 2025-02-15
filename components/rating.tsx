"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Review {
  _id?: string;
  rating: number;
  review: string;
}

const RatingPage = () => {
  const searchParams = useSearchParams();
  const cakeId = searchParams ? searchParams.get("cakeId") : null; // Get `cakeId` from URL

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch reviews for the specific cakeId
  useEffect(() => {
    const fetchReviews = async () => {
      if (!cakeId) return;
      try {
        const res = await fetch(`/api/reviews?cakeId=${cakeId}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [cakeId]);

  // Submit a new review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !review.trim() || !cakeId) return;

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cakeId, rating, review }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]); // Show new review at the top
        setRating(0);
        setReview("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="rating-review-container">
      <h1 className="title">Rate & Review Your Cake!</h1>
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star-button ${star <= rating ? "active" : ""}`}
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          className="review-textarea"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Submit Review
        </button>
      </form>

      <div className="reviews-section">
        <h2 className="reviews-title">Customer Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((r, index) => (
            <div key={index} className="review-card">
              <div className="review-rating">
                {"★".repeat(r.rating)}{" "}
                <span className="empty-stars">
                  {"★".repeat(5 - r.rating)}
                </span>
              </div>
              <p className="review-text">{r.review}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </div>


<style jsx>{`
        .rating-review-container {
          max-width: 600px;
          margin: 100px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #444;
        }
        .title {
          text-align: center;
          color: #B864D4;
          margin-bottom: 20px;
        }
        .rating-form {
          background-color: #FDF3F3;
          border: 1px solid #F1DEDE;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .stars {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }
        .star-button {
          background: none;
          border: none;
          font-size: 40px;
          cursor: pointer;
          color: #ddd;
          transition: color 0.3s;
        }
        .star-button.active {
          color: #FFBA5A;
        }
        .review-textarea {
          width: 100%;
          height: 100px;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #F1DEDE;
          border-radius: 8px;
          resize: none;
          font-size: 14px;
        }
        .submit-button {
          display: block;
          width: 100%;
          background-color: #B864D4;
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .submit-button:hover {
          background-color: #B864D4;
        }
        .reviews-section {
          margin-top: 30px;
        }
        .reviews-title {
          text-align: center;
          margin-bottom: 20px;
        }
        .review-card {
          background-color: #FDF3F3;
          border: 1px solid #F1DEDE;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
        }
        .review-rating {
          font-size: 18px;
          color: #FFBA5A;
          margin-bottom: 10px;
        }
        .empty-stars {
          color: #ddd;
        }
        .review-text {
          font-size: 14px;
          color: #555;
        }
        .no-reviews {
          text-align: center;
          color: #999;
        }
      `}</style>
    </div>
  );
};


export default RatingPage;
