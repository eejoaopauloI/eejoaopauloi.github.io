# Contador agregado de acessos às atividades — JP Recomposição

A interface do painel está em `/acessos-atividades.html`. Os scripts já foram incluídos nas oito atividades.

## O que é contabilizado
- **Acessos totais:** aberturas de página com registro aceito pelo serviço central.
- **Navegadores distintos por atividade:** aparelhos/perfis de navegador com um identificador aleatório persistido localmente.
- Não equivale a estudantes únicos; a mesma pessoa pode usar aparelhos diferentes e vários alunos podem compartilhar um navegador.
- Não registra nome, turma, conteúdo pesquisado, respostas, URL de destino nem frequência escolar.
- A atividade apresenta um aviso e permite ao visitante optar por não participar da contagem.

## Como ativar (precisa de autorização e conta institucional)

1. Criar ou selecionar um projeto no [Supabase](https://supabase.com/dashboard), sob controle institucional.
2. Abrir **SQL Editor** e executar `infra/supabase-contador-acessos.sql`. Conferir políticas de privacidade, condições de uso com menores e limitação de requisições antes de publicar.
3. Em **Project Settings → API Keys / Data API**, copiar a **Project URL** `https://...supabase.co` e a chave **publishable** `sb_publishable_...` (ou a antiga **anon**).
4. Preencher exclusivamente a URL e a chave pública em `assets/contador-config.js`, no repositório `eejoaopauloI/eejoaopauloi.github.io`. **Jamais colocar chaves secretas, service_role ou senhas no GitHub.**
5. Abrir uma atividade em dois navegadores para testar; voltar à página e observar os indicadores. Depois visitar `/acessos-atividades.html` e usar **Atualizar contagem**.

**Importante:** até preencher as configurações, o painel indica que a conexão está pendente. Não exibe números fictícios. A contagem começa na ativação, não recupera acessos anteriores. Este contador não substitui identificação institucional de participantes.

## Segurança e cautelas
- A tabela com identificadores está no schema não exposto `jp_privado`; o navegador chama apenas duas funções públicas limitadas a registrar acessos e devolver valores agregados.
- Identificadores aleatórios persistidos ainda podem ser considerados dados pseudonimizados; a escola deve validar a base legal, a transparência e a retenção dos dados sob a LGPD.
- Como os acessos são anônimos e a gravação é pública, é possível gerar acessos artificiais. É necessário configurar mitigação de abuso/rate limiting no serviço de API. Não utilizar os números como prova de participação individual.
- O painel de acessos é público. Não contém nomes nem relatórios individualizados; se a escola quiser um painel restrito, será necessário autenticação e permissões de acesso.
