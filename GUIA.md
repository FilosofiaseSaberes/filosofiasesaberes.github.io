# Guia — Filosofias e Saberes

Seu periódico trilíngue (PT/ES/EN), acessível e pronto para publicar **de graça**.
Depois de montado, você **não mexe em código** para publicar: escreve num painel e clica em publicar.

- **Fase A**: colocar no ar (uma vez só, umas 2 horas com calma)
- **Fase B**: publicar no dia a dia (minutos, pelo celular se quiser)
- **Extras opcionais**: reações e comentários, aviso por e-mail, domínio próprio

> Sugestão: faça a Fase A num computador. É bem mais confortável para enviar arquivos e
> configurar as telas. Depois disso, o dia a dia funciona bem pelo celular.

---

## Como funciona (em uma frase)

Você escreve no painel → o texto é salvo no seu repositório do GitHub → o site se reconstrói
sozinho → aparece no ar. Tudo em serviços gratuitos.

---

# FASE A — Colocar no ar

### 1. Criar o repositório
Sua conta já existe: **FilosofiaseSaberes**. Falta criar o repositório.

1. Clique em **New repository**.
2. Nome, exatamente: `filosofiasesaberes.github.io`
3. Deixe **público** e clique em **Create repository**.

> Com esse nome, o site ganha o endereço curto `https://filosofiasesaberes.github.io`.
> O projeto já vem configurado para ele.

### 3. Enviar os arquivos
1. **Descompacte o arquivo `.zip`** no seu computador. Você verá uma pasta com `src`, `GUIA.md`,
   `package.json` e outras.
2. No repositório, clique em **Add file → Upload files**.
3. Arraste **o conteúdo de dentro da pasta** (não a pasta em si). Clique em **Commit changes**.

> **Confira uma coisa importante:** depois de enviar, o repositório precisa mostrar uma pasta
> chamada **`.github`**. Ela costuma ficar oculta no computador e às vezes não é enviada, e sem
> ela o site não publica sozinho.
>
> Se ela **não** aparecer, crie-a à mão: **Add file → Create new file**, digite no campo do nome
> exatamente `.github/workflows/deploy.yml` (as barras criam as pastas), cole o conteúdo do
> arquivo `deploy.yml` que está no zip e salve.

### 4. Ligar a publicação automática (GitHub Pages)
1. No repositório: **Settings → Pages**.
2. Em **Source**, escolha **GitHub Actions**.
3. Seu endereço será `https://filosofiasesaberes.github.io`.

Acompanhe a construção na aba **Actions**. A primeira leva 1 a 2 minutos. Se não iniciar
sozinha, abra **Actions → Publicar site → Run workflow**.

> O site se ajusta sozinho ao endereço, esteja ele na raiz do domínio ou dentro de uma pasta.
> Você não precisa configurar nada para isso.

### 5. Conferir seus dados (já vêm preenchidos)
Nada a fazer aqui, mas vale saber onde ficam:

- **`src/_data/site.js`** → `url`: já é `https://filosofiasesaberes.github.io`
- **`src/admin/config.yml`** → `repo`: já é `FilosofiaseSaberes/filosofiasesaberes.github.io`
- **`src/_data/pages.js`** → e-mail de contato: já é `filosofiasesaberes@gmail.com`, nos três idiomas

### 6. Ligar o painel de publicação
O painel precisa de uma "chave de acesso" gratuita para conversar com o GitHub. É a etapa mais
técnica, mas é **uma vez só**:

1. Crie conta gratuita na **Cloudflare** (cloudflare.com).
2. Publique o autenticador oficial do Sveltia seguindo o passo a passo do repositório
   **https://github.com/sveltia/sveltia-cms-auth** (ele tem um botão de *Deploy*).
3. No caminho você criará um **GitHub OAuth App**
   (GitHub → Settings → Developer settings → OAuth Apps) e colará duas chaves na Cloudflare.
4. Copie o endereço final (algo como `https://xxxx.workers.dev`) e cole em
   `src/admin/config.yml`, na linha `base_url:`.

> Reserve uns 30 minutos com calma. Depois disso, nunca mais.

### 7. Testar e limpar os exemplos
1. Acesse `https://filosofiasesaberes.github.io/admin`, entre com o GitHub e publique um texto de teste.
2. **Apague as publicações de exemplo** que vieram no projeto: no painel, exclua as que falam de
   Bergson, Clarice, Sankofa e cadernos de campo. (Se preferir pelo GitHub: apague os arquivos da
   pasta `src/posts/` e o arquivo `src/uploads/exemplo.pdf`.)

---

# FASE B — Publicar no dia a dia

1. Acesse **`https://filosofiasesaberes.github.io/admin`** (funciona no celular).
2. **Publicações → Nova**.
3. Preencha: título, **idioma**, **seção** (Ensaios / Acadêmico / Pessoal), **formato**
   (Texto / PDF / Vídeo / Imagens), resumo e conteúdo.
4. Conforme o formato:
   - **PDF**: anexe o arquivo no campo *Arquivo PDF*.
   - **Vídeo**: cole o link de incorporação e, por favor, a **transcrição**.
   - **Imagens**: preencha a **descrição** de cada foto (é o que a pessoa cega ouve no leitor de tela).
   - **Acadêmico**: preencha a **Referência (ABNT)**.
