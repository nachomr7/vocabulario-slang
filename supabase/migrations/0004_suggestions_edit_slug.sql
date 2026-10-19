-- Permite usar la misma tabla `suggestions` para proponer correcciones a
-- una palabra existente, no solo palabras nuevas. Cuando `edit_slug` tiene
-- valor, la sugerencia es una corrección a ese `vocabulario.slug` y el
-- feedback de la persona queda en `definicion` (texto libre); cuando es
-- null, es una palabra nueva como ya funcionaba.
alter table suggestions add column if not exists edit_slug text;
