# Vocabulario Slang 🇪🇸🇨🇱 — España vs Chile

Landing con una tabla filtrable/ordenable de coloquialismos entre España y
Chile. Next.js (App Router) + Tailwind + shadcn/ui, con el contenido servido
desde Supabase.

## Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el proyecto de Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. En el **SQL Editor**, corré en orden:
   - `supabase/migrations/0001_vocabulario.sql`
   - `supabase/migrations/0002_suggestions.sql`
   - `supabase/seed.sql` (dataset de ejemplo, opcional pero recomendado para
     probar la UI antes de cargar el contenido real)
3. En **Settings > API**, copiá la `Project URL` y la `anon public` key.

### 3. Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores de Supabase:

```bash
cp .env.example .env.local
```

Sin estas variables, la página funciona igual mostrando un dataset de
ejemplo local (ver `lib/sample-data.ts`) para poder previsualizar la UI.

### 4. Correr en local

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Cargar el contenido real

El vocabulario vive en la tabla `vocabulario` de Supabase — no hace falta
tocar código para agregar, editar o borrar palabras:

- Vía dashboard: **Table Editor > vocabulario**.
- Vía SQL: insertando filas con el mismo formato que `supabase/seed.sql`
  (`slang_es` y `slang_cl` son nullable — dejalo en `null` cuando el
  coloquialismo no tiene equivalente directo del otro lado).

Los cambios se reflejan en la página en un máximo de 60 segundos (ISR) sin
necesidad de redeploy.

Las sugerencias que manda la gente desde el botón "Sugerir una palabra"
llegan a la tabla `suggestions` con `status = 'pending'`. Para aprobar una,
copiá sus datos a una fila nueva en `vocabulario` (o armá una función/trigger
que lo automatice más adelante).

## Deploy en Vercel

1. Pusheá el repo a GitHub.
2. Importalo en [vercel.com/new](https://vercel.com/new).
3. Cargá las mismas variables de `.env.local` en **Settings > Environment
   Variables** del proyecto en Vercel.
4. Deploy.

## Estructura relevante

- `app/page.tsx` — trae el vocabulario desde Supabase (o el fallback local)
  y renderiza la landing.
- `components/vocab-explorer.tsx` — estado de búsqueda/filtros/orden/país.
- `components/vocab-table.tsx` — tabla (desktop) / tarjetas (mobile).
- `components/suggest-word-dialog.tsx` — formulario de sugerencias.
- `hooks/use-favorites.ts`, `hooks/use-country.ts` — preferencias en
  localStorage.
- `supabase/migrations/`, `supabase/seed.sql` — schema y dataset de ejemplo.