5. **Publicar**. Em cerca de 1 minuto o site se atualiza sozinho.

### Publicar em vários idiomas
Cada publicação tem **um idioma**. Para a mesma matéria em PT, ES e EN, crie três publicações.
O site separa as versões em `/`, `/es/` e `/en/`.

---

# EXTRAS OPCIONAIS

## 1. Reações e comentários (gratuito)

As publicações têm **reações** (Sol, Onda, Árvore, Lua, Coração) e **comentários com aprovação**
(nada aparece até você aprovar). Para funcionarem de verdade:

1. Siga `cloudflare-worker/LEIA-ME.md` (uns 15 minutos). Você criará um Worker, um armazenamento
   **STORE** e uma senha **ADMIN_TOKEN**.
2. Cole a URL do Worker em `src/_data/site.js`, campo **`apiUrl`**.

**Moderar:** abra `https://filosofiasesaberes.github.io/moderacao/`, informe a URL e a senha uma vez, e aprove ou recuse os
pendentes. Cada comentário pode trazer nome e uma *identificação voluntária* (pronomes,
território, coletividade: livre e opcional).

Enquanto `apiUrl` estiver vazio, nada quebra: as reações contam só no navegador de quem lê e o
formulário mostra um aviso de "em breve".

**Trocar as reações:** edite `src/_data/reactions.js` e a lista de chaves no topo de
`cloudflare-worker/worker.js` (as duas precisam combinar).

## 2. Aviso por e-mail de novos posts (gratuito)

O site já traz o que um serviço de newsletter precisa: um **feed RSS** e um **botão de assinatura**.

1. Crie conta gratuita num serviço com envio automático por RSS: **MailerLite**, **beehiiv** ou
   **Buttondown**. (Confira os limites atuais do plano grátis na página de preços de cada um.)
2. No serviço, ative o envio por RSS (procure "RSS campaign", "RSS-to-Send" ou "RSS automation")
   e informe: `https://filosofiasesaberes.github.io/feed.xml`
   (há também `/es/feed.xml` e `/en/feed.xml`, se quiser listas por idioma).
3. Copie o link da página de assinatura que o serviço fornece e cole em `src/_data/site.js`,
   campo **`newsletterUrl`**.

O descadastro e o consentimento ficam por conta do serviço, como a lei exige. Enquanto
`newsletterUrl` estiver vazio, o bloco mostra um aviso discreto de "em breve".

## 3. Domínio próprio

O endereço `github.io` já vem com **HTTPS** e é suficiente para começar. Se um dia quiser um nome
próprio, tipo `filosofiasesaberes.com.br`:

1. **Compre o domínio** numa registradora (Registro.br para `.com.br`; Namecheap, Cloudflare e
   outras para `.com`). Cerca de **R$ 40 a R$ 70 por ano**. A hospedagem continua gratuita.
2. **Aponte para o GitHub Pages:** em **Settings → Pages → Custom domain**, digite o domínio,
   salve e marque **Enforce HTTPS**. Na registradora, crie os registros de DNS que o GitHub
   indicar naquela tela (um **CNAME** para `www` e os **registros A** para o domínio raiz).
3. **Atualize dois lugares:** o campo `url` em `src/_data/site.js` (para o novo domínio) e, se
   estiver usando reações/comentários, o `ALLOW_ORIGIN` no topo de `cloudflare-worker/worker.js`.

Pode levar de minutos a algumas horas para propagar. O site é o mesmo, só muda a porta de entrada.

---

# Personalizar

- **Cores**: `src/assets/css/style.css`, bloco `:root` (no topo).
- **Textos fixos dos 3 idiomas** (rótulos, chamada, rodapé): `src/_data/i18n.js`.
- **Seções**: `src/_data/site.js`, campo `categories`. Comece com poucas.
- **Páginas Sobre, Acessibilidade e Contato**: `src/_data/pages.js`.
- **Reações**: `src/_data/reactions.js`.

---

# Acessibilidade (já vem pronto)

- **Cegueira e baixa visão**: estrutura para leitores de tela, atalho "pular para o conteúdo",
  foco visível, descrição obrigatória nas imagens, ajuste de **tamanho do texto** e **fonte
  legível** (Atkinson Hyperlegible).
- **Surdez**: campo de transcrição para vídeos.
- **Daltonismo**: seções e formatos usam **ícone + forma + texto**, nunca só cor. Há **alto contraste**.
- **Sensibilidade a movimento**: botão para reduzir animações; o site também respeita a
  preferência do sistema.
- **Linguagem inclusiva** nos textos padrão.

As preferências ficam salvas no navegador de cada pessoa.

---

# Conferir antes de divulgar

- [ ] A pasta `.github` aparece no repositório
- [ ] A aba **Actions** mostra a publicação concluída
- [ ] O site abre **com cores e estilo** (se abrir "sem formatação", houve erro no envio)
- [ ] A página de Contato mostra o e-mail correto
- [ ] As publicações de exemplo foram apagadas
- [ ] Testado no celular e no computador

---

# Rodar no seu computador (opcional)

Só se quiser pré-visualizar antes de publicar: instale o Node.js e, nesta pasta, rode
`npm install` e depois `npm start`. Nada disso é necessário no uso normal, o GitHub faz tudo.
