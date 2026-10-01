/**
 * MEIN HAUS / SHTEPIA IME - MASTER BACKEND v5.0
 * Google Apps Script Web App
 * Script Property required: OPENAI_API_KEY
 * Optional: OPENAI_MODEL (default gpt-4.1-mini)
 */
const CFG={
  SS:'1CobxMu2n4hlpquYrcMjgpFdlOBFnZ1TM8E61wpSKUZE',TZ:'Europe/Berlin',SESSION_DAYS:30,INVITE_DAYS:7,
  LANGS:['sq','de','en','it','tr','mk','bs'],ROLES:['owner','admin','member','child']
};
const H={
 Konfigurimi:['Parametri','Vlera'],
 Users:['userId','email','displayName','firstName','lastName','phone','role','language','country','city','active','emailVerified','createdAt','lastLogin','passwordHash','passwordSalt','householdId'],
 Households:['householdId','name','ownerUserId','country','city','postalCode','currency','language','createdAt','active','plan'],
 HouseholdMembers:['householdId','memberId','userId','role','relation','displayName','firstName','lastName','birthDate','phone','joinedAt','active','permissionsJson'],
 Sessions:['tokenHash','userId','householdId','createdAt','expiresAt','device','lastSeenAt','active'],
 Invitations:['inviteId','householdId','email','role','tokenHash','invitedBy','createdAt','expiresAt','status','acceptedBy','acceptedAt'],
 PasswordReset:['resetId','userId','email','tokenHash','createdAt','expiresAt','used','usedAt'],
 ShoppingList:['householdId','itemId','productKey','Produkti','Kategoria','Sasia','Njësia','priority','source','assignedTo','status','storeHint','offerId','targetDate','createdBy','createdAt','updatedAt'],
 Inventari:['userId','householdId','ID','productKey','Produkti','Kategoria','Sasia','Njësia','Minimumi','Statusi','Duhet blerë','Njoftim ofertë','Shënim','updatedAt','lastPurchase','previousPurchase','averageDays','sampleCount','predictedEmptyDate','warningDays','predictionStatus','lastPrice','lastStore','expiryDate'],
 Blerjet:['userId','householdId','memberId','ID','Data','Ora','Dyqani','Produkti','productKey','Kategoria','Sasia','Njësia','Çmimi njësi','Totali','Në ofertë','Shënim','createdAt','daysSincePrevious','receiptScanId'],
 Financat:['userId','householdId','memberId','ID','Data','Ora','Muaji','Lloji','Kategoria','Nënkategoria','Përshkrimi','Shuma','Pagesa','Burimi','Dyqani','Shënim','createdAt'],
 Skanimet:['userId','householdId','scanId','createdAt','type','imageRef','store','receiptDate','receiptTotal','rawText','aiStatus','reviewStatus','itemsJson','error','processedAt'],
 Ofertat:['offerId','country','city','store','productKey','product','category','oldPrice','price','discount','validFrom','validTo','imageUrl','sourceUrl','sourceType','verified','createdAt','updatedAt'],
 Dyqanet:['storeId','country','city','name','address','lat','lng','website','offersUrl','active','updatedAt'],
 Budgets:['householdId','budgetId','month','category','limitAmount','spentAmount','currency','status','createdBy','updatedAt'],
 Rechnungen:['householdId','billId','name','category','amount','currency','dueDate','recurring','interval','status','paidAt','createdBy','updatedAt'],
 ExpiryTracking:['householdId','userId','itemId','productKey','Produkti','quantity','expiryDate','warningDays','status','sourcePurchaseId','updatedAt'],
 Notifications:['notificationId','userId','householdId','type','priority','titleKey','messageKey','payloadJson','createdAt','readAt','sentAt','status'],
 PushSubscriptions:['userId','householdId','endpoint','p256dh','auth','device','language','createdAt','updatedAt','active'],
 Preisverlauf:['householdId','productKey','store','date','price','currency','source','purchaseId'],
 Logs:['logId','createdAt','userId','householdId','action','status','detailsJson'],
 ProduktMap:['productKey','canonicalName','category','defaultUnit','aliasesJson','updatedAt'],
 ProduktStamm:['productKey','name','category','brand','ean','defaultUnit','imageUrl','updatedAt'],
 FamilyAppointments:['householdId','appointmentId','createdBy','firstName','lastName','title','date','time','location','notes','remindMinutes','status','createdAt','updatedAt'],
 EmailVerification:['verificationId','userId','email','tokenHash','createdAt','expiresAt','used','usedAt'],
 OfferSources:['sourceId','country','city','store','name','url','mode','regional','active','lastCheckedAt','lastStatus','updatedAt'],
 PushOutbox:['pushId','householdId','userId','title','body','url','payloadJson','createdAt','status','sentAt','error'],
 HouseholdInfo:['infoId','householdId','country','language','type','title','body','imageUrl','sourceUrl','validFrom','validTo','priority','active','createdBy','createdAt','updatedAt'],
 Prospekte:['prospectId','country','city','store','title','imageUrl','sourceUrl','validFrom','validTo','active','verified','createdAt','updatedAt']
};

function doGet(e){return out_({ok:true,data:{service:'Mein Haus / Shtëpia Ime',version:'5.0',time:now_()}})}

function doPost(e){
  let q={};
  try{
    q=JSON.parse((e.postData&&e.postData.contents)||'{}');
    return out_(route_(q));
  }catch(err){
    try{log_(null,q.action||'unknown','error',{message:String(err.message||err).slice(0,300)})}catch(ignore){}
    return out_({ok:false,error:String(err.message||err)});
  }
}

function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}

function ss_(){return SpreadsheetApp.openById(CFG.SS)}

function sh_(n){let s=ss_().getSheetByName(n);if(!s)throw Error('Sheet mungon: '+n);ensure_(s,n);return s}

function ensure_(s,n){const h=H[n];if(!h)return;if(s.getLastRow()<1){s.getRange(1,1,1,h.length).setValues([h]);return}const cur=s.getRange(1,1,1,Math.max(s.getLastColumn(),h.length)).getValues()[0];if(!cur[0])s.getRange(1,1,1,h.length).setValues([h])}

function rows_(n){const s=sh_(n),v=s.getDataRange().getValues();if(v.length<2)return[];const h=v[0];return v.slice(1).map((r,i)=>Object.fromEntries(h.map((k,j)=>[k,r[j]]))).map((x,i)=>Object.assign(x,{_row:i+2}))}

function append_(n,o){const s=sh_(n),h=s.getRange(1,1,1,s.getLastColumn()).getValues()[0];s.appendRow(h.map(k=>o[k]??''));return o}

function patch_(n,row,o){const s=sh_(n),h=s.getRange(1,1,1,s.getLastColumn()).getValues()[0],cur=s.getRange(row,1,1,h.length).getValues()[0];h.forEach((k,i)=>{if(Object.prototype.hasOwnProperty.call(o,k))cur[i]=o[k]});s.getRange(row,1,1,h.length).setValues([cur])}

function del_(n,row){sh_(n).deleteRow(row)}

function id_(p){return p+'_'+Utilities.getUuid().replace(/-/g,'').slice(0,18)}

function now_(){return Utilities.formatDate(new Date(),CFG.TZ,"yyyy-MM-dd'T'HH:mm:ss")}

function day_(){return Utilities.formatDate(new Date(),CFG.TZ,'yyyy-MM-dd')}


const COUNTRIES={
 DE:'Deutschland',AL:'Shqipëri',XK:'Kosovë',MK:'Maqedonia e Veriut',CH:'Schweiz',AT:'Österreich',
 IT:'Italia',FR:'France',BE:'Belgique',NL:'Nederland',LU:'Luxembourg',HR:'Hrvatska',SI:'Slovenija',
 BA:'Bosna i Hercegovina',ME:'Crna Gora',RS:'Srbija',TR:'Türkiye',GR:'Ελλάδα'
};
function country_(c){
  c=String(c||'DE').trim().toUpperCase();
  return COUNTRIES[c]?c:'DE';
}
function household_(m){
  const h=rows_('Households').find(x=>x.householdId===m.householdId&&String(x.active)!=='false');
  if(!h)throw Error('HOUSEHOLD_NOT_FOUND');
  return h;
}
function effectiveCountry_(q,m){
  if(q&&q.travelCountry)return country_(q.travelCountry);
  if(q&&q.gpsCountry)return country_(q.gpsCountry);
  if(m){const h=household_(m);return country_(h.country||'DE');}
  return country_(q&&q.country||'DE');
}
function norm_(s){return String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}

