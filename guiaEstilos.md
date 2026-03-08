# Guia de Estilos - Bizarre Desktop

Esta guia documenta el sistema de diseño y las convenciones de estilo utilizadas en el proyecto Bizarre Desktop.

---

## 1. Variables CSS Globales

El proyecto utiliza variables CSS personalizadas para mantener consistencia en todo el diseño.

### Colores Principales

```
css
:root {
  /* Colores base */
  --bg: #070707;              /* Fondo principal - negro profundo */
  --card: #6a1b9a;            /* Color de tarjetas - purpura oscuro */
  --card2: #a924bb;           /* Color de tarjetas secundario - purpura brillante */
  --accent: #e91e63;          /* Acento principal - rosa/shock */
  --accent-light: #f48fb1;    /* Acento claro - rosa suave */
  --muted: #ffeb3b;          /* Color muted - amarillo dorado */
  --blanco: #ffffff;          /* Blanco puro */
  --blanco-80: rgba(255, 255, 255, 0.8);  /* Blanco con transparencia */
  
  /* Colores de interfaz */
  --glass: rgba(255, 255, 255, 0.1);     /* Fondo tipo cristal */
  --glass-border: rgba(255, 255, 255, 0.2); /* Borde tipo cristal */
  --shadow: 0 8px 32px rgba(0, 0, 0, 0.3); /* Sombra base */
  
  /* Colores especificos del escritorio */
  --icon: rgb(106, 27, 154, 0.7);
  --iconHover: rgb(233, 30, 99, 0.7);
  
  /* Accesibilidad */
  --focus-outline: #ffeb3b;  /* Outline de enfoque - amarillo */
}
```

### Paleta de Colores por Seccion

| Seccion | Color Primario | Color Acento | Color de Fondo |
|---------|---------------|--------------|----------------|
| Index | #7a64b7 (purpura) | #eb5694 (rosa) | Radial gradient a #070707 |
| Escritorio | #fbe1ad (amarillo) | #eb5694 (rosa) | Imagen de fondo |
| Partes | #6a1b9a (purpura) | #e91e63 (rosa) | #1a1a2e a #0f0f23 |
| Sesion | #e91e63 (rosa) | #ffeb3b (amarillo) | Conic gradient |

---

## 2. Tipografia

### Fuentes Personalizadas

El proyecto utiliza dos fuentes personalizadas declaradas via @font-face:

```
css
@font-face {
  font-family: "Fedora";
  src: url("../assets/font/sf-fedora.regular.ttf") format("truetype");
}

@font-face {
  font-family: "CCWild";
  src: url("../assets/font/cc-wild-words-roman.ttf") format("truetype");
}
```

### Uso Tipografico

| Elemento | Familia de Fuente | Tamano Recomendado |
|----------|------------------|-------------------|
| Titulos principales | Fedora | 3rem - 6rem |
| Titulos de seccion | Fedora | 1.5rem - 2rem |
| Titulos de tarjetas | Fedora | 1.4rem |
| Texto cuerpo | CCWild, Arial, sans-serif | 0.85rem - 1.1rem |
| Texto de interfaz | Segoe UI, Verdana, sans-serif | 1rem |

### Escala de Tamaños

- `.banner-title`: clamp(3rem, 8vw, 6rem)
- `h1`: 4.4rem
- `h2`: 2.2rem
- `h3`: 1.5rem
- `body`: 1rem
- `small`: 0.85rem

---

## 3. Componentes

### 3.1 Botones

#### Boton Primario
```
css
.btn.primary {
  background: var(--accent);        /* #e91e63 */
  color: #000;
  box-shadow: 0 6px 18px rgba(255, 215, 0, 0.3);
}
```

#### Boton Secundario/Ghost
```
css
.btn.ghost {
  background: #7b1fa2;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

#### Controles de Ventana
```
css
.window-control {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: #7a64b7;
  color: #fbe1ad;
  font-size: 1.1rem;
}
```

### 3.2 Tarjetas

#### Tarjeta de Personaje (Flip Card)
```
css
.character-card {
  background: transparent;
  width: 100%;
  height: 380px;
  perspective: 1000px;
}

.character-card-front {
  background: linear-gradient(145deg, var(--card) 0%, var(--bg) 100%);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
}

.character-card-back {
  background: linear-gradient(145deg, var(--card2) 0%, var(--card) 100%);
  transform: rotateY(180deg);
}
```

#### Tarjeta de Informacion (Info Card)
```
css
.info-card {
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 30px;
}
```

### 3.3 Ventanas

```
css
.window {
  background: rgba(122, 100, 183);  /* purpura */
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(7, 7, 7, 0.53);
}

