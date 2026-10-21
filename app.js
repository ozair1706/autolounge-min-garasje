'use strict';
/* AutoLounge Min Garasje – skoleprototype. Kun lokal lagring og fiktive testdata. */
const KEY = 'autolounge-min-garasje-school-v1';
const PHONE = '+4767411114'; // Offentlig telefonnummer fra Auto Lounge AS / Dekkpartner.
const LABELS = {overview:'OVERSIKT',hotels:'DEKKHOTELL',offers:'TILBUD',customer:'KUNDEAPP',about:'OM PROSJEKTET'};
const TITLES = {overview:'Salgsoversikt',hotels:'Dekkhotelloversikt',offers:'Lag dekktilbud',customer:'Kundens Min Garasje',about:'Om prototypen'};
let view='overview', selectedHotel='H-101', selectedCustomer='K-101', selectedCustomerSet='H-101', selectedOption=1, toastTimer;
function makeOffers(dimension='205/55 R16') {return [
 {name:'Budsjett',brand:'Nordic Drive Basic',price:4490,note:`4 dekk · ${dimension} · balansert pris`},
 {name:'Anbefalt',brand:'Nokian Season Pro',price:5990,note:`4 dekk · ${dimension} · god komfort`},
 {name:'Premium',brand:'Continental Performance',price:7490,note:`4 dekk · ${dimension} · ekstra grep`}
];}
function seedData(){return {updatedAt:null,sets:[
 {id:'H-101',customerId:'K-101',customerName:'Kunde 01',plate:'TEST-01',brand:'Volvo',model:'XC60',season:'Winter',dimension:'235/55 R18',tyreBrand:'Nokian',tyreModel:'Hakkapeliitta',mm:[3.8,4.0,3.6,3.9],dots:['1322','1322','1322','1322'],onHotel:true,offers:makeOffers('235/55 R18'),published:true,response:null},
 {id:'H-102',customerId:'K-101',customerName:'Kunde 01',plate:'TEST-01',brand:'Volvo',model:'XC60',season:'Summer',dimension:'235/55 R18',tyreBrand:'Michelin',tyreModel:'Primacy',mm:[5.8,6.1,5.6,6.0],dots:['1224','1224','1224','1224'],onHotel:false,offers:[],published:false,response:null},
 {id:'H-103',customerId:'K-101',customerName:'Kunde 01',plate:'TEST-02',brand:'Toyota',model:'Yaris',season:'Summer',dimension:'185/60 R15',tyreBrand:'Bridgestone',tyreModel:'Turanza',mm:[6.3,6.5,6.1,6.4],dots:['1625','1625','1625','1625'],onHotel:true,offers:[],published:false,response:null},
 {id:'H-104',customerId:'K-102',customerName:'Kunde 02',plate:'TEST-03',brand:'BMW',model:'X3',season:'Winter',dimension:'225/60 R18',tyreBrand:'Pirelli',tyreModel:'Ice Zero',mm:[2.7,2.9,2.8,2.6],dots:['4020','4020','4020','4020'],onHotel:true,offers:makeOffers('225/60 R18'),published:true,response:null},
 {id:'H-105',customerId:'K-103',customerName:'Kunde 03',plate:'TEST-04',brand:'Volkswagen',model:'Golf',season:'Summer',dimension:'205/55 R16',tyreBrand:'Hankook',tyreModel:'Ventus',mm:[2.1,2.4,2.2,2.3],dots:['0722','0722','0722','0722'],onHotel:true,offers:[],published:false,response:null},
 {id:'H-106',customerId:'K-104',customerName:'Kunde 04',plate:'TEST-05',brand:'Tesla',model:'Model Y',season:'Winter',dimension:'255/45 R19',tyreBrand:'Continental',tyreModel:'VikingContact',mm:[6.4,6.5,6.2,6.6],dots:['3024','3024','3024','3024'],onHotel:true,offers:[],published:false,response:null},
 {id:'H-107',customerId:'K-105',customerName:'Kunde 05',plate:'TEST-06',brand:'Skoda',model:'Enyaq',season:'Winter',dimension:'235/55 R19',tyreBrand:'Ukjent',tyreModel:'',mm:[],dots:[],onHotel:true,offers:[],published:false,response:null}
]};}
function load(){try{const data=JSON.parse(localStorage.getItem(KEY));if(data&&Array.isArray(data.sets))return data;}catch(e){}return seedData();}
let state=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){toast('Kunne ikke lagre lokalt. Sjekk nettleserinnstillingene.');}}
const $=id=>document.getElementById(id);
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fmtN(n){return Number(n).toLocaleString('nb-NO',{maximumFractionDigits:1});}
function cash(n){return Number(n).toLocaleString('nb-NO',{maximumFractionDigits:0})+' kr';}
function seasonName(s){return /winter|vinter/i.test(s)?'Vinter':'Sommer';}
function winter(s){return seasonName(typeof s==='string'?s:s?.season)==='Vinter';}
function minimum(s){return winter(s)?3:1.6;}
function followUp(s){return winter(s)?5:3;}
function minDepth(s){const a=(s.mm||[]).map(Number).filter(n=>Number.isFinite(n)&&n>0);return a.length?Math.min(...a):null;}
function condition(s){const m=minDepth(s);if(m===null)return{key:'none',label:'Mangler måling',cls:'neutral'};if(m<minimum(s))return{key:'critical',label:'Høy prioritet',cls:'red'};if(m<followUp(s))return{key:'check',label:'Bør vurderes',cls:'orange'};return{key:'ok',label:'Registrert OK',cls:'green'};}
function publishedCount(){return state.sets.filter(s=>s.published).length;}
function toast(message){const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3500);}
function badge(s){const c=condition(s);return `<span class="badge ${c.cls}">${c.label}</span>`;}
function findSet(id){return state.sets.find(s=>s.id===id);}
function customerGroups(){const group=new Map();for(const s of state.sets){if(!group.has(s.customerId))group.set(s.customerId,{id:s.customerId,name:s.customerName,sets:[]});group.get(s.customerId).sets.push(s);}return Array.from(group.values());}
function showView(id){if(!(id in LABELS))return;view=id;document.querySelectorAll('.view').forEach(x=>x.classList.toggle('active',x.id==='view-'+id));document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view===id));$('crumbCurrent').textContent=LABELS[id];$('pageTitle').textContent=TITLES[id];document.querySelector('.sidebar').classList.remove('show');if(id==='offers')renderOffers();if(id==='customer')renderCustomer();if(id==='hotels')renderHotels();window.scrollTo({top:0,behavior:'instant'});}
function renderStats(){const sets=state.sets;const needs=sets.filter(s=>['critical','check'].includes(condition(s).key)).length;const responses=sets.filter(s=>s.response&&s.response.status==='ny').length;const customers=customerGroups().length;const cards=[['Registrerte hjulsett',sets.length,'◈','Fra demo eller import'],['Bør følges opp',needs,'⚑','Interne kontrollgrenser'],['Publiserte tilbud',publishedCount(),'◇','Tre alternativer per hjulsett'],['Nye kundesvar',responses,'↗',`${customers} kunder i oversikten`]];$('statsGrid').innerHTML=cards.map(([name,v,icon,note])=>`<div class="stat-card"><div class="stat-header"><span>${name}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${v}</div><div class="stat-note">${note}</div></div>`).join('');$('navHotelCount').textContent=sets.length;}
function renderOverview(){renderStats();const priority=state.sets.filter(s=>['critical','check'].includes(condition(s).key)).sort((a,b)=>minDepth(a)-minDepth(b)).slice(0,5);$('priorityList').innerHTML=priority.length?priority.map(s=>`<div class="priority-row"><div class="priority-car"><span class="car-tile">▣</span><div><strong>${esc(s.brand)} ${esc(s.model)} · ${esc(s.plate)}</strong><small>${seasonName(s.season)} · ${esc(s.dimension)} · ${esc(s.customerName)}</small></div></div><div class="row-actions"><span class="badge ${condition(s).cls}">${fmtN(minDepth(s))} mm</span><button class="small-action" data-new-offer="${esc(s.id)}">Tilbud ↗</button></div></div>`).join(''):'<div class="empty-state">Ingen hjulsett med målinger under oppfølgingstersklene.</div>';
const replies=state.sets.filter(s=>s.response).sort((a,b)=>String(b.response.at).localeCompare(String(a.response.at)));$('responseList').innerHTML=replies.length?replies.map(s=>`<div class="response-row"><div><strong>${esc(s.customerName)} · ${esc(s.brand)} ${esc(s.model)}</strong><small>${s.response.kind==='chosen'?`Valgte ${esc(s.offers[s.response.offerIdx]?.name||'tilbud')}`:'Ønsker å bli oppringt'} · ${s.response.status==='bekreftet'?'Ferdig behandlet':'Venter på verkstedet'}</small></div><div class="row-actions"><span class="badge ${s.response.status==='bekreftet'?'green':'orange'}">${s.response.status==='bekreftet'?'Bekreftet':'Nytt svar'}</span>${s.response.status!=='bekreftet'?`<button class="small-action" data-confirm="${esc(s.id)}">Bekreft</button>`:''}</div></div>`).join(''):'<div class="empty-state">Ingen kundesvar ennå. Prøv kundeappen og velg et tilbud.</div>';}
function renderHotels(){const query=($('hotelSearch').value||'').toLocaleLowerCase('nb-NO');const filter=$('hotelFilter').value;const sets=state.sets.filter(s=>{const match=[s.brand,s.model,s.plate,s.customerName,s.dimension,s.tyreBrand].join(' ').toLocaleLowerCase('nb-NO').includes(query);const cond=condition(s).key;return match&&(filter==='all'||(filter==='check'&&['check','critical'].includes(cond))||(filter==='offer'&&s.published)||(filter==='none'&&cond==='none'));});$('hotelsTable').innerHTML=sets.length?sets.map(s=>{const m=minDepth(s);return `<tr data-id="${esc(s.id)}" tabindex="0"><td><strong>${esc(s.brand)} ${esc(s.model)}</strong><small>${esc(s.plate)} · ${esc(s.customerName)}</small></td><td><strong>${seasonName(s.season)}</strong><small>${esc(s.id)} ${s.onHotel?'· På hotell':'· På bil'}</small></td><td><strong>${esc(s.tyreBrand||'Ukjent')} ${esc(s.tyreModel||'')}</strong><small>${esc(s.dimension||'Ukjent dimensjon')}</small></td><td><span class="depth ${m===null?'':m<minimum(s)?'low':m<followUp(s)?'med':'high'}">${m===null?'–':fmtN(m)+' mm'}</span></td><td>${badge(s)}${s.published?'<small>3 tilbud publisert</small>':''}</td><td><button class="page-button" data-detail="${esc(s.id)}">Detaljer →</button></td></tr>`;}).join(''):'<tr><td colspan="6"><div class="empty-state">Ingen hjulsett matcher søket.</div></td></tr>';$('tableCount').textContent=`Viser ${sets.length} av ${state.sets.length} hjulsett`;if($('hotelDetail').hidden===false){const id=$('hotelDetail').dataset.id;const s=findSet(id);if(s)renderHotelDetail(s);else $('hotelDetail').hidden=true;}}
function renderHotelDetail(s){selectedHotel=s.id;const detail=$('hotelDetail');detail.hidden=false;detail.dataset.id=s.id;detail.innerHTML=`<div class="panel-title"><div><div class="eyebrow">HJULSETT ${esc(s.id)}</div><h2>${esc(s.brand)} ${esc(s.model)} · ${seasonName(s.season)}</h2></div><button class="icon-button" data-close-detail aria-label="Lukk detaljer">✕</button></div><div class="details-meta"><span>${esc(s.customerName)}</span><span>${esc(s.plate)}</span><span>${esc(s.tyreBrand||'Ukjent')} ${esc(s.tyreModel||'')}</span><span>${esc(s.dimension||'Ukjent dimensjon')}</span></div><div class="detail-grid">${[0,1,2,3].map(i=>`<div class="detail-cell"><span>${['Venstre foran','Høyre foran','Venstre bak','Høyre bak'][i]}</span><strong>${Number(s.mm?.[i])>0?fmtN(s.mm[i])+' mm':'–'}</strong><span>${s.dots?.[i]?'DOT '+esc(s.dots[i]):'Ingen DOT registrert'}</span></div>`).join('')}</div><p>Intern vurdering: <b>${badge(s)}</b> ${!minDepth(s)?'Mønsterdybde mangler. Kontroller manuelt.':'Kontroller også skade, alder og dekktype før du anbefaler bytte.'}</p><div class="detail-actions"><button class="btn btn-primary" data-new-offer="${esc(s.id)}">${s.published?'Endre tilbud':'Lag 3 tilbud'} ↗</button><button class="btn btn-outline" data-open-customer="${esc(s.id)}">Se kundevisning</button></div>`;}
function renderOffers(){if(!findSet(selectedHotel))selectedHotel=state.sets[0]?.id||'';const select=$('offerHotelSelect');select.innerHTML=state.sets.map(s=>`<option value="${esc(s.id)}">${esc(s.customerName)} · ${esc(s.brand)} ${esc(s.model)} · ${seasonName(s.season)} · ${esc(s.id)}</option>`).join('');select.value=selectedHotel;const s=findSet(selectedHotel);if(!s){$('offerVehicleInfo').textContent='Importer testdata først.';$('offerEditors').innerHTML='';return;}$('offerVehicleInfo').innerHTML=`<b>${esc(s.dimension)}</b> · ${esc(s.tyreBrand)} ${esc(s.tyreModel)} · ${minDepth(s)===null?'Ingen måling':fmtN(minDepth(s))+' mm'} ${s.published?'<span class="badge green">Publisert</span>':'<span class="badge neutral">Ikke publisert</span>'}`;
const offers=s.offers?.length===3?s.offers:makeOffers(s.dimension);$('offerEditors').innerHTML=offers.map((o,i)=>`<div class="offer-editor"><div class="offer-editor-top"><div style="display:flex;align-items:center;gap:10px"><span class="offer-editor-num">0${i+1}</span><strong>${['Budsjett','Anbefalt','Premium'][i]}</strong></div>${i===1?'<span class="badge orange">ANBEFALT</span>':''}</div><div class="offer-editor-body"><div class="field"><label for="offer-name-${i}">Pakke / tittel</label><input id="offer-name-${i}" name="name${i}" maxlength="45" required value="${esc(o.name)}"></div><div class="field"><label for="offer-brand-${i}">Dekkmerke / modell</label><input id="offer-brand-${i}" name="brand${i}" maxlength="70" required value="${esc(o.brand)}"></div><div class="field"><label for="offer-price-${i}">Totalpris for 4 dekk (kr)</label><div class="price-input"><input id="offer-price-${i}" type="number" name="price${i}" min="1" max="999999" step="1" required value="${esc(o.price)}"><span>NOK</span></div></div><div class="field"><label for="offer-note-${i}">Kort beskrivelse</label><textarea id="offer-note-${i}" name="note${i}" maxlength="130">${esc(o.note)}</textarea></div></div></div>`).join('');}
function renderCustomer(){const groups=customerGroups();if(!groups.some(c=>c.id===selectedCustomer))selectedCustomer=groups[0]?.id||'';const customerSelect=$('customerSelect');customerSelect.innerHTML=groups.map(c=>`<option value="${esc(c.id)}">${esc(c.name)} · ${new Set(c.sets.map(s=>s.plate)).size} bil(er)</option>`).join('');customerSelect.value=selectedCustomer;const customer=groups.find(c=>c.id===selectedCustomer);if(!customer){$('customerPhoneContent').innerHTML='<p>Ingen demo-kunder er tilgjengelige.</p>';return;}if(!customer.sets.some(s=>s.id===selectedCustomerSet))selectedCustomerSet=customer.sets[0].id;const s=findSet(selectedCustomerSet);const m=minDepth(s);const cond=condition(s);$('customerPhoneContent').innerHTML=`<p class="hello">Hei, ${esc(customer.name)} 👋</p><h2 class="phone-title">Min garasje</h2><div class="phone-car"><small>MINE BILER OG HJULSETT</small><h3>${esc(s.brand)} ${esc(s.model)}</h3><p>${esc(s.plate)} · ${seasonName(s.season)}hjul · ${s.onHotel?'På dekkhotell':'På bil'}</p><select id="customerSetSelect" aria-label="Velg bil og hjulsett">${customer.sets.map(item=>`<option value="${esc(item.id)}" ${item.id===s.id?'selected':''}>${esc(item.brand)} ${esc(item.model)} · ${esc(item.plate)} · ${seasonName(item.season)}</option>`).join('')}</select></div><div class="phone-card"><div class="phone-row"><h4>Dekkstatus</h4><span class="badge ${cond.cls}">${cond.label}</span></div><p>${esc(s.tyreBrand||'Ukjent dekkmerke')} ${esc(s.tyreModel||'')} · ${esc(s.dimension)}</p><div class="tyre-mms">${[0,1,2,3].map((i)=>`<div class="tyre-mm"><b>${Number(s.mm?.[i])>0?fmtN(s.mm[i]):'–'}</b><span>${['VF','HF','VB','HB'][i]} · mm</span></div>`).join('')}</div><p>${m===null?'Målinger mangler. Be verkstedet kontrollere dekkene.':cond.key==='critical'?'En eller flere målinger er lave. AutoLounge bør kontrollere dekkene.':cond.key==='check'?'Vi anbefaler en nærmere kontroll før neste sesong.':'Mønsterdybdene er registrert. Tilstanden vurderes alltid av verkstedet.'}</p></div><div class="phone-card"><div class="phone-row"><h4>${s.published?'Dine personlige tilbud':'Tilbud på nye dekk'}</h4>${s.published?'<span class="badge orange">3 ALTERNATIVER</span>':''}</div>${s.published?`<p>Velg ønsket dekkpakke, eller spør oss om råd. Ingen betaling nå.</p>${s.offers.map((o,i)=>`<label class="phone-offer ${i===1?'recommended':''} ${selectedOption===i?'selected':''}"><input type="radio" name="chooseOffer" value="${i}" ${selectedOption===i?'checked':''} ${s.response?.status==='bekreftet'?'disabled':''}><span style="flex:1"><strong>${esc(o.name)}</strong><small>${esc(o.brand)}</small></span><span class="price">${cash(o.price)}</span></label>`).join('')}${s.response?.status==='bekreftet'?'':`<button class="btn btn-primary phone-cta" data-customer-action="choose">Velg dekkpakke →</button><button class="phone-text-button" data-customer-action="callback">Jeg vil bli oppringt</button>`}${s.response?`<div class="phone-confirmation"><strong>${s.response.status==='bekreftet'?'✓ Verkstedet har bekreftet':'✓ Ønsket ditt er registrert i demoen'}</strong>${s.response.kind==='callback'?'Du har bedt om oppringning.':'Du har valgt '+esc(s.offers[s.response.offerIdx]?.name||'et tilbud')+'.'} ${s.response.status==='bekreftet'?'Kontakt verkstedet ved endringer.':'AutoLounge må bekrefte pris og tilgjengelighet. Betaling skjer ved hjulskift.'}</div>`:''}`:`<div class="phone-alert">Det ligger ingen publiserte tilbud på dette hjulsettet ennå. Verkstedet kan lage dem fra «Lag tilbud».</div>`}</div><a class="contact-link" href="tel:${PHONE}">☎ Ring AutoLounge · 67 41 11 14</a><p style="text-align:center;font-size:10px;margin-top:8px">Fiktiv kundedata · ingen ekte booking eller SMS</p>`;}
function renderAll(){renderOverview();renderHotels();renderOffers();renderCustomer();}
function publishOffers(evt){evt.preventDefault();const s=findSet(selectedHotel);if(!s)return;const form=new FormData($('offerForm'));const arr=[];for(let i=0;i<3;i++){const name=String(form.get('name'+i)||'').trim(),brand=String(form.get('brand'+i)||'').trim(),note=String(form.get('note'+i)||'').trim(),price=Number(form.get('price'+i));if(!name||!brand||!Number.isFinite(price)||price<=0||price>999999){toast('Fyll inn navn, merke og gyldig pris på alle tre tilbud.');return;}arr.push({name,brand,note,price});}s.offers=arr;s.published=true;if(s.response){s.response=null;toast('Tilbudene er oppdatert. Eventuelt tidligere demosvar ble nullstilt.');}else toast('Tre tilbud publisert for '+s.brand+' '+s.model+'.');save();selectedCustomer=s.customerId;selectedCustomerSet=s.id;renderAll();}
function customerAction(kind){const s=findSet(selectedCustomerSet);if(!s||!s.published){toast('Ingen tilbud er publisert for dette hjulsettet.');return;}if(s.response?.status==='bekreftet'){toast('Ordren er allerede bekreftet i demoen.');return;}s.response={kind,offerIdx:kind==='chosen'?selectedOption:null,at:new Date().toISOString(),status:'ny'};save();renderAll();toast(kind==='chosen'?'Tilbudsvalg sendt til verkstedoversikten (demo).':'Oppringningsønske registrert i demoen.');}
function canon(s){return String(s??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');}
function guessSeparator(header){const chars=[',',';','\t'];const count=ch=>{let quoted=false,count=0;for(let i=0;i<header.length;i++){if(header[i]==='"'){if(quoted&&header[i+1]==='"'){i++;continue;}quoted=!quoted;}else if(!quoted&&header[i]===ch)count++;}return count;};return chars.sort((a,b)=>count(b)-count(a))[0];}
function parseDelimited(text){const firstLine=String(text).split(/\r?\n/,1)[0];const sep=guessSeparator(firstLine);const out=[];let row=[],cell='',quote=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quote&&text[i+1]==='"'){cell+='"';i++;}else quote=!quote;}else if(c===sep&&!quote){row.push(cell);cell='';}else if((c==='\r'||c==='\n')&&!quote){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(a=>a.trim()))out.push(row);row=[];cell='';}else cell+=c;}if(quote)throw new Error('Ufullstendig anførselstegn i CSV.');row.push(cell);if(row.some(a=>a.trim()))out.push(row);return out;}
function parseBool(s){return /^(sann|true|yes|1|ja)$/i.test(String(s??'').trim());}
function parseDepth(s){const n=Number(String(s??'').trim().replace(',','.'));return Number.isFinite(n)&&n>0&&n<=30?n:null;}
function ingestCSV(text){return ingestRows(parseDelimited(text.replace(/^\uFEFF/,'')));}
function ingestRows(rows){if(rows.length<2)throw new Error('Filen mangler kolonneoverskrifter eller rader.');const heads=rows[0].map(canon);const wanted=['id','licenseplate','kundenummer','season'];const missing=wanted.filter(x=>!heads.includes(x));if(missing.length)throw new Error('Filen mangler Eontyre-kolonner: '+missing.join(', ')+'.');const idx=new Map(heads.map((h,i)=>[h,i]));const get=(row,key)=>String(row[idx.get(canon(key))]??'').trim();const customers=new Map(),vehicles=new Map();const sets=[];for(const row of rows.slice(1)){if(!row.some(v=>String(v).trim()))continue;const sourceHotelId=get(row,'ID');const plate=get(row,'[License plate]');const cnum=get(row,'Kundenummer');if(!sourceHotelId||!plate||!cnum)continue;
 // No names, personal numbers, Eontyre IDs, contacts or booking credentials leave this function.
 if(!customers.has(cnum))customers.set(cnum,{id:'K-'+String(customers.size+1).padStart(3,'0'),name:'Kunde '+String(customers.size+1).padStart(2,'0')});
 const c=customers.get(cnum);const vehicleKey=cnum+'::'+plate;if(!vehicles.has(vehicleKey))vehicles.set(vehicleKey,'TEST-'+String(vehicles.size+1).padStart(2,'0'));
 const mm=Array.from({length:6},(_,i)=>parseDepth(get(row,'mm'+(i+1))));
 const dots=Array.from({length:6},(_,i)=>get(row,'[DOT'+(i+1)+']').slice(0,5));
 const tyreBrands=Array.from({length:6},(_,i)=>get(row,'[TyreBrand'+(i+1)+']')).filter(Boolean);
 const tyreModels=Array.from({length:6},(_,i)=>get(row,'[TyreModel'+(i+1)+']')).filter(Boolean);
 const dims=Array.from({length:6},(_,i)=>get(row,'Dimensjon'+(i+1))).filter(Boolean);
 const seasonRaw=get(row,'Season');sets.push({id:'IMP-'+String(sets.length+1).padStart(3,'0'),customerId:c.id,customerName:c.name,plate:vehicles.get(vehicleKey),brand:get(row,'Bilmerke').slice(0,45)||'Ukjent merke',model:get(row,'Bilmodell').slice(0,45)||'Ukjent modell',season:/winter|vinter/i.test(seasonRaw)?'Winter':'Summer',dimension:(dims[0]||'Ukjent').slice(0,35),tyreBrand:(tyreBrands[0]||'Ukjent').slice(0,45),tyreModel:(tyreModels[0]||'').slice(0,45),mm,dots,onHotel:true,offers:[],published:false,response:null});
 }if(!sets.length)throw new Error('Fant ingen gyldige hjulsett. Krever ID, registreringsnummer og kundenummer i testdata.');state={sets,updatedAt:new Date().toISOString()};selectedHotel=sets[0].id;selectedCustomer=sets[0].customerId;selectedCustomerSet=sets[0].id;selectedOption=1;save();renderAll();return `${sets.length} hjulsett fra ${customers.size} kunder importert og anonymisert. Alle demo-tilbud er nullstilt.`;}