function hash_(s){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(s),Utilities.Charset.UTF_8).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join('')}

function secret_(){return PropertiesService.getScriptProperties().getProperty('AUTH_PEPPER')||''}

function pw_(p,s){return hash_(s+'|'+p+'|'+secret_())}

function token_(){return Utilities.getUuid()+Utilities.getUuid()}

function exp_(days){const d=new Date();d.setDate(d.getDate()+days);return d.toISOString()}

function route_(q){const publicA=['register','login','passwordResetRequest','passwordResetConfirm','emailVerify','health','publicOffers','stores'];if(q.action==='health')return{ok:true,data:healthCheck()};if(publicA.includes(q.action))return dispatch_(q,null);const me=session_(q.token);return dispatch_(q,me)}

function dispatch_(q,me){const m={register:register_,login:login_,sessionCheck:sessionCheck_,me:me_,dashboard:dashboard_,family:family_,members:family_,inviteCreate:inviteCreate_,inviteAccept:inviteAccept_,shoppingList:shoppingList_,shoppingAdd:shoppingAdd_,shoppingUpdate:shoppingUpdate_,shoppingDelete:shoppingDelete_,needBuyList:needBuyList_,needBuySave:needBuySave_,needBuyUpdate:needBuyUpdate_,inventoryList:inventoryList_,inventorySave:inventorySave_,purchaseList:purchaseList_,purchaseSave:purchaseSave_,financeList:financeList_,financeSave:financeSave_,householdAI:householdAI_,confirmScan:confirmScan_,publicOffers:publicOffers_,stores:stores_,budgetList:budgetList_,budgetSave:budgetSave_,billList:billList_,billSave:billSave_,notifications:notifications_,notificationRead:notificationRead_,pushSubscribe:pushSubscribe_,passwordResetRequest:passwordResetRequest_,passwordResetConfirm:passwordResetConfirm_,
 logout:logout_,
 profileUpdate:profileUpdate_,
 memberRoleUpdate:memberRoleUpdate_,
 memberRemove:memberRemove_,
 purchaseDelete:purchaseDelete_,
 financeDelete:financeDelete_,
 inventoryDelete:inventoryDelete_,
 expiryList:expiryList_,
 expirySave:expirySave_,
 offerSave:offerSave_,
 storeSave:storeSave_,
 configGet:configGet_,
 appointmentList:appointmentList_,
 appointmentSave:appointmentSave_,
 appointmentDelete:appointmentDelete_,
 financeByMember:financeByMember_,
 emailVerify:emailVerify_,
 sessionList:sessionList_,
 sessionRevoke:sessionRevoke_,
 offerSourceList:offerSourceList_,
 offerSourceSave:offerSourceSave_,
 notificationGenerate:notificationGenerate_,
 householdUpdate:householdUpdate_,
 householdInfoList:householdInfoList_,
 householdInfoSave:householdInfoSave_,
 prospectList:prospectList_,
 prospectSave:prospectSave_,
 pushQueue:pushQueue_,
 pushMarkSent:pushMarkSent_,
 countryContext:countryContext_,
 familyMemberSave:familyMemberSave_,familyMemberDelete:familyMemberDelete_,
 offersList:publicOffers_,offersCountry:offersCountry_,offersSync:offersSync_,offerSourcesSeed:offerSourcesSeed_};if(!m[q.action])throw Error('Action e panjohur: '+q.action);const data=m[q.action](q,me);log_(me,q.action,'ok',{});return{ok:true,data}}

function sessionCheck_(q,m){return {valid:true,userId:m.userId,householdId:m.householdId,role:m.role,language:m.language,email:m.email,displayName:m.displayName}}

function session_(t){
  if(!t)throw Error('LOGIN_REQUIRED');
  const h=hash_(t),r=rows_('Sessions').find(x=>x.tokenHash===h&&String(x.active)!=='false');
  if(!r||new Date(r.expiresAt)<new Date())throw Error('SESSION_EXPIRED');
  const u=rows_('Users').find(x=>x.userId===r.userId&&String(x.active)!=='false');
  if(!u)throw Error('USER_NOT_FOUND');
  const hm=rows_('HouseholdMembers').find(x=>x.userId===u.userId&&x.householdId===r.householdId&&String(x.active)!=='false');
  if(!hm)throw Error('HOUSEHOLD_ACCESS_REVOKED');
  patch_('Sessions',r._row,{lastSeenAt:now_()});
  return{userId:u.userId,householdId:r.householdId,role:hm.role||u.role,language:u.language,email:u.email,displayName:u.displayName};
}

function register_(q){
  const email=String(q.email||'').trim().toLowerCase();
  const first=String(q.firstName||'').trim(),last=String(q.lastName||'').trim();
  const name=String(q.displayName||((first+' '+last).trim())).trim();
  const pass=String(q.password||''),hn=String(q.householdName||'').trim();
  const country=country_(q.country||q.gpsCountry||'DE');
  if(!email||!name||pass.length<8)throw Error('Plotëso emrin, emailin dhe fjalëkalimin (min. 8).');
  if(rows_('Users').some(x=>String(x.email).toLowerCase()===email))throw Error('EMAIL_EXISTS');
  const uid=id_('u'),salt=id_('s'),lang=CFG.LANGS.includes(q.language)?q.language:'sq';
  let hid='',role='owner',houseName=hn,invite=null;
  if(q.inviteToken){
    invite=rows_('Invitations').find(x=>x.tokenHash===hash_(q.inviteToken)&&x.status==='pending');
    if(!invite||new Date(invite.expiresAt)<new Date())throw Error('INVITE_INVALID');
    if(invite.email&&String(invite.email).toLowerCase()!==email)throw Error('INVITE_EMAIL_MISMATCH');
    hid=invite.householdId;role=invite.role||'member';
    const hh=rows_('Households').find(x=>x.householdId===hid);houseName=hh?hh.name:'';
  }else{
    if(!hn)throw Error('Emri i familjes mungon.');
    hid=id_('h');
  }
  append_('Users',{userId:uid,email,displayName:name,firstName:first,lastName:last,phone:q.phone||'',role:role,language:lang,country:country,city:q.city||'',active:true,emailVerified:false,createdAt:now_(),passwordHash:pw_(pass,salt),passwordSalt:salt,householdId:hid});
  if(!invite)append_('Households',{householdId:hid,name:hn,ownerUserId:uid,country:country,city:q.city||'',postalCode:q.postalCode||'',currency:q.currency||'EUR',language:lang,createdAt:now_(),active:true,plan:'family'});
  append_('HouseholdMembers',{householdId:hid,memberId:id_('mem'),userId:uid,role:role,relation:'self',displayName:name,firstName:first,lastName:last,birthDate:'',phone:q.phone||'',joinedAt:now_(),active:true,permissionsJson:'{}'});
  if(invite)patch_('Invitations',invite._row,{status:'accepted',acceptedBy:uid,acceptedAt:now_()});
  const verifyRaw=token_();
  append_('EmailVerification',{verificationId:id_('ver'),userId:uid,email:email,tokenHash:hash_(verifyRaw),createdAt:now_(),expiresAt:exp_(2),used:false});
  const sess=newSession_(uid,hid,q.device);
  return Object.assign(sess,{user:{userId:uid,displayName:name,language:lang,role:role},household:{householdId:hid,name:houseName||hn,country:country,city:q.city||''},verificationToken:verifyRaw});
}
function login_(q){const email=String(q.email||'').trim().toLowerCase(),u=rows_('Users').find(x=>String(x.email).toLowerCase()===email&&String(x.active)!=='false');if(!u||pw_(q.password||'',u.passwordSalt)!==u.passwordHash)throw Error('Email ose fjalëkalim gabim.');patch_('Users',u._row,{lastLogin:now_()});return Object.assign(newSession_(u.userId,u.householdId,q.device),{user:{userId:u.userId,displayName:u.displayName,language:u.language,role:u.role}})}

function newSession_(uid,hid,dev){const t=token_();append_('Sessions',{tokenHash:hash_(t),userId:uid,householdId:hid,createdAt:now_(),expiresAt:exp_(CFG.SESSION_DAYS),device:dev||'',lastSeenAt:now_(),active:true});return{token:t,userId:uid,householdId:hid}}

