// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Header scroll effect with dynamic color
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');

function getAverageColor(element) {
    const bgColor = window.getComputedStyle(element).backgroundColor;
    return bgColor;
}

function updateHeaderColor() {
    const scrollPosition = window.scrollY + nav.offsetHeight;
    let currentSection = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            currentSection = section;
        }
    });

    if (currentSection) {
        const sectionColor = getAverageColor(currentSection);
        nav.style.backgroundColor = sectionColor.replace(')', ', 0.95)').replace('rgb', 'rgba');
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.backdropFilter = 'none';
    }

    // Add scrolled class for smaller padding
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateHeaderColor);
// Check initial scroll position
updateHeaderColor();

// Role text animation
const roles = ['Graphic Designer', 'Video Editor', 'Motion Designer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.getElementById('role-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
}

typeEffect();

// Mobile Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const body = document.querySelector('body');

// Toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Handle hamburger click
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu when clicking nav items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Handle scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Prevent scrolling when menu is open
function preventScroll(e) {
    if (body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}

// Add touch event listeners for mobile
document.addEventListener('touchmove', preventScroll, { passive: false });

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active nav item on scroll
const navHeight = document.querySelector('nav').offsetHeight;

function setActiveNavItem() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
}

// Update active nav item on scroll
window.addEventListener('scroll', setActiveNavItem);

// Smooth scroll for Let's Talk button and other navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
            
            // Smooth scroll to target section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('.skills');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Animate skills when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
});

if (skillSection) {
    observer.observe(skillSection);
}

// Increment view count
let views = parseInt(localStorage.getItem('portfolioViews') || '0');
localStorage.setItem('portfolioViews', views + 1);

// Store contact form submissions
document.querySelector('#contact form').addEventListener('submit', function(e) {
    e.preventDefault();
    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    messages.unshift({
        name: this.querySelector('[name="name"]').value,
        email: this.querySelector('[name="email"]').value,
        message: this.querySelector('[name="message"]').value,
        date: new Date().toISOString(),
        status: 'unread'
    });
    localStorage.setItem('portfolioMessages', JSON.stringify(messages));
    this.reset();
    alert('Message sent successfully!');
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Add CSS animation for portfolio items
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Hide loading screen when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading').style.display = 'none';
        }, 500);
    }, 500);
});
