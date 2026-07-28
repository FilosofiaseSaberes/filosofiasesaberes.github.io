// Acessibilidade: preferências persistidas + painel acessível por teclado
(function(){
  var html=document.documentElement;
  var P={ contrast:'a11y-contrast', legible:'a11y-legible', underline:'a11y-underline', motion:'a11y-motion', fs:'a11y-fs' };
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}

  // aplica preferências salvas
  if(get(P.contrast)==='on') html.setAttribute('data-contrast','high');
  if(get(P.legible)==='on') html.setAttribute('data-legible','on');
  if(get(P.underline)==='on') html.setAttribute('data-underline','on');
  if(get(P.motion)==='on') html.setAttribute('data-motion','reduce');
  var savedFs=parseFloat(get(P.fs)); if(savedFs) html.style.setProperty('--fs',savedFs.toFixed(2));

  document.addEventListener('DOMContentLoaded',function(){
    var btn=document.getElementById('a11yBtn'), panel=document.getElementById('a11yPanel');
    if(btn&&panel){
      btn.addEventListener('click',function(){
        var open=panel.hidden; panel.hidden=!open; btn.setAttribute('aria-expanded',String(open));
      });
      document.addEventListener('click',function(e){
        if(!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)){
          panel.hidden=true; btn.setAttribute('aria-expanded','false');
        }
      });
      document.addEventListener('keydown',function(e){
        if(e.key==='Escape' && !panel.hidden){panel.hidden=true;btn.setAttribute('aria-expanded','false');btn.focus();}
      });
    }
    // tamanho da fonte
    var fs=savedFs||1;
    function setFs(v){fs=Math.min(1.5,Math.max(.85,v));html.style.setProperty('--fs',fs.toFixed(2));set(P.fs,fs);}
    var u=document.getElementById('fsUp'),d=document.getElementById('fsDown'),r=document.getElementById('fsReset');
    if(u)u.onclick=function(){setFs(fs+.1)}; if(d)d.onclick=function(){setFs(fs-.1)}; if(r)r.onclick=function(){setFs(1)};

    // sincroniza estado visual dos toggles ao carregar
    [['tContrast',P.contrast],['tLegible',P.legible],['tUnderline',P.underline],['tMotion',P.motion]].forEach(function(p){
      var b=document.getElementById(p[0]); if(!b)return;
      var on=get(p[1])==='on'; b.setAttribute('aria-pressed',String(on));
      var st=b.querySelector('.state'); if(st) st.textContent=on?st.dataset.on:st.dataset.off;
    });
    function bind(id,key,apply){
      var b=document.getElementById(id); if(!b)return;
      b.addEventListener('click',function(){
        var on=b.getAttribute('aria-pressed')!=='true';
        b.setAttribute('aria-pressed',String(on));
        var st=b.querySelector('.state'); if(st) st.textContent=on?st.dataset.on:st.dataset.off;
        set(key,on?'on':'off'); apply(on);
      });
    }
    bind('tContrast',P.contrast,function(on){html.setAttribute('data-contrast',on?'high':'normal')});
    bind('tLegible',P.legible,function(on){html.setAttribute('data-legible',on?'on':'off')});
    bind('tUnderline',P.underline,function(on){html.setAttribute('data-underline',on?'on':'off')});
    bind('tMotion',P.motion,function(on){html.setAttribute('data-motion',on?'reduce':'normal')});
  });
})();