function jsonRows(raw){
 let data=raw;
 for(let n=0;n<4&&!Array.isArray(data);n++){
  if(!data||typeof data!=='object')break;
  if(Array.isArray(data.headers)&&Array.isArray(data.data))return [data.headers,...data.data];
  const key=['data','rows','items','results','records','hotels','dekkhotell'].find(k=>Array.isArray(data[k])||(data[k]&&typeof data[k]==='object'));
  if(!key)break;data=data[key];
 }
 if(!Array.isArray(data)||!data.length)throw new Error('JSON må inneholde en liste med dekkhotellrader (eller data/rows/items).');
 if(Array.isArray(data[0]))return data;
 if(typeof data[0]!=='object'||data[0]===null)throw new Error('JSON-radene har ukjent format.');
 const headers=[...new Set(data.flatMap(row=>Object.keys(row||{})))];
 return [headers,...data.map(row=>headers.map(k=>{
  const v=row?.[k];return v===null||v===undefined?'':typeof v==='object'?'':String(v);
 }))];
}
// Minimal, dependency-free XLSX reader: reads the first Excel sheet locally.
// Only the column values needed by the demo survive ingestRows().
function zipCentralDirectory(buffer){
 const v=new DataView(buffer), bytes=new Uint8Array(buffer);let end=-1;
 for(let i=buffer.byteLength-22;i>=Math.max(0,buffer.byteLength-66000);i--){if(v.getUint32(i,true)===0x06054b50){end=i;break;}}
 if(end<0)throw new Error('Dette er ikke en gyldig .xlsx-fil.');
 const count=v.getUint16(end+10,true), offset=v.getUint32(end+16,true);
 if(count>1500)throw new Error('Excel-filen har for mange interne filer.');
 const names=new Map(),decoder=new TextDecoder();let pos=offset;
 for(let n=0;n<count;n++){
  if(pos+46>buffer.byteLength||v.getUint32(pos,true)!==0x02014b50)throw new Error('Excel-filen har en skadet ZIP-katalog.');
  const method=v.getUint16(pos+10,true),compressed=v.getUint32(pos+20,true),uncompressed=v.getUint32(pos+24,true),nameLen=v.getUint16(pos+28,true),extra=v.getUint16(pos+30,true),comment=v.getUint16(pos+32,true),at=v.getUint32(pos+42,true);
  const name=decoder.decode(bytes.slice(pos+46,pos+46+nameLen)).replace(/\\/g,'/');
  names.set(name,{method,compressed,uncompressed,at});pos+=46+nameLen+extra+comment;
 }
 return {v,bytes,names};
}
async function zipText(zip,name){
 const meta=zip.names.get(name);if(!meta)throw new Error('Mangler Excel-del: '+name);
 const {v,bytes}=zip;
 if(meta.uncompressed>25*1024*1024)throw new Error('Excel-ark er for stort for demoen.');
 const at=meta.at;if(at+30>bytes.length||v.getUint32(at,true)!==0x04034b50)throw new Error('Ugyldig Excel-arkiv.');
 const start=at+30+v.getUint16(at+26,true)+v.getUint16(at+28,true);
 if(start+meta.compressed>bytes.length)throw new Error('Excel-arkiv er ufullstendig.');
 const raw=bytes.slice(start,start+meta.compressed);
 let output;
 if(meta.method===0)output=raw;
 else if(meta.method===8){
  if(!('DecompressionStream' in window))throw new Error('Nettleseren støtter ikke Excel-import. Bruk nyeste Chrome/Edge eller JSON.');
  output=new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());
 }else throw new Error('Ukjent Excel-komprimering.');
 if(output.byteLength>25*1024*1024)throw new Error('Excel-ark er for stort for demoen.');
 return new TextDecoder().decode(output);
}
function excelXML(raw){
 const doc=new DOMParser().parseFromString(raw,'application/xml');
 if(doc.getElementsByTagName('parsererror').length)throw new Error('Kunne ikke lese Excel-XML.');
 return doc;
}
function xmlText(parent,tag){return [...parent.getElementsByTagNameNS('*',tag)].map(e=>e.textContent||'').join('');}
function excelColumn(ref){const letters=(ref.match(/^[A-Z]+/i)||[])[0]||'';let n=0;for(const c of letters.toUpperCase())n=n*26+c.charCodeAt(0)-64;return n-1;}
async function excelRows(buffer){
 const zip=zipCentralDirectory(buffer);
 const shared=[];
 if(zip.names.has('xl/sharedStrings.xml')){
  const doc=excelXML(await zipText(zip,'xl/sharedStrings.xml'));
  for(const si of doc.getElementsByTagNameNS('*','si'))shared.push(xmlText(si,'t'));
 }
 let sheetFile=[...zip.names.keys()].filter(name=>/^xl\/worksheets\/sheet\d+\.xml$/.test(name)).sort((a,b)=>Number(a.match(/sheet(\d+)/)[1])-Number(b.match(/sheet(\d+)/)[1]))[0];
 if(!sheetFile)throw new Error('Finner ikke noe Excel-regneark.');
 // Honor the workbook's first visible worksheet when its relationship is known.
 if(zip.names.has('xl/workbook.xml')&&zip.names.has('xl/_rels/workbook.xml.rels')){
  const wb=excelXML(await zipText(zip,'xl/workbook.xml'));
  const sh=[...wb.getElementsByTagNameNS('*','sheet')][0];
  const id=sh?.getAttribute('r:id')||sh?.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id');
  if(id){const rels=excelXML(await zipText(zip,'xl/_rels/workbook.xml.rels'));
   const rel=[...rels.getElementsByTagNameNS('*','Relationship')].find(el=>el.getAttribute('Id')===id);
   const target=rel?.getAttribute('Target');
   if(target){const normalized=target.startsWith('/')?target.slice(1):'xl/'+target;const parts=[];for(const part of normalized.split('/')){if(part==='..')parts.pop();else if(part!=='.')parts.push(part);}if(zip.names.has(parts.join('/')))sheetFile=parts.join('/');}
  }
 }
 const sheet=excelXML(await zipText(zip,sheetFile)),rows=[];
 for(const row of sheet.getElementsByTagNameNS('*','row')){
  if(rows.length>=6001)throw new Error('Bruk en testfil med maksimalt 6000 hjulsett.');
  const values=[],cells=[...row.getElementsByTagNameNS('*','c')];let fallbackCol=0;
  for(const c of cells){
   const reference=c.getAttribute('r'),col=reference?excelColumn(reference):fallbackCol;
   if(col<0||col>350)continue;fallbackCol=col+1;
   const type=c.getAttribute('t'),rawValue=xmlText(c,'v');
   values[col]=type==='s'?shared[Number(rawValue)]||'':type==='inlineStr'?xmlText(c,'t'):type==='b'?(rawValue==='1'?'SANN':'USANN'):rawValue;
  }
  if(values.some(x=>x!==undefined&&x!==''))rows.push(Array.from({length:Math.max(0,values.length)},(_,i)=>values[i]??''));
 }
 return rows;
}
async function importFile(){
 const input=$('csvFile'),file=input.files?.[0],message=$('importMessage');message.className='import-message';
 if(!file){message.textContent='Velg en Excel-, JSON- eller CSV-testfil først.';message.classList.add('error');return;}
 const extension=(file.name.split('.').pop()||'').toLowerCase();
 if(!['csv','tsv','txt','json','xlsx'].includes(extension)){message.textContent='Støtter Excel (.xlsx), JSON og CSV. Eldre .xls må lagres som .xlsx.';message.classList.add('error');return;}
 if(file.size>10*1024*1024){message.textContent='Filen er for stor for demoen (maks 10 MB).';message.classList.add('error');return;}
 try{
  let rows;
  if(extension==='xlsx')rows=await excelRows(await file.arrayBuffer());
  else{
   const buf=await file.arrayBuffer();let text;
   try{text=new TextDecoder('utf-8',{fatal:true}).decode(buf);}catch(e){text=new TextDecoder('windows-1252').decode(buf);}
   rows=extension==='json'?jsonRows(JSON.parse(text.replace(/^\uFEFF/,''))):parseDelimited(text.replace(/^\uFEFF/,''));
  }
  const response=ingestRows(rows);message.textContent=response;message.classList.add('ok');toast('Testfil importert og anonymisert. Ingen personopplysninger ble lagret.');
 }catch(e){message.textContent='Importfeil: '+e.message;message.classList.add('error');}
}
function init(){renderAll();document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.go)));$('mobileMenu').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('show'));$('hotelSearch').addEventListener('input',renderHotels);$('hotelFilter').addEventListener('change',renderHotels);$('openImport').addEventListener('click',()=>{$('importPanel').hidden=!$('importPanel').hidden;if(!$('importPanel').hidden)$('importPanel').scrollIntoView({behavior:'smooth',block:'nearest'});});$('closeImport').addEventListener('click',()=>$('importPanel').hidden=true);$('importButton').addEventListener('click',importFile);$('offerHotelSelect').addEventListener('change',e=>{selectedHotel=e.target.value;renderOffers();});$('offerForm').addEventListener('submit',publishOffers);$('customerSelect').addEventListener('change',e=>{selectedCustomer=e.target.value;selectedCustomerSet='';selectedOption=1;renderCustomer();});$('customerPhoneContent').addEventListener('change',e=>{if(e.target.id==='customerSetSelect'){selectedCustomerSet=e.target.value;selectedOption=1;renderCustomer();}else if(e.target.name==='chooseOffer'){selectedOption=Number(e.target.value);renderCustomer();}});$('resetButton').addEventListener('click',()=>$('confirmModal').hidden=false);$('cancelReset').addEventListener('click',()=>$('confirmModal').hidden=true);$('confirmReset').addEventListener('click',()=>{state=seedData();selectedHotel='H-101';selectedCustomer='K-101';selectedCustomerSet='H-101';selectedOption=1;$('hotelSearch').value='';$('hotelFilter').value='all';$('hotelDetail').hidden=true;$('importPanel').hidden=true;$('importMessage').textContent='';save();renderAll();$('confirmModal').hidden=true;showView('overview');toast('Demoen er tilbakestilt.');});document.addEventListener('click',e=>{const target=e.target.closest('[data-new-offer],[data-confirm],[data-detail],[data-close-detail],[data-open-customer],[data-customer-action]');if(!target)return;if(target.dataset.newOffer){selectedHotel=target.dataset.newOffer;showView('offers');}else if(target.dataset.confirm){const s=findSet(target.dataset.confirm);if(s?.response){s.response.status='bekreftet';save();renderAll();toast('Kundesvar bekreftet i demoen.');}}else if(target.dataset.detail){const s=findSet(target.dataset.detail);if(s){renderHotelDetail(s);$('hotelDetail').scrollIntoView({behavior:'smooth',block:'nearest'});}}else if('closeDetail' in target.dataset){$('hotelDetail').hidden=true;}else if(target.dataset.openCustomer){const s=findSet(target.dataset.openCustomer);if(s){selectedCustomer=s.customerId;selectedCustomerSet=s.id;selectedOption=1;showView('customer');}}else if(target.dataset.customerAction){customerAction(target.dataset.customerAction==='choose'?'chosen':'callback');}});$('hotelsTable').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('tr[data-id]')){e.preventDefault();const s=findSet(e.target.dataset.id);if(s)renderHotelDetail(s);}});window.addEventListener('keydown',e=>{if(e.key==='Escape'){$('confirmModal').hidden=true;document.querySelector('.sidebar').classList.remove('show');}});}
document.addEventListener('DOMContentLoaded',init);
