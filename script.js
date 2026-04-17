/* ========================================
   AKSIT GLOBAL — Main JavaScript
   Multi-page version
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburger && navMenu && navOverlay) {
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) toggleMenu();
            });
        });
    }

    // --- Sticky Header Shadow ---
    const header = document.getElementById('header');
    function updateHeader() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }
    }

    // --- Scroll-to-Top Button ---
    const scrollTopBtn = document.getElementById('scrollTop');
    function updateScrollTop() {
        if (!scrollTopBtn) return;
        scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                el.classList.add('active');
            }
        });
    }

    // --- Combined Scroll Handler ---
    function onScroll() {
        updateHeader();
        updateScrollTop();
        revealOnScroll();
        animateCounters();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Counter Animation for Stats ---
    let counterAnimated = false;
    function animateCounters() {
        if (counterAnimated) return;

        // Works for both .about-stats and .stats-grid
        const statsContainer = document.querySelector('.about-stats') || document.querySelector('.stats-grid');
        if (!statsContainer) return;

        const rect = statsContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counterAnimated = true;

            const counters = statsContainer.querySelectorAll('.number');
            counters.forEach(counter => {
                const text = counter.textContent;
                const match = text.match(/(\d+)/);
                if (!match) return;

                const target = parseInt(match[1]);
                const suffix = text.replace(match[1], '');
                let current = 0;
                const step = Math.max(1, Math.floor(target / 50));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    counter.textContent = current + suffix;
                }, 30);
            });
        }
    }

    // --- Contact Form (contact.html) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = (document.getElementById('contactPhone')?.value || '').trim();
            const subject = (document.getElementById('contactSubject')?.value || '');
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            let waMsg = `Hello AKSIT GLOBAL!%0A%0A`;
            waMsg += `*Name:* ${encodeURIComponent(name)}%0A`;
            waMsg += `*Email:* ${encodeURIComponent(email)}%0A`;
            if (phone) waMsg += `*Phone:* ${encodeURIComponent(phone)}%0A`;
            if (subject) waMsg += `*Subject:* ${encodeURIComponent(subject)}%0A`;
            waMsg += `*Message:* ${encodeURIComponent(message)}%0A`;

            window.open(`https://wa.me/923000311868?text=${waMsg}`, '_blank');

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Sent via WhatsApp!';
            btn.style.background = '#25d366';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Inquiry Form (index.html — if present) ---
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('inquiryName').value.trim();
            const email = document.getElementById('inquiryEmail').value.trim();
            const phone = (document.getElementById('inquiryPhone')?.value || '').trim();
            const course = (document.getElementById('inquiryCourse')?.value || '');
            const message = (document.getElementById('inquiryMessage')?.value || '').trim();

            if (!name || !email) {
                alert('Please fill in your name and email.');
                return;
            }

            let waMsg = `Hello AKSIT GLOBAL!%0A%0A`;
            waMsg += `*Name:* ${encodeURIComponent(name)}%0A`;
            waMsg += `*Email:* ${encodeURIComponent(email)}%0A`;
            if (phone) waMsg += `*Phone:* ${encodeURIComponent(phone)}%0A`;
            if (course) waMsg += `*Interested In:* ${encodeURIComponent(course)}%0A`;
            if (message) waMsg += `*Message:* ${encodeURIComponent(message)}%0A`;

            window.open(`https://wa.me/923000311868?text=${waMsg}`, '_blank');

            const btn = inquiryForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '✓ Sent via WhatsApp!';
            btn.style.background = '#25d366';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                inquiryForm.reset();
            }, 3000);
        });
    }

    // --- Smooth scroll for anchor links on same page ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
