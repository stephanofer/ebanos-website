import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const testimonios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/testimonios" }),
  schema: z.object({
    nombre: z.string(),
    ubicacion: z.string(),
    titulo: z.string(),
    tag: z.string(),
    imagenProyecto: z.string(),
    imagenAvatar: z.string(),
    puntuacion: z.number().min(1).max(5),
    destacado: z.boolean().optional().default(false),
    fecha: z.coerce.date().optional(),
  }),
});

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
    titulo: z.string(),
    slug: z.string(), 
    categoria: categoriasProyecto,
    descripcionCorta: z.string().max(160),

    imagenPortada: z.string(),
    imagenPortadaAlt: z.string(),
    galeria: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        })
      )
      .optional(),

    cliente: z.string().default("Anónimo"),
    ubicacionProyecto: z.string().optional(),
    fechaEntrega: z.coerce.date(),

    satisfaccionCliente: z.number().min(1).max(5).optional(),

    materiales: z.array(z.string()).optional(),
    colores: z.array(z.string()).optional(),
    acabados: z.array(z.string()).optional(),
    dimensiones: z.string().optional(),
    tiempoFabricacion: z.string().optional(),

    muebles: z.array(z.string()).optional(),

    destacado: z.boolean().default(false),
    orden: z.number().default(0),
    publicado: z.boolean().default(true),

    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = { testimonios, proyectos };
