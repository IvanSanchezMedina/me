// Hora real de Guadalajara, independiente de la zona del visitante.
const localTime = document.querySelector('#hero-local-time');
if (localTime) {
    const timeFormat = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    });
    const updateLocalTime = () => {
        const now = new Date();
        const formatted = timeFormat.format(now);
        localTime.textContent = formatted;
        localTime.dateTime = now.toISOString();
        localTime.setAttribute('aria-label', `Hora en Guadalajara: ${formatted}`);
    };
    updateLocalTime();
    window.setInterval(() => {
        if (!document.hidden) updateLocalTime();
    }, 1000);
    document.addEventListener('visibilitychange', updateLocalTime);
}

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);

const specialty = document.querySelector('#hero-specialty');
if (specialty) {
    const specialties = ['WEB', 'APIs', 'SERVIDORES'];
    let specialtyIndex = 0;
    let rollingAnimation = null;

    const reel = document.createElement('span');
    reel.className = 'specialty-reel';
    const currentLabel = document.createElement('span');
    const nextLabel = document.createElement('span');
    currentLabel.textContent = specialties[0];
    nextLabel.textContent = specialties[1];
    reel.append(currentLabel, nextLabel);
    specialty.replaceChildren(reel);

    window.setInterval(() => {
        if (document.hidden || reducedMotion.matches || rollingAnimation) return;
        const nextIndex = (specialtyIndex + 1) % specialties.length;
        nextLabel.textContent = specialties[nextIndex];
        rollingAnimation = reel.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-50%)' }
        ], {
            duration: 350,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)'
        });
        rollingAnimation.onfinish = () => {
            specialtyIndex = nextIndex;
            currentLabel.textContent = specialties[specialtyIndex];
            nextLabel.textContent = specialties[(specialtyIndex + 1) % specialties.length];
            rollingAnimation = null;
        };
    }, 2100);

    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) rollingAnimation?.finish();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) rollingAnimation?.finish();
    });
}

const lenis = !reducedMotion.matches && window.Lenis
    ? new window.Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.07,
        wheelMultiplier: 0.75,
        syncTouch: false,
        anchors: false
    })
    : null;

function smoothScrollTo(targetY, duration = 1400) {
    if (lenis) {
        lenis.scrollTo(targetY, {
            duration: duration / 1000,
            lerp: 0,
            easing: progress =>
                progress < 0.5
                    ? 4 * progress ** 3
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2
        });

        return;
    }

    window.scrollTo({
        top: targetY,
        behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
}

// Un solo listener sirve también para enlaces agregados después.
document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;

    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    // Respeta clics modificados y enlaces con otro comportamiento.
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
    ) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();

    const readNumber = (value, fallback) => {
        const number = Number(value);
        return value != null && value !== '' && Number.isFinite(number)
            ? number
            : fallback;
    };

    const duration = Math.max(
        1,
        readNumber(anchor.dataset.scrollDuration, 1200)
    );

    const position = Math.min(
        1,
        Math.max(0, readNumber(anchor.dataset.scrollPosition, 0))
    );

    const offset = readNumber(anchor.dataset.scrollOffset, 0);

    // Compensa desplazamientos verticales como translateY(24px).
    const transform = getComputedStyle(target).transform;
    const translateY = transform === 'none'
        ? 0
        : new DOMMatrixReadOnly(transform).m42;

    const targetTop =
        window.scrollY +
        target.getBoundingClientRect().top -
        translateY;

    smoothScrollTo(
        targetTop - window.innerHeight * position - offset,
        duration
    );
});

const typingWait = milliseconds =>
    new Promise(resolve => window.setTimeout(resolve, milliseconds));

