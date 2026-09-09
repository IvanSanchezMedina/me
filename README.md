# Portafolio de Iván Sánchez

Portafolio personal de Iván Sánchez - Web Developer

## 🚀 Demo

Visita el portafolio en vivo: [https://ivansanchezmedina.github.io/Portfolio](https://ivansanchezmedina.github.io/Portfolio)

## 📋 Características

- ✨ Diseño moderno con glassmorphism
- 🎨 Tema oscuro elegante
- 📱 Totalmente responsive
- 🚀 Animaciones suaves
- ⚡ Optimizado para rendimiento
- 🎯 SEO optimizado

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (ES6+)
- Google Fonts (Inter)

## 📁 Estructura del Proyecto

```
Portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # Interactividad
├── README.md           # Documentación
└── IvanSanchezMedina.pdf  # CV original
```

## 🎨 Secciones

- **Hero**: Presentación inicial con información de contacto
- **Sobre mí**: Descripción profesional y estadísticas
- **Experiencia**: Timeline con historial laboral
- **Habilidades**: Grid con tecnologías y herramientas
- **Proyectos**: Showcase de proyectos destacados
- **Educación**: Formación académica
- **Contacto**: Información de contacto y redes sociales

## 🚀 Cómo usar

### Visualización Local

1. Clona el repositorio:
```bash
git clone https://github.com/IvanSanchezMedina/Portfolio.git
```

2. Navega al directorio:
```bash
cd Portfolio
```

3. Abre `index.html` en tu navegador favorito o usa un servidor local:
```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js (http-server)
npx http-server
```

### Deployment en GitHub Pages

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a **Pages** en el menú lateral
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`
4. Haz clic en **Save**
5. Tu sitio estará disponible en `https://[tu-usuario].github.io/Portfolio`

## 📝 Personalización

### Colores

Los colores principales se definen en las variables CSS en `styles.css`:

```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --accent: #14b8a6;
    /* ... más colores */
}
```

### Contenido

Edita el archivo `index.html` para actualizar:
- Información personal
- Experiencia laboral
- Proyectos
- Habilidades
- Enlaces de contacto

## 📱 Responsive

El portafolio está optimizado para:
- 📱 Móviles (< 480px)
- 📱 Tablets (481px - 768px)
- 💻 Desktop (> 768px)

## ⚡ Optimizaciones

- Lazy loading para animaciones
- Debounce en eventos de scroll
- Transiciones CSS optimizadas
- Fuentes pre-cargadas

## CV descargable

El botón **Descargar CV** de la presentación descarga `output/pdf/Ivan_Sanchez_Medina_CV.pdf`.
El documento incluye experiencia laboral, proyectos, habilidades y formación en dos páginas.

Para actualizarlo, edita el contenido en `scripts/generate_cv.py` y regenera el PDF:

```bash
python3 -m pip install reportlab
python3 scripts/generate_cv.py
```

Sube el PDF regenerado junto con los cambios del portafolio.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Contacto

- **Email**: ivanusanchezm@gmail.com
- **GitHub**: [@IvanSanchezMedina](https://github.com/IvanSanchezMedina)
- **Ubicación**: Guadalajara, Jalisco

---

Desarrollado con ❤️ y mucho café por Iván Sánchez
