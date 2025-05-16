// === Navigation & Scrolling ===
// Handle navbar scrolling effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    
    // Scroll event for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });
});

// === Testimonial Slider ===
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // Initialize slider
    function showSlide(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showSlide(currentIndex);
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentIndex);
    }
    
    // Event listeners for controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Click on dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showSlide(index);
        });
    });
    
    // Auto slide
    let interval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        interval = setInterval(nextSlide, 5000);
    });
});

// === Contact Form ===
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !phone || !message) {
                alert('אנא מלא את כל השדות');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('אנא הכנס כתובת אימייל תקינה');
                return;
            }
            
            // Phone validation - Israeli format
            const phoneRegex = /^0[2-9]\d{7,8}$/;
            if (!phoneRegex.test(phone)) {
                alert('אנא הכנס מספר טלפון תקין');
                return;
            }
            
            // In a real-world scenario, here you would send the form data to a server
            // For this demo, we'll just show a success message
            alert('תודה על פנייתך! נחזור אליך בהקדם.');
            contactForm.reset();
        });
    }
}); 