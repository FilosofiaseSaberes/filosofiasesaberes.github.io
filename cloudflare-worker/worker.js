/*
  Guardador do site — Cloudflare Worker (gratuito).
  Faz REAÇÕES e COMENTÁRIOS (com aprovação) funcionarem de verdade.

  Precisa de:
   - 1 KV Namespace ligado com o nome:  STORE
   - 1 segredo (Secret) chamado:         ADMIN_TOKEN  (sua senha de moderação)
  Passo a passo no GUIA.md e em cloudflare-worker/LEIA-ME.md
*/
const ALLOWED_RX = ["sol","onda","arvore","lua","coracao"]; // = src/_data/reactions.js
const ALLOW_ORIGIN = "*"; // troque pela URL do seu site, ex.: "https://SEU-USUARIO.github.io"
const MAX = { name:80, ident:80, text:3000 };

const cors = () => ({
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
});
const json = (o, s=200) => new Response(JSON.stringify(o), {status:s, headers:{...cors(), "Content-Type":"application/json"}});
const clean = (v,n) => (typeof v==="string" ? v.trim().slice(0,n) : "");
const id = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

export default {
  async fetch(request, env){
    if(request.method === "OPTIONS") return new Response(null,{headers:cors()});
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/,"") || "/";

    // ---------- REAÇÕES ----------
    if(path === "/counts" && request.method === "GET"){
      const slug = url.searchParams.get("slug")||"";
      const raw = await env.STORE.get("react:"+slug);
      return json({ counts: raw ? JSON.parse(raw) : {} });
    }
    if(path === "/react" && request.method === "POST"){
      const b = await request.json().catch(()=>null);
      if(!b || !ALLOWED_RX.includes(b.key) || !b.slug) return json({error:"invalid"},400);
      let d = (b.delta===-1) ? -1 : 1;
      const k = "react:"+b.slug;
      const c = JSON.parse(await env.STORE.get(k) || "{}");
      c[b.key] = Math.max(0, (c[b.key]||0) + d);
      await env.STORE.put(k, JSON.stringify(c));
      return json({ counts:c });
    }

    // ---------- COMENTÁRIOS (público) ----------
    if(path === "/comments" && request.method === "GET"){
      const slug = url.searchParams.get("slug")||"";
      const raw = await env.STORE.get("capproved:"+slug);
      return json({ comments: raw ? JSON.parse(raw) : [] });
    }
    if(path === "/comment" && request.method === "POST"){
      const b = await request.json().catch(()=>null);
      if(!b || !b.slug) return json({error:"invalid"},400);
      // honeypot: se o campo oculto vier preenchido, é robô — aceita sem guardar
      if(clean(b.website,20)) return json({ ok:true, pending:true });
      const text = clean(b.text, MAX.text);
      if(!text) return json({error:"empty"},400);
      const item = { id:id(), slug:b.slug, name:clean(b.name,MAX.name), ident:clean(b.ident,MAX.ident), text, ts:Date.now() };
      await env.STORE.put("cpending:"+item.id, JSON.stringify(item));
      return json({ ok:true, pending:true });
    }

    // ---------- MODERAÇÃO (protegida por ADMIN_TOKEN) ----------
    if(path === "/admin" && request.method === "POST"){
      const b = await request.json().catch(()=>null);
      if(!b || !env.ADMIN_TOKEN || b.token !== env.ADMIN_TOKEN) return json({error:"unauthorized"},401);

      if(b.action === "list"){
        const list = await env.STORE.list({ prefix:"cpending:" });
        const items = [];
        for(const k of list.keys){ const v = await env.STORE.get(k.name); if(v) items.push(JSON.parse(v)); }
        items.sort((a,c)=>a.ts-c.ts);
        return json({ pending: items });
      }
      if(b.action === "approve" && b.id){
        const raw = await env.STORE.get("cpending:"+b.id);
        if(!raw) return json({error:"notfound"},404);
        const item = JSON.parse(raw);
        const arr = JSON.parse(await env.STORE.get("capproved:"+item.slug) || "[]");
        arr.push({ id:item.id, name:item.name, ident:item.ident, text:item.text, ts:item.ts });
        arr.sort((a,c)=>a.ts-c.ts);
        await env.STORE.put("capproved:"+item.slug, JSON.stringify(arr));
        await env.STORE.delete("cpending:"+b.id);
        return json({ ok:true });
      }
      if(b.action === "reject" && b.id){
        await env.STORE.delete("cpending:"+b.id);
        return json({ ok:true });
      }
      if(b.action === "remove" && b.id && b.slug){
        const arr = JSON.parse(await env.STORE.get("capproved:"+b.slug) || "[]").filter(c=>c.id!==b.id);
        await env.STORE.put("capproved:"+b.slug, JSON.stringify(arr));
        return json({ ok:true });
      }
      return json({error:"badaction"},400);
    }

    return json({ ok:true, service:"filosofias-e-saberes" });
  }
};