/* ---------- REAÇÕES ---------- */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var box=document.querySelector('.reactions[data-slug]'); if(!box) return;
    var slug=box.getAttribute('data-slug');
    var api=(window.FES_API||'').replace(/\/+$/,'');
    var mineKey='fes-rx-'+slug;
    var mine={}; try{ mine=JSON.parse(localStorage.getItem(mineKey))||{} }catch(e){}
    var buttons=[].slice.call(box.querySelectorAll('.rx'));

    function paint(counts){
      buttons.forEach(function(b){
        var k=b.dataset.k;
        var base=(counts&&typeof counts[k]==='number')?counts[k]:0;
        var on=!!mine[k];
        b.setAttribute('aria-pressed', String(on));
        var c=b.querySelector('[data-count]'); if(c) c.textContent = base;
      });
    }

    // carrega contagens (se houver API); senão, modo local
    if(api){
      fetch(api+'/counts?slug='+encodeURIComponent(slug))
        .then(function(r){return r.json()}).then(function(d){paint(d.counts||{})})
        .catch(function(){paint({})});
    } else {
      // modo local: usa contagem guardada só neste navegador
      var local={}; try{ local=JSON.parse(localStorage.getItem('fes-rxlocal-'+slug))||{} }catch(e){}
      paint(local);
    }

    buttons.forEach(function(b){
      b.addEventListener('click', function(){
        var k=b.dataset.k;
        var wasOn=!!mine[k];
        mine[k]=!wasOn;
        try{ localStorage.setItem(mineKey, JSON.stringify(mine)) }catch(e){}
        var delta = mine[k] ? 1 : -1;

        if(api){
          // atualização otimista
          var c=b.querySelector('[data-count]'); if(c) c.textContent=Math.max(0,(parseInt(c.textContent,10)||0)+delta);
          b.setAttribute('aria-pressed', String(!!mine[k]));
          fetch(api+'/react', {method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({slug:slug, key:k, delta:delta})}).catch(function(){});
        } else {
          // modo local (sem servidor): guarda no navegador
          var local={}; try{ local=JSON.parse(localStorage.getItem('fes-rxlocal-'+slug))||{} }catch(e){}
          local[k]=Math.max(0,(local[k]||0)+delta);
          try{ localStorage.setItem('fes-rxlocal-'+slug, JSON.stringify(local)) }catch(e){}
          paint(local);
        }
      });
    });
  });
})();

/* ---------- COMENTÁRIOS ---------- */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var box=document.querySelector('.comments[data-slug]'); if(!box) return;
    var slug=box.getAttribute('data-slug');
    var api=(window.FES_API||'').replace(/\/+$/,'');
    var list=box.querySelector('[data-clist]');
    var form=box.querySelector('[data-cform]');
    var msg=box.querySelector('[data-cmsg]');
    var MSG={pending:box.dataset.msgPending,off:box.dataset.msgOff,err:box.dataset.msgErr,none:box.dataset.msgNone};

    function esc(s){var d=document.createElement('div');d.textContent=s==null?'':s;return d.innerHTML;}
    function fmtDate(ts){try{return new Date(ts).toLocaleDateString(document.documentElement.lang||'pt-BR',{day:'2-digit',month:'short'});}catch(e){return'';}}
    function render(items){
      if(!items||!items.length){ list.innerHTML='<p class="c-empty eyebrow">'+esc(MSG.none)+'</p>'; return; }
      list.innerHTML=items.map(function(c){
        return '<div class="comment"><div class="who">'
          +'<span class="name">'+(esc(c.name)||'—')+'</span>'
          +(c.ident?'<span class="idtag">'+esc(c.ident)+'</span>':'')
          +'<span class="when">'+fmtDate(c.ts)+'</span></div>'
          +'<div class="txt">'+esc(c.text)+'</div></div>';
      }).join('');
    }

    if(!api){
      // sem guardador ligado ainda: mostra aviso gentil e desativa o envio
      list.innerHTML='<p class="c-empty eyebrow">'+esc(MSG.off)+'</p>';
      var btn=form.querySelector('button[type=submit]'); if(btn) btn.disabled=true;
    } else {
      fetch(api+'/comments?slug='+encodeURIComponent(slug))
        .then(function(r){return r.json()}).then(function(d){render(d.comments||[])})
        .catch(function(){ /* mantém o texto padrão */ });

      form.addEventListener('submit', function(e){
        e.preventDefault();
        var F=form.elements;
        var text=((F['text']&&F['text'].value)||'').trim(); if(!text) return;
        var btn=form.querySelector('button[type=submit]'); if(btn) btn.disabled=true;
        var val=function(n){ return (F[n]&&F[n].value)||''; };
        fetch(api+'/comment',{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({slug:slug,name:val('name'),ident:val('ident'),text:text,website:val('website')})})
        .then(function(r){return r.json()}).then(function(){
          msg.textContent=MSG.pending; form.reset();
        }).catch(function(){ msg.textContent=MSG.err; })
        .then(function(){ if(btn) btn.disabled=false; });
      });
    }
  });
})();
