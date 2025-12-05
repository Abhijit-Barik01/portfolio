// ===== INITIALIZATION =====
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const titles = [
    'Software Engineer',
    'C++ Developer',
    'Go Programmer',
    'Network Architect',
    'Cloud Engineer',
    'System Designer',
    'Problem Solver'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeTitle, typeSpeed);
}

if (typingText) {
    setTimeout(typeTitle, 1000);
}

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect particles
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== ANIMATED PARTICLES IN HERO =====
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    return particle;
}

// CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
        }
        33% {
            transform: translateY(-20px) translateX(20px) rotate(120deg);
        }
        66% {
            transform: translateY(20px) translateX(-20px) rotate(240deg);
        }
        100% {
            transform: translateY(0) translateX(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(`
    .experience-card,
    .project-card,
    .skill-category,
    .achievement-card,
    .about-card,
    .stat
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== PROGRESS BAR ANIMATION =====
const progressBars = document.querySelectorAll('.stat-progress-bar, .skill-bar-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ===== TYPING EFFECT FOR CODE WINDOW =====
const codeContent = document.querySelector('.code-content code');
if (codeContent) {
    const originalContent = codeContent.innerHTML;
    codeContent.innerHTML = '';
    
    let index = 0;
    const typingSpeed = 20;
    
    function typeCode() {
        if (index < originalContent.length) {
            codeContent.innerHTML += originalContent.charAt(index);
            index++;
            setTimeout(typeCode, typingSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCode, 2000);
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create mailto link
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        );
        const mailtoLink = `mailto:abhijit45.official@gmail.com?subject=${subject}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your default email client will open.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== DYNAMIC YEAR IN FOOTER =====
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
}

// ===== TECH STACK HOVER EFFECT =====
document.querySelectorAll('.tech-tag, .skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== CURSOR TRAIL EFFECT (Optional) =====
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Check out the portfolio on GitHub!', 'font-size: 14px; color: #64748b;');
console.log('%chttps://github.com/Abhijit-Barik01', 'font-size: 14px; color: #667eea;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(activateNavLink, 10));

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Focus visible styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// ===== RESUME MODAL =====
const downloadResumeBtn = document.getElementById('download-resume');
const resumeModal = document.getElementById('resume-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOverlay = document.querySelector('.modal-overlay');

function openModal() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeModal();
    }
});

// ===== RESUME PDF GENERATION =====
function generateResumePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(99, 102, 241);
    doc.text('ABHIJIT BARIK', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Software Engineer', 105, 28, { align: 'center' });
    doc.text('Bengaluru, Karnataka', 105, 35, { align: 'center' });
    doc.text('+91-7908831205 | abhijit45.official@gmail.com', 105, 42, { align: 'center' });
    
    // Experience
    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text('PROFESSIONAL EXPERIENCE', 20, 55);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('IVANTI | Software Engineer', 20, 63);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text('July 2024 – Present', 160, 63);
    
    const ivantiBullets = [
        '• Implemented SAML-based Single Sign-On with assertion ID tracking',
        '• Designed Multi-Factor Authentication (MFA) using TOTP (RFC 6238)',
        '• Delivered Advanced Feature Packs contributing to $3M Hitachi license',
        '• Automated VTM lifecycle management via Pulse Zero Trust Access'
    ];
    
    let yPos = 70;
    ivantiBullets.forEach(bullet => {
        doc.text(bullet, 25, yPos);
        yPos += 5;
    });
    
    yPos += 3;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('NOKIA | Associate Software Engineer', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text('Aug 2023 – July 2024', 160, yPos);
    
    yPos += 7;
    const nokiaBullets = [
        '• Implemented SZTP option in IPv6 for 5G networks',
        '• Engineered VSO support in DHCPv6 servers for 5G radios',
        '• Built network traffic capture reducing debug efforts by 50%',
        '• Impacted 40% of mobile tower stations with vendor-specific options'
    ];
    
    nokiaBullets.forEach(bullet => {
        doc.text(bullet, 25, yPos);
        yPos += 5;
    });
    
    // Skills
    yPos += 5;
    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text('TECHNICAL SKILLS', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('Languages:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text('C++, Go, Perl, Python', 45, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('Cloud & Infrastructure:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text('Kubernetes, Docker, AWS, Kafka, Microservices', 60, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('Networking:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text('WebSocket, gRPC, BGP, DHCP, TCP/IP, 5G, SAML, OAuth 2.0', 47, yPos);
    
    // Education
    yPos += 10;
    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text('EDUCATION', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('Vellore Institute of Technology', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text('July 2021 – July 2023', 160, yPos);
    
    yPos += 6;
    doc.text('Master of Computer Application | CGPA: 8.64 | VITMEE Rank: 183', 20, yPos);
    
    // Achievements
    yPos += 10;
    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text('ACHIEVEMENTS', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('• Secured 11th rank in Nokia Global Code Rally', 20, yPos);
    yPos += 5;
    doc.text('• Solved 400+ problems on LeetCode', 20, yPos);
    yPos += 5;
    doc.text('• Linux Vim Contributor (9.1.1281)', 20, yPos);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('LinkedIn: linkedin.com/in/abhijit-barik | GitHub: github.com/Abhijit-Barik01', 105, 285, { align: 'center' });
    
    // Save
    doc.save('Abhijit_Barik_Resume.pdf');
    closeModal();
    
    // Show success message
    alert('Resume downloaded successfully! 🎉');
}

function viewResumeOnline() {
    // Open LinkedIn profile as online resume
    window.open('https://www.linkedin.com/in/abhijit-barik/', '_blank');
    closeModal();
}

// ===== GSAP ANIMATIONS =====
// Parallax effect for sections
gsap.utils.toArray('section').forEach((section, i) => {
    if (i > 0) {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top center',
                scrub: 1
            },
            y: 100,
            opacity: 0
        });
    }
});

// Animate project cards on scroll
gsap.utils.toArray('.project-card').forEach((card) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

console.log('🚀 Portfolio loaded with advanced effects! ✨');

