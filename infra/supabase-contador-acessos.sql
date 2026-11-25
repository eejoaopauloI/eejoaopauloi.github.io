-- JP Recomposição: contador agregado de acessos (Supabase / PostgreSQL)
-- Execute no SQL Editor de um projeto Supabase controlado pela escola.
-- Não armazena nome, turma, respostas, endereço IP nem histórico de navegação.
-- O identificador aleatório do navegador é pseudônimo e não comprova identidade.
create schema if not exists jp_privado;
revoke all on schema jp_privado from public, anon, authenticated;

create table if not exists jp_privado.acessos_atividades (
  atividade text not null check (atividade in (
    'balanca-equacoes','circuito-tabuada','areas-malha','inteiros-desafios',
    'inteiros-laboratorio','palavras-vivas','detetives-texto','versos-em-movimento','busca-ativa-multidisciplinar','busca-ativa-multidisciplinar-3em','busca-ativa-multidisciplinar-2em','busca-ativa-multidisciplinar-8ano'
  )),
  navegador uuid not null,
  acessos integer not null default 1 check (acessos > 0),
  primeiro_acesso timestamptz not null default now(),
  ultimo_acesso timestamptz not null default now(),
  primary key (atividade,navegador)
);
revoke all on jp_privado.acessos_atividades from public, anon, authenticated;

create or replace function public.jp_registrar_acesso(p_atividade text,p_navegador uuid)
returns void
language plpgsql security definer set search_path=''
as $$
begin
  if p_navegador is null or p_atividade not in (
    'balanca-equacoes','circuito-tabuada','areas-malha','inteiros-desafios',
    'inteiros-laboratorio','palavras-vivas','detetives-texto','versos-em-movimento','busca-ativa-multidisciplinar','busca-ativa-multidisciplinar-3em','busca-ativa-multidisciplinar-2em','busca-ativa-multidisciplinar-8ano'
  ) then
    raise exception 'Identificador ou atividade inválidos.';
  end if;

  insert into jp_privado.acessos_atividades (atividade,navegador)
  values (p_atividade,p_navegador)
  on conflict (atividade,navegador) do update
    set acessos=jp_privado.acessos_atividades.acessos + 1,
        ultimo_acesso=now();
end;
$$;

create or replace function public.jp_estatisticas_acessos()
returns table (atividade text,navegadores_distintos bigint,acessos_totais bigint)
language sql security definer stable set search_path=''
as $$
  select a.atividade,
         count(*)::bigint as navegadores_distintos,
         coalesce(sum(a.acessos),0)::bigint as acessos_totais
  from jp_privado.acessos_atividades a
  group by a.atividade
  order by a.atividade;
$$;

revoke all on function public.jp_registrar_acesso(text,uuid) from public;
revoke all on function public.jp_estatisticas_acessos() from public;
grant execute on function public.jp_registrar_acesso(text,uuid) to anon;
grant execute on function public.jp_estatisticas_acessos() to anon;

-- A função pública devolve apenas valores agregados.
-- O número de navegadores distintos não equivale a estudantes únicos.
-- Para aplicação institucional, revisar a finalidade, a transparência e a LGPD.
-- Recomendação: habilitar proteção contra abuso/rate limiting no gateway.
