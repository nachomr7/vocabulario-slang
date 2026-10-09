-- Tabla principal del vocabulario cruzado España <-> Chile.
create table if not exists vocabulario (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  slang_es text,
  slang_cl text,
  definicion text not null,
  categoria text not null,
  tipo_gramatical text not null,
  created_at timestamptz not null default now(),
  constraint vocabulario_slang_check check (slang_es is not null or slang_cl is not null)
);

create index if not exists vocabulario_categoria_idx on vocabulario (categoria);
create index if not exists vocabulario_tipo_gramatical_idx on vocabulario (tipo_gramatical);

alter table vocabulario enable row level security;

create policy "public read access" on vocabulario
  for select
  to anon, authenticated
  using (true);

-- Sin policies de insert/update/delete: el contenido se administra
-- directamente desde el dashboard de Supabase (o con la service role key).
