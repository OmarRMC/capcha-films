// ========================================
// CAPCHA FILMS - Animations & Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // --- Scroll animations with Intersection Observer ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- WhatsApp Chat Widget ---
    const WHATSAPP_NUMBER = '59178442014';
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.querySelector('.chat-body');

    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    function sendToWhatsApp() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Show outgoing bubble
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble outgoing';
        bubble.innerHTML = '<p>' + message.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>';
        chatBody.appendChild(bubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Clear input
        chatInput.value = '';

        // Open WhatsApp after a small delay
        setTimeout(() => {
            const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
            window.open(url, '_blank');
        }, 500);
    }

    chatSend.addEventListener('click', sendToWhatsApp);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendToWhatsApp();
        }
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
