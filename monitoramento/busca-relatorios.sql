-- Busca Ativa: resumos privados de tentativas concluídas, separados do ranking.
begin;
create schema if not exists jp_reporting;
revoke all on schema jp_reporting from public, anon, authenticated;
create table jp_reporting.busca_reports (
 user_id uuid not null references public.jp_students(user_id) on delete cascade,
 attempt_id uuid not null,
 activity text not null,
 started_at timestamptz not null,
 finished_at timestamptz not null,
 duration_seconds integer not null,
 solved integer not null,
 total integer not null,
 objective_solved integer not null,
 first_try integer not null,
 written integer not null,
 hints integer not null check (hints between 0 and 10000),
 received_at timestamptz not null default now(),
 primary key (user_id, attempt_id),
 check (duration_seconds between 0 and 2678400 and finished_at >= started_at and duration_seconds <= floor(extract(epoch from (finished_at-started_at)))),
 check (total between 1 and 46 and solved between 0 and total and objective_solved between 0 and solved and first_try between 0 and objective_solved and written between 0 and solved and objective_solved + written = solved)
);
alter table jp_reporting.busca_reports enable row level security;
revoke all on jp_reporting.busca_reports from public, anon, authenticated;
create index jp_busca_finished_idx on jp_reporting.busca_reports(finished_at desc,user_id desc,attempt_id desc);
create index jp_busca_mine_idx on jp_reporting.busca_reports(user_id,finished_at desc,attempt_id desc);
create or replace function public.jp_record_busca_report(
 p_attempt_id uuid,p_activity text,p_started_at timestamptz,p_finished_at timestamptz,
 p_duration_seconds integer,p_solved integer,p_total integer,p_objective_solved integer,
 p_first_try integer,p_written integer,p_hints integer)
returns boolean language plpgsql security definer set search_path = ''
as $$
declare v_uid uuid := (select auth.uid()); v_total integer;
begin
 if v_uid is null or not exists(select 1 from public.jp_students s where s.user_id=v_uid and s.active and not coalesce(s.must_change_password,false)) then
  raise exception 'Conta de estudante não autorizada' using errcode='42501';
 end if;
 v_total:=case p_activity when 'busca-ativa-multidisciplinar' then 30 when 'busca-ativa-multidisciplinar-3em' then 30 when 'busca-ativa-multidisciplinar-2em' then 46 when 'busca-ativa-multidisciplinar-8ano' then 32 when 'poesia-contemporanea-ba' then 13 else null end;
 if v_total is null or p_total is distinct from v_total or p_solved is distinct from v_total
  or p_started_at is null or p_finished_at is null or p_attempt_id is null
  or not isfinite(p_started_at) or not isfinite(p_finished_at)
  or p_started_at < timestamptz '2026-11-27 00:00:00+00' or p_finished_at > now()+interval '5 minutes'
  or p_finished_at-p_started_at > interval '31 days' then
  raise exception 'Dados do relatório inválidos' using errcode='22023';
 end if;
 insert into jp_reporting.busca_reports(user_id,attempt_id,activity,started_at,finished_at,duration_seconds,solved,total,objective_solved,first_try,written,hints)
 values(v_uid,p_attempt_id,p_activity,p_started_at,p_finished_at,p_duration_seconds,p_solved,p_total,p_objective_solved,p_first_try,p_written,p_hints)
 on conflict(user_id,attempt_id) do nothing;
 return true;
end $$;
revoke all on function public.jp_record_busca_report(uuid,text,timestamptz,timestamptz,integer,integer,integer,integer,integer,integer,integer) from public, anon;
grant execute on function public.jp_record_busca_report(uuid,text,timestamptz,timestamptz,integer,integer,integer,integer,integer,integer,integer) to authenticated;

create or replace function public.jp_list_busca_reports(
 p_activity text default null,p_class text default null,p_from date default null,p_to date default null,
 p_before timestamptz default null,p_before_user uuid default null,p_before_id uuid default null)
returns table(attempt_id uuid, user_id uuid, student text, class_name text, activity text, started_at timestamptz, finished_at timestamptz, duration_seconds integer, solved integer, total integer, objective_solved integer, first_try integer, written integer, hints integer, received_at timestamptz)
language plpgsql stable security definer set search_path = ''
as $$
declare v_uid uuid := (select auth.uid()); v_admin boolean;
begin
 if v_uid is null then raise exception 'Sessão necessária' using errcode='42501'; end if;
 v_admin:=public.jp_is_admin();
 if not v_admin and not exists(select 1 from public.jp_students s where s.user_id=v_uid and s.active and not coalesce(s.must_change_password,false)) then
  raise exception 'Sessão não autorizada' using errcode='42501';
 end if;
 if (p_before is null) <> (p_before_user is null) or (p_before is null) <> (p_before_id is null) then
  raise exception 'Cursor inválido' using errcode='22023';
 end if;
 return query select r.attempt_id,r.user_id,s.full_name,s.class_name,r.activity,r.started_at,r.finished_at,r.duration_seconds,r.solved,r.total,r.objective_solved,r.first_try,r.written,r.hints,r.received_at
 from jp_reporting.busca_reports r join public.jp_students s on s.user_id=r.user_id
 where (v_admin or r.user_id=v_uid)
 and (p_activity is null or r.activity=p_activity)
 and (p_class is null or s.class_name=p_class)
 and (p_from is null or r.finished_at >= (p_from::timestamp at time zone 'America/Cuiaba'))
 and (p_to is null or r.finished_at < ((p_to+1)::timestamp at time zone 'America/Cuiaba'))
 and (p_before is null or (r.finished_at,r.user_id,r.attempt_id)<(p_before,p_before_user,p_before_id))
 order by r.finished_at desc,r.user_id desc,r.attempt_id desc limit 100;
end $$;
revoke all on function public.jp_list_busca_reports(text,text,date,date,timestamptz,uuid,uuid) from public, anon;
grant execute on function public.jp_list_busca_reports(text,text,date,date,timestamptz,uuid,uuid) to authenticated;
notify pgrst, 'reload schema';
commit;
