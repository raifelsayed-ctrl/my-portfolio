/* ========================================
   01. MOBILE NAVIGATION
======================================== */

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-wrap nav');

if (menu && nav) {

    menu.addEventListener('click', () => {

        const isOpen = nav.classList.toggle('open');

        menu.setAttribute('aria-expanded', String(isOpen));
        menu.textContent = isOpen ? '✕' : '☰';

    });

    nav.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            nav.classList.remove('open');
            menu.setAttribute('aria-expanded', 'false');
            menu.textContent = '☰';

        });

    });

}


/* ========================================
   02. SCROLL PROGRESS BAR
======================================== */

const progress = document.querySelector('.progress');

let scrollPending = false;

function updateProgress() {

    if (!progress) return;

    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const percentage = maxScroll > 0
        ? (window.scrollY / maxScroll) * 100
        : 0;

    progress.style.width = percentage + '%';

    scrollPending = false;

}

window.addEventListener('scroll', () => {

    if (!scrollPending) {

        scrollPending = true;
        requestAnimationFrame(updateProgress);

    }

}, { passive: true });

updateProgress();


/* ========================================
   03. SCROLL REVEAL ANIMATION
======================================== */

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

const revealElements = document.querySelectorAll('.reveal');

if (reducedMotion) {

    revealElements.forEach(element => {
        element.classList.add('visible');
    });

} else {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.10
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

}


/* ========================================
   04. CURSOR GLOW EFFECT
======================================== */

if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {

    const glow = document.querySelector('.cursor-glow');

    let frame = 0;

    window.addEventListener('pointermove', event => {

        if (frame) return;

        frame = requestAnimationFrame(() => {

            if (glow) {

                glow.style.left = event.clientX + 'px';
                glow.style.top = event.clientY + 'px';
                glow.style.opacity = '1';

            }

            frame = 0;

        });

    }, { passive: true });

}


/* ========================================
   05. SKILL CARDS TILT EFFECT
======================================== */

if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {

    document.querySelectorAll('.tilt').forEach(card => {

        card.addEventListener('pointermove', event => {

            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                perspective(950px)
                rotateX(${-y * 5}deg)
                rotateY(${x * 5}deg)
                translateY(-3px)
            `;

        });

        card.addEventListener('pointerleave', () => {

            card.style.transform = '';

        });

    });

}


/* ========================================
   06. PROJECT SCREENSHOTS LIGHTBOX
======================================== */

const lightbox = document.getElementById('lightbox');

if (lightbox) {

    const buttons = [
        ...document.querySelectorAll('.screenshots-grid button')
    ];

    const image = lightbox.querySelector('img');
    const counter = lightbox.querySelector('[data-count]');

    const closeButton = lightbox.querySelector('[data-close]');
    const previousButton = lightbox.querySelector('[data-prev]');
    const nextButton = lightbox.querySelector('[data-next]');

    let active = 0;

    function showImage(index) {

        if (!buttons.length || !image) return;

        active = (index + buttons.length) % buttons.length;

        const source = buttons[active].querySelector('img');

        if (!source) return;

        image.src = source.currentSrc || source.src;
        image.alt = source.alt;

        if (counter) {
            counter.textContent =
                `${active + 1} / ${buttons.length}`;
        }

    }

    buttons.forEach((button, index) => {

        button.addEventListener('click', () => {

            showImage(index);

            if (!lightbox.open) {
                lightbox.showModal();
            }

        });

    });

    closeButton?.addEventListener('click', () => {
        lightbox.close();
    });

    previousButton?.addEventListener('click', () => {
        showImage(active - 1);
    });

    nextButton?.addEventListener('click', () => {
        showImage(active + 1);
    });

    lightbox.addEventListener('click', event => {

        if (event.target === lightbox) {
            lightbox.close();
        }

    });

    lightbox.addEventListener('keydown', event => {

        if (event.key === 'ArrowLeft') {
            showImage(active - 1);
        }

        if (event.key === 'ArrowRight') {
            showImage(active + 1);
        }

    });

}


/* ========================================
   07. SINGLE SCREENSHOT VIEWER
======================================== */

document.querySelectorAll('[data-close-bottom]').forEach(button => {

    button.addEventListener('click', () => {

        const dialog = button.closest('dialog');

        if (dialog?.open) {
            dialog.close();
        }

    });

});
