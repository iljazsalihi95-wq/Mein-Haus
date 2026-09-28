const API='https://script.google.com/macros/s/AKfycbzx_y12qFOfQ9uc9_5gfuHGbCw_JV2gwU1MGFnIgDnOuQ6lNhgw9hyMrYk8-Xv9oqDP/exec';
const I18N={de:{app:'Mein Haus',hello:'Hallo',overview:'Hier ist deine Haushaltsübersicht.',shopping:'Einkaufsliste',shoppingShort:'Einkauf',offers:'Angebote',stock:'Vorräte',finance:'Finanzen',today:'Heute kaufen?',openList:'Liste öffnen',tasks:'Nächste Aufgaben',categories:'Kategorien',more:'Mehr',bills:'Rechnungen & Abos',ai:'KI-Assistent',family:'Familie & Mitglieder',settings:'Einstellungen',home:'Home',aiHello:'Hallo! Wie kann ich dir heute helfen?',aiQ:'Was soll ich diese Woche einkaufen?',addItem:'Artikel hinzufügen…',searchOffers:'Angebote suchen…',searchStock:'Vorräte durchsuchen…',ask:'Frage etwas…'},sq:{app:'Shtëpia Ime',hello:'Përshëndetje',overview:'Këtu është përmbledhja e shtëpisë sate.',shopping:'Lista e blerjeve',shoppingShort:'Blerjet',offers:'Ofertat',stock:'Inventari',finance:'Financat',today:'Çfarë të blej sot?',openList:'Hap listën',tasks:'Detyrat e ardhshme',categories:'Kategoritë',more:'Më shumë',bills:'Faturat & Abonimet',ai:'Asistenti AI',family:'Familja & Anëtarët',settings:'Cilësimet',home:'Ballina',aiHello:'Përshëndetje! Si mund të të ndihmoj sot?',aiQ:'Çfarë duhet të blej këtë javë?',addItem:'Shto produkt…',searchOffers:'Kërko oferta…',searchStock:'Kërko në inventar…',ask:'Pyet diçka…'},en:{app:'My Home',hello:'Hello',overview:'Here is your household overview.',shopping:'Shopping list',shoppingShort:'Shopping',offers:'Offers',stock:'Inventory',finance:'Finances',today:'Buy today?',openList:'Open list',tasks:'Next tasks',categories:'Categories',more:'More',bills:'Bills & subscriptions',ai:'AI Assistant',family:'Family & members',settings:'Settings',home:'Home',aiHello:'Hello! How can I help today?',aiQ:'What should I buy this week?',addItem:'Add item…',searchOffers:'Search offers…',searchStock:'Search inventory…',ask:'Ask something…'}};
let lang=localStorage.lang||((navigator.language||'de').toLowerCase().startsWith('sq')?'sq':(navigator.language||'de').toLowerCase().startsWith('en')?'en':'de');
function setLang(l){lang=l;localStorage.lang=l;applyLang()} function applyLang(){const t=I18N[lang]||I18N.de;document.documentElement.lang=lang;document.title=t.app;document.querySelectorAll('[data-t]').forEach(e=>{if(t[e.dataset.t])e.textContent=t[e.dataset.t]});document.querySelectorAll('[data-ph]').forEach(e=>{if(t[e.dataset.ph])e.placeholder=t[e.dataset.ph]})}
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('on',x.dataset.go===id));scrollTo(0,0)}
const shop=[['Milch','1 Liter','Milchprodukte'],['Brot','1 Stück','Backwaren'],['Eier','10 Stück','Lebensmittel'],['Äpfel','1 kg','Obst & Gemüse'],['Tomaten','500 g','Obst & Gemüse']];
document.getElementById('shopItems').innerHTML=shop.map(x=>'<div class="card row"><input type="checkbox"><div class="grow"><b>'+x[0]+'</b><div class="muted">'+x[1]+'</div></div><span class="badge ok">'+x[2]+'</span></div>').join('');
const offers=[['Lidl','Milch 1L','0,99 €','1,49 €','-33%'],['ALDI','Eier 10 Stück','1,79 €','2,29 €','-22%'],['REWE','Bananen 1 kg','1,11 €','1,59 €','-30%'],['Kaufland','Tomaten 500 g','0,89 €','1,49 €','-40%']];
document.getElementById('offerItems').innerHTML=offers.map(x=>'<div class="card row"><div class="grow"><b>'+x[0]+' • '+x[1]+'</b><div><span class="price">'+x[2]+'</span> <span class="old">'+x[3]+'</span></div><div class="muted">Frankenthal • Angebot</div></div><span class="badge empty">'+x[4]+'</span></div>').join('');
const stock=[['Reis','2 kg','Genug','ok'],['Mehl','1 kg','Genug','ok'],['Zucker','500 g','Wenig','soon'],['Öl','1 Liter','Genug','ok'],['Nudeln','500 g','Wenig','soon'],['Dosentomaten','400 g','Leer','empty']];
document.getElementById('stockItems').innerHTML=stock.map(x=>'<div class="card row"><div class="grow"><b>'+x[0]+'</b><div class="muted">'+x[1]+'</div></div><span class="badge '+x[3]+'">'+x[2]+'</span></div>').join('');
applyLang(); if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');

/* Weekly household checks — staples such as oil/salt */
const WEEKLY_CHECKS=[
  {key:'vaj',de:'Öl prüfen',sq:'Kontrollo vajin',en:'Check the oil'},
  {key:'kripe',de:'Salz prüfen',sq:'Kontrollo kripën',en:'Check the salt'}
];
function weeklyCheckDue(){
  const last=Number(localStorage.getItem('weeklyCheckLast')||0);
  return Date.now()-last>=7*24*60*60*1000;
}
function renderWeeklyChecks(){
  if(!weeklyCheckDue()) return;
  const box=document.createElement('div'); box.className='card'; box.id='weeklyCheckCard';
  const title={sq:'Kontrolli javor',de:'Wöchentliche Kontrolle',en:'Weekly check'}[lang]||'Wöchentliche Kontrolle';
  box.innerHTML='<b>🔔 '+title+'</b><div style="height:8px"></div>'+
    WEEKLY_CHECKS.map(x=>'<div class="row" style="padding:7px 0"><span>☐</span><span class="grow">'+x[lang]+'</span></div>').join('')+
    '<button class="primary" onclick="completeWeeklyCheck()">'+({sq:'E kontrollova',de:'Geprüft',en:'Checked'}[lang])+'</button>';
  const home=document.getElementById('home'), anchor=home.querySelector('.section');
  home.insertBefore(box,anchor);
}
function completeWeeklyCheck(){localStorage.setItem('weeklyCheckLast',Date.now());document.getElementById('weeklyCheckCard')?.remove();}
function requestAppNotifications(){
  if('Notification' in window && Notification.permission==='default') Notification.requestPermission();
}
setTimeout(()=>{renderWeeklyChecks();requestAppNotifications();},300);
