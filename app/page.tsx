import { Suspense } from "react";
import { VocabExplorer } from "@/components/vocab-explorer";
import { getVocabulario } from "@/lib/supabase/server";
import { SAMPLE_VOCABULARIO } from "@/lib/sample-data";

// Revalida el listado cada 60s (ISR), así el contenido editado en el
// dashboard de Supabase se refleja sin necesitar un redeploy. Next.js
// analiza este export de forma estática: debe ser un literal, no una
// constante importada.
export const revalidate = 60;

export default async function Home() {
  const isSupabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const entries = isSupabaseConfigured
    ? await getVocabulario()
    : SAMPLE_VOCABULARIO;

  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:py-16">
      {!isSupabaseConfigured && (
        <p className="mb-6 rounded-lg border border-dashed border-border px-4 py-3 text-center text-sm text-muted-foreground [&_code]:rounded-sm [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-foreground">
          Mostrando datos de ejemplo. Definí{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en <code>.env.local</code>{" "}
          (ver <code>.env.example</code>) y corré las migrations de{" "}
          <code>supabase/migrations</code> para usar el listado real.
        </p>
      )}
      <Suspense>
        <VocabExplorer entries={entries} />
      </Suspense>
    </main>
  );
}
