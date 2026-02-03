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

document.querySelector('a[href="#Home"]').classList.add("active");
document.getElementById("Home").classList.add("activate");

function activateSection(event) {
  event.preventDefault();

  navLinks.forEach((link) => link.classList.remove("active"));
  sections.forEach((section) => section.classList.remove("activate"));

  const target = event.target;
  target.classList.add("active");
  const sectionId = target.getAttribute("href").substring(1);
  document.getElementById(sectionId).classList.add("activate");
}

navLinks.forEach((link) => {
  link.addEventListener("click", activateSection);
});

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
});
closeToggle.addEventListener("click", () => {
  navbar.classList.remove("right");
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