async function animateTypewriter(group) {
    // Evita ejecutar el efecto dos veces sobre el mismo grupo.
    if (group.dataset.typewriterStarted === 'true') return;
    group.dataset.typewriterStarted = 'true';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const lines = [...group.querySelectorAll('[data-typewriter-line]')];
    const texts = lines.map(line => line.textContent.trim());

    const speed = Number(group.dataset.speed ?? 40);
    const delay = Number(group.dataset.delay ?? 250);
    const pause = Number(group.dataset.pause ?? 250);

    // Texto completo para lectores de pantalla.
    const accessibleText = document.createElement('span');
    accessibleText.className = 'sr-only';
    // Oculta visualmente el texto incluso si el CSS compilado aún no se actualiza.
    // Sigue disponible para lectores de pantalla (no usar display: none).
    Object.assign(accessibleText.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clipPath: 'inset(50%)',
        whiteSpace: 'nowrap',
        border: '0'
    });
    accessibleText.textContent = texts.join('. ');
    group.prepend(accessibleText);

    // Mide todas las líneas antes de cambiar el contenido.
    const heights = lines.map(line => line.getBoundingClientRect().height);

    lines.forEach((line, index) => {
        line.style.minHeight = `${heights[index]}px`;
        line.setAttribute('aria-hidden', 'true');
        line.textContent = '';
    });

    await document.fonts.ready;
    await typingWait(delay);

    for (const [index, line] of lines.entries()) {
        line.classList.add('is-typing');

        for (const character of Array.from(texts[index])) {
            line.textContent += character;
            await typingWait(speed);
        }

        await typingWait(pause);
        line.classList.remove('is-typing');
    }
}

document
    .querySelectorAll('[data-typewriter]:not([data-trigger="manual"])')
    .forEach(group => {
        animateTypewriter(group);
    });

// Cada bloque se revela una vez al entrar en pantalla, también en móvil.
const aboutRevealElements = [...document.querySelectorAll('[data-about-reveal]')];
if (aboutRevealElements.length && !reducedMotion.matches) {
    const revealAboutElement = element => {
        if (!element.classList.contains('reveal-pending')) return;
        if (element.matches('[data-typewriter]')) animateTypewriter(element);
        element.classList.remove('reveal-pending');
    };

    const aboutObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            revealAboutElement(entry.target);
            aboutObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    aboutRevealElements.forEach(element => {
        element.classList.add('reveal-ready', 'reveal-pending');
        aboutObserver.observe(element);
    });

    reducedMotion.addEventListener('change', () => {
        if (!reducedMotion.matches) return;
        aboutRevealElements.forEach(revealAboutElement);
        aboutObserver.disconnect();
    });
}

// Arco entre secciones: la geometría depende del scroll, no de un temporizador.
document.querySelectorAll('[data-arc-transition]').forEach(arcTransition => {
    const arcPath = arcTransition.querySelector('[data-arc-path]');
    if (!arcPath) return;
    let arcFrame = null;
    let lastCurve = null;

    const updateArc = () => {
        arcFrame = null;
        const viewportHeight = window.innerHeight;
        const top = arcTransition.getBoundingClientRect().top + window.scrollY;
        const start = Math.max(0, top - viewportHeight);
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
        const end = Math.min(start + viewportHeight * 0.75, maxScroll);
        const progress = reducedMotion.matches || end <= start
            ? 1
            : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
        const eased = progress * progress * (3 - 2 * progress);
        const curve = (100 * (1 - eased)).toFixed(2);

        if (curve === lastCurve) return;
        lastCurve = curve;
        arcPath.setAttribute('d', `M0 ${curve} Q500 ${-Number(curve)} 1000 ${curve} L1000 101 L0 101 Z`);
    };

    const scheduleArc = () => {
        if (arcFrame === null) arcFrame = requestAnimationFrame(updateArc);
    };

    window.addEventListener('scroll', scheduleArc, { passive: true });
    window.addEventListener('resize', scheduleArc);
    window.addEventListener('load', scheduleArc);
    reducedMotion.addEventListener('change', scheduleArc);
    new ResizeObserver(scheduleArc).observe(document.body);
    document.fonts.ready.then(scheduleArc);
    updateArc();
});

const heroSection = document.querySelector('#hero');
const heroDescription = document.querySelector('#description');

