-- El formulario de sugerencias ahora solo pide país + palabra; el resto
-- (definición, categoría, tipo gramatical) lo completa el equipo al
-- revisar la sugerencia antes de sumarla a `vocabulario`.
alter table suggestions alter column definicion drop not null;
