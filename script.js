// ===== INITIALIZATION =====
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    cursorOutline.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
    }, { duration: 500, fill: 'forwards' });
});

// Cursor hover effects
document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
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

// Add particles to hero section
const heroParticles = document.querySelector('.hero-particles');
if (heroParticles) {
    for (let i = 0; i < 50; i++) {
        heroParticles.appendChild(createParticle());
    }
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
const progressBars = document.querySelectorAll('.stat-fill');
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
    const typingSpeed = 15;
    
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

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
let isDark = false;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.style.filter = isDark ? 'invert(1) hue-rotate(180deg)' : 'none';
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// ===== RESUME MODAL =====
const downloadResumeBtn = document.getElementById('download-resume');
const resumeModal = document.getElementById('resume-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOverlay = document.getElementById('modal-overlay');

function openModal() {
    resumeModal.classList.add('active');
    resumeModal.querySelector('.modal-content').classList.remove('animate__slideOutDown');
    resumeModal.querySelector('.modal-content').classList.add('animate__slideInUp');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    resumeModal.querySelector('.modal-content').classList.remove('animate__slideInUp');
    resumeModal.querySelector('.modal-content').classList.add('animate__slideOutDown');
    setTimeout(() => {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 400);
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
    doc.text('Bengaluru, Karnataka, India', 105, 35, { align: 'center' });
    doc.text('+91-7908831205 | abhijit45.official@gmail.com', 105, 42, { align: 'center' });
    
    // Divider
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(0.5);
    doc.line(20, 47, 190, 47);
    
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
    doc.text('Tech: C++, Go, WebSocket, Kubernetes, Networking, Load Balancer', 20, 68);
    
    const ivantiBullets = [
        '• Integrated SAML-based Single Sign-On with assertion ID tracking',
        '• Designed Multi-Factor Authentication (MFA) using TOTP (RFC 6238)',
        '• Delivered Advanced Feature Packs contributing to $3M Hitachi license',
        '• Automated VTM lifecycle management via Pulse Zero Trust Access'
    ];
    
    let yPos = 74;
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
    yPos += 5;
    doc.text('Tech: Linux, C++, 4G/5G, Make', 20, yPos);
    
    yPos += 6;
    const nokiaBullets = [
        '• Implemented SZTP option in IPv6 for 5G networks',
        '• Engineered VSO support in DHCPv6 servers',
        '• Reduced debug efforts by 50% with network traffic capture',
        '• Impacted 40% of mobile tower stations'
    ];
    
    nokiaBullets.forEach(bullet => {
        doc.text(bullet, 25, yPos);
        yPos += 5;
    });
    
    yPos += 3;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('NOKIA | Software Engineer Intern', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text('Sept 2022 – July 2023', 160, yPos);
    yPos += 5;
    doc.text('Tech: Python, Jenkins, Nmap, Security', 20, yPos);
    yPos += 6;
    doc.text('• Developed Nmap Jenkins pipeline reducing tracking time from 2 days to 15 minutes', 25, yPos);
    yPos += 5;
    doc.text('• Conducted UDP and TCP scans for vulnerability identification', 25, yPos);
    
    // Skills
    yPos += 8;
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
    doc.text('Kubernetes, Docker, AWS, Kafka, Microservices, REST API, SOAP', 60, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('Networking & Security:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text('WebSocket, gRPC, BGP, DHCP, TCP/IP, 5G, SAML, OAuth 2.0', 62, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('Tools & Systems:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text('Git, CMake, Linux, Wireshark, GTest, CI/CD, Boost C++', 52, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('Databases:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text('MongoDB, DynamoDB, SQL', 44, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('AI/ML:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text('Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), LLM', 38, yPos);
    
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
    doc.text('Master of Computer Application | CGPA: 8.64/10 | VITMEE All India Rank: 183', 20, yPos);
    
    // Projects
    yPos += 10;
    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text('PROJECTS', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('AWS ETL Pipeline', 20, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    doc.text('• Built automated AWS ETL pipeline with PySpark, Lambda, Glue, MongoDB, DynamoDB, S3', 25, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('XDP Firewall (eBPF)', 20, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    doc.text('• High-performance firewall using XDP and eBPF for kernel-level packet filtering', 25, yPos);
    
    yPos += 6;
    doc.setFont(undefined, 'bold');
    doc.text('xShellAI', 20, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    doc.text('• AI-driven, LLM powered Linux shell tool for Ubuntu 24.04', 25, yPos);
    
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
    doc.text('• Contributed open-source fix to Linux Vim (9.1.1281)', 20, yPos);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('LinkedIn: linkedin.com/in/abhijit-barik | GitHub: github.com/Abhijit-Barik01', 105, 285, { align: 'center' });
    
    // Save
    doc.save('Abhijit_Barik_Resume.pdf');
    closeModal();
    
    // Show success message
    setTimeout(() => {
        alert('✅ Resume downloaded successfully! 🎉');
    }, 300);
}

function viewResumeOnline() {
    window.open('https://www.linkedin.com/in/abhijit-barik/', '_blank');
    closeModal();
}

// ===== GSAP ANIMATIONS =====
// Parallax effect for hero
gsap.to('.hero-image', {
    y: 100,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Fade in sections
gsap.utils.toArray('section').forEach((section, i) => {
    if (i > 0) {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1
            },
            y: 50,
            opacity: 0
        });
    }
});

// Project cards stagger
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 70%'
    },
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

console.log('🚀 Portfolio loaded with advanced effects! ✨');

