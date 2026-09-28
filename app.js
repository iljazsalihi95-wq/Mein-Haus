const API='https://script.google.com/macros/s/AKfycbzx_y12qFOfQ9uc9_5gfuHGbCw_JV2gwU1MGFnIgDnOuQ6lNhgw9hyMrYk8-Xv9oqDP/exec';
const I18N={de:{app:'Mein Haus',hello:'Hallo',overview:'Hier ist deine Haushaltsübersicht.',shopping:'Einkaufsliste',shoppingShort:'Einkauf',offers:'Angebote',stock:'Vorräte',finance:'Finanzen',today:'Heute kaufen?',openList:'Liste öffnen',tasks:'Nächste Aufgaben',categories:'Kategorien',more:'Mehr',bills:'Rechnungen & Abos',ai:'KI-Assistent',family:'Familie & Mitglieder',settings:'Einstellungen',home:'Home',aiHello:'Hallo! Wie kann ich dir heute helfen?',aiQ:'Was soll ich diese Woche einkaufen?',addItem:'Artikel hinzufügen…',searchOffers:'Angebote suchen…',searchStock:'Vorräte durchsuchen…',ask:'Frage etwas…'},sq:{app:'Shtëpia Ime',hello:'Përshëndetje',overview:'Këtu është përmbledhja e shtëpisë sate.',shopping:'Lista e blerjeve',shoppingShort:'Blerjet',offers:'Ofertat',stock:'Inventari',finance:'Financat',today:'Çfarë të blej sot?',openList:'Hap listën',tasks:'Detyrat e ardhshme',categories:'Kategoritë',more:'Më shumë',bills:'Faturat & Abonimet',ai:'Asistenti AI',family:'Familja & Anëtarët',settings:'Cilësimet',home:'Ballina',aiHello:'Përshëndetje! Si mund të të ndihmoj sot?',aiQ:'Çfarë duhet të blej këtë javë?',addItem:'Shto produkt…',searchOffers:'Kërko oferta…',searchStock:'Kërko në inventar…',ask:'Pyet diçka…'},en:{app:'My Home',hello:'Hello',overview:'Here is your household overview.',shopping:'Shopping list',shoppingShort:'Shopping',offers:'Offers',stock:'Inventory',finance:'Finances',today:'Buy today?',openList:'Open list',tasks:'Next tasks',categories:'Categories',more:'More',bills:'Bills & subscriptions',ai:'AI Assistant',family:'Family & members',settings:'Settings',home:'Home',aiHello:'Hello! How can I help today?',aiQ:'What should I buy this week?',addItem:'Add item…',searchOffers:'Search offers…',searchStock:'Search inventory…',ask:'Ask something…'}};