function me_(q,m){return m}

function family_(q,m){return rows_('HouseholdMembers').filter(x=>x.householdId===m.householdId&&String(x.active)!=='false')}
function familyMemberSave_(q,m){
  const id=q.memberId||id_('mem'),first=String(q.firstName||'').trim(),last=String(q.lastName||'').trim();
  if(!first)throw Error('MEMBER_NAME_REQUIRED');
  const o={householdId:m.householdId,memberId:id,userId:q.userId||'',role:q.role||'member',relation:q.relation||'',displayName:String(q.displayName||((first+' '+last).trim())),firstName:first,lastName:last,birthDate:q.birthDate||'',phone:q.phone||'',joinedAt:q.joinedAt||now_(),active:q.active!==false,permissionsJson:q.permissionsJson||'{}'};
  const r=rows_('HouseholdMembers').find(x=>x.householdId===m.householdId&&x.memberId===id);
  if(r)patch_('HouseholdMembers',r._row,o);else append_('HouseholdMembers',o);return o;
}
function familyMemberDelete_(q,m){requireAdmin_(m);const r=rows_('HouseholdMembers').find(x=>x.householdId===m.householdId&&x.memberId===q.memberId);if(!r)throw Error('MEMBER_NOT_FOUND');if(r.userId===m.userId)throw Error('CANNOT_REMOVE_SELF');patch_('HouseholdMembers',r._row,{active:false});return true}

function inviteCreate_(q,m){if(!['owner','admin'].includes(m.role))throw Error('FORBIDDEN');const raw=token_();append_('Invitations',{inviteId:id_('inv'),householdId:m.householdId,email:String(q.email||'').toLowerCase(),role:CFG.ROLES.includes(q.role)?q.role:'member',tokenHash:hash_(raw),invitedBy:m.userId,createdAt:now_(),expiresAt:exp_(CFG.INVITE_DAYS),status:'pending'});return{inviteToken:raw}}

function inviteAccept_(q,m){
  const r=rows_('Invitations').find(x=>x.tokenHash===hash_(q.inviteToken||'')&&x.status==='pending');
  if(!r||new Date(r.expiresAt)<new Date())throw Error('INVITE_INVALID');
  if(r.email&&String(r.email).toLowerCase()!==String(m.email).toLowerCase())throw Error('INVITE_EMAIL_MISMATCH');
  const existing=rows_('HouseholdMembers').find(x=>x.householdId===r.householdId&&x.userId===m.userId);
  if(existing)patch_('HouseholdMembers',existing._row,{role:r.role,active:true,joinedAt:existing.joinedAt||now_()});
  else append_('HouseholdMembers',{householdId:r.householdId,userId:m.userId,role:r.role,displayName:m.displayName,joinedAt:now_(),active:true,permissionsJson:'{}'});
  const u=rows_('Users').find(x=>x.userId===m.userId);
  patch_('Users',u._row,{householdId:r.householdId,role:r.role});
  patch_('Invitations',r._row,{status:'accepted',acceptedBy:m.userId,acceptedAt:now_()});
  rows_('Sessions').filter(x=>x.userId===m.userId&&String(x.active)!=='false').forEach(x=>patch_('Sessions',x._row,{active:false}));
  return newSession_(m.userId,r.householdId,q.device||'invite');
}
function shoppingList_(q,m){return{items:rows_('ShoppingList').filter(x=>x.householdId===m.householdId&&x.status!=='deleted')}}

function shoppingAdd_(q,m){const name=String(q.product||q.Produkti||'').trim();if(!name)throw Error('Produkti mungon');const o={householdId:m.householdId,itemId:id_('sl'),productKey:norm_(name),Produkti:name,Kategoria:q.category||'',Sasia:Number(q.quantity||1),'Njësia':q.unit||'copë',priority:q.priority||'normal',source:q.source||'manual',assignedTo:q.assignedTo||'',status:'open',storeHint:q.storeHint||'',offerId:q.offerId||'',createdBy:m.userId,createdAt:now_(),updatedAt:now_()};append_('ShoppingList',o);return o}

function shoppingUpdate_(q,m){const r=rows_('ShoppingList').find(x=>x.itemId===q.itemId&&x.householdId===m.householdId);if(!r)throw Error('ITEM_NOT_FOUND');patch_('ShoppingList',r._row,{status:q.status||r.status,Sasia:q.quantity??r.Sasia,'Njësia':q.unit??r['Njësia'],updatedAt:now_()});return true}

function shoppingDelete_(q,m){const r=rows_('ShoppingList').find(x=>x.itemId===q.itemId&&x.householdId===m.householdId);if(!r)throw Error('ITEM_NOT_FOUND');patch_('ShoppingList',r._row,{status:'deleted',updatedAt:now_()});return true}

function needBuyList_(q,m){
  const date=String(q.date||'').trim();
  return rows_('ShoppingList').filter(x=>x.householdId===m.householdId&&x.source==='needbuy'&&(!date||String(x.targetDate||'')===date));
}
function needBuySave_(q,m){
  const date=String(q.date||day_()).slice(0,10),name=String(q.name||q.Produkti||'').trim();
  if(!name)throw Error('PRODUCT_REQUIRED');
  const o={householdId:m.householdId,itemId:id_('need'),productKey:key_(name),Produkti:name,Kategoria:q.category||'',Sasia:Number(q.quantity||1),Njësia:q.unit||'copë',priority:q.priority||'normal',source:'needbuy',assignedTo:'',status:q.status||'need',storeHint:q.storeHint||'',offerId:'',targetDate:date,createdBy:m.userId,createdAt:now_(),updatedAt:now_()};
  append_('ShoppingList',o);return o;
}
function needBuyUpdate_(q,m){
  const r=rows_('ShoppingList').find(x=>x.itemId===q.itemId&&x.householdId===m.householdId&&x.source==='needbuy');
  if(!r)throw Error('ITEM_NOT_FOUND');
  const p={updatedAt:now_()};
  if(q.status!=null)p.status=q.status;
  if(q.name!=null)p.Produkti=String(q.name).trim();
  if(q.date!=null)p.targetDate=String(q.date).slice(0,10);
  patch_('ShoppingList',r._row,p);return true;
}

function inventoryList_(q,m){return rows_('Inventari').filter(x=>x.householdId===m.householdId)}

function inventorySave_(q,m){const name=String(q.product||q.Produkti||'').trim(),key=norm_(name),all=rows_('Inventari'),r=all.find(x=>x.householdId===m.householdId&&x.productKey===key);const qty=Number(q.quantity??q.Sasia??1),o={userId:m.userId,householdId:m.householdId,ID:r?r.ID:id_('stk'),productKey:key,Produkti:name,Kategoria:q.category||'',Sasia:qty,'Njësia':q.unit||'copë',Minimumi:Number(q.minimum||0),Statusi:q.status||'', 'Duhet blerë':q.needBuy||'', 'Njoftim ofertë':q.offerAlert||'', 'Shënim':q.note||'',updatedAt:now_(),lastPrice:q.lastPrice||'',lastStore:q.lastStore||'',expiryDate:q.expiryDate||''};if(r)patch_('Inventari',r._row,o);else append_('Inventari',o);return o}

function purchaseList_(q,m){return rows_('Blerjet').filter(x=>x.householdId===m.householdId)}

function purchaseSave_(q,m){
  const name=String(q.product||'').trim();
  if(!name)throw Error('PRODUCT_REQUIRED');
  const o={userId:m.userId,householdId:m.householdId,memberId:q.memberId||'',ID:id_('buy'),Data:q.date||day_(),Ora:q.time||Utilities.formatDate(new Date(),CFG.TZ,'HH:mm'),Dyqani:q.store||'',Produkti:name,productKey:norm_(name),Kategoria:q.category||'',Sasia:Number(q.quantity||1),'Njësia':q.unit||'copë','Çmimi njësi':Number(q.unitPrice||0),Totali:Number(q.total||0),'Në ofertë':q.onOffer||false,'Shënim':q.note||q.description||'',createdAt:now_(),receiptScanId:q.receiptScanId||''};
  append_('Blerjet',o);
  const inv=rows_('Inventari').find(x=>x.householdId===m.householdId&&x.productKey===o.productKey);
  const newQty=(inv?Number(inv.Sasia||0):0)+Number(o.Sasia||0);
  inventorySave_({product:o.Produkti,quantity:newQty,unit:o['Njësia'],category:o.Kategoria,lastPrice:o['Çmimi njësi'],lastStore:o.Dyqani},m);
  price_(m,o);
  return o;
}
function financeList_(q,m){return rows_('Financat').filter(x=>x.householdId===m.householdId)}

