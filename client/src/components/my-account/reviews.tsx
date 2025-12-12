"use client"
import React, { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Edit, Trash2, Share2 } from 'lucide-react'

const ReviewSection = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: "CMF by Nothing Buds 42 dB Active Noise Cancellation, Ultra Bass Technology, 35.5 Hrs playtime Bluetooth",
      rating: 4.4,
      ratingText: "Very Good",
      reviewText: "Sound quality is very good",
      reviewerName: "Shubham Choudhary",
      isVerifiedBuyer: true,
      date: "20 Jun, 2025",
      likes: 0,
      dislikes: 0,
      productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=60&h=60&fit=crop"
    }
  ])

  const [pendingReviews] = useState([
    {
      id: 1,
      productName: "Matsun Large Waterproof Travel Backpack for Men & Women Trekking bag Rucksack - 90 L",
      productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop"
    },
    {
      id: 2,
      productName: "POCO C61 (Ethereal Blue, 64 GB)",
      productImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=60&h=60&fit=crop"
    },
    {
      id: 3,
      productName: "Pigeon SPECIAL 5 L Outer Lid Induction Bottom Pressure Cooker",
      productImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop"
    }
  ])

  const handleLike = (reviewId:number, isLike:boolean) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        if (isLike) {
          return { ...review, likes: review.likes + 1 }
        } else {
          return { ...review, dislikes: review.dislikes + 1 }
        }
      }
      return review
    }))
  }

  const renderStars = (rating:number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - Math.ceil(rating)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-current text-yellow-400 opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    )
  }

  const renderEmptyStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white max-w-4xl mx-auto">
      {/* My Reviews Section */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          My Reviews ({reviews.length})
        </h2>

        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 p-4 border border-gray-200 mb-4">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 flex-shrink-0 rounded">
                <img 
                  src={review.productImage} 
                  alt="Product"
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1">
                {/* Product Name */}
                <h3 className="text-sm text-gray-700 mb-2 leading-relaxed">
                  {review.productName}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white px-2 py-1 text-xs font-medium rounded">
                    {review.rating}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {review.ratingText}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-900 mb-3">
                  {review.reviewText}
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span>{review.reviewerName}</span>
                  {review.isVerifiedBuyer && (
                    <>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>Certified Buyer</span>
                    </>
                  )}
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{review.date}</span>
                </div>

                {/* Like/Dislike and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(review.id, true)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{review.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleLike(review.id, false)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                    >
                      <ThumbsDown className="h-3 w-3" />
                      <span>{review.dislikes}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Edit
                    </button>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Delete
                    </button>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Reviews Section */}
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Orders you might be interested reviewing
        </h2>

        {pendingReviews.map((item) => (
          <div key={item.id} className="flex gap-4 items-start mb-6">
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-100 flex-shrink-0 rounded">
              <img 
                src={item.productImage} 
                alt="Product"
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-sm text-gray-700 mb-3 leading-relaxed">
                {item.productName}
              </h3>

              {/* Empty Stars */}
              <div className="mb-3">
                {renderEmptyStars()}
              </div>

              {/* Rate and Review Button */}
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Rate and Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSection