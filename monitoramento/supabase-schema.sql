-- JP Analytics v1 | Execute no SQL Editor do Supabase, em projeto da escola.
-- Não cole credenciais administrativas ou dados pessoais no repositório.
create extension if not exists pgcrypto;

create table if not exists public.jp_admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
create table if not exists public.jp_students (
 user_id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null check (char_length(full_name) between 2 and 120),
 class_name text not null check (char_length(class_name) between 1 and 40),
 public_alias text unique not null check (public_alias ~ '^[A-Za-z0-9_-]{4,22}$'),
 public_opt_in boolean not null default false,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table if not exists public.jp_learning_submissions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.jp_students(user_id) on delete cascade,
 activity text not null check (activity ~ '^[a-z0-9-]{3,70}$'),
 score integer not null check (score between 0 and 500),
 solved integer not null check (solved between 0 and 100),
 question_total integer not null check (question_total between 1 and 100),
 extra_attempts integer not null default 0 check (extra_attempts between 0 and 10000),
 hints integer not null default 0 check (hints between 0 and 10000),
 verified boolean not null default false,
 created_at timestamptz not null default now(),
 constraint jp_solved_valid check (solved<=question_total),
 unique(user_id,activity)
);
create table if not exists public.jp_student_visits (
 user_id uuid not null references public.jp_students(user_id) on delete cascade,
 activity text not null check (activity ~ '^[a-z0-9-]{3,70}$'),
 visit_day date not null default current_date,
 first_seen timestamptz not null default now(),
 last_seen timestamptz not null default now(),
 views integer not null default 1,
 primary key(user_id,activity,visit_day)
);
create index if not exists jp_learning_submissions_user on public.jp_learning_submissions(user_id);
create index if not exists jp_learning_submissions_verified on public.jp_learning_submissions(verified);
create index if not exists jp_student_visits_day on public.jp_student_visits(visit_day);

alter table public.jp_admins enable row level security;
alter table public.jp_students enable row level security;
alter table public.jp_learning_submissions enable row level security;
alter table public.jp_student_visits enable row level security;
revoke all on public.jp_admins,public.jp_students,public.jp_learning_submissions,public.jp_student_visits from anon,authenticated;
-- Acesso exclusivamente pelas funções abaixo, com checagem de auth.uid() e perfil.
create or replace function public.jp_is_admin()
returns boolean language sql stable security definer set search_path = public, pg_temp
as $$select exists(select 1 from public.jp_admins where user_id=(select auth.uid()))$$;
revoke all on function public.jp_is_admin() from public;
grant execute on function public.jp_is_admin() to authenticated;

create or replace function public.jp_my_profile()
returns jsonb language sql stable security definer set search_path=public,pg_temp
as $$
select case when (select auth.uid()) is null then null
 when (select public.jp_is_admin()) then jsonb_build_object('role','admin')
 else (select jsonb_build_object('role','student','name',full_name,'class_name',class_name,'alias',public_alias,'public_opt_in',public_opt_in)
       from public.jp_students where user_id=(select auth.uid()) and active)
 end
$$;
revoke all on function public.jp_my_profile() from public;
grant execute on function public.jp_my_profile() to authenticated;

create or replace function public.jp_log_visit(p_activity text)
returns void language plpgsql security definer set search_path=public,pg_temp
as $$
begin
 if auth.uid() is null or not exists(select 1 from public.jp_students where user_id=auth.uid() and active) then
  raise exception 'Acesso do estudante não autorizado';
 end if;
 if p_activity !~ '^[a-z0-9-]{3,70}$' then raise exception 'Atividade inválida';end if;
 insert into public.jp_student_visits(user_id,activity) values(auth.uid(),p_activity)
 on conflict(user_id,activity,visit_day)
 do update set views=public.jp_student_visits.views+1,last_seen=now();
end$$;
revoke all on function public.jp_log_visit(text) from public;
grant execute on function public.jp_log_visit(text) to authenticated;

-- Submissões recebidas são NÃO VERIFICADAS. Pontuação jamais publicada automaticamente.
create or replace function public.jp_submit_learning(
 p_activity text,p_score integer,p_solved integer,p_total integer,
 p_extra_attempts integer default 0,p_hints integer default 0)