.window-header {
  background: rgba(7, 7, 7, 0.95);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  color: #fbe1ad;
}
```

### 3.4 Sidebar

```
css
.sidebar {
  background: linear-gradient(180deg, rgba(106, 27, 154, 0.3) 0%, rgba(7, 7, 7, 0.8) 100%);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--glass-border);
}
```

### 3.5 Modal

```
css
.modal-content {
  background: linear-gradient(145deg, var(--card) 0%, var(--bg) 100%);
  border-radius: 24px;
  border: 1px solid var(--glass-border);
}
```

---

## 4. Layout y Espaciado

### Sistema de Espaciado

El proyecto utiliza valores em/rem para escalabilidad:

- `0.25rem` - 4px
- `0.5rem` - 8px
- `0.6rem` - 10px
- `0.7rem` - 11px
- `0.8rem` - 13px
- `1rem` - 16px
- `1.5rem` - 24px
- `2rem` - 32px
- `2.5rem` - 40px
- `3rem` - 48px
- `4rem` - 64px

### Breakpoints Responsive

```
css
/* Tablets grandes */
@media (max-width: 1024px) { }

/* Tablets */
@media (max-width: 768px) { }

/* Moviles grandes */
@media (max-width: 480px) { }

/* Moviles pequenos */
@media (max-width: 320px) { }
```

---

## 5. Animaciones

### Transiciones

Todas las transiciones utilizan la propiedad CSS personalizada:

```
css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframes

#### Entrada de ventana
```
css
@keyframes windowIn {
  from {
    transform: scale(0.7) translateY(40px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
```

#### Efecto glow en titulo
```
css
@keyframes titleGlow {
  from {
    text-shadow: 0 0 20px var(--accent), 0 0 40px var(--accent);
  }
  to {
    text-shadow: 0 0 30px var(--accent-light), 0 0 60px var(--accent);
  }
}
```

#### Ciclo de color
```
css
@keyframes colorCycle {
  0% { color: #e91e63; }
  33% { color: #9c27b0; }
  66% { color: #9c27b0; }
  100% { color: #e91e63; }
}
```

#### Efecto bounce
```
css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-15px); }
  60% { transform: translateX(-50%) translateY(-7px); }
}
```

---

## 6. Accesibilidad

### Indicadores de Foco

```
css
*:focus {
  outline: 3px solid var(--focus-outline);  /* #ffeb3b */
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 3px solid var(--focus-outline);
  outline-offset: 2px;
}
```

### Skip Link

```
css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--muted);
  color: #000;
  padding: 8px 16px;
  z-index: 1000;
  text-decoration: none;
  font-weight: bold;
}

.skip-link:focus {
  top: 0;
}
```

### Reduced Motion

```
css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Clase Visually Hidden

```
css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 7. Fondos

### Fondo Index (Espacial)
```
css
background: radial-gradient(ellipse at 50% 50%, #7a64b7 0%, #070707 100%);
```

### Fondo Partes (Gradiente oscuro)
```
css
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
```

### Fondo Sesion (Conic gradient)
```
css
background: conic-gradient(from 0deg, hsl(0, 0%, 0%) 0%, #4d0c72 10%, #000 20%, ...);
```

---

## 8. Convenciones de Naming

### Clases CSS

- **Componentes**: `nombre-componente` (kebab-case)
- **Modificadores**: `nombre-componente--variante`
- **Estados**: `nombre-componente.is-active`, `nombre-componente[data-state="open"]`
- **Utilidades**: `nombre-utilidad` (sin prefijo)

### Ejemplos en el proyecto

| Patron | Ejemplo |
|--------|---------|
| Componente | `.window`, `.modal`, `.btn` |
| Elemento | `.window-header`, `.modal-content` |
| Modificador | `.window.maximized`, `.tab.active` |
| Estado | `.hidden`, `.invisible`, `.visually-hidden` |

---

## 9. Archivos CSS

| Archivo | Proposito |
|---------|-----------|
| `index.css` | Pagina de inicio con modelo 3D |
| `escritorio.css` | Interfaz de escritorio principal |
| `partes.css` | Wiki de partes y personajes |
| `sesion.css` | Pantalla de seleccion de perfil |
| `coleccion.css` | Colección completa de volúmenes de manga |

---

## 10. Valores por Defecto

### Box-Sizing
```
css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

### Body Base
```
css
body {
  font-family: "Segoe UI", Verdana, sans-serif;  /* Fallback chain */
  background: /* Seccion especifica */;
  color: /* Seccion especifica */;
}
```

---

## 11. Z-Index

| Valor | Uso |
|-------|-----|
| -1 | Canvas decorativos (starsCanvas) |
| 0 | Fondos decorativos (space-bg) |
| 1 | Glow effects |
| 10 | Model viewer |
| 100 | Ventanas (window) |
| 1000 | Modales (modal), Skip links |
| 10000 | Particulas |
| 2000 | Transicion de apagado |



