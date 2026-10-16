export type Locale = "neutral" | "es" | "cl";

export interface Copy {
  eyebrow: string;
  subtitle: string;
  searchPlaceholder: string;
  favoritesOnly: string;
  clearFilters: string;
  categoriasLabel: string;
  categoriasClear: string;
  tipoFilterLabel: string;
  tipoFilterAll: string;
  rangeLabel: (from: number, to: number, total: number) => string;
  prevPage: string;
  nextPage: string;
  pageLabel: (page: number, pageCount: number) => string;
  emptyState: string;
  sinEquivalente: string;
  suggestButton: string;
  dialogTitle: string;
  dialogDescription: string;
  labelCountry: string;
  optionEs: string;
  optionCl: string;
  labelWord: string;
  submit: string;
  submitting: string;
  toastMissingCountry: string;
  toastMissingWord: string;
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
    categoriasLabel: "Categorías",
    categoriasClear: "Limpiar",
    tipoFilterLabel: "Tipo gramatical",
    tipoFilterAll: "Todos los tipos",
    rangeLabel: (from, to, total) => `${from}–${to} de ${total} palabras`,
    prevPage: "Anterior",
    nextPage: "Siguiente",
    pageLabel: (page, pageCount) => `Página ${page} de ${pageCount}`,
    emptyState:
      "No encontramos ninguna palabra con esos filtros. Prueba con otra búsqueda o limpia los filtros para ver todo el listado.",
    sinEquivalente: "sin equivalente",
    suggestButton: "Sugerir una palabra",
    dialogTitle: "Sugerir una palabra",
    dialogDescription:
      "¿Conoces un coloquialismo que falta? Dinos de qué país es y cuál es la palabra; nosotros completamos el resto.",
    labelCountry: "¿Es de España o de Chile?",
    optionEs: "España",
    optionCl: "Chile",
    labelWord: "¿Cuál es la palabra?",
    submit: "Enviar sugerencia",
    submitting: "Enviando…",
    toastMissingCountry: "Elige si la palabra es de España o de Chile.",
    toastMissingWord: "Escribe la palabra.",
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
    categoriasLabel: "Categorías",
    categoriasClear: "Quitar",
    tipoFilterLabel: "Tipo gramatical",
    tipoFilterAll: "Todos los tipos",
    rangeLabel: (from, to, total) => `${from}–${to} de ${total} palabras`,
    prevPage: "Anterior",
    nextPage: "Siguiente",
    pageLabel: (page, pageCount) => `Página ${page} de ${pageCount}`,
    emptyState:
      "No hemos encontrado ninguna palabra con esos filtros. Prueba con otra búsqueda o quita los filtros para ver todo el listado.",
    sinEquivalente: "sin equivalente",
    suggestButton: "Proponer una palabra",
    dialogTitle: "Proponer una palabra",
    dialogDescription:
      "¿Te sabes un coloquialismo que falta? Dinos de qué país es y cuál es la palabra; nosotros completamos el resto.",
    labelCountry: "¿Es de España o de Chile?",
    optionEs: "España",
    optionCl: "Chile",
    labelWord: "¿Cuál es la palabra?",
    submit: "Enviar propuesta",
    submitting: "Enviando…",
    toastMissingCountry: "Elige si la palabra es de España o de Chile.",
    toastMissingWord: "Escribe la palabra.",
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
    categoriasLabel: "Categorías",
    categoriasClear: "Limpiar",
    tipoFilterLabel: "Tipo gramatical",
    tipoFilterAll: "Todos los tipos",
    rangeLabel: (from, to, total) => `${from}–${to} de ${total} palabras`,
    prevPage: "Anterior",
    nextPage: "Siguiente",
    pageLabel: (page, pageCount) => `Página ${page} de ${pageCount}`,
    emptyState:
      "No encontramos ninguna palabra con esos filtros. Prueba con otra búsqueda o limpia los filtros para ver todo el listado.",
    sinEquivalente: "sin equivalente",
    suggestButton: "Sugerir una palabra",
    dialogTitle: "Sugerir una palabra",
    dialogDescription:
      "¿Cachai alguna palabra que falta? Cuéntanos de qué país es y cuál es la palabra; nosotros completamos el resto.",
    labelCountry: "¿Es de España o de Chile?",
    optionEs: "España",
    optionCl: "Chile",
    labelWord: "¿Cuál es la palabra?",
    submit: "Enviar sugerencia",
    submitting: "Enviando…",
    toastMissingCountry: "Elige si la palabra es de España o de Chile.",
    toastMissingWord: "Escribe la palabra.",
    toastSubmitError: "No pudimos enviar tu sugerencia. Intenta de nuevo más tarde.",
    toastSubmitSuccess: "¡Gracias! La vamos a revisar.",
    toastShareSuccess: "Link copiado",
    toastShareError: "No se pudo copiar el link",
  },
};
