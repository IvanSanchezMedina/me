// Un único menú comparte enlaces y selector de color entre móvil y escritorio.
(() => {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('#mobile-menu-toggle');
    const panel = document.querySelector('#site-navigation');
    if (!header || !toggle || !panel) return;
    const mobile = matchMedia('(max-width: 767px)');
    let open = false;
    header.classList.add('navigation-ready');
    const sync = () => {
        toggle.hidden = !mobile.matches;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.querySelector('[data-menu-label]').textContent = open ? 'Cerrar' : 'Menú';
        panel.inert = mobile.matches && !open;
        header.classList.toggle('menu-open', mobile.matches && open);
    };
    const close = (restoreFocus = false) => {
        open = false;
        const picker = panel.querySelector('#theme-picker');
        if (picker) picker.open = false;
        if (restoreFocus) toggle.focus();
        sync();
    };
    toggle.addEventListener('click', () => { open = !open; sync(); });
    panel.addEventListener('click', event => {
        if (mobile.matches && event.target.closest('a')) close(true);
    });
    document.addEventListener('click', event => {
        if (open && !header.contains(event.target)) close();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && open) { close(true); }
    });
    header.addEventListener('focusout', event => {
        if (open && !header.contains(event.relatedTarget)) close();
    });
    mobile.addEventListener('change', () => { close(); });
    sync();
})();
