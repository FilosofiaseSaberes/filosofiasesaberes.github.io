module.exports = {
  layout: "post.njk",
  eleventyComputed: { pageLang: data => data.lang || "pt" }
};
