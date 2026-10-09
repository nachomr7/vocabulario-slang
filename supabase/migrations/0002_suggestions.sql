-- Tabla de sugerencias de palabras nuevas, enviadas desde el formulario público.
create table if not exists suggestions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slang_es text,
  slang_cl text,
  definicion text not null,
  categoria text,
  email text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'))
);

alter table suggestions enable row level security;

-- Solo inserción anónima permitida; la lectura/edición se hace desde el
-- dashboard de Supabase (o con la service role key) al moderar sugerencias.
create policy "allow anonymous insert" on suggestions
  for insert
  to anon
  with check (true);
