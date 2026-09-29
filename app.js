const API='https://script.google.com/macros/s/AKfycbzx_y12qFOfQ9uc9_5gfuHGbCw_JV2gwU1MGFnIgDnOuQ6lNhgw9hyMrYk8-Xv9oqDP/exec';
const I18N={de:{app:'Mein Haus',hello:'Hallo',overview:'Hier ist deine Haushaltsübersicht.',shopping:'Einkaufsliste',shoppingShort:'Einkauf',addPurchase:'➕ Produkt / Einkauf hinzufügen',saveItem:'Produkt speichern',addByReceipt:'🧾 Mit Kassenbon AI hinzufügen',offers:'Angebote',stock:'Vorräte',finance:'Finanzen',today:'Heute kaufen?',openList:'Liste öffnen',tasks:'Nächste Aufgaben',categories:'Kategorien',more:'Mehr',bills:'Rechnungen & Abos',ai:'KI-Assistent',family:'Familie & Mitglieder',settings:'Einstellungen',home:'Home',aiHello:'Hallo! Wie kann ich dir heute helfen?',aiQ:'Was soll ich diese Woche einkaufen?',addItem:'Artikel hinzufügen…',searchOffers:'Angebote suchen…',searchStock:'Vorräte durchsuchen…',ask:'Frage etwas…'},sq:{app:'Shtëpia Ime',hello:'Përshëndetje',overview:'Këtu është përmbledhja e shtëpisë sate.',shopping:'Lista e blerjeve',shoppingShort:'Blerjet',addPurchase:'➕ Shto produkt / blerje',saveItem:'Ruaj produktin',addByReceipt:'🧾 Shto me faturë AI',offers:'Ofertat',stock:'Inventari',finance:'Financat',today:'Çfarë të blej sot?',openList:'Hap listën',tasks:'Detyrat e ardhshme',categories:'Kategoritë',more:'Më shumë',bills:'Faturat & Abonimet',ai:'Asistenti AI',family:'Familja & Anëtarët',settings:'Cilësimet',home:'Ballina',aiHello:'Përshëndetje! Si mund të të ndihmoj sot?',aiQ:'Çfarë duhet të blej këtë javë?',addItem:'Shto produkt…',searchOffers:'Kërko oferta…',searchStock:'Kërko në inventar…',ask:'Pyet diçka…'},en:{app:'My Home',hello:'Hello',overview:'Here is your household overview.',shopping:'Shopping list',shoppingShort:'Shopping',offers:'Offers',stock:'Inventory',finance:'Finances',today:'Buy today?',openList:'Open list',tasks:'Next tasks',categories:'Categories',more:'More',bills:'Bills & subscriptions',ai:'AI Assistant',family:'Family & members',settings:'Settings',home:'Home',aiHello:'Hello! How can I help today?',aiQ:'What should I buy this week?',addItem:'Add item…',searchOffers:'Search offers…',searchStock:'Search inventory…',ask:'Ask something…'}};

