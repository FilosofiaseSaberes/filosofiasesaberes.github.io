// Páginas fixas (Sobre e Acessibilidade). Edite os textos à vontade.
// Para adicionar outra página, copie um bloco e escolha um "slug" por idioma.
const home = { pt:"/", es:"/es/", en:"/en/" };

const content = {
  sobre: {
    slug: { pt:"sobre", es:"sobre", en:"about" },
    title:{ pt:"Sobre", es:"Acerca de", en:"About" },
    body: {
      pt:`<p>Filosofias e Saberes é um caderno em construção aberta. Reúne ensaios, trabalhos
        acadêmicos, registros pessoais, imagens e vídeos, sempre a partir de um olhar decolonial:
        muitas cosmovisões, muitos modos de saber, nenhum deles tomado como o único possível.</p>
        <p>As publicações aparecem em ritmo variado, conforme o tempo de cada pesquisa e de cada
        escrita. Os textos acadêmicos trazem referências em norma ABNT.</p>
        <p>Este é um espaço independente, mantido sem publicidade.</p>`,
      es:`<p>Filosofías y Saberes es un cuaderno en construcción abierta. Reúne ensayos, trabajos
        académicos, registros personales, imágenes y videos, siempre desde una mirada decolonial:
        muchas cosmovisiones, muchos modos de saber, ninguno tomado como el único posible.</p>
        <p>Las publicaciones aparecen a un ritmo variable, según el tiempo de cada investigación y
        de cada escritura. Los textos académicos traen referencias en norma ABNT.</p>
        <p>Este es un espacio independiente, mantenido sin publicidad.</p>`,
      en:`<p>Filosofias e Saberes is a notebook under open construction. It gathers essays, academic
        work, personal records, images and videos, always through a decolonial lens: many
        worldviews, many ways of knowing, none taken as the only one possible.</p>
        <p>Publications appear at a varying pace, following the time each piece of research and
        writing needs. Academic texts include references in ABNT style.</p>
        <p>This is an independent space, kept free of advertising.</p>`
    }
  },
  acessibilidade: {
    slug: { pt:"acessibilidade", es:"accesibilidad", en:"accessibility" },
    title:{ pt:"Acessibilidade", es:"Accesibilidad", en:"Accessibility" },
    body: {
      pt:`<p>Este site foi feito para ser lido por todas as pessoas. No topo de qualquer página há
        um botão de <b>Acessibilidade</b> com estes ajustes, que ficam salvos no seu navegador:</p>
        <ul>
          <li><b>Tamanho do texto</b>: aumenta ou diminui toda a leitura.</li>
          <li><b>Alto contraste</b>: reforça a diferença entre texto e fundo.</li>
          <li><b>Fonte legível</b>: troca a tipografia por uma desenhada para leitura facilitada.</li>
          <li><b>Sublinhar links</b>: destaca os links sem depender da cor.</li>
          <li><b>Reduzir animações</b>: desliga os movimentos da página.</li>
        </ul>
        <h2>Outras escolhas</h2>
        <p>As seções e os formatos são indicados por ícone, forma e texto, nunca só por cor, para
        que façam sentido também para pessoas daltônicas. As imagens trazem descrição para leitores
        de tela, e os vídeos têm transcrição. Há um atalho para pular direto ao conteúdo, e a
        navegação funciona por teclado, com foco visível.</p>
        <p>Encontrou alguma barreira? Escreva pela página de contato: corrigir isso é prioridade.</p>`,
      es:`<p>Este sitio fue hecho para ser leído por todas las personas. Arriba, en cualquier página,
        hay un botón de <b>Accesibilidad</b> con estos ajustes, que quedan guardados en tu navegador:</p>
        <ul>
          <li><b>Tamaño del texto</b>: aumenta o reduce toda la lectura.</li>
          <li><b>Alto contraste</b>: refuerza la diferencia entre texto y fondo.</li>
          <li><b>Fuente legible</b>: cambia la tipografía por una pensada para lectura facilitada.</li>
          <li><b>Subrayar enlaces</b>: destaca los enlaces sin depender del color.</li>
          <li><b>Reducir animaciones</b>: apaga los movimientos de la página.</li>
        </ul>
        <h2>Otras decisiones</h2>
        <p>Las secciones y los formatos se indican con icono, forma y texto, nunca solo con color,
        para que también tengan sentido para personas daltónicas. Las imágenes traen descripción
        para lectores de pantalla, y los videos tienen transcripción. Hay un atajo para saltar al
        contenido, y la navegación funciona con teclado, con foco visible.</p>
        <p>¿Encontraste alguna barrera? Escribe por la página de contacto: corregirlo es prioridad.</p>`,
      en:`<p>This site was made to be read by everyone. At the top of any page there is an
        <b>Accessibility</b> button with these settings, which are saved in your browser:</p>
        <ul>
          <li><b>Text size</b>: enlarges or reduces all reading.</li>
          <li><b>High contrast</b>: strengthens the difference between text and background.</li>
          <li><b>Legible font</b>: switches to a typeface designed for easier reading.</li>
          <li><b>Underline links</b>: marks links without relying on colour.</li>
          <li><b>Reduce motion</b>: turns off page movement.</li>
        </ul>
        <h2>Other choices</h2>
        <p>Sections and formats are shown with an icon, a shape and text, never colour alone, so
        they also make sense to colourblind readers. Images carry descriptions for screen readers,
        and videos have transcripts. There is a skip link to the content, and navigation works by
        keyboard, with visible focus.</p>
        <p>Ran into a barrier? Write through the contact page: fixing it is a priority.</p>`
    }
  },
  contato: {
    slug: { pt:"contato", es:"contacto", en:"contact" },
    title:{ pt:"Contato", es:"Contacto", en:"Contact" },
    body: {
      pt:`<p>Para dúvidas, sugestões, correções ou convites, escreva para o endereço abaixo.</p>
        <p class="contact-mail"><a href="mailto:filosofiasesaberes@gmail.com">filosofiasesaberes@gmail.com</a></p>
        <p>Comentários também estão abertos ao final de cada publicação.</p>`,
      es:`<p>Para dudas, sugerencias, correcciones o invitaciones, escribe a la dirección de abajo.</p>
        <p class="contact-mail"><a href="mailto:filosofiasesaberes@gmail.com">filosofiasesaberes@gmail.com</a></p>
        <p>Los comentarios también están abiertos al final de cada publicación.</p>`,
      en:`<p>For questions, suggestions, corrections or invitations, write to the address below.</p>
        <p class="contact-mail"><a href="mailto:filosofiasesaberes@gmail.com">filosofiasesaberes@gmail.com</a></p>
        <p>Comments are also open at the end of each publication.</p>`
    }
  }
};

// gera as combinações página × idioma
module.exports = Object.keys(content).flatMap(key =>
  ["pt","es","en"].map(lang => ({
    key, lang,
    home: home[lang],
    slug: content[key].slug[lang],
    title: content[key].title[lang],
    body: content[key].body[lang]
  }))
);
