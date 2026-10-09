import { createClient } from "@supabase/supabase-js";
import type { VocabEntry } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function getVocabulario(): Promise<VocabEntry[]> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("vocabulario")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`No se pudo cargar el vocabulario: ${error.message}`);
  }

  return (data ?? []) as VocabEntry[];
}