if (heroSection && heroDescription) {
    const updateHeroRotation = () => {
        // Compensa el desplazamiento visual para mantener estable el punto de activación.
        const offsetY = new DOMMatrixReadOnly(
            getComputedStyle(heroDescription).transform
        ).m42;

        const descriptionTop =
            heroDescription.getBoundingClientRect().top - offsetY;

        const triggerPoint = window.innerHeight * 0.55;

        const shouldShow = descriptionTop <= triggerPoint;

        // Vacía los textos e inicia la espera antes de mostrarlos.
        if (shouldShow) {
            animateTypewriter(heroDescription);
        }

        heroSection.classList.toggle('is-rotated', shouldShow);
    };

    window.addEventListener('scroll', updateHeroRotation, {
        passive: true
    });

    window.addEventListener('resize', updateHeroRotation);
    window.addEventListener('load', updateHeroRotation);
    document.fonts.ready.then(updateHeroRotation);

    updateHeroRotation();
}


// El cursor nativo permanece disponible hasta recibir movimiento real de mouse.
(() => {
    const cursor = document.querySelector('#site-cursor');
    const mouseAvailable = matchMedia('(any-hover: hover) and (any-pointer: fine)');
    if (!cursor) return;
    const root = document.documentElement;
    let x = 0, y = 0, drawnX = 0, drawnY = 0;
    let frame = 0;
    let tracking = false;
    const interactive = 'a[href], button, [role="button"], summary';
    const text = 'p, h1, h2, h3, h4, h5, h6, span, li, address, label, input, textarea, select, [contenteditable="true"], [data-native-cursor]';

    function hide() {
        tracking = false;
        root.classList.remove('cursor-active');
        cancelAnimationFrame(frame);
        frame = 0;
    }
    function updateTarget() {
        const target = document.elementFromPoint(x, y);
        const link = target?.closest(interactive);
        const dragSurface = !link && target?.closest('[data-drag-surface]');
        cursor.classList.toggle('is-drag', Boolean(dragSurface));
        const native = !target || target.closest('[disabled], [aria-disabled="true"], input, textarea, select, [contenteditable="true"], [data-native-cursor]') || (!link && !dragSurface && target.closest(text));
        root.classList.toggle('cursor-active', !native);
        cursor.classList.toggle('is-link', Boolean(link) && !native);
    }
    function draw() {
        const easing = reducedMotion.matches ? 1 : 0.4;
        drawnX += (x - drawnX) * easing;
        drawnY += (y - drawnY) * easing;
        cursor.style.transform = `translate3d(${drawnX}px, ${drawnY}px, 0) translate(-50%, -50%)`;
        frame = Math.abs(x - drawnX) + Math.abs(y - drawnY) > 0.1
            ? requestAnimationFrame(draw) : 0;
    }
    document.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse' || !mouseAvailable.matches) {
            hide();
            return;
        }
        x = event.clientX;
        y = event.clientY;
        if (!tracking) {
            drawnX = x;
            drawnY = y;
            tracking = true;
        }
        if (!frame) draw();
        updateTarget();
    }, { passive: true });
    document.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse') hide();
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
    document.addEventListener('keydown', event => { if (event.key === 'Tab') hide(); });
    window.addEventListener('scroll', () => { if (tracking) updateTarget(); }, { passive: true });
    mouseAvailable.addEventListener('change', hide);
})();




// Se dispara al seleccionar una empresa; cada bloque se escribe una sola vez.
document.addEventListener('portfolio:experience-selected', event => {
    const group = event.detail;
    if (group instanceof HTMLElement) animateTypewriter(group);
});


// Créditos expandibles también mediante teclado y pantallas táctiles.
const footerCredit = document.querySelector('#footer-credit');
if (footerCredit) {
    if (!reducedMotion.matches) {
        footerCredit.classList.add('credit-ready');
        const creditObserver = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            footerCredit.classList.add('credit-visible');
            creditObserver.disconnect();
        });
        creditObserver.observe(footerCredit.parentElement);
        footerCredit.addEventListener('focus', () => footerCredit.classList.add('credit-visible'));
    }
    const setCredit = open => footerCredit.setAttribute('aria-expanded', String(open));
    footerCredit.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') setCredit(true); });
    footerCredit.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') setCredit(false); });
    footerCredit.addEventListener('click', () => setCredit(footerCredit.getAttribute('aria-expanded') !== 'true'));
    footerCredit.addEventListener('keydown', event => { if (event.key === 'Escape') setCredit(false); });
    footerCredit.addEventListener('blur', () => setCredit(false));
}
