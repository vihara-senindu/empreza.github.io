// ===== Menu Toggle =====
function displaymenu() {
  var x = document.getElementById("logo");
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

// ===== Slideshow =====
let slideIndex = 1;
let autoSlideInterval = null;

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

  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
  restartAutoSlide();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  restartAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function restartAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize slideshow on page load
document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
  startAutoSlide();
});

// ===== Countdown =====
function getNextFriday() {
  const now = new Date();
  const day = now.getDay(); // 0=Sunday, 5=Friday
  const nextFriday = new Date(now);

  let daysUntilFriday = (5 - day + 7) % 7;
  if (daysUntilFriday === 0 && (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() >= 15))) {
    daysUntilFriday = 7; // Today is Friday but event time passed
  }

  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(8, 15, 0, 0);
  nextFriday.setMilliseconds(0);

  return nextFriday;
}

function updateCountdown() {
  const now = new Date();
  const target = getNextFriday();
  const diff = target - now;

  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  if (diff <= 0) {
    countdownEl.innerHTML = "Event Started!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Start countdown after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
