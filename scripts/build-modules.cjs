const fs=require('fs'),path=require('path'),vm=require('vm');
const endpoint='https://script.google.com/macros/s/AKfycbxLAP0EW3Inecns-l3KIF5wPPAardgQnXSMrVJCEuZj6RtLofAOOwlQzFa1UCwsoKA/exec';
const manifest=JSON.parse(fs.readFileSync('appcreator24/current/sections.json','utf8')).map(x=>({...x,id:'edit'+String(x.id).replace(/^edit/,'' )}));
fs.mkdirSync('modules',{recursive:true});
for(const item of manifest){const file=item.id.slice(4)+'.html',p='appcreator24/current/'+file;let html=fs.readFileSync(p,'utf8');html=html.replace(/https:\/\/script\.google\.com\/macros\/s\/[^'"\s<>]+\/exec/g,endpoint);fs.writeFileSync(p,html);if(!item.ref)continue;
let web=html;for(const target of manifest.filter(x=>x.ref))web=web.split('go:'+target.ref).join(target.ref==='Ballina'?'../index.html':target.ref+'.html');
const sync=`<script>(function(){try{const l=localStorage.getItem('lang')||localStorage.getItem('mh_language')||'sq';localStorage.setItem('lang',l);localStorage.setItem('mh_language',l)}catch(e){}})();</script>`;
web=web.replace('</head>',sync+'</head>').replace('<body>','<body><nav style="padding:10px;background:#fff"><a href="../index.html" style="color:#075ab5;text-decoration:none;font:600 15px Arial">‹ MeinHaushalt FT</a></nav>');
for(const m of web.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi))new vm.Script(m[1]);fs.writeFileSync('modules/'+item.ref+'.html',web);
}
fs.writeFileSync('appcreator24/current/sections.json',JSON.stringify(manifest.map(({name,id,ref})=>({name,id:id.slice(4),ref})),null,2));
console.log('Generated',manifest.filter(x=>x.ref).length,'web modules from the same corrected AppCreator24 sources');
