# JP Analytics — implantação controlada (v1)

## Estado
Código das páginas, funções SQL e integração da Missão Decimal publicado no repositório.
**Banco criado em 26/11/2026:** projeto `Portal JP Analytics` (`irpmwevuoddeypljubmf`) na região `sa-east-1`. O arquivo `assets/contador-config.js` já aponta para o projeto usando somente a chave publicável.
A ausência de Supabase não impede o uso das trilhas existentes.

## Separação de acesso
- A coordenação, após autenticação, acessa nome real, turma, acessos e resultados pendentes/validados.
- Estudantes recebem acesso somente ao próprio perfil.
- O público só recebe `public_alias`, somatório JP validado e número de atividades, via `jp_public_ranking`.
- `public_opt_in=false` por padrão. Não ative sem autorização institucional e avaliação LGPD.
- Rankings são atividades **formativas**, não equivalem a nota, frequência ou prova oficial.
- O envio de resultados pelo navegador não é prova de autoria: toda pontuação chega **não validada** e requer checagem docente.

## Configuração necessária por responsável autorizado
1. **CONCLUÍDO:** projeto Supabase criado em São Paulo (Brasil). Revisar políticas de retenção e ativar MFA dos administradores.
2. **CONCLUÍDO:** esquema SQL instalado; funções administrativas não podem ser executadas por `anon`, e o ranking público só expõe alias. Revisar permissões e conduzir testes com contas reais antes da produção.
3. Em Authentication > Users, cadastrar contas institucionais dos servidores e estudantes. Desabilitar self-signup público; utilizar senhas individuais temporárias, sem compartilhamento e com procedimento de redefinição.
4. No SQL Editor, associar `auth.users.id` dos gestores em `jp_admins` e estudantes em `jp_students`, usando apelidos únicos e `public_opt_in=false`. Dados pessoais devem ser inseridos apenas no banco protegido, nunca no repositório.
5. **CONCLUÍDO:** `assets/contador-config.js` configurado com URL e chave publicável; sem credenciais administrativas. 
6. Abrir `monitoramento/` e entrar com conta de teste. Testar estudante autorizado, estudante sem cadastro, gestão e usuário anônimo; confirmar que nenhum nome real aparece em `ranking.html`.
7. Solicitar envio em `Missão Decimal` depois de login; validar uma pontuação com conferência docente no painel e habilitar individualmente `public_opt_in` apenas quando autorizado.
8. Verificar políticas institucionais de LGPD, comunicação às famílias, direitos dos titulares, retenção de dados e eventual termo/aviso de privacidade. Não coletar data de nascimento, CPF, endereço ou outros dados não necessários.

## Acesso
- `/monitoramento/`: página de autenticação, área do estudante e painel da coordenação conforme perfil.
- `/ranking.html`: ranking público de apelidos aprovados.
- `/atividades/missao-decimal.html`: primeiro piloto de sincronização voluntária de resultados.

## Limites conhecidos desta versão
- O contador anônimo antigo em `assets/contador-acessos.js` usa RPCs independentes ainda não instaladas; o JP Analytics v1 registra visitas **autenticadas à Missão Decimal**.
- As outras trilhas ainda não enviam resultados automaticamente; a expansão exige integração e normalização da pontuação em cada atividade.
- Resultados armazenados antes da ativação permanecem locais; não são recuperados automaticamente.
- Tokens de sessão ficam no `sessionStorage` da aba; ao fechar, novo login poderá ser necessário.
- Pontuações vindas do navegador podem ser adulteradas; conferência humana é exigida antes de aprovar e divulgar qualquer pontuação.
- Ainda não há conta de usuário, banco ou informação real carregada por esta instalação.
- A rotina de importação de estudantes em lote e fluxo de consentimento institucional ainda precisam ser desenvolvidos.

## Atualização — autenticação por matrícula (26/11/2026)
- Planilha de origem conferida localmente: 216 matrículas distintas de 7 algarismos, 9 turmas.
- O CSV de importação é **privado** e contém só `matricula;nome;turma`. Nunca fazer commit desse arquivo em repositório público.
- O aluno entra com `e` + 7 dígitos (por exemplo `e1234567`). O servidor cria o identificador interno de autenticação sem expor e-mail real de aluno.
- A função `jp-provision-students` exige JWT de uma conta constante em `jp_admins`, processa até 20 registros por chamada, gera senhas aleatórias fortes e mantém `public_opt_in=false`.
- A interface autenticada fornece um CSV sensível de credenciais **apenas no ato da importação**. Guardar em dispositivo institucional restrito e distribuir individualmente.
- A função `jp-change-student-password` altera a senha via sessão autenticada e só depois marca `must_change_password=false`.
- `jp_log_visit` e `jp_submit_learning` recusam estudantes ainda obrigados a trocar senha.
- Teste funcional completo com conta piloto e fluxo de cadastro ainda **pendente**. Não importar os 216 estudantes nem enviar credenciais antes dos testes e autorização de proteção de dados.
- As funções de backend estão implantadas, mas o usuário deve testar na página publicada antes da distribuição.
- Recomendação: habilitar proteção contra senhas comprometidas em Auth > Security; revisar avisos de segurança de funções `SECURITY DEFINER`.