function financeSave_(q,m){
  const d=q.date||day_(),amount=Number(q.amount||0);if(!amount)throw Error('AMOUNT_REQUIRED');
  const type=(q.type==='hyrje'||q.type==='income')?'hyrje':'dalje';
  const o={userId:m.userId,householdId:m.householdId,memberId:q.memberId||'',ID:id_('fin'),Data:d,Ora:q.time||Utilities.formatDate(new Date(),CFG.TZ,'HH:mm'),Muaji:d.slice(0,7),Lloji:type,Kategoria:q.category||'Tjetër','Nënkategoria':q.subcategory||'',Përshkrimi:q.description||'',Shuma:amount,Pagesa:q.paymentMethod||q.payment||'cash',Burimi:q.source||'manual',Dyqani:q.store||'','Shënim':q.note||'',createdAt:now_()};append_('Financat',o);return o
}

function householdAI_(q,m){if(q.task!=='receipt_scan')return aiText_(q,m);const img=String(q.imageDataUrl||'');if(!img.startsWith('data:image/'))throw Error('IMAGE_REQUIRED');const prompt='Read this retail receipt carefully. Return ONLY JSON: {store:string,date:YYYY-MM-DD,total:number,currency:string,rawText:string,items:[{name:string,quantity:number,unit:string,unitPrice:number,total:number,category:string}]}. Never invent unreadable items. Use null/empty when uncertain.';const x=openaiJson_(prompt,img);const scanId=id_('scan');append_('Skanimet',{userId:m.userId,householdId:m.householdId,scanId,createdAt:now_(),type:'receipt',imageRef:'not_stored',store:x.store||'',receiptDate:x.date||'',receiptTotal:Number(x.total||0),rawText:x.rawText||'',aiStatus:'done',reviewStatus:'pending',itemsJson:JSON.stringify(x.items||[]),error:'',processedAt:now_()});x.scanId=scanId;return x}

function openai_(prompt,img){
  const props=PropertiesService.getScriptProperties();
  const key=props.getProperty('OPENAI_API_KEY');
  if(!key)throw Error('OPENAI_API_KEY mungon te Script Properties');
  const model=props.getProperty('OPENAI_MODEL')||'gpt-4.1-mini';
  const content=[{type:'input_text',text:prompt}];
  if(img&&String(img).startsWith('data:image/'))content.push({type:'input_image',image_url:img});
  const body={model:model,input:[{role:'user',content:content}]};
  const r=UrlFetchApp.fetch('https://api.openai.com/v1/responses',{
    method:'post',
    contentType:'application/json',
    headers:{Authorization:'Bearer '+key},
    payload:JSON.stringify(body),
    muteHttpExceptions:true
  });
  if(r.getResponseCode()>=300)throw Error('AI '+r.getResponseCode()+': '+r.getContentText().slice(0,500));
  const j=JSON.parse(r.getContentText());
  return j.output_text||((j.output||[]).flatMap(x=>x.content||[]).find(x=>x.text)||{}).text||'';
}

function openaiJson_(prompt,img){
  const txt=openai_(prompt+'\\nReturn ONLY valid JSON. No markdown.',img);
  return JSON.parse(String(txt).replace(/^```json\\s*/,'').replace(/```$/,'').trim());
}

function aiText_(q,m){
  return {text:openai_('Answer in '+(q.language||m.language||'sq')+'. Household assistant question: '+String(q.message||q.prompt||''),'')};
}

function confirmScan_(q,m){
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    let x=q.scan||q;
    const r=x.scanId?rows_('Skanimet').find(z=>z.scanId===x.scanId&&z.householdId===m.householdId):null;
    if(r&&r.reviewStatus==='confirmed')return{savedItems:0,total:Number(r.receiptTotal||0),alreadyConfirmed:true};
    if(r&&!x.items)x={scanId:r.scanId,store:r.store,date:r.receiptDate,total:r.receiptTotal,items:JSON.parse(r.itemsJson||'[]')};
    const items=(x.items||[]).filter(it=>String(it.name||it.product||'').trim());
    if(!items.length)throw Error('NO_ITEMS');
    items.forEach(it=>purchaseSave_({date:x.date||day_(),store:x.store||'',product:it.name||it.product,quantity:Number(it.quantity||1),unit:it.unit||'copë',unitPrice:Number(it.unitPrice||it.price||0),total:Number(it.total||0),category:it.category||'',receiptScanId:x.scanId||''},m));
    const total=Number(x.total||items.reduce((sum,i)=>sum+Number(i.total||0),0));
    financeSave_({date:x.date||day_(),type:'dalje',category:'Blerje',description:'Kassenbon '+(x.store||''),amount:total,source:'receipt',store:x.store||''},m);
    if(r)patch_('Skanimet',r._row,{reviewStatus:'confirmed',processedAt:now_()});
    return{savedItems:items.length,total:total,alreadyConfirmed:false};
  }finally{lock.releaseLock()}
}
function price_(m,o){append_('Preisverlauf',{householdId:m.householdId,productKey:o.productKey,store:o.Dyqani,date:o.Data,price:o['Çmimi njësi'],currency:'EUR',source:'purchase',purchaseId:o.ID})}

function dashboard_(q,m){const inv=inventoryList_(q,m),fin=financeList_(q,m),shop=shoppingList_(q,m).items;return{inventoryCount:inv.length,shoppingOpen:shop.filter(x=>x.status==='open').length,financeMonth:fin.filter(x=>String(x.Data).slice(0,7)===day_().slice(0,7)).reduce((s,x)=>s+(x.Lloji==='hyrje'?1:-1)*Number(x.Shuma||0),0)}}

function publicOffers_(q,m){
  q=q||{};
  const c=effectiveCountry_(q,m),city=String(q.city||q.qyteti||'').trim();
  return offersCountry_(Object.assign({},q,{country:c,city:city}),m);
}
function offersCountry_(q,m){
  q=q||{};
  const c=String(q.country||q.shteti||effectiveCountry_(q,m)||'DE').trim().toUpperCase();
  const city=String(q.city||q.qyteti||'').trim();
  const raw=offersListByCountry(c,city);
  return {
    country:c,
    city:city,
    items:raw.map(o=>({
      id:String(o.ID||''),
      country:String(o.Shteti||c),
      city:String(o.Rajoni_Qyteti||''),
      store:String(o.Dyqani||''),
      category:String(o.Kategoria||''),
      name:String(o.Produkti||''),
      description:String(o.Pershkrimi||''),
      size:String(o.Sasia||''),
      price:String(o.Cmimi||''),
      oldPrice:String(o.Cmimi_Vjeter||''),
      discount:String(o.Zbritja||''),
      from:offerDateIso_(o.Nga),
      to:offerDateIso_(o.Deri),
      image:String(o.Foto_URL||''),
      url:String(o.Oferta_URL||'')
    }))
  };
}
function offerDateIso_(v){
  if(!v)return '';
  if(v instanceof Date&&!isNaN(v))return Utilities.formatDate(v,Session.getScriptTimeZone()||'Europe/Berlin','yyyy-MM-dd');
  const d=new Date(v);
  return isNaN(d)?String(v):Utilities.formatDate(d,Session.getScriptTimeZone()||'Europe/Berlin','yyyy-MM-dd');
}
function stores_(q,m){
  const c=effectiveCountry_(q,m),city=norm_(q.city||'');
  return rows_('Dyqanet')
    .filter(x=>String(x.country).toUpperCase()===c)
    .filter(x=>!city||!x.city||norm_(x.city).includes(city))
    .filter(x=>String(x.active)!=='false');
}
function budgetList_(q,m){return rows_('Budgets').filter(x=>x.householdId===m.householdId)}

