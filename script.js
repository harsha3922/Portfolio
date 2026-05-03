// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendAnother = document.getElementById('send-another');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');

// ===== Sticky Navigation =====
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

// ===== Animated Progress Bar =====
const targetProgress = 65; // 65% progress
let currentProgress = 0;
let progressAnimated = false;

function animateProgressBar() {
  if (progressAnimated) return;
  
  const currentWorkSection = document.getElementById('current-work');
  const sectionTop = currentWorkSection.offsetTop;
  const sectionHeight = currentWorkSection.offsetHeight;
  const scrollPosition = window.scrollY + window.innerHeight;
  
  // Start animation when section is 20% visible
  if (scrollPosition > sectionTop + (sectionHeight * 0.2)) {
    progressAnimated = true;
    
    const animationDuration = 1500; // 1.5 seconds
    const frameRate = 60;
    const totalFrames = (animationDuration / 1000) * frameRate;
    const increment = targetProgress / totalFrames;
    
    const animate = () => {
      currentProgress += increment;
      
      if (currentProgress < targetProgress) {
        progressBar.style.width = `${currentProgress}%`;
        progressPercent.textContent = `${Math.round(currentProgress)}%`;
        requestAnimationFrame(animate);
      } else {
        progressBar.style.width = `${targetProgress}%`;
        progressPercent.textContent = `${targetProgress}%`;
      }
    };
    
    animate();
  }
}

window.addEventListener('scroll', animateProgressBar);

// Check on page load in case section is already visible
window.addEventListener('load', () => {
  setTimeout(animateProgressBar, 500);
});

// ===== Contact Form Handling =====
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  setTimeout(() => {
    // Show success message
    formSuccess.classList.add('active');
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 1000);
});

// Send another message
sendAnother.addEventListener('click', () => {
  formSuccess.classList.remove('active');
});

// ===== Smooth Scroll for All Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in animation to cards
document.querySelectorAll('.skill-card, .project-card, .stat-card, .task').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeInObserver.observe(card);
});

// ===== Typing Effect for Hero (Optional Enhancement) =====
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== Parallax Effect for Hero Background =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  
  if (scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
});

// ===== Console Welcome Message =====
console.log('%c Welcome to Harsh Thakur\'s Portfolio! ', 
  'background: linear-gradient(135deg, #00d4ff 0%, #7b61ff 100%); color: #0a0a0f; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
);
console.log('%c Built with HTML, CSS & JavaScript ', 
  'color: #00d4ff; font-size: 12px;'
);
