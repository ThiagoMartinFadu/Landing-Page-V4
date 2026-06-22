document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════
    // 1. SCROLL REVEAL — Intersection Observer
    // ══════════════════════════════════════════
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    // ══════════════════════════════════════════
    // 2. HEADER — scroll state
    // ══════════════════════════════════════════
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ══════════════════════════════════════════
    // 3. AUTO-PLAY CAROUSEL
    // ══════════════════════════════════════════
    const slides = document.querySelectorAll('.carousel-slide');
    const dots   = document.querySelectorAll('.carousel-dot');
    let current  = 0;
    let timer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => goTo(current + 1), 5500);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.index));
            startTimer();
        });
    });

    // Arrow buttons
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });
    }

    if (slides.length > 0) {
        goTo(0);
        startTimer();
    }

    // ══════════════════════════════════════════
    // 4. FAQ ACCORDION
    // ══════════════════════════════════════════
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const q = item.querySelector('.faq-q');
        const a = item.querySelector('.faq-a');

        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                const ans = i.querySelector('.faq-a');
                if (ans) ans.style.maxHeight = null;
            });

            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add('active');
                a.style.maxHeight = a.scrollHeight + 'px';
            }

            if (window.lucide) window.lucide.createIcons();
        });
    });

});
