function displaymenu() {
  var x = document.getElementById("logo");
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

let slideIndex = 1;
let autoSlideInterval = null;

showSlides(slideIndex);
startAutoSlide();

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
  autoSlideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function restartAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

function getNextFriday() {
  const now = new Date();
  const day = now.getDay(); // 0=Sunday, 5=Friday
  const nextFriday = new Date(now);

  // Set target to this Friday 8:15 AM
  const daysUntilFriday = (5 - day + 7) % 7 || 7; // if today is Friday, go to next Friday
  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(8, 15, 0, 0);

  return nextFriday;
}

function updateCountdown() {
  const now = new Date();
  const target = getNextFriday();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "Event Started!";
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

// POPUP IMAGE ON PAGE LOAD
window.addEventListener("load", () => {
  const modal = document.getElementById("popupModal");
  const closeBtn = modal.querySelector(".close");

  // Show modal
  modal.style.display = "block";

  // Close when clicking 'X'
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