returns void language plpgsql security definer set search_path=public,pg_temp
as $$
begin
 if auth.uid() is null or not exists(select 1 from public.jp_students where user_id=auth.uid() and active) then
  raise exception 'Estudante não autorizado';
 end if;
 if p_activity !~ '^[a-z0-9-]{3,70}$' or
    p_activity not in ('missao-decimal') or
    p_score not between 0 and 500 or p_total not between 1 and 100 or
    p_solved not between 0 and p_total or
    p_extra_attempts not between 0 and 10000 or p_hints not between 0 and 10000 then
  raise exception 'Dados de aprendizagem inválidos';
 end if;
 insert into public.jp_learning_submissions(user_id,activity,score,solved,question_total,extra_attempts,hints)
 values(auth.uid(),p_activity,p_score,p_solved,p_total,p_extra_attempts,p_hints)
 on conflict(user_id,activity) do update set
 score=excluded.score,solved=excluded.solved,question_total=excluded.question_total,
 extra_attempts=excluded.extra_attempts,hints=excluded.hints,
 verified=false,created_at=now();
end$$;
revoke all on function public.jp_submit_learning(text,integer,integer,integer,integer,integer) from public;
grant execute on function public.jp_submit_learning(text,integer,integer,integer,integer,integer) to authenticated;

-- Pública: somente ALIAS e PONTUAÇÃO validada. Nenhum nome real.
create or replace function public.jp_public_ranking()
returns table(alias text,total_jps bigint,activities bigint)
language sql stable security definer set search_path=public,pg_temp
as $$
select s.public_alias::text,sum(l.score)::bigint,count(*)::bigint
from public.jp_students s join public.jp_learning_submissions l on l.user_id=s.user_id
where s.active and s.public_opt_in and l.verified
group by s.user_id,s.public_alias
order by sum(l.score) desc,count(*) desc,s.public_alias
limit 100
$$;
revoke all on function public.jp_public_ranking() from public;
grant execute on function public.jp_public_ranking() to anon,authenticated;

-- Admin: todos os nomes reais, resultados e resumo de acesso apenas sob autenticação.
create or replace function public.jp_admin_overview()
returns jsonb language plpgsql stable security definer set search_path=public,pg_temp
as $$
declare v jsonb;
begin
 if not (select public.jp_is_admin()) then raise exception 'Acesso restrito à coordenação';end if;
 select jsonb_build_object(
 'students',(select count(*) from public.jp_students where active),
 'views',(select coalesce(sum(views),0) from public.jp_student_visits),
 'distinct_visitors',(select count(distinct user_id) from public.jp_student_visits),
 'submissions',(select count(*) from public.jp_learning_submissions),
 'students_detail',(select coalesce(jsonb_agg(to_jsonb(t) order by t.full_name),'[]'::jsonb)
   from (select s.user_id,s.full_name,s.class_name,s.public_alias,s.public_opt_in,s.active,
     coalesce((select sum(v.views) from public.jp_student_visits v where v.user_id=s.user_id),0) as accesses,
     coalesce((select sum(l.score) from public.jp_learning_submissions l where l.user_id=s.user_id and l.verified),0) as verified_jps
     from public.jp_students s) t),
 'activities',(select coalesce(jsonb_agg(to_jsonb(x) order by x.created_at desc),'[]'::jsonb)
   from (select l.id,l.user_id,s.full_name,s.class_name,l.activity,l.score,l.solved,l.question_total,
    l.extra_attempts,l.hints,l.verified,l.created_at
   from public.jp_learning_submissions l join public.jp_students s on s.user_id=l.user_id) x),
 'daily_views',(select coalesce(jsonb_agg(to_jsonb(d) order by d.visit_day),'[]'::jsonb)
  from (select visit_day,sum(views) as views,count(distinct user_id) as students
  from public.jp_student_visits group by visit_day order by visit_day desc limit 30) d)
 ) into v;
 return v;
end$$;
revoke all on function public.jp_admin_overview() from public;
grant execute on function public.jp_admin_overview() to authenticated;

create or replace function public.jp_admin_verify(p_id uuid,p_verified boolean)
returns void language plpgsql security definer set search_path=public,pg_temp
as $$
begin
 if not (select public.jp_is_admin()) then raise exception 'Acesso restrito';end if;
 update public.jp_learning_submissions set verified=p_verified where id=p_id;
 if not found then raise exception 'Registro não encontrado';end if;
end$$;
revoke all on function public.jp_admin_verify(uuid,boolean) from public;
grant execute on function public.jp_admin_verify(uuid,boolean) to authenticated;

-- Após criar contas no Authentication > Users, associe o UUID pela área SQL.
-- Exemplo (NÃO substitua por dados reais neste arquivo):
-- insert into public.jp_admins(user_id) values ('UUID_DA_CONTA_DA_COORDENACAO');
-- insert into public.jp_students(user_id,full_name,class_name,public_alias,public_opt_in)
-- values ('UUID_DA_CONTA_DO_ESTUDANTE','Nome completo','7º A','JP-0001',false);
-- Altere public_opt_in para true SOMENTE após a autorização institucional.
