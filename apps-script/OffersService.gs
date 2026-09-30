/**
 * Mein Haus – Offers Service v1
 * Separate country sheets. This is intentionally standalone and can later be
 * called by the main Apps Script router without changing authentication.
 */
const OFFERS_SS_ID = '1CobxMu2n4hlpquYrcMjgpFdlOBFnZ1TM8E61wpSKUZE';
const OFFER_SHEETS = {
  DE:'Oferta_DE', IT:'Oferta_IT', AT:'Oferta_AT', CH:'Oferta_CH',
  TR:'Oferta_TR', MK:'Oferta_MK', BA:'Oferta_BA'
};
const OFFER_HEADERS = ['ID','Shteti','Rajoni_Qyteti','Dyqani','Kategoria','Produkti','Pershkrimi','Sasia','Cmimi','Cmimi_Vjeter','Zbritja','Nga','Deri','Foto_URL','Oferta_URL','Aktive'];

function offersSheet_(country) {
  country=String(country||'').toUpperCase();
  const name=OFFER_SHEETS[country];
  if(!name) throw new Error('Shtet i pambështetur: '+country);
  const sh=SpreadsheetApp.openById(OFFERS_SS_ID).getSheetByName(name);
  if(!sh) throw new Error('Mungon tabela '+name);
  return sh;
}
function offersListByCountry(country, city) {
  const sh=offersSheet_(country), vals=sh.getDataRange().getValues();
  if(vals.length<2)return [];
  const h=vals[0].map(String), now=new Date(); now.setHours(0,0,0,0);
  return vals.slice(1).filter(r=>{
    const o=Object.fromEntries(h.map((k,i)=>[k,r[i]]));
    if(String(o.Aktive).toUpperCase()!=='TRUE')return false;
    if(city && o.Rajoni_Qyteti && !String(o.Rajoni_Qyteti).toLowerCase().includes(String(city).toLowerCase()))return false;
    if(o.Deri){const d=new Date(o.Deri);if(!isNaN(d)&&d<now)return false}
    return true;
  }).map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]])));
}
function offerSaveManual(country, offer) {
  const sh=offersSheet_(country), c=String(country).toUpperCase(), now=new Date();
  offer=offer||{};
  const id=offer.ID||('off_'+c.toLowerCase()+'_'+Utilities.getUuid().replace(/-/g,'').slice(0,16));
  const row=[id,c,offer.Rajoni_Qyteti||'',offer.Dyqani||'',offer.Kategoria||'',offer.Produkti||'',offer.Pershkrimi||'',offer.Sasia||'',offer.Cmimi||'',offer.Cmimi_Vjeter||'',offer.Zbritja||'',offer.Nga||'',offer.Deri||'',offer.Foto_URL||'',offer.Oferta_URL||'',offer.Aktive===false?'FALSE':'TRUE'];
  sh.appendRow(row); return {ok:true,id:id,country:c};
}
function offerDeactivate(country,id) {
  const sh=offersSheet_(country), vals=sh.getDataRange().getValues();
  for(let i=1;i<vals.length;i++)if(String(vals[i][0])===String(id)){sh.getRange(i+1,16).setValue('FALSE');return {ok:true}}
  return {ok:false,error:'Oferta nuk u gjet'};
}
function expireOffersAllCountries() {
  Object.keys(OFFER_SHEETS).forEach(c=>{
    const sh=offersSheet_(c), vals=sh.getDataRange().getValues(), today=new Date();today.setHours(0,0,0,0);
    for(let i=1;i<vals.length;i++){const d=vals[i][12] instanceof Date?vals[i][12]:new Date(vals[i][12]);if(vals[i][12]&&!isNaN(d)&&d<today)sh.getRange(i+1,16).setValue('FALSE')}
  });
}
/**
 * Hook for future importer. Never invents offers: if a legal/reliable source
 * cannot be parsed, it returns manual_required and existing Sheet data stays intact.
 */
function importOffersCountry(country) {
  const c=String(country||'').toUpperCase();
  offersSheet_(c);
  return {ok:false,status:'manual_required',country:c,message:'Nuk u gjet importer i verifikuar. Fut ofertat reale me offerSaveManual ose në tabelën e shtetit.'};
}
