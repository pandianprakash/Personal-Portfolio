// Typing effect (only if element exists)
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

// ================= HEADER LOAD =================
fetch("../HTML/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    const navLinks = document.querySelectorAll(".navbar a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href");

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  });


// ================= MOBILE NAV =================
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.innerHTML = navMenu.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// ================= SKILLS ANIMATION =================
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills-section');

function animateSkills() {
  if (!skillsSection) return;

  const sectionPosition = skillsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }
}

window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);

// ================= SKILL TAG HOVER =================
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-3px)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'translateY(0)';
  });
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// ================= INTERSECTION OBSERVER =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.skill-category, .badge, .timeline-item')
  .forEach(el => observer.observe(el));


  // Optional animation on scroll
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


document.addEventListener('DOMContentLoaded', function () {

  const progressSteps = document.querySelectorAll('.progress-step');
  const submitBtn = document.getElementById('submitBtn');

  const formFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
  };

  /* ===============================
     STEP CLICK – MOVE INDICATOR
  =============================== */
  progressSteps.forEach((step, index) => {
    step.style.cursor = 'pointer';

    step.addEventListener('click', () => {

      // 🔹 remove all active
      progressSteps.forEach(s => s.classList.remove('active'));

      // 🔹 add active till clicked step
      for (let i = 0; i <= index; i++) {
        progressSteps[i].classList.add('active');
      }

      // 🔹 focus logic
      if (index === 0) {
        formFields.name.focus();
      }
      if (index === 1) {
        formFields.message.focus();
      }
      if (index === 2) {
        submitBtn.focus();
      }
    });
  });

 
  function updateProgressSteps() {
    let completed = 0;

    if (formFields.name.value.trim() !== '') completed++;
    if (
      formFields.email.value.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email.value)
    ) completed++;
    if (formFields.message.value.trim().length >= 10) completed++;

    progressSteps.forEach((step, index) => {
      step.classList.toggle('active', index < completed);
    });
  }

  Object.values(formFields).forEach(field => {
    field.addEventListener('input', updateProgressSteps);
  });

  updateProgressSteps();
});

        // Add interactive hover effects
        document.querySelectorAll('.highlight-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.zIndex = '1';
            });
        });

        // Animate numbers on scroll into view
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };


        document.querySelectorAll('.highlight-card').forEach(card => {
            observer.observe(card);
        });
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";

  cursorDot.style.top = e.clientY + "px";
  cursorDot.style.left = e.clientX + "px";
});


