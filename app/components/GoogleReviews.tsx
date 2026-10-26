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

// Real reviews from Google Business Profile
const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Rishnita Bhandari',
    rating: 5,
    date: '4 months ago',
    text: 'Awesome place to be! It\'s aesthetically designed with small details like toast handles and croissant windows handles, adding to the charm.',
  },
  {
    id: '2',
    author: 'fathma nazrin',
    rating: 5,
    date: '3 weeks ago',
    text: 'Visited French Toast, Panampilly Nagar with friends for a casual hangout, and it completely exceeded our expectations. We ordered three different types of toasts, and every single one was a solid 10/10 - fresh, rich, and bursting with flavor!',
  },
  {
    id: '3',
    author: 'Mahima Ponnappan',
    rating: 5,
    date: '8 months ago',
    text: 'French Toast is a cosy, charming café that\'s perfect for a relaxed brunch or slow catch-up. The ambience feels warm and inviting with a casual, laid-back vibe that makes you want to linger.',
  },
  {
    id: '4',
    author: 'Hari Warrier',
    rating: 5,
    date: '4 months ago',
    text: 'If there is one cafe / eatery in Kochi / ernakulam you must visit it\'d be French toast. Amazing food, great service and ambience. And ofcourse do have the French toast at the French toast! It\'s heavenly!',
  },
  {
    id: '5',
    author: 'Banupriya Jawahar',
    rating: 5,
    date: '5 months ago',
    text: 'Had an amazing experience at French Toast Restaurant. We ordered almost ten dishes and every single one was made to perfection. The quality, presentation, and flavors were consistently excellent. Definitely one of the best dining experiences and a must visit.',
  },
  {
    id: '6',
    author: 'Tiya Titus',
    rating: 5,
    date: 'a year ago',
    text: 'It was shocking for me that this is one of the best French toast I have ever had, the flavour the aesthetics, the presentation it all deserves a 10/10. Let\'s talk about how clean the restaurant was and it service was excellent. Perfect!',
  },
  {
    id: '7',
    author: 'Manoj N Nair',
    rating: 5,
    date: '6 months ago',
    text: 'The best place for a continental breakfast in Kochi!! Do not miss it!! Their mulberry french toast is pure mouth watering indulgence!!',
  },
]

interface GoogleReviewsProps {
  rating?: number
  reviewCount?: number
  reviews?: Review[]
  googleBusinessUrl?: string
}

export default function GoogleReviews({
  rating = 4.3,
  reviewCount = 5324,
  reviews = SAMPLE_REVIEWS,
  googleBusinessUrl = 'https://maps.app.goo.gl/2hqY5aRCUGAccKuZ6',
}: GoogleReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return

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
