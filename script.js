let slideIndex = 1;
let autoSlideInterval = null;

function plusSlides(n) {
  showSlides((slideIndex += n));
  restartAutoSlide();
}

function currentSlide(n) {
  showSlides((slideIndex = n));
  restartAutoSlide();
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
  }
}

function startAutoSlide() {
  // Clear any existing interval before starting a new one
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  autoSlideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function restartAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// ===================================
// Countdown Logic
// ===================================

function getNextFriday() {
  const now = new Date();
  const day = now.getDay(); // 0=Sunday, 5=Friday
  const nextFriday = new Date(now);
  
  // Event date specified in HTML is Oct 24, 2025. 
  // For a fixed date event, it's better to use that date rather than the "next Friday" logic.
  // Using the hardcoded date from your HTML comments for accuracy (Friday, Oct 24, 2025 at 8:15 AM)
  
  // NOTE: Assuming 2025 is the target year from your HTML
  const targetDate = new Date("October 24, 2025 08:15:00");
  
  return targetDate;
}

function updateCountdown() {
  const now = new Date();
  const target = getNextFriday();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "Happening Now❗";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById(
    "countdown"
  ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();


// ===================================
// DOMContentLoaded Listener (for all initialization)
// ===================================

window.addEventListener("DOMContentLoaded", () => {
  // Slideshow initialization
  showSlides(slideIndex);
  startAutoSlide();
  
  // 1. POPUP IMAGE ON PAGE LOAD
  const modal = document.getElementById("popupModal");
  if (modal) {
    const closeBtn = modal.querySelector(".close");
    
    // Show modal
    modal.style.display = "block";
    
    // Close when clicking 'X'
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
    }

    // Close when clicking outside modal content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // 2. MOBILE MENU TOGGLE LOGIC (Replaces the broken displaymenu function)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
          // Toggles the 'active' class which controls mobile menu visibility via CSS
          navLinks.classList.toggle('active'); 
      });

      // Close menu when a link is clicked (improves mobile UX)
      navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              // Check screen width to ensure we only close on mobile/tablet view
              if (window.innerWidth <= 768) { 
                  navLinks.classList.remove('active');
              }
          });
      });
  }
});