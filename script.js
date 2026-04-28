// Add scroll event to change navbar appearance
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Simple intersection observer for reveal animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add initial styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Sidebar Menu Logic
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const contactBtn = document.querySelector('.navbar > .btn-primary');

    if (navbar && navLinks) {
        // Create hamburger icon
        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '<div class="line1"></div><div class="line2"></div><div class="line3"></div>';
        
        // Insert after logo
        const logo = document.querySelector('.logo');
        if (logo) logo.after(hamburger);

        // Manage contact button for mobile
        if(contactBtn) {
            contactBtn.classList.add('desktop-only');
            
            const mobileContactLi = document.createElement('li');
            mobileContactLi.classList.add('mobile-only');
            const clonedBtn = contactBtn.cloneNode(true);
            clonedBtn.classList.remove('desktop-only');
            mobileContactLi.appendChild(clonedBtn);
            navLinks.appendChild(mobileContactLi);
        }

        // Toggle menu on click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    const cards = document.querySelectorAll('.category-card, .catalogue-item');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
});
