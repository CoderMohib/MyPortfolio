// Resume download functionality
document.getElementById("btn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "./Assets/MohibResume.pdf"; // Path to your resume PDF
  link.download = "MohibResume.pdf"; // Name of the downloaded file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");

const navIndicator = document.getElementById("nav-indicator");

// Function to move indicator to the active link with high precision
function moveIndicator() {
  const activeLink = document.querySelector(".navbar a.active");
  if (activeLink && navIndicator && navbar) {
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();

    // Use absolute bounding box difference for perfect sub-pixel alignment
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.height = `${linkRect.height}px`;
    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
    navIndicator.style.top = `${linkRect.top - navRect.top}px`;
  }
}

// Wrapper to ensure layout is settled before moving indicator
function updateIndicator() {
  requestAnimationFrame(() => {
    moveIndicator();
    // Second pass after a tiny delay for complex resizing (like Inspect Element)
    setTimeout(moveIndicator, 50);
  });
}

// Set initial active state and move indicator immediately
document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.querySelector('a[href="#Home"]');
  if (homeLink) {
    homeLink.classList.add("active");
    document.getElementById("Home").classList.add("activate");
    updateIndicator();
  }
});

function activateSection(event) {
  event.preventDefault();

  let target = event.target;
  if (target.tagName !== "A") {
    target = target.closest("a");
  }
  if (!target) return;

  navLinks.forEach((link) => link.classList.remove("active"));
  sections.forEach((section) => section.classList.remove("activate"));

  target.classList.add("active");
  updateIndicator();

  const sectionId = target.getAttribute("href").substring(1);
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("activate");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", activateSection);
});

// Initialize indicator and handle resize
window.addEventListener("load", updateIndicator);
window.addEventListener("resize", updateIndicator);

const typingTextElement = document.getElementById("typing-text");
const phrases = [
  "Full Stack Developer | MERN + Django",
  "Next.js & Astro Modern Web Apps",
  "React Native Mobile App Developer",
  "REST APIs | Firebase | Scalable Databases",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingTextElement.innerHTML =
      currentPhrase.substring(0, charIndex - 1) +
      '<span class="typed-cursor">|</span>';
    charIndex--;
    typingSpeed = 50;
  } else {
    typingTextElement.innerHTML =
      currentPhrase.substring(0, charIndex + 1) +
      '<span class="typed-cursor">|</span>';
    charIndex++;
    typingSpeed = 150;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at the end of the phrase
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before starting the next phrase
  }

  setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  // Clear initial text to start animation fresh
  typingTextElement.innerHTML = '<span class="typed-cursor">|</span>';
  setTimeout(type, 1000);
});

// JavaScript to toggle the menu
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const closeToggle = document.getElementById("close-toggle");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("right");
  // Toggle scroll lock
  if (navbar.classList.contains("right")) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

closeToggle.addEventListener("click", () => {
  navbar.classList.remove("right");
  document.body.classList.remove("no-scroll");
});
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = this;
    const popup = document.getElementById("success-popup");
    let param = {
      name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
      subject: document.getElementById("subject").value
        ? document.getElementById("subject").value
        : "Unknown",
    };
    emailjs
      .send("service_shiccwq", "template_1wj0uv8", param)
      .then(() => {
        form.classList.add("fade-out");
        popup.style.opacity = "1";
        popup.style.visibility = "visible";
        popup.style.display = "flex";
        form.reset();
      })
      .catch((error) => {
        alert("Failed to send email. Please try again.");
        console.error("EmailJS Error:", error);
      });
  });
function closePopup() {
  const popup = document.getElementById("success-popup");
  popup.style.display = "none";
  popup.style.opacity = "0";
  popup.style.visibility = "hidden";

  document.getElementById("contact-form").classList.remove("fade-out");
}

// Hybrid Infinite Draggable Tech Carousel Overhaul
const techCarousel = document.getElementById("tech-carousel");
const techTrack = document.getElementById("tech-track");