Object.assign(I18N,{
it:{app:'Casa Mia',hello:'Ciao',overview:'Ecco il riepilogo della tua casa.',shopping:'Lista della spesa',shoppingShort:'Spesa',offers:'Offerte',stock:'Scorte',finance:'Finanze',today:'Comprare oggi?',openList:'Apri lista',tasks:'Prossime attività',categories:'Categorie',more:'Altro',bills:'Bollette e abbonamenti',ai:'Assistente AI',family:'Famiglia e membri',settings:'Impostazioni',home:'Home',aiHello:'Ciao! Come posso aiutarti?',aiQ:'Cosa devo comprare questa settimana?',addItem:'Aggiungi prodotto…',searchOffers:'Cerca offerte…',searchStock:'Cerca nelle scorte…',ask:'Chiedi qualcosa…'},
tr:{app:'Evim',hello:'Merhaba',overview:'Ev özetin burada.',shopping:'Alışveriş listesi',shoppingShort:'Alışveriş',offers:'Kampanyalar',stock:'Stoklar',finance:'Finans',today:'Bugün ne alınmalı?',openList:'Listeyi aç',tasks:'Yaklaşan görevler',categories:'Kategoriler',more:'Daha fazla',bills:'Faturalar ve abonelikler',ai:'AI Asistanı',family:'Aile ve üyeler',settings:'Ayarlar',home:'Ana sayfa',aiHello:'Merhaba! Nasıl yardımcı olabilirim?',aiQ:'Bu hafta ne almalıyım?',addItem:'Ürün ekle…',searchOffers:'Kampanya ara…',searchStock:'Stok ara…',ask:'Bir şey sor…'},
mk:{app:'Мојот дом',hello:'Здраво',overview:'Еве го прегледот на вашиот дом.',shopping:'Листа за купување',shoppingShort:'Купување',offers:'Понуди',stock:'Залиха',finance:'Финансии',today:'Што да купам денес?',openList:'Отвори листа',tasks:'Следни задачи',categories:'Категории',more:'Повеќе',bills:'Сметки и претплати',ai:'AI Асистент',family:'Семејство и членови',settings:'Поставки',home:'Почетна',aiHello:'Здраво! Како можам да помогнам?',aiQ:'Што треба да купам оваа недела?',addItem:'Додај производ…',searchOffers:'Барај понуди…',searchStock:'Барај залиха…',ask:'Прашај нешто…'},
bs:{app:'Moj dom',hello:'Zdravo',overview:'Ovdje je pregled vašeg doma.',shopping:'Lista za kupovinu',shoppingShort:'Kupovina',offers:'Ponude',stock:'Zalihe',finance:'Finansije',today:'Šta kupiti danas?',openList:'Otvori listu',tasks:'Sljedeći zadaci',categories:'Kategorije',more:'Više',bills:'Računi i pretplate',ai:'AI asistent',family:'Porodica i članovi',settings:'Postavke',home:'Početna',aiHello:'Zdravo! Kako mogu pomoći?',aiQ:'Šta trebam kupiti ove sedmice?',addItem:'Dodaj proizvod…',searchOffers:'Pretraži ponude…',searchStock:'Pretraži zalihe…',ask:'Pitaj nešto…'}
});
const SUPPORTED=['sq','de','en','it','tr','mk','bs'];
function detectLanguage(){const raw=(navigator.languages&&navigator.languages[0]||navigator.language||'de').toLowerCase().split('-')[0];return SUPPORTED.includes(raw)?raw:'de'}

