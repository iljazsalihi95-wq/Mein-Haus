const API='https://script.google.com/macros/s/AKfycbzx_y12qFOfQ9uc9_5gfuHGbCw_JV2gwU1MGFnIgDnOuQ6lNhgw9hyMrYk8-Xv9oqDP/exec';
const I18N={de:{app:'Mein Haus',hello:'Hallo',overview:'Hier ist deine Haushaltsübersicht.',shopping:'Einkaufsliste',shoppingShort:'Einkauf',addPurchase:'➕ Produkt / Einkauf hinzufügen',saveItem:'Produkt speichern',addByReceipt:'🧾 Mit Kassenbon AI hinzufügen',offers:'Angebote',stock:'Vorräte',finance:'Finanzen',today:'Heute kaufen?',openList:'Liste öffnen',tasks:'Nächste Aufgaben',categories:'Kategorien',more:'Mehr',bills:'Rechnungen & Abos',ai:'KI-Assistent',family:'Familie & Mitglieder',settings:'Einstellungen',home:'Home',aiHello:'Hallo! Wie kann ich dir heute helfen?',aiQ:'Was soll ich diese Woche einkaufen?',addItem:'Artikel hinzufügen…',searchOffers:'Angebote suchen…',searchStock:'Vorräte durchsuchen…',ask:'Frage etwas…'},sq:{app:'Shtëpia Ime',hello:'Përshëndetje',overview:'Këtu është përmbledhja e shtëpisë sate.',shopping:'Lista e blerjeve',shoppingShort:'Blerjet',addPurchase:'➕ Shto produkt / blerje',saveItem:'Ruaj produktin',addByReceipt:'🧾 Shto me faturë AI',offers:'Ofertat',stock:'Inventari',finance:'Financat',today:'Çfarë të blej sot?',openList:'Hap listën',tasks:'Detyrat e ardhshme',categories:'Kategoritë',more:'Më shumë',bills:'Faturat & Abonimet',ai:'Asistenti AI',family:'Familja & Anëtarët',settings:'Cilësimet',home:'Ballina',aiHello:'Përshëndetje! Si mund të të ndihmoj sot?',aiQ:'Çfarë duhet të blej këtë javë?',addItem:'Shto produkt…',searchOffers:'Kërko oferta…',searchStock:'Kërko në inventar…',ask:'Pyet diçka…'},en:{app:'My Home',hello:'Hello',overview:'Here is your household overview.',shopping:'Shopping list',shoppingShort:'Shopping',offers:'Offers',stock:'Inventory',finance:'Finances',today:'Buy today?',openList:'Open list',tasks:'Next tasks',categories:'Categories',more:'More',bills:'Bills & subscriptions',ai:'AI Assistant',family:'Family & members',settings:'Settings',home:'Home',aiHello:'Hello! How can I help today?',aiQ:'What should I buy this week?',addItem:'Add item…',searchOffers:'Search offers…',searchStock:'Search inventory…',ask:'Ask something…'}};

Object.assign(I18N,{
it:{app:'Casa Mia',hello:'Ciao',overview:'Ecco il riepilogo della tua casa.',shopping:'Lista della spesa',shoppingShort:'Spesa',offers:'Offerte',stock:'Scorte',finance:'Finanze',today:'Comprare oggi?',openList:'Apri lista',tasks:'Prossime attività',categories:'Categorie',more:'Altro',bills:'Bollette e abbonamenti',ai:'Assistente AI',family:'Famiglia e membri',settings:'Impostazioni',home:'Home',aiHello:'Ciao! Come posso aiutarti?',aiQ:'Cosa devo comprare questa settimana?',addItem:'Aggiungi prodotto…',searchOffers:'Cerca offerte…',searchStock:'Cerca nelle scorte…',ask:'Chiedi qualcosa…'},
tr:{app:'Evim',hello:'Merhaba',overview:'Ev özetin burada.',shopping:'Alışveriş listesi',shoppingShort:'Alışveriş',offers:'Kampanyalar',stock:'Stoklar',finance:'Finans',today:'Bugün ne alınmalı?',openList:'Listeyi aç',tasks:'Yaklaşan görevler',categories:'Kategoriler',more:'Daha fazla',bills:'Faturalar ve abonelikler',ai:'AI Asistanı',family:'Aile ve üyeler',settings:'Ayarlar',home:'Ana sayfa',aiHello:'Merhaba! Nasıl yardımcı olabilirim?',aiQ:'Bu hafta ne almalıyım?',addItem:'Ürün ekle…',searchOffers:'Kampanya ara…',searchStock:'Stok ara…',ask:'Bir şey sor…'},
mk:{app:'Мојот дом',hello:'Здраво',overview:'Еве го прегледот на вашиот дом.',shopping:'Листа за купување',shoppingShort:'Купување',offers:'Понуди',stock:'Залиха',finance:'Финансии',today:'Што да купам денес?',openList:'Отвори листа',tasks:'Следни задачи',categories:'Категории',more:'Повеќе',bills:'Сметки и претплати',ai:'AI Асистент',family:'Семејство и членови',settings:'Поставки',home:'Почетна',aiHello:'Здраво! Како можам да помогнам?',aiQ:'Што треба да купам оваа недела?',addItem:'Додај производ…',searchOffers:'Барај понуди…',searchStock:'Барај залиха…',ask:'Прашај нешто…'},
bs:{app:'Moj dom',hello:'Zdravo',overview:'Ovdje je pregled vašeg doma.',shopping:'Lista za kupovinu',shoppingShort:'Kupovina',offers:'Ponude',stock:'Zalihe',finance:'Finansije',today:'Šta kupiti danas?',openList:'Otvori listu',tasks:'Sljedeći zadaci',categories:'Kategorije',more:'Više',bills:'Računi i pretplate',ai:'AI asistent',family:'Porodica i članovi',settings:'Postavke',home:'Početna',aiHello:'Zdravo! Kako mogu pomoći?',aiQ:'Šta trebam kupiti ove sedmice?',addItem:'Dodaj proizvod…',searchOffers:'Pretraži ponude…',searchStock:'Pretraži zalihe…',ask:'Pitaj nešto…'}
});

const UI_TRANSLATIONS={
sq:{heroEyebrow:'SHTËPIA IME • FAMILJA IME',heroTitle:'Gjithçka për shtëpinë dhe familjen',heroText:'Blerje, inventar, financa, oferta, termine dhe AI në një vend.',offersLive:'Ofertat LIVE',weeklyOffers:'🔥 Ofertat e javës',needBuyTitle:'🛒 Lista që duhet të blej',buyNothingToday:'Sot nuk blej asgjë',openNeedBuy:'Hap listën e nevojave',appointments:'📅 Terminat',nextAppointment:'Shiko terminin e ardhshëm'},
de:{heroEyebrow:'MEIN HAUS • MEINE FAMILIE',heroTitle:'Alles für Haushalt und Familie',heroText:'Einkäufe, Vorräte, Finanzen, Angebote, Termine und KI an einem Ort.',offersLive:'LIVE-Angebote',weeklyOffers:'🔥 Angebote der Woche',needBuyTitle:'🛒 Das muss ich kaufen',buyNothingToday:'Heute kaufe ich nichts',openNeedBuy:'Bedarfsliste öffnen',appointments:'📅 Termine',nextAppointment:'Nächsten Termin ansehen'},
en:{heroEyebrow:'MY HOME • MY FAMILY',heroTitle:'Everything for home and family',heroText:'Shopping, inventory, finances, offers, appointments and AI in one place.',offersLive:'LIVE Offers',weeklyOffers:'🔥 Weekly offers',needBuyTitle:'🛒 Things to buy',buyNothingToday:'Nothing to buy today',openNeedBuy:'Open needs list',appointments:'📅 Appointments',nextAppointment:'View next appointment'},
it:{heroEyebrow:'CASA MIA • LA MIA FAMIGLIA',heroTitle:'Tutto per la casa e la famiglia',heroText:'Spesa, scorte, finanze, offerte, appuntamenti e AI in un unico posto.',offersLive:'Offerte LIVE',weeklyOffers:'🔥 Offerte della settimana',needBuyTitle:'🛒 Cose da comprare',buyNothingToday:'Oggi non compro nulla',openNeedBuy:'Apri la lista',appointments:'📅 Appuntamenti',nextAppointment:'Vedi il prossimo appuntamento'},
tr:{heroEyebrow:'EVİM • AİLEM',heroTitle:'Ev ve aile için her şey',heroText:'Alışveriş, stok, finans, kampanyalar, randevular ve yapay zekâ tek yerde.',offersLive:'CANLI Kampanyalar',weeklyOffers:'🔥 Haftanın kampanyaları',needBuyTitle:'🛒 Alınacaklar',buyNothingToday:'Bugün alışveriş yok',openNeedBuy:'İhtiyaç listesini aç',appointments:'📅 Randevular',nextAppointment:'Sonraki randevuyu gör'},
mk:{heroEyebrow:'МОЈОТ ДОМ • МОЕТО СЕМЕЈСТВО',heroTitle:'Сè за домот и семејството',heroText:'Купување, залиха, финансии, понуди, термини и AI на едно место.',offersLive:'Понуди ВО ЖИВО',weeklyOffers:'🔥 Понуди на неделата',needBuyTitle:'🛒 Што треба да купам',buyNothingToday:'Денес не купувам ништо',openNeedBuy:'Отвори ја листата',appointments:'📅 Термини',nextAppointment:'Види го следниот термин'},
bs:{heroEyebrow:'MOJ DOM • MOJA PORODICA',heroTitle:'Sve za dom i porodicu',heroText:'Kupovina, zalihe, finansije, ponude, termini i AI na jednom mjestu.',offersLive:'Ponude UŽIVO',weeklyOffers:'🔥 Ponude sedmice',needBuyTitle:'🛒 Šta trebam kupiti',buyNothingToday:'Danas ne kupujem ništa',openNeedBuy:'Otvori listu potreba',appointments:'📅 Termini',nextAppointment:'Pogledaj sljedeći termin'}
};Object.keys(UI_TRANSLATIONS).forEach(k=>Object.assign(I18N[k],UI_TRANSLATIONS[k]));