Object.assign(I18N,{
it:{app:'Casa Mia',hello:'Ciao',overview:'Ecco il riepilogo della tua casa.',shopping:'Lista della spesa',shoppingShort:'Spesa',offers:'Offerte',stock:'Scorte',finance:'Finanze',today:'Comprare oggi?',openList:'Apri lista',tasks:'Prossime attività',categories:'Categorie',more:'Altro',bills:'Bollette e abbonamenti',ai:'Assistente AI',family:'Famiglia e membri',settings:'Impostazioni',home:'Home',aiHello:'Ciao! Come posso aiutarti?',aiQ:'Cosa devo comprare questa settimana?',addItem:'Aggiungi prodotto…',searchOffers:'Cerca offerte…',searchStock:'Cerca nelle scorte…',ask:'Chiedi qualcosa…'},
tr:{app:'Evim',hello:'Merhaba',overview:'Ev özetin burada.',shopping:'Alışveriş listesi',shoppingShort:'Alışveriş',offers:'Kampanyalar',stock:'Stoklar',finance:'Finans',today:'Bugün ne alınmalı?',openList:'Listeyi aç',tasks:'Yaklaşan görevler',categories:'Kategoriler',more:'Daha fazla',bills:'Faturalar ve abonelikler',ai:'AI Asistanı',family:'Aile ve üyeler',settings:'Ayarlar',home:'Ana sayfa',aiHello:'Merhaba! Nasıl yardımcı olabilirim?',aiQ:'Bu hafta ne almalıyım?',addItem:'Ürün ekle…',searchOffers:'Kampanya ara…',searchStock:'Stok ara…',ask:'Bir şey sor…'},
mk:{app:'Мојот дом',hello:'Здраво',overview:'Еве го прегледот на вашиот дом.',shopping:'Листа за купување',shoppingShort:'Купување',offers:'Понуди',stock:'Залиха',finance:'Финансии',today:'Што да купам денес?',openList:'Отвори листа',tasks:'Следни задачи',categories:'Категории',more:'Повеќе',bills:'Сметки и претплати',ai:'AI Асистент',family:'Семејство и членови',settings:'Поставки',home:'Почетна',aiHello:'Здраво! Како можам да помогнам?',aiQ:'Што треба да купам оваа недела?',addItem:'Додај производ…',searchOffers:'Барај понуди…',searchStock:'Барај залиха…',ask:'Прашај нешто…'},
bs:{app:'Moj dom',hello:'Zdravo',overview:'Ovdje je pregled vašeg doma.',shopping:'Lista za kupovinu',shoppingShort:'Kupovina',offers:'Ponude',stock:'Zalihe',finance:'Finansije',today:'Šta kupiti danas?',openList:'Otvori listu',tasks:'Sljedeći zadaci',categories:'Kategorije',more:'Više',bills:'Računi i pretplate',ai:'AI asistent',family:'Porodica i članovi',settings:'Postavke',home:'Početna',aiHello:'Zdravo! Kako mogu pomoći?',aiQ:'Šta trebam kupiti ove sedmice?',addItem:'Dodaj proizvod…',searchOffers:'Pretraži ponude…',searchStock:'Pretraži zalihe…',ask:'Pitaj nešto…'}
});
const SUPPORTED=['sq','de','en','it','tr','mk','bs'];
function detectLanguage(){const raw=(navigator.languages&&navigator.languages[0]||navigator.language||'de').toLowerCase().split('-')[0];return SUPPORTED.includes(raw)?raw:'de'}

let lang=localStorage.lang||detectLanguage();
function setLang(l){if(!SUPPORTED.includes(l))return;lang=l;localStorage.lang=l;applyLang();renderWeeklyChecks();renderAppointments()} function applyLang(){const t=I18N[lang]||I18N.de;document.documentElement.lang=lang;document.title=t.app;document.querySelectorAll('[data-t]').forEach(e=>{if(t[e.dataset.t])e.textContent=t[e.dataset.t]});document.querySelectorAll('[data-ph]').forEach(e=>{if(t[e.dataset.ph])e.placeholder=t[e.dataset.ph]})}
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('on',x.dataset.go===id));scrollTo(0,0)}
const shop=[['Milch','1 Liter','Milchprodukte'],['Brot','1 Stück','Backwaren'],['Eier','10 Stück','Lebensmittel'],['Äpfel','1 kg','Obst & Gemüse'],['Tomaten','500 g','Obst & Gemüse']];
document.getElementById('shopItems').innerHTML=shop.map(x=>'<div class="card row"><input type="checkbox"><div class="grow"><b>'+x[0]+'</b><div class="muted">'+x[1]+'</div></div><span class="badge ok">'+x[2]+'</span></div>').join('');
const offers=[];
document.getElementById('offerItems').innerHTML='<div class="card"><b>🏪 Dyqanet / Geschäfte</b><p class="muted">Ofertat reale do të shfaqen vetëm kur vijnë nga prospekti ose burimi i verifikuar i dyqanit.</p><div class="chips"><span class="chip">INCI • Speyerer Str. 35</span><span class="chip">Avantaj • Wormser Str. 93</span><span class="chip">Lidl</span><span class="chip">ALDI SÜD</span><span class="chip">Kaufland</span><span class="chip">REWE</span><span class="chip">Netto</span><span class="chip">EDEKA</span><span class="chip">PENNY</span><span class="chip">dm</span><span class="chip">Müller</span><span class="chip">Deichmann</span><span class="chip">Action</span></div></div><div id="verifiedOffers"></div>';
const stock=[['Reis','2 kg','Genug','ok'],['Mehl','1 kg','Genug','ok'],['Zucker','500 g','Wenig','soon'],['Öl','1 Liter','Genug','ok'],['Nudeln','500 g','Wenig','soon'],['Dosentomaten','400 g','Leer','empty']];
document.getElementById('stockItems').innerHTML=stock.map(x=>'<div class="card row"><div class="grow"><b>'+x[0]+'</b><div class="muted">'+x[1]+'</div></div><span class="badge '+x[3]+'">'+x[2]+'</span></div>').join('');
applyLang(); if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
if(localStorage.sessionToken){go('home')}else{go('auth')}

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

