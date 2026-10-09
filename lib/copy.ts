export type Locale = "neutral" | "es" | "cl";

export interface Copy {
  eyebrow: string;
  subtitle: string;
  searchPlaceholder: string;
  favoritesOnly: string;
  clearFilters: string;
  tipoFilterLabel: string;
  tipoFilterAll: string;
  countLabel: (shown: number, total: number) => string;
  emptyState: string;
  sinEquivalente: string;
  suggestButton: string;
  dialogTitle: string;
  dialogDescription: string;
  labelSlangEs: string;
  labelSlangCl: string;
  labelDefinicion: string;
  labelCategoria: string;
  labelEmail: string;
  submit: string;
  submitting: string;
  toastMissingWord: string;
  toastMissingDef: string;
  toastSubmitError: string;
  toastSubmitSuccess: string;
  toastShareSuccess: string;
  toastShareError: string;
}

// Textos de la interfaz (no del vocabulario en sí) según el país elegido.
// El default "neutral" se usa antes de elegir país y usa tú neutro, sin
// voseo — nunca "buscá"/"contanos".
export const COPY: Record<Locale, Copy> = {
  neutral: {
    eyebrow: "Hecho por y para hispanohablantes confundidos",
    subtitle:
      "Lo que uno dice en España, lo que entienden en Chile (o no). Busca, filtra y descubre los coloquialismos de cada lado del charco.",
    searchPlaceholder: "Busca una palabra o su significado…",
    favoritesOnly: "Solo favoritos",
    clearFilters: "Limpiar filtros",
    tipoFilterLabel: "Tipo gramatical",
    tipoFilterAll: "Todos los tipos",
    countLabel: (shown, total) => `${shown} de ${total} palabras`,
    emptyState:
      "No encontramos ninguna palabra con esos filtros. Prueba con otra búsqueda o limpia los filtros para ver todo el listado.",
    sinEquivalente: "sin equivalente",
    suggestButton: "Sugerir una palabra",
    dialogTitle: "Sugerir una palabra",
    dialogDescription:
      "¿Conoces un coloquialismo que falta? Cuéntanoslo y lo revisamos para sumarlo al listado.",
    labelSlangEs: "Slang en España",
    labelSlangCl: "Slang en Chile",
    labelDefinicion: "Definición en castellano neutral",
    labelCategoria: "Categoría (opcional)",
    labelEmail: "Tu email (opcional, por si queremos preguntarte algo)",
    submit: "Enviar sugerencia",
    submitting: "Enviando…",
    toastMissingWord: "Cuéntanos al menos una de las dos palabras (España o Chile).",
    toastMissingDef: "Nos falta la definición.",
    toastSubmitError: "No pudimos enviar tu sugerencia. Prueba de nuevo más tarde.",
    toastSubmitSuccess: "¡Gracias! Vamos a revisar tu sugerencia.",
    toastShareSuccess: "Enlace copiado al portapapeles",
    toastShareError: "No se pudo copiar el enlace",
  },
  es: {
    eyebrow: "Hecho por y para hispanohablantes confundidos",
    subtitle:
      "Lo que dices tú, lo que entiende un chileno (o no). Busca, filtra y descubre los coloquialismos de cada lado del charco.",
    searchPlaceholder: "Busca una palabra o su significado…",
    favoritesOnly: "Solo favoritos",
    clearFilters: "Quitar filtros",
    tipoFilterLabel: "Tipo gramatical",
    tipoFilterAll: "Todos los tipos",
    countLabel: (shown, total) => `${shown} de ${total} palabras`,
    emptyState:
      "No hemos encontrado ninguna palabra con esos filtros. Prueba con otra búsqueda o quita los filtros para ver todo el listado.",
    sinEquivalente: "sin equivalente",
    suggestButton: "Proponer una palabra",
    dialogTitle: "Proponer una palabra",
    dialogDescription:
      "¿Te sabes un coloquialismo que falta? Cuéntanoslo y lo revisamos para añadirlo al listado.",
    labelSlangEs: "Slang en España",
    labelSlangCl: "Slang en Chile",
    labelDefinicion: "Definición en castellano neutral",
    labelCategoria: "Categoría (opcional)",
    labelEmail: "Tu email (opcional, por si te queremos preguntar algo)",
    submit: "Enviar propuesta",
    submitting: "Enviando…",
    toastMissingWord: "Cuéntanos al menos una de las dos palabras (España o Chile).",
    toastMissingDef: "Nos falta la definición.",
    toastSubmitError: "No hemos podido enviar tu propuesta. Prueba de nuevo más tarde.",
    toastSubmitSuccess: "¡Gracias! Le echaremos un vistazo.",
    toastShareSuccess: "Enlace copiado al portapapeles",
    toastShareError: "No se ha podido copiar el enlace",
  },
  cl: {
    eyebrow: "Hecho por y para hispanohablantes confundidos",
    subtitle:
      "Lo que dice un español, lo que cachas tú (o no). Busca, filtra y descubre los coloquialismos de cada lado del charco.",
    searchPlaceholder: "Busca una palabra o su significado…",
    favoritesOnly: "Solo favoritos",
    clearFilters: "Limpiar filtros",
    tipoFilterLabel: "Tipo gramatical",
    tipoFilterAll: "Todos los tipos",
    countLabel: (shown, total) => `${shown} de ${total} palabras`,
    emptyState:
      "No encontramos ninguna palabra con esos filtros. Prueba con otra búsqueda o limpia los filtros para ver todo el listado.",
    sinEquivalente: "sin equivalente",
    suggestButton: "Sugerir una palabra",
    dialogTitle: "Sugerir una palabra",
    dialogDescription:
      "¿Cachai alguna palabra que falta? Cuéntanos y la revisamos para sumarla al listado.",
    labelSlangEs: "Slang en España",
    labelSlangCl: "Slang en Chile",
    labelDefinicion: "Definición en castellano neutral",
    labelCategoria: "Categoría (opcional)",
    labelEmail: "Tu correo (opcional, por si te queremos preguntar algo)",
    submit: "Enviar sugerencia",
    submitting: "Enviando…",
    toastMissingWord: "Cuéntanos al menos una de las dos palabras (España o Chile).",
    toastMissingDef: "Nos falta la definición.",
    toastSubmitError: "No pudimos enviar tu sugerencia. Intenta de nuevo más tarde.",
    toastSubmitSuccess: "¡Gracias! La vamos a revisar.",
    toastShareSuccess: "Link copiado",
    toastShareError: "No se pudo copiar el link",
  },
};
