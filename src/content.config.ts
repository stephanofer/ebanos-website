import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const testimonios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/testimonios" }),
  schema: z.object({
    nombre: z.string(),
    ubicacion: z.string(),
    titulo: z.string(),
    tag: z.string(),
    imagenProyecto: z.string(),
    imagenAvatar: z.string(),
    // Sistema de puntuación: 1-5 estrellas (permite decimales como 4.5)
    puntuacion: z.number().min(1).max(5),
    destacado: z.boolean().optional().default(false),
    // Fecha para ordenar testimonios (más recientes primero)
    fecha: z.coerce.date().optional(),
  }),
});

// Categorías de proyectos permitidas
const categoriasProyecto = z.enum([
  "Dormitorio",
  "Sala",
  "Comedor",
  "Cocina",
  "Oficina",
  "Closet",
  "Estudio",
  "Exterior",
  "Baño",
  "Otros",
  "Mobiliario Comercial",
  "Mobiliario Religioso",
]);

const proyectos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/proyectos" }),
  schema: z.object({
    // Información básica
    titulo: z.string(),
    slug: z.string(), // SEO-friendly URL
    categoria: categoriasProyecto,
    descripcionCorta: z.string().max(160), // Meta description SEO
    
    // Imágenes
    imagenPortada: z.string(),
    imagenPortadaAlt: z.string(),
    galeria: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
    
    // Detalles del proyecto
    cliente: z.string().default("Anónimo"),
    ubicacionProyecto: z.string().optional(),
    fechaEntrega: z.coerce.date(),
    
    // Satisfacción del cliente (1-5 estrellas)
    satisfaccionCliente: z.number().min(1).max(5).optional(),
    
    // Especificaciones técnicas
    materiales: z.array(z.string()).optional(),
    colores: z.array(z.string()).optional(),
    acabados: z.array(z.string()).optional(),
    dimensiones: z.string().optional(),
    tiempoFabricacion: z.string().optional(),
    
    // Muebles incluidos (para proyectos con múltiples piezas)
    muebles: z.array(z.string()).optional(),
    
    // Control de visualización
    destacado: z.boolean().default(false), // Para mostrar en el index
    orden: z.number().default(0), // Para ordenar manualmente
    publicado: z.boolean().default(true),
    
    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = { testimonios, proyectos };
