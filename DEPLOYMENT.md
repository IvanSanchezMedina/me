# 🚀 Guía de Deployment a GitHub Pages

Esta guía te ayudará a subir tu portafolio a GitHub y publicarlo usando GitHub Pages.

## 📋 Prerrequisitos

- Tener una cuenta de GitHub ([crear cuenta aquí](https://github.com/join))
- Tener Git instalado en tu computadora
- Terminal o línea de comandos

## 🔧 Paso 1: Configurar Git (si es la primera vez)

Si es la primera vez que usas Git, configura tu nombre y email:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

## 📁 Paso 2: Crear el Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura el repositorio:
   - **Repository name**: `Portfolio` (o el nombre que prefieras)
   - **Description**: "Mi portafolio profesional"
   - Marca como **Public** para poder usar GitHub Pages gratis
   - **NO** marques "Initialize this repository with a README" (ya tenemos uno)
5. Haz clic en **"Create repository"**

## 💻 Paso 3: Subir tu Portafolio a GitHub

Abre la terminal en la carpeta de tu portafolio y ejecuta los siguientes comandos:

### 3.1 Inicializar Git (si aún no está inicializado)

```bash
cd /Users/underkraken/Desktop/Portfolio
git init
```

### 3.2 Agregar todos los archivos

```bash
git add .
```

### 3.3 Crear el primer commit

```bash
git commit -m "Initial commit: Portfolio website"
```

### 3.4 Conectar con GitHub

**Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub:**

```bash
git branch -M main
git remote add origin https://github.com/IvanSanchezMedina/Portfolio.git
```

### 3.5 Subir los archivos

```bash
git push -u origin main
```

> **Nota**: Te pedirá tu usuario y contraseña de GitHub. Si tienes autenticación de dos factores, necesitarás usar un [Personal Access Token](https://github.com/settings/tokens) en lugar de tu contraseña.

## 🌐 Paso 4: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"** (Configuración)
3. En el menú lateral izquierdo, busca y haz clic en **"Pages"**
4. En la sección **"Source"**:
   - Selecciona la rama: **main**
   - Selecciona la carpeta: **/ (root)**
5. Haz clic en **"Save"**
6. Espera unos minutos (1-3 minutos)

¡Tu portafolio estará disponible en:

```
https://ivansanchezmedina.github.io/Portfolio
```

(Reemplaza `ivansanchezmedina` con tu usuario de GitHub)

## 🔄 Actualizar tu Portafolio

Cuando quieras hacer cambios:

1. Edita los archivos que necesites
2. Guarda los cambios
3. En la terminal, ejecuta:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Los cambios se reflejarán en tu sitio en 1-2 minutos.

## 🎨 Comandos Git Útiles

```bash
# Ver el estado de tus archivos
git status

# Ver el historial de commits
git log --oneline

# Ver la URL de tu repositorio remoto
git remote -v

# Deshacer cambios no guardados
git checkout -- nombre-archivo.html

# Ver diferencias antes de hacer commit
git diff
```

## 🐛 Solución de Problemas

### "Permission denied" al hacer push

Crea un Personal Access Token:
1. Ve a [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click en "Generate new token (classic)"
3. Selecciona "repo" en los permisos
4. Copia el token y úsalo como contraseña cuando hagas push

### La página no se actualiza

1. Limpia la caché del navegador (Cmd + Shift + R en Mac)
2. Verifica que los cambios estén en GitHub
3. Espera unos minutos más

### Error al hacer push

Si recibes un error, puede que necesites hacer pull primero:

```bash
git pull origin main --rebase
git push
```

## 📱 Verificar que todo funcione

Después de activar GitHub Pages:

1. Visita la URL de tu portafolio
2. Verifica que todas las secciones se vean correctamente
3. Prueba la navegación
4. Verifica en móvil y desktop
5. Comprueba que todos los enlaces funcionen

## 🎉 ¡Listo!

Tu portafolio ahora está en línea y puedes compartir la URL con:
- Reclutadores
- Clientes potenciales
- En tu CV
- En tus redes sociales

## 📊 Estadísticas y Analytics (Opcional)

Si quieres ver cuántas personas visitan tu portafolio, puedes agregar Google Analytics:

1. Crea una cuenta en [Google Analytics](https://analytics.google.com)
2. Obtén tu ID de medición (G-XXXXXXXXXX)
3. Agrega este código antes del `</head>` en tu `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

**¿Necesitas ayuda?** Consulta la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages)
