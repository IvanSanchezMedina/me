// Las cápsulas y el detalle comparten una única plantilla de datos de experiencia.
(() => {
    const stage = document.querySelector('#experience-v2-stage');
    const detailPane = document.querySelector('#experience-v2-detail');
    if (!stage || !detailPane) return;
    let closeActiveCompany = null;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const periods = {
        akaya: [2024, 5], codebay: [2022, 11, 2024, 5],
        alaya: [2021, 8, 2022, 11], random: [2020, 8, 2021, 8],
        importserv: [2019, 8, 2020, 6]
    };
    const duration = key => {
        if (!periods[key]) return 'Colaboración por proyecto';
        const [year, month, endYear, endMonth] = periods[key];
        const now = new Date();
        const months = ((endYear ?? now.getFullYear()) - year) * 12 + (endMonth ?? now.getMonth() + 1) - month + 1;
        const years = Math.floor(months / 12), remainder = months % 12;
        return [years && `${years} ${years === 1 ? 'año' : 'años'}`, remainder && `${remainder} ${remainder === 1 ? 'mes' : 'meses'}`].filter(Boolean).join(' · ');
    };
    const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16M12 4l8 8-8 8"/></svg>';
    const experienceData = document.querySelector('#experience-data');
    if (!experienceData) return;
    experienceData.content.querySelectorAll('.experience-item').forEach((source, index) => {
        const key = source.id.replace('experience-', '');
        const summary = source.querySelector('summary');
        const name = summary.querySelector('.min-w-0 > .block').textContent;
        const role = summary.querySelector('.mt-2.block').textContent;
        const date = summary.querySelector('.font-mono.text-xs').cloneNode(true);
        const originalDetail = source.querySelector('.experience-detail');
        const intro = originalDetail.querySelector('h3').textContent;
        const meta = originalDetail.querySelector('p.mt-5').textContent;
        const card = document.createElement('article');
        card.className = 'job-capsule job-morph-card';
        card.dataset.aboutReveal = '';
        card.innerHTML = `
            <div class="job-morph-shape" aria-hidden="true"></div>
            <h3 class="job-morph-heading"><span class="job-name"></span></h3>
            <button type="button" class="job-toggle" aria-expanded="false" aria-controls="job-${key}-body">
                <span class="job-orb"><span class="job-arrow">${arrow}</span><span class="job-cross" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg></span></span>
            </button>
            <div class="job-expansion" id="job-${key}-body" inert>
                <div class="job-clip"><div class="job-content">
                    <div class="job-basic">
                        <div class="job-identity"></div>
                        <p class="job-role"></p><div class="job-dates"></div><p class="job-duration"></p>
                        <p class="job-intro"></p>
                        <button type="button" class="job-more">Ver más información <span>${arrow}</span></button>
                    </div>
                    <div class="job-full" hidden>
                        <button type="button" class="job-back">← Volver al resumen</button>
                        <h4 tabindex="-1" class="job-full-title"></h4><p class="job-meta"></p>
                        <div class="job-responsibilities"></div><div class="job-tools"></div>
                    </div>
                </div></div>
            </div>`;
        card.querySelector('.job-name').textContent = name;
        card.querySelector('.job-role').textContent = role;
        card.querySelector('.job-intro').textContent = intro;
        card.querySelector('.job-duration').textContent = `${duration(key)}`;
        card.querySelector('.job-dates').append(date);
        const logo = summary.querySelector('img').cloneNode(true);
        logo.className = 'job-logo';
        card.querySelector('.job-identity').append(logo);
        card.querySelector('.job-full-title').textContent = name;
        card.querySelector('.job-meta').textContent = meta;
        card.querySelector('.job-responsibilities').append(originalDetail.querySelector('ul.space-y-4').cloneNode(true));
        originalDetail.querySelectorAll('ul[aria-label]').forEach(list => {
            const group = document.createElement('div');
            group.className = 'job-badge-group';
            const label = document.createElement('h5');
            label.className = 'job-badge-label';
            label.textContent = list.getAttribute('aria-label');
            const badges = document.createElement('ul');
            badges.className = 'job-badges';
            badges.setAttribute('aria-label', label.textContent);
            list.querySelectorAll('li').forEach(item => {
                const badge = document.createElement('li');
                badge.textContent = item.textContent;
                badges.append(badge);
            });
            group.append(label, badges);
            card.querySelector('.job-tools').append(group);
        });
        const companyLinks = document.createElement('nav');
        companyLinks.className = 'mt-6 flex flex-wrap gap-x-6 gap-y-4';
        companyLinks.setAttribute('aria-label', 'Enlaces de la empresa');
        originalDetail.querySelectorAll('a[href^="https:"]').forEach(siteLink => {
            const link = siteLink.cloneNode(true);
            const icon = link.querySelector('[data-lucide]');
            if (icon) {
                const wrapper = document.createElement('span');
                wrapper.className = 'h-4 w-4';
                wrapper.innerHTML = arrow;
                icon.replaceWith(wrapper);
            }
            companyLinks.append(link);
        });
        if (companyLinks.childElementCount) card.querySelector('.job-full').append(companyLinks);
        const toggle = card.querySelector('.job-toggle');
        const expansion = card.querySelector('.job-expansion');
        const dialog = document.createElement('section');
        dialog.className = 'job-dialog job-inline-view';
        dialog.hidden = true;
        dialog.id = `job-${key}-detail`;
        dialog.setAttribute('aria-labelledby', `job-${key}-dialog-title`);
        dialog.innerHTML = `<div class="job-dialog-shell">
            <header class="job-dialog-header"><span>${source.dataset.engagement === 'external' ? 'Colaboración externa' : `Experiencia / 0${index + 1}`}</span><span class="text-accent">${name}</span></header>
            <div class="job-dialog-layout"><div class="job-dialog-story"></div><aside class="job-dialog-stack" aria-label="Tecnologías y herramientas"><p class="job-stack-label">El stack detrás del trabajo</p></aside></div>
        </div>`;
        const full = card.querySelector('.job-full');
        full.hidden = false;
        full.querySelector('.job-back').remove();
        full.querySelector('h4').id = `job-${key}-dialog-title`;
        const modalIdentity = document.createElement('div');
        modalIdentity.className = 'job-dialog-identity';
        modalIdentity.append(logo.cloneNode(true));
        const modalRole = document.createElement('p');
        modalRole.textContent = role;
        modalIdentity.append(modalRole);
        full.prepend(modalIdentity);
        const modalDates = document.createElement('p');
        modalDates.className = 'job-dialog-dates';
        modalDates.textContent = `${date.firstChild.textContent.trim()} · ${duration(key)}`;
        full.querySelector('h4').after(modalDates);
        const modalIntro = document.createElement('p');
        modalIntro.className = 'job-dialog-intro';
        modalIntro.textContent = intro;
        full.querySelector('.job-meta').after(modalIntro);
        dialog.querySelector('.job-dialog-stack').append(full.querySelector('.job-tools'));
        dialog.querySelector('.job-dialog-story').append(full);
        const typingGroup = dialog.querySelector('.job-dialog-story');
        typingGroup.dataset.typewriter = '';
        typingGroup.dataset.trigger = 'manual';
        typingGroup.dataset.speed = '18';
        typingGroup.dataset.delay = '120';
        typingGroup.dataset.pause = '90';
        typingGroup.querySelectorAll('.job-full-title, .job-dialog-dates, .job-meta, .job-dialog-intro').forEach(line => {
            line.dataset.typewriterLine = '';
        });
        detailPane.append(dialog);
        const selectCompany = (focus = false) => {
            if (closeActiveCompany && closeActiveCompany !== close) closeActiveCompany(false);
            closeActiveCompany = close;
            const changed = dialog.hidden;
            detailPane.querySelectorAll('.job-inline-view').forEach(view => { view.hidden = view !== dialog; });
            stage.querySelectorAll('.job-company-entry').forEach(entry => entry.classList.remove('is-selected'));
            row.classList.add('is-selected');
            document.dispatchEvent(new CustomEvent('portfolio:experience-selected', {detail: typingGroup}));
            stage.querySelectorAll('.job-more').forEach(button => button.removeAttribute('aria-current'));
            opener.setAttribute('aria-current', 'true');
            if (changed && !reduceMotion.matches) {
                dialog.animate([{opacity: 0, transform: 'translateY(20px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 450, easing: 'cubic-bezier(.22,1,.36,1)'});
            }
            if (focus) {
                dialog.querySelector('h4').focus({preventScroll: true});
                const top = detailPane.getBoundingClientRect().top;
                if (top < 90 || top > innerHeight * .6) {
                    detailPane.scrollIntoView({behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'start'});
                }
            }
        };
        const opener = card.querySelector('.job-more');
        opener.firstChild.textContent = 'Ver detalle ';
        opener.setAttribute('aria-controls', dialog.id);
        opener.addEventListener('click', () => selectCompany(true));
        const basic = card.querySelector('.job-basic');
        const close = (restoreFocus = true) => {
            dialog.hidden = true;
            row.classList.remove('is-selected');
            opener.removeAttribute('aria-current');
            if (closeActiveCompany === close) closeActiveCompany = null;
            card.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', `Ver experiencia en ${name}`);
            expansion.inert = true;
            if (restoreFocus) toggle.focus({ preventScroll: true });
        };
        toggle.setAttribute('aria-label', `Ver experiencia en ${name}`);
        toggle.addEventListener('click', () => {
            if (card.classList.contains('is-open')) return close();
            selectCompany();
            basic.hidden = false;
            card.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', `Cerrar experiencia en ${name}`);
            expansion.inert = false;
        });
        card.addEventListener('keydown', event => {
            if (event.key === 'Escape' && card.classList.contains('is-open')) {
                event.stopPropagation(); close();
            }
        });
        const row = document.createElement('div');
        row.className = 'job-company-entry';
        const metadata = document.createElement('div');
        metadata.className = 'job-company-meta';
        Object.assign(metadata.dataset, {aboutReveal: '', typewriter: '', trigger: 'manual', speed: '22', delay: '100', pause: '80'});
        const position = document.createElement('p');
        position.dataset.typewriterLine = '';
        position.textContent = role;
        const period = document.createElement('p');
        period.dataset.typewriterLine = '';
        period.textContent = [...date.childNodes].map(node => node.textContent.trim()).filter(Boolean).join(' · ');
        metadata.append(position, period);
        row.append(metadata, card);
        if (source.dataset.engagement === 'external') {
            const heading = document.createElement('h3');
            heading.className = 'external-collaboration-label';
            heading.textContent = 'Colaboraciones externas / Por proyecto';
            stage.append(heading);
        }
        stage.append(row);
        // Mide el contenido real, incluidos los saltos de línea y las fuentes locales.
        const resizeCard = () => {
            const width = card.clientWidth;
            const contentHeight = card.querySelector('.job-content').scrollHeight;
            card.style.setProperty('--morph-width', `${width}px`);
            card.style.setProperty('--morph-height', `${Math.max(width, contentHeight + 112)}px`);
        };
        const observer = new ResizeObserver(resizeCard);
        observer.observe(card.querySelector('.job-content'));
        observer.observe(stage);
        document.fonts.ready.then(resizeCard);
        resizeCard();
    });
})();