const UI_CORE={
sq:{homeSummary:'Përmbledhja e shtëpisë',addToList:'Shto në listë',receiptAI:'Fatura AI',newPurchase:'Regjistro blerje të re',savePurchase:'Ruaj blerjen',addReceiptAI:'Shto me faturë AI',currentLeaflets:'Prospektet aktuale',addTransaction:'Regjistro hyrje / dalje',saveTransaction:'Ruaj transaksionin',transactions:'Transaksionet',appointmentsAlerts:'Takimet dhe paralajmërimet',paymentsDeadlines:'Pagesat dhe afatet',aiHelp:'Ndihmë mbi të dhënat e shtëpisë',familyFinance:'Anëtarët dhe financat sipas personit',profileLangPrivacy:'Profili, gjuha dhe privatësia',addMember:'Shto anëtar',saveMember:'Ruaj anëtarin',familyControl:'Kontrolli familjar',addBill:'Shto faturë / abonim',saveBill:'Ruaj faturën',homeAssistant:'Asistenti i shtëpisë',send:'Dërgo',notifications:'Njoftimet',familyData:'Të dhënat e familjes'},
de:{homeSummary:'Haushaltsübersicht',addToList:'Zur Liste hinzufügen',receiptAI:'Beleg-KI',newPurchase:'Neuen Einkauf erfassen',savePurchase:'Einkauf speichern',addReceiptAI:'Mit Beleg-KI hinzufügen',currentLeaflets:'Aktuelle Prospekte',addTransaction:'Einnahme / Ausgabe erfassen',saveTransaction:'Transaktion speichern',transactions:'Transaktionen',appointmentsAlerts:'Termine und Erinnerungen',paymentsDeadlines:'Zahlungen und Fristen',aiHelp:'Hilfe zu deinen Haushaltsdaten',familyFinance:'Mitglieder und Finanzen pro Person',profileLangPrivacy:'Profil, Sprache und Datenschutz',addMember:'Mitglied hinzufügen',saveMember:'Mitglied speichern',familyControl:'Familienübersicht',addBill:'Rechnung / Abo hinzufügen',saveBill:'Rechnung speichern',homeAssistant:'Haushaltsassistent',send:'Senden',notifications:'Benachrichtigungen',familyData:'Familiendaten'},
en:{homeSummary:'Home overview',addToList:'Add to list',receiptAI:'Receipt AI',newPurchase:'Add new purchase',savePurchase:'Save purchase',addReceiptAI:'Add with Receipt AI',currentLeaflets:'Current leaflets',addTransaction:'Add income / expense',saveTransaction:'Save transaction',transactions:'Transactions',appointmentsAlerts:'Appointments and reminders',paymentsDeadlines:'Payments and due dates',aiHelp:'Help with your household data',familyFinance:'Members and finances by person',profileLangPrivacy:'Profile, language and privacy',addMember:'Add member',saveMember:'Save member',familyControl:'Family overview',addBill:'Add bill / subscription',saveBill:'Save bill',homeAssistant:'Home assistant',send:'Send',notifications:'Notifications',familyData:'Family data'},
it:{homeSummary:'Riepilogo della casa',addToList:'Aggiungi alla lista',receiptAI:'Scontrino AI',newPurchase:'Registra nuova spesa',savePurchase:'Salva acquisto',addReceiptAI:'Aggiungi con Scontrino AI',currentLeaflets:'Volantini attuali',addTransaction:'Registra entrata / uscita',saveTransaction:'Salva transazione',transactions:'Transazioni',appointmentsAlerts:'Appuntamenti e promemoria',paymentsDeadlines:'Pagamenti e scadenze',aiHelp:'Aiuto sui dati di casa',familyFinance:'Membri e finanze per persona',profileLangPrivacy:'Profilo, lingua e privacy',addMember:'Aggiungi membro',saveMember:'Salva membro',familyControl:'Riepilogo famiglia',addBill:'Aggiungi bolletta / abbonamento',saveBill:'Salva bolletta',homeAssistant:'Assistente di casa',send:'Invia',notifications:'Notifiche',familyData:'Dati della famiglia'},
tr:{homeSummary:'Ev özeti',addToList:'Listeye ekle',receiptAI:'Fiş AI',newPurchase:'Yeni alışveriş ekle',savePurchase:'Alışverişi kaydet',addReceiptAI:'Fiş AI ile ekle',currentLeaflets:'Güncel broşürler',addTransaction:'Gelir / gider ekle',saveTransaction:'İşlemi kaydet',transactions:'İşlemler',appointmentsAlerts:'Randevular ve hatırlatmalar',paymentsDeadlines:'Ödemeler ve son tarihler',aiHelp:'Ev verileri için yardım',familyFinance:'Kişiye göre üyeler ve finans',profileLangPrivacy:'Profil, dil ve gizlilik',addMember:'Üye ekle',saveMember:'Üyeyi kaydet',familyControl:'Aile özeti',addBill:'Fatura / abonelik ekle',saveBill:'Faturayı kaydet',homeAssistant:'Ev asistanı',send:'Gönder',notifications:'Bildirimler',familyData:'Aile verileri'},
mk:{homeSummary:'Преглед на домот',addToList:'Додај во листа',receiptAI:'Сметка AI',newPurchase:'Додај ново купување',savePurchase:'Зачувај купување',addReceiptAI:'Додај со Сметка AI',currentLeaflets:'Тековни каталози',addTransaction:'Додај приход / расход',saveTransaction:'Зачувај трансакција',transactions:'Трансакции',appointmentsAlerts:'Термини и потсетници',paymentsDeadlines:'Плаќања и рокови',aiHelp:'Помош за домашните податоци',familyFinance:'Членови и финансии по лице',profileLangPrivacy:'Профил, јазик и приватност',addMember:'Додај член',saveMember:'Зачувај член',familyControl:'Преглед на семејството',addBill:'Додај сметка / претплата',saveBill:'Зачувај сметка',homeAssistant:'Домашен асистент',send:'Испрати',notifications:'Известувања',familyData:'Семејни податоци'},
bs:{homeSummary:'Pregled doma',addToList:'Dodaj na listu',receiptAI:'Račun AI',newPurchase:'Dodaj novu kupovinu',savePurchase:'Sačuvaj kupovinu',addReceiptAI:'Dodaj pomoću Račun AI',currentLeaflets:'Aktuelni katalozi',addTransaction:'Dodaj prihod / trošak',saveTransaction:'Sačuvaj transakciju',transactions:'Transakcije',appointmentsAlerts:'Termini i podsjetnici',paymentsDeadlines:'Plaćanja i rokovi',aiHelp:'Pomoć za podatke doma',familyFinance:'Članovi i finansije po osobi',profileLangPrivacy:'Profil, jezik i privatnost',addMember:'Dodaj člana',saveMember:'Sačuvaj člana',familyControl:'Pregled porodice',addBill:'Dodaj račun / pretplatu',saveBill:'Sačuvaj račun',homeAssistant:'Kućni asistent',send:'Pošalji',notifications:'Obavijesti',familyData:'Porodični podaci'}
};Object.keys(UI_CORE).forEach(k=>Object.assign(I18N[k],UI_CORE[k]));
const UI_HOTFIX={
sq:{checkOffers:'Kontrollo ofertat aktuale',noItemsToday:'Nuk ka artikuj për këtë ditë.',chooseLanguage:'🌐 Zgjidh gjuhën'},
de:{checkOffers:'Aktuelle Angebote ansehen',noItemsToday:'Keine Artikel für diesen Tag.',chooseLanguage:'🌐 Sprache wählen'},
en:{checkOffers:'View current offers',noItemsToday:'No items for this day.',chooseLanguage:'🌐 Choose language'},
it:{checkOffers:'Controlla le offerte attuali',noItemsToday:'Nessun articolo per questo giorno.',chooseLanguage:'🌐 Scegli la lingua'},
tr:{checkOffers:'Güncel kampanyaları gör',noItemsToday:'Bu gün için ürün yok.',chooseLanguage:'🌐 Dil seç'},
mk:{checkOffers:'Провери ги тековните понуди',noItemsToday:'Нема ставки за овој ден.',chooseLanguage:'🌐 Избери јазик'},
bs:{checkOffers:'Pogledaj aktuelne ponude',noItemsToday:'Nema stavki za ovaj dan.',chooseLanguage:'🌐 Izaberi jezik'}
};Object.keys(UI_HOTFIX).forEach(k=>Object.assign(I18N[k],UI_HOTFIX[k]));
const SUPPORTED=['sq','de','en','it','tr','mk','bs'];
function detectLanguage(){const raw=(navigator.languages&&navigator.languages[0]||navigator.language||'de').toLowerCase().split('-')[0];return SUPPORTED.includes(raw)?raw:'de'}

