# Site da psicóloga Vanderleia Soares

One-page em HTML, CSS e JS puros com Tailwind via CDN. Não precisa de build.
Template-base: **Clean/Minimalista**, na paleta verde do site Wix original (`#275C50`, `#016F55`, `#BBDAD5`, `#F9FDFF`).

## Estrutura

```
.
├── index.html            # página única (âncoras, SEO, Open Graph, JSON-LD)
├── css/style.css         # estilos complementares ao Tailwind
├── js/
│   ├── config.js         # WhatsApp, mensagens por seção, IDs de Analytics/Pixel
│   ├── reviews-data.js   # avaliações reais do Google
│   └── main.js           # CTAs, menu, scroll-reveal, avaliações, analytics
├── assets/
│   ├── favicon.ico, favicon-32.png, apple-touch-icon.png   # monograma "VS" provisório
│   ├── og-image.jpg      # preview para WhatsApp/Instagram (1200x630)
│   └── img/              # fotos da Vanderleia e do consultório (do site Wix), em WebP
└── README.md
```

## Rodar localmente

```bash
python -m http.server 8123
```

Abra http://localhost:8123. Abrir o `index.html` direto também funciona.

## Antes de publicar

1. **Domínio:** troque `https://SEU-DOMINIO.com.br` no `index.html` (canonical, `og:url`, `og:image`) pelo domínio real. O preview do WhatsApp exige URL absoluta.
2. **Analytics:** preencha `gaId` (Google Analytics 4) e/ou `metaPixelId` em `js/config.js`. Cada clique em WhatsApp dispara o evento `whatsapp_click` com a seção.
3. **Logo e favicon:** a cliente não tem logotipo no Wix nem no Instagram. O cabeçalho e o rodapé usam o nome em texto, e o favicon é um monograma "VS" provisório. Quando houver logo, troque no cabeçalho/rodapé e gere o favicon a partir dele.
4. **Planos:** os valores não existem no site original e ficam como "sob consulta". Para incluir preços, edite a seção `#planos` no `index.html`.

## Editar conteúdo

- **Mensagens do WhatsApp:** `js/config.js`, objeto `messages`. Cada botão usa `data-wa="chave"`.
- **Avaliações:** `js/reviews-data.js` (até 6 são exibidas).

## Deploy

Site estático, qualquer hospedagem serve.

- **GitHub Pages:** suba o repositório, vá em *Settings → Pages*, escolha a branch `main` e a pasta `/ (root)`.
- **Netlify / Vercel / Cloudflare Pages:** conecte o repositório, deixe o comando de build vazio e use a raiz como diretório de publicação.
- **Hospedagem tradicional:** envie todos os arquivos por FTP para `public_html`.

Site desenvolvido por [TeoCode](https://teocode.com.br/).
