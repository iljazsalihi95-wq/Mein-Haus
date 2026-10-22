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
 ShoppingList:['householdId','itemId','productKey','Produkti','Kategoria','Sasia','Njësia','priority','source','assignedTo','status','storeHint','offerId','createdBy','createdAt','updatedAt','targetDate'],
 Inventari:['userId','householdId','ID','productKey','Produkti','Kategoria','Sasia','Njësia','Minimumi','Statusi','Duhet blerë','Njoftim ofertë','Shënim','updatedAt','lastPurchase','previousPurchase','averageDays','sampleCount','predictedEmptyDate','warningDays','predictionStatus','lastPrice','lastStore','expiryDate'],
 Blerjet:['userId','householdId','memberId','ID','Data','Ora','Dyqani','Produkti','productKey','Kategoria','Sasia','Njësia','Çmimi njësi','Totali','Në ofertë','Shënim','createdAt','daysSincePrevious','receiptScanId'],
 Financat:['userId','householdId','memberId','ID','Data','Ora','Muaji','Lloji','Kategoria','Nënkategoria','Përshkrimi','Shuma','Pagesa','Burimi','Dyqani','Shënim','createdAt'],
 Skanimet:['userId','householdId','scanId','createdAt','type','imageRef','store','receiptDate','receiptTotal','rawText','aiStatus','reviewStatus','itemsJson','error','processedAt'],
 Ofertat:['offerId','country','city','store','productKey','product','category','oldPrice','price','discount','validFrom','validTo','imageUrl','sourceUrl','sourceType','verified','createdAt','updatedAt'],
 Dyqanet:['storeId','country','city','name','address','lat','lng','website','offersUrl','active','updatedAt'],
 Budgets:['householdId','budgetId','month','category','limitAmount','spentAmount','currency','status','createdBy','updatedAt'],
 Dokumentet:['userId','householdId','documentId','memberId','Emri','Kategoria','Data','Skadimi','fileName','mimeType','fileUrl','driveFileId','Shënim','status','createdAt','updatedAt'],
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
,Garantien:['userId','householdId','warrantyId','memberId','Produkti','Marka','Modeli','Dyqani','Cmimi','DataBlerjes','Skadimi','SerialNumber','FaturaId','fileUrl','driveFileId','Shenim','status','createdAt','updatedAt']};

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
  if(!/^[A-Z]{2}$/.test(c))throw Error('COUNTRY_INVALID');return c;
}
function household_(m){
  const h=rows_('Households').find(x=>x.householdId===m.householdId&&String(x.active)!=='false');
  if(!h)throw Error('HOUSEHOLD_NOT_FOUND');
  return h;
}
function effectiveCountry_(q,m){
  if(q&&q.country)return country_(q.country);
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

function route_(q){const publicA=['register','login','passwordResetRequest','passwordResetConfirm','emailVerify','health','publicOffers','offerLocations','stores','offersCountry'];if(q.action==='health')return{ok:true,data:healthCheck()};if(publicA.includes(q.action))return dispatch_(q,null);const me=session_(q.token);return dispatch_(q,me)}

function dispatch_(q,me){const m={register:register_,login:login_,sessionCheck:sessionCheck_,me:me_,dashboard:dashboard_,family:family_,members:family_,inviteCreate:inviteCreate_,inviteAccept:inviteAccept_,shoppingList:shoppingList_,needBuyList:needBuyList_,needBuySave:needBuySave_,needBuyUpdate:needBuyUpdate_,documentList:documentList_,documentSave:documentSave_,documentDelete:documentDelete_,shoppingAdd:shoppingAdd_,shoppingUpdate:shoppingUpdate_,shoppingDelete:shoppingDelete_,inventoryList:inventoryList_,inventorySave:inventorySave_,purchaseList:purchaseList_,purchaseSave:purchaseSave_,financeList:financeList_,financeSave:financeSave_,householdAI:householdAI_,confirmScan:confirmScan_,offerLocations:offerLocations_,publicOffers:publicOffers_,stores:stores_,budgetList:budgetList_,budgetSave:budgetSave_,billList:billList_,billSave:billSave_,notifications:notifications_,notificationRead:notificationRead_,pushSubscribe:pushSubscribe_,passwordResetRequest:passwordResetRequest_,passwordResetConfirm:passwordResetConfirm_,
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
 offersList:publicOffers_,offersCountry:offersCountry_,offersSync:offersSync_,offerSourcesSeed:offerSourcesSeed_,financeCompare:financeCompare_,receiptAudit:receiptAudit_,loyaltyList:loyaltyList_,loyaltySave:loyaltySave_,homeLive:homeLive_,shoppingListV2:shoppingListV2_,shoppingListUpdateV2:shoppingListUpdateV2_,shoppingListDeleteV2:shoppingListDeleteV2_,shoppingListAddV2:shoppingListAddV2_,shoppingListPurchasedV2:shoppingListPurchasedV2_,shoppingListHistoryV2:shoppingListHistoryV2_,warrantyList:warrantyList_,warrantySave:warrantySave_,warrantyDelete:warrantyDelete_};if(!m[q.action])throw Error('Action e panjohur: '+q.action);const data=m[q.action](q,me);log_(me,q.action,'ok',{});return{ok:true,data}}

function session_(t){
  if(!t)throw Error('LOGIN_REQUIRED');
  const h=hash_(t),r=rows_('Sessions').find(x=>x.tokenHash===h&&String(x.active)!=='false');
  if(!r||!Number.isFinite(new Date(r.expiresAt).getTime())||new Date(r.expiresAt)<=new Date())throw Error('SESSION_EXPIRED');
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
  const verifyUrl=PropertiesService.getScriptProperties().getProperty('EMAIL_VERIFY_URL')||'';
  if(verifyUrl){MailApp.sendEmail(email,'Mein Haus – Verifiko emailin','Hap lidhjen: '+verifyUrl+(verifyUrl.includes('?')?'&':'?')+'token='+encodeURIComponent(verifyRaw));}
  const sess=newSession_(uid,hid,q.device);
  return Object.assign(sess,{user:{userId:uid,displayName:name,language:lang,role:role},household:{householdId:hid,name:houseName||hn,country:country,city:q.city||''},verificationEmailSent:!!verifyUrl});
}
function login_(q){const email=String(q.email||'').trim().toLowerCase(),u=rows_('Users').find(x=>String(x.email).toLowerCase()===email&&String(x.active)!=='false');if(!u||pw_(q.password||'',u.passwordSalt)!==u.passwordHash)throw Error('Email ose fjalëkalim gabim.');patch_('Users',u._row,{lastLogin:now_()});return Object.assign(newSession_(u.userId,u.householdId,q.device),{user:{userId:u.userId,displayName:u.displayName,language:u.language,role:u.role}})}

function newSession_(uid,hid,dev){const t=token_();append_('Sessions',{tokenHash:hash_(t),userId:uid,householdId:hid,createdAt:now_(),expiresAt:exp_(CFG.SESSION_DAYS),device:dev||'',lastSeenAt:now_(),active:true});return{token:t,userId:uid,householdId:hid}}

function sessionCheck_(q,m){return {valid:true,userId:m.userId,householdId:m.householdId,role:m.role,language:m.language,email:m.email,displayName:m.displayName}}

function me_(q,m){return m}

function family_(q,m){return rows_('HouseholdMembers').filter(x=>x.householdId===m.householdId&&String(x.active)!=='false')}
function familyMemberSave_(q,m){
  requireAdmin_(m);
  if(q.userId)throw Error('USE_INVITATION_FOR_ACCOUNT');
  if(q.role&&q.role!=='member'&&q.role!=='child')throw Error('FORBIDDEN');
  const id=q.memberId||id_('mem'),first=String(q.firstName||'').trim(),last=String(q.lastName||'').trim();
  if(!first)throw Error('MEMBER_NAME_REQUIRED');
  const o={householdId:m.householdId,memberId:id,userId:q.userId||'',role:q.role||'member',relation:q.relation||'',displayName:String(q.displayName||((first+' '+last).trim())),firstName:first,lastName:last,birthDate:q.birthDate||'',phone:q.phone||'',joinedAt:q.joinedAt||now_(),active:q.active!==false,permissionsJson:q.permissionsJson||'{}'};
  const r=rows_('HouseholdMembers').find(x=>x.householdId===m.householdId&&x.memberId===id);
  if(r&&r.userId)throw Error('USE_PROFILE_OR_ROLE_UPDATE');
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

function shoppingAdd_(q,m){
 const lock=LockService.getScriptLock();lock.waitLock(10000);
 try{if(q.offerId){const existing=rows_('ShoppingList').find(x=>x.householdId===m.householdId&&String(x.offerId)===String(q.offerId)&&x.status!=='deleted'&&x.status!=='done');if(existing)return existing}return shoppingAddUnlocked_(q,m)}finally{lock.releaseLock()}
}

function shoppingUpdate_(q,m){const r=rows_('ShoppingList').find(x=>x.itemId===q.itemId&&x.householdId===m.householdId);if(!r)throw Error('ITEM_NOT_FOUND');const p={updatedAt:now_()};if(q.status!=null)p.status=q.status;if(q.quantity!=null)p.Sasia=q.quantity;if(q.unit!=null)p['Njësia']=q.unit;if(q.product!=null||q.Produkti!=null){p.Produkti=String(q.product??q.Produkti).trim();p.productKey=norm_(p.Produkti)}if(q.category!=null)p.Kategoria=q.category;if(q.priority!=null)p.priority=q.priority;if(q.source!=null)p.source=q.source;if(q.assignedTo!=null)p.assignedTo=q.assignedTo;if(q.storeHint!=null||q.notes!=null)p.storeHint=q.storeHint??q.notes;if(q.offerId!=null||q.dueTime!=null)p.offerId=q.offerId??q.dueTime;if(q.targetDate!=null||q.dueDate!=null)p.targetDate=q.targetDate??q.dueDate;patch_('ShoppingList',r._row,p);return true}

function shoppingDelete_(q,m){const r=rows_('ShoppingList').find(x=>x.itemId===q.itemId&&x.householdId===m.householdId);if(!r)throw Error('ITEM_NOT_FOUND');patch_('ShoppingList',r._row,{status:'deleted',updatedAt:now_()});return true}

function inventoryList_(q,m){return rows_('Inventari').filter(x=>x.householdId===m.householdId)}

function inventorySave_(q,m){const name=String(q.product||q.Produkti||'').trim(),key=norm_(name),all=rows_('Inventari'),r=all.find(x=>x.householdId===m.householdId&&x.productKey===key);const qty=Number(q.quantity??q.Sasia??1),o={userId:m.userId,householdId:m.householdId,ID:r?r.ID:id_('stk'),productKey:key,Produkti:name,Kategoria:q.category||'',Sasia:qty,'Njësia':q.unit||'copë',Minimumi:Number(q.minimum||0),Statusi:q.status||'', 'Duhet blerë':q.needBuy||'', 'Njoftim ofertë':q.offerAlert||'', 'Shënim':q.note||'',updatedAt:now_(),lastPrice:q.lastPrice||'',lastStore:q.lastStore||'',expiryDate:q.expiryDate||''};if(r)patch_('Inventari',r._row,o);else append_('Inventari',o);return o}

function purchaseList_(q,m){return rows_('Blerjet').filter(x=>x.householdId===m.householdId)}

function purchaseSave_(q,m){
  const name=String(q.product||q.Produkti||'').trim();
  if(!name)throw Error('PRODUCT_REQUIRED');
  const quantity=Number(q.quantity??1),unitPrice=Number(q.unitPrice??0),total=Number(q.total??quantity*unitPrice);
  if(!Number.isFinite(quantity)||quantity<=0)throw Error('QUANTITY_INVALID');
  if(!Number.isFinite(unitPrice)||!Number.isFinite(total))throw Error('AMOUNT_INVALID');
  const date=purchaseDate_(q.date||day_());
  const o={userId:m.userId,householdId:m.householdId,memberId:q.memberId||'',ID:id_('buy'),Data:date,Ora:q.time||Utilities.formatDate(new Date(),CFG.TZ,'HH:mm'),Dyqani:q.store||'',Produkti:name,productKey:norm_(name),Kategoria:q.category||'',Sasia:quantity,'Njësia':q.unit||'copë','Çmimi njësi':unitPrice,Totali:total,'Në ofertë':q.onOffer||false,'Shënim':q.note||q.description||'',createdAt:now_(),receiptScanId:q.receiptScanId||''};
  append_('Blerjet',o);
  const inv=rows_('Inventari').find(x=>x.householdId===m.householdId&&x.productKey===o.productKey);
  const newQty=(inv?Number(inv.Sasia||0):0)+Number(o.Sasia||0);
  inventorySave_({product:o.Produkti,quantity:newQty,unit:o['Njësia'],category:o.Kategoria,lastPrice:o['Çmimi njësi'],lastStore:o.Dyqani},m);
  price_(m,o);
  return o;
}
function financeList_(q,m){return rows_('Financat').filter(x=>x.householdId===m.householdId)}

function financeSave_(q,m){
  const d=q.date||day_(),amount=Number(q.amount||0);if(!Number.isFinite(amount)||amount<=0)throw Error('AMOUNT_REQUIRED');
  if(!['hyrje','income','dalje','expense'].includes(q.type))throw Error('TYPE_INVALID');
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
    if(!x.scanId)throw Error('SCAN_ID_REQUIRED');
    const r=rows_('Skanimet').find(z=>z.scanId===x.scanId&&z.householdId===m.householdId);
    if(!r)throw Error('SCAN_NOT_FOUND');
    if(r.reviewStatus==='confirmed')return{savedItems:0,total:Number(r.receiptTotal||0),alreadyConfirmed:true};
    if(!x.items)x={scanId:r.scanId,store:r.store,date:r.receiptDate,total:r.receiptTotal,items:JSON.parse(r.itemsJson||'[]')};
    const date=purchaseDate_(x.date);
    const items=(x.items||[]).map(it=>({product:String(it.name||it.product||'').trim(),quantity:Number(it.quantity??1),unit:it.unit||'copë',unitPrice:Number(it.unitPrice??it.price??0),total:Number(it.total??0),category:it.category||''}));
    if(!items.length)throw Error('NO_ITEMS');
    if(items.some(it=>!it.product||!Number.isFinite(it.quantity)||it.quantity<=0||!Number.isFinite(it.unitPrice)||!Number.isFinite(it.total)))throw Error('RECEIPT_ITEMS_INVALID');
    const total=Number(x.total),sum=items.reduce((a,it)=>a+it.total,0);
    if(!Number.isFinite(total)||total<=0||Math.abs(sum-total)>0.05)throw Error('RECEIPT_TOTAL_MISMATCH');
    // A retry after a partially completed request must not append its rows again.
    const previous=rows_('Skanimet').filter(z=>z.householdId===m.householdId&&z.scanId!==r.scanId&&z.reviewStatus==='confirmed'&&norm_(z.store)===norm_(x.store||r.store)&&mhDate_(z.receiptDate)===date&&Math.abs(Number(z.receiptTotal)-total)<0.01);
    if(previous.length&&!q.allowPossibleDuplicate)throw Error('POSSIBLE_DUPLICATE_RECEIPT');
    const existing=rows_('Blerjet').filter(z=>z.householdId===m.householdId&&z.receiptScanId===x.scanId);
    if(existing.length)throw Error('SCAN_PARTIAL_REVIEW_REQUIRED');
    items.forEach(it=>purchaseSave_(Object.assign({},it,{date,store:x.store||'',receiptScanId:x.scanId}),m));
    financeSave_({date,type:'dalje',category:'Blerje',description:'Kassenbon '+(x.store||''),amount:total,source:'receipt',store:x.store||''},m);
    patch_('Skanimet',r._row,{reviewStatus:'confirmed',receiptTotal:total,receiptDate:date,processedAt:now_()});
    return{savedItems:items.length,total,alreadyConfirmed:false};
  }finally{lock.releaseLock()}
}
function price_(m,o){append_('Preisverlauf',{householdId:m.householdId,productKey:o.productKey,store:o.Dyqani,date:o.Data,price:o['Çmimi njësi'],currency:'EUR',source:'purchase',purchaseId:o.ID})}

function dashboard_(q,m){const inv=inventoryList_(q,m),fin=financeList_(q,m),shop=shoppingList_(q,m).items;return{inventoryCount:inv.length,shoppingOpen:shop.filter(x=>x.status==='open').length,financeMonth:fin.filter(x=>String(x.Data).slice(0,7)===day_().slice(0,7)).reduce((s,x)=>s+(x.Lloji==='hyrje'?1:-1)*Number(x.Shuma||0),0)}}

function publicOffers_(q,m){
  const c=effectiveCountry_(q,m),city=norm_(q.city||'');
  const today=day_();
  return rows_('Ofertat')
    .filter(x=>String(x.country).toUpperCase()===c)
    .filter(x=>!city||!x.city||norm_(x.city).includes(city))
    .filter(x=>String(x.verified)!=='false')
    .filter(x=>!x.validFrom||mhDate_(x.validFrom)<=today)
    .filter(x=>!x.validTo||mhDate_(x.validTo)>=today);
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

function passwordResetRequest_(q){
  const email=String(q.email||'').trim().toLowerCase();
  const u=rows_('Users').find(x=>String(x.email).toLowerCase()===email&&String(x.active)!=='false');
  if(!u)return {accepted:true};
  const recent=rows_('PasswordReset').some(x=>x.userId===u.userId&&Date.now()-new Date(x.createdAt).getTime()<60000);
  if(recent)return {accepted:true};
  const raw=token_(),resetId=id_('rst');
  append_('PasswordReset',{resetId,userId:u.userId,email:u.email,tokenHash:hash_(raw),createdAt:new Date().toISOString(),expiresAt:exp_(1),used:false});
  try{MailApp.sendEmail({to:u.email,subject:'MeinHaushalt FT – Password reset',body:'Password reset code / Kodi për rikthimin e fjalëkalimit:\n\n'+raw+'\n\nValid for 24 hours. If you did not request this, ignore this email.'})}
  catch(e){const r=rows_('PasswordReset').find(x=>x.resetId===resetId);if(r)patch_('PasswordReset',r._row,{used:true});log_(null,'resetDelivery','error',{})}
  return {accepted:true};
}

function passwordResetConfirm_(q){
  const pass=String(q.password||'');
  if(pass.length<8)throw Error('PASSWORD_MIN_8');
  if(!q.resetToken)throw Error('RESET_TOKEN_REQUIRED');
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
  if(q.endpoint)rows_('PushSubscriptions').filter(x=>x.userId===m.userId&&x.householdId===m.householdId&&x.endpoint===q.endpoint).forEach(x=>patch_('PushSubscriptions',x._row,{active:false,updatedAt:now_()}));
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
  mhCanEdit_(m);
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    const r=rows_('Blerjet').find(x=>x.ID===q.id&&x.householdId===m.householdId);
    if(!r)throw Error('PURCHASE_NOT_FOUND');
    if(r.receiptScanId)throw Error('RECEIPT_PURCHASE_REQUIRES_RECEIPT_REVERSAL');
    const inv=rows_('Inventari').find(x=>x.householdId===m.householdId&&x.productKey===r.productKey);
    if(inv){
      const next=Number(inv.Sasia||0)-Number(r.Sasia||0);
      if(next<0)throw Error('INVENTORY_INSUFFICIENT_REVIEW_REQUIRED');
      patch_('Inventari',inv._row,{Sasia:next,updatedAt:now_()});
    }
    del_('Blerjet',r._row);
    return {deleted:true,inventoryAdjusted:!!inv};
  }finally{lock.releaseLock()}
}

function financeDelete_(q,m){
  mhCanEdit_(m);
  const r=rows_('Financat').find(x=>x.ID===q.id&&x.householdId===m.householdId);
  if(!r)throw Error('FINANCE_NOT_FOUND');
  if(r.Burimi==='receipt')throw Error('RECEIPT_FINANCE_REQUIRES_RECEIPT_REVERSAL');
  del_('Financat',r._row);return true;
}

function inventoryDelete_(q,m){
  mhCanEdit_(m);
  const r=rows_('Inventari').find(x=>x.ID===q.id&&x.householdId===m.householdId);
  if(!r)throw Error('INVENTORY_NOT_FOUND');
  del_('Inventari',r._row);return true;
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
  requireAdmin_(m);
  // Legacy HTML/AI extractor cannot establish source or image licensing.
  // Keep stored offers intact until an authorized feed adapter is configured.
  throw Error('AUTHORIZED_FEED_REQUIRED');
const country=effectiveCountry_(q,m),city=q.city||household_(m).city||'';let sources=offerSourceList_({country},m);if(!sources.length)sources=offerSourcesSeed_({country,city},m);
  const result=[];sources.filter(x=>String(x.active)!=='false').forEach(src=>{try{
    const res=UrlFetchApp.fetch(src.url,{muteHttpExceptions:true,followRedirects:true,headers:{'User-Agent':'Mozilla/5.0 (compatible; MeinHausOffers/1.0)','Accept-Language':'de-DE,de;q=0.9'}});if(res.getResponseCode()>=400)throw Error('HTTP '+res.getResponseCode());
    const html=String(res.getContentText());
    const imageUrls=extractOfferImages_(html,src.url).slice(0,350);
    let pageText=html.replace(new RegExp('<script[\\\\s\\\\S]*?<\\\\/script>','gi'),' ').replace(new RegExp('<style[\\\\s\\\\S]*?<\\\\/style>','gi'),' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\\s+/g,' ').slice(0,80000);
    const prompt='Extract as MANY currently valid retail offers as are explicitly present in this page/prospect, not only 3. Return JSON object {offers:[{product,category,description,size,oldPrice,price,discount,validFrom,validTo,imageUrl,sourceUrl}]}. IMPORTANT: imageUrl must be the REAL matching product image selected ONLY from the supplied candidate image URLs; never invent a URL and never use logos/icons. Prefer 15-60 offers when the page contains them. Prices numbers only. Dates YYYY-MM-DD. Store: '+src.store+'; city: '+city+'; page URL: '+src.url+'; candidate images: '+imageUrls.join(' | ')+'; page text: '+pageText;
    const j=openaiJson_(prompt,''),offers=Array.isArray(j.offers)?j.offers:[];
    offers.forEach(o=>{if(!o.product||!Number(o.price))return;const key=norm_(o.product),found=rows_('Ofertat').find(z=>String(z.country).toUpperCase()===country&&norm_(z.city)===norm_(city)&&norm_(z.store)===norm_(src.store)&&z.productKey===key&&String(z.validTo||'')===String(o.validTo||''));const row={offerId:found?found.offerId:id_('off'),country,city,store:src.store,productKey:key,product:o.product,category:o.category||'',oldPrice:Number(o.oldPrice||0),price:Number(o.price||0),discount:Number(o.discount||0),validFrom:o.validFrom||'',validTo:o.validTo||'',imageUrl:o.imageUrl||'',sourceUrl:o.sourceUrl||src.url,sourceType:'auto',verified:true,createdAt:found?found.createdAt||now_():now_(),updatedAt:now_()};if(found)patch_('Ofertat',found._row,row);else append_('Ofertat',row);upsertCountryOffer_(country,city,src.store,o,row);result.push(row)});
    patch_('OfferSources',src._row,{lastCheckedAt:now_(),lastStatus:'ok:'+offers.length+' photos:'+offers.filter(x=>x.imageUrl).length,updatedAt:now_()});
  }catch(e){patch_('OfferSources',src._row,{lastCheckedAt:now_(),lastStatus:'error:'+String(e.message||e).slice(0,120),updatedAt:now_()})}});
  return {imported:result.length,withPhotos:result.filter(x=>x.imageUrl).length,offers:publicOffers_({country,city},m)}
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

         function offersCountry_(q, me) {
           q = q || {};

             const country = String(
                 q.country || q.shteti || 'DE'
                   ).trim().toUpperCase();

                     const city = String(
                         q.city || q.qyteti || ''
                           ).trim();

                             return mhOffersForApp_(country, city);
                             }


                             /*
                              TEST direkt nga Apps Script
                              */
                              function TEST_OFFERS_COUNTRY_API() {

                                const result = offersCountry_({
                                    country: 'DE',
                                        city: 'Frankenthal'
                                          }, null);

                                            Logger.log(JSON.stringify(result, null, 2));

                                              return result;
                                              }

/* MEIN HAUS – kontrolluar dhe zgjeruar: ruaj këtë seksion në fund.
   Nuk ndryshon ose fshin rreshta ekzistues gjatë ngarkimit. */
const MH_EXTRA_HEADERS = {
  LoyaltyCards:['householdId','cardId','store','cardLabel','cardNumberMasked','barcodeValue','barcodeFormat','notes','createdBy','updatedAt'],
  ReceiptAudit:['householdId','auditId','scanId','store','receiptDate','receiptTotal','itemsTotal','difference','status','note','createdAt']
};
function mhExtraSheet_(name){
  const ss=ss_();let sh=ss.getSheetByName(name);
  if(!sh){sh=ss.insertSheet(name);sh.getRange(1,1,1,MH_EXTRA_HEADERS[name].length).setValues([MH_EXTRA_HEADERS[name]]);sh.setFrozenRows(1)}
  return sh;
}
function mhExtraRows_(name){mhExtraSheet_(name);return rows_(name)}
function mhExtraAppend_(name,o){mhExtraSheet_(name);return append_(name,o)}
function mhMoney_(v){const n=Number(v);if(!Number.isFinite(n)||n<0)throw Error('INVALID_AMOUNT');return Math.round((n+Number.EPSILON)*100)/100}
function mhBool_(v){return v===true||String(v).toLowerCase()==='true'}
function mhDate_(v){if(v instanceof Date)return Utilities.formatDate(v,CFG.TZ,'yyyy-MM-dd');return String(v||'').slice(0,10)}
function mhCanEdit_(m){if(!m||m.role==='child')throw Error('FORBIDDEN')}
function loyaltyList_(q,m){return mhExtraRows_('LoyaltyCards').filter(x=>x.householdId===m.householdId).map(x=>{const y=Object.assign({},x);delete y.barcodeValue;return y})}
function loyaltySave_(q,m){mhCanEdit_(m);const name=String(q.store||'').trim();if(!name)throw Error('STORE_REQUIRED');const id=q.cardId||id_('card');const existing=mhExtraRows_('LoyaltyCards').find(x=>x.cardId===id&&x.householdId===m.householdId);const o={householdId:m.householdId,cardId:id,store:name,cardLabel:String(q.cardLabel||''),cardNumberMasked:String(q.cardNumberMasked||''),barcodeValue:String(q.barcodeValue||''),barcodeFormat:String(q.barcodeFormat||'CODE128'),notes:String(q.notes||''),createdBy:existing?existing.createdBy:m.userId,updatedAt:now_()};if(existing)patch_('LoyaltyCards',existing._row,o);else mhExtraAppend_('LoyaltyCards',o);return {cardId:id,store:name,cardLabel:o.cardLabel,cardNumberMasked:o.cardNumberMasked}}
function financeCompare_(q,m){const year=String(q.year||day_().slice(0,4));if(!/^\d{4}$/.test(year))throw Error('YEAR_INVALID');const rows=financeList_({},m);return Array.from({length:12},(_,i)=>{const month=year+'-'+String(i+1).padStart(2,'0');const r=rows.filter(x=>mhDate_(x.Data).slice(0,7)===month);const income=r.filter(x=>x.Lloji==='hyrje').reduce((a,x)=>a+Number(x.Shuma||0),0);const expense=r.filter(x=>x.Lloji!=='hyrje').reduce((a,x)=>a+Number(x.Shuma||0),0);return {month,income:mhMoney_(income),expense:mhMoney_(expense),balance:Math.round((income-expense)*100)/100,transactions:r.length}})}
function receiptAudit_(q,m){const scan=rows_('Skanimet').find(x=>x.scanId===q.scanId&&x.householdId===m.householdId);if(!scan)throw Error('SCAN_NOT_FOUND');const items=JSON.parse(scan.itemsJson||'[]');const sum=mhMoney_(items.reduce((a,x)=>a+Number(x.total||0),0));const total=mhMoney_(scan.receiptTotal||0);const diff=Math.round((sum-total)*100)/100;const existing=mhExtraRows_('ReceiptAudit').find(x=>x.scanId===scan.scanId&&x.householdId===m.householdId);const o={householdId:m.householdId,auditId:existing?existing.auditId:id_('audit'),scanId:scan.scanId,store:scan.store,receiptDate:mhDate_(scan.receiptDate),receiptTotal:total,itemsTotal:sum,difference:diff,status:Math.abs(diff)<=0.01?'matched':'review_required',note:'Kontrollo zbritjet, depozitën/Pfand, kuponët dhe artikujt e palexueshëm.',createdAt:existing?existing.createdAt:now_()};if(existing)patch_('ReceiptAudit',existing._row,o);else mhExtraAppend_('ReceiptAudit',o);return o}
function homeLive_(q,m){const d=dashboard_({},m),appointments=appointmentList_({},m).filter(x=>mhDate_(x.date)>=day_()).sort((a,b)=>String(a.date+' '+a.time).localeCompare(String(b.date+' '+b.time))).slice(0,5);const bills=billList_({},m).filter(x=>x.status!=='paid').sort((a,b)=>String(a.dueDate).localeCompare(String(b.dueDate))).slice(0,5);return {dashboard:d,appointments,bills,notifications:notifications_({},m).filter(x=>x.status==='new').length,updatedAt:now_()}}
// Mbështetje për ofertat sipas shteteve të konfiguruara; jo për çdo shtet pa burime reale.
function offersCountry_(q,m){const country=String(q.country||q.shteti||(m?effectiveCountry_(q,m):'DE')).toUpperCase();const city=String(q.city||q.qyteti||'');if(MH_OFFER_SHEETS[country]&&ss_().getSheetByName(MH_OFFER_SHEETS[country]))return mhOffersForApp_(country,city);return publicOffers_({country,city},m)}
// Mos ekspozo tokenin e verifikimit ose rivendosjes përmes API publike.

function emailVerify_(q){const r=rows_('EmailVerification').find(x=>x.tokenHash===hash_(q.verificationToken||'')&&!mhBool_(x.used));if(!r||new Date(r.expiresAt)<new Date())throw Error('VERIFY_INVALID');const u=rows_('Users').find(x=>x.userId===r.userId);if(!u)throw Error('USER_NOT_FOUND');patch_('Users',u._row,{emailVerified:true});patch_('EmailVerification',r._row,{used:true,usedAt:now_()});return true}
function sessionRevoke_(q,m){const prefix=String(q.tokenHashPrefix||'');if(prefix.length<10)throw Error('SESSION_PREFIX_TOO_SHORT');const found=rows_('Sessions').filter(x=>x.userId===m.userId&&String(x.tokenHash).startsWith(prefix));if(found.length!==1)throw Error('SESSION_NOT_UNIQUE');patch_('Sessions',found[0]._row,{active:false});return true}
function notificationRead_(q,m){const r=rows_('Notifications').find(x=>x.notificationId===q.notificationId&&x.householdId===m.householdId&&(x.userId===m.userId||!x.userId));if(!r)throw Error('NOTIFICATION_NOT_FOUND');patch_('Notifications',r._row,{readAt:now_(),status:'read'});return true}
function memberRoleUpdate_(q,m){requireAdmin_(m);if(!CFG.ROLES.includes(q.role))throw Error('ROLE_INVALID');const hm=rows_('HouseholdMembers').find(x=>x.userId===q.userId&&x.householdId===m.householdId);if(!hm)throw Error('MEMBER_NOT_FOUND');if(hm.role==='owner'||q.role==='owner')throw Error('OWNER_ROLE_PROTECTED');patch_('HouseholdMembers',hm._row,{role:q.role});const u=rows_('Users').find(x=>x.userId===q.userId);if(u)patch_('Users',u._row,{role:q.role});return true}





function shoppingAddUnlocked_(q,m){const name=String(q.product||q.Produkti||'').trim();if(!name)throw Error('Produkti mungon');const o={householdId:m.householdId,itemId:id_('sl'),productKey:norm_(name),Produkti:name,Kategoria:q.category||'',Sasia:Number(q.quantity||1),'Njësia':q.unit||'copë',priority:q.priority||'normal',source:q.source||'manual',assignedTo:q.assignedTo||'',status:q.status||'open',storeHint:q.storeHint||q.notes||'',offerId:q.offerId||q.dueTime||'',targetDate:q.targetDate||q.dueDate||'',createdBy:m.userId,createdAt:now_(),updatedAt:now_()};append_('ShoppingList',o);return o}

function purchaseDate_(value){
  if(value instanceof Date)return Utilities.formatDate(value,CFG.TZ,'yyyy-MM-dd');
  let s=String(value||'').trim(),match=s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if(match)s=match[3]+'-'+match[2].padStart(2,'0')+'-'+match[1].padStart(2,'0');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw Error('DATE_INVALID');
  const d=new Date(s+'T12:00:00Z');
  if(isNaN(d)||d.toISOString().slice(0,10)!==s)throw Error('DATE_INVALID');
  return s;
}

function needBuyList_(q,m){
  const date=String(q.date||'').trim();
  return rows_('ShoppingList').filter(x=>x.householdId===m.householdId&&x.source==='needbuy'&&(!date||String(x.targetDate||'')===date));
}

function needBuySave_(q,m){
  const date=String(q.date||day_()).slice(0,10),name=String(q.name||q.Produkti||'').trim();
  if(!name)throw Error('PRODUCT_REQUIRED');
  const o={householdId:m.householdId,itemId:id_('need'),productKey:norm_(name),Produkti:name,Kategoria:q.category||'',Sasia:Number(q.quantity||1),Njësia:q.unit||'copë',priority:q.priority||'normal',source:'needbuy',assignedTo:'',status:q.status||'need',storeHint:q.storeHint||'',offerId:'',targetDate:date,createdBy:m.userId,createdAt:now_(),updatedAt:now_()};
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

function documentList_(q,m){
  return rows_('Dokumentet').filter(x=>x.householdId===m.householdId&&String(x.status||'active')!=='deleted');
}

function documentSave_(q,m){
  const did=q.documentId||id_('doc');
  const existing=rows_('Dokumentet').find(x=>x.documentId===did&&x.householdId===m.householdId);
  const o={userId:m.userId,householdId:m.householdId,documentId:did,memberId:q.memberId||'',Emri:String(q.name||q.Emri||'').trim(),Kategoria:q.category||q.Kategoria||'Të tjera',Data:q.date||q.Data||day_(),Skadimi:q.expiryDate||q.Skadimi||'',fileName:q.fileName||'',mimeType:q.mimeType||'',fileUrl:q.fileUrl||'',driveFileId:q.driveFileId||'','Shënim':q.note||q['Shënim']||'',status:q.status||'active',createdAt:existing?existing.createdAt||now_():now_(),updatedAt:now_()};
  if(!o.Emri)throw Error('DOCUMENT_NAME_REQUIRED');
  if(existing)patch_('Dokumentet',existing._row,o);else append_('Dokumentet',o);
  return o;
}

function documentDelete_(q,m){
  const r=rows_('Dokumentet').find(x=>x.documentId===q.documentId&&x.householdId===m.householdId);
  if(!r)throw Error('DOCUMENT_NOT_FOUND');
  patch_('Dokumentet',r._row,{status:'deleted',updatedAt:now_()});
  return true;
}



function offerDateIso_(v){
  if(!v)return '';
  if(v instanceof Date&&!isNaN(v))return Utilities.formatDate(v,Session.getScriptTimeZone()||'Europe/Berlin','yyyy-MM-dd');
  const d=new Date(v);
  return isNaN(d)?String(v):Utilities.formatDate(d,Session.getScriptTimeZone()||'Europe/Berlin','yyyy-MM-dd');
}
function absOfferUrl_(u,base){
  u=String(u||'').replace(/&amp;/g,'&').trim();if(!u)return '';
  if(new RegExp('^https?://','i').test(u))return u;if(u.indexOf('//')===0)return 'https:'+u;
  try{const m=String(base||'').match(new RegExp('^(https?://[^/]+)','i'));while(u.indexOf('./')===0)u=u.substring(2);return m?(u.charAt(0)==='/'?m[1]+u:m[1]+'/'+u):''}catch(e){return ''}
}
function extractOfferImages_(html,base){
  const out=[],seen={},s=String(html||'');
  const exts=['.jpg','.jpeg','.png','.webp'];
  const attrs=['src="',"src='",'data-src="',"data-src='",'data-original="',"data-original='",'data-lazy-src="',"data-lazy-src='",'content="',"content='"];
  attrs.forEach(a=>{let p=0;while((p=s.indexOf(a,p))>=0){p+=a.length;const q=a.endsWith('"')?'"':"'";const e=s.indexOf(q,p);if(e<0)break;let u=absOfferUrl_(s.substring(p,e),base);const low=u.toLowerCase();if(u&&exts.some(x=>low.indexOf(x)>=0)&&!['logo','icon','sprite','favicon','badge','tracking','pixel'].some(x=>low.indexOf(x)>=0)&&!seen[u]){seen[u]=1;out.push(u)}p=e+1}});
  return out
}
function upsertCountryOffer_(country,city,store,o,row){
  try{
    const sh=offersSheet_(country),vals=sh.getDataRange().getValues(),h=vals[0].map(String),ix={};h.forEach((k,i)=>ix[k]=i);let target=-1;
    for(let r=1;r<vals.length;r++)if(norm_(vals[r][ix.Dyqani])===norm_(store)&&norm_(vals[r][ix.Produkti])===norm_(o.product)){target=r+1;break}
    const data={Shteti:country,Rajoni_Qyteti:city,Dyqani:store,Kategoria:o.category||'',Produkti:o.product||'',Pershkrimi:o.description||'',Sasia:o.size||'',Cmimi:o.price||'',Cmimi_Vjeter:o.oldPrice||'',Zbritja:o.discount||'',Nga:o.validFrom||'',Deri:o.validTo||'',Foto_URL:o.imageUrl||'',Oferta_URL:o.sourceUrl||row.sourceUrl||'',Aktive:'TRUE'};
    if(target>0){Object.keys(data).forEach(k=>{if(ix[k]!=null&&data[k]!=='' )sh.getRange(target,ix[k]+1).setValue(data[k])})}
    else{const id='auto_'+country.toLowerCase()+'_'+Utilities.getUuid().replace(/-/g,'').slice(0,12);sh.appendRow(h.map(k=>k==='ID'?id:(data[k]??'')))}
  }catch(e){}
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
function warrantyList_(q,m){
  return rows_('Garantien').filter(function(x){
    return x.householdId===m.householdId &&
           String(x.status||'active')!=='deleted';
  });
}
function warrantySave_(q,m){
  var wid=q.warrantyId||id_('war');

  var existing=rows_('Garantien').find(function(x){
    return x.warrantyId===wid &&
           x.householdId===m.householdId;
  });

  var o={
    userId:m.userId,
    householdId:m.householdId,
    warrantyId:wid,
    memberId:q.memberId||'',
    Produkti:String(q.product||q.Produkti||'').trim(),
    Marka:q.brand||q.Marka||'',
    Modeli:q.model||q.Modeli||'',
    Dyqani:q.store||q.Dyqani||'',
    Cmimi:Number(q.price||q.Cmimi||0),
    DataBlerjes:q.purchaseDate||q.DataBlerjes||day_(),
    Skadimi:q.expiryDate||q.Skadimi||'',
    SerialNumber:q.serialNumber||q.SerialNumber||'',
    FaturaId:q.billId||q.FaturaId||'',
    fileUrl:q.fileUrl||'',
    driveFileId:q.driveFileId||'',
    Shenim:q.note||q.Shenim||'',
    status:q.status||'active',
    createdAt:existing?(existing.createdAt||now_()):now_(),
    updatedAt:now_()
  };

  if(!o.Produkti)throw Error('WARRANTY_PRODUCT_REQUIRED');

  if(existing){
    patch_('Garantien',existing._row,o);
  }else{
    append_('Garantien',o);
  }

  return o;
}
function warrantyDelete_(q,m){
  var r=rows_('Garantien').find(function(x){
    return x.warrantyId===q.warrantyId &&
           x.householdId===m.householdId;
  });

  if(!r)throw Error('WARRANTY_NOT_FOUND');

  patch_('Garantien',r._row,{
    status:'deleted',
    updatedAt:now_()
  });

  return true;
}
function offerImportJsonUrl_(url, store, country, city) {
  country = String(country || 'DE').toUpperCase();
  city = String(city || 'Frankenthal');

  var response = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    followRedirects: true,
    headers: {
      'Accept': 'application/json,text/plain,*/*',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  var code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error(store + ' HTTP ' + code);
  }

  var data = JSON.parse(response.getContentText());
  var raw = offerFindProducts_(data);
  var imported = 0;
  var skippedNoPhoto = 0;

  raw.forEach(function(x) {
    var o = offerNormalizeApiItem_(x, store, country, city, url);

    // RREGULL ABSOLUT: PA FOTO = MOS PUBLIKO
    if (!o.Foto_URL || !/^https?:\/\//i.test(o.Foto_URL)) {
      skippedNoPhoto++;
      return;
    }

    if (!o.Produkti || !o.Cmimi) return;

    upsertCountryOffer_(country, city, store, o);
    imported++;
  });

  return {
    store: store,
    country: country,
    city: city,
    found: raw.length,
    imported: imported,
    skippedNoPhoto: skippedNoPhoto
  };
}
function offerFindProducts_(obj) {
  var found = [];

  function walk(x) {
    if (!x) return;

    if (Array.isArray(x)) {
      x.forEach(walk);
      return;
    }

    if (typeof x !== 'object') return;

    var name =
      x.productName || x.product_name || x.name ||
      x.title || x.description || '';

    var price =
      x.price || x.salesPrice || x.salePrice ||
      x.currentPrice || x.offerPrice || '';

    var image =
      x.imageUrl || x.imageURL || x.image ||
      x.picture || x.pictureUrl || x.thumbnail || '';

    if (name && (price !== '' || image)) {
      found.push(x);
    }

    Object.keys(x).forEach(function(k) {
      if (typeof x[k] === 'object') walk(x[k]);
    });
  }

  walk(obj);

  var seen = {};
  return found.filter(function(x) {
    var key = String(
      x.id || x.productId || x.sku ||
      x.productName || x.name || x.title || ''
    ).toLowerCase();

    if (!key || seen[key]) return false;
    seen[key] = true;
    return true;
  });
}
function offerNormalizeApiItem_(x, store, country, city, sourceUrl) {

  function first() {
    for (var i = 0; i < arguments.length; i++) {
      if (
        arguments[i] !== undefined &&
        arguments[i] !== null &&
        arguments[i] !== ''
      ) return arguments[i];
    }
    return '';
  }

  function price(v) {
    if (v && typeof v === 'object') {
      v = first(v.value, v.amount, v.price);
    }
    return String(v === undefined || v === null ? '' : v)
      .replace('€', '')
      .trim();
  }

  var img = first(
    x.imageUrl,
    x.imageURL,
    x.image_url,
    x.pictureUrl,
    x.picture,
    x.thumbnail,
    x.image
  );

  if (img && typeof img === 'object') {
    img = first(
      img.url,
      img.src,
      img.large,
      img.medium,
      img.original
    );
  }

  var name = first(
    x.productName,
    x.product_name,
    x.name,
    x.title
  );

  var description = first(
    x.description,
    x.subtitle,
    x.shortDescription
  );

  var category = first(
    x.categoryName,
    x.category,
    x.productCategory,
    'Sonstige'
  );

  if (category && typeof category === 'object') {
    category = first(category.name, category.title, 'Sonstige');
  }

  var currentPrice = price(first(
    x.price,
    x.salesPrice,
    x.salePrice,
    x.currentPrice,
    x.offerPrice
  ));

  var oldPrice = price(first(
    x.oldPrice,
    x.originalPrice,
    x.regularPrice,
    x.strikePrice
  ));

  var discount = first(
    x.discount,
    x.discountPercentage,
    x.saving
  );

  var from = first(
    x.validFrom,
    x.startDate,
    x.availableFrom,
    x.from
  );

  var to = first(
    x.validTo,
    x.endDate,
    x.availableTo,
    x.to
  );

  var size = first(
    x.quantity,
    x.packageSize,
    x.content,
    x.unit
  );

  return {
    Shteti: country,
    Rajoni_Qyteti: city,
    Dyqani: store,
    Kategoria: String(category),
    Produkti: String(name),
    Pershkrimi: String(description),
    Sasia: String(size),
    Cmimi: currentPrice,
    Cmimi_Vjeter: oldPrice,
    Zbritja: String(discount),
    Nga: String(from),
    Deri: String(to),
    Foto_URL: String(img || ''),
    Oferta_URL: String(first(
      x.url,
      x.productUrl,
      x.offerUrl,
      sourceUrl
    )),
    Aktive: true
  };
}
function offersRealSourcesDE_(){
  return [
    {store:'PENNY',url:'https://www.penny.de/angebote'},
    {store:'Lidl',url:'https://www.lidl.de/c/online-prospekte/s10005610/'},
    {store:'ALDI SÜD',url:'https://www.aldi-sued.de/angebote'},
    {store:'Netto Marken-Discount',url:'https://www.netto-online.de/ueber-netto/Online-Prospekte.chtm'},
    {store:'REWE',url:'https://www.rewe.de/angebote'},
    {store:'Kaufland',url:'https://filiale.kaufland.de/service/filiale/frankenthal-8510.html'}
  ];
}
function offerFetchReal_(url){
  var r=UrlFetchApp.fetch(url,{
    muteHttpExceptions:true,
    followRedirects:true,
    headers:{
      'User-Agent':'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/140 Safari/537.36',
      'Accept-Language':'de-DE,de;q=0.9'
    }
  });
  if(r.getResponseCode()<200 || r.getResponseCode()>=400) return '';
  return r.getContentText();
}
function offerDecodeReal_(s){
  return String(s||'')
    .replace(/&amp;/g,'&')
    .replace(/&quot;/g,'"')
    .replace(/&#39;/g,"'")
    .replace(/&euro;/g,'€')
    .replace(/&nbsp;/g,' ')
    .replace(/\\u002F/g,'/')
    .replace(/\\\//g,'/');
}
function offerImagesReal_(html){
  html=offerDecodeReal_(html);
  var out=[], seen={};
  var rx=/(https?:\/\/[^"'<>\\\s]+?\.(?:jpg|jpeg|png|webp)(?:\?[^"'<>\\\s]*)?)/gi;
  var m;
  while((m=rx.exec(html))!==null){
    var u=m[1];
    if(/logo|icon|sprite|favicon|placeholder|error-page/i.test(u)) continue;
    if(!seen[u]){
      seen[u]=1;
      out.push(u);
    }
  }
  return out;
}
function offerTextReal_(html){
  return offerDecodeReal_(html)
    .replace(/<script[\s\S]*?<\/script>/gi,' ')
    .replace(/<style[\s\S]*?<\/style>/gi,' ')
    .replace(/<[^>]+>/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}
function offerProductsReal_(html,store,url){
  var text=offerTextReal_(html);
  var images=offerImagesReal_(html);
  var result=[],seen={};

  /*
    German offer pattern:
    old price / offer price / product / amount.
    Intentionally conservative: bad/incomplete records are rejected.
  */
  var rx=/(?:UVP|Streichpreis|statt|vorher)?\s*([0-9]{1,3}[.,][0-9]{2})?\s*€?.{0,100}?(?:Angebotspreis|Aktionspreis|Preis|ab)?\s*([0-9]{1,3}[.,][0-9]{2})\s*€.{0,80}?([A-ZÄÖÜ0-9][A-ZÄÖÜa-zäöüß0-9 '&+\-\/]{2,80}?)(?:\*|\s+je\s+)([^.]{1,45})/g;

  var m,i=0;
  while((m=rx.exec(text))!==null && result.length<250){
    var price=String(m[2]||'').replace(',','.');
    var oldPrice=String(m[1]||'').replace(',','.');
    var name=String(m[3]||'').replace(/\s+/g,' ').trim();
    var size=String(m[4]||'').replace(/\s+/g,' ').trim();

    if(!name || !price || Number(price)<=0) continue;
    if(name.length<3 || name.length>90) continue;

    var key=(store+'|'+name+'|'+price).toLowerCase();
    if(seen[key]) continue;
    seen[key]=1;

    var image=images[i]||'';
    i++;

    // User rule: no active offer without real image.
    if(!/^https?:\/\//i.test(image)) continue;

    result.push({
      product:name,
      category:'Lebensmittel',
      description:name,
      size:size,
      price:price,
      oldPrice:oldPrice,
      discount:'',
      validFrom:'',
      validTo:'',
      imageUrl:image,
      sourceUrl:url
    });
  }
  return result;
}
function importRealOffersDE(){
  var sources=offersRealSourcesDE_();
  var imported=0,withPhotos=0,errors=[];

  sources.forEach(function(src){
    try{
      var html=offerFetchReal_(src.url);
      if(!html){
        errors.push(src.store+': HTTP/HTML leer');
        return;
      }

      var rows=offerProductsReal_(html,src.store,src.url);

      rows.forEach(function(o){
        if(!o.product || !o.price || !o.imageUrl || !o.sourceUrl) return;

        o.Aktive=true;

        upsertCountryOffer_(
          'DE',
          'Frankenthal',
          src.store,
          o,
          {}
        );

        imported++;
        withPhotos++;
      });

    }catch(e){
      errors.push(src.store+': '+String(e.message||e));
    }
  });

  return {
    ok:true,
    country:'DE',
    city:'Frankenthal',
    imported:imported,
    withPhotos:withPhotos,
    errors:errors,
    offers:publicOffers_({country:'DE',city:'Frankenthal'}, {})
  };
}
function testRealOffersDE(){
  return importRealOffersDE();
}


















// V2 clients and the PWA use the same canonical ShoppingList columns.
function shoppingAlias_(r){return Object.assign({},r,{id:r.itemId,product:r.Produkti||r.product||'',name:r.Produkti||r.product||'',quantity:Number(r.Sasia??r.quantity??1),unit:r['Njësia']||r.unit||'copë',purchased:['done','purchased','bought'].includes(String(r.status).toLowerCase())})}
function shoppingListV2_(q,m){return shoppingList_(q,m).items.map(shoppingAlias_)}
function shoppingListAddV2_(q,m){return shoppingAlias_(shoppingAdd_(Object.assign({},q,{product:q.product||q.name||q.Produkti,source:q.source||'needbuy'}),m))}
function shoppingListUpdateV2_(q,m){const id=q.itemId||q.id;shoppingUpdate_(Object.assign({},q,{itemId:id,product:q.product??q.name??q.Produkti}),m);return shoppingAlias_(rows_('ShoppingList').find(r=>r.householdId===m.householdId&&r.itemId===id))}
function shoppingListPurchasedV2_(q,m){const id=q.itemId||q.id,done=q.purchased===true||String(q.purchased).toLowerCase()==='true'||['done','purchased','bought'].includes(String(q.status).toLowerCase());shoppingUpdate_({itemId:id,status:done?'done':'open'},m);return shoppingAlias_(rows_('ShoppingList').find(r=>r.householdId===m.householdId&&r.itemId===id))}
function shoppingListHistoryV2_(q,m){return shoppingListV2_(q,m).filter(r=>r.purchased)}
function shoppingListDeleteV2_(q,m){return shoppingDelete_({itemId:q.itemId||q.id},m)}

/**
 * Mein Haus – Offers Service v1
 * Separate country sheets. This is intentionally standalone and can later be
 * called by the main Apps Script router without changing authentication.
 */
const OFFERS_SS_ID = '1CobxMu2n4hlpquYrcMjgpFdlOBFnZ1TM8E61wpSKUZE';
// Discover existing offer tabs; never create tabs or fabricate country coverage.
function offerCountrySheets_(){
 const found={};SpreadsheetApp.openById(OFFERS_SS_ID).getSheets().forEach(s=>{const match=s.getName().match(/^Oferta_([A-Z]{2})$/);if(match)found[match[1]]=s.getName()});return found;
}
function offerLocations_(q){
 return {countries:Object.keys(offerCountrySheets_()).sort()};
}
const OFFER_HEADERS = ['ID','Shteti','Rajoni_Qyteti','Dyqani','Kategoria','Produkti','Pershkrimi','Sasia','Cmimi','Cmimi_Vjeter','Zbritja','Nga','Deri','Foto_URL','Oferta_URL','Aktive'];

function offersSheet_(country) {
  country=String(country||'').toUpperCase();
  const name=offerCountrySheets_()[country];
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
    if(o.Nga){const d=new Date(o.Nga);if(!isNaN(d)&&d>now)return false}
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
  Object.keys(offerCountrySheets_()).forEach(c=>{
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
