/* ============================================
   AURUM — Testimonial Carousel
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.querySelector('.testimonial-carousel');
  if (carouselEl) {
    const carousel = new TestimonialCarousel(carouselEl);
    carousel.init();
  }
});

class TestimonialCarousel {
  constructor(element) {
    this.element = element;
    this.track = element.querySelector('.carousel-track');
    this.slides = Array.from(element.querySelectorAll('.testimonial-slide'));
    this.prevBtn = element.querySelector('.carousel-prev');
    this.nextBtn = element.querySelector('.carousel-next');
    this.dotsContainer = element.querySelector('.carousel-dots');
    
    this.currentIndex = 0;
    this.autoplayInterval = 6000; // 6 seconds
    this.autoplayTimer = null;
    
    // Touch/Swipe state
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
  }

  init() {
    if (this.slides.length === 0) return;
    
    // Create dots indicators dynamically
    this.createDots();
    
    // Set initial active state
    this.updateCarousel();
    
    // Setup event listeners
    this.setupListeners();
    
    // Start Autoplay
    this.startAutoplay();
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoplay();
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  updateCarousel() {
    // 1. Move track
    const slideWidth = this.slides[0].getBoundingClientRect().width;
    // Fallback if client bounds is zero (not visible initially)
    const trackWidth = this.track.getBoundingClientRect().width || window.innerWidth;
    
    this.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - this.currentIndex) * 100}%)`;
      if (index === this.currentIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    // 2. Update dots active status
    if (this.dotsContainer) {
      const dots = Array.from(this.dotsContainer.querySelectorAll('.carousel-dot'));
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }

    // A11y: announce slide change to screen readers
    this.track.setAttribute('aria-live', 'polite');
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  setupListeners() {
    // Buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoplay();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoplay();
      });
    }
    
    // Keyboard Nav (Left/Right arrow keys)
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoplay();
      }
    });

    // Mouse hover pause
    this.element.addEventListener('mouseenter', () => this.stopAutoplay());
    this.element.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Touch/Swipe Events
    this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.track.addEventListener('touchend', () => this.handleTouchEnd());
  }

  // Swipe gesture logic
  handleTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.isDragging = true;
    this.stopAutoplay();
  }

  handleTouchMove(e) {
    if (!this.isDragging) return;
    this.currentX = e.touches[0].clientX;
  }

  handleTouchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    
    const diffX = this.startX - this.currentX;
    const threshold = 50; // min distance for swipe
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    this.startAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
