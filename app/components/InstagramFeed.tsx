'use client'

import { useEffect, useState } from 'react'
import './InstagramFeed.css'

interface InstagramPost {
  id: string
  permalink: string
  media_url: string
  caption: string
  media_type: string
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Better mix of food and cafe images
  const fallbackPosts = [
    {
      id: '1',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/food1.webp',
      caption: 'Strawberry French Toast perfection 🍓✨',
      media_type: 'IMAGE'
    },
    {
      id: '2',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/food2.webp',
      caption: 'Banoffee dreams 🍌🍮',
      media_type: 'IMAGE'
    },
    {
      id: '3',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/french1.webp',
      caption: 'Your cozy corner in Panampilly Nagar 🌿',
      media_type: 'IMAGE'
    },
    {
      id: '4',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/food4.webp',
      caption: 'Good morning goals ☕️🥐',
      media_type: 'IMAGE'
    },
    {
      id: '5',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/food7.webp',
      caption: 'Fresh & delicious, always 🍳',
      media_type: 'IMAGE'
    },
    {
      id: '6',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/french 2.webp',
      caption: 'Where good food meets great company 💛',
      media_type: 'IMAGE'
    },
    {
      id: '7',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/food8.webp',
      caption: 'Weekend brunch vibes 🥞',
      media_type: 'IMAGE'
    },
    {
      id: '8',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/french 3.webp',
      caption: 'Every corner tells a story 📖',
      media_type: 'IMAGE'
    },
    {
      id: '9',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/food10.webp',
      caption: 'Made with love, served with care ❤️',
      media_type: 'IMAGE'
    },
    {
      id: '10',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/french4.webp',
      caption: 'Warm lights, warm hearts ✨',
      media_type: 'IMAGE'
    },
    {
      id: '11',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/food13.webp',
      caption: 'Taste the difference 🌟',
      media_type: 'IMAGE'
    },
    {
      id: '12',
      permalink: 'https://www.instagram.com/frenchtoastindia/',
      media_url: '/images/cafe at night.jpg',
      caption: 'Evening ambience 🌙✨',
      media_type: 'IMAGE'
    }
  ]

  useEffect(() => {
    // Use fallback for now - real Instagram API requires server-side token
    setPosts(fallbackPosts)
    setLoading(false)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(posts.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(posts.length / 3)) % Math.ceil(posts.length / 3))
  }

  if (loading) {
    return (
      <section className="instagram-feed">
        <div className="container">
          <p className="instagram-feed__loading">Loading Instagram feed...</p>
        </div>
      </section>
    )
  }

  const visiblePosts = posts.slice(currentIndex * 3, currentIndex * 3 + 3)

  return (
    <section className="instagram-feed">
      <div className="container">
        <div className="instagram-feed__header">
          <div className="instagram-feed__title">
            <svg className="instagram-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="url(#instagram-gradient)"/>
              <defs>
                <linearGradient id="instagram-gradient" x1="2" y1="22" x2="22" y2="2">
                  <stop offset="0%" stopColor="#E3A55A"/>
                  <stop offset="50%" stopColor="#FF8B59"/>
                  <stop offset="100%" stopColor="#F2B94B"/>
                </linearGradient>
              </defs>
            </svg>
            <h2>Follow Us on Instagram</h2>
          </div>
          <a 
            href="https://www.instagram.com/frenchtoastindia/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-follow-btn"
          >
            @frenchtoastindia
          </a>
        </div>

        <div className="instagram-carousel">
          <button 
            className="instagram-carousel__btn instagram-carousel__btn--prev"
            onClick={prevSlide}
            aria-label="Previous posts"
          >
            ‹
          </button>

          <div className="instagram-carousel__track">
            {visiblePosts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-post"
              >
                <div className="instagram-post__image">
                  <img 
                    src={post.media_url} 
                    alt={post.caption?.slice(0, 100) || 'Instagram post'}
                    loading="lazy"
                  />
                  <div className="instagram-post__overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <button 
            className="instagram-carousel__btn instagram-carousel__btn--next"
            onClick={nextSlide}
            aria-label="Next posts"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
