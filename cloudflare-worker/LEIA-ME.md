# Guardador do site (Cloudflare Worker) — reações + comentários

Faz as **reações** e os **comentários (com aprovação)** funcionarem de verdade. É gratuito.

## O que você vai criar (uma vez)
- 1 Worker (com o código de `worker.js`)
- 1 KV Namespace chamado **STORE** (onde tudo fica guardado)
- 1 segredo **ADMIN_TOKEN** (sua senha para aprovar comentários)

## Passos
1. Cloudflare → **Workers & Pages → Create → Worker**. Nome ex.: `filosofias-saberes`. Create.
2. **Edit code**: apague o exemplo, cole o conteúdo de `worker.js`, **Deploy**.
3. **Storage & Databases → KV → Create namespace**, nome **STORE**.
4. No Worker → **Settings → Variables & Bindings → KV Namespace Bindings → Add**:
   Variable name: `STORE` · KV namespace: o que você criou. **Save**.
5. No Worker → **Settings → Variables → Secrets → Add**:
   Name: `ADMIN_TOKEN` · Value: uma senha forte (guarde-a). **Save**.
6. (Recomendado) No topo do `worker.js`, troque `ALLOW_ORIGIN` pela URL do seu site.
7. Copie a URL do Worker (ex.: `https://filosofias-saberes.SUA-CONTA.workers.dev`) e cole em
   `src/_data/site.js`, no campo **`apiUrl`**.

## Como moderar
Abra `SEU-SITE/moderacao/` (ex.: `.../filosofias-e-saberes/moderacao/`), informe a URL do Worker
e a senha (`ADMIN_TOKEN`) uma vez, e clique em **Carregar pendentes**. Aprove ou recuse.

Enquanto `apiUrl` estiver vazio: reações funcionam em modo local e o formulário de comentários
fica desativado com um aviso gentil. Nada quebra.