function budgetSave_(q,m){const o={householdId:m.householdId,budgetId:id_('bud'),month:q.month||day_().slice(0,7),category:q.category||'',limitAmount:Number(q.limitAmount||0),spentAmount:0,currency:'EUR',status:'active',createdBy:m.userId,updatedAt:now_()};append_('Budgets',o);return o}

function billList_(q,m){return rows_('Rechnungen').filter(x=>x.householdId===m.householdId)}

function billSave_(q,m){const o={householdId:m.householdId,billId:id_('bill'),name:q.name||'',category:q.category||'',amount:Number(q.amount||0),currency:'EUR',dueDate:q.dueDate||'',recurring:!!q.recurring,interval:q.interval||'',status:'open',paidAt:'',createdBy:m.userId,updatedAt:now_()};append_('Rechnungen',o);return o}

function notifications_(q,m){return rows_('Notifications').filter(x=>x.householdId===m.householdId&&(x.userId===m.userId||!x.userId))}

function notificationRead_(q,m){const r=rows_('Notifications').find(x=>x.notificationId===q.notificationId&&x.householdId===m.householdId);if(r)patch_('Notifications',r._row,{readAt:now_(),status:'read'});return true}

function pushSubscribe_(q,m){append_('PushSubscriptions',{userId:m.userId,householdId:m.householdId,endpoint:q.endpoint||'',p256dh:q.p256dh||'',auth:q.auth||'',device:q.device||'',language:q.language||m.language,createdAt:now_(),updatedAt:now_(),active:true});return true}

function passwordResetRequest_(q){const u=rows_('Users').find(x=>String(x.email).toLowerCase()===String(q.email||'').toLowerCase());if(!u)return{accepted:true};const raw=token_();append_('PasswordReset',{resetId:id_('rst'),userId:u.userId,email:u.email,tokenHash:hash_(raw),createdAt:now_(),expiresAt:exp_(1),used:false});return{accepted:true,resetToken:raw}}

function passwordResetConfirm_(q){
  const pass=String(q.password||'');
  if(pass.length<8)throw Error('PASSWORD_MIN_8');
  const r=rows_('PasswordReset').find(x=>x.tokenHash===hash_(q.resetToken||'')&&String(x.used)!=='true');
  if(!r||new Date(r.expiresAt)<new Date())throw Error('RESET_INVALID');
  const u=rows_('Users').find(x=>x.userId===r.userId),salt=id_('s');
  if(!u)throw Error('USER_NOT_FOUND');
  patch_('Users',u._row,{passwordSalt:salt,passwordHash:pw_(pass,salt)});
  patch_('PasswordReset',r._row,{used:true,usedAt:now_()});
  rows_('Sessions').filter(x=>x.userId===u.userId&&String(x.active)!=='false').forEach(x=>patch_('Sessions',x._row,{active:false}));
  return true;
}
function log_(m,a,s,d){try{append_('Logs',{logId:id_('log'),createdAt:now_(),userId:m?m.userId:'',householdId:m?m.householdId:'',action:a,status:s,detailsJson:JSON.stringify(d||{})})}catch(e){}}

function requireAdmin_(m){
  if(!m||!['owner','admin'].includes(m.role))throw Error('FORBIDDEN');
}

function logout_(q,m){
  const h=hash_(q.token||'');
  const r=rows_('Sessions').find(x=>x.tokenHash===h&&x.userId===m.userId);
  if(r)patch_('Sessions',r._row,{active:false,lastSeenAt:now_()});
  return true;
}

function profileUpdate_(q,m){
  const u=rows_('Users').find(x=>x.userId===m.userId);
  if(!u)throw Error('USER_NOT_FOUND');
  const o={};
  if(q.displayName)o.displayName=String(q.displayName).trim();
  if(CFG.LANGS.includes(q.language))o.language=q.language;
  patch_('Users',u._row,o);
  const hm=rows_('HouseholdMembers').find(x=>x.userId===m.userId&&x.householdId===m.householdId);
  if(hm&&o.displayName)patch_('HouseholdMembers',hm._row,{displayName:o.displayName});
  return o;
}

function memberRoleUpdate_(q,m){
  requireAdmin_(m);
  if(!CFG.ROLES.includes(q.role))throw Error('ROLE_INVALID');
  const hm=rows_('HouseholdMembers').find(x=>x.userId===q.userId&&x.householdId===m.householdId);
  if(!hm)throw Error('MEMBER_NOT_FOUND');
  if(hm.role==='owner'&&m.role!=='owner')throw Error('OWNER_ONLY');
  patch_('HouseholdMembers',hm._row,{role:q.role});
  const u=rows_('Users').find(x=>x.userId===q.userId);
  if(u)patch_('Users',u._row,{role:q.role});
  return true;
}

function memberRemove_(q,m){
  requireAdmin_(m);
  if(q.userId===m.userId)throw Error('CANNOT_REMOVE_SELF');
  const hm=rows_('HouseholdMembers').find(x=>x.userId===q.userId&&x.householdId===m.householdId);
  if(!hm)throw Error('MEMBER_NOT_FOUND');
  if(hm.role==='owner')throw Error('CANNOT_REMOVE_OWNER');
  patch_('HouseholdMembers',hm._row,{active:false});
  return true;
}

function purchaseDelete_(q,m){
  const r=rows_('Blerjet').find(x=>x.ID===q.id&&x.householdId===m.householdId);
  if(!r)throw Error('PURCHASE_NOT_FOUND');
  del_('Blerjet',r._row);
  return true;
}

function financeDelete_(q,m){
  const r=rows_('Financat').find(x=>x.ID===q.id&&x.householdId===m.householdId);
  if(!r)throw Error('FINANCE_NOT_FOUND');
  del_('Financat',r._row);
  return true;
}

function inventoryDelete_(q,m){
  const r=rows_('Inventari').find(x=>x.ID===q.id&&x.householdId===m.householdId);
  if(!r)throw Error('INVENTORY_NOT_FOUND');
  del_('Inventari',r._row);
  return true;
}

function expiryList_(q,m){
  return rows_('ExpiryTracking').filter(x=>x.householdId===m.householdId);
}

function expirySave_(q,m){
  const o={
    householdId:m.householdId,
    userId:m.userId,
    itemId:q.itemId||id_('exp'),
    productKey:norm_(q.product||q.Produkti),
    Produkti:q.product||q.Produkti||'',
    quantity:Number(q.quantity||1),
    expiryDate:q.expiryDate||'',
    warningDays:Number(q.warningDays||5),
    status:q.status||'active',
    sourcePurchaseId:q.sourcePurchaseId||'',
    updatedAt:now_()
  };
  const r=rows_('ExpiryTracking').find(x=>x.itemId===o.itemId&&x.householdId===m.householdId);
  if(r)patch_('ExpiryTracking',r._row,o);else append_('ExpiryTracking',o);
  return o;
}

function offerSave_(q,m){
  requireAdmin_(m);
  const o={
    offerId:q.offerId||id_('off'),
    country:String(q.country||'DE').toUpperCase(),
    city:q.city||'',
    store:q.store||'',
    productKey:norm_(q.product),
    product:q.product||'',
    category:q.category||'',
    oldPrice:Number(q.oldPrice||0),
    price:Number(q.price||0),
    discount:Number(q.discount||0),
    validFrom:q.validFrom||'',
    validTo:q.validTo||'',
    imageUrl:q.imageUrl||'',
    sourceUrl:q.sourceUrl||'',
    sourceType:q.sourceType||'manual',
    verified:q.verified!==false,
    createdAt:now_(),
    updatedAt:now_()
  };
  append_('Ofertat',o);
  return o;
}

function storeSave_(q,m){
  requireAdmin_(m);
  const o={
    storeId:q.storeId||id_('store'),
    country:String(q.country||'DE').toUpperCase(),
    city:q.city||'',
    name:q.name||'',
    address:q.address||'',
    lat:q.lat||'',
    lng:q.lng||'',
    website:q.website||'',
    offersUrl:q.offersUrl||'',
    active:q.active!==false,
    updatedAt:now_()
  };
  append_('Dyqanet',o);
  return o;
}

function configGet_(q,m){
  const all=rows_('Konfigurimi');
  const o={};
  all.forEach(x=>o[x.Parametri]=x.Vlera);
  delete o.OpenAISecret;
  return o;
}

