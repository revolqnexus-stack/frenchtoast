'use client'

import { motion } from 'framer-motion'
import { Package, Clock, CreditCard } from 'lucide-react'
import './OnlineOrderingSection.css'

export default function OnlineOrderingSection() {
  return (
    <section className="online-ordering">
      <div className="online-ordering__container">
        {/* Header */}
        <div className="online-ordering__header">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="online-ordering__eyebrow"
          >
            Order Online
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="online-ordering__title"
          >
            Delivered to your door.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="online-ordering__subtitle"
          >
            Order your favorite dishes from French Toast via Swiggy or Zomato
          </motion.p>
        </div>

        {/* Platform Cards */}
        <div className="online-ordering__platforms">
          {/* Swiggy */}
          <motion.a
            href="https://www.swiggy.com/city/kochi/french-toast-panampilly-nagar-rest53819"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="platform-card__logo">
              <img src="/images/swiggy-1.svg" alt="Swiggy" />
            </div>
            <div className="platform-card__content">
              <h3 className="platform-card__title">Order on Swiggy</h3>
              <p className="platform-card__desc">Fast delivery from Panampilly Nagar</p>
              <div className="platform-card__badge">
                <Package size={16} />
                <span>Delivery & Pickup</span>
              </div>
            </div>
            <div className="platform-card__cta">
              Order Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>

          {/* Zomato */}
          <motion.a
            href="https://www.zomato.com/kochi/french-toast-panampilly-nagar"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-card platform-card--zomato"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            whileHover={{ y: -8 }}
          >
            <div className="platform-card__logo">
              <img src="/images/zomato-2.svg" alt="Zomato" />
            </div>
            <div className="platform-card__content">
              <h3 className="platform-card__title">Order on Zomato</h3>
              <p className="platform-card__desc">Quick delivery from Panampilly Nagar</p>
              <div className="platform-card__badge">
                <Package size={16} />
                <span>Delivery & Pickup</span>
              </div>
            </div>
            <div className="platform-card__cta">
              Order Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        </div>

        {/* Features */}
        <motion.div
          className="online-ordering__features"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="feature-item">
            <Clock size={24} strokeWidth={1.5} />
            <span>30-45 min delivery</span>
          </div>
          <div className="feature-item">
            <Package size={24} strokeWidth={1.5} />
            <span>Contactless delivery</span>
          </div>
          <div className="feature-item">
            <CreditCard size={24} strokeWidth={1.5} />
            <span>Online payment</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
