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

export const collections = { testimonios };
