# Guía de Analytics — Ebanos Muebles

**Tracking de conversiones, configuración GTM/GA4, y plan de Meta Ads**

---

## 1. Cómo Funciona el Tracking de WhatsApp (ya implementado)

El sitio tiene un script global (`src/scripts/whatsapp-tracking.ts`) que usa **event delegation** para detectar cualquier clic en un link que contenga `wa.me`.

Cuando alguien hace clic, el script pushea un evento `whatsapp_click` a `window.dataLayer` con dos parámetros:
- **`click_location`**: tomado del atributo `data-track-location` del link
- **`page_path`**: la URL actual

GTM recoge este evento y lo envía a GA4. **No hace falta agregar handlers individuales** — el script detecta todo automáticamente.

### Ubicaciones trackeadas actualmente

| Ubicación | `data-track-location` | Archivo |
|---|---|---|
| Navbar (desktop) | `navbar` | `src/components/Navbar.astro` |
| Navbar (mobile) | `navbar_mobile` | `src/components/Navbar.astro` |
| Hero homepage | `hero` | `src/sections/Hero.astro` |
| Página de contacto | `contact_page` | `src/pages/contacto.astro` |
| Sidebar de proyecto | `project_sidebar` | `src/pages/proyectos/[slug].astro` |
| Contenido de proyecto (MD) | `project_content` | `src/data/proyectos/*.md` |

### Cómo agregar un nuevo CTA de WhatsApp

1. Usá un `<a>` normal con `href` apuntando a `wa.me` (o usá la constante `whatsAppLink` de `src/const.ts`)
2. Agregá `data-track-location="tu_ubicacion"` para categorizarlo
3. Listo — el script global lo detecta solo

**Ejemplo** — botón flotante de WhatsApp:

```html
<a
  href="https://wa.me/51979264871"
  target="_blank"
  rel="noopener noreferrer"
  data-track-location="floating_button"
  class="floating-whatsapp"
>
  WhatsApp
</a>
```

> Si te olvidás de `data-track-location`, el clic se trackea igual pero aparece como `"unknown"`.

---

## 2. Configuración en GTM y GA4 (paso a paso)

Para que el código realmente envíe datos, hay que configurar GTM y GA4 desde sus interfaces web.

### Paso 1: Crear Variables en GTM

