// ================= TYPING EFFECT =================
const typingElement = document.getElementById("typing");

if (typingElement) {
  const text = "Software Developer";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      typingElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    }
  }

  typeEffect();
}

// ================= HEADER LOAD + MOBILE NAV =================
document.addEventListener("DOMContentLoaded", () => {
  fetch("../HTML/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      /* ===== ACTIVE LINK ===== */
      const navLinks = document.querySelectorAll(".navbar a");
      const currentPage = window.location.pathname.split("/").pop();

      navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });

      /* ===== MOBILE MENU ===== */
      const navToggle = document.getElementById("navToggle");
      const navMenu = document.querySelector(".nav-menu");

      if (!navToggle || !navMenu) {
        console.log("Hamburger elements not found");
        return;
      }

      navToggle.addEventListener("click", (e) => {
        e.stopPropagation();   // outside click close avoid pannum
        navMenu.classList.toggle("active");

        navToggle.innerHTML = navMenu.classList.contains("active")
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
      });

      document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove("active");
          navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });

      /* ===== SCROLL EFFECT ===== */
      const header = document.querySelector(".header");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });
    });
});

// ================= INTERSECTION OBSERVER =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

document
  .querySelectorAll(".skill-category, .badge, .timeline-item, .highlight-card")
  .forEach(el => observer.observe(el));


// ================= PROJECT CARD ANIMATION =================
const cards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});


// ================= CONTACT FORM PROGRESS =================
document.addEventListener("DOMContentLoaded", function () {

  const progressSteps = document.querySelectorAll(".progress-step");
  const submitBtn = document.getElementById("submitBtn");

  const formFields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
  };

  progressSteps.forEach((step, index) => {
    step.style.cursor = "pointer";

    step.addEventListener("click", () => {
      progressSteps.forEach(s => s.classList.remove("active"));

      for (let i = 0; i <= index; i++) {
        progressSteps[i].classList.add("active");
      }

      if (index === 0) formFields.name.focus();
      if (index === 1) formFields.message.focus();
      if (index === 2) submitBtn.focus();
    });
  });

  function updateProgressSteps() {
    let completed = 0;

    if (formFields.name.value.trim() !== "") completed++;
    if (
      formFields.email.value.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email.value)
    ) completed++;
    if (formFields.message.value.trim().length >= 10) completed++;

    progressSteps.forEach((step, index) => {
      step.classList.toggle("active", index < completed);
    });
  }

  Object.values(formFields).forEach(field => {
    field.addEventListener("input", updateProgressSteps);
  });

  updateProgressSteps();
});


// ================= CUSTOM CURSOR =================
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

if (cursor && cursorDot) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";

    cursorDot.style.top = e.clientY + "px";
    cursorDot.style.left = e.clientX + "px";
  });
}