async function apiPost(action,payload={}){const body={action,...payload};const token=localStorage.sessionToken;if(token)body.token=token;const r=await fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)});return r.json();}
function authMessage(m,bad=false){const e=document.getElementById('authMsg');if(e){e.textContent=m;e.style.color=bad?'#c12626':'#11834f'}}
async function registerUser(){try{authMessage('…');const d=await apiPost('register',{displayName:authName.value.trim(),email:authEmail.value.trim(),password:authPass.value,householdName:houseName.value.trim(),language:lang});if(!d.ok)throw Error(d.error||'Registrierung fehlgeschlagen');const x=d.data||d;if(x.token)localStorage.sessionToken=x.token;authMessage('✓ Konto erstellt');go('home')}catch(e){authMessage(e.message,true)}}
async function loginUser(){try{authMessage('…');const d=await apiPost('login',{email:authEmail.value.trim(),password:authPass.value});if(!d.ok)throw Error(d.error||'Login fehlgeschlagen');const x=d.data||d;if(x.token)localStorage.sessionToken=x.token;authMessage('✓ Angemeldet');go('home')}catch(e){authMessage(e.message,true)}}

const APPOINTMENT_KEY='familyAppointmentsV1';
function getAppointments(){try{return JSON.parse(localStorage.getItem(APPOINTMENT_KEY)||'[]')}catch(e){return[]}}
function addAppointment(){
 const x={id:Date.now(),first:aptFirst.value.trim(),last:aptLast.value.trim(),date:aptDate.value,time:aptTime.value,place:aptPlace.value.trim(),alerted:false};
 if(!x.first||!x.date||!x.time||!x.place){alert(lang==='sq'?'Plotëso emrin, datën, orën dhe vendin.':lang==='en'?'Fill in name, date, time and place.':'Name, Datum, Uhrzeit und Ort ausfüllen.');return}
 const arr=getAppointments();arr.push(x);arr.sort((p,q)=>(p.date+p.time).localeCompare(q.date+q.time));localStorage.setItem(APPOINTMENT_KEY,JSON.stringify(arr));renderAppointments();requestAppNotifications();
}
function deleteAppointment(id){localStorage.setItem(APPOINTMENT_KEY,JSON.stringify(getAppointments().filter(x=>x.id!==id)));renderAppointments()}
function renderAppointments(){
 const e=document.getElementById('aptList');if(!e)return;const arr=getAppointments();
 e.innerHTML=arr.length?arr.map(x=>'<div class="card"><b>👤 '+escA(x.first+' '+x.last)+'</b><div>📅 '+x.date+' · ⏰ '+x.time+'</div><div>📍 '+escA(x.place)+'</div><button class="chip" onclick="deleteAppointment('+x.id+')">🗑</button></div>').join(''):'<div class="card muted">Keine Termine / Nuk ka termine</div>';
}
function escA(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function appointmentAlarm(x){
 const sq='🔔 Termini: '+x.first+' '+x.last+'\n⏰ '+x.time+'\n📍 '+x.place;
 const de='🔔 Termin: '+x.first+' '+x.last+'\n⏰ '+x.time+'\n📍 '+x.place;
 const en='🔔 Appointment: '+x.first+' '+x.last+'\n⏰ '+x.time+'\n📍 '+x.place;
 const msg=lang==='sq'?sq:lang==='en'?en:de;
 try{const ac=new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.value=880;g.gain.value=.15;o.start();setTimeout(()=>{o.stop();ac.close()},1200)}catch(e){}
 if('Notification'in window&&Notification.permission==='granted')new Notification('Mein Haus',{body:msg.replace(/\n/g,' · ')});
 alert(msg);
}
function checkAppointments(){
 const now=Date.now(),arr=getAppointments();let changed=false;
 arr.forEach(x=>{const t=new Date(x.date+'T'+x.time).getTime();if(!x.alerted&&now>=t-30*60000&&now<t+5*60000){x.alerted=true;changed=true;appointmentAlarm(x)}});
 if(changed)localStorage.setItem(APPOINTMENT_KEY,JSON.stringify(arr));
}
setInterval(checkAppointments,30000);setTimeout(()=>{renderAppointments();checkAppointments()},700);

async function scanReceipt(){
 const input=document.getElementById('receiptFile'), p=document.getElementById('receiptPreview'), file=input&&input.files&&input.files[0];
 if(!file){p.innerHTML='<p class="muted">Bitte zuerst einen Kassenbon fotografieren.</p>';return}
 const reader=new FileReader();
 reader.onload=function(){sessionStorage.setItem('receiptImage',reader.result);p.innerHTML='<div class="card"><img src="'+reader.result+'" style="width:100%;max-height:320px;object-fit:contain;border-radius:12px"><p><b>✓ Foto übernommen</b></p><p class="muted">Produkt, Menge, Preis, Geschäft und Datum werden vor dem Speichern geprüft.</p><button class="primary" onclick="confirmReceiptDraft()">Produkte prüfen</button></div>'};
 reader.readAsDataURL(file);
}
function confirmReceiptDraft(){
 const p=document.getElementById('receiptPreview');
 p.insertAdjacentHTML('beforeend','<div class="card"><b>Kontrolle erforderlich</b><p class="muted">Speichern erst nach AI-Auswertung und deiner Bestätigung. Keine erfundenen Produkte.</p></div>');
}

const OFFER_SOURCES=[
 {country:'DE',name:'Lidl',url:'https://www.lidl.de/c/online-prospekte/s10005610',mode:'prospekt',regional:true},
 {country:'DE',name:'ALDI SÜD',url:'https://www.aldi-sued.de/prospekte',mode:'prospekt',regional:true},
 {country:'DE',name:'Kaufland',url:'https://filiale.kaufland.de/prospekte.html',mode:'prospekt',regional:true},
 {country:'DE',name:'REWE',url:'https://www.rewe.de/angebote/nationale-angebote/',mode:'offers',regional:true},
 {country:'DE',name:'Netto Marken-Discount',url:'https://www.netto-online.de/',mode:'offers',regional:true},
 {country:'DE',name:'EDEKA',url:'https://www.edeka.de/angebote/',mode:'offers',regional:true},
 {country:'DE',name:'Action',url:'https://www.action.com/de-de/wochenangebote/',mode:'offers',regional:false},
 {country:'DE',name:'toom Baumarkt',url:'https://toom.de/m/frankenthal/',mode:'offers',regional:true},
 {country:'DE',name:'BAUHAUS',url:'https://www.bauhaus.info/',mode:'offers',regional:true},
 {country:'DE',name:'MediaMarkt',url:'https://www.mediamarkt.de/',mode:'offers',regional:true},
 {country:'DE',name:'IKEA',url:'https://www.ikea.com/de/de/offers/',mode:'offers',regional:true},
 {country:'DE',name:'JYSK',url:'https://jysk.de/angebote',mode:'offers',regional:true},
 {country:'DE',name:'ROLLER',url:'https://www.roller.de/',mode:'offers',regional:true},
 {country:'DE',name:'POCO',url:'https://www.poco.de/',mode:'offers',regional:true},
 {country:'DE',name:'mömax',url:'https://www.moemax.de/',mode:'offers',regional:true},
 {country:'DE',name:'XXXLutz',url:'https://www.xxxlutz.de/',mode:'offers',regional:true},
 {country:'DE',name:'Möbel Martin',url:'https://www.moebel-martin.de/',mode:'offers',regional:true},
 {country:'DE',name:'Möbel Boss',url:'https://moebel-boss.de/',mode:'offers',regional:true},
 {country:'DE',name:'Segmüller',url:'https://www.segmueller.de/',mode:'offers',regional:true},
 {country:'DE',name:'Hornbach',url:'https://www.hornbach.de/',mode:'offers',regional:true},
 {country:'DE',name:'OBI',url:'https://www.obi.de/',mode:'offers',regional:true}
];
function countryCode(){return (localStorage.offerCountry||((navigator.language||'de-DE').split('-')[1])||'DE').toUpperCase()}
function renderOfferSources(){
 const e=document.getElementById('verifiedOffers');if(!e)return;const c=countryCode(),src=OFFER_SOURCES.filter(x=>x.country===c);
 e.innerHTML='<div class="section"><h3>📚 Prospekte & Angebote</h3></div>'+src.map(x=>'<div class="card row"><div class="grow"><b>'+x.name+'</b><div class="muted">'+(x.regional?'Filiale/Region auswählen':'Landesweite Angebote')+'</div></div><button class="chip" onclick="window.open(\''+x.url+'\',\'_blank\')">Prospekt ↗</button></div>').join('');
}
setTimeout(renderOfferSources,500);
