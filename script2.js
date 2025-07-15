
// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', function () {
    mobileNav.classList.toggle('show');

    // Change icon
    const icon = this.querySelector('i');
    if (mobileNav.classList.contains('show')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Navigation scroll spy
const sections = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function updateActiveNavLink() {
    let currentSection = 'hero';

    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu if open
    mobileNav.classList.remove('show');
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
}

// Add click listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// Listen to scroll events
window.addEventListener('scroll', updateActiveNavLink);

// Resume functions
function downloadResume() {
    // Create a simple PDF-like content for demonstration
    const resumeContent = `
THANAVUR RAHMAN
Software Engineering Student | AI Enthusiast
Email: thanarah123@gmail.com | Phone: (94) 7875-14624

EDUCATION
Bachelor of Computing Honours in Software Engineering (2024-2028)
University of Sri Jajewardenepura

EXPERIENCE
Software Development Intern :
Tech Company
• Developed AI-powered applications using Python and TensorFlow
• Collaborated with cross-functional teams on cloud deployment
• Implemented CI/CD pipelines using Docker and Jenkins

TECHNICAL SKILLS
Programming Languages: Python, Java, JavaScript, TypeScript, C++, SQL
AI/ML Technologies: TensorFlow, PyTorch, Scikit-learn, Keras, OpenCV
Cloud & DevOps: AWS, Azure, Docker, Kubernetes, Jenkins, Git
Development Tools: React, Node.js, MongoDB, PostgreSQL, Redis, Linux

PROJECTS
AI Image Recognition System
• Deep learning model with 95% accuracy using TensorFlow
• Real-time image classification with OpenCV integration

Cloud-Native Web Application
• Full-stack application deployed on AWS with Docker containers
• Implemented CI/CD pipeline with automated testing

Natural Language Processor
• Advanced NLP system for sentiment analysis and text summarization
• Built using transformer models and PyTorch
    `;

    // Create a blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Thanavur_Rahman_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Show success message
    showNotification('Resume downloaded successfully!', 'success');
}

function viewResume() {
    // Open resume in new window/tab
    const resumeWindow = window.open('', '_blank');
    resumeWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Thanavur Rahman - Resume</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                h1 { color: #2563eb; border-bottom: 2px solid #2563eb; }
                h2 { color: #1f2937; margin-top: 30px; }
                .contact-info { margin-bottom: 30px; }
                .section { margin-bottom: 25px; }
                .job-title { font-weight: bold; color: #374151; }
                .date { float: right; color: #6b7280; }
                .skills { display: flex; flex-wrap: wrap; gap: 10px; }
                .skill-tag { background: #e5e7eb; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
            </style>
        </head>
        <body>
            <h1>THANAVUR RAHMAN</h1>
            <div class="contact-info">
                <strong>Software Engineering Student | AI Enthusiast</strong><br>
                Email: thanarah123@gmail.com | Phone: (94) 7875-14624<br>
                LinkedIn: linkedin.com/in/ThanavurRahman | github.com/ThanavurRahman
            </div>
            
            <div class="section">
                <h2>EDUCATION</h2>
                <div class="job-title">Bachelor of Computing Honours in Software Engineering (2024-2028)
<span class="date">2024-2028</span></div>
                University of Sri Jajewardenepura
            </div>
            
            <div class="section">
                <h2>EXPERIENCE</h2>
                <div class="job-title">Software Development Intern :<span class="date"></span></div>
                Tech Company<br>
                • Developed AI-powered applications using Python and TensorFlow<br>
                • Collaborated with cross-functional teams on cloud deployment<br>
                • Implemented CI/CD pipelines using Docker and Jenkins
            </div>
            
            <div class="section">
                <h2>TECHNICAL SKILLS</h2>
                <strong>Programming Languages:</strong> Python, Java, JavaScript, TypeScript, C++, SQL<br>
                <strong>AI/ML Technologies:</strong> TensorFlow, PyTorch, Scikit-learn, Keras, OpenCV<br>
                <strong>Cloud & DevOps:</strong> AWS, Azure, Docker, Kubernetes, Jenkins, Git<br>
                <strong>Development Tools:</strong> React, Node.js, MongoDB, PostgreSQL, Redis, Linux
            </div>
            
            <div class="section">
                <h2>PROJECTS</h2>
                <div class="job-title">AI Image Recognition System</div>
                • Deep learning model with 95% accuracy using TensorFlow<br>
                • Real-time image classification with OpenCV integration<br><br>
                
                <div class="job-title">Cloud-Native Web Application</div>
                • Full-stack application deployed on AWS with Docker containers<br>
                • Implemented CI/CD pipeline with automated testing<br><br>
                
                <div class="job-title">Natural Language Processor</div>
                • Advanced NLP system for sentiment analysis and text summarization<br>
                • Built using transformer models and PyTorch
            </div>
        </body>
        </html>
    `);
    resumeWindow.document.close();
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });

    // Show success message
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

    // Reset form
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;

    notification.textContent = message;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.highlight-card, .skill-category, .project-card, .resume-preview');
    animateElements.forEach(el => observer.observe(el));
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 24, 39, 0.98)';
    } else {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
    }
});