let lang=localStorage.getItem('lang')||detectLanguage();
function setLang(l){if(!SUPPORTED.includes(l))return;lang=l;localStorage.setItem('lang',l);localStorage.setItem('languageManual','1');applyLang();renderWeeklyChecks();renderAppointments();renderManualProducts();renderOfferSources()} function applyLang(){Object.keys({"de":{"familyAccount":"Familienkonto","name":"Name","email":"E-Mail","password":"Passwort","householdName":"Familienname / Haushalt","register":"Registrieren","login":"Anmelden"},"sq":{"familyAccount":"Llogaria familjare","name":"Emri","email":"E-mail","password":"Fjalëkalimi","householdName":"Emri i familjes / Shtëpisë","register":"Regjistrohu","login":"Hyr"},"en":{"familyAccount":"Family account","name":"Name","email":"Email","password":"Password","householdName":"Family / household name","register":"Register","login":"Sign in"},"it":{"familyAccount":"Account famiglia","name":"Nome","email":"E-mail","password":"Password","householdName":"Famiglia / casa","register":"Registrati","login":"Accedi"},"tr":{"familyAccount":"Aile hesabı","name":"Ad","email":"E-posta","password":"Şifre","householdName":"Aile / ev adı","register":"Kayıt ol","login":"Giriş yap"},"mk":{"familyAccount":"Семејна сметка","name":"Име","email":"Е-пошта","password":"Лозинка","householdName":"Семејство / домаќинство","register":"Регистрирај се","login":"Најави се"},"bs":{"familyAccount":"Porodični račun","name":"Ime","email":"E-mail","password":"Lozinka","householdName":"Porodica / domaćinstvo","register":"Registruj se","login":"Prijavi se"}}).forEach(k=>Object.assign(I18N[k],{"de":{"familyAccount":"Familienkonto","name":"Name","email":"E-Mail","password":"Passwort","householdName":"Familienname / Haushalt","register":"Registrieren","login":"Anmelden"},"sq":{"familyAccount":"Llogaria familjare","name":"Emri","email":"E-mail","password":"Fjalëkalimi","householdName":"Emri i familjes / Shtëpisë","register":"Regjistrohu","login":"Hyr"},"en":{"familyAccount":"Family account","name":"Name","email":"Email","password":"Password","householdName":"Family / household name","register":"Register","login":"Sign in"},"it":{"familyAccount":"Account famiglia","name":"Nome","email":"E-mail","password":"Password","householdName":"Famiglia / casa","register":"Registrati","login":"Accedi"},"tr":{"familyAccount":"Aile hesabı","name":"Ad","email":"E-posta","password":"Şifre","householdName":"Aile / ev adı","register":"Kayıt ol","login":"Giriş yap"},"mk":{"familyAccount":"Семејна сметка","name":"Име","email":"Е-пошта","password":"Лозинка","householdName":"Семејство / домаќинство","register":"Регистрирај се","login":"Најави се"},"bs":{"familyAccount":"Porodični račun","name":"Ime","email":"E-mail","password":"Lozinka","householdName":"Porodica / domaćinstvo","register":"Registruj se","login":"Prijavi se"}}[k]));const t=I18N[lang]||I18N.de;document.documentElement.lang=lang;document.title=t.app;document.querySelectorAll('[data-t]').forEach(e=>{if(t[e.dataset.t])e.textContent=t[e.dataset.t]});document.querySelectorAll('[data-ph]').forEach(e=>{if(t[e.dataset.ph])e.placeholder=t[e.dataset.ph]})}
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('on',x.dataset.go===id));scrollTo(0,0)}
let shoppingItems=[];
async function loadShoppingList(){
 const e=document.getElementById('shopItems');if(!e)return;e.innerHTML='<div class="card muted">⏳ Po ngarkohet…</div>';
 try{const d=await apiPost('shoppingList',{});if(!d.ok)throw Error(d.error||'');shoppingItems=(d.data?.items||d.data||[]);renderShoppingList();}
 catch(err){shoppingItems=[];renderShoppingList('<div class="card muted">Lista është bosh. Shto produktin e parë.</div>');}
}
function renderShoppingList(emptyHtml){
 const e=document.getElementById('shopItems');if(!e)return;
 if(!shoppingItems.length){e.innerHTML=emptyHtml||'<div class="card muted">Lista është bosh.</div>';return}
 e.innerHTML=shoppingItems.map(x=>'<div class="card row"><input type="checkbox" '+(x.status==='done'?'checked':'')+' onchange="toggleShoppingItem(\''+esc(x.itemId||x.id||'')+'\',this.checked)"><div class="grow"><b>'+esc(x.Produkti||x.product||x.name||'')+'</b><div class="muted">'+esc(x.Sasia||x.quantity||1)+' '+esc(x['Njësia']||x.unit||'')+'</div></div><button class="chip" onclick="deleteShoppingItem(\''+esc(x.itemId||x.id||'')+'\')">🗑</button></div>').join('');
}
async function addShoppingManual(){const name=document.getElementById('shoppingAddName')?.value.trim(),qty=Number(document.getElementById('shoppingAddQty')?.value||1),unit=document.getElementById('shoppingAddUnit')?.value||'copë';if(!name)return alert(lang==='sq'?'Shkruaj emrin e produktit.':'Produktname eingeben.');try{const d=await apiPost('shoppingAdd',{product:name,quantity:qty,unit});if(!d.ok)throw Error(d.error||'Nuk u ruajt');document.getElementById('shoppingAddName').value='';await loadShoppingList()}catch(e){alert(e.message)}}
async function addShoppingItem(name){
 name=(name||'').trim();if(!name)return;
 const d=await apiPost('shoppingAdd',{product:name,quantity:1,unit:'Stück'});if(!d.ok)throw Error(d.error||'Nuk u ruajt');await loadShoppingList();
}
async function toggleShoppingItem(id,done){await apiPost('shoppingUpdate',{itemId:id,status:done?'done':'open'});await loadShoppingList()}
async function deleteShoppingItem(id){await apiPost('shoppingDelete',{itemId:id});await loadShoppingList()}
setTimeout(()=>{loadShoppingList()},700);
const offers=[];
document.getElementById('offerItems').innerHTML='<div class="card"><b>🏪 Dyqanet / Geschäfte</b><p class="muted">Ofertat reale do të shfaqen vetëm kur vijnë nga prospekti ose burimi i verifikuar i dyqanit.</p><div class="chips"><span class="chip">INCI • Speyerer Str. 35</span><span class="chip">Avantaj • Wormser Str. 93</span><span class="chip">Lidl</span><span class="chip">ALDI SÜD</span><span class="chip">Kaufland</span><span class="chip">REWE</span><span class="chip">Netto</span><span class="chip">EDEKA</span><span class="chip">PENNY</span><span class="chip">dm</span><span class="chip">Müller</span><span class="chip">Deichmann</span><span class="chip">Action</span></div></div><div id="verifiedOffers"></div>';
document.getElementById('stockItems').innerHTML='<div class="card muted">Inventari yt do të shfaqet këtu. Nuk përdoren produkte demo.</div>';
applyLang(); if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
if(localStorage.sessionToken){go('home')}else{go('auth')}

