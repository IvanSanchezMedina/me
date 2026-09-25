// Una única cápsula viaja entre espacios reservados; el hero conserva su hueco.
(() => {
    const capsule = document.querySelector('#hero-capsule');
    const button = document.querySelector('#hero-capsule-button');
    const home = document.querySelector('#companion-home');
    const about = document.querySelector('#about');
    const experience = document.querySelector('#experience');
    const aboutDock = document.querySelector('#companion-about-dock');
    const projects = document.querySelector('#projects');
    const projectsDock = document.querySelector('#companion-projects-dock');
    const footer = document.querySelector('#contact-footer');
    const footerDock = document.querySelector('#companion-footer-dock');
    const experienceDock = document.querySelector('#companion-experience-dock');
    if (![capsule, button, home, about, experience, aboutDock, experienceDock].every(Boolean)) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const shell = document.createElement('div');
    shell.id = 'site-companion';
    const initial = home.getBoundingClientRect();
    let position = {x: initial.left, y: initial.top, width: initial.width};
    let destination = {...position};
    let frame = 0;
    let target = document.querySelector('#description');
    const contactLabel = document.createElement('span');
    contactLabel.className = 'companion-contact-label';
    contactLabel.textContent = 'Contáctame';
    contactLabel.setAttribute('aria-hidden', 'true');
    button.append(contactLabel);
    shell.append(capsule);
    document.body.append(shell);

    function draw() {
        const factor = reduce.matches ? 1 : .18;
        let distance = 0;
        for (const key of ['x', 'y', 'width']) {
            position[key] += (destination[key] - position[key]) * factor;
            distance += Math.abs(destination[key] - position[key]);
        }
        shell.style.width = `${position.width}px`;
        shell.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
        shell.style.visibility = 'visible';
        frame = distance > .2 ? requestAnimationFrame(draw) : 0;
    }
    function update() {
        const viewport = innerHeight;
        const navBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 70;
        let dock = home;
        let state = 'hero';
        const heroProgress = Math.min(1, Math.max(0, scrollY / (viewport * .4)));
        // De la orientación inicial a una flecha vertical hacia abajo.
        let angle = 45 - 90 * heroProgress;
        let arrowAngle = -45;
        target = document.querySelector('#description');
        if (about.getBoundingClientRect().top < viewport * .62) {
            dock = aboutDock;
            state = 'about'; angle = -35; arrowAngle = -10;
            target = document.querySelector('#about-profile');
        }
        if (experience.getBoundingClientRect().top < viewport * .65) {
            dock = experienceDock;
            state = 'experience';
            target = document.querySelector('#experience-v2-stage');
        }
        if (projects && projectsDock && projects.getBoundingClientRect().top < viewport * .65) {
            dock = projectsDock;
            state = 'projects';
            target = document.querySelector('#project-carousel');
        }
        if (footer && footerDock && footer.getBoundingClientRect().top < viewport * .68) {
            dock = footerDock;
            state = 'footer';
            angle = 0; arrowAngle = 0;
            target = document.querySelector('#about-profile');
        }
        const rect = dock.getBoundingClientRect();
        const companyOpen = state === 'experience' && Boolean(document.querySelector('.job-morph-card.is-open'));
        const park = state !== 'hero' && state !== 'footer' && (companyOpen || rect.bottom < navBottom + 45);
        if (park) {
            destination = {x: innerWidth - 108, y: navBottom + 16, width: 88};
            angle = 0; arrowAngle = -90;
            shell.dataset.parked = 'true';
            if (companyOpen) target = document.querySelector('#experience-v2-detail');
        } else {
            destination = {x: rect.left, y: rect.top, width: rect.width};
            shell.dataset.parked = 'false';
        }
        if (state === 'experience' || state === 'projects') {
            const targetRect = target.getBoundingClientRect();
            const fromX = destination.x + destination.width / 2;
            const fromY = destination.y + destination.width / 3.8;
            const toX = targetRect.left + targetRect.width / 2;
            const toY = targetRect.top + Math.min(targetRect.height, 160) / 2;
            const direction = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
            // La flecha original mira a la izquierda (180°).
            angle = direction - 180;
            // Mantiene el giro por el recorrido corto, sin una vuelta completa.
            while (angle < -180) angle += 360;
            while (angle > 180) angle -= 360;
            arrowAngle = 0;
        }
        shell.dataset.section = state;
        shell.style.setProperty('--companion-angle', `${angle}deg`);
        shell.style.setProperty('--companion-arrow', `${arrowAngle}deg`);
        button.href = `#${target.id || 'experience'}`;
        button.setAttribute('aria-label', state === 'footer' ? 'Contáctame: ir a Sobre mí' : state === 'hero' ? 'Conocer más sobre Iván' : state === 'about' ? 'Centrar la presentación de Iván' : state === 'projects' ? 'Centrar los proyectos destacados' : companyOpen ? 'Centrar el detalle de la empresa' : 'Centrar mi trayectoria');
        if (!frame) frame = requestAnimationFrame(draw);
    }
    button.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const rect = target.getBoundingClientRect();
        const visibleHeight = Math.min(rect.height, innerHeight * .75);
        smoothScrollTo(Math.max(0, scrollY + rect.top - (innerHeight - visibleHeight) / 2), 1600);
    });
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    reduce.addEventListener('change', update);
    new ResizeObserver(update).observe(document.body);
    const stage = document.querySelector('#experience-v2-stage');
    if (stage) new MutationObserver(update).observe(stage, {subtree: true, attributes: true, attributeFilter: ['class']});
    document.fonts.ready.then(update);
    update();
})();
