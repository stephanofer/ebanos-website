# Copilot Instructions for Ebanos Website

## Project Overview
This is an Astro-based website for "Ebanos Muebles" (furniture manufacturer in Chiclayo, Peru). It's built with TypeScript, uses pnpm as package manager, and integrates Sentry for error monitoring and Google Tag Manager for analytics.

## Architecture & File Structure

### Core Technology Stack
- **Framework**: Astro 5.x with strict TypeScript configuration
- **Package Manager**: pnpm (specified version in packageManager field)
- **Styling**: Component-scoped CSS with global styles in `/src/styles/global.css`
- **Fonts**: Custom fonts (Inter, Clash) loaded via `@font-face` from `/public/fonts/`
- **Images**: Static assets in `/public/assets/` and SVG icons imported from `/src/assets/`

### Path Alias Configuration
- Uses `@/*` alias mapping to `src/*` (configured in `tsconfig.json`)
- Always use path aliases for imports: `@/components/`, `@/sections/`, `@/layouts/`

### Component Architecture Patterns

#### Layout System
- **BaseLayout.astro**: Root layout with SEO head, Google Tag Manager, and slot for content
- **MainHead.astro**: Centralized head component handling meta tags, title, and analytics scripts
- **SectionContainer.astro**: Wrapper component with consistent max-width (1440px) and padding

#### Component Organization
- `/components/`: Reusable UI components (Button, Navbar, Announce, etc.)
- `/sections/`: Page-specific sections (Hero, Categories)
- `/layouts/`: Layout wrappers
- `/pages/`: Astro pages (currently just index.astro and 404.astro)

#### Button Component Pattern
The Button component is actually an anchor tag with:
- Default target="_blank" and rel="noopener noreferrer"
- Two variants: "primary" and "secondary" types
- Named slots for "icon-left" and "icon-right"
- Custom styling with Clash font family

## Development Conventions

### Styling Approach
- **Component-scoped CSS**: Each .astro file contains its own `<style>` block
- **CSS Custom Properties**: Defined in `:root` with fluid typography using `clamp()`
- **Font Loading**: Custom fonts preloaded in MainHead with `font-display: swap`
- **Responsive Design**: Uses CSS custom properties for fluid scaling

### Content Structure
- Spanish language content (business is located in Chiclayo, Peru)
- Focus on furniture manufacturing and custom design services
- Uses trust badges and social proof ("+3,000 familias", "+25 años de experiencia")

### Asset Management
- **Images**: WebP format in `/public/assets/` for photos
- **Icons**: SVG files in `/src/assets/` imported as components
- **Favicon**: SVG format in `/public/assets/`

## Build & Development Commands

```bash
pnpm dev          # Local development server (localhost:4321)
pnpm build        # Production build to ./dist/
pnpm preview      # Preview production build
```

## Integrations & Services
- **Sentry**: Error monitoring with source maps upload configured
- **Sitemap**: Auto-generated via @astrojs/sitemap
- **Google Tag Manager**: Integrated in BaseLayout with GTM-KF6L4554

## Component Usage Examples

### Creating a new section:
```astro
---
import SectionContainer from "@/components/SectionContainer.astro";
import Button from "@/components/Button.astro";
import Icon from "@/assets/icon-name.svg";
---

<SectionContainer name="section-id">
  <Button type="secondary" href="mailto:contact@example.com">
    <Icon slot="icon-left" />
    Button Text
  </Button>
</SectionContainer>
```

### Page structure pattern:
```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import SectionContainer from "@/components/SectionContainer.astro";
---

<BaseLayout title="Page Title">
  <SectionContainer name="main">
    <!-- Page content -->
  </SectionContainer>
</BaseLayout>
```

## Key Files to Reference
- `src/layouts/BaseLayout.astro` - Root layout with analytics
- `src/components/SectionContainer.astro` - Layout wrapper pattern
- `src/styles/global.css` - Typography scale and CSS custom properties
- `astro.config.mjs` - Sentry configuration and integrations