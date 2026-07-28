module.exports = {
  title: "Filosofias e Saberes",

  // Apenas o endereço BASE, sem a pasta do repositório e sem barra no final.
  // Ex.: "https://SEU-USUARIO.github.io"
  // ou "https://seudominio.com.br", caso tenha domínio próprio.
  url: "https://filosofiasesaberes.github.io",

  langs: ["pt", "es", "en"],

  // URL do Worker da Cloudflare, responsável por reações e comentários.
  // Vazio = modo local.
  apiUrl: "https://filosofias-saberes.filosofiasesaberes.workers.dev",

  // Páginas internas da newsletter por idioma.
  // Vazio = exibe a mensagem de que a assinatura estará disponível em breve.
  newsletterUrl: {
    pt: "/newsletter/",
    es: "",
    en: ""
  },

  // Rótulos das seções por idioma.
  categories: {
    ensaios: {
      pt: "Ensaios",
      es: "Ensayos",
      en: "Essays"
    },

    academico: {
      pt: "Acadêmico",
      es: "Académico",
      en: "Academic"
    },

    pessoal: {
      pt: "Pessoal",
      es: "Personal",
      en: "Personal"
    }
  }
};
