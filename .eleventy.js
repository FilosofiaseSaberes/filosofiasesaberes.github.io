module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/moderacao": "moderacao" });
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });

  ["pt","es","en"].forEach(l=>{
    eleventyConfig.addCollection("posts_"+l, api =>
      api.getFilteredByGlob("src/posts/**/*.md")
         .filter(p => (p.data.lang||"pt")===l)
         .sort((a,b)=> b.date - a.date)
    );
  });

  eleventyConfig.addFilter("shortdate", (d, lang="pt")=>{
    const loc = {pt:"pt-BR",es:"es-ES",en:"en-GB"}[lang]||"pt-BR";
    return new Date(d).toLocaleDateString(loc,{day:"2-digit",month:"short",year:"numeric"});
  });

  eleventyConfig.addFilter("inSection", (coll, cat)=> (coll||[]).filter(p => p.data.category===cat));

  eleventyConfig.addFilter("related", (coll, url, category, limit=3)=>{
    const others = (coll||[]).filter(p => p.url !== url);
    const same = others.filter(p => p.data.category===category);
    const rest = others.filter(p => p.data.category!==category);
    return [...same, ...rest].slice(0, limit);
  });

  eleventyConfig.addFilter("isoDate", d => new Date(d).toISOString());

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir:{ input:"src", includes:"_includes", data:"_data", output:"_site" },
    markdownTemplateEngine:"njk",
    htmlTemplateEngine:"njk"
  };
};
