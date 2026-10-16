// Las categorías y tipos gramaticales vienen del contenido real (CSV ->
// Supabase), no de un enum fijo: la lista completa se deriva en runtime de
// las entradas cargadas (ver `vocab-explorer.tsx`).
export type Categoria = string;
export type TipoGramatical = string;

export interface VocabEntry {
  id: string;
  slug: string;
  slang_es: string | null;
  slang_cl: string | null;
  definicion: string;
  categoria: Categoria;
  tipo_gramatical: TipoGramatical;
  created_at?: string;
}
