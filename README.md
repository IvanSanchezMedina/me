# Portafolio de Iván Sánchez

Rediseño con fondo carbón, texto marfil y acentos purple. Incluye tipografías locales,
hero con cápsula interactiva, escritura animada y desplazamiento con Lenis.

## Desarrollo

```bash
npm install
npm run dev
```

Abre la dirección que muestra Vite, normalmente http://127.0.0.1:5173/.
El comando observa estilos e iconos y actualiza el navegador.

- `index.html`: diseño actual del hero y sección Sobre mí.
- `src/input.css`: fuentes, estilos base y animaciones actuales.
- `script.js`: scroll, escritura y animación de la cápsula.
- `src/icons.js`: registro de iconos Lucide.
- `tailwind.config.js`: colores y familias tipográficas.
- `content/portfolio.md`: información profesional para las próximas secciones, sin diseño.
- `assets/`: fuentes, logos e imágenes de proyectos.

Edita `src/input.css`; `styles.css` se genera automáticamente.
Para agregar iconos, impórtalos y regístralos en `src/icons.js`, y usa
`<i data-lucide="nombre-del-icono" aria-hidden="true"></i>` en el HTML.

## Compilación y publicación

```bash
npm run build
```

GitHub Pages sirve los archivos estáticos desde la raíz. Incluye `styles.css`
y `assets/vendor/lucide-icons.js` generados al publicar los cambios.
Lenis se carga desde el CDN declarado en `index.html`.

## CV e información profesional

El CV se conserva en `output/pdf/Ivan_Sanchez_Medina_CV.pdf`.
Para actualizarlo, edita `scripts/generate_cv.py` y ejecuta:

```bash
python3 -m pip install reportlab
python3 scripts/generate_cv.py
```

Los logos, capturas de proyectos y datos profesionales se conservan para el rediseño.
