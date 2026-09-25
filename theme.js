// Se ejecuta antes del CSS para restaurar el color sin un destello inicial.
(() => {
    const presetColors = {'lime': '#A3E635', 'bright-indigo': '#4640FF', 'spring-green': '#40FF73', 'banana-cream': '#FFE540', 'tomato': '#FF5040', 'medium-slate-blue': '#9452FF', 'night-bordeaux': '#651C1C', 'deep-navy': '#042053'};
    const themes = Object.keys(presetColors);
    const storageKey = 'portfolio-accent';
    const root = document.documentElement;
    const normalizeHex = value => {
        const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
        if (!match) return null;
        const hex = match[1];
        return '#' + (hex.length === 3 ? [...hex].map(char => char + char).join('') : hex).toUpperCase();
    };
    const luminance = rgb => rgb.map(value => {
        const channel = value / 255;
        return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
    }).reduce((sum, channel, i) => sum + channel * [.2126, .7152, .0722][i], 0);
    const setContrast = hex => {
        const rgb = hex.slice(1).match(/../g).map(pair => parseInt(pair, 16));
        const light = luminance(rgb);
        const whiteRatio = 1.05 / (light + .05);
        const blackRatio = (light + .05) / .05;
        root.style.setProperty('--on-accent', whiteRatio > blackRatio ? '255 255 255' : '0 0 0');
        // Preserve the chosen surface color; only brighten accent text on coal backgrounds.
        const background = luminance([23, 26, 27]);
        let readable = rgb;
        for (let step = 0; (luminance(readable) + .05) / (background + .05) < 4.5 && step <= 100; step++) {
            readable = rgb.map(channel => Math.round(channel + (255 - channel) * step / 100));
        }
        root.style.setProperty('--accent-readable', readable.join(' '));
    };
    const applyCustom = hex => {
        root.dataset.theme = 'custom';
        setContrast(hex);
        root.style.setProperty('--accent', hex.slice(1).match(/../g).map(pair => parseInt(pair, 16)).join(' '));
    };
    setContrast(presetColors[root.dataset.theme] || presetColors.lime);
    try {
        const saved = localStorage.getItem(storageKey);
        if (themes.includes(saved)) { root.dataset.theme = saved; setContrast(presetColors[saved]); }
        else if (saved && normalizeHex(saved)) applyCustom(normalizeHex(saved));
    } catch { /* El selector también funciona si el almacenamiento está bloqueado. */ }

    document.addEventListener('DOMContentLoaded', () => {
        const picker = document.querySelector('#theme-picker');
        if (!picker) return;
        const choices = [...picker.querySelectorAll('[data-theme-choice]')];
        const toggle = picker.querySelector('summary');
        const status = document.querySelector('#theme-status');
        const sync = () => choices.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.themeChoice === root.dataset.theme));
        });
        const form = document.querySelector('#custom-theme-form');
        const input = document.querySelector('#custom-theme-color');
        const help = document.querySelector('#custom-theme-help');
        const updateInput = () => {
            const rgb = getComputedStyle(root).getPropertyValue('--accent').trim().split(/\s+/).map(Number);
            if (rgb.length === 3) input.value = '#' + rgb.map(n => n.toString(16).padStart(2, '0')).join('').toUpperCase();
            input.removeAttribute('aria-invalid');
            help.textContent = 'Usa 3 o 6 dígitos: #ABC o #A3E52C.';
        };
        updateInput();
        form.addEventListener('submit', event => {
            event.preventDefault();
            const hex = normalizeHex(input.value);
            if (!hex) {
                input.setAttribute('aria-invalid', 'true');
                help.textContent = 'Escribe un color válido: #ABC o #A3E52C.';
                input.focus();
                return;
            }
            applyCustom(hex);
            try { localStorage.setItem(storageKey, hex); } catch { /* Solo esta visita. */ }
            updateInput();
            sync();
            status.textContent = `Color personalizado: ${hex}`;
        });
        sync();
        choices.forEach(button => button.addEventListener('click', () => {
            const theme = button.dataset.themeChoice;
            if (!themes.includes(theme)) return;
            root.dataset.theme = theme;
            setContrast(presetColors[theme]);
            root.style.removeProperty('--accent');
            updateInput();
            try { localStorage.setItem(storageKey, theme); } catch { /* Elección de esta visita. */ }
            sync();
            status.textContent = `Color seleccionado: ${button.textContent.replace('✓', '').trim()}`;
        }));
        document.addEventListener('click', event => {
            if (!picker.contains(event.target)) picker.open = false;
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && picker.open) {
                picker.open = false;
                toggle.focus();
            }
        });
        picker.addEventListener('focusout', event => {
            if (!picker.contains(event.relatedTarget)) picker.open = false;
        });
    });
})();
