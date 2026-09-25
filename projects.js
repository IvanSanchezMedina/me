(() => {
    const viewport = document.querySelector('.project-viewport');
    if (!viewport) return;
    const cards = [...viewport.querySelectorAll('.project-card')];
    const choices = [...document.querySelectorAll('[data-project-index]')];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const count = cards.length;
    const wrap = value => ((value % count) + count) % count;
    const offset = (index, position) => wrap(index - position + count / 2) - count / 2;
    let position = 0, destination = 0, frame = 0, drag = null, suppressClick = false;
    let stepPixels = 400;
    viewport.classList.add('is-ready');
    function render() {
        // La anchura sin rotar evita variar el radio durante el movimiento.
        const cardWidth = cards[0].offsetWidth;
        const angleStep = 20;
        const spacing = cardWidth * (viewport.clientWidth >= 900 ? 1.55 : 1.3);
        stepPixels = spacing;
        const radius = spacing / Math.sin(angleStep * Math.PI / 180);
        cards.forEach((card, index) => {
            const delta = offset(index, position);
            const angle = delta * angleStep;
            const radians = angle * Math.PI / 180;
            const x = Math.sin(radians) * radius;
            const y = (1 - Math.cos(radians)) * radius;
            card.style.transform = `translateX(-50%) translate(${x}px, ${y}px) rotate(${reduce.matches ? 0 : angle}deg)`;
            const visible = Math.abs(delta) <= 1.65;
            card.style.opacity = visible ? '1' : '0';
            card.inert = !visible;
            card.setAttribute('aria-hidden', String(!visible));
            card.style.pointerEvents = visible ? 'auto' : 'none';
            card.style.zIndex = String(10 - Math.round(Math.abs(delta) * 3));
        });
    }
    function animate() {
        position += (destination - position) * (reduce.matches ? 1 : .14);
        if (Math.abs(destination - position) < .001) position = destination;
        render();
        frame = position !== destination ? requestAnimationFrame(animate) : 0;
    }
    function select(next) {
        destination = Math.round(next);
        const active = wrap(destination);
        cards.forEach((card, index) => {
            const selected = index === active;
            card.classList.toggle('is-active', selected);
        });
        choices.forEach((button, index) => button.setAttribute('aria-pressed', String(index === active)));
        document.querySelector('#project-status').textContent = `${String(active + 1).padStart(2, '0')} / 04 · ${cards[active].querySelector('h3').textContent}`;
        if (!frame) frame = requestAnimationFrame(animate);
    }
    choices.forEach((button, index) => button.addEventListener('click', () => select(destination + offset(index, destination))));
    document.querySelector('[data-project-prev]').addEventListener('click', () => select(destination - 1));
    document.querySelector('[data-project-next]').addEventListener('click', () => select(destination + 1));
    viewport.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        viewport.focus({preventScroll: true});
        select(destination + (event.key === 'ArrowRight' ? 1 : -1));
    });
    viewport.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClick = false;
        if (event.pointerType === 'mouse' && event.target.closest('a, button')) return;
        cancelAnimationFrame(frame); frame = 0;
        drag = {id: event.pointerId, x: event.clientX, y: event.clientY, start: position, dx: 0, moved: false};
    });
    viewport.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!drag.moved) {
            if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; select(destination); return; }
            if (Math.abs(dx) < 8) return;
            drag.moved = true;
            viewport.setPointerCapture(event.pointerId);
            viewport.classList.add('is-dragging');
        }
        drag.dx = dx;
        position = drag.start - dx / stepPixels;
        render();
    });
    function release(event) {
        if (!drag || drag.id !== event.pointerId) return;
        const {moved, dx, start} = drag;
        const cancelled = event.type === 'pointercancel' || event.type === 'lostpointercapture';
        let next = destination;
        if (moved && !cancelled) {
            next = Math.round(position);
            // Un gesto corto cambia de tarjeta sin exigir arrastrar media pantalla.
            if (Math.abs(dx) >= 40 && next === Math.round(start)) {
                next = Math.round(start) - Math.sign(dx);
            }
        }
        drag = null;
        viewport.classList.remove('is-dragging');
        suppressClick = moved;
        if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
        select(next);
    }
    viewport.addEventListener('pointerup', release);
    viewport.addEventListener('pointercancel', release);
    viewport.addEventListener('lostpointercapture', release);
    viewport.addEventListener('click', event => {
        if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
    }, true);
    new ResizeObserver(render).observe(viewport);
    reduce.addEventListener('change', () => select(destination));
    select(0);
})();
