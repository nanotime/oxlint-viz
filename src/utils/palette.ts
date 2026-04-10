/**
 * Palette sobria y profesional para Oxlint Visualizer.
 * Enfoque en legibilidad, contraste y jerarquía visual.
 */
export const palette = {
  // Fondos y superficies
  base: {
    100: "#ffffff", // Fondo principal
    200: "#f9fafb", // Secciones secundarias
    300: "#f3f4f6", // Bordes y divisiones
  },
  // Escala de grises a negros (Jerarquía de texto y elementos neutros)
  grayscale: {
    light: "#6b7280", // Texto secundario / Placeholders
    mid: "#374151", // Texto principal / Iconos
    dark: "#111827", // Títulos / Negro profundo
  },
  // Colores de estado (Hard Colors)
  status: {
    success: "#059669", // Verde Esmeralda (Success)
    info: "#4f46e5", // Índigo (Blue/Purple Info)
    warning: "#d97706", // Ámbar Intenso (Warning)
    error: "#be123c", // Rosa/Rojo Intenso (Error)
  },
} as const;

export type StatusColor = keyof typeof palette.status;
