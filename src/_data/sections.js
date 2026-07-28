const site = require("./site.js");
const home = { pt:"/", es:"/es/", en:"/en/" };
module.exports = site.langs.flatMap(lang =>
  Object.keys(site.categories).map(cat => ({ lang, cat, home: home[lang] }))
);
