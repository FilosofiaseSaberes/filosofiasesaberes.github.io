// As 5 reações do periódico. Para trocar uma: mude aqui (chave, cor, ícone, rótulos).
module.exports = {
  items: [
    { key:"sol", color:"#E4B84E", svg:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke-linecap="round"/>' },
    { key:"onda",    color:"#3FBFB4", svg:'<path d="M2 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>' },
    { key:"arvore",  color:"#9DB06B", svg:'<path d="M12 22v-6"/><path d="M12 16a5 5 0 0 0 5-5 4 4 0 0 0-1-2.6A4.5 4.5 0 0 0 12 3a4.5 4.5 0 0 0-4 3.4A4 4 0 0 0 7 11a5 5 0 0 0 5 5z"/>' },
    { key:"lua",     color:"#A992E0", svg:'<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>' },
    { key:"coracao", color:"#D2694F", svg:'<path d="M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c-2 4.5-9 9-9 9z"/>' }
  ],
  labels: {
    pt:{ q:"Como esta leitura te tocou?", hint:"Escolha quantas quiser. Cada símbolo é um jeito de responder ao texto.",
      sol:["Sol","me iluminou"], onda:["Onda","me tocou"], arvore:["Árvore","me enraizou"], lua:["Lua","me fez refletir"], coracao:["Coração","gratidão"] },
    es:{ q:"¿Cómo te tocó esta lectura?", hint:"Elige las que quieras. Cada símbolo es una manera de responder al texto.",
      sol:["Sol","me iluminó"], onda:["Ola","me tocó"], arvore:["Árbol","me enraizó"], lua:["Luna","me hizo reflexionar"], coracao:["Corazón","gratitud"] },
    en:{ q:"How did this reading touch you?", hint:"Pick as many as you like. Each symbol is a way of answering the text.",
      sol:["Sun","lit me up"], onda:["Wave","moved me"], arvore:["Tree","rooted me"], lua:["Moon","made me reflect"], coracao:["Heart","gratitude"] }
  }
};