if (techCarousel && techTrack) {
  let isDown = false;
  let startX;
  let currentX = 0;
  let scrollLeft;
  let isHovered = false;
  let scrollSpeed = 0.8; // Pixels per frame
  let animationFrameId;

  // Function to update the track's transform
  function updateTransform() {
    techTrack.style.transform = `translate3d(${currentX}px, 0, 0)`;
  }

  // Seamless loop reset during auto-scroll or drag
  function checkLoop() {
    const halfWidth = techTrack.scrollWidth / 2;
    if (halfWidth === 0) return;

    if (currentX <= -halfWidth) {
      currentX += halfWidth;
    } else if (currentX > 0) {
      currentX -= halfWidth;
    }
  }

  // Function to apply 3D effect based on position
  function apply3DEffect() {
    const containerRect = techCarousel.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const items = techTrack.children;

    for (let item of items) {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;

      // Distance from center of the carousel (normalized)
      const distFromCenter = Math.abs(containerCenter - itemCenter);
      const maxDist = containerRect.width / 1.5; // Influence area

      let normDist = Math.max(0, 1 - distFromCenter / maxDist);

      // Calculate 3D transforms
      const scale = 0.75 + normDist * 0.55; // Scale between 0.75 and 1.3
      const translateZ = normDist * 200; // Popping out up to 200px for more depth
      const rotateY = (itemCenter - containerCenter) * -0.12; // More pronounced rotation for a curved look
      const opacity = 0.3 + normDist * 0.7; // Better fading at edges

      item.style.transform = `translate3d(0, 0, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`;
      item.style.opacity = opacity;

      // Dynamic icon coloring and text fading
      const img = item.querySelector("img");
      const span = item.querySelector("span");
      if (img) {
        const grayscale = (1 - normDist) * 100;
        const brightness = 0.6 + normDist * 0.4;
        img.style.filter = `grayscale(${grayscale}%) brightness(${brightness})`;
      }
      if (span) {
        span.style.color = `rgba(255, 255, 255, ${0.4 + normDist * 0.6})`;
      }
    }
  }

  // Auto-scroll loop
  function animate() {
    if (!isDown && !isHovered) {
      currentX -= scrollSpeed;
      checkLoop();
      updateTransform();
      apply3DEffect();
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  // Mouse drag events
  techCarousel.addEventListener("mousedown", (e) => {
    isDown = true;
    techCarousel.classList.add("dragging");
    const containerRect = techCarousel.getBoundingClientRect();
    startX = e.clientX - containerRect.left;
    scrollLeft = currentX;
  });

  techCarousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const containerRect = techCarousel.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const walk = (x - startX) * 1.5;
    currentX = scrollLeft + walk;

    checkLoop();
    updateTransform();
    apply3DEffect();
  });

  const stopDragging = () => {
    isDown = false;
    techCarousel.classList.remove("dragging");
  };

  techCarousel.addEventListener("mouseup", stopDragging);
  techCarousel.addEventListener("mouseleave", () => {
    isHovered = false;
    stopDragging();
  });

  techCarousel.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  // Touch events for mobile
  techCarousel.addEventListener(
    "touchstart",
    (e) => {
      isDown = true;
      const containerRect = techCarousel.getBoundingClientRect();
      startX = e.touches[0].clientX - containerRect.left;
      scrollLeft = currentX;
    },
    { passive: true },
  );

  techCarousel.addEventListener(
    "touchmove",
    (e) => {
      if (!isDown) return;
      const containerRect = techCarousel.getBoundingClientRect();
      const x = e.touches[0].clientX - containerRect.left;
      const walk = (x - startX) * 1.5;
      currentX = scrollLeft + walk;

      checkLoop();
      updateTransform();
      apply3DEffect();
    },
    { passive: true },
  );

  techCarousel.addEventListener("touchend", stopDragging);

  // Initialize and start
  updateTransform();
  animationFrameId = requestAnimationFrame(animate);

  // Re-calculate on resize just in case
  window.addEventListener("resize", () => {
    checkLoop();
    updateTransform();
  });
}