1. Ir a [tagmanager.google.com](https://tagmanager.google.com) → container **GTM-KF6L4554**
2. **Variables** → User-Defined Variables → New
3. Crear dos **Data Layer Variables**:
   - Nombre: `DLV - click_location` → Variable Name: `click_location`
   - Nombre: `DLV - page_path` → Variable Name: `page_path`

### Paso 2: Crear Trigger en GTM

1. **Triggers** → New
2. Tipo: **Custom Event**
3. Event name: `whatsapp_click`
4. Guardar como **"WhatsApp Click"**

### Paso 3: Crear Tag en GTM

1. **Tags** → New
2. Tipo: **Google Analytics: GA4 Event**
3. Seleccionar el tag de GA4 Configuration existente
4. Event Name: `whatsapp_click`
5. Event Parameters:
   - `click_location` → `{{DLV - click_location}}`
   - `page_path` → `{{DLV - page_path}}`
6. Trigger: **"WhatsApp Click"**
7. Guardar

### Paso 4: Testear

1. En GTM → **Preview**
2. Ir al sitio y hacer clic en un botón de WhatsApp
3. En Tag Assistant, verificar que el evento `whatsapp_click` se dispara con los parámetros correctos
4. Si todo OK → **Submit** (publicar) el container de GTM

Cómo ver click_location y event_page_path
Para eso lo mejor es una Exploration.

Ir a exploraciones
Explore
Free form
Agrega dimensiones
Importa estas dimensiones:

Event name
Custom: click_location
Custom: event_page_path (si luego la registras como custom dimension)
opcional:
Page path + query string
Page location
Agrega métricas
Event count
opcional:
Users
Configuración básica
Rows
click_location
o event_page_path
Values
Event count
Filter
Event name exactly matches whatsapp_click
Así verás algo como:

hero -> 10
navbar -> 6
footer -> 2
Y si usas event_page_path:

/ -> 12
/contacto -> 3


### Paso 5: Marcar como Key Event en GA4

1. Ir a [analytics.google.com](https://analytics.google.com)
2. **Admin** → Events
3. Buscar `whatsapp_click` (puede tardar hasta 24h en aparecer después del primer disparo)
4. Activar **"Mark as key event"**
5. Ahora aparece en los reportes de conversiones

---

## 3. Plan de Meta Pixel para Ads (cuando estemos listos)

### Pre-requisitos

- Cuenta de **Meta Business Suite**
- Un **Pixel ID** (se crea en Meta Business Suite → Events Manager → Data Sources → Add → Web → Meta Pixel)

### Paso 1: Instalar Meta Pixel vía GTM (NO tocar código)

El Pixel se instala **100% desde GTM**, sin modificar el código del sitio.

1. En GTM → **Tags** → New
2. Tipo: **Custom HTML**
3. Pegar el código base del Pixel:

```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'TU_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

4. Trigger: **All Pages**
5. Guardar y publicar

### Paso 2: Trackear WhatsApp clicks como conversión en Meta

1. En GTM → **Tags** → New
2. Tipo: **Custom HTML**
3. Código:

```html
<script>
  fbq('track', 'Contact', {
    content_name: 'WhatsApp Click',
    content_category: {{DLV - click_location}}
  });
</script>
```

4. Trigger: el mismo **"WhatsApp Click"** que ya creamos
5. Guardar y publicar

`Contact` es un evento estándar de Meta — su algoritmo sabe optimizar ads para este tipo de evento. Si corrés ads optimizados para conversiones "Contact", Meta muestra tus anuncios a personas con mayor probabilidad de hacer clic en WhatsApp.

### Paso 3: Verificar el Pixel

1. Instalar la extensión **"Meta Pixel Helper"** en Chrome
2. Visitar el sitio
3. La extensión debe mostrar: **PageView** en cada página, **Contact** al hacer clic en WhatsApp
4. En **Meta Events Manager**, verificar que los eventos aparecen en el dashboard

### Solo 2 eventos de Meta — y por qué

Solo trackeamos **PageView** (automático) y **Contact** (clic en WhatsApp). Nada más. No hace falta ViewContent, AddToCart, etc. — esto es un negocio de servicios, no e-commerce. Con estos dos eventos Meta puede:

- Construir audiencia de personas que visitan el sitio
- Optimizar ads para personas que convierten (clic en WhatsApp)
- Crear audiencias lookalike a partir de los que convierten

---

## 4. Dónde Ver los Datos

| Qué quiero ver | Dónde |
|---|---|
| Visitas por fuente de tráfico | GA4 → Informes → Adquisición → Adquisición de tráfico |
| Páginas más visitadas | GA4 → Informes → Engagement → Páginas y pantallas |
| Clics de WhatsApp (total) | GA4 → Informes → Engagement → Eventos → `whatsapp_click` |
| Clics de WhatsApp (como conversión) | GA4 → Informes → Engagement → Key events |
| Desde dónde hacen clic (navbar, hero, etc.) | GA4 → Explorar → Exploración libre → Dimensión: `click_location` |
| Distribución por dispositivo | GA4 → Informes → Tecnología → Visión general |
| Hora/día con más conversiones | GA4 → Explorar → Dimensión: Hora / Día de la semana + Métrica: Key events |
| Rendimiento de ads Meta | Meta Business Suite → Events Manager |

---

## 5. UTMs para Redes Sociales

Cuando compartas links en Instagram, Facebook, TikTok, etc., **siempre** agregá UTM parameters para que GA4 sepa de dónde viene el tráfico.

**Formato:**

```
https://ebanosmuebles.com/proyectos/SLUG?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN
```

### Ejemplos prácticos

| Dónde comparto | Parámetros UTM |
|---|---|
| Post de Instagram | `?utm_source=instagram&utm_medium=social&utm_campaign=proyecto_closet` |
| Story de Instagram | `?utm_source=instagram&utm_medium=story&utm_campaign=promo_enero` |
| Facebook post | `?utm_source=facebook&utm_medium=social&utm_campaign=nuevo_proyecto` |
| Bio de TikTok | `?utm_source=tiktok&utm_medium=social&utm_campaign=bio_link` |
| Ad de Meta | Se configura automáticamente en Ads Manager |

**Regla:** siempre minúsculas, guiones bajos, descriptivo.
