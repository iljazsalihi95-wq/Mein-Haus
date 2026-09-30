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

let lang=localStorage.getItem('lang')||'sq';
function setLang(l){if(!SUPPORTED.includes(l))return;lang=l;localStorage.setItem('lang',l);localStorage.setItem('languageManual','1');applyLang();renderWeeklyChecks();renderAppointments();renderManualProducts();renderOfferSources()} function applyLang(){Object.keys({"de":{"familyAccount":"Familienkonto","name":"Name","email":"E-Mail","password":"Passwort","householdName":"Familienname / Haushalt","register":"Registrieren","login":"Anmelden"},"sq":{"familyAccount":"Llogaria familjare","name":"Emri","email":"E-mail","password":"Fjalëkalimi","householdName":"Emri i familjes / Shtëpisë","register":"Regjistrohu","login":"Hyr"},"en":{"familyAccount":"Family account","name":"Name","email":"Email","password":"Password","householdName":"Family / household name","register":"Register","login":"Sign in"},"it":{"familyAccount":"Account famiglia","name":"Nome","email":"E-mail","password":"Password","householdName":"Famiglia / casa","register":"Registrati","login":"Accedi"},"tr":{"familyAccount":"Aile hesabı","name":"Ad","email":"E-posta","password":"Şifre","householdName":"Aile / ev adı","register":"Kayıt ol","login":"Giriş yap"},"mk":{"familyAccount":"Семејна сметка","name":"Име","email":"Е-пошта","password":"Лозинка","householdName":"Семејство / домаќинство","register":"Регистрирај се","login":"Најави се"},"bs":{"familyAccount":"Porodični račun","name":"Ime","email":"E-mail","password":"Lozinka","householdName":"Porodica / domaćinstvo","register":"Registruj se","login":"Prijavi se"}}).forEach(k=>Object.assign(I18N[k],{"de":{"familyAccount":"Familienkonto","name":"Name","email":"E-Mail","password":"Passwort","householdName":"Familienname / Haushalt","register":"Registrieren","login":"Anmelden"},"sq":{"familyAccount":"Llogaria familjare","name":"Emri","email":"E-mail","password":"Fjalëkalimi","householdName":"Emri i familjes / Shtëpisë","register":"Regjistrohu","login":"Hyr"},"en":{"familyAccount":"Family account","name":"Name","email":"Email","password":"Password","householdName":"Family / household name","register":"Register","login":"Sign in"},"it":{"familyAccount":"Account famiglia","name":"Nome","email":"E-mail","password":"Password","householdName":"Famiglia / casa","register":"Registrati","login":"Accedi"},"tr":{"familyAccount":"Aile hesabı","name":"Ad","email":"E-posta","password":"Şifre","householdName":"Aile / ev adı","register":"Kayıt ol","login":"Giriş yap"},"mk":{"familyAccount":"Семејна сметка","name":"Име","email":"Е-пошта","password":"Лозинка","householdName":"Семејство / домаќинство","register":"Регистрирај се","login":"Најави се"},"bs":{"familyAccount":"Porodični račun","name":"Ime","email":"E-mail","password":"Lozinka","householdName":"Porodica / domaćinstvo","register":"Registruj se","login":"Prijavi se"}}[k]));const t=I18N[lang]||I18N.de;document.documentElement.lang=lang;document.title=t.app;document.querySelectorAll('[data-t]').forEach(e=>{if(t[e.dataset.t])e.textContent=t[e.dataset.t]});document.querySelectorAll('[data-ph]').forEach(e=>{if(t[e.dataset.ph])e.placeholder=t[e.dataset.ph]})}
function restorePreferredLanguage(){const saved=localStorage.getItem('lang');if(saved&&SUPPORTED.includes(saved)){lang=saved}else{lang='sq';localStorage.setItem('lang','sq')}applyLang()}
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('on',x.dataset.go===id));applyLang();scrollTo(0,0)}
let shoppingItems=[];
async function loadShoppingList(){
 const e=document.getElementById('shopItems');if(!e)return;e.innerHTML='<div class="card muted">Po ngarkohet…</div>';
 try{const [d,p]=await Promise.all([apiPost('shoppingList',{}),apiPost('purchaseList',{}).catch(()=>({ok:false}))]);if(!d.ok)throw Error(d.error||'');{const raw=d.data?.items||d.data||[];shoppingItems=Array.isArray(raw)?raw:[];const pr=p&&p.ok?(p.data?.items||p.data||[]):[];if(Array.isArray(pr))shoppingItems=[...pr,...shoppingItems];}try{const rp=JSON.parse(localStorage.getItem('meinHausReceiptPurchases')||'[]');const ids=new Set(shoppingItems.map(x=>String(x.ID||x.id||'')));shoppingItems=[...rp.filter(x=>!ids.has(String(x.ID||x.id||''))),...shoppingItems]}catch(e){}renderShoppingList();refreshHomeRealData();}
 catch(err){e.innerHTML='<div class="card muted">Nuk u lidh me serverin. Provo përsëri.</div>';}
}
function renderShoppingList(){
 const e=document.getElementById('shopItems');if(!e)return;
 if(!shoppingItems.length){e.innerHTML='<div class="card muted">Nuk ka blerje të regjistruara.</div>';return}
 e.innerHTML=shoppingItems.map(x=>'<div class="card"><div class="row"><div class="grow"><b>'+esc(x.Produkti||x.product||x.name||'')+'</b><div class="muted">'+esc(x.date||x.Data||'')+' · '+esc(x.store||x.Dyqani||'')+'</div></div><b>'+esc(String(x.total||x.Totali||x.price||''))+(x.total||x.Totali||x.price?' €':'')+'</b></div><div class="muted">'+esc(x.description||x.Pershkrimi||'')+'</div></div>').join('');
}
function calcPurchaseTotal(){const q=Number(document.getElementById('shoppingAddQty')?.value||1),p=Number(document.getElementById('shoppingAddPrice')?.value||0),t=document.getElementById('shoppingAddTotal');if(t)t.value=(q*p).toFixed(2)}
async function addShoppingManual(){
 const v=id=>document.getElementById(id),name=v('shoppingAddName')?.value.trim();if(!name)return alert('Shkruaj produktin.');
 const payload={product:name,date:v('shoppingAddDate')?.value||new Date().toISOString().slice(0,10),store:v('shoppingAddStore')?.value.trim()||'',description:v('shoppingAddDescription')?.value.trim()||'',category:v('shoppingAddCategory')?.value||'',quantity:Number(v('shoppingAddQty')?.value||1),unit:v('shoppingAddUnit')?.value||'copë',unitPrice:Number(v('shoppingAddPrice')?.value||0),total:Number(v('shoppingAddTotal')?.value||0),paymentMethod:v('shoppingAddPayment')?.value||'cash'};
 try{const d=await apiPost('shoppingAdd',payload);if(!d.ok)throw Error(d.error||'Nuk u ruajt');['shoppingAddName','shoppingAddStore','shoppingAddDescription','shoppingAddPrice','shoppingAddTotal'].forEach(id=>{if(v(id))v(id).value=''});await loadShoppingList()}catch(e){alert('Lidhja me serverin dështoi: '+e.message)}
}
const FAMILY_KEY='meinHausFamilyMembers';
function getFamily(){try{return JSON.parse(localStorage.getItem(FAMILY_KEY)||'[]')}catch(e){return []}}
function familyDedup(a){const seen=new Set();return a.filter(x=>{const k=(String(x.first||'').trim()+'|'+String(x.last||'').trim()+'|'+String(x.relation||'').trim()).toLowerCase();if(!k||seen.has(k))return false;seen.add(k);return true})}
async function loadFamilyReal(){try{const d=await apiPost('members',{});if(d.ok){const remote=familyDedup((d.data||[]).map(x=>({id:String(x.memberId||x.userId||''),first:x.firstName||String(x.displayName||'').split(' ')[0]||'',last:x.lastName||String(x.displayName||'').split(' ').slice(1).join(' '),relation:x.relation||x.role||'',birth:x.birthDate||''})));const local=getFamily();const a=familyDedup([...remote,...local]);localStorage.setItem(FAMILY_KEY,JSON.stringify(a));renderFamily();refreshFinanceMemberOptions()}}catch(e){renderFamily()}}
async function saveFamilyMember(){const f=document.getElementById('famFirst')?.value.trim(),l=document.getElementById('famLast')?.value.trim();if(!f)return alert('Shkruaj emrin.');const fam=getFamily();if(fam.some(x=>(x.first+' '+x.last).trim().toLowerCase()===(f+' '+l).trim().toLowerCase()))return alert('Ky anëtar ekziston tashmë.');try{let d=await apiPost('memberSave',{firstName:f,lastName:l,relation:document.getElementById('famRelation')?.value||'',birthDate:document.getElementById('famBirth')?.value||''});if(!d.ok&&/Action e panjohur:\s*memberSave/i.test(d.error||''))d=await apiPost('familyMemberSave',{firstName:f,lastName:l,relation:document.getElementById('famRelation')?.value||'',birthDate:document.getElementById('famBirth')?.value||''});if(!d.ok)throw Error(d.error||'Nuk u ruajt');await loadFamilyReal()}catch(e){alert('Nuk u ruajt anëtari: '+e.message)}}
function refreshFinanceMemberOptions(){const sel=document.getElementById('finMember');if(!sel)return;const cur=sel.value;sel.innerHTML='<option value="">Familja / e përbashkët</option>'+getFamily().map(x=>'<option value="'+esc(x.id)+'">'+esc(x.first+' '+x.last)+'</option>').join('');sel.value=cur}
function editFamilyMember(k){const fam=getFamily(),m=fam.find(x=>String(x.id||'')===String(k));if(!m)return;const f=prompt('Emri',m.first||'');if(f===null)return;const l=prompt('Mbiemri',m.last||'');if(l===null)return;m.first=f.trim()||m.first;m.last=l.trim();localStorage.setItem(FAMILY_KEY,JSON.stringify(familyDedup(fam)));renderFamily();refreshFinanceMemberOptions()}
function addMemberExpense(k){const m=getFamily().find(x=>String(x.id||'')===String(k));if(!m)return;const d=prompt('Përshkrimi i harxhimit','');if(!d)return;const a=Number(String(prompt('Shuma €','')).replace(',','.'));if(!a||a<=0)return;const rows=getFinanceEntries();rows.push({id:'local_'+Date.now(),date:new Date().toISOString().slice(0,10),type:'expense',payment:'cash',memberId:m.id,description:d.trim(),category:'Harxhim personal',amount:a});localStorage.setItem(FIN_KEY,JSON.stringify(dedupeFinance(rows)));renderFinance();renderFamily()}
function renderFamily(){const fam=familyDedup(getFamily()),rows=getFinanceEntries(),box=document.getElementById('familyMembers');if(!box)return;localStorage.setItem(FAMILY_KEY,JSON.stringify(fam));const shared=rows.filter(x=>!x.memberId),inc=shared.filter(x=>x.type==='income').reduce((a,x)=>a+x.amount,0),exp=shared.filter(x=>x.type==='expense').reduce((a,x)=>a+x.amount,0);document.getElementById('famIncome').textContent=money(inc);document.getElementById('famExpense').textContent=money(exp);document.getElementById('famBalance').textContent='Gjendja e shtëpisë: '+money(inc-exp);box.innerHTML=fam.length?fam.map(m=>{const rr=rows.filter(x=>x.memberId&&String(x.memberId)===String(m.id)),i=rr.filter(x=>x.type==='income').reduce((a,x)=>a+x.amount,0),e=rr.filter(x=>x.type==='expense').reduce((a,x)=>a+x.amount,0),k=String(m.id).replace(/'/g,"\\'");return '<div class="card"><b>'+esc(m.first+' '+m.last)+'</b><div class="muted">'+esc(m.relation)+(m.birth?' · '+esc(m.birth):'')+'</div><div class="row" style="margin-top:8px"><span>Hyrje <b>'+money(i)+'</b></span><span>Dalje <b>'+money(e)+'</b></span></div><div class="muted">Bilanci personal: '+money(i-e)+'</div><div class="row" style="margin-top:10px"><button class="chip" onclick="editFamilyMember(\''+k+'\')">✏️ Edito</button><button class="chip" onclick="addMemberExpense(\''+k+'\')">💶 Harxhim personal</button></div></div>'}).join(''):'<div class="card muted">Nuk ka anëtarë të regjistruar.</div>';refreshFinanceMemberOptions()}
const FIN_KEY='meinHausFinanceEntries';
function getFinanceEntries(){try{return JSON.parse(localStorage.getItem(FIN_KEY)||'[]')}catch(e){return []}}
function financeKey(x){return String(x.id||'')||[x.date,x.type,x.payment,x.description,x.category,Number(x.amount||0).toFixed(2)].join('|')}
function dedupeFinance(rows){const seen=new Set();return rows.filter(x=>{const k=financeKey(x);if(seen.has(k))return false;seen.add(k);return true})}
function editFinanceLocal(k){const rows=getFinanceEntries(),x=rows.find(r=>financeKey(r)===k);if(!x)return;const d=prompt('Përshkrimi',x.description);if(d===null)return;const a=prompt('Shuma €',String(x.amount));if(a===null||!Number(a))return;x.description=d.trim()||x.description;x.amount=Number(a);localStorage.setItem(FIN_KEY,JSON.stringify(rows));renderFinance()}
function deleteFinanceLocal(k){if(!confirm('Ta fshij këtë transaksion nga pamja?'))return;const rows=getFinanceEntries().filter(r=>financeKey(r)!==k);localStorage.setItem(FIN_KEY,JSON.stringify(rows));renderFinance()}
async function loadFinanceReal(){try{const d=await apiPost('financeList',{});if(d.ok){const a=(d.data||[]).map(x=>({id:x.ID||x.id,date:x.Data||x.date||'',type:String(x.Lloji||x.type||'dalje').toLowerCase()==='hyrje'?'income':'expense',payment:x.paymentMethod||x.payment||'cash',memberId:String(x.memberId||''),description:x['Përshkrimi']||x.description||'',category:x.Kategoria||x.category||'Tjetër',amount:Number(x.Shuma||x.amount||0)}));const clean=dedupeFinance(a);localStorage.setItem(FIN_KEY,JSON.stringify(clean));renderFinance();renderFamily()}}catch(e){}}
function money(v){return Number(v||0).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €'}
function refreshHomeRealData(){const open=(shoppingItems||[]).filter(x=>String(x.status||'open').toLowerCase()!=='done');const pc=document.getElementById('homePurchaseCount');if(pc)pc.textContent=open.length+' në listë';const today=document.getElementById('homeShoppingToday');if(today)today.innerHTML=open.length?open.slice(0,8).map(x=>'🛒 '+esc(x.Produkti||x.product||x.name||'')+(Number(x.Sasia||x.quantity||0)>1?' × '+Number(x.Sasia||x.quantity):'')).join('<br>'):'Nuk ka produkte në listën e blerjeve.';const sc=document.getElementById('homeStockCount');if(sc)sc.textContent=(typeof manualProducts!=='undefined'?manualProducts.length:0)+' produkte';const rows=getFinanceEntries(),bal=rows.reduce((a,x)=>a+(x.type==='income'?x.amount:-x.amount),0),fs=document.getElementById('homeFinanceSummary');if(fs)fs.textContent=money(bal);const rs=document.getElementById('homeRealSummary');if(rs)rs.textContent='Inventari: '+(typeof manualProducts!=='undefined'?manualProducts.length:0)+' produkte · Gjendja financiare: '+money(bal)}
function renderFinance(){
 const rows=getFinanceEntries(),inc=rows.filter(x=>x.type==='income').reduce((a,x)=>a+x.amount,0),exp=rows.filter(x=>x.type==='expense').reduce((a,x)=>a+x.amount,0);
 const cash=rows.filter(x=>x.payment==='cash').reduce((a,x)=>a+(x.type==='income'?x.amount:-x.amount),0),bank=rows.filter(x=>x.payment==='bank').reduce((a,x)=>a+(x.type==='income'?x.amount:-x.amount),0);
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};set('finIncome',money(inc));set('finExpense',money(exp));set('finBalance',money(inc-exp));set('finCash','Cash '+money(cash));set('finBank','Bankë '+money(bank));refreshHomeRealData();
 const box=document.getElementById('financeItems');if(!box)return;if(!rows.length){box.innerHTML='<div class="card muted">Nuk ka transaksione të regjistruara.</div>';return}
 box.innerHTML=rows.slice().reverse().map(x=>{const k=financeKey(x).replace(/\\/g,'\\\\').replace(/'/g,"\\'");return '<div class="card"><div class="row"><div class="grow"><b>'+esc(x.description)+'</b><div class="muted">'+esc(x.date)+' · '+esc(x.category)+' · '+(x.payment==='bank'?'Bankë/Kartë':'Cash')+'</div></div><b>'+(x.type==='income'?'+':'−')+money(x.amount)+'</b></div><div class="row" style="margin-top:8px"><button class="chip" onclick="editFinanceLocal(\''+k+'\')">✏️ Edito</button><button class="chip" onclick="deleteFinanceLocal(\''+k+'\')">🗑 Fshi</button></div></div>'}).join('');
}
async function saveFinanceEntry(){
 const g=id=>document.getElementById(id),amount=Number(g('finAmount')?.value||0),description=g('finDescription')?.value.trim()||'';if(!description||amount<=0)return alert('Plotëso përshkrimin dhe shumën.');
 try{const payload={date:g('finDate')?.value||new Date().toISOString().slice(0,10),type:g('finType')?.value||'expense',paymentMethod:g('finPayment')?.value||'cash',memberId:g('finMember')?.value||'',description,category:g('finCategory')?.value||'Tjetër',amount};const d=await apiPost('financeSave',payload);if(!d.ok)throw Error(d.error||'Nuk u ruajt');await loadFinanceReal();g('finDescription').value='';g('finAmount').value=''}catch(e){alert('Nuk u ruajt transaksioni: '+e.message)}
}
setTimeout(()=>{const d=new Date().toISOString().slice(0,10);if(document.getElementById('finDate'))document.getElementById('finDate').value=d;if(document.getElementById('shoppingAddDate'))document.getElementById('shoppingAddDate').value=d;renderFinance()},350);
async function addShoppingItem(name){name=(name||'').trim();if(!name)return;const d=await apiPost('shoppingAdd',{product:name,quantity:1,unit:'copë',date:new Date().toISOString().slice(0,10)});if(!d.ok)throw Error(d.error||'Nuk u ruajt');await loadShoppingList();}
async function toggleShoppingItem(id,done){await apiPost('shoppingUpdate',{itemId:id,status:done?'done':'open'});await loadShoppingList()}
async function deleteShoppingItem(id){await apiPost('shoppingDelete',{itemId:id});await loadShoppingList()}
setTimeout(()=>{loadShoppingList()},700);
let LIVE_OFFERS=[];let offerSlide=0;
function offerCard(x,big=false){const n=String(x.name||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");return '<div class="card '+(big?'offerHero':'')+'"><div class="row"><div class="grow"><div class="badge ok">'+esc(x.store)+' · '+esc(x.discount)+'</div><h3 style="margin:10px 0 2px">'+esc(x.name)+'</h3><div class="muted">'+esc(x.size)+'</div></div><div style="text-align:right">'+(x.old?'<div class="old">'+esc(x.old)+'</div>':'')+'<div class="price">'+esc(x.price)+'</div></div></div><div class="muted" style="margin-top:10px">📅 '+esc(x.from)+(x.to?' – '+esc(x.to):'')+'</div><div class="row" style="margin-top:10px"><button class="chip" onclick="addShoppingItem(\''+n+'\')">🛒 Shto në listë</button><button class="chip" onclick="window.open(\''+x.url+'\',\'_blank\')">📖 Prospekti</button></div></div>'}
let offerStoreFilter='';
function setOfferStore(s){offerStoreFilter=s||'';renderOffers()}
function openProspect(name){const s=OFFER_SOURCES.find(x=>x.country===countryCode()&&x.name===name);if(!s||!s.url)return alert(lang==='sq'?'Prospekti nuk është konfiguruar.':'Prospekt nicht konfiguriert.');window.open(s.url,'_blank')}
function renderOffers(){
 const root=document.getElementById('offerItems');if(!root)return;
 const q=(document.getElementById('offerSearch')?.value||'').toLowerCase();
 const filtered=LIVE_OFFERS.filter(x=>(!offerStoreFilter||String(x.store).toLowerCase().includes(offerStoreFilter.toLowerCase()))&&(x.store+' '+x.name+' '+x.size).toLowerCase().includes(q));
 if(!filtered.length){root.innerHTML='<div class="card muted">Nuk u gjet ofertë.</div>';return}
 offerSlide%=filtered.length;
 root.innerHTML='<div class="muted" style="margin:8px 2px">🔥 '+(lang==='sq'?'Ofertat interesante të verifikuara':'Verifizierte interessante Angebote')+'</div><div id="offerSlider">'+offerCard(filtered[offerSlide],true)+'</div><div class="section"><h3>'+(lang==='sq'?'Të gjitha ofertat':'Alle Angebote')+'</h3></div>'+filtered.map(x=>offerCard(x)).join('');
}
function nextOfferSlide(){const q=(document.getElementById('offerSearch')?.value||'').toLowerCase();const a=LIVE_OFFERS.filter(x=>(x.store+' '+x.name+' '+x.size).toLowerCase().includes(q));if(!a.length)return;offerSlide=(offerSlide+1)%a.length;const e=document.getElementById('offerSlider');if(e)e.innerHTML=offerCard(a[offerSlide],true)}
setInterval(nextOfferSlide,4500);
async function loadOffersReal(){const root=document.getElementById('offerItems');if(root)root.innerHTML='<div class="card muted">Po ngarkohen ofertat reale për Frankenthal…</div>';try{const d=await apiPost('offersList',{country:countryCode(),city:localStorage.getItem('offerCity')||'Frankenthal',postalCode:'67227',active:true});if(d&&d.ok){const x=d.data||d;LIVE_OFFERS=(x.items||x.offers||[]).map(o=>({store:o.store||o.Dyqani||'',name:o.name||o.product||o.Produkti||'',size:o.size||o.unit||o.Njësia||'',old:o.oldPrice||o.normalPrice||o['Çmimi normal']||'',price:o.price||o.offerPrice||o['Çmimi ofertë']||'',discount:o.discount||'',from:o.from||o['Nga data']||'',to:o.to||o['Deri data']||'',image:o.image||o.imageUrl||o['Foto URL']||'',url:o.url||o.link||o['Link oferta']||''})).filter(o=>o.name&&o.price)}}catch(e){}renderOffers()}setTimeout(loadOffersReal,300);
document.getElementById('stockItems').innerHTML='<div class="card muted">Inventari yt do të shfaqet këtu. Nuk përdoren produkte demo.</div>';
applyLang(); if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
restorePreferredLanguage();const rememberedEmail=localStorage.getItem('rememberedEmail');if(rememberedEmail&&document.getElementById('authEmail'))document.getElementById('authEmail').value=rememberedEmail;const savedToken=localStorage.getItem('sessionToken');if(savedToken){go('home');setTimeout(()=>{loadFamilyReal();loadFinanceReal();loadBillsReal();loadShoppingList();loadOffersReal()},250)}else{go('auth')}

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

const BILL_KEY='meinHausBills';function getBills(){try{return JSON.parse(localStorage.getItem(BILL_KEY)||'[]')}catch(e){return []}}async function saveBill(){const n=document.getElementById('billName')?.value.trim(),a=Number(document.getElementById('billAmount')?.value||0);if(!n||a<=0)return alert('Plotëso emrin dhe shumën.');try{const d=await apiPost('billSave',{name:n,amount:a,dueDate:document.getElementById('billDue')?.value||'',category:document.getElementById('billCategory')?.value||'Tjetër'});if(!d.ok)throw Error(d.error||'Nuk u ruajt');await loadBillsReal()}catch(e){alert('Nuk u ruajt fatura: '+e.message)}}async function loadBillsReal(){try{const d=await apiPost('billList',{});if(d.ok){const a=(d.data||[]).map(x=>({id:x.billId||x.id,name:x.name||'',amount:Number(x.amount||0),due:x.dueDate||'',category:x.category||'Tjetër'}));localStorage.setItem(BILL_KEY,JSON.stringify(a));renderBills()}}catch(e){}}
function renderBills(){const e=document.getElementById('billItems');if(!e)return;const x=getBills();e.innerHTML=x.length?x.map(b=>'<div class="card row"><div class="grow"><b>'+esc(b.name)+'</b><div class="muted">'+esc(b.category)+' · '+esc(b.due)+'</div></div><b>'+money(b.amount)+'</b></div>').join(''):'<div class="card muted">Nuk ka fatura të regjistruara.</div>'}setTimeout(renderBills,400);
function aiBubble(text,who='ai'){const box=document.getElementById('aiChat');if(!box)return;const d=document.createElement('div');d.className=who==='user'?'user':'ai';d.textContent=(who==='ai'?'AI · ':'')+text;box.appendChild(d);d.scrollIntoView({behavior:'smooth',block:'end'})}
async function sendHouseAI(){
 const input=document.getElementById('aiInput'),q=input?.value.trim();if(!q)return;aiBubble(q,'user');input.value='';aiBubble('Po analizoj të dhënat e shtëpisë…','ai');
 const box=document.getElementById('aiChat'),loading=box?.lastElementChild;
 try{
  const context={finance:getFinanceEntries().slice(-50),shopping:shoppingItems.slice(-50),inventory:(typeof inventoryItems!=='undefined'?inventoryItems:[]).slice(-100),family:getFamily().slice(-30),bills:getBills().slice(-30),receiptDraft:JSON.parse(sessionStorage.getItem('receiptDraft')||'null'),language:lang,app:'Shtëpia Ime / Mein Haus'};
  const systemInstruction='Ti je asistenti i integruar i aplikacionit Shtëpia Ime / Mein Haus. Çdo pyetje për kassenbon/faturë, Blerjet, Inventarin, Financat, Familjen, ofertat ose ruajtjen i referohet këtij aplikacioni dhe të dhënave në context, përveç kur përdoruesi thotë shprehimisht ndryshe. Mos shpik arsye për personel, dyqan, mungesë hapësire apo procese jashtë aplikacionit. Kur një veprim nuk është kryer, thuaj konkretisht çfarë tregon context-i dhe çfarë moduli/action-i i aplikacionit lidhet me të. Përgjigju në gjuhën e zgjedhur nga përdoruesi.';
  const d=await apiPost('householdAI',{task:'chat',message:q,question:q,language:lang,systemInstruction,context});
  if(loading)loading.remove();if(!d.ok)throw Error(d.error||'Asistenti nuk u përgjigj.');
  const x=d.data||d,answer=x.answer||x.reply||x.text||x.message;if(!answer)throw Error('Nuk erdhi përgjigje nga AI.');aiBubble(answer,'ai');
 }catch(e){if(loading)loading.remove();aiBubble('Gabim në lidhjen me AI: '+e.message,'ai')}
}
async function apiPost(action,payload={}){const body={action,...payload};const token=localStorage.sessionToken;if(token)body.token=token;const r=await fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)});return r.json();}
function authMessage(m,bad=false){const e=document.getElementById('authMsg');if(e){e.textContent=m;e.style.color=bad?'#c12626':'#11834f'}}
async function registerUser(){try{authMessage('…');const d=await apiPost('register',{displayName:authName.value.trim(),email:authEmail.value.trim(),password:authPass.value,householdName:houseName.value.trim(),language:lang});if(!d.ok)throw Error(d.error||'Registrierung fehlgeschlagen');const x=d.data||d;if(x.token)localStorage.sessionToken=x.token;authMessage('✓ Konto erstellt');go('home')}catch(e){authMessage(e.message,true)}}
async function loginUser(){const email=document.getElementById('authEmail')?.value.trim()||'',password=document.getElementById('authPass')?.value||'';try{if(!email||!password)throw Error(lang==='sq'?'Shkruaj emailin dhe fjalëkalimin.':'E-Mail und Passwort eingeben.');authMessage('…');const d=await apiPost('login',{email,password});if(!d||!d.ok)throw Error(d?.error||(lang==='sq'?'Hyrja dështoi.':'Anmeldung fehlgeschlagen.'));const x=d.data||d;if(!x.token)throw Error(lang==='sq'?'Serveri nuk ktheu sesion.':'Keine Sitzung vom Server.');localStorage.setItem('sessionToken',x.token);localStorage.setItem('rememberedEmail',email);authMessage(lang==='sq'?'✓ U kyçe':'✓ Angemeldet');go('home');setTimeout(()=>{loadFamilyReal();loadFinanceReal();loadBillsReal();loadShoppingList();loadOffersReal()},100)}catch(e){authMessage(e.message,true)}}

async function forgotPasswordUI(){try{const email=authEmail.value.trim();if(!email)throw Error(lang==='sq'?'Shkruaj emailin.':'Enter your email.');authMessage('…');const d=await apiPost('passwordResetRequest',{email});if(!d.ok)throw Error(d.error||'Reset failed');const x=d.data||d;document.getElementById('resetBox').style.display='block';if(x.resetToken)document.getElementById('resetToken').value=x.resetToken;authMessage(lang==='sq'?'✓ Kërkesa u pranua. Vendos fjalëkalimin e ri.':'✓ Reset request accepted. Set a new password.')}catch(e){authMessage(e.message,true)}}
async function confirmPasswordReset(){try{const token=document.getElementById('resetToken').value.trim(),password=document.getElementById('resetNewPass').value;if(!token)throw Error('Token mungon.');if(password.length<8)throw Error(lang==='sq'?'Fjalëkalimi duhet të ketë së paku 8 shenja.':'Password must have at least 8 characters.');authMessage('…');const d=await apiPost('passwordResetConfirm',{resetToken:token,password});if(!d.ok)throw Error(d.error||'Reset failed');document.getElementById('resetBox').style.display='none';authPass.value=password;authMessage(lang==='sq'?'✓ Fjalëkalimi u ndryshua. Tani shtyp Hyr.':'✓ Password changed. You can now sign in.')}catch(e){authMessage(e.message,true)}}

const APPOINTMENT_KEY='familyAppointmentsV1';
const SHEET_APPOINTMENTS=[
 {id:'apt_20261008_ilaz',first:'Ilaz',last:'Salihi',date:'2026-10-08',time:'07:30',place:'Te Doktori Sheqerit Analizat'},
 {id:'apt_20261013_ilaz',first:'Ilaz',last:'Salihi',date:'2026-10-13',time:'08:00',place:'Te Doktori Sheqerit Analizat'},
 {id:'apt_20261015_sufjan',first:'Sufjan',last:'Salihi',date:'2026-10-15',time:'08:00',place:'Doktor Maura Analizat'},
 {id:'apt_20261019_merjem',first:'Merjem',last:'Salihi',date:'2026-10-19',time:'09:00',place:'Analizat'}
];
function getAppointments(){try{const local=JSON.parse(localStorage.getItem(APPOINTMENT_KEY)||'[]');const all=[...SHEET_APPOINTMENTS,...local],seen=new Set();return all.filter(x=>{const k=String(x.id||[x.first,x.last,x.date,x.time,x.place].join('|'));if(seen.has(k))return false;seen.add(k);return true}).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))}catch(e){return SHEET_APPOINTMENTS.slice()}}
function addAppointment(){const x={id:'local_'+Date.now(),first:aptFirst.value.trim(),last:aptLast.value.trim(),date:aptDate.value,time:aptTime.value,place:aptPlace.value.trim()};if(!x.first||!x.date||!x.time||!x.place){alert('Plotëso emrin, datën, orën dhe vendin.');return}const local=JSON.parse(localStorage.getItem(APPOINTMENT_KEY)||'[]');local.push(x);localStorage.setItem(APPOINTMENT_KEY,JSON.stringify(local));renderAppointments();requestAppNotifications()}
function deleteAppointment(id){const local=JSON.parse(localStorage.getItem(APPOINTMENT_KEY)||'[]').filter(x=>String(x.id)!==String(id));localStorage.setItem(APPOINTMENT_KEY,JSON.stringify(local));renderAppointments()}
function renderAppointments(){const e=document.getElementById('aptList');if(!e)return;const arr=getAppointments();e.innerHTML=arr.length?arr.map(x=>'<div class="card"><b>👤 '+escA(x.first+' '+x.last)+'</b><div>📅 '+x.date+' · ⏰ '+x.time+'</div><div>📍 '+escA(x.place)+'</div></div>').join(''):'<div class="card muted">Nuk ka termine</div>'}
function escA(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function appointmentAlarm(x,label){const msg='🔔 '+label+': '+x.first+' '+x.last+' · '+x.date+' '+x.time+' · '+x.place;try{const ac=new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.value=880;g.gain.value=.15;o.start();setTimeout(()=>{o.stop();ac.close()},1200)}catch(e){}if('Notification'in window&&Notification.permission==='granted')new Notification('Shtëpia Ime',{body:msg});}
function checkAppointments(){const now=Date.now();getAppointments().forEach(x=>{const t=new Date(x.date+'T'+x.time).getTime();[['1 ditë para',24*60*60*1000],['1 orë para',60*60*1000]].forEach(([label,off])=>{const key='aptAlert_'+x.id+'_'+off;if(!localStorage.getItem(key)&&now>=t-off&&now<t-off+60000){localStorage.setItem(key,'1');appointmentAlarm(x,label)}})})}
setInterval(checkAppointments,30000);setTimeout(()=>{renderAppointments();checkAppointments()},700);

async function scanReceipt(){const input=document.getElementById('receiptFile'),p=document.getElementById('receiptPreview'),file=input?.files?.[0];if(!file){p.innerHTML='<p class="muted">Zgjidh ose fotografo faturën.</p>';return}p.innerHTML='<p class="muted">Po përgatitet fotografia…</p>';try{const img=await new Promise((ok,no)=>{const i=new Image(),u=URL.createObjectURL(file);i.onload=()=>{URL.revokeObjectURL(u);ok(i)};i.onerror=no;i.src=u});const max=1800,scale=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);const dataUrl=c.toDataURL('image/jpeg',.78);sessionStorage.setItem('receiptImage',dataUrl);p.innerHTML='<div class="card"><img src="'+dataUrl+'" style="width:100%;max-height:320px;object-fit:contain;border-radius:12px"><p><b>Fotoja u përgatit.</b></p><button class="primary" onclick="analyzeReceiptAI()">Analizo faturën me AI</button><div id="receiptStatus" class="muted"></div></div>'}catch(e){p.innerHTML='<p class="muted">Fotografia nuk u përpunua: '+esc(e.message)+'</p>'}}
async function analyzeReceiptAI(){
 const p=document.getElementById('receiptPreview'),s=document.getElementById('receiptStatus'),image=sessionStorage.getItem('receiptImage');
 if(!image)return;
 s.innerHTML='⏳ AI po lexon faturën…';
 try{
  const d=await apiPost('householdAI',{task:'receipt_scan',imageDataUrl:image,language:lang});
  if(!d.ok)throw Error(d.error||'AI-Auswertung fehlgeschlagen');
  const x=normalizeReceiptDraft(d.data||d),items=x.items||[];
  if(!items.length)throw Error('AI nuk gjeti produkte të lexueshme në faturë.');
  sessionStorage.setItem('receiptDraft',JSON.stringify(x));
  renderReceiptDraft(x);
  s.innerHTML=x.totalMismatch?'⚠️ Kontrollo totalin: shuma e produkteve nuk përputhet me totalin e faturës.':'✓ Kontrollo dhe korrigjo produktet para ruajtjes.';
 }catch(e){s.innerHTML='❌ '+esc(e.message);}
}
function receiptNum(v){if(typeof v==='number')return v;const n=parseFloat(String(v??'').replace(/[^0-9,.-]/g,'').replace(',','.'));return Number.isFinite(n)?n:0}
function normalizeReceiptDate(v){
 const s=String(v||'').trim(); let m;
 if((m=s.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{2}|\d{4})$/))){let y=+m[3];if(y<100)y=2000+y;return y+'-'+String(+m[2]).padStart(2,'0')+'-'+String(+m[1]).padStart(2,'0')}
 if((m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/)))return s;
 return s;
}
function normalizeReceiptDraft(raw){
 const x=JSON.parse(JSON.stringify(raw||{}));x.date=normalizeReceiptDate(x.date||x.receiptDate||'');
 x.items=(x.items||x.products||[]).map((it,i)=>{const q=receiptNum(it.quantity||it.qty||1)||1,u=receiptNum(it.unitPrice??it.price),t=receiptNum(it.total)||+(q*u).toFixed(2);return{name:it.name||it.product||'',quantity:q,unitPrice:u,total:t,category:it.category||''}});
 x.total=receiptNum(x.total||x.grandTotal);const sum=+x.items.reduce((a,it)=>a+receiptNum(it.total),0).toFixed(2);x.itemsSum=sum;x.totalMismatch=!!x.total&&Math.abs(sum-x.total)>0.05;return x;
}
function renderReceiptDraft(x){
 const p=document.getElementById('receiptPreview');document.getElementById('receiptAIResult')?.remove();
 const rows=x.items.map((it,n)=>'<div class="card"><label>'+(n+1)+'. Produkti</label><input id="ri_name_'+n+'" value="'+esc(it.name)+'"><div class="grid2"><div><label>Sasia</label><input id="ri_qty_'+n+'" type="number" step="0.01" value="'+it.quantity+'"></div><div><label>Çmimi/njësi €</label><input id="ri_price_'+n+'" type="number" step="0.01" value="'+it.unitPrice+'"></div></div><label>Totali €</label><input id="ri_total_'+n+'" type="number" step="0.01" value="'+it.total+'"></div>').join('');
 const warn=x.totalMismatch?'<div class="card" style="border:2px solid #e0a000"><b>⚠️ Shuma e produkteve: '+x.itemsSum.toFixed(2)+' € — Totali i faturës: '+x.total.toFixed(2)+' €</b></div>':'';
 p.insertAdjacentHTML('beforeend','<div id="receiptAIResult"><h3>🧾 '+esc(x.store||'')+'</h3><label>Data</label><input id="receiptEditDate" type="date" value="'+esc(x.date||'')+'">'+rows+warn+'<label>Totali i faturës €</label><input id="receiptEditTotal" type="number" step="0.01" value="'+x.total+'"><button class="primary" onclick="confirmReceiptAI()">✓ Konfirmo dhe ruaj</button></div>');
}
async function confirmReceiptAI(){
 const x=JSON.parse(sessionStorage.getItem('receiptDraft')||'null');if(!x)return;
 x.date=document.getElementById('receiptEditDate')?.value||x.date;x.total=receiptNum(document.getElementById('receiptEditTotal')?.value||x.total);
 x.items=x.items.map((it,n)=>({name:document.getElementById('ri_name_'+n)?.value.trim()||it.name,quantity:receiptNum(document.getElementById('ri_qty_'+n)?.value)||1,unitPrice:receiptNum(document.getElementById('ri_price_'+n)?.value),total:receiptNum(document.getElementById('ri_total_'+n)?.value),category:it.category||''}));
 const sum=+x.items.reduce((a,it)=>a+it.total,0).toFixed(2);if(x.total&&Math.abs(sum-x.total)>0.05&&!confirm('Shuma e produkteve është '+sum.toFixed(2)+' €, ndërsa fatura '+x.total.toFixed(2)+' €. Ta ruaj gjithsesi?'))return;
 const p=document.getElementById('receiptPreview');let box=document.getElementById('receiptSaveStatus');if(!box){box=document.createElement('div');box.id='receiptSaveStatus';box.className='card';p.appendChild(box)}
 box.textContent='⏳ Po ruhet…';
 try{const d=await apiPost('confirmScan',{scan:x});if(!d.ok)throw Error(d.error||'Ruajtja dështoi');const receiptPurchases=x.items.map((it,n)=>({ID:'receipt_'+Date.now()+'_'+n,Produkti:it.name||it.product||'',Data:x.date||'',Dyqani:x.store||'',Kategoria:it.category||'',Sasia:Number(it.quantity||1),unitPrice:Number(it.unitPrice||0),Totali:Number(it.total||0),description:'Faturë AI'}));if(!Array.isArray(shoppingItems))shoppingItems=[];shoppingItems=[...receiptPurchases,...shoppingItems];const oldReceipt=(()=>{try{const z=JSON.parse(localStorage.getItem('meinHausReceiptPurchases')||'[]');return Array.isArray(z)?z:[]}catch(e){return []}})();localStorage.setItem('meinHausReceiptPurchases',JSON.stringify([...receiptPurchases,...oldReceipt]));renderShoppingList();refreshHomeRealData();box.innerHTML='<b>✓ U ruajt.</b><div class="muted">Fatura u ruajt dhe produktet u shtuan te Blerjet.</div>';sessionStorage.removeItem('receiptDraft');}
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