function createNotification_(householdId,userId,type,priority,titleKey,messageKey,payload){
  const n=append_('Notifications',{
    notificationId:id_('not'),userId:userId||'',householdId:householdId,type:type||'info',
    priority:priority||'normal',titleKey:titleKey||'',messageKey:messageKey||'',
    payloadJson:JSON.stringify(payload||{}),createdAt:now_(),readAt:'',sentAt:'',status:'new'
  });
  queuePush_(householdId,userId,titleKey,messageKey,'',payload||{});
  return n;
}

function notificationExistsToday_(hid,uid,type,payloadKey){
  const today=day_();
  return rows_('Notifications').some(x=>x.householdId===hid&&String(x.userId||'')===String(uid||'')&&x.type===type&&String(x.createdAt).slice(0,10)===today&&String(x.payloadJson||'').includes(payloadKey));
}
function scheduledHouseholdChecks(){
  const now=new Date();
  rows_('ExpiryTracking').forEach(x=>{
    if(!x.expiryDate||x.status!=='active')return;
    const d=Math.ceil((new Date(x.expiryDate)-now)/86400000);
    if(d<=Number(x.warningDays||5)&&d>=0&&!notificationExistsToday_(x.householdId,x.userId,'expiry',x.itemId)){
      createNotification_(x.householdId,x.userId,'expiry','high','expiry.title','expiry.message',{key:x.itemId,product:x.Produkti,days:d});
    }
  });
  rows_('Inventari').forEach(x=>{
    if((String(x['Duhet blerë']).toLowerCase()==='po'||String(x.predictionStatus)==='EMPTY')&&!notificationExistsToday_(x.householdId,x.userId,'inventory',x.ID)){
      createNotification_(x.householdId,x.userId,'inventory','high','stock.low','stock.buy',{key:x.ID,product:x.Produkti});
    }
  });
  rows_('FamilyAppointments').forEach(x=>{
    if(x.status!=='active'||!x.date||!x.time)return;
    const at=new Date(String(x.date)+'T'+String(x.time));
    const mins=(at-now)/60000,lead=Number(x.remindMinutes||30);
    if(mins<=lead&&mins>=0&&!notificationExistsToday_(x.householdId,'','appointment',x.appointmentId)){
      createNotification_(x.householdId,'','appointment','high','appointment.title','appointment.message',{key:x.appointmentId,title:x.title,firstName:x.firstName,lastName:x.lastName,date:x.date,time:x.time,location:x.location});
    }
  });
  return true;
}
function installTriggers(){
  ScriptApp.getProjectTriggers().forEach(t=>{
    if(t.getHandlerFunction()==='scheduledHouseholdChecks')ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('scheduledHouseholdChecks').timeBased().everyHours(6).create();
  return 'TRIGGER_OK';
}

function healthCheck(){
  const required=['Users','Households','HouseholdMembers','Sessions','ShoppingList','Inventari','Blerjet','Financat','Skanimet','Ofertat','Dyqanet','Notifications'];
  return {
    ok:true,
    version:'5.0',
    spreadsheet:CFG.SS,
    sheets:required.map(n=>({name:n,exists:!!ss_().getSheetByName(n)})),
    openAIConfigured:!!PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY'),
    authPepperConfigured:!!PropertiesService.getScriptProperties().getProperty('AUTH_PEPPER')
  };
}

function emailVerify_(q){
  const r=rows_('EmailVerification').find(x=>x.tokenHash===hash_(q.verificationToken||'')&&String(x.used)!=='true');
  if(!r||new Date(r.expiresAt)<new Date())throw Error('VERIFY_INVALID');
  const u=rows_('Users').find(x=>x.userId===r.userId);
  if(!u)throw Error('USER_NOT_FOUND');
  patch_('Users',u._row,{emailVerified:true});
  patch_('EmailVerification',r._row,{used:true,usedAt:now_()});
  return true;
}
function sessionList_(q,m){
  return rows_('Sessions').filter(x=>x.userId===m.userId&&String(x.active)!=='false').map(x=>({
    createdAt:x.createdAt,expiresAt:x.expiresAt,device:x.device,lastSeenAt:x.lastSeenAt,active:x.active,tokenHash:String(x.tokenHash).slice(0,10)+'…'
  }));
}
function sessionRevoke_(q,m){
  const prefix=String(q.tokenHashPrefix||'');
  const r=rows_('Sessions').find(x=>x.userId===m.userId&&String(x.tokenHash).startsWith(prefix));
  if(!r)throw Error('SESSION_NOT_FOUND');
  patch_('Sessions',r._row,{active:false});
  return true;
}
function appointmentList_(q,m){
  return rows_('FamilyAppointments').filter(x=>x.householdId===m.householdId&&x.status!=='deleted');
}
function appointmentSave_(q,m){
  const id=q.appointmentId||id_('apt');
  const o={householdId:m.householdId,appointmentId:id,createdBy:m.userId,firstName:q.firstName||'',lastName:q.lastName||'',title:q.title||'',date:q.date||'',time:q.time||'',location:q.location||'',notes:q.notes||'',remindMinutes:Number(q.remindMinutes||30),status:q.status||'active',createdAt:q.createdAt||now_(),updatedAt:now_()};
  const r=rows_('FamilyAppointments').find(x=>x.appointmentId===id&&x.householdId===m.householdId);
  if(r)patch_('FamilyAppointments',r._row,o);else append_('FamilyAppointments',o);
  return o;
}
function appointmentDelete_(q,m){
  const r=rows_('FamilyAppointments').find(x=>x.appointmentId===q.appointmentId&&x.householdId===m.householdId);
  if(!r)throw Error('APPOINTMENT_NOT_FOUND');
  patch_('FamilyAppointments',r._row,{status:'deleted',updatedAt:now_()});
  return true;
}
function financeByMember_(q,m){
  const all=rows_('Financat').filter(x=>x.householdId===m.householdId);
  const members=family_(q,m);
  return members.map(mem=>{
    const rows=all.filter(x=>(mem.memberId&&x.memberId===mem.memberId)||(!x.memberId&&mem.userId&&x.userId===mem.userId));
    return {memberId:mem.memberId||'',userId:mem.userId||'',displayName:mem.displayName,role:mem.role,relation:mem.relation||'',
      income:rows.filter(x=>x.Lloji==='hyrje').reduce((a,x)=>a+Number(x.Shuma||0),0),
      expense:rows.filter(x=>x.Lloji!=='hyrje').reduce((a,x)=>a+Number(x.Shuma||0),0),
      count:rows.length};
  });
}
function offerSourcesSeed_(q,m){
  requireAdmin_(m);const city=q.city||household_(m).city||'Frankenthal';const country=country_(q.country||household_(m).country||'DE');
  const src=[
   {store:'Netto Marken-Discount',name:'Netto Frankenthal',url:'https://www.netto-online.de/filialen/frankenthal-pfalz/eisenbahnstr-23/8168/?stores_id=8168'},
   {store:'REWE',name:'REWE Frankenthal',url:'https://www.rewe.de/marktseite/frankenthal/840226/rewe-markt-benderstr-3/'},
   {store:'ALDI SÜD',name:'ALDI SÜD Angebote',url:'https://www.aldi-sued.de/angebote'},
   {store:'Lidl',name:'Lidl Prospekte',url:'https://www.lidl.de/c/online-prospekte/s10005610'},
   {store:'Kaufland',name:'Kaufland Angebote',url:'https://filiale.kaufland.de/angebote/aktuelle-woche.html'}];
  const existing=rows_('OfferSources');src.forEach(x=>{if(!existing.some(e=>e.url===x.url))append_('OfferSources',{sourceId:id_('src'),country,city,store:x.store,name:x.name,url:x.url,mode:'offers',regional:true,active:true,lastCheckedAt:'',lastStatus:'new',updatedAt:now_()})});return offerSourceList_({country},m)
}
function offersSync_(q,m){
  requireAdmin_(m);const country=effectiveCountry_(q,m),city=q.city||household_(m).city||'';let sources=offerSourceList_({country},m);if(!sources.length)sources=offerSourcesSeed_({country,city},m);
  const result=[];sources.filter(x=>String(x.active)!=='false').forEach(src=>{try{
    const res=UrlFetchApp.fetch(src.url,{muteHttpExceptions:true,followRedirects:true,headers:{'User-Agent':'Mozilla/5.0'}});if(res.getResponseCode()>=400)throw Error('HTTP '+res.getResponseCode());
    const html=String(res.getContentText());
    const imageUrls=[...html.matchAll(/(?:src|data-src|data-original|content)=["']([^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi)].map(x=>x[1]).filter(x=>/^https?:\/\//i.test(x)).slice(0,120);
    let text=html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').slice(0,50000);
    const prompt='Extract ONLY currently valid retail offers from this store page. Return JSON object {offers:[{product,category,oldPrice,price,discount,validFrom,validTo,imageUrl,sourceUrl}]}. Match each product to its REAL product image URL from the supplied image URLs when possible; never invent an image URL. Prices numbers only. Dates YYYY-MM-DD. Do not invent products or prices. Store: '+src.store+'; city: '+city+'; page URL: '+src.url+'; image URLs: '+imageUrls.join(' | ')+'; page text: '+text;
    const j=openaiJson_(prompt,''),offers=Array.isArray(j.offers)?j.offers:[];
    offers.forEach(o=>{if(!o.product||!Number(o.price))return;const key=norm_(o.product),found=rows_('Ofertat').find(z=>String(z.country).toUpperCase()===country&&norm_(z.city)===norm_(city)&&norm_(z.store)===norm_(src.store)&&z.productKey===key&&String(z.validTo||'')===String(o.validTo||''));const row={offerId:found?found.offerId:id_('off'),country,city,store:src.store,productKey:key,product:o.product,category:o.category||'',oldPrice:Number(o.oldPrice||0),price:Number(o.price||0),discount:Number(o.discount||0),validFrom:o.validFrom||'',validTo:o.validTo||'',imageUrl:o.imageUrl||'',sourceUrl:o.sourceUrl||src.url,sourceType:'auto',verified:true,createdAt:found?found.createdAt||now_():now_(),updatedAt:now_()};if(found)patch_('Ofertat',found._row,row);else append_('Ofertat',row);syncOfferImageToCountrySheet_(country,city,src.store,o.product,o.imageUrl||'',o.sourceUrl||src.url);result.push(row)});
    patch_('OfferSources',src._row,{lastCheckedAt:now_(),lastStatus:'ok:'+offers.length,updatedAt:now_()});
  }catch(e){patch_('OfferSources',src._row,{lastCheckedAt:now_(),lastStatus:'error:'+String(e.message||e).slice(0,120),updatedAt:now_()})}});
  return {imported:result.length,offers:publicOffers_({country,city},m)}
}

function syncOfferImageToCountrySheet_(country,city,store,product,imageUrl,sourceUrl){
  if(!imageUrl)return;
  try{
    const sh=offersSheet_(country),vals=sh.getDataRange().getValues();if(vals.length<2)return;
    const h=vals[0].map(String),ix={};h.forEach((k,i)=>ix[k]=i);
    for(let r=1;r<vals.length;r++){
      if(norm_(vals[r][ix.Dyqani])===norm_(store)&&norm_(vals[r][ix.Produkti])===norm_(product)){
        if(ix.Foto_URL!=null)sh.getRange(r+1,ix.Foto_URL+1).setValue(imageUrl);
        if(ix.Oferta_URL!=null&&sourceUrl)sh.getRange(r+1,ix.Oferta_URL+1).setValue(sourceUrl);
      }
    }
  }catch(e){}
}
function offerSourceList_(q,m){
  return rows_('OfferSources').filter(x=>String(x.active)!=='false'&&(!q.country||String(x.country).toUpperCase()===String(q.country).toUpperCase()));
}
function offerSourceSave_(q,m){
  requireAdmin_(m);
  const id=q.sourceId||id_('src');
  const o={sourceId:id,country:String(q.country||'DE').toUpperCase(),city:q.city||'',store:q.store||'',name:q.name||'',url:q.url||'',mode:q.mode||'offers',regional:q.regional!==false,active:q.active!==false,lastCheckedAt:q.lastCheckedAt||'',lastStatus:q.lastStatus||'',updatedAt:now_()};
  const r=rows_('OfferSources').find(x=>x.sourceId===id);
  if(r)patch_('OfferSources',r._row,o);else append_('OfferSources',o);
  return o;
}
function notificationGenerate_(q,m){
  scheduledHouseholdChecks();
  return notifications_(q,m);
}

function countryContext_(q,m){
  const h=household_(m);
  const base=country_(h.country||'DE');
  const active=effectiveCountry_(q,m);
  return {baseCountry:base,activeCountry:active,countryName:COUNTRIES[active],city:q.city||h.city||'',travelMode:active!==base,countries:COUNTRIES};
}
function householdUpdate_(q,m){
  requireAdmin_(m);
  const h=household_(m),o={};
  if(q.name)o.name=String(q.name).trim();
  if(q.country)o.country=country_(q.country);
  if(Object.prototype.hasOwnProperty.call(q,'city'))o.city=q.city||'';
  if(Object.prototype.hasOwnProperty.call(q,'postalCode'))o.postalCode=q.postalCode||'';
  if(q.currency)o.currency=q.currency;
  if(CFG.LANGS.includes(q.language))o.language=q.language;
  patch_('Households',h._row,o);
  return Object.assign({},h,o);
}
function householdInfoList_(q,m){
  const c=effectiveCountry_(q,m),lang=q.language||m.language||'sq',today=day_();
  return rows_('HouseholdInfo').filter(x=>x.householdId===m.householdId||!x.householdId)
    .filter(x=>!x.country||String(x.country).toUpperCase()===c)
    .filter(x=>!x.language||x.language===lang||x.language==='all')
    .filter(x=>String(x.active)!=='false')
    .filter(x=>(!x.validFrom||String(x.validFrom)<=today)&&(!x.validTo||String(x.validTo)>=today));
}
function householdInfoSave_(q,m){
  requireAdmin_(m);
  const id=q.infoId||id_('info');
  const o={infoId:id,householdId:m.householdId,country:country_(q.country||household_(m).country),language:q.language||m.language||'sq',type:q.type||'info',title:q.title||'',body:q.body||'',imageUrl:q.imageUrl||'',sourceUrl:q.sourceUrl||'',validFrom:q.validFrom||'',validTo:q.validTo||'',priority:q.priority||'normal',active:q.active!==false,createdBy:m.userId,createdAt:q.createdAt||now_(),updatedAt:now_()};
  const r=rows_('HouseholdInfo').find(x=>x.infoId===id&&x.householdId===m.householdId);
  if(r)patch_('HouseholdInfo',r._row,o);else append_('HouseholdInfo',o);
  return o;
}
function prospectList_(q,m){
  const c=effectiveCountry_(q,m),city=norm_(q.city||''),today=day_();
  return rows_('Prospekte').filter(x=>String(x.country).toUpperCase()===c)
    .filter(x=>!city||!x.city||norm_(x.city).includes(city))
    .filter(x=>String(x.active)!=='false'&&String(x.verified)!=='false')
    .filter(x=>(!x.validFrom||String(x.validFrom)<=today)&&(!x.validTo||String(x.validTo)>=today));
}
function prospectSave_(q,m){
  requireAdmin_(m);
  const o={prospectId:q.prospectId||id_('pro'),country:country_(q.country||household_(m).country),city:q.city||'',store:q.store||'',title:q.title||'',imageUrl:q.imageUrl||'',sourceUrl:q.sourceUrl||'',validFrom:q.validFrom||'',validTo:q.validTo||'',active:q.active!==false,verified:q.verified!==false,createdAt:now_(),updatedAt:now_()};
  append_('Prospekte',o);return o;
}
function queuePush_(hid,uid,title,body,url,payload){
  return append_('PushOutbox',{pushId:id_('push'),householdId:hid,userId:uid||'',title:title||'',body:body||'',url:url||'',payloadJson:JSON.stringify(payload||{}),createdAt:now_(),status:'queued',sentAt:'',error:''});
}
function pushQueue_(q,m){
  requireAdmin_(m);
  return rows_('PushOutbox').filter(x=>x.householdId===m.householdId&&x.status==='queued');
}
function pushMarkSent_(q,m){
  requireAdmin_(m);
  const r=rows_('PushOutbox').find(x=>x.pushId===q.pushId&&x.householdId===m.householdId);
  if(!r)throw Error('PUSH_NOT_FOUND');
  patch_('PushOutbox',r._row,{status:q.ok===false?'error':'sent',sentAt:q.ok===false?'':now_(),error:q.error||''});
  return true;
}

function setupMeinHaus(){Object.keys(H).forEach(n=>{
  let s=ss_().getSheetByName(n);
  if(!s)s=ss_().insertSheet(n);
  const wanted=H[n];
  if(s.getLastRow()<1||!s.getRange(1,1).getValue()){
    s.getRange(1,1,1,wanted.length).setValues([wanted]);
  }else{
    const existing=s.getRange(1,1,1,Math.max(1,s.getLastColumn())).getValues()[0].filter(String);
    const missing=wanted.filter(x=>!existing.includes(x));
    if(missing.length)s.getRange(1,existing.length+1,1,missing.length).setValues([missing]);
  }
  s.setFrozenRows(1);
});const c=sh_('Konfigurimi');const vals=[['AppLanguages','auto|sq|de|en|it|tr|mk|bs'],['PrivacyMode','HOUSEHOLD'],['ReceiptAI','AKTIV'],['FamilyRegistration','AKTIV'],['ShoppingListSmart','AKTIV'],['PriceHistory','AKTIV'],['BudgetAlerts','AKTIV'],['FamilyAppointments','AKTIV'],['OfferSources','AKTIV'],['CountryRegistration','AKTIV'],['CountryScopedStores','AKTIV'],['CountryScopedOffers','AKTIV'],['Prospekte','AKTIV'],['PushQueue','AKTIV'],['BackendVersion','5.0']];const all=rows_('Konfigurimi');vals.forEach(([k,v])=>{const r=all.find(x=>x.Parametri===k);if(r)patch_('Konfigurimi',r._row,{Vlera:v});else append_('Konfigurimi',{Parametri:k,Vlera:v})});return 'OK'}
function AUTORIZO_URLFETCH() {
    const r = UrlFetchApp.fetch("https://www.google.com");
      Logger.log(r.getResponseCode());
      }
     /* ==========================================================
   MEIN HAUS – OFERTAT SIPAS SHTETEVE
   SHTOJE NË FUND TË Code.gs
   ========================================================== */

const MH_OFFER_SHEETS = {
  DE: 'Oferta_DE',
  IT: 'Oferta_IT',
  AT: 'Oferta_AT',
  CH: 'Oferta_CH',
  TR: 'Oferta_TR',
  MK: 'Oferta_MK',
  BA: 'Oferta_BA'
};


/* =========================
   GJEJ SHEET-IN E SHTETIT
   ========================= */

function mhOfferSheet_(country) {
  const c = String(country || 'DE').trim().toUpperCase();
  const sheetName = MH_OFFER_SHEETS[c];

  if (!sheetName) {
    throw new Error('Shteti nuk mbështetet: ' + c);
  }

  const ss = SpreadsheetApp.openById(
    '1CobxMu2n4hlpquYrcMjgpFdlOBFnZ1TM8E61wpSKUZE'
  );

  const sh = ss.getSheetByName(sheetName);

  if (!sh) {
    throw new Error('Nuk u gjet tabela: ' + sheetName);
  }

  return sh;
}


/* =========================
   LEXO OFERTAT
   ========================= */

function mhOffersList_(country, city) {

  const sh = mhOfferSheet_(country);
  const data = sh.getDataRange().getValues();

  if (data.length < 2) return [];

  const headers = data[0].map(String);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return data.slice(1)

    .map(row => {
      const o = {};

      headers.forEach((h, i) => {
        o[h] = row[i];
      });

      return o;
    })

    .filter(o => {

      if (
        String(o.Aktive || '')
          .trim()
          .toUpperCase() !== 'TRUE'
      ) {
        return false;
      }

      if (
        city &&
        o.Rajoni_Qyteti &&
        !String(o.Rajoni_Qyteti)
          .toLowerCase()
          .includes(String(city).toLowerCase())
      ) {
        return false;
      }

      if (o.Deri) {

        const until = new Date(o.Deri);

        if (
          !isNaN(until.getTime()) &&
          until < today
        ) {
          return false;
        }
      }

      return true;
    });
}


/* =========================
   FORMAT PËR APLIKACIONIN
   ========================= */

function mhOffersForApp_(country, city) {

  const rows = mhOffersList_(country, city);

  return rows.map(o => ({

    id:
      o.ID || '',

    country:
      o.Shteti || country || 'DE',

    city:
      o.Rajoni_Qyteti || '',

    store:
      o.Dyqani || '',

    category:
      o.Kategoria || '',

    name:
      o.Produkti || '',

    description:
      o.Pershkrimi || '',

    quantity:
      o.Sasia || '',

    price:
      o.Cmimi || '',

    oldPrice:
      o.Cmimi_Vjeter || '',

    discount:
      o.Zbritja || '',

    from:
      mhOfferDate_(o.Nga),

    to:
      mhOfferDate_(o.Deri),

    image:
      o.Foto_URL || '',

    url:
      o.Oferta_URL || ''

  }));
}


/* =========================
   RUAJ OFERTË MANUALISHT
   ========================= */

function mhOfferSave_(country, offer) {

  const c =
    String(country || 'DE')
      .trim()
      .toUpperCase();

  const sh = mhOfferSheet_(c);

  offer = offer || {};

  const id =
    offer.ID ||
    (
      'off_' +
      c.toLowerCase() +
      '_' +
      Utilities
        .getUuid()
        .replace(/-/g, '')
        .substring(0, 16)
    );

  sh.appendRow([

    id,

    c,

    offer.Rajoni_Qyteti ||
    offer.city ||
    '',

    offer.Dyqani ||
    offer.store ||
    '',

    offer.Kategoria ||
    offer.category ||
    '',

    offer.Produkti ||
    offer.name ||
    '',

    offer.Pershkrimi ||
    offer.description ||
    '',

    offer.Sasia ||
    offer.quantity ||
    '',

    offer.Cmimi ||
    offer.price ||
    '',

    offer.Cmimi_Vjeter ||
    offer.oldPrice ||
    '',

    offer.Zbritja ||
    offer.discount ||
    '',

    offer.Nga ||
    offer.from ||
    '',

    offer.Deri ||
    offer.to ||
    '',

    offer.Foto_URL ||
    offer.image ||
    '',

    offer.Oferta_URL ||
    offer.url ||
    '',

    offer.Aktive === false
      ? 'FALSE'
      : 'TRUE'

  ]);

  return {
    ok: true,
    id: id,
    country: c
  };
}


/* =========================
   ÇAKTIVIZO OFERTË
   ========================= */

function mhOfferDisable_(country, id) {

  const sh = mhOfferSheet_(country);
  const data = sh.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][0]) ===
      String(id)
    ) {

      sh.getRange(i + 1, 16)
        .setValue('FALSE');

      return {
        ok: true,
        id: id
      };
    }
  }

  return {
    ok: false,
    error: 'Oferta nuk u gjet'
  };
}


/* =========================
   SKADIM AUTOMATIK
   ========================= */

function mhExpireOffers_() {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  Object.keys(MH_OFFER_SHEETS)
    .forEach(country => {

      const sh =
        mhOfferSheet_(country);

      const data =
        sh.getDataRange()
          .getValues();

      for (
        let i = 1;
        i < data.length;
        i++
      ) {

        if (!data[i][12]) continue;

        const until =
          data[i][12] instanceof Date
            ? data[i][12]
            : new Date(data[i][12]);

        if (
          !isNaN(until.getTime()) &&
          until < today
        ) {

          sh.getRange(i + 1, 16)
            .setValue('FALSE');
        }
      }
    });

  return {
    ok: true
  };
}


/* =========================
   DATA
   ========================= */

function mhOfferDate_(v) {

  if (!v) return '';

  if (v instanceof Date) {

    return Utilities.formatDate(
      v,
      'Europe/Berlin',
      'yyyy-MM-dd'
    );
  }

  return String(v);
}


/* =========================
   FUNKSION TESTI
   ========================= */

function TEST_MEINHAUS_OFFERS() {

  const result =
    mhOffersForApp_(
      'DE',
      'Frankenthal'
    );

  Logger.log(
    JSON.stringify(
      result,
      null,
      2
    )
  );

  return result;
} 
/* ==========================================================
   MEIN HAUS – API OFERTAT E REJA SIPAS SHTETIT
      NGJITE NË FUND TË Code.gs
         ========================================================== */

         