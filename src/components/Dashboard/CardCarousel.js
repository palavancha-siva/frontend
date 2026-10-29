import React, { useRef } from 'react';
import './CardCarousel.css';

export const CardCarousel = ({ children, title }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="card-carousel-section">
      <div className="carousel-header">
        {title && <h3 className="carousel-title">{title}</h3>}
        <div className="carousel-arrows">
          <button onClick={() => scroll('left')} className="arrow-btn" aria-label="Previous">
            ‹
          </button>
          <button onClick={() => scroll('right')} className="arrow-btn" aria-label="Next">
            ›
          </button>
        </div>
      </div>
      <div className="carousel-track" ref={scrollRef}>
        {children}
      </div>
    </div>
  );
};

export default CardCarousel;