let lang=localStorage.getItem('lang')||'sq';
function setLang(l){
 if(!SUPPORTED.includes(l))return false;
 lang=l;
 try{localStorage.setItem('lang',l);localStorage.setItem('languageManual','1')}catch(e){}
 try{applyLang()}catch(e){console.warn('applyLang',e)}
 try{syncLanguageControls()}catch(e){}
 ['renderWeeklyChecks','renderAppointments','renderAppointmentPage','renderManualProducts','renderOfferSources','renderNeedBuy','renderOffers','renderHomeOfferSlider','refreshHomeRealData'].forEach(fn=>{try{if(typeof window[fn]==='function')window[fn]()}catch(e){console.warn('Language refresh:',fn,e)}});
 return true;
}
window.setLang=setLang;
document.addEventListener('click',function(e){
 const b=e.target.closest&&e.target.closest('[data-lang-choice]');
 if(!b)return;
 e.preventDefault();
 setLang(b.dataset.langChoice);
});
function syncLanguageControls(){document.querySelectorAll('[data-lang-choice]').forEach(b=>{const on=b.dataset.langChoice===lang;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false')});const s=document.getElementById('langSelect');if(s)s.value=lang} function applyLang(){Object.keys({"de":{"familyAccount":"Familienkonto","name":"Name","email":"E-Mail","password":"Passwort","householdName":"Familienname / Haushalt","register":"Registrieren","login":"Anmelden"},"sq":{"familyAccount":"Llogaria familjare","name":"Emri","email":"E-mail","password":"Fjalëkalimi","householdName":"Emri i familjes / Shtëpisë","register":"Regjistrohu","login":"Hyr"},"en":{"familyAccount":"Family account","name":"Name","email":"Email","password":"Password","householdName":"Family / household name","register":"Register","login":"Sign in"},"it":{"familyAccount":"Account famiglia","name":"Nome","email":"E-mail","password":"Password","householdName":"Famiglia / casa","register":"Registrati","login":"Accedi"},"tr":{"familyAccount":"Aile hesabı","name":"Ad","email":"E-posta","password":"Şifre","householdName":"Aile / ev adı","register":"Kayıt ol","login":"Giriş yap"},"mk":{"familyAccount":"Семејна сметка","name":"Име","email":"Е-пошта","password":"Лозинка","householdName":"Семејство / домаќинство","register":"Регистрирај се","login":"Најави се"},"bs":{"familyAccount":"Porodični račun","name":"Ime","email":"E-mail","password":"Lozinka","householdName":"Porodica / domaćinstvo","register":"Registruj se","login":"Prijavi se"}}).forEach(k=>Object.assign(I18N[k],{"de":{"familyAccount":"Familienkonto","name":"Name","email":"E-Mail","password":"Passwort","householdName":"Familienname / Haushalt","register":"Registrieren","login":"Anmelden"},"sq":{"familyAccount":"Llogaria familjare","name":"Emri","email":"E-mail","password":"Fjalëkalimi","householdName":"Emri i familjes / Shtëpisë","register":"Regjistrohu","login":"Hyr"},"en":{"familyAccount":"Family account","name":"Name","email":"Email","password":"Password","householdName":"Family / household name","register":"Register","login":"Sign in"},"it":{"familyAccount":"Account famiglia","name":"Nome","email":"E-mail","password":"Password","householdName":"Famiglia / casa","register":"Registrati","login":"Accedi"},"tr":{"familyAccount":"Aile hesabı","name":"Ad","email":"E-posta","password":"Şifre","householdName":"Aile / ev adı","register":"Kayıt ol","login":"Giriş yap"},"mk":{"familyAccount":"Семејна сметка","name":"Име","email":"Е-пошта","password":"Лозинка","householdName":"Семејство / домаќинство","register":"Регистрирај се","login":"Најави се"},"bs":{"familyAccount":"Porodični račun","name":"Ime","email":"E-mail","password":"Lozinka","householdName":"Porodica / domaćinstvo","register":"Registruj se","login":"Prijavi se"}}[k]));const t=I18N[lang]||I18N.de;document.documentElement.lang=lang;document.title=t.app;document.querySelectorAll('[data-t]').forEach(e=>{if(t[e.dataset.t])e.textContent=t[e.dataset.t]});document.querySelectorAll('[data-ph]').forEach(e=>{if(t[e.dataset.ph])e.placeholder=t[e.dataset.ph]})}
function restorePreferredLanguage(){const saved=localStorage.getItem('lang');if(saved&&SUPPORTED.includes(saved))lang=saved;else{lang='sq';localStorage.setItem('lang','sq')}applyLang();syncLanguageControls()}
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('on',x.dataset.go===id));applyLang();if(id==='needbuy')loadNeedBuy();if(id==='appointments')loadAppointmentsReal();if(id==='offers')loadOffersReal();if(id==='stock')loadInventoryReal();scrollTo(0,0)}
let shoppingItems=[];
async function loadShoppingList(){
 const e=document.getElementById('shopItems');if(!e)return;e.innerHTML='<div class="card muted">Po ngarkohet…</div>';
 try{const d=await apiPost('shoppingList',{});if(!d.ok)throw Error(d.error||'');shoppingItems=(d.data?.items||d.data||[]);try{const rp=JSON.parse(localStorage.getItem('meinHausReceiptPurchases')||'[]');const ids=new Set(shoppingItems.map(x=>String(x.ID||x.id||'')));shoppingItems=[...rp.filter(x=>!ids.has(String(x.ID||x.id||''))),...shoppingItems]}catch(e){}renderShoppingList();refreshHomeRealData();}
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
async function loadFamilyReal(){try{const d=await apiPost('members',{});if(d.ok){const server=(d.data||[]).map(x=>({id:String(x.memberId||x.userId||''),first:x.firstName||String(x.displayName||'').split(' ')[0]||'',last:x.lastName||String(x.displayName||'').split(' ').slice(1).join(' '),relation:x.relation||x.role||'',birth:x.birthDate||''}));const local=getFamily();const merged=[...local];server.forEach(m=>{const i=merged.findIndex(x=>(x.id&&m.id&&x.id===m.id)||((x.first+' '+x.last).trim().toLowerCase()===(m.first+' '+m.last).trim().toLowerCase()));if(i>=0)merged[i]={...merged[i],...m};else merged.push(m)});localStorage.setItem(FAMILY_KEY,JSON.stringify(merged));renderFamily();refreshFinanceMemberOptions()}}catch(e){renderFamily();refreshFinanceMemberOptions()}}
async function saveFamilyMember(){const f=document.getElementById('famFirst')?.value.trim(),l=document.getElementById('famLast')?.value.trim();if(!f)return alert('Shkruaj emrin.');try{let d=await apiPost('memberSave',{firstName:f,lastName:l,relation:document.getElementById('famRelation')?.value||'',birthDate:document.getElementById('famBirth')?.value||''});if(!d.ok&&/Action e panjohur:\s*memberSave/i.test(d.error||''))d=await apiPost('familyMemberSave',{firstName:f,lastName:l,relation:document.getElementById('famRelation')?.value||'',birthDate:document.getElementById('famBirth')?.value||''});if(!d.ok)throw Error(d.error||'Nuk u ruajt');await loadFamilyReal();document.getElementById('famFirst').value='';document.getElementById('famLast').value=''}catch(e){alert('Nuk u ruajt anëtari: '+e.message)}}
function refreshFinanceMemberOptions(){const sel=document.getElementById('finMember');if(!sel)return;const cur=sel.value;sel.innerHTML='<option value="">Familja / e përbashkët</option>'+getFamily().map(x=>'<option value="'+esc(x.id)+'">'+esc(x.first+' '+x.last)+'</option>').join('');sel.value=cur}
function renderFamily(){const fam=getFamily(),rows=getFinanceEntries(),box=document.getElementById('familyMembers');if(!box)return;const inc=rows.filter(x=>x.type==='income').reduce((a,x)=>a+x.amount,0),exp=rows.filter(x=>x.type==='expense').reduce((a,x)=>a+x.amount,0);document.getElementById('famIncome').textContent=money(inc);document.getElementById('famExpense').textContent=money(exp);document.getElementById('famBalance').textContent='Gjendja: '+money(inc-exp);box.innerHTML=fam.length?fam.map(m=>{const r=rows.filter(x=>x.memberId===m.id),i=r.filter(x=>x.type==='income').reduce((a,x)=>a+x.amount,0),e=r.filter(x=>x.type==='expense').reduce((a,x)=>a+x.amount,0);return '<div class="card"><b>'+esc(m.first+' '+m.last)+'</b><div class="muted">'+esc(m.relation)+(m.birth?' · '+esc(m.birth):'')+'</div><div class="row" style="margin-top:8px"><span>Hyrje <b>'+money(i)+'</b></span><span>Dalje <b>'+money(e)+'</b></span></div><div class="muted">Bilanci personal: '+money(i-e)+'</div></div>'}).join(''):'<div class="card muted">Nuk ka anëtarë të regjistruar.</div>';refreshFinanceMemberOptions()}
const FIN_KEY='meinHausFinanceEntries';
function getFinanceEntries(){try{return JSON.parse(localStorage.getItem(FIN_KEY)||'[]')}catch(e){return []}}
async function loadFinanceReal(){try{const d=await apiPost('financeList',{});if(d.ok){const a=(d.data||[]).map(x=>({id:x.ID||x.id,date:x.Data||x.date||'',type:String(x.Lloji||x.type||'dalje').toLowerCase()==='hyrje'?'income':'expense',payment:x.paymentMethod||x.payment||'cash',memberId:String(x.memberId||''),description:x['Përshkrimi']||x.description||'',category:x.Kategoria||x.category||'Tjetër',amount:Number(x.Shuma||x.amount||0)}));localStorage.setItem(FIN_KEY,JSON.stringify(a));renderFinance();renderFamily()}}catch(e){}}
function money(v){return Number(v||0).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €'}
function refreshHomeRealData(){const pc=document.getElementById('homePurchaseCount');if(pc)pc.textContent=(shoppingItems?.length||0)+' të regjistruara';const sc=document.getElementById('homeStockCount');if(sc)sc.textContent=(typeof inventoryItems!=='undefined'?inventoryItems.length:0)+' produkte';const rows=getFinanceEntries(),bal=rows.reduce((a,x)=>a+(x.type==='income'?x.amount:-x.amount),0),fs=document.getElementById('homeFinanceSummary');if(fs)fs.textContent=money(bal);const rs=document.getElementById('homeRealSummary');if(rs)rs.textContent=(shoppingItems?.length||0)+' blerje · '+(typeof inventoryItems!=='undefined'?inventoryItems.length:0)+' produkte në inventar · gjendja '+money(bal)}
function renderFinance(){
 const rows=getFinanceEntries(),inc=rows.filter(x=>x.type==='income').reduce((a,x)=>a+x.amount,0),exp=rows.filter(x=>x.type==='expense').reduce((a,x)=>a+x.amount,0);
 const cash=rows.filter(x=>x.payment==='cash').reduce((a,x)=>a+(x.type==='income'?x.amount:-x.amount),0),bank=rows.filter(x=>x.payment==='bank').reduce((a,x)=>a+(x.type==='income'?x.amount:-x.amount),0);
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};set('finIncome',money(inc));set('finExpense',money(exp));set('finBalance',money(inc-exp));set('finCash','Cash '+money(cash));set('finBank','Bankë '+money(bank));refreshHomeRealData();
 const box=document.getElementById('financeItems');if(!box)return;if(!rows.length){box.innerHTML='<div class="card muted">Nuk ka transaksione të regjistruara.</div>';return}
 box.innerHTML=rows.slice().reverse().map(x=>'<div class="card row"><div class="grow"><b>'+esc(x.description)+'</b><div class="muted">'+esc(x.date)+' · '+esc(x.category)+' · '+(x.payment==='bank'?'Bankë/Kartë':'Cash')+'</div></div><b>'+(x.type==='income'?'+':'−')+money(x.amount)+'</b></div>').join('');
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
let LIVE_OFFERS=[];let offers=[];let offerSlide=0;let offerCountry='DE',offerCity='Frankenthal';const VERIFIED_OFFERS_DE=[
{store:'ALDI SÜD',category:'Obst & Gemüse',name:'Äpfel Krumme Dinger',size:'2 kg',price:'1,89',from:'28.09.2026',to:'02.10.2026',url:'https://www.aldi-sued.de/angebote'},
{store:'ALDI SÜD',category:'Obst & Gemüse',name:'Suppengemüse',size:'800 g',price:'1,49',from:'28.09.2026',to:'02.10.2026',url:'https://www.aldi-sued.de/angebote'},
{store:'ALDI SÜD',category:'Obst & Gemüse',name:'Bio Naturland Hokkaido',size:'1 kg',price:'0,99',oldPrice:'1,39',discount:'28%',from:'28.09.2026',to:'02.10.2026',url:'https://www.aldi-sued.de/angebote'},
{store:'ALDI SÜD',category:'Obst & Gemüse',name:'Blumenkohl',size:'1 Stück',price:'0,99',oldPrice:'1,29',discount:'23%',from:'28.09.2026',to:'02.10.2026',url:'https://www.aldi-sued.de/angebote'},
{store:'ALDI SÜD',category:'Haushalt',name:'PERWOLL Waschmittel XXL',size:'80 WL',price:'12,99',from:'01.10.2026',to:'03.10.2026',url:'https://www.aldi-sued.de/angebote'},
{store:'ALDI SÜD',category:'Wohnen',name:'NOVITESSE Winter-Seersucker-Bettwäsche',size:'1 Stück',price:'17,99',from:'01.10.2026',to:'03.10.2026',url:'https://www.aldi-sued.de/angebote'},
{store:'ALDI SÜD',category:'Wohnen',name:'HOME CREATION Klapptritt',size:'1 Stück',price:'2,49',from:'01.10.2026',to:'03.10.2026',url:'https://www.aldi-sued.de/angebote'},
{store:'ALDI SÜD',category:'Haushalt',name:'DR. BECKMANN Waschmaschinen-Pflege',size:'250 ml',price:'2,65',from:'28.09.2026',to:'03.10.2026',url:'https://www.aldi-sued.de/angebote'}
];

// Immediate verified fallback: weekly offers must never remain on a loading placeholder.
LIVE_OFFERS=VERIFIED_OFFERS_DE.slice();offers=VERIFIED_OFFERS_DE.slice();setTimeout(()=>{try{renderOffers();renderHomeOfferSlider()}catch(e){console.warn('offer fallback render',e)}},0);

function offerMiniCard(x){return '<div class="card offerMini"><div><div class="offerMiniTop"><span class="offerMiniStore">'+esc(x.store||'')+'</span>'+(x.discount?'<span class="badge ok">'+esc(x.discount)+'</span>':'')+'</div><div class="offerMiniName">'+esc(x.name||'')+'</div><div class="muted">'+esc(x.size||'')+'</div></div><div><div class="price">'+esc(String(x.price||''))+' €</div>'+(x.oldPrice?'<span class="old">'+esc(String(x.oldPrice))+' €</span>':'')+'</div></div>'}
function currentOfferRows(){const q=(document.getElementById('offerSearch')?.value||'').trim().toLowerCase();return LIVE_OFFERS.filter(x=>(!offerStoreFilter||String(x.store).toLowerCase().includes(offerStoreFilter.toLowerCase()))&&(!q||(x.store+' '+x.name+' '+x.size+' '+x.category).toLowerCase().includes(q)))}
function offerSlideCard(x){const img=x.image?'<img src="'+esc(x.image)+'" alt="'+esc(x.name)+'">':'<div class="offerFallback">🛒</div>';return '<div class="offerSlideCard"><div><span class="offerStore">🏪 '+esc(x.store||'Oferta')+'</span><h3>'+esc(x.name||'')+'</h3><div class="offerMeta">'+esc(x.category||'')+(x.size?' · '+esc(x.size):'')+'</div><div class="offerPrice">'+esc(String(x.price||''))+' €'+(x.oldPrice?'<span class="offerOld">'+esc(String(x.oldPrice))+' €</span>':'')+'</div>'+(x.discount?'<span class="offerDiscount">− '+esc(String(x.discount))+'</span>':'')+'<div class="offerMeta" style="margin-top:11px">📅 '+esc(x.from||'')+(x.to?' – '+esc(x.to):'')+'</div>'+(x.url?'<button class="chip" style="margin-top:13px" onclick="window.open(\''+esc(x.url)+'\',\'_blank\')">Shiko ofertën ↗</button>':'')+'</div><div class="offerSlideMedia">'+img+'</div></div>'}
let offerStoreFilter='',offerPaused=false;
function setOfferStore(v){offerStoreFilter=v||'';offerSlide=0;document.querySelectorAll('#offers .offerFilterBar .chip').forEach(b=>b.classList.toggle('on',!offerStoreFilter?b.textContent.trim()==='Të gjitha':b.textContent.toLowerCase().includes(offerStoreFilter.toLowerCase())));renderOffers()}
function openProspect(name){const x=OFFER_SOURCES.find(z=>z.country===(offerCountry||'DE')&&z.name===name);if(!x||!x.url)return alert(lang==='sq'?'Prospekti nuk është konfiguruar.':'Prospekt nicht konfiguriert.');window.open(x.url,'_blank')}
function renderOfferStage(rows){const e=document.getElementById('offerSlider');if(!e||!rows.length)return;offerSlide=((offerSlide%rows.length)+rows.length)%rows.length;e.innerHTML=offerSlideCard(rows[offerSlide])+'<div class="offerControls"><button class="offerArrow" onclick="moveOfferSlide(-1)">‹</button><span class="offerCounter">'+(offerSlide+1)+' / '+rows.length+'</span><button class="offerArrow" onclick="moveOfferSlide(1)">›</button></div><div class="offerProgress"><i></i></div>'}
function moveOfferSlide(n){const rows=currentOfferRows();if(!rows.length)return;offerSlide=(offerSlide+n+rows.length)%rows.length;renderOfferStage(rows)}
function renderOffers(){const root=document.getElementById('offerItems');if(!root)return;const rows=currentOfferRows();if(!rows.length){root.innerHTML='<div class="card muted">Nuk u gjet ofertë aktive për këtë filtër.</div>';return}offerSlide%=rows.length;root.innerHTML='<div class="muted" style="margin:10px 2px 8px">🔥 '+(lang==='sq'?'Ofertat aktuale':'Aktuelle Angebote')+'</div><div id="offerSlider" class="offerStage"></div><div class="section"><h3>'+(lang==='sq'?'Të gjitha ofertat':'Alle Angebote')+'</h3><span class="muted">'+rows.length+'</span></div><div class="offerGrid">'+rows.map(offerMiniCard).join('')+'</div>';renderOfferStage(rows)}
function nextOfferSlide(){if(offerPaused||!document.getElementById('offers')?.classList.contains('active'))return;moveOfferSlide(1)}
setInterval(nextOfferSlide,5500);
async function loadOffersReal(){
 const root=document.getElementById('offerItems');
 // Germany: render verified current offers instantly; backend may refresh/extend them afterwards.
 if((offerCountry||'DE')==='DE'){
   LIVE_OFFERS=VERIFIED_OFFERS_DE.slice();offers=LIVE_OFFERS.slice();
   renderOffers();renderHomeOfferSlider();
 }
 try{
   const request=apiPost('offersCountry',{country:offerCountry||'DE',city:offerCity||'Frankenthal',postalCode:'67227',active:true});
   const timeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error('offers timeout')),5000));
   const d=await Promise.race([request,timeout]);
   if(d&&d.ok){
     const x=d.data||d,raw=Array.isArray(x)?x:(x.items||x.offers||x.data?.items||[]);
     const fresh=raw.map(o=>({store:o.store||o.Dyqani||'',category:o.category||o.Kategoria||'',name:o.name||o.product||o.Produkti||'',size:o.size||o.unit||o.Sasia||o.Njësia||'',old:o.oldPrice||o.Cmimi_Vjeter||o.normalPrice||o['Çmimi normal']||'',oldPrice:o.oldPrice||o.Cmimi_Vjeter||o.normalPrice||o['Çmimi normal']||'',price:o.price||o.Cmimi||o.offerPrice||o['Çmimi ofertë']||'',discount:o.discount||o.Zbritja||'',from:o.from||o.Nga||o['Nga data']||'',to:o.to||o.Deri||o['Deri data']||'',image:o.image||o.Foto_URL||o.imageUrl||o['Foto URL']||'',url:o.url||o.Oferta_URL||o.link||o['Link oferta']||''})).filter(o=>o.name&&o.price);
     if(fresh.length){LIVE_OFFERS=fresh;offers=fresh.slice();renderOffers();renderHomeOfferSlider()}
   }
 }catch(e){console.warn('Verified offer fallback remains active',e)}
}
setTimeout(loadOffersReal,300);
document.getElementById('stockItems').innerHTML='<div class="card muted">Inventari yt do të shfaqet këtu. Nuk përdoren produkte demo.</div>';
applyLang(); if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
restorePreferredLanguage();
const rememberedEmail=localStorage.getItem('rememberedEmail');
if(rememberedEmail&&document.getElementById('authEmail'))document.getElementById('authEmail').value=rememberedEmail;
async function startSecureSession(){
 const token=localStorage.getItem('sessionToken');
 if(!token){go('auth');return}
 // Do not leave the dashboard stuck on "loading" while Apps Script is slow.
 go('home');renderHomeOfferSlider();renderAppointments();renderAppointmentPage();
 setTimeout(()=>{loadOffersReal();loadAppointmentsReal();loadNeedBuy();loadInventoryReal()},30);
 try{
   const d=await Promise.race([apiPost('sessionCheck',{}),new Promise((_,reject)=>setTimeout(()=>reject(new Error('session timeout')),6500))]);
   if(!d||!d.ok)throw Error('invalid session');
   setTimeout(()=>{loadFamilyReal();loadFinanceReal();loadBillsReal();loadShoppingList()},50);
 }catch(e){
   // Keep local verified offers/appointment backup visible on temporary backend timeout.
   if(String(e.message)!=='session timeout'){localStorage.removeItem('sessionToken');go('auth');authMessage(lang==='sq'?'Sesioni ka skaduar. Hyr përsëri.':'Sitzung abgelaufen. Bitte erneut anmelden.',true)}
 }
}
startSecureSession();