/* Weekly household checks — staples such as oil/salt */
const WEEKLY_CHECKS=[
 {key:'vaj',de:'Öl prüfen',sq:'Kontrollo vajin',en:'Check the oil',it:"Controlla l’olio",tr:'Yağı kontrol et',mk:'Провери го маслото',bs:'Provjeri ulje'},
 {key:'kripe',de:'Salz prüfen',sq:'Kontrollo kripën',en:'Check the salt',it:'Controlla il sale',tr:'Tuzu kontrol et',mk:'Провери ја солта',bs:'Provjeri so'}
];
function weeklyCheckDue(){
  const last=Number(localStorage.getItem('weeklyCheckLast')||0);
  return Date.now()-last>=7*24*60*60*1000;
}
function renderWeeklyChecks(){
  if(!weeklyCheckDue()) return;
  document.getElementById('weeklyCheckCard')?.remove(); const box=document.createElement('div'); box.className='card'; box.id='weeklyCheckCard';
  const title={sq:'Kontrolli javor',de:'Wöchentliche Kontrolle',en:'Weekly check',it:'Controllo settimanale',tr:'Haftalık kontrol',mk:'Неделна проверка',bs:'Sedmična kontrola'}[lang]||'Kontrolli javor';
  box.innerHTML='<b>🔔 '+title+'</b><div style="height:8px"></div>'+
    WEEKLY_CHECKS.map(x=>'<div class="row" style="padding:7px 0"><span>☐</span><span class="grow">'+(x[lang]||x.sq)+'</span></div>').join('')+
    '<button class="primary" onclick="completeWeeklyCheck()">'+({sq:'E kontrollova',de:'Geprüft',en:'Checked',it:'Controllato',tr:'Kontrol edildi',mk:'Проверено',bs:'Provjereno'}[lang]||'E kontrollova')+'</button>';
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

async function forgotPasswordUI(){try{const email=authEmail.value.trim();if(!email)throw Error(lang==='sq'?'Shkruaj emailin.':'Enter your email.');authMessage('…');const d=await apiPost('passwordResetRequest',{email});if(!d.ok)throw Error(d.error||'Reset failed');const x=d.data||d;document.getElementById('resetBox').style.display='block';if(x.resetToken)document.getElementById('resetToken').value=x.resetToken;authMessage(lang==='sq'?'✓ Kërkesa u pranua. Vendos fjalëkalimin e ri.':'✓ Reset request accepted. Set a new password.')}catch(e){authMessage(e.message,true)}}
async function confirmPasswordReset(){try{const token=document.getElementById('resetToken').value.trim(),password=document.getElementById('resetNewPass').value;if(!token)throw Error('Token mungon.');if(password.length<8)throw Error(lang==='sq'?'Fjalëkalimi duhet të ketë së paku 8 shenja.':'Password must have at least 8 characters.');authMessage('…');const d=await apiPost('passwordResetConfirm',{resetToken:token,password});if(!d.ok)throw Error(d.error||'Reset failed');document.getElementById('resetBox').style.display='none';authPass.value=password;authMessage(lang==='sq'?'✓ Fjalëkalimi u ndryshua. Tani shtyp Hyr.':'✓ Password changed. You can now sign in.')}catch(e){authMessage(e.message,true)}}

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
 const input=document.getElementById('receiptFile'),p=document.getElementById('receiptPreview'),file=input?.files?.[0];
 if(!file){p.innerHTML='<p class="muted">Zgjidh ose fotografo faturën.</p>';return}
 if(file.size>8*1024*1024){p.innerHTML='<p class="muted">Fotoja është shumë e madhe (max 8 MB).</p>';return}
 const dataUrl=await new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(file)});
 sessionStorage.setItem('receiptImage',dataUrl);
 p.innerHTML='<div class="card"><img src="'+dataUrl+'" style="width:100%;max-height:320px;object-fit:contain;border-radius:12px"><p><b>✓ Foto u mor</b></p><button class="primary" onclick="analyzeReceiptAI()">🤖 Analizo faturën me AI</button><div id="receiptStatus" class="muted"></div></div>';
}
async function analyzeReceiptAI(){
 const p=document.getElementById('receiptPreview'),s=document.getElementById('receiptStatus'),image=sessionStorage.getItem('receiptImage');
 if(!image)return;
 s.innerHTML='⏳ AI po lexon faturën…';
 try{
  const d=await apiPost('householdAI',{task:'receipt_scan',imageDataUrl:image,language:lang});
  if(!d.ok)throw Error(d.error||'AI-Auswertung fehlgeschlagen');
  const x=d.data||d,items=x.items||x.products||[];
  if(!items.length)throw Error('AI nuk gjeti produkte të lexueshme në faturë.');
  sessionStorage.setItem('receiptDraft',JSON.stringify(x));
  const rows=items.map((it,n)=>'<div class="card"><b>'+(n+1)+'. '+esc(it.name||it.product||'')+'</b><div class="muted">'+esc(String(it.quantity||it.qty||1))+' × '+esc(String(it.unitPrice||it.price||''))+' € · <b>'+esc(String(it.total||''))+' €</b></div></div>').join('');
  p.insertAdjacentHTML('beforeend','<div id="receiptAIResult"><h3>🧾 '+esc(x.store||'')+' · '+esc(x.date||'')+'</h3>'+rows+'<div class="card"><b>Total: '+esc(String(x.total||''))+' €</b></div><button class="primary" onclick="confirmReceiptAI()">✓ Konfirmo dhe ruaj</button></div>');
  s.innerHTML='✓ Kontrollo produktet para ruajtjes.';
 }catch(e){s.innerHTML='❌ '+esc(e.message);}
}
async function confirmReceiptAI(){
 const x=JSON.parse(sessionStorage.getItem('receiptDraft')||'null');if(!x)return;
 const p=document.getElementById('receiptPreview');let box=document.getElementById('receiptSaveStatus');if(!box){box=document.createElement('div');box.id='receiptSaveStatus';box.className='card';p.appendChild(box)}
 box.textContent='⏳ Po ruhet…';
 try{const d=await apiPost('confirmScan',{scan:x});if(!d.ok)throw Error(d.error||'Ruajtja dështoi');box.innerHTML='<b>✓ U ruajt.</b><div class="muted">Blerjet, inventari dhe financat u përditësuan.</div>';sessionStorage.removeItem('receiptDraft');}
 catch(e){box.textContent='❌ '+e.message}
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

const OFFER_COUNTRIES=['DE','IT','MK','CH'];
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
,
 {country:'IT',name:'Lidl Italia',url:'https://www.lidl.it/c/volantino-lidl/s10018048',mode:'prospekt',regional:true},
 {country:'IT',name:'ALDI Italia',url:'https://www.aldi.it/volantino-online',mode:'prospekt',regional:true},
 {country:'IT',name:'Coop',url:'https://www.coop.it/spesa-e-servizi',mode:'prospekt',regional:true},
 {country:'IT',name:'Iper La grande i',url:'https://www.iper.it/',mode:'prospekt',regional:true},
 {country:'IT',name:'Eurospin',url:'https://www.eurospin.it/volantino/',mode:'prospekt',regional:true},
 {country:'IT',name:'Conad',url:'https://www.conad.it/ricerca-negozi',mode:'prospekt',regional:true},
 {country:'IT',name:'IKEA Italia',url:'https://www.ikea.com/it/it/offers/',mode:'offers',regional:true},
 {country:'IT',name:'MediaWorld',url:'https://www.mediaworld.it/',mode:'offers',regional:true},
 {country:'IT',name:'JYSK Italia',url:'https://jysk.it/',mode:'offers',regional:true},
 {country:'MK',name:'Vero',url:'https://vero.com.mk/letoci/',mode:'prospekt',regional:true},
 {country:'MK',name:'Kiper',url:'https://kiper.mk/',mode:'offers',regional:true},
 {country:'MK',name:'Tinex',url:'https://www.tinex.com.mk/',mode:'prospekt',regional:true},
 {country:'MK',name:'Ramstore',url:'https://ramstore.com.mk/',mode:'prospekt',regional:true},
 {country:'MK',name:'KAM',url:'https://kam.com.mk/',mode:'offers',regional:true},
 {country:'MK',name:'Stokomak',url:'https://stokomak.com.mk/',mode:'offers',regional:true},
 {country:'MK',name:'JYSK Macedonia',url:'https://jysk.mk/',mode:'offers',regional:true},
 {country:'MK',name:'Setec',url:'https://setec.mk/',mode:'offers',regional:true},
 {country:'CH',name:'Coop',url:'https://www.coop.ch/de/aktionen.html',mode:'offers',regional:true},
 {country:'CH',name:'Migros',url:'https://www.migros.ch/de/offers-promotions.html',mode:'offers',regional:true},
 {country:'CH',name:'Denner',url:'https://www.denner.ch/de/aktionen',mode:'offers',regional:true},
 {country:'CH',name:'Lidl Schweiz',url:'https://www.lidl.ch/c/de-CH/werbeprospekte-als-pdf/s10019683',mode:'prospekt',regional:true},
 {country:'CH',name:'ALDI SUISSE',url:'https://www.aldi-suisse.ch/de/aktionen.html',mode:'offers',regional:true},
 {country:'CH',name:'SPAR',url:'https://www.spar.ch/',mode:'offers',regional:true},
 {country:'CH',name:"OTTO'S",url:'https://www.ottos.ch/',mode:'offers',regional:true},
 {country:'CH',name:'Interdiscount',url:'https://www.interdiscount.ch/de/cms/unternehmen/prospekt',mode:'prospekt',regional:true},
 {country:'CH',name:'MediaMarkt Schweiz',url:'https://www.mediamarkt.ch/',mode:'offers',regional:true},
 {country:'CH',name:'JUMBO',url:'https://www.jumbo.ch/',mode:'offers',regional:true},
 {country:'CH',name:'LANDI',url:'https://www.landi.ch/',mode:'offers',regional:true},
 {country:'CH',name:'IKEA Schweiz',url:'https://www.ikea.com/ch/de/offers/',mode:'offers',regional:true},
 {country:'CH',name:'JYSK Schweiz',url:'https://jysk.ch/de/angebote',mode:'offers',regional:true},
 {country:'CH',name:'Conforama Schweiz',url:'https://www.conforama.ch/',mode:'offers',regional:true},
 {country:'CH',name:'Möbel Pfister',url:'https://www.pfister.ch/',mode:'offers',regional:true},
 {country:'CH',name:'Coop City',url:'https://www.coop-city.ch/',mode:'offers',regional:true}
];
function countryCode(){return (localStorage.getItem('offerCountry')||'DE').toUpperCase()}
function offerCountryName(c){return ({DE:'Deutschland / Gjermani',CH:'Schweiz / Zvicër',IT:'Italia',MK:'Северна Македонија',TR:'Türkiye',RS:'Srbija',HR:'Hrvatska',AT:'Österreich',BA:'Bosna i Hercegovina',XK:'Kosovë',AL:'Shqipëri',SI:'Slovenija'})[c]||c}
function detectOfferCountryByGPS(){
 const e=document.getElementById('verifiedOffers');if(e)e.innerHTML='<div class="card">📍 Po kërkoj vendndodhjen… / Standort wird ermittelt…</div>';
 if(!navigator.geolocation){renderOfferSources();return}
 navigator.geolocation.getCurrentPosition(async p=>{try{
  const r=await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+p.coords.latitude+'&lon='+p.coords.longitude+'&zoom=10',{headers:{'Accept-Language':'de'}});
  const j=await r.json(),c=(j.address?.country_code||'DE').toUpperCase(),city=j.address?.city||j.address?.town||j.address?.village||j.address?.county||'';
  localStorage.setItem('offerCountry',c);localStorage.setItem('offerCity',city);renderOfferSources();
 }catch(err){renderOfferSources()}
 },()=>renderOfferSources(),{enableHighAccuracy:true,timeout:12000,maximumAge:300000});
}
function renderOfferSources(){
 const e=document.getElementById('verifiedOffers');if(!e)return;const c=countryCode(),city=localStorage.getItem('offerCity')||'',src=OFFER_SOURCES.filter(x=>x.country===c);
 e.innerHTML='<div class="card"><b>📍 '+offerCountryName(c)+(city?' · '+city:'')+'</b><div class="muted">Prospektet sipas vendndodhjes / Angebote nach Standort</div><button class="chip" style="margin-top:8px" onclick="detectOfferCountryByGPS()">📍 GPS aktualisieren</button></div><div class="section"><h3>📚 Prospekte & Angebote</h3></div>'+
 (src.length?src.map(x=>'<div class="card row"><div class="grow"><b>'+x.name+'</b><div class="muted">'+(x.regional?'Filiale/Region auswählen':'Landesweite Angebote')+'</div></div><button class="chip" onclick="window.open(\''+x.url+'\',\'_blank\')">Prospekt ↗</button></div>').join(''):'<div class="card">Nuk ka ende burime për këtë shtet.</div>');
}
setTimeout(detectOfferCountryByGPS,500);

let productLevel='full',productUsage='normal';
function setProductLevel(v){productLevel=v;document.querySelectorAll('#stock .chips:first-of-type .chip').forEach(b=>b.classList.remove('on'));event?.target?.classList.add('on')}
function setProductUsage(v){productUsage=v;event?.target?.classList.add('on')}
document.addEventListener('change',e=>{if(e.target.id==='prodPhoto'&&e.target.files?.[0]){const r=new FileReader();r.onload=()=>document.getElementById('prodPhotoPreview').innerHTML='<img src="'+r.result+'" style="width:100%;max-height:220px;object-fit:contain;border-radius:14px;margin-top:10px">';r.readAsDataURL(e.target.files[0])}});
function saveManualProduct(){
 const name=document.getElementById('prodName')?.value.trim();if(!name)return alert('Shkruaj emrin e produktit / Produktname eingeben');
 const item={id:'p_'+Date.now(),name,level:productLevel,usage:productUsage,qty:Number(document.getElementById('prodQty')?.value||1),unit:document.getElementById('prodUnit')?.value||'Stück',photo:document.querySelector('#prodPhotoPreview img')?.src||'',createdAt:new Date().toISOString()};
 const arr=JSON.parse(localStorage.getItem('manualProductsV1')||'[]');arr.unshift(item);localStorage.setItem('manualProductsV1',JSON.stringify(arr));renderManualProducts();document.getElementById('prodName').value='';document.getElementById('prodPhotoPreview').innerHTML='';
}
function renderManualProducts(){const e=document.getElementById('stockItems');if(!e)return;const arr=JSON.parse(localStorage.getItem('manualProductsV1')||'[]');const L={full:'🟢 Plot/Voll',half:'🟡 Gjysmë/Halb',low:'🔴 Pak/Wenig',empty:'⚫ Bosh/Leer'},U={frequent:'⚡ Shpesh/Häufig',normal:'↔ Normal',rare:'🐢 Rrallë/Selten'};e.innerHTML=arr.map(x=>'<div class="card row">'+(x.photo?'<img src="'+x.photo+'" style="width:64px;height:64px;object-fit:cover;border-radius:12px">':'📦')+'<div class="grow"><b>'+x.name+'</b><div class="muted">'+L[x.level]+' • '+U[x.usage]+' • '+x.qty+' '+x.unit+'</div></div></div>').join('')}
setTimeout(renderManualProducts,600);
