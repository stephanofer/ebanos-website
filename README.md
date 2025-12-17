# Ebanos Muebles 🛋️

**Sitio web profesional para empresa de muebles a medida.**

## 🎯 Qué hay aquí

Proyecto full-stack moderno con:
- **SSG de alto rendimiento** con Astro 
- **SEO optimizado** (sitemap, robots.txt, meta tags)
- **Responsive design** y UX excelente

## 🚀 Stack técnico

| Área | Tecnología |
|------|-----------|
| **Framework** | Astro 5.16 |
| **Styling** | CSS + Responsive |
| **CMS** | Content Collections (Markdown) |
| **Optimización** | Sharp para imágenes |
| **Hosting** | Cloudflare (Wrangler) |

## 📊 Características

✅ **Portfolio dinámico** - proyectos catalogados con categorías  
✅ **Sistema de testimonios** - Rating 1-5 estrellas integrado  
✅ **Rutas dinámicas** - Generación automática de URLs amigables  
✅ **Rendimiento** - Static generation con optimización de assets  
✅ **Producción-ready** - Error tracking, SEO, robots.txt automático  

## 🛠️ Ejecutar localmente

```bash
pnpm install
pnpm run dev    # http://localhost:3000
pnpm run build  # Producción
```

## 📁 Estructura

```
src/
├── pages/          # Rutas (index, proyectos dinámicos, contacto)
├── components/     # UI reutilizable (NavBar, ProjectCard, etc)
├── sections/       # Hero, Projects, Services, Experiencias
├── data/           # Markdown: proyectos + testimonios
└── layouts/        # BaseLayout con SEO
```

## 🎨 Highlights de código

- **Colecciones de contenido tipado** con Zod para validación
- **Componentes atómicos** de Astro para máximo rendimiento
- **Rutas catch-all** para paginación de proyectos (`[...page].astro`)
- **Configuración robusta** de sitemap y SEO automático

---

**Sitio:** https://ebanosmuebles.com | **Ubicación:** Chiclayo, Perú
