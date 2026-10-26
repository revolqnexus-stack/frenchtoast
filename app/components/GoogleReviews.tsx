'use client'

import { useState, useEffect } from 'react'
import './GoogleReviews.css'

interface Review {
  id: string
  author: string
  rating: 5 | 4 | 3 | 2 | 1
  date: string
  text: string
  avatar?: string
}

// Sample reviews - replace with real ones from Google Business Profile
const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Priya Menon',
    rating: 5,
    date: '2 weeks ago',
    text: 'Absolutely love this place! The croissants are perfectly flaky, coffee is excellent, and the cozy atmosphere makes it perfect for weekend brunches. Staff is super friendly too.',
  },
  {
    id: '2',
    author: 'Rahul Krishnan',
    rating: 5,
    date: '1 month ago',
    text: 'Best breakfast spot in Kochi! Their eggs benedict is divine and the fresh juice selection is amazing. Great ambiance for both work and leisure.',
  },
  {
    id: '3',
    author: 'Anjali Nair',
    rating: 5,
    date: '3 weeks ago',
    text: 'Such a charming café! Love the vintage decor and warm vibes. The pancakes and French toast are must-tries. Perfect place for catching up with friends.',
  },
  {
    id: '4',
    author: 'Arjun Thomas',
    rating: 4,
    date: '2 months ago',
    text: 'Great food and coffee. The outdoor seating area is lovely. Gets a bit crowded on weekends but totally worth the wait. Highly recommend their sandwiches!',
  },
  {
    id: '5',
    author: 'Divya Sharma',
    rating: 5,
    date: '1 week ago',
    text: 'My go-to spot for breakfast meetings! Reliable wifi, peaceful atmosphere, and delicious food. The avocado toast and cappuccino combo is my favorite.',
  },
]

interface GoogleReviewsProps {
  rating?: number
  reviewCount?: number
  reviews?: Review[]
  googleBusinessUrl?: string
}

export default function GoogleReviews({
  rating = 4.8,
  reviewCount = 6000,
  reviews = SAMPLE_REVIEWS,
  googleBusinessUrl = 'https://www.google.com/maps/search/French+Toast+Panampilly+Nagar+Kochi/',
}: GoogleReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length)
    }, 5000) // Change review every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ))
  }

  const goToReview = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="google-reviews">
      <div className="reviews-container">
        {/* Header with aggregate rating */}
        <div className="reviews-header">
          <div className="google-logo">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          
          <div className="aggregate-rating">
            <div className="rating-number">{rating.toFixed(1)}</div>
            <div className="rating-stars">{renderStars(5)}</div>
            <div className="rating-count">
              {reviewCount.toLocaleString('en-IN')}+ Google reviews
            </div>
          </div>
        </div>

        {/* Review carousel */}
        <div className="reviews-carousel">
          <div className="reviews-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.author} />
                      ) : (
                        <span>{review.author.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="reviewer-name">{review.author}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                  </div>
                  <div className="review-rating">{renderStars(review.rating)}</div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Carousel indicators */}
          <div className="carousel-indicators">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToReview(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA to view all reviews */}
        <div className="reviews-footer">
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-btn"
          >
            View all reviews on Google
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
