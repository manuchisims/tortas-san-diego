# Tortas San Diego

Sitio web de Tortas San Diego – Pastelería artesanal en Cali, Colombia.

## Estructura de archivos

```
tortas-san-diego/
├── index.html          ← Página principal
├── css/
│   └── estilos.css     ← Todos los estilos
├── js/
│   └── main.js         ← Interacciones
└── images/
    ├── fondo-de-pagina-01b.webp   ← Fondo de la página
    └── galeria/                   ← Tus fotos de tortas van aquí
```

## Cómo agregar fotos

1. Sube las fotos a la carpeta `images/galeria/`
2. En `index.html`, reemplaza los bloques `<div class="gallery-placeholder">` por:
   ```html
   <img src="images/galeria/tu-foto.jpg" alt="Descripción de la torta" />
   ```
