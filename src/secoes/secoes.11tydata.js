const site = require("../_data/site.js");
module.exports = {
  layout: "base.njk",
  eleventyComputed: {
    pageLang: d => (d.sec ? d.sec.lang : "pt"),
    title:    d => (d.sec ? site.categories[d.sec.cat][d.sec.lang] : "")
  }
};