let homeOfferSlideIndex=0,homeOfferTimer=null,homeOfferPaused=false,homeOfferStoreIndex=0;
function homeOfferText(k){const d={offer:{sq:'OFERTA',de:'ANGEBOT',en:'OFFER',it:'OFFERTA',tr:'KAMPANYA',mk:'ПОНУДА',bs:'PONUDA'},valid:{sq:'Vlen deri',de:'Gültig bis',en:'Valid until',it:'Valida fino al',tr:'Geçerli',mk:'Важи до',bs:'Važi do'},all:{sq:'Të gjitha',de:'Alle',en:'All',it:'Tutte',tr:'Tümü',mk:'Сите',bs:'Sve'},none:{sq:'Nuk ka oferta aktive.',de:'Keine aktiven Angebote.',en:'No active offers.',it:'Nessuna offerta attiva.',tr:'Aktif kampanya yok.',mk:'Нема активни понуди.',bs:'Nema aktivnih ponuda.'}};return d[k]?.[lang]||d[k]?.sq}
function offerISODate(v){v=String(v||'').trim();if(!v)return'';let m=v.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+'-'+m[2]+'-'+m[3];m=v.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);if(m)return m[3]+'-'+m[2].padStart(2,'0')+'-'+m[1].padStart(2,'0');return''}
function activeHomeOffers(){const now=new Date().toISOString().slice(0,10),src=(typeof offers!=='undefined'&&offers.length?offers:(typeof LIVE_OFFERS!=='undefined'&&LIVE_OFFERS.length?LIVE_OFFERS:VERIFIED_OFFERS_DE));return src.filter(x=>{if(!x||!x.name)return false;const until=offerISODate(x.to);return !until||until>=now}).slice(0,40)}
function homeOfferStores(rows){return [...new Set(rows.map(x=>String(x.store||'').trim()).filter(Boolean))]}
function homeOfferCategories(rows,store){return [...new Set(rows.filter(x=>!store||x.store===store).map(x=>String(x.category||x.kategoria||'').trim()).filter(Boolean))]}
function selectHomeOfferStore(i){homeOfferStoreIndex=i;homeOfferSlideIndex=0;renderHomeOfferSlider()}
function selectHomeOfferSlide(i){homeOfferSlideIndex=i;renderHomeOfferSlider()}
function moveHomeOffer(n){const rows=activeHomeOffers(),stores=homeOfferStores(rows),store=stores[homeOfferStoreIndex%Math.max(stores.length,1)],shown=rows.filter(x=>!store||x.store===store);if(!shown.length)return;homeOfferSlideIndex=(homeOfferSlideIndex+n+shown.length)%shown.length;renderHomeOfferSlider()}
function renderHomeOfferSlider(){
 const box=document.getElementById('homeOfferSlider'),dots=document.getElementById('homeOfferDots');if(!box)return;
 const rows=activeHomeOffers();if(!rows.length){box.innerHTML='<div class="homeOfferEmpty">'+homeOfferText('none')+'</div>';if(dots)dots.innerHTML='';return}
 const stores=homeOfferStores(rows);homeOfferStoreIndex=((homeOfferStoreIndex%stores.length)+stores.length)%stores.length;const store=stores[homeOfferStoreIndex],shown=rows.filter(x=>x.store===store);homeOfferSlideIndex=((homeOfferSlideIndex%shown.length)+shown.length)%shown.length;const o=shown[homeOfferSlideIndex],cat=o.category||o.kategoria||'',cats=homeOfferCategories(rows,store);
 const media=o.image?'<img src="'+esc(o.image)+'" alt="'+esc(o.name)+'" onerror="this.parentNode.innerHTML=\'<div class=homeOfferIcon>🛍️</div>\'">':'<div class="homeOfferIcon">🛍️</div>';
 const storeTabs=stores.map((x,i)=>'<button class="homeStoreTab '+(i===homeOfferStoreIndex?'on':'')+'" onclick="selectHomeOfferStore('+i+')">'+esc(x)+'</button>').join('');
 box.innerHTML='<div class="homeStoreTabs">'+storeTabs+'</div><article class="homeOfferPremium"><div class="homeOfferTop"><span class="homeOfferStore">'+esc(store)+'</span><span class="homeOfferNum">'+(homeOfferSlideIndex+1)+' / '+shown.length+'</span></div><div class="homeOfferBody"><div class="homeOfferInfo"><small>'+homeOfferText('offer')+'</small><h3>'+esc(o.name)+'</h3><div class="homeOfferCat">'+esc(cat)+(o.size?' · '+esc(o.size):'')+'</div><div class="homeOfferPrice">'+esc(String(o.price||''))+(o.price?' €':'')+(o.oldPrice?'<s>'+esc(String(o.oldPrice))+' €</s>':'')+(o.discount?'<b>−'+esc(String(o.discount))+'</b>':'')+'</div><div class="homeOfferDate">📅 '+homeOfferText('valid')+' '+esc(o.to||o.from||'')+'</div></div><div class="homeOfferMedia">'+media+'</div></div><button class="homeOfferPrev" onclick="moveHomeOffer(-1)">‹</button><button class="homeOfferNext" onclick="moveHomeOffer(1)">›</button><div class="homeOfferProgress"><i></i></div></article><div class="homeCategoryStrip">'+cats.map(x=>'<span class="'+(x===cat?'on':'')+'">'+esc(x)+'</span>').join('')+'</div>';
 if(dots)dots.innerHTML=shown.map((_,i)=>'<button aria-label="'+(i+1)+'" onclick="selectHomeOfferSlide('+i+')" class="'+(i===homeOfferSlideIndex?'on':'')+'"></button>').join('');
 clearTimeout(homeOfferTimer);if(!homeOfferPaused)homeOfferTimer=setTimeout(()=>{if(homeOfferSlideIndex+1>=shown.length){homeOfferSlideIndex=0;homeOfferStoreIndex=(homeOfferStoreIndex+1)%stores.length;renderHomeOfferSlider()}else moveHomeOffer(1)},5200)
}
let NEED_BUY_ROWS=[];
function needBuySelectedDate(){return document.getElementById('needBuyPageDate')?.value||document.getElementById('needBuyDate')?.value||new Date().toISOString().slice(0,10)}
async function loadNeedBuy(){
 const date=needBuySelectedDate();
 try{const d=await apiPost('needBuyList',{date});if(d&&d.ok)NEED_BUY_ROWS=Array.isArray(d.data)?d.data:[]}catch(e){console.warn('needBuyList',e)}
 renderNeedBuy();
}
async function addNeedBuyItem(){
 const n=document.getElementById('needBuyName')?.value.trim(),date=needBuySelectedDate();if(!n)return;
 const d=await apiPost('needBuySave',{date,name:n,status:'need'});if(!d||!d.ok)return alert(d?.error||'Gabim');
 document.getElementById('needBuyName').value='';await loadNeedBuy();
}
async function markNoShoppingToday(){
 const date=needBuySelectedDate(),d=await apiPost('needBuySave',{date,name:'Sot nuk blej asgjë',status:'none'});
 if(!d||!d.ok)return alert(d?.error||'Gabim');await loadNeedBuy();
}
async function setNeedBuyDone(id){
 const r=NEED_BUY_ROWS.find(z=>String(z.itemId)===String(id));if(!r)return;
 const d=await apiPost('needBuyUpdate',{itemId:id,status:r.status==='done'?'need':'done'});if(!d||!d.ok)return alert(d?.error||'Gabim');await loadNeedBuy();
}
function renderNeedBuy(){
 const today=new Date().toISOString().slice(0,10);['needBuyDate','needBuyPageDate'].forEach(id=>{const e=document.getElementById(id);if(e&&!e.value)e.value=today});
 const date=needBuySelectedDate(),rows=NEED_BUY_ROWS.filter(x=>!x.targetDate||String(x.targetDate).slice(0,10)===date);
 const html=rows.length?rows.map(x=>'<div class="row" style="padding:9px 0"><button class="chip" onclick="setNeedBuyDone(\''+esc(x.itemId)+'\')">'+(x.status==='done'?'🟢':x.status==='none'?'🚫':'🔴')+'</button><span class="grow" style="'+(x.status==='done'?'text-decoration:line-through;opacity:.6':'')+'">'+esc(x.Produkti||x.name||'')+'</span></div>').join(''):'Nuk ka artikuj për këtë ditë.';
 const h=document.getElementById('homeNeedBuy');if(h)h.innerHTML=html;const p=document.getElementById('needBuyItems');if(p)p.innerHTML='<div class="card">'+html+'</div>';
}
const APPOINTMENTS_KEY='meinHausAppointmentsBackup';
let APPOINTMENTS=[];try{APPOINTMENTS=JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)||'[]')}catch(e){APPOINTMENTS=[]}
function saveAppointmentsBackup(){try{localStorage.setItem(APPOINTMENTS_KEY,JSON.stringify(APPOINTMENTS))}catch(e){}}
async function loadAppointmentsReal(){
 try{const request=apiPost('appointmentList',{}),timeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error('appointments timeout')),5000));const d=await Promise.race([request,timeout]);if(d&&d.ok){const rows=Array.isArray(d.data)?d.data:[];const merged=[...APPOINTMENTS];rows.forEach(a=>{const key=x=>String(x.appointmentId||'')||[x.firstName,x.lastName,x.date,x.time,x.location].join('|').toLowerCase();const i=merged.findIndex(x=>key(x)===key(a));if(i>=0)merged[i]={...merged[i],...a};else merged.push(a)});APPOINTMENTS=merged;saveAppointmentsBackup()}}catch(e){console.warn('appointmentList',e)}
 renderAppointments();renderAppointmentPage();
}
async function addAppointment(){
 const first=aptFirst.value.trim(),last=aptLast.value.trim(),date=aptDate.value,time=aptTime.value,place=aptPlace.value.trim();
 if(!first||!date||!time||!place){alert(lang==='sq'?'Plotëso emrin, datën, orën dhe vendin.':lang==='en'?'Fill in name, date, time and place.':'Name, Datum, Uhrzeit und Ort ausfüllen.');return}
 const d=await apiPost('appointmentSave',{firstName:first,lastName:last,title:(first+' '+last).trim(),date,time,location:place,remindMinutes:1440,status:'active'});
 if(!d||!d.ok)return alert(d?.error||'Gabim');const saved=d.data||d;APPOINTMENTS.push({appointmentId:saved.appointmentId||saved.id||('local-'+Date.now()),firstName:first,lastName:last,title:(first+' '+last).trim(),date,time,location:place,remindMinutes:1440,status:'active'});saveAppointmentsBackup();await loadAppointmentsReal();requestAppNotifications();
}
async function deleteAppointment(id){const d=await apiPost('appointmentDelete',{appointmentId:id});if(!d||!d.ok)return alert(d?.error||'Gabim');await loadAppointmentsReal()}
function getAppointments(){return APPOINTMENTS}
function aptTxt(k){const d={empty:{sq:'Nuk ka termine të regjistruara.',de:'Keine Termine gespeichert.',en:'No appointments saved.',it:'Nessun appuntamento salvato.',tr:'Kayıtlı randevu yok.',mk:'Нема зачувани термини.',bs:'Nema sačuvanih termina.'},nearest:{sq:'MË I AFËRT',de:'NÄCHSTER',en:'NEXT',it:'PROSSIMO',tr:'SIRADAKİ',mk:'СЛЕДЕН',bs:'SLJEDEĆI'},delete:{sq:'Fshij',de:'Löschen',en:'Delete',it:'Elimina',tr:'Sil',mk:'Избриши',bs:'Izbriši'},reminder:{sq:'Kujtesë 1 ditë më parë',de:'Erinnerung 1 Tag vorher',en:'Reminder 1 day before',it:'Promemoria 1 giorno prima',tr:'1 gün önce hatırlat',mk:'Потсетник 1 ден порано',bs:'Podsjetnik 1 dan ranije'}};return d[k]?.[lang]||d[k]?.sq||k}
function renderAppointments(){
 const e=document.getElementById('aptList');if(!e)return;const now=new Date().toISOString().slice(0,10),arr=APPOINTMENTS.filter(x=>String(x.date||'').slice(0,10)>=now).sort((a,b)=>(String(a.date)+String(a.time)).localeCompare(String(b.date)+String(b.time)));
 e.innerHTML=arr.length?arr.map((x,i)=>'<article class="card aptPremium '+(i===0?'aptNext':'')+'"><div class="aptDateBox"><strong>'+escA(String(x.date||'').slice(8,10))+'</strong><span>'+escA(String(x.date||'').slice(5,7))+'</span></div><div class="grow">'+(i===0?'<span class="aptNearest">'+aptTxt('nearest')+'</span>':'')+'<b class="aptPerson">'+escA(((x.firstName||'')+' '+(x.lastName||'')).trim()||x.title||'Termin')+'</b><div class="aptWhen">📅 '+escA(String(x.date||'').slice(0,10))+' · ⏰ '+escA(x.time||'')+'</div><div class="aptPlace">📍 '+escA(x.location||x.title||'')+'</div><small class="muted">🔔 '+aptTxt('reminder')+'</small></div><button class="aptDelete" title="'+aptTxt('delete')+'" onclick="deleteAppointment(\''+escA(x.appointmentId)+'\')">⌫</button></article>').join(''):'<div class="card muted">'+aptTxt('empty')+'</div>';
}
function escA(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function appointmentAlarm(x){
 const who=((x.firstName||'')+' '+(x.lastName||'')).trim()||x.title||'Termin',place=x.location||'';
 const sq='🔔 Termini: '+who+'\n⏰ '+x.time+'\n📍 '+place,de='🔔 Termin: '+who+'\n⏰ '+x.time+'\n📍 '+place,en='🔔 Appointment: '+who+'\n⏰ '+x.time+'\n📍 '+place,msg=lang==='sq'?sq:lang==='en'?en:de;
 if('Notification'in window&&Notification.permission==='granted')new Notification('Mein Haus',{body:msg.replace(/\n/g,' · ')});
}
function checkAppointments(){
 const now=Date.now();APPOINTMENTS.forEach(x=>{const t=new Date(String(x.date).slice(0,10)+'T'+x.time).getTime();if(t&&now>=t-24*60*60000&&now<t-24*60*60000+60000)appointmentAlarm(x)});
}
function renderAppointmentPage(){renderAppointments();const now=new Date().toISOString().slice(0,10),rows=APPOINTMENTS.filter(x=>String(x.date||'').slice(0,10)>=now).sort((a,b)=>(String(a.date)+String(a.time)).localeCompare(String(b.date)+String(b.time)));const n=document.getElementById('homeNextAppointment'),card=n?.closest('.appointmentCard');if(n){if(rows.length){const x=rows[0],dt=new Date(String(x.date).slice(0,10)+'T'+x.time),diff=dt.getTime()-Date.now(),days=Math.max(0,Math.ceil(diff/86400000));n.innerHTML='<span class="homeAptBadge">'+aptTxt('nearest')+'</span><strong>'+escA(((x.firstName||'')+' '+(x.lastName||'')).trim()||x.title||'Termin')+'</strong><span>📅 '+escA(String(x.date||'').slice(0,10))+' · ⏰ '+escA(x.time||'')+'</span><span>📍 '+escA(x.location||x.title||'')+'</span>';card?.classList.toggle('urgent',days<=1)}else n.textContent=aptTxt('empty')}}
setInterval(checkAppointments,60000);
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
async function loginUser(){const email=document.getElementById('authEmail')?.value.trim()||'',password=document.getElementById('authPass')?.value||'';try{if(!email||!password)throw Error(lang==='sq'?'Shkruaj emailin dhe fjalëkalimin.':'E-Mail und Passwort eingeben.');authMessage('…');const d=await apiPost('login',{email,password});if(!d||!d.ok)throw Error(d?.error||(lang==='sq'?'Hyrja dështoi.':'Anmeldung fehlgeschlagen.'));const x=d.data||d;if(!x.token)throw Error(lang==='sq'?'Serveri nuk ktheu sesion.':'Keine Sitzung vom Server.');localStorage.setItem('sessionToken',x.token);localStorage.setItem('rememberedEmail',email);authMessage(lang==='sq'?'✓ U kyçe':'✓ Angemeldet');go('home');setTimeout(()=>{loadFamilyReal();loadFinanceReal();loadBillsReal();loadShoppingList();loadOffersReal();loadNeedBuy();loadAppointmentsReal();loadInventoryReal()},100)}catch(e){authMessage(e.message,true)}}

async function forgotPasswordUI(){try{const email=authEmail.value.trim();if(!email)throw Error(lang==='sq'?'Shkruaj emailin.':'Enter your email.');authMessage('…');const d=await apiPost('passwordResetRequest',{email});if(!d.ok)throw Error(d.error||'Reset failed');const x=d.data||d;document.getElementById('resetBox').style.display='block';if(x.resetToken)document.getElementById('resetToken').value=x.resetToken;authMessage(lang==='sq'?'✓ Kërkesa u pranua. Vendos fjalëkalimin e ri.':'✓ Reset request accepted. Set a new password.')}catch(e){authMessage(e.message,true)}}
async function confirmPasswordReset(){try{const token=document.getElementById('resetToken').value.trim(),password=document.getElementById('resetNewPass').value;if(!token)throw Error('Token mungon.');if(password.length<8)throw Error(lang==='sq'?'Fjalëkalimi duhet të ketë së paku 8 shenja.':'Password must have at least 8 characters.');authMessage('…');const d=await apiPost('passwordResetConfirm',{resetToken:token,password});if(!d.ok)throw Error(d.error||'Reset failed');document.getElementById('resetBox').style.display='none';authPass.value=password;authMessage(lang==='sq'?'✓ Fjalëkalimi u ndryshua. Tani shtyp Hyr.':'✓ Password changed. You can now sign in.')}catch(e){authMessage(e.message,true)}}

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
 try{const d=await apiPost('confirmScan',{scan:x});if(!d.ok)throw Error(d.error||'Ruajtja dështoi');const receiptPurchases=x.items.map((it,n)=>({ID:'receipt_'+Date.now()+'_'+n,Produkti:it.name||it.product||'',Data:x.date||'',Dyqani:x.store||'',Kategoria:it.category||'',Sasia:Number(it.quantity||1),unitPrice:Number(it.unitPrice||0),Totali:Number(it.total||0),description:'Faturë AI'}));shoppingItems=[...receiptPurchases,...shoppingItems];localStorage.setItem('meinHausReceiptPurchases',JSON.stringify(receiptPurchases));renderShoppingList();refreshHomeRealData();box.innerHTML='<b>✓ U ruajt.</b><div class="muted">Fatura u ruajt dhe produktet u shtuan te Blerjet.</div>';sessionStorage.removeItem('receiptDraft');}
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
function countryCode(){const c=(localStorage.getItem('offerCountry')||'DE').toUpperCase();return OFFER_COUNTRIES.includes(c)?c:'DE'}
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
function setOfferCountry(c){c=String(c||'DE').toUpperCase();localStorage.setItem('offerCountry',c);if(c==='DE'&&!localStorage.getItem('offerCity'))localStorage.setItem('offerCity','Frankenthal');renderOfferSources();loadOffersReal()}
function renderOfferSources(){
 const e=document.getElementById('verifiedOffers');if(!e)return;const c=countryCode(),city=localStorage.getItem('offerCity')||'',src=OFFER_SOURCES.filter(x=>x.country===c);
 const countries=['DE','IT','MK','CH'];
 const chooser='<div class="chips" style="margin-top:10px">'+countries.map(k=>'<button class="chip '+(k===c?'on':'')+'" onclick="setOfferCountry(\''+k+'\')">'+offerCountryName(k)+'</button>').join('')+'</div>';
 e.innerHTML='<div class="card"><b>📍 '+offerCountryName(c)+(city?' · '+esc(city):'')+'</b><div class="muted">Zgjidh shtetin ose përdor GPS. Zgjedhja nuk është më e fiksuar në Itali.</div>'+chooser+'<button class="chip" style="margin-top:8px" onclick="detectOfferCountryByGPS()">📍 Përdor GPS / Standort</button></div><div class="section"><h3>📚 Prospekte & Angebote</h3></div>'+
 (src.length?src.map(x=>'<div class="card row"><div class="grow"><b>'+esc(x.name)+'</b><div class="muted">'+(x.regional?'Filiale/Region auswählen':'Landesweite Angebote')+'</div></div><button class="chip" onclick="window.open(\''+x.url+'\',\'_blank\')">Prospekt ↗</button></div>').join(''):'<div class="card">Nuk ka ende burime për këtë shtet.</div>');
}
setTimeout(detectOfferCountryByGPS,500);

let productLevel='full',productUsage='normal',inventoryItems=[];
function setProductLevel(v){productLevel=v;document.querySelectorAll('#stock .chips:first-of-type .chip').forEach(b=>b.classList.remove('on'));if(window.event?.target)window.event.target.classList.add('on')}
function setProductUsage(v){productUsage=v;document.querySelectorAll('#stock .chips:nth-of-type(2) .chip').forEach(b=>b.classList.remove('on'));if(window.event?.target)window.event.target.classList.add('on')}
document.addEventListener('change',e=>{if(e.target.id==='prodPhoto'&&e.target.files?.[0]){const r=new FileReader();r.onload=()=>document.getElementById('prodPhotoPreview').innerHTML='<img src="'+r.result+'" style="width:100%;max-height:220px;object-fit:contain;border-radius:14px;margin-top:10px">';r.readAsDataURL(e.target.files[0])}});
async function loadInventoryReal(){
 const e=document.getElementById('stockItems');if(e)e.innerHTML='<div class="card muted">Po ngarkohet inventari…</div>';
 try{const d=await apiPost('inventoryList',{});if(!d||!d.ok)throw Error(d?.error||'');inventoryItems=Array.isArray(d.data)?d.data:[];renderManualProducts();refreshHomeRealData()}catch(err){if(e)e.innerHTML='<div class="card muted">Inventari nuk u ngarkua. Provo përsëri.</div>'}
}
async function saveManualProduct(){
 const name=document.getElementById('prodName')?.value.trim();if(!name)return alert('Shkruaj emrin e produktit / Produktname eingeben');
 const qty=Number(document.getElementById('prodQty')?.value||1),unit=document.getElementById('prodUnit')?.value||'Stück';
 const status={full:'full',half:'half',low:'low',empty:'empty'}[productLevel]||'full';
 const d=await apiPost('inventorySave',{product:name,quantity:qty,unit,status,note:'usage:'+productUsage,needBuy:status==='low'||status==='empty'?'po':''});
 if(!d||!d.ok)return alert(d?.error||'Nuk u ruajt produkti.');
 document.getElementById('prodName').value='';document.getElementById('prodPhotoPreview').innerHTML='';await loadInventoryReal();
}
function renderManualProducts(){
 const e=document.getElementById('stockItems');if(!e)return;const arr=inventoryItems,L={full:'🟢 Plot/Voll',half:'🟡 Gjysmë/Halb',low:'🔴 Pak/Wenig',empty:'⚫ Bosh/Leer'};
 e.innerHTML=arr.length?arr.map(x=>{const st=x.Statusi||'full',usage=String(x['Shënim']||'').replace('usage:','')||'normal';const U={frequent:'⚡ Shpesh/Häufig',normal:'↔ Normal',rare:'🐢 Rrallë/Selten'};return '<div class="card row"><div style="width:48px;height:48px;border-radius:14px;background:#eef4fb;display:grid;place-items:center;font-size:24px">📦</div><div class="grow"><b>'+esc(x.Produkti||'')+'</b><div class="muted">'+(L[st]||st)+' • '+(U[usage]||usage)+' • '+esc(String(x.Sasia||0))+' '+esc(x['Njësia']||'')+'</div></div></div>'}).join(''):'<div class="card muted">Inventari është bosh.</div>';
}
setTimeout(()=>{renderNeedBuy();renderAppointmentPage()},400);