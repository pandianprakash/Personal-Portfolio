// ================= TYPING EFFECT =================

const typingElement = document.getElementById("typing");

if (typingElement) {
  const texts = [
    "Web Developer",
    "Full Stack Developer",
    "MERN Stack Developer"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 1200);
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}
document.addEventListener("DOMContentLoaded", () => {
  fetch("../HTML/header.html")
    .then(res => res.text())
    .then(data => {
      const headerContainer = document.getElementById("header");
      headerContainer.innerHTML = data;

      // Show header after load
    const headerElement = document.querySelector(".header");

setTimeout(() => {
  headerElement.classList.add("show");
}, 100);
      headerContainer.style.opacity = "1";
      headerContainer.style.visibility = "visible";

      /* ===== ACTIVE LINK ===== */
      const navLinks = document.querySelectorAll(".navbar a");
      const currentPage = window.location.pathname.split("/").pop();

      navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (currentPage === "" && linkPage === "index.html") {
          link.classList.add("active");
        } 
        else if (currentPage === linkPage) {
          link.classList.add("active");
        }
      });

      /* ===== MOBILE MENU ===== */
      const navToggle = document.querySelector(".nav-toggle");
      const navMenu = document.querySelector(".nav-menu");

      if (!navToggle || !navMenu) {
        console.error("nav-toggle or nav-menu not found in header.html");
        return;
      }

      navToggle.addEventListener("click", (e) => {
        e.stopPropagation();
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
    })
    .catch(err => console.error("Header load error:", err));
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

