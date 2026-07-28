module.exports = {
  layout: "base.njk",
  eleventyComputed: {
    pageLang: d => (d.pg ? d.pg.lang : "pt"),
    title:    d => (d.pg ? d.pg.title : "")
  }
};
