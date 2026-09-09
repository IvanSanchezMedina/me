# ⚡ Guía Rápida - Subir a GitHub

## ✅ Ya está listo:

- ✓ Git inicializado
- ✓ Archivos agregados
- ✓ Primer commit creado
- ✓ Rama main configurada

## 🎯 Solo te faltan 3 pasos:

### 1️⃣ Crear el repositorio en GitHub

1. Ve a: https://github.com/new
2. **Repository name**: `Portfolio`
3. Marca como **Public**
4. **NO** marques "Initialize with README"
5. Click **"Create repository"**

### 2️⃣ Conectar con GitHub

Copia y pega este comando en tu terminal (reemplaza `IvanSanchezMedina` con tu usuario de GitHub si es diferente):

```bash
cd /Users/underkraken/Desktop/Portfolio
git remote add origin https://github.com/IvanSanchezMedina/Portfolio.git
```

### 3️⃣ Subir el portafolio

```bash
git push -u origin main
```

> **Nota**: Te pedirá tu usuario y contraseña de GitHub.
> Si tienes 2FA activado, usa un [Personal Access Token](https://github.com/settings/tokens) como contraseña.

### 4️⃣ Activar GitHub Pages

1. Ve a tu repositorio: `https://github.com/IvanSanchezMedina/Portfolio`
2. Click en **Settings** → **Pages** (menú lateral)
3. En **Source**: selecciona rama `main` y carpeta `/ (root)`
4. Click **Save**
5. ¡Espera 1-2 minutos!

## 🌐 Tu portafolio estará en:

```
https://ivansanchezmedina.github.io/Portfolio/
```

---

## 🆘 ¿Problemas con la contraseña?

### Crear un Personal Access Token:

1. Ve a: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Dale un nombre: "Portfolio Upload"
4. Marca la casilla **"repo"**
5. Click **"Generate token"**
6. **¡COPIA EL TOKEN!** (no lo podrás ver de nuevo)
7. Usa este token como contraseña cuando hagas `git push`

---

## 📱 Ver tu portafolio

Una vez activado GitHub Pages, abre en tu navegador:

```
https://ivansanchezmedina.github.io/Portfolio/
```

¡Y listo! 🎉

---

**Documentación completa**: Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.
