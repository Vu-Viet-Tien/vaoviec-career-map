'use strict';
const $ = s => document.querySelector(s);
const app = $('#app'), modal = $('#dialog');
const key = 'vaoviec-workspace-mission-001-v1';
const returnRole = new URLSearchParams(location.search).get('from') ?? '';
const careerMapUrl = '/#/roles/' + (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(returnRole) ? returnRole : CASE.roleSlug);

renderSiteHeader({active:'workspace', exploreUrl:careerMapUrl, inCase:true});
$('.case-position').textContent=CASE.roleName;
$('.case-name').textContent=CASE.caseName;
$('.case-return').href=careerMapUrl;
const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
// Thứ tự thư trong mỗi đợt được xáo ngẫu nhiên một lần cho mỗi lượt chơi.
const newMailOrder=()=>Object.fromEntries([1,2].map(wave=>[wave,shuffle(CASE.emails.filter(e=>e.wave===wave).map(e=>e.id))]));
const initial = () => ({flow:2,tab:'Inbox',jdViewed:false,drafts:[{},{}],posts:[],wave:0,mailOrder:newMailOrder(),added:{},replied:{},ats:{},atsDraft:{},recommendation:'',submission:null,readMail:{}});
// Bản lưu trước 14/11 dùng luồng ATS cũ (xác minh, shortlist 4 ô). Giữ phần giới thiệu và tin đã đăng,
// chuyển bài đã nộp sang mục Lượt trước, rồi làm lại phần sàng lọc theo luồng mới.
function migrate(saved){
  if(!saved||typeof saved!=='object'||!Object.keys(saved).length)return initial();
  if(saved.flow===2)return {...initial(),...saved};
  const versions=[...(saved.history??[]),...(saved.submission?[saved.submission]:[])];
  if(versions.length)write(key+'-portfolio',[{id:versions[0].id,archivedAt:Date.now(),mode:saved.mode,versions},...read(key+'-portfolio',[])]);
  const keep=['introSeen','mode','jdViewed','jdGuideSeen','postingGuideSeen','posts','channelDrafts','drafts','tabOrder','officeMailShownAt','wave'];
  const next={...initial(),...Object.fromEntries(keep.filter(k=>k in saved).map(k=>[k,saved[k]]))};
  next.readMail={brief:Boolean(saved.readMail?.brief),chat:Boolean(saved.readMail?.chat)};
  return next;
}
function read(k,fallback){try{return JSON.parse(localStorage.getItem(k)) ?? fallback;}catch{return fallback;}}
function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{/* State remains available in memory. */}}
function restoreChannelTabs(state){
  const normalize=id=>id.startsWith('channel:')?id.slice(8):id;
  const isChannel=id=>CASE.channels.some(([channel])=>channel===id);
  state.tab=normalize(state.tab);
  state.channelTab=isChannel(state.tab)?state.tab:'';
  if(state.tabOrder)state.tabOrder=state.tabOrder.filter(id=>!isChannel(normalize(id))&&!id.startsWith('channel:'));
  delete state.channelTabs;
  delete state.postingTabs;
  return state;
}
// Dữ liệu lưu thiếu trường (bản cũ hoặc bị sửa tay) được bù bằng giá trị mặc định, tránh trắng trang.
let s=restoreChannelTabs(migrate(read(key,{}))), desk=true, panel='email', selectedEmail='', person='', overlay='', cvZoom=1;
// Yêu cầu chấm bị ngắt khi tải lại trang: cho phép thử chấm lại thay vì chờ mãi.
if(s.submission?.ai?.status==='pending')s.submission.ai={status:'error',message:'Lượt chấm trước bị gián đoạn.'};
if(!s.introSeen)overlay='intro-role';
// Bài dở từ trước khi có bước chọn chế độ: hỏi chế độ trước khi làm tiếp.
else if(!s.mode)overlay='intro-mode';
else if(location.hash==='#profile')overlay='portfolio';
else if(location.hash==='#result'&&s.submission)overlay='feedback';
else if(location.hash==='#opportunities')overlay='opportunities';
let mailQuery='';
let mailAudio;
function enableMailSound(){
  if(typeof AudioContext==='undefined')return;
  mailAudio??=new AudioContext();
  if(mailAudio.state==='suspended')mailAudio.resume().catch(()=>{});
}
function playMailSound(count=1){
  if(!count||mailAudio?.state!=='running')return;
  const start=mailAudio.currentTime;
  for(let index=0;index<count;index++){
    [659.25,880].forEach((frequency,note)=>{
      const at=start+index*.24+note*.07;
      const tone=mailAudio.createOscillator();
      const volume=mailAudio.createGain();
      tone.type='sine';
      tone.frequency.value=frequency;
      volume.gain.setValueAtTime(.001,at);
      volume.gain.exponentialRampToValueAtTime(.075,at+.012);
      volume.gain.exponentialRampToValueAtTime(.001,at+.13);
      tone.connect(volume).connect(mailAudio.destination);
      tone.start(at);
      tone.stop(at+.14);
    });
  }
}
document.addEventListener('click',enableMailSound,{capture:true});
document.addEventListener('keydown',enableMailSound,{capture:true});
const jdTab=CASE.jdFile;
const laptopTabs=[['Inbox','mail','mail'],['Cổng đăng tuyển','people','careers','Đăng tin tuyển dụng'],['ATS mini','layers','ats'],['Bàn giao','file','ats'],['Calendar','calendar','calendar'],[jdTab,'file','mail']];
const postingTab='Cổng đăng tuyển';
const channelInfo=id=>CASE.channels.find(([channel])=>channel===id);
const channelTabs=()=>s.channelTab?[channelInfo(s.channelTab)]:[];
const draftIndex=()=>s.posts.length;
const channelAvailable=id=>s.posts.length<2&&!s.posts.some(post=>post.channel===id);
function channelDraft(id){
  const drafts=(s.channelDrafts??=[]);
  const legacy=s.drafts[draftIndex()];
  return ((drafts[draftIndex()]??={})[id]??=legacy?.channel===id
    ?{...legacy,body:CASE.fields.map(([field])=>legacy[field]).filter(Boolean).join('\n')}
    :{});
}
const postedName=post=>post.channelLabel??channelInfo(post.channel)?.[post.body||post.location?1:6]??post.channel;
let facebookComposer=false;
let draggedTab='';
if(s.tab===jdTab)s.tab='Inbox';
let jdReturn='';
const save=()=>write(key,s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const btn=(label,action,value='',cls='')=>`<button class="${cls}" data-do="${action}" data-id="${esc(value)}">${label}</button>`;
const primary=(label,action,value)=>btn(label,action,value,'primary');
const paragraphs=rows=>rows.map(parts=>`<p>${parts.map(part=>typeof part==='string'?esc(part):part.break?'<br>':`<strong>${esc(part.bold)}</strong>`).join('')}</p>`).join('');
const personName=id=>CASE.people[id].name;
const row=(title,content)=>`<section class="card"><h2>${title}</h2>${content}</section>`;
const pill=(t)=>`<span class="pill">${esc(t)}</span>`;
const badge=(t)=>`<span class="icon">${t}</span>`;
const options=(list,sel)=>list.map(([id,label])=>`<option value="${esc(id)}"${String(id)===String(sel)?' selected':''}>${esc(label)}</option>`).join('');
const mailBatch=round=>(s.mailOrder?.[round+1]??[]).map(id=>CASE.emails.find(e=>e.id===id)).filter(Boolean);
const openEmails=()=>[...mailBatch(0),...mailBatch(1)].filter(e=>s.delivery?.mail[e.id]);
const moreReady=()=>Boolean(s.delivery?.more);
const screeningReady=()=>Boolean(s.delivery?.screening);
function inboxIds(rows=openEmails()){
  const newestFirst=[...rows].reverse();
  return [
    ...newestFirst.filter(e=>e.wave===2).map(e=>e.id),
    ...(moreReady()?['chat']:[]),
    ...newestFirst.filter(e=>e.wave===1).map(e=>e.id),
    'brief'
  ];
}
const unreadCount=()=>inboxIds().filter(id=>!s.readMail?.[id]).length;
const firstMailDelay=6000, nextMailDelay=1000, managerDelay=2000;
const inInbox=()=>!desk&&s.tab==='Inbox';
function markApplicationSeen(id){
  if(!inInbox()||s.delivery.more||s.delivery.applicationSeen)return;
  if(!openEmails().some(e=>e.id===id))return;
  s.delivery.applicationSeen=true;
  save();
}
function updateDelivery(now=Date.now()){
  const delivery=s.delivery??={
    starts:[],
    mail:Object.fromEntries(CASE.emails.filter(e=>e.wave<=(s.wave??0)).map(e=>[e.id,true])),
    more:(s.wave??0)>=1,
    screening:(s.wave??0)>=2
  };
  let changed=false;
  let newMail=0;
  if(inInbox()&&delivery.hintRound!=null){
    delete delivery.hintRound;
    changed=true;
  }
  s.posts.forEach((_,round)=>{
    if(round===0?delivery.more:delivery.screening)return;
    const start=delivery.starts[round]??=now;
    const batch=mailBatch(round);
    batch.forEach(({id},index)=>{
      if(!delivery.mail[id]&&now>=start+firstMailDelay+index*nextMailDelay){
        delivery.mail[id]=true;
        newMail++;
        if(index===0&&!inInbox())delivery.hintRound=round;
        changed=true;
      }
    });
    if(batch.length&&batch.every(({id})=>delivery.mail[id])){
      s.wave=Math.max(s.wave??0,round+1);
      if(round===0&&s.posts.length<2&&inInbox()&&delivery.applicationSeen){
        if(delivery.managerDue==null){
          delivery.managerDue=now+managerDelay;
          changed=true;
        }
        if(now>=delivery.managerDue){delivery.more=true;changed=true;newMail++;}
      }
      if(round===1){delivery.screening=true;changed=true;}
    }
  });
  playMailSound(newMail);
  return changed;
}

const candidateIds=()=>Object.keys(CASE.people);
const questionMails=()=>CASE.emails.filter(e=>e.reply);
const senderName=e=>e.cv?personName(e.cv):e.from;
const shortName=id=>personName(id).split(' ').slice(-2).join(' ');
const addedIds=()=>candidateIds().filter(id=>s.added?.[id]);
const decided=id=>Boolean(s.ats?.[id]?.decision);
const decisionLabel=id=>CASE.decisions.find(([d])=>d===s.ats?.[id]?.decision)?.[1]??'Chưa rà';
const proposals=()=>addedIds().filter(id=>s.ats[id]?.decision==='interview');
// Thư có CV xong khi đã thêm vào ATS; thư hỏi thông tin xong khi đã mở đọc (trả lời là không bắt buộc).
const mailHandled=e=>e.cv?Boolean(s.added?.[e.cv]):Boolean(s.readMail?.[e.id]);
const inboxDone=()=>CASE.emails.every(e=>s.delivery?.mail[e.id]&&mailHandled(e));
const screeningDone=()=>candidateIds().every(id=>s.added?.[id]&&decided(id));
const task=()=>s.submission?['Xem phản hồi','feedback']:!s.jdViewed?['Mở JD','jd']:!s.posts.length?['Đăng tin tuyển dụng','posting']:!inboxDone()?['Rà soát thư ứng viên','inbox']:!screeningDone()?['Sàng lọc CV trong ATS','ats']:['Xem bàn giao','short'];
let timer;
function toast(message,duration=3600){$('#toast').textContent=message;clearTimeout(timer);timer=setTimeout(()=>$('#toast').textContent='',duration);}
function closeChannelTab(){
  if(!s.channelTab)return;
  if(jdReturn===s.channelTab)jdReturn=postingTab;
  s.tabOrder=s.tabOrder?.filter(id=>id!==s.channelTab);
  s.channelTab='';
  facebookComposer=false;
}
function nav(tab){
  if(tab===postingTab)closeChannelTab();
  if(tab!==s.tab)facebookComposer=false;
  desk=false;
  s.tab=tab;
  if(tab==='Inbox')panel='email';
  if(tab==='ATS mini')panel='profiles';
}
function goDesk(){desk=true;facebookComposer=false;}
const vietnamClock=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
const officeResize=new ResizeObserver(([{target,contentRect}])=>{
  const ratio=contentRect.width/contentRect.height;
  if(!Number.isFinite(ratio)||ratio<=0)return;
  // Preserve the three hotspots when the window is narrower than the desk.
  const width=Math.max(1240,Math.min(2048,731*ratio));
  const height=Math.max(460,Math.min(731,2048/ratio));
  const y=Math.max(0,300-height/2);
  target.setAttribute('viewBox',`${(2048-width)/2} ${y} ${width} ${height}`);
});
setInterval(()=>{
  const clock=app.querySelector('.office-clock-time');
  if(clock)clock.textContent=vietnamClock.format(new Date());
},1000);
function render(){
  updateDelivery();
  if(!desk&&s.tab===postingTab&&!overlay&&!s.posts.length&&!s.postingGuideSeen)overlay='posting-guide';
  if(desk&&s.introSeen&&!s.readMail?.brief&&s.officeMailShownAt==null){
    s.officeMailShownAt=Date.now();
    playMailSound();
  }
  save();
  renderCaseMode();
  renderCaseStages();
  document.body.classList.toggle('laptop-mode',!desk);
  app.className=desk?'desk-shell':'work-shell';
  app.innerHTML=desk?deskView():workView();
  jdResize.disconnect();
  officeResize.disconnect();
  if(desk)officeResize.observe(app.querySelector('.office-art'));
  if(!desk&&s.tab==='Inbox')filterMail();
  if(!desk&&s.tab==='community'&&facebookComposer)app.querySelector('.fb-compose textarea')?.focus({preventScroll:true});
  if(!desk&&s.tab==='alumni'&&s.posts.some(post=>post.channel==='alumni')){
    const messages=app.querySelector('.referral-messages');
    messages.scrollTop=messages.scrollHeight;
  }
  renderModal();
  if(!desk&&s.tab===jdTab)renderJdPdf(app.querySelector('.jd-pages'));
}
function deskView(){
  return `<section class="office-scene" aria-label="Bàn làm việc tại NOVA Commerce">
    <svg class="office-art" viewBox="0 0 2048 731" preserveAspectRatio="none">
      <image href="office-pov.png" width="2048" height="731" preserveAspectRatio="none" aria-hidden="true"/>
      <g class="office-target" role="button" tabindex="0" data-do="workspace" aria-label="Laptop">
        <path d="M806 398V120Q806 101 824 101H1258Q1276 101 1276 121L1278 398 1331 489Q1338 505 1320 507H771Q753 507 757 492Z"/>
        <text class="office-label" x="1041" y="88">Laptop</text>
      </g>
      <g class="office-target" role="button" tabindex="0" data-do="desk-calendar" aria-label="Đồng hồ và hạn bàn giao">
        <path d="M443 323Q443 304 463 301H666Q684 301 684 319V383Q684 400 666 402H460Q442 402 442 384Z"/>
        <text class="office-clock-time" x="562" y="374">${vietnamClock.format(new Date())}</text>
        <text class="office-label" x="562" y="289">Đồng hồ</text>
      </g>
      <g class="office-target" role="button" tabindex="0" data-do="phone" aria-label="Điện thoại">
        <path d="M1424 387 1512 387Q1522 387 1528 395L1588 469Q1598 486 1581 491L1475 491Q1461 491 1455 480L1417 400Q1411 390 1424 387Z"/>
        <text class="office-label" x="1497" y="375">Điện thoại</text>
      </g>
      ${s.introSeen&&!s.readMail?.brief?`<foreignObject x="1287" y="139" width="326" height="118">
        <div xmlns="http://www.w3.org/1999/xhtml" class="office-mail-wrap" style="--office-mail-elapsed:${Math.max(0,Date.now()-s.officeMailShownAt)}ms">
          ${btn(`<span class="office-mail-icon">${uiIcon('mail')}</span><span class="office-mail-copy"><span>Chị Mai · Email mới</span><strong>${esc(CASE.briefTitle)}</strong></span>`,'email','brief','office-mail')}
        </div>
      </foreignObject>`:''}
    </svg>
  </section>`;
}
function workView(){
  const tools=[...laptopTabs,...channelTabs().map(([id,,,icon,label,address])=>[id,icon,address,label])];
  const channel=channelInfo(s.tab);
  const tabs=tabOrder().filter(id=>id!==jdTab||jdReturn).map(id=>tools.find(([label])=>label===id));
  const [, , subdomain]=tabs.find(([label])=>label===s.tab)??tabs[0];
  return `<header class="browser">
    <div class="browser-top"><nav class="browser-tabs" aria-label="Công cụ làm việc">${tabs.map(([t,i,,label=t])=>`<div class="browser-tab" data-tab="${esc(t)}" data-active="${s.tab===t}" draggable="true"><button data-do="tab" data-id="${esc(t)}" aria-keyshortcuts="Alt+ArrowLeft Alt+ArrowRight" aria-pressed="${s.tab===t}">${uiIcon(i)} <span>${esc(label)}</span>${t==='Inbox'?'<span class="inbox-tab-status" aria-live="polite">'+unreadBadge()+'</span>':''}</button>${t===jdTab?btn('<span aria-hidden="true">×</span><span class="sr-only">Đóng tab PDF JD</span>','close-jd','','close-jd'):channelInfo(t)?btn('<span aria-hidden="true">×</span><span class="sr-only">Đóng tab '+esc(label)+'</span>','close-channel',t,'close-jd'):''}${t==='Inbox'?'<span class="inbox-hint-slot">'+inboxHint()+'</span>':''}</div>`).join('')}</nav>${btn('Về bàn làm việc','desk','','desk-back')}</div>
    <div class="browser-address">${btn(uiIcon('back')+'<span class="sr-only">Về bàn làm việc</span>','desk')}${s.tab==='Inbox'?btn(uiIcon('refresh')+'<span class="sr-only">Cập nhật Inbox</span>','refresh'):''}
    <div class="address">${uiIcon('lock')} ${channel?esc(subdomain):subdomain+'.novacommerce.example'}${s.tab===jdTab?'/'+esc(jdTab):''}</div></div>
  </header>
  <div class="laptop-content ${s.tab==='Inbox'?'mail-app':s.tab===jdTab?'jd-app':channel?'channel-app':'tool-app'}">${s.tab===jdTab?jdPdfView():s.tab==='Inbox'?inbox():s.tab===postingTab?posting():channel?channelView(channel):s.tab==='Calendar'?calendar():s.tab==='Bàn giao'?handoffView():ats()}</div>
  <footer class="laptop-task">${workTask()}</footer>`;
}
function unreadBadge(){
  const unread=unreadCount();
  return unread?`<span class="inbox-tab-unread" aria-label="${unread} thư chưa đọc">${unread}</span>`:'';
}
function inboxHint(){
  return !inInbox()&&s.delivery?.hintRound!=null
    ?'<span class="inbox-hint" role="status"><span aria-hidden="true">↑</span> Kiểm tra mail ứng viên</span>'
    :'';
}
function workTask(){
  return btn(`${uiIcon('chat')} Hỏi trợ lý`,'assistant','','assistant-button')+nextTask();
}
// Gợi ý theo việc đang làm, chi tiết hơn ba chặng của thanh tiến độ.
function assistKey(){
  if(s.submission)return 'feedback';
  if(!s.jdViewed)return 'jd';
  if(!s.delivery?.screeningStarted)return 'posting';
  // Trong chặng sàng lọc, gợi ý theo tab đang mở; tab khác thì theo tiến độ.
  const byTab={'Inbox':'inbox','ATS mini':'ats','Bàn giao':'short'}[desk?'':s.tab];
  if(byTab)return byTab;
  if(!inboxDone())return 'inbox';
  return screeningDone()?'short':'ats';
}
function assistantView(){
  const tip=CASE.assistant[assistKey()];
  const guided=s.mode!=='self';
  return `<p class="eyebrow">Chế độ ${esc(MODES[s.mode]?.label??'Làm quen')} · ${esc(tip.title)}</p>
    ${guided
      ?`<ul class="assistant-tips">${tip.guided.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${tip.sample?`<details class="assistant-sample"><summary>Xem phương án mẫu</summary><p>${esc(tip.sample)}</p></details>`:''}`
      :`<p>Trong chế độ Thử sức, trợ lý không đưa đáp án. Hãy tự trả lời các câu hỏi sau trước khi làm tiếp:</p><ul class="assistant-tips">${tip.self.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`}`;
}
// Trợ lý NOVA (/nova/nova-assistant.js) đọc ngữ cảnh và gợi ý soạn sẵn của việc đang làm qua hai hàm này.
window.novaContext=()=>({page:'workspace',mode:s.mode||'',task:assistKey(),submitted:!!s.submission});
window.novaTips=()=>{
  const tip=CASE.assistant[assistKey()];
  if(!tip)return null;
  return s.mode==='self'
    ?{label:`Câu hỏi định hướng · ${tip.title}`,items:tip.self}
    :{label:`Gợi ý · ${tip.title}`,items:tip.guided};
};
function nextTask(){
  if(s.delivery?.screeningStarted&&!s.submission){
    const total=CASE.emails.length, handled=CASE.emails.filter(mailHandled).length;
    if(!inboxDone())return `<span><i></i> Rà soát thư ứng viên ${handled}/${total}</span>${!desk&&s.tab==='Inbox'?'':btn('Mở Inbox →','inbox')}`;
    const n=candidateIds().length, done=candidateIds().filter(decided).length;
    if(!screeningDone())return `<span><i></i> Sàng lọc CV ${done}/${n}</span>${!desk&&s.tab==='ATS mini'?'':primary('Mở ATS mini →','ats')}`;
    return `<span><i></i> Đã rà xong ${n} hồ sơ</span>${!desk&&s.tab==='Bàn giao'?'':primary('Xem bàn giao →','short')}`;
  }
  if(screeningReady()&&!s.delivery.screeningStarted){
    return `<span class="screening-hint">${esc(CASE.screeningHint)}</span>${primary('Bắt đầu sàng lọc hồ sơ','start-screening')}`;
  }
  if(!s.submission&&s.posts.length&&!screeningReady()){
    if(s.posts.length===1&&moreReady()){
      return `<span><i></i> Việc tiếp theo</span>${s.readMail?.chat?btn('Đăng thêm một kênh','posting'):btn('Đọc tin nhắn của chị Mai','email','chat')}`;
    }
    return '<span><i></i> Đang chờ hồ sơ ứng tuyển…</span>'+(s.posts.length===1?btn('Đăng thêm kênh','more-channel'):'');
  }
  const [next,action]=task();
  return `<span><i></i> Việc tiếp theo</span>${btn(`${esc(next)} →`,action)}`;
}
function refreshDeliveryUI(){
  const hadMore=moreReady(), hadScreening=screeningReady();
  const previousUnread=unreadCount();
  const previousHint=s.delivery?.hintRound;
  if(!updateDelivery())return;
  save();
  if(desk)return;
  if(previousHint!==s.delivery.hintRound)app.querySelector('.inbox-hint-slot').innerHTML=inboxHint();
  const badge=app.querySelector('.inbox-tab-status');
  if(badge){
    badge.innerHTML=unreadBadge();
    if(s.tab!=='Inbox'&&unreadCount()>previousUnread&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      badge.closest('.browser-tab').animate(
        [{backgroundColor:'transparent'},{backgroundColor:'#c7e4ff'},{backgroundColor:'#eaf5ff'},{backgroundColor:'#c7e4ff'},{backgroundColor:'transparent'}],
        {duration:640,easing:'ease-in-out'}
      );
      badge.firstElementChild.animate(
        [{transform:'scale(1)'},{transform:'scale(1.23)'},{transform:'scale(1)'}],
        {duration:360,easing:'ease-out'}
      );
    }
  }
  if(hadMore!==moreReady()||hadScreening!==screeningReady()){
    app.querySelector('.laptop-task').innerHTML=workTask();
    if(s.tab===postingTab)app.querySelector('.laptop-content').innerHTML=posting();
  }
  if(s.tab==='Inbox'){
    const grid=app.querySelector('.mail-grid');
    const previousList=grid.querySelector('.mail-items');
    const scroll=previousList?.scrollTop??0;
    const focused=grid.contains(document.activeElement)?document.activeElement.dataset:{};
    const template=document.createElement('template');
    template.innerHTML=inbox();
    const nextGrid=template.content.querySelector('.mail-grid');
    if(selectedEmail){
      grid.querySelector('.mail-sidebar').replaceWith(nextGrid.querySelector('.mail-sidebar'));
      grid.querySelector('.mail-pages').replaceWith(nextGrid.querySelector('.mail-pages'));
    }else{
      grid.replaceWith(nextGrid);
      nextGrid.querySelector('.mail-items').scrollTop=scroll;
      filterMail();
    }
    if(focused.do){
      const button=[...app.querySelectorAll('.mail-grid button[data-do]')].find(el=>el.dataset.do===focused.do&&el.dataset.id===focused.id);
      button?.focus({preventScroll:true});
    }
  }
}
function tabOrder(){
  const ids=[...laptopTabs,...channelTabs()].map(([id])=>id);
  const order=[...new Set([...(s.tabOrder??[]).filter(id=>ids.includes(id)),...ids])];
  if(s.channelTab&&!s.tabOrder?.includes(s.channelTab)){
    order.splice(order.indexOf(s.channelTab),1);
    order.splice(order.indexOf(postingTab)+1,0,s.channelTab);
  }
  return order;
}
function moveTab(from,to,after){
  if(!from||from===to)return;
  const order=tabOrder().filter(id=>id!==from);
  order.splice(order.indexOf(to)+Number(after),0,from);
  s.tabOrder=order;
  save();
  const tabs=app.querySelector('.browser-tabs');
  const elements=new Map([...tabs.children].map(el=>[el.dataset.tab,el]));
  for(const id of order)if(elements.has(id))tabs.append(elements.get(id));
}
app.addEventListener('dragstart',ev=>{
  const tab=ev.target.closest('.browser-tab');
  if(!tab)return;
  draggedTab=tab.dataset.tab;
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData('text/plain',draggedTab);
});
app.addEventListener('dragover',ev=>{
  if(draggedTab&&ev.target.closest('.browser-tab')){
    ev.preventDefault();
    ev.dataTransfer.dropEffect='move';
  }
});
app.addEventListener('drop',ev=>{
  const target=ev.target.closest('.browser-tab');
  if(!draggedTab||!target)return;
  ev.preventDefault();
  const bounds=target.getBoundingClientRect();
  moveTab(draggedTab,target.dataset.tab,ev.clientX>bounds.left+bounds.width/2);
  draggedTab='';
});
app.addEventListener('dragend',()=>{draggedTab='';});
app.addEventListener('pointerover',ev=>{
  const row=ev.target.closest('.mail-item');
  if(row&&!row.contains(ev.relatedTarget))markApplicationSeen(row.dataset.id);
});
app.addEventListener('keydown',ev=>{
  if(ev.key==='Escape'&&s.tab==='community'&&facebookComposer&&!modal.open){
    ev.preventDefault();
    closeFacebookComposer();
    return;
  }
  const object=ev.target.closest('.office-target');
  if(object&&['Enter',' '].includes(ev.key)){
    ev.preventDefault();
    object.dispatchEvent(new MouseEvent('click',{bubbles:true}));
    return;
  }
  const tab=ev.target.closest('button[data-do="tab"]')?.parentElement;
  if(!tab||!ev.altKey||!['ArrowLeft','ArrowRight'].includes(ev.key))return;
  ev.preventDefault();
  const right=ev.key==='ArrowRight';
  const neighbor=right?tab.nextElementSibling:tab.previousElementSibling;
  if(!neighbor)return;
  moveTab(tab.dataset.tab,neighbor.dataset.tab,right);
  ev.target.focus();
});
function jdPdfView(){
  return `<section class="jd-viewer" aria-label="Tài liệu JD">
    <header><strong>${esc(CASE.jdFile)}</strong><a href="${esc(CASE.jdFile)}" download>Tải PDF</a></header>
    <div class="jd-pages" aria-busy="true"><p role="status">Đang tải PDF…</p></div>
  </section>`;
}
let jdDocument;
const jdResize=new ResizeObserver(entries=>{
  for(const {target,contentRect} of entries){
    target.style.setProperty('--total-scale-factor',contentRect.width/Number(target.dataset.pdfWidth));
  }
});
async function loadJdDocument(){
  const pdf = await import('./pdfjs/pdf.min.mjs');
  pdf.GlobalWorkerOptions.workerSrc = new URL('pdfjs/pdf.worker.min.mjs',document.baseURI).href;
  const pdfDocument=await pdf.getDocument({url:new URL(CASE.jdFile,document.baseURI)}).promise;
  return {document:pdfDocument,TextLayer:pdf.TextLayer};
}
async function renderJdPdf(container){
  try{
    jdDocument??=loadJdDocument();
    const {document:pdf,TextLayer}=await jdDocument;
    if(!container.isConnected)return;
    container.replaceChildren();
    for(let number=1;number<=pdf.numPages;number++){
      const page=await pdf.getPage(number);
      if(!container.isConnected)return;
      const viewport=page.getViewport({scale:2});
        const sheet=document.createElement('div');
        sheet.className='jd-sheet';
        sheet.dataset.pdfWidth=viewport.rawDims.pageWidth;
        sheet.setAttribute('role','group');
        sheet.setAttribute('aria-label',`Trang ${number} trên ${pdf.numPages}`);
      const canvas=document.createElement('canvas');
      canvas.width=Math.ceil(viewport.width);
      canvas.height=Math.ceil(viewport.height);
        canvas.setAttribute('aria-hidden','true');
        const layer=document.createElement('div');
        layer.className='jd-text-layer';
        const textLayer=new TextLayer({textContentSource:page.streamTextContent(),container:layer,viewport});
        await Promise.all([page.render({canvas,viewport}).promise,textLayer.render()]);
        if(!container.isConnected)return;
        sheet.append(canvas,layer);
        container.append(sheet);
        jdResize.observe(sheet);
    }
  }catch{
    jdDocument=undefined;
    container.textContent='Không hiển thị được PDF. Bạn có thể dùng nút Tải PDF.';
  }finally{
    container.setAttribute('aria-busy','false');
  }
}
function uiIcon(name){
  const paths={
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 5a3 3 0 0 1 0 6m2 3a4 4 0 0 1 3 4v2"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    laptop:'<rect x="5" y="4" width="14" height="11" rx="1"/><path d="m5 15-3 4h20l-3-4"/>',
    user:'<circle cx="12" cy="7" r="3"/><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2z"/>',
    layers:'<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
    back:'<path d="m11 5-7 7 7 7m-7-7h16"/>',
    refresh:'<path d="M20 12a8 8 0 1 1-2-5.3L21 10m0-6v6h-6"/>',
    lock:'<rect x="6" y="10" width="12" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
    tray:'<path d="M3 13l3-7h12l3 7v6H3v-6Zm0 0h5l2 3h4l2-3h5"/>',
    chat:'<path d="M21 11a8 8 0 0 1-8 8H4l2-4a8 8 0 1 1 15-4Z"/>',
    file:'<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10Zm0 0v7h7"/>'
  };
  return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}
function inbox(){
  const rows=openEmails();
  const e=rows.find(m=>m.id===selectedEmail);
  const title=e?e.subject:selectedEmail==='chat'?'Mở thêm nguồn tuyển dụng':CASE.briefTitle;
  const from=e?senderName(e):CASE.manager;
  const content=e?e.body:selectedEmail==='chat'?CASE.more:CASE.brief;
  const mailIds=inboxIds(rows);
  const index=mailIds.indexOf(selectedEmail);
  const unread=unreadCount();
  const doneBanner=s.delivery?.screeningStarted&&inboxDone()&&!screeningDone()
    ?`<div class="callout inbox-done" role="status"><span>Bạn đã rà soát xong ${CASE.emails.length} thư ứng viên. Tiếp theo, sàng lọc ${candidateIds().length} CV trong ATS.</span>${primary('Chuyển sang ATS mini →','ats')}</div>`:'';
  return `<div class="mail-head"><div class="mail-brand"><strong>NOVA</strong> Commerce</div>
  <label class="mail-search">${uiIcon('search')}<input type="search" aria-label="Tìm kiếm trong thư" placeholder="Tìm kiếm trong thư" data-bind="mail-search" value="${esc(mailQuery)}"></label>
  ${btn('<span class="avatar">TA</span> <span>TA Intern</span>','portfolio','','mail-profile')}</div>
  <div class="mail-grid"><aside class="mail-sidebar" aria-label="Hộp thư">
  ${btn(uiIcon('file')+' Soạn tin đăng','posting','','mail-compose')}
  ${btn(uiIcon('tray')+` Hộp thư đến ${unread?`<span class="mail-count" aria-label="${unread} chưa đọc">${unread}</span>`:''}`,'mail-list','','folder '+(selectedEmail!=='chat'?'current':''))}
  ${moreReady()?btn(uiIcon('chat')+' Chat nội bộ','email','chat','folder '+(selectedEmail==='chat'?'current':'')):''}
  ${btn(uiIcon('file')+' Bản nháp tin đăng','posting','','folder')}
  </aside>${!selectedEmail?`<section class="mail-index" aria-label="Danh sách thư">
  <div class="mail-toolbar">${btn(uiIcon('refresh')+'<span class="sr-only">Cập nhật Inbox</span>','refresh')}<span>${mailIds.length} thư</span></div>
  ${doneBanner}
  <div class="mail-category">${uiIcon('tray')} Chính ${unread?`<span class="mail-unread-count">${unread} cuộc trò chuyện mới</span>`:''}</div>
  <div class="mail-items">
  ${mailIds.map(id=>{
    if(id==='brief')return mailButton(id,'Chị Mai',CASE.briefTitle,CASE.brief,'10:24');
    if(id==='chat')return mailButton(id,'Chị Mai','Mở thêm nguồn tuyển dụng',CASE.more,'Nội bộ');
    const m=rows.find(row=>row.id===id);
    return mailButton(id,senderName(m),m.subject,m.body,mailState(m),m.cv?'has-cv':'');
  }).join('')}
  <p class="empty mail-empty" hidden>Không tìm thấy thư.</p></div></section>`:`
  <section class="mail-reader" aria-label="Nội dung thư">
  <div class="mail-toolbar reader-toolbar">${btn(uiIcon('back')+'<span class="sr-only">Quay lại hộp thư đến</span>','mail-list')}<div class="mail-pages"><span>${index+1} / ${mailIds.length}</span>
  <button data-do="email" data-id="${mailIds[index-1]??''}" aria-label="Thư trước" ${index<=0?'disabled':''}>‹</button>
  <button data-do="email" data-id="${mailIds[index+1]??''}" aria-label="Thư tiếp theo" ${index>=mailIds.length-1?'disabled':''}>›</button></div></div>
  <article class="mail-letter"><h2>${esc(title)}</h2><div class="sender"><div class="avatar ${e?'':'manager-avatar'}">${e?esc(from[0]):uiIcon('people')}</div><div><strong>${esc(from)}</strong><small>đến tôi · TA Intern</small></div>${selectedEmail==='brief'?'<small class="mail-time">10:24 hôm nay</small>':''}</div>
  ${selectedEmail==='brief'?paragraphs(CASE.briefEmail):`<p>${esc(content)}</p>`}
  ${!e?(selectedEmail==='chat'?(s.posts.length<2?primary('Đăng thêm một kênh','posting'):''):`<div class="jd-actions">${btn(`<span class="pdf-icon">PDF</span><span><strong>${esc(CASE.jdFile)}</strong><small>Mở PDF</small></span><span class="file-open" aria-hidden="true">↗</span>`,'jd','','mail-attachment')}</div>`):e.cv?`
  <div class="jd-actions">${btn(`<span class="pdf-icon">PDF</span><span><strong>${esc(CASE.people[e.cv].file)}</strong><small>Xem CV</small></span><span class="file-open" aria-hidden="true">↗</span>`,'cv',e.id,'mail-attachment')}</div>
  <div class="actions">${s.added[e.cv]?`<span class="pill">Đã thêm vào ATS</span>${btn('Mở hồ sơ trong ATS','open-profile',e.cv)}`:primary('Thêm vào ATS','add-ats',e.id)}</div>`:`
  <p class="muted mail-note">Thư này không kèm CV. Bấm Trả lời để xem câu trả lời soạn sẵn. Bước này không bắt buộc.</p>
  ${s.replied[e.id]?`<div class="mail-reply"><strong>Bạn · TA Intern</strong> <small>Câu trả lời soạn sẵn</small><p>${esc(e.reply)}</p></div>`:`<div class="actions">${primary('Trả lời','reply',e.id)}</div>`}`}
  ${doneBanner}</article></section>`}</div>`;
}
function mailState(e){
  if(e.cv)return s.added[e.cv]?'Đã thêm ATS':'Có CV';
  return s.replied[e.id]?'Đã trả lời':'Hỏi thông tin';
}
function mailButton(id,from,title,preview,state,extra=''){
  const unread=!s.readMail?.[id];
  const fromMai=id==='brief'||id==='chat';
  const sender=fromMai?`<span class="avatar manager-avatar" aria-hidden="true">M</span><span class="mail-from-name">${esc(from)}</span>`:esc(from);
  return `<button class="mail-item${unread?' unread':''}${fromMai?' from-mai':''}${extra?' '+extra:''}" data-do="email" data-id="${id}">${unread?'<span class="sr-only">Chưa đọc. </span>':''}<span class="mail-from">${sender}</span><span class="mail-summary"><b>${esc(title)}</b><span> — ${esc(preview)}</span></span><small>${esc(state)}</small></button>`;
}
function filterMail(){
  const empty=app.querySelector('.mail-empty');
  if(!empty)return;
  const query=mailQuery.trim().toLocaleLowerCase('vi');
  const items=[...app.querySelectorAll('.mail-item')];
  for(const item of items)item.hidden=!item.textContent.toLocaleLowerCase('vi').includes(query);
  empty.hidden=items.some(item=>!item.hidden);
}
// Đăng kênh thứ hai bất cứ lúc nào, không phải chờ tin nhắn của chị Mai (feedback 13/11).
let choosingMore=false;
function posting(){
  const canMore=s.posts.length===1;
  const canChoose=s.posts.length===0||canMore&&(choosingMore||moreReady());
  return `<div class="recruiting-home">
    <header class="recruiting-head"><h1>Đăng tin tuyển dụng</h1>${btn('Mở JD','jd')}</header>
    ${s.posts.length?`<section class="card published-round recruiting-history"><div class="history-head"><h2>Tin đã đăng</h2>${canMore&&!canChoose?primary('+ Đăng thêm kênh','more-channel'):''}</div><div class="actions">${[...s.posts].reverse().map(post=>btn(esc(postedName(post)),'channel',post.channel)).join('')}</div></section>`:''}
    ${canChoose?`<h2>${s.posts.length?'Chọn thêm một kênh':'Chọn kênh đăng'}</h2><div class="recruiting-channels">${CASE.channels.filter(([id])=>channelAvailable(id)).map(([id,name,desc,icon])=>`<button class="recruiting-channel ${id}" data-do="channel" data-id="${id}"><span class="recruiting-icon">${id==='community'?'f':uiIcon(icon)}</span><strong>${esc(name)}</strong><small>${esc(desc)}</small><span class="recruiting-open">Mở kênh →</span></button>`).join('')}</div>`:''}
  </div>`;
}
function postContent(post){
  return post.body?`<p class="posted-text">${esc(post.body)}</p>`:
    `<dl class="published-fields">${(post.channelLabel||post.location?CASE.jobHubFields:CASE.fields).filter(([id])=>post[id]).map(([id,label])=>`<div><dt>${esc(label)}</dt><dd>${esc(post[id])}</dd></div>`).join('')}</dl>`;
}
function channelView([id]){
  const post=s.posts.find(entry=>entry.channel===id);
  if(id==='community')return facebookGroup(post);
  if(id==='career'&&post){
    const jobs=[...s.posts].reverse().filter(entry=>entry.channel==='career');
    return `<div class="jobhub"><header><strong>Job<span>Hub</span></strong><span>Dành cho nhà tuyển dụng</span></header>
      <section class="card jobhub-list"><h1>Tin tuyển dụng của NOVA Commerce</h1>
        ${jobs.map(job=>`<article class="jobhub-listing"><h2>${esc(job.title)}</h2>
          <dl class="published-fields">${[['Địa điểm',job.location],['Ca làm',job.schedule],['Mức lương',job.salary??job.benefits]].filter(([,value])=>value).map(([label,value])=>`<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>
          <details><summary>Xem chi tiết</summary>${postContent(job)}</details>
        </article>`).join('')}
      </section></div>`;
  }
  if(!post&&!channelAvailable(id))return primary('Về trang đăng tuyển','posting');
  if(id==='alumni')return referralChat(post);
  const draft=channelDraft(id);
  if(id==='career'){
    const fields=CASE.jobHubFields.map(([field,label])=>{
      const attrs=`data-bind="channel-draft" name="${field}" required`;
      return `<label class="${['duties','requirements'].includes(field)?'jobhub-wide':''}">${esc(label)}${['duties','requirements'].includes(field)?`<textarea ${attrs} rows="2">${esc(draft[field])}</textarea>`:`<input ${attrs} value="${esc(draft[field])}">`}</label>`;
    }).join('');
    return `<div class="jobhub"><header><strong>Job<span>Hub</span></strong><span>Dành cho nhà tuyển dụng</span></header><section class="card"><h1>Tạo tin tuyển dụng</h1><p class="muted">NOVA Commerce</p><form class="jobhub-form" data-form="post-channel">${fields}<div class="jobhub-wide"><button class="primary">Đăng tin</button></div></form></section></div>`;
  }
}
function referralChat(post){
  const draft=post?null:channelDraft('alumni');
  return `<section class="referral-chat" aria-label="Chat nội bộ">
    <aside class="referral-sidebar"><div class="referral-brand"><span class="avatar">N</span><strong>NOVA Commerce</strong></div><small>Kênh công ty</small><div class="referral-active">${esc(CASE.referralChannel)}</div></aside>
    <main class="referral-thread"><header><span class="avatar">${uiIcon('chat')}</span><div><h1>${esc(CASE.referralChannel)}</h1><small>Kênh nội bộ · Đội Tuyển dụng</small></div></header>
    <div class="referral-messages">${CASE.referralMessages.map(([author,time,message])=>`<article><span class="avatar">${esc(author[0])}</span><div><strong>${esc(author)}</strong> <small>${time}</small><p>${esc(message)}</p></div></article>`).join('')}
      ${post?`<article class="referral-own"><span class="avatar" aria-hidden="true">TA</span><div><strong>Bạn · TA Intern</strong> <small>Vừa xong</small><p class="posted-text">${esc(post.body??post.duties)}</p></div></article>`:''}
    </div>
    ${draft?`<form data-form="post-channel"><textarea aria-label="Tin nhắn giới thiệu ứng viên" placeholder="Viết lời nhờ giới thiệu ứng viên…" data-bind="channel-draft" name="body" required>${esc(draft.body)}</textarea><button class="primary">Gửi vào kênh</button></form>`:''}</main>
    <aside class="referral-details"><h2>Thông tin kênh</h2><p>Khi nhờ đồng nghiệp giới thiệu, hãy nêu vị trí, ca làm, điều kiện chính và cách gửi hồ sơ về đội Tuyển dụng.</p></aside>
  </section>`;
}
function closeFacebookComposer(){
  facebookComposer=false;
  render();
  app.querySelector('[data-do="facebook-compose"]')?.focus({preventScroll:true});
}
function facebookGroup(post){
    const canCompose=channelAvailable('community');
    const draft=canCompose?channelDraft('community'):{};
    return `<section class="fb-group" aria-label="Nhóm việc làm Facebook">
      <div class="fb-background" ${facebookComposer?'inert':''}>
        <div class="fb-toolbar"><span class="fb-logo" aria-label="Facebook">f</span><span>Nhóm</span></div>
        <div class="fb-group-header"><div class="fb-cover"><span>HÀ NỘI</span><strong>Việc làm tại Hà Nội</strong></div>
          <div class="fb-group-heading"><h1>${esc(CASE.recruitingGroup)}</h1><small>◉ Nhóm công khai</small></div><div class="fb-discussion">Thảo luận</div></div>
        <div class="fb-feed"><div class="fb-feed-posts">
          ${post?`<article class="card fb-post"><header class="fb-author"><span class="avatar" aria-hidden="true">TA</span><div><strong>TA Intern · NOVA Commerce</strong><small>Vừa xong</small></div></header>${postContent(post)}</article>`:''}
          ${canCompose?`<section class="card fb-start"><span class="avatar" aria-hidden="true">TA</span>${btn('Bạn viết gì đi…','facebook-compose')}</section>`:''}
          <article class="card fb-post"><header class="fb-author"><span class="avatar" aria-hidden="true">QT</span><div><strong>Quản trị viên nhóm</strong><small>Bài viết ghim</small></div></header><p>Khi đăng tin tuyển dụng, hãy ghi rõ vị trí, địa điểm làm việc và cách ứng tuyển.</p></article>
        </div><aside class="card"><h2>Giới thiệu</h2><p>Cộng đồng chia sẻ cơ hội việc làm tại Hà Nội.</p></aside></div>
      </div>
      ${facebookComposer?`<div class="fb-overlay"><section class="fb-compose" role="dialog" aria-labelledby="fb-compose-title"><header><h2 id="fb-compose-title">Tạo bài viết</h2>${btn('×<span class="sr-only">Đóng trình soạn bài</span>','facebook-close')}</header>
        <form data-form="post-channel"><div class="fb-author"><span class="avatar">TA</span><div><strong>TA Intern · NOVA Commerce</strong><small>◉ Nhóm công khai</small></div></div>
        <textarea aria-label="Nội dung bài viết" placeholder="Tạo bài viết công khai..." data-bind="channel-draft" name="body" required>${esc(draft.body)}</textarea><button class="primary">Đăng</button></form>
      </section></div>`:''}
    </section>`;
}
function calendar(){return `<div class="section-head"><div><h1>Calendar</h1><p>Khung giờ phỏng vấn dự kiến.</p></div></div><div class="calendar-grid">${CASE.calendar.map(([day,time])=>row(esc(day),`<div class="slot">${esc(time)}</div>`)).join('')}</div>`;}
function cvPaper(id){
  const p=CASE.people[id];
  const initials=p.name.split(' ').slice(-2).map(word=>word[0]).join('');
  return `<article class="cv-paper" aria-label="CV của ${esc(p.name)}">
    <header class="cv-top"><div><h3>${esc(p.name)}</h3><p class="cv-headline">${esc(p.headline)}</p><p class="cv-contact">${esc(p.contact)}</p></div><span class="cv-photo" aria-hidden="true">${esc(initials)}</span></header>
    <section><h4>Tóm tắt</h4><p>${esc(p.summary)}</p></section>
    <section><h4>Kinh nghiệm làm việc</h4>${p.experience.map(([role,time,items])=>`<div class="cv-job"><div class="cv-job-head"><strong>${esc(role)}</strong><span>${esc(time)}</span></div><ul>${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></div>`).join('')}</section>
    <section><h4>Học vấn</h4><p>${esc(p.education)}</p></section>
    <section><h4>Kỹ năng</h4><p>${esc(p.skills)}</p></section>
    <section><h4>Thời gian làm việc</h4><p>${esc(p.availability)}</p></section>
  </article>`;
}
function cvViewer(id){
  return `<div class="cv-viewer"><div class="cv-toolbar">${uiIcon('file')}<span class="cv-file">${esc(CASE.people[id].file)}</span><span class="cv-pages">1 / 1</span>
    <span class="cv-zoom">${btn('−<span class="sr-only">Thu nhỏ</span>','cv-zoom','-1')}<span>${Math.round(cvZoom*100)}%</span>${btn('+<span class="sr-only">Phóng to</span>','cv-zoom','1')}</span></div>
    <div class="cv-stage"><div style="--cv-zoom:${cvZoom}">${cvPaper(id)}</div></div></div>`;
}
// Bản nháp quyết định của từng hồ sơ; chỉ tính là đã rà khi bấm Lưu quyết định.
function atsDraft(id){return (s.atsDraft??={})[id]??={decision:s.ats[id]?.decision??'',reason:s.ats[id]?.reason??''};}
function ats(){
  const ids=addedIds();
  if(!ids.includes(person))person=ids.find(id=>!decided(id))??ids[0]??'';
  const head=`<div class="section-head"><div><h1>ATS mini</h1><p>Sàng lọc hồ sơ · ${esc(CASE.title)}</p></div>${primary(`Xem bàn giao · ${proposals().length}/3 →`,'short')}</div>`;
  if(!ids.length)return head+`<section class="card ats-empty"><p class="empty">Chưa có hồ sơ nào. Mở Inbox và bấm Thêm vào ATS ở các thư có CV.</p>${btn('Mở Inbox','inbox')}</section>`;
  const draft=atsDraft(person);
  const choice=CASE.decisions.find(([d])=>d===draft.decision);
  const missing=candidateIds().length-ids.length;
  const saved=s.ats[person];
  return head+`<div class="ats-board">
    <aside class="card ats-list"><h2>Danh sách ứng viên</h2>${ids.map(id=>btn(`<strong>${esc(personName(id))}</strong><small class="decision-${esc(s.ats[id]?.decision??'none')}">${esc(decisionLabel(id))}</small>`,'person',id,id===person?'selected':'')).join('')}
      ${missing?`<p class="muted ats-missing">Còn ${missing} CV trong Inbox chưa thêm vào ATS. ${btn('Mở Inbox','inbox','','link-button')}</p>`:''}</aside>
    <section class="card ats-cv"><h2>CV ứng viên</h2>${cvViewer(person)}</section>
    <section class="card ats-decision"><div class="ats-decision-head"><h2>Chốt hồ sơ</h2>${btn(uiIcon('file')+' Xem JD','jd','','ghost-button')}</div>
      <form data-form="decision" novalidate>
        <fieldset><legend>Quyết định sàng lọc</legend>${CASE.decisions.map(([id,label])=>`<label class="radio-row"><input type="radio" name="decision" value="${id}" data-bind="ats-decision"${draft.decision===id?' checked':''}> <span>${esc(label)}</span></label>`).join('')}</fieldset>
        <label class="ats-reason"><span><span class="reason-label">${esc(choice?.[2]??'Lý do')}</span> <span class="required" aria-hidden="true">*</span></span>
          <textarea name="reason" rows="5" data-bind="ats-reason" placeholder="Nêu dữ kiện trong CV và yêu cầu JD liên quan.">${esc(draft.reason)}</textarea></label>
        <p class="field-error" role="alert" hidden></p>
        <button class="primary">Lưu quyết định</button>
        ${saved?`<p class="muted saved-note">Đã lưu: ${esc(decisionLabel(person))}. Sửa rồi bấm Lưu quyết định để cập nhật.</p>`:''}
      </form></section></div>`;
}
function handoffView(){
  const ids=proposals();
  const reviewed=addedIds().filter(id=>decided(id)&&s.ats[id].decision!=='interview');
  const total=candidateIds().length, done=candidateIds().filter(id=>s.added[id]&&decided(id)).length;
  const editing=s.submission?versionOf(s.submission,allSubmissions().length-1):0;
  return `<div class="handoff-screen">
    <div class="section-head"><div><h1>Bàn giao đề xuất phỏng vấn</h1></div><div class="handoff-nav">${btn('Mở Inbox','tab','Inbox')}${btn('Về ATS','ats')}</div></div>
    ${editing?`<div class="callout">Bạn đang sửa sau phiên bản ${editing}. Bấm Gửi đề xuất cho chị Mai để nộp phiên bản ${editing+1}; bản cũ vẫn được giữ để đối chiếu. ${btn('Xem phản hồi','feedback')}</div>`:''}
    ${done<total?`<div class="warning">Bạn mới rà ${done}/${total} hồ sơ. Rà hết các CV trong ATS trước khi gửi đề xuất.</div>`:''}
    <form class="card handoff-card" data-form="handoff" novalidate>
      <dl class="handoff-meta"><div><dt>Người nhận</dt><dd>${esc(CASE.manager)}</dd></div><div><dt>Tiêu đề</dt><dd>${esc(CASE.handoff.subject)}</dd></div></dl>
      <div class="handoff-list-head"><h2>Danh sách đề xuất</h2><span class="pill">${ids.length} ứng viên</span></div>
      ${ids.length?`<div class="handoff-table-wrap"><table class="handoff-table"><thead><tr><th scope="col">Ứng viên</th><th scope="col">Căn cứ từ ATS</th><th scope="col"><span class="sr-only">Sửa</span></th></tr></thead>
        <tbody>${ids.map(id=>`<tr><th scope="row">${esc(personName(id))}</th><td>${esc(s.ats[id].reason)}</td><td>${btn('Sửa trong ATS','edit-in-ats',id,'link-button')}</td></tr>`).join('')}</tbody></table></div>`
        :`<p class="empty">Chưa có ứng viên nào được chọn Đề xuất phỏng vấn trong ATS. ${btn('Về ATS','ats','','link-button')}</p>`}
      <details class="handoff-reviewed"><summary><strong>Hồ sơ đã rà</strong> <span class="muted">${esc(reviewed.map(id=>`${shortName(id)} · ${decisionLabel(id)}`).join(', ')||'Chưa có')}</span></summary>
        ${reviewed.length?`<ul>${reviewed.map(id=>`<li><strong>${esc(personName(id))} · ${esc(decisionLabel(id))}</strong> — ${esc(s.ats[id].reason)} ${btn('Sửa trong ATS','edit-in-ats',id,'link-button')}</li>`).join('')}</ul>`:''}</details>
      <section class="mai-question" aria-labelledby="mai-question-title"><h3 id="mai-question-title">${uiIcon('chat')} Câu hỏi từ chị Mai</h3><p class="mai-quote">“${esc(CASE.handoff.question)}”</p>
        <label for="recommendation">Khuyến nghị của em <span class="required" aria-hidden="true">*</span></label>
        <textarea id="recommendation" name="recommendation" rows="4" data-bind="recommendation" aria-describedby="recommendation-hint">${esc(s.recommendation)}</textarea>
        <p class="muted recommendation-hint" id="recommendation-hint">${esc(CASE.handoff.hint)}</p>
        <p class="field-error recommendation-error" role="alert" hidden>Hãy viết khuyến nghị trước khi gửi.</p></section>
      <div class="handoff-submit"><p class="field-error handoff-error" role="alert" hidden></p><button class="primary">Gửi đề xuất cho chị Mai →</button></div>
    </form></div>`;
}
function reviewPayload(){
  return structuredClone({mode:s.mode,posts:s.posts,inbox:{added:addedIds(),replied:Object.keys(s.replied??{})},decisions:s.ats,recommendation:s.recommendation});
}
const reviewTimeout=60000;
async function requestReview(sub){
  sub.ai={status:'pending'};save();
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),reviewTimeout);
  let result;
  try{
    const response=await fetch('/api/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(sub.payload),signal:controller.signal});
    const data=await response.json().catch(()=>({}));
    result=response.ok?{status:'done',review:data}:{status:'error',message:data.error||'Dịch vụ đánh giá chưa phản hồi.'};
  }catch{
    result={status:'error',message:'Không kết nối được dịch vụ đánh giá.'};
  }finally{clearTimeout(timeout);}
  // Bỏ qua kết quả nếu người học đã nộp bản khác trong lúc chờ.
  if(s.submission?.id!==sub.id)return;
  s.submission.ai=result;save();
  if(overlay==='feedback')render();
  // NOVA vui mừng khi bài đạt từ 3/4 tiêu chí.
  if(result.status==='done'&&result.review.criteria.filter(c=>c.status==='Đạt').length>=3)dispatchEvent(new CustomEvent('nova:react',{detail:'excited'}));
}
// Phiên bản đang xem trong màn kết quả; null = bản mới nhất.
let viewVersion=null;
const allSubmissions=()=>[...(s.history??[]),...(s.submission?[s.submission]:[])];
const versionOf=(sub,index)=>sub.version??index+1;
const timeLabel=ms=>ms?new Intl.DateTimeFormat('vi-VN',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'}).format(ms):'';
function aiReview(review,previous){
  const pill=status=>`<span class="pill${status==='Đạt'?'':' warn'}">${esc(status)}</span>`;
  const before=Object.fromEntries((previous?.criteria??[]).map(c=>[c.id,c.status]));
  const change=c=>before[c.id]&&before[c.id]!==c.status?`<span class="change ${c.status==='Đạt'?'up':'down'}">${c.status==='Đạt'?'Đã cải thiện':'Kém hơn bản trước'}</span>`:'';
  const effort=review.effort_level?`<p class="effort effort-${{'Nghiêm túc':'good','Chưa đầy đủ':'mid'}[review.effort_level]??'low'}"><strong>Mức độ đầu tư: ${esc(review.effort_level)}</strong>${review.effort_note?` · ${esc(review.effort_note)}`:''}</p>`:'';
  return `${effort}<p>${esc(review.overall_summary)}</p><div class="feedback">${review.criteria.map(c=>`<article><h3>${esc(review.criteria_titles?.[c.id]??c.id)} ${pill(c.status)} ${change(c)}</h3>${c.evidence?`<blockquote>${esc(c.evidence)}</blockquote>`:''}<p>${esc(c.comment)}</p>${c.status==='Đạt'?'':`<p><strong>Gợi ý:</strong> ${esc(c.improvement)}</p>`}${c.id==='C1'&&c.status!=='Đạt'?'<p class="muted">Tin đã đăng không sửa được trong lượt này. Hãy áp dụng góp ý khi bấm Chơi lại case.</p>':''}</article>`).join('')}</div>
  ${review.strengths.length?`<h3>Điểm làm tốt</h3><ul>${review.strengths.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}
  <div class="callout"><strong>Ưu tiên sửa:</strong> ${esc(review.priority_action)}</div>`;
}
function feedback(){
  const list=allSubmissions();if(!list.length)return '';
  const index=viewVersion==null?list.length-1:Math.min(viewVersion,list.length-1);
  const sub=list[index], latest=index===list.length-1;
  // So sánh với bản liền trước có kết quả AI, để thấy tiêu chí nào đã cải thiện.
  const previous=list.slice(0,index).reverse().find(p=>p.ai?.status==='done')?.ai.review;
  const ai=sub.ai;
  const ruleBased=`<div class="feedback">${sub.feedback.map(([title,content])=>`<article><h3>${esc(title)}</h3><p>${esc(content)}</p></article>`).join('')}</div>`;
  const body=ai?.status==='pending'?'<p class="review-pending" role="status">Đang đánh giá bài bàn giao của bạn…</p>'
    :ai?.status==='done'?aiReview(ai.review,previous)
    :`${ai?.status==='error'?`<div class="warning" role="status">${esc(ai.message)} Dưới đây là nhận xét nhanh theo thao tác bạn đã làm. ${latest?btn('Thử chấm lại','retry-review'):''}</div>`:''}${ruleBased}`;
  const versions=list.length>1?`<nav class="version-tabs" aria-label="Các phiên bản đã nộp">${list.map((item,i)=>btn(`Phiên bản ${versionOf(item,i)}`,'view-version',i,i===index?'selected':'')).join('')}</nav>`:'';
  return `${versions}<span class="eyebrow">PHIÊN BẢN ${versionOf(sub,index)}${sub.submittedAt?` · NỘP ${esc(timeLabel(sub.submittedAt))}`:''} · ${sub.ids.length} ĐỀ XUẤT</span>${latest?'':'<p class="muted">Bạn đang xem một phiên bản cũ.</p>'}${body}
    <div class="actions">${primary('Sửa bài','revise')}${btn('Hồ sơ trải nghiệm','archive')}${btn('Xem cơ hội nghề nghiệp','opportunities')}${btn('Chơi lại case','replay')}</div>`;
}
// ---- Career Profile (màn 07) ----
// Lượt hiện tại lấy từ state; các lượt trước lưu ở key-portfolio khi bấm Chơi lại case. Mức hứng thú lưu riêng ở key-interest.
const INTEREST_LEVELS=['Rất hứng thú','Khá hứng thú','Muốn tìm hiểu thêm','Chưa phù hợp với mình'];
// Bản lưu cũ (trước khi có nhiều phiên bản) là một bài nộp đơn lẻ: gói lại thành một lượt có một phiên bản.
const normalizeRun=run=>run.versions?run:{id:run.id,archivedAt:run.id,versions:[run]};
const pastRuns=()=>read(key+'-portfolio',[]).map(normalizeRun);
function versionSummary(sub){
  if(sub.ai?.status==='done'){const n=sub.ai.review.criteria.filter(c=>c.status==='Đạt').length;return `${n}/${sub.ai.review.criteria.length} tiêu chí Đạt`;}
  if(sub.ai?.status==='pending')return 'Đang chấm';
  return 'Nhận xét nhanh (chưa có chấm AI)';
}
// Gợi ý CV chỉ mở khi bài đã được AI chấm và có đầu tư (feedback 13/11: tránh bấm bừa vẫn có dòng CV đẹp).
function cvGate(sub){
  if(!sub)return null;
  if(sub.ai?.status!=='done')return {open:false,message:'Gợi ý cho CV sẽ mở khi bài nộp gần nhất được AI chấm xong. Mở kết quả và bấm Thử chấm lại nếu cần.'};
  const passed=sub.ai.review.criteria.filter(c=>c.status==='Đạt').length;
  if(sub.ai.review.effort_level==='Làm cho có'||passed<2)return {open:false,message:`Bài nộp gần nhất mới đạt ${passed}/${sub.ai.review.criteria.length} tiêu chí, chưa đủ căn cứ để đưa vào CV. Hãy sửa bài theo phản hồi rồi nộp lại, gợi ý sẽ tự mở.`};
  return {open:true,passed,total:sub.ai.review.criteria.length};
}
function cvLine(sub,versions){
  const channels=[...new Set((sub.posts??[]).map(postedName))];
  const decisions=sub.decisions??sub.payload?.decisions;
  const screened=decisions?Object.keys(decisions).length:Object.keys(sub.payload?.people??{}).length;
  const replied=sub.payload?.inbox?.replied?.length??0;
  const gate=cvGate(sub);
  const date=sub.submittedAt&&new Date(sub.submittedAt);
  const when=date?`${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`:'';
  return [`Dự án mô phỏng nghề nghiệp · Talent Acquisition Intern (VAOVIEC.${when?`, ${when}`:''})`,
    `– Soạn và đăng tin tuyển Nhân viên Chăm sóc khách hàng${channels.length?` trên ${channels.join(', ')}`:''} cho doanh nghiệp giả lập NOVA Commerce.`,
    `– Đọc và sàng lọc ${screened} CV theo JD, ghi quyết định kèm lý do trong hệ thống ATS${replied?`; phản hồi ${replied} câu hỏi của ứng viên`:''}.`,
    `– Bàn giao ${sub.ids.length} đề xuất phỏng vấn cho quản lý, kèm khuyến nghị ứng viên ưu tiên và phương án dự phòng${versions>1?`; chỉnh sửa qua ${versions} phiên bản theo phản hồi`:''}.`,
    ...(gate?.open&&gate.passed>=3?[`– Đạt ${gate.passed}/${gate.total} tiêu chí trong phần đánh giá bài làm của VAOVIEC.`]:[])].join('\n');
}
function portfolioView(){
  const current=allSubmissions(), past=pastRuns(), interest=read(key+'-interest',null);
  const versionRows=(list,live)=>`<ol class="profile-versions">${list.map((sub,i)=>`<li><span><strong>Phiên bản ${versionOf(sub,i)}</strong><small>${esc(timeLabel(sub.submittedAt))}${sub.submittedAt?' · ':''}${esc(versionSummary(sub))} · ${sub.ids.length} ứng viên</small></span>${live?btn('Xem phản hồi','view-feedback',i):''}</li>`).join('')}</ol>`;
  const latest=current.at(-1), latestRun=latest?current:past[0]?.versions;
  const cvSource=latest??latestRun?.at(-1), gate=cvGate(cvSource);
  const empty=!current.length&&!past.length;
  return `<section class="profile-section"><h3>Talent Acquisition Intern · NOVA Commerce</h3>
    ${empty?'<p class="empty">Bài bàn giao bạn nộp sẽ tự lưu ở đây, kèm phản hồi và các phiên bản chỉnh sửa.</p>':''}
    ${current.length?`<h4>Lượt hiện tại${s.mode?` · Chế độ ${esc(MODES[s.mode].label)}`:''}</h4>${versionRows(current,true)}`:''}
    ${past.length?`<details class="profile-past"><summary>Lượt trước (${past.length})</summary>${past.map(run=>`<h4>Lượt lưu ${esc(timeLabel(run.archivedAt))}${run.mode&&MODES[run.mode]?` · Chế độ ${esc(MODES[run.mode].label)}`:''}</h4>${versionRows(run.versions,false)}`).join('')}</details>`:''}
    </section>
    <section class="profile-section"><h3>Bạn thấy công việc này thế nào?</h3>
      <p class="muted">Ghi lại cảm nhận để nhìn lại khi chọn nghề. Lựa chọn này lưu riêng, không ảnh hưởng tới phần chấm bài.</p>
      <div class="interest-options" role="radiogroup" aria-label="Mức độ hứng thú">${INTEREST_LEVELS.map(level=>`<button role="radio" aria-checked="${interest?.level===level}" data-do="interest" data-id="${esc(level)}">${esc(level)}</button>`).join('')}</div>
    </section>
    ${cvSource?`<section class="profile-section"><h3>Đưa vào CV hoặc LinkedIn</h3>
      ${gate.open?`<p class="muted">Gợi ý dưới đây tóm tắt việc bạn đã làm. Hãy ghi rõ đây là <strong>dự án mô phỏng</strong>, không trình bày như kinh nghiệm làm việc thật hay chứng nhận năng lực.</p>
      <textarea class="cv-line" readonly rows="6" aria-label="Gợi ý mô tả dự án cho CV">${esc(cvLine(cvSource,(latestRun??[]).length))}</textarea>
      <div class="cv-copy">${btn('Sao chép','copy-cv')}</div>`:`<p class="cv-locked">${esc(gate.message)}</p>${latest?btn('Xem phản hồi','feedback'):''}`}</section>`:''}
    <div class="actions">${btn('Xem cơ hội nghề nghiệp','opportunities')}${btn('Chơi lại case','replay')}${read(key+'-before-reset',null)?btn('Khôi phục lượt trước','undo-reset'):''}</div>`;
}
function opportunitiesView(){
  const o=CASE.opportunities;
  return `<p>${esc(o.intro)}</p>
    <ul class="opportunity-list">${o.links.map(([site,title,desc,url])=>`<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span class="opportunity-site">${esc(site)}</span><strong>${esc(title)} <span aria-hidden="true">↗</span></strong><small>${esc(desc)}</small><span class="sr-only">(mở trong tab mới)</span></a></li>`).join('')}</ul>
    <p class="muted opportunity-note">${esc(o.note)}</p>
    <div class="actions">${s.submission?btn('← Về kết quả','feedback'):''}${btn('Hồ sơ trải nghiệm','portfolio')}</div>`;
}
let introBusy=false;
function renderModal(){
  const postingGuide=overlay==='posting-guide';
  const guideOpen=postingGuide||overlay==='jd-guide';
  modal.classList.toggle('workspace-guide',guideOpen);
  if(guideOpen){
    modal.setAttribute('aria-labelledby','workspace-guide-heading');
    const acknowledge=`<div class="workspace-guide-actions">${primary('Đã hiểu',postingGuide?'posting-guide-done':'jd-guide-done')}</div>`;
    modal.innerHTML=`<div class="workspace-guide-copy">${postingGuide?`
      <header class="workspace-guide-top"><h2 id="workspace-guide-heading">Đăng tin tuyển CSKH</h2>${acknowledge}</header>
      <p>Xem qua ba kênh bên dưới rồi chọn kênh bạn nghĩ sẽ tiếp cận được ứng viên phù hợp.</p>
      <p>Khi soạn tin, bạn có thể mở lại JD để chọn những thông tin cần đưa vào bài đăng. Nhớ ghi rõ <strong>cách ứng tuyển và địa chỉ email nhận hồ sơ</strong> để ứng viên biết gửi CV về đâu nhé!</p>`:`
      <h2 id="workspace-guide-heading">Cùng đọc kỹ JOB DESCRIPTION chị Mai gửi nhé!</h2>
      <p>Khi đọc, hãy chú ý <strong>công việc chính</strong>, <strong>yêu cầu bắt buộc</strong>, <strong>địa điểm</strong> và <strong>mức lương</strong>. Đặc biệt lưu ý <strong>ca làm việc</strong> và <strong>lịch trực cuối tuần luân phiên</strong>.</p>
      <p>Xem xong, chúng ta cần “Đăng tin tuyển dụng” với thông tin chính xác để thu hút ứng viên phù hợp!</p>
      ${acknowledge}`}
    </div>`;
    if(!modal.open)modal.showModal();
    modal.querySelector('button').focus();
    return;
  }
  if(overlay.startsWith('intro-')){
    const step=introStep(overlay);
    modal.classList.add('case-intro');
    modal.setAttribute('aria-labelledby','intro-heading');
    const views=[
      ()=>`<div class="intro-role">
          <div><p>Bạn sẽ vào vai</p><h1 id="intro-heading" tabindex="-1">Talent Acquisition Intern</h1><h2>NOVA Commerce</h2>
          <p>Hỗ trợ tuyển một nhân viên Chăm sóc khách hàng. Đăng tin, sàng lọc hồ sơ và đề xuất ứng viên phỏng vấn.</p></div>
          <div class="intro-badge-scene" aria-hidden="true"><div class="intro-badge"><strong>NOVA</strong><div class="intro-badge-photo">${uiIcon('user')}</div><i></i><i></i></div></div>
        </div>`,
      ()=>CASE.companyIntro.map(([heading,copy],index)=>`<section><h2${index===0?' id="intro-heading" tabindex="-1"':''}>${esc(heading)}</h2>${paragraphs(copy)}</section>`).join(''),
      modeView
    ];
    const next=[['Về công ty','intro-company'],['Chọn chế độ','intro-mode'],['Bắt đầu nhiệm vụ','intro-enter']][step];
    modal.innerHTML=`<nav class="intro-steps" aria-label="Giới thiệu case">
      ${INTRO_STEPS.map(([action,label],index)=>`<button data-do="${action}" aria-current="${index===step?'step':'false'}"><span>${index+1}</span> ${label}</button>`).join('')}
    </nav>
    <div class="intro-content">${views[step]()}</div>
    <div class="intro-footer">${step===2&&!s.mode?'<p class="intro-hint">Chọn một chế độ để bắt đầu.</p>':''}<button class="primary" data-do="${next[1]}"${step===2&&!s.mode?' disabled':''}>${next[0]} <span aria-hidden="true">→</span></button></div>`;
    if(!modal.open)modal.showModal();
    return;
  }
  modal.classList.remove('case-intro','intro-closing');
  modal.removeAttribute('aria-labelledby');
  if(!overlay){if(modal.open)modal.close();return;}
  const email=openEmails().find(e=>e.id===selectedEmail);
  modal.classList.toggle('wide',overlay==='cv');
  const names={explore:'Khám phá',deadline:'Lịch để bàn',cv:'CV đính kèm',feedback:'Phản hồi từ Hiring Manager',portfolio:'Hồ sơ trải nghiệm',replay:'Chơi lại case',assistant:'Trợ lý công việc',opportunities:'Cơ hội nghề nghiệp'};
  const content={explore:()=>`<h3>Talent Acquisition Intern tại NOVA Commerce</h3><p>Trải nghiệm quy trình tuyển nhân viên Chăm sóc khách hàng, từ đọc JD đến đề xuất ứng viên phỏng vấn.</p>${primary('Mở Workspace','workspace')}`,deadline:()=>`<div class="slot">${esc(CASE.deadline)}</div><p>Hạn gửi đề xuất phỏng vấn cho ${esc(CASE.manager)}.</p>${btn('Xem khung phỏng vấn','tab','Calendar')}`,cv:()=>email?.cv?`<div class="cv-modal">${cvViewer(email.cv)}</div><div class="actions">${s.added[email.cv]?btn('Mở hồ sơ trong ATS','open-profile',email.cv):primary('Thêm vào ATS','add-ats',email.id)}</div>`:'',feedback,assistant:assistantView,opportunities:opportunitiesView,portfolio:portfolioView,replay:()=>`<p>Bắt đầu lại từ bàn làm việc. ${allSubmissions().length?'Các phiên bản bạn đã nộp được chuyển sang mục Lượt trước trong Hồ sơ trải nghiệm.':''}</p>${primary('Bắt đầu lại','reset')}`};
  modal.innerHTML=`<div class="modal-head"><h2>${names[overlay]}</h2><button aria-label="Đóng" data-do="close">×</button></div><div class="modal-body">${content[overlay]()}</div>`;
  if(!modal.open)modal.showModal();
}
const INTRO_STEPS=[['intro-role','Vai trò'],['intro-company','Về công ty'],['intro-mode','Chế độ']];
const introStep=action=>Math.max(0,INTRO_STEPS.findIndex(([id])=>id===action));
// Hai chế độ dùng chung nhiệm vụ, dữ kiện và tiêu chí đánh giá; chỉ khác mức hỗ trợ.
const MODES={
  guided:{label:'Làm quen',summary:'Phù hợp khi bạn mới tìm hiểu nghề tuyển dụng.',points:['Giải thích thuật ngữ và hướng dẫn từng bước','Có thể xem phương án mẫu khi bạn hỏi','Phù hợp để hình dung công việc hằng ngày']},
  self:{label:'Thử sức',summary:'Phù hợp khi bạn muốn tự xử lý như một thực tập sinh thật.',points:['Chỉ gợi ý tiêu chí và câu hỏi định hướng','Bạn tự chọn và giải thích phương án','Không xem phương án mẫu trong lúc làm']}
};
function modeView(){
  return `<h2 id="intro-heading" tabindex="-1">Bạn muốn trải nghiệm theo cách nào?</h2>
    <p>Hai chế độ dùng chung nhiệm vụ, dữ kiện và tiêu chí đánh giá. Chỉ khác mức hỗ trợ trong lúc làm. Phần chấm bài không cộng hay trừ điểm theo chế độ.</p>
    <div class="mode-options" role="radiogroup" aria-label="Chế độ trải nghiệm">${Object.entries(MODES).map(([id,m])=>`<button class="mode-option" role="radio" aria-checked="${s.mode===id}" data-do="choose-mode" data-id="${id}">
      <strong>${m.label}</strong><small>${m.summary}</small><ul>${m.points.map(p=>`<li>${p}</li>`).join('')}</ul></button>`).join('')}</div>`;
}
// Ba chặng chung của Workspace (05.1 → 05.3 trong PRD), suy ra từ tiến độ đã lưu.
const STAGES=['Nhận nhiệm vụ','Đăng tin tuyển dụng','Sàng lọc & đề xuất'];
function currentStage(){
  if(s.submission)return STAGES.length;
  if(!s.jdViewed)return 0;
  if(!s.delivery?.screeningStarted)return 1;
  return 2;
}
function renderCaseStages(){
  const now=currentStage(), done=now>=STAGES.length;
  $('.case-stages').innerHTML=STAGES.map((label,i)=>{
    const state=i<now?'done':i===now?'current':'upcoming';
    const status={done:'đã xong',current:'đang làm',upcoming:'chưa tới'}[state];
    return `<li class="stage-${state}"${state==='current'?' aria-current="step"':''}><span class="stage-dot" aria-hidden="true">${i<now?'✓':i+1}</span><span>${label}<span class="sr-only"> (${status})</span></span></li>`;
  }).join('')+(done?'<li class="stage-submitted">Đã nộp bàn giao</li>':'');
}
function renderCaseMode(){
  const chip=$('.case-mode');
  chip.hidden=!s.mode;
  chip.textContent=s.mode?`Chế độ: ${MODES[s.mode].label}`:'';
}
function report(){
  const ids=proposals(), people=candidateIds();
  const thin=people.filter(id=>(s.ats[id]?.reason??'').trim().length<40);
  const risky=ids.filter(id=>CASE.feedback.risk[id]);
  const rec=s.recommendation.trim().toLocaleLowerCase('vi');
  const named=ids.some(id=>rec.includes(shortName(id).toLocaleLowerCase('vi')));
  return [
    ['Xử lý Inbox',`Đã thêm ${addedIds().length}/${people.length} CV vào ATS và xem ${Object.keys(s.replied??{}).length}/${questionMails().length} câu trả lời cho thư hỏi thông tin.`],
    ['Quyết định sàng lọc',thin.length?`Lý do của ${thin.map(shortName).join(', ')} còn ngắn. Hãy nêu dữ kiện cụ thể trong CV và yêu cầu JD liên quan.`:'Mỗi quyết định đều có lý do. Hãy kiểm tra lại lý do đã nêu dữ kiện cụ thể trong CV chưa.'],
    ['Yêu cầu bắt buộc',risky.length?risky.map(id=>CASE.feedback.risk[id]).join(' '):'Các ứng viên được đề xuất không vướng yêu cầu bắt buộc ghi rõ trong CV.'],
    ['Khuyến nghị cho chị Mai',rec.length>=60&&named?'Khuyến nghị đã nêu người ưu tiên. Hãy kiểm tra lại đã có căn cứ và phương án dự phòng.':'Khuyến nghị cần nêu rõ người ưu tiên, căn cứ từ CV và phương án dự phòng.']
  ];
}
document.addEventListener('click',async ev=>{
  const el=ev.target.closest('button[data-do], .office-target[data-do]');if(!el)return;
  ev.preventDefault();
  const id=el.dataset.id, action=el.dataset.do;
  if(action.startsWith('intro-')){
    if(introBusy||overlay===action)return;
    if(action==='intro-enter'&&!s.mode){toast('Chọn một chế độ trước khi bắt đầu nhiệm vụ.');return;}
    introBusy=true;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(action==='intro-enter'){
      modal.classList.add('intro-closing');
      await new Promise(resolve=>setTimeout(resolve,reduced?75:180));
    }else{
      await modal.querySelector('.intro-content').animate([{opacity:1},{opacity:0}],{duration:reduced?35:80,fill:'forwards'}).finished;
      const forward=introStep(action)>introStep(overlay);
      overlay=action;
      renderModal();
      modal.querySelector('#intro-heading').focus({preventScroll:true});
      const offset=reduced?0:forward?8:-8;
      await modal.querySelector('.intro-content').animate([{opacity:0,transform:`translateX(${offset}px)`},{opacity:1,transform:'none'}],{duration:reduced?55:120,easing:'ease-out'}).finished;
      introBusy=false;
      return;
    }
    introBusy=false;
  }
  switch(action){
    case 'choose-mode':
      if(!MODES[id])return;
      s.mode=id;save();renderModal();renderCaseMode();
      modal.querySelector(`[data-do="choose-mode"][data-id="${id}"]`)?.focus();
      return;
    case 'intro-enter':s.introSeen=true;goDesk();overlay=location.hash==='#profile'?'portfolio':location.hash==='#result'&&s.submission?'feedback':'';break;
    case 'desk': goDesk(); overlay=''; break;
    case 'workspace': desk=false; overlay=''; break;
    case 'tab': nav(id); overlay=''; break;
    case 'inbox': nav('Inbox');overlay='';break;
    case 'posting': nav(postingTab);overlay='';break;
    case 'more-channel': if(s.posts.length!==1)return;choosingMore=true;nav(postingTab);overlay='';break;
    case 'ats': nav('ATS mini');overlay='';break;
    case 'short': nav('Bàn giao');overlay='';break;
    case 'revise':
      nav('Bàn giao');overlay='';
      toast('Sửa quyết định trong ATS hoặc khuyến nghị, rồi bấm Gửi đề xuất cho chị Mai để nộp phiên bản mới.',5000);break;
    case 'view-version':viewVersion=Number(id);break;
    case 'jd':
      if(!jdReturn){
        const order=tabOrder().filter(tab=>tab!==jdTab);
        order.splice(order.indexOf('Inbox')+1,0,jdTab);
        s.tabOrder=order;
      }
      if(s.tab!==jdTab)jdReturn=s.tab;
      nav(jdTab);s.jdViewed=true;overlay=s.jdGuideSeen?'':'jd-guide';break;
    case 'jd-guide-done':
      s.jdGuideSeen=true;
      overlay='';
      save();
      renderModal();
      app.querySelector('.jd-viewer a')?.focus({preventScroll:true});
      return;
    case 'posting-guide-done':
      s.postingGuideSeen=true;
      overlay='';
      save();
      renderModal();
      app.querySelector('.recruiting-channel')?.focus({preventScroll:true});
      return;
    case 'close-jd':
      if(s.tab===jdTab)s.tab=jdReturn||'Inbox';
      jdReturn='';break;
    case 'explore':case 'portfolio':case 'feedback':case 'replay':case 'opportunities':overlay=action;if(action==='feedback')viewVersion=null;break;
    case 'assistant':
      // Đếm số lần mở trợ lý theo việc, để sau này đối chiếu mức hỗ trợ đã dùng.
      (s.assistUses??={})[assistKey()]=(s.assistUses[assistKey()]??0)+1;
      overlay='assistant';break;
    case 'desk-calendar':overlay='deadline';break;
    case 'phone':toast(`Chưa có cuộc gọi nào. Hạn gửi đề xuất: ${CASE.deadline}.`);return;
    case 'close':overlay='';break;
    case 'channel':{
      if(!channelInfo(id)||(!channelAvailable(id)&&!s.posts.some(post=>post.channel===id)))return;
      closeChannelTab();
      s.channelTab=id;
      s.tabOrder=tabOrder();
      nav(id);break;
    }
    case 'close-channel':
      if(s.tab===id)nav(postingTab);
      else closeChannelTab();
      break;
    case 'facebook-compose':if(s.tab!=='community'||!channelAvailable(s.tab))return;facebookComposer=true;break;
    case 'facebook-close':closeFacebookComposer();return;
    case 'start-screening':
      if(!screeningReady())return;
      s.delivery.screeningStarted=true;
      selectedEmail='';mailQuery='';nav('Inbox');break;
    case 'mail-list':selectedEmail='';break;
    case 'email':
      if(desk)nav('Inbox');
      markApplicationSeen(id);
      selectedEmail=id;(s.readMail??={})[id]=true;break;
    case 'cv':if(!openEmails().some(e=>e.id===id&&e.cv))return;selectedEmail=id;overlay='cv';break;
    case 'add-ats':{
      const e=openEmails().find(m=>m.id===id);if(!e?.cv)return;
      s.added[e.cv]=true;overlay='';
      toast(inboxDone()?'Đã thêm vào ATS. Bạn đã rà soát xong Inbox, chuyển sang ATS mini để sàng lọc.':'Đã thêm hồ sơ vào ATS.',4200);break;
    }
    case 'open-profile':case 'edit-in-ats':
      if(!s.added[id])return;
      person=id;nav('ATS mini');overlay='';break;
    case 'refresh':toast(unreadCount()?'Đã cập nhật hộp thư.':'Chưa có email mới.');break;
    case 'reply':{
      const e=openEmails().find(m=>m.id===id);if(!e?.reply)return;
      s.replied[id]=true;toast('Đã gửi câu trả lời soạn sẵn.');break;
    }
    case 'person':if(!s.added[id])return;person=id;break;
    case 'cv-zoom':cvZoom=Math.min(1.5,Math.max(.7,Math.round((cvZoom+Number(id)*.1)*10)/10));break;
    case 'retry-review':
      if(!s.submission||s.submission.ai?.status==='pending')return;
      s.submission.payload??=reviewPayload();
      requestReview(s.submission);break;
    // Bài nộp tự lưu vào Hồ sơ; nút này chỉ mở Hồ sơ.
    case 'archive':overlay='portfolio';break;
    case 'view-feedback':viewVersion=Number(id);overlay='feedback';break;
    case 'interest':
      if(!INTEREST_LEVELS.includes(id))return;
      write(key+'-interest',{level:id,updatedAt:Date.now()});toast('Đã ghi nhận mức độ hứng thú.');break;
    case 'copy-cv':{
      const text=modal.querySelector('.cv-line');
      try{await navigator.clipboard.writeText(text.value);toast('Đã sao chép gợi ý vào bộ nhớ tạm.');}
      catch{text.select();toast('Hãy bấm Ctrl+C để sao chép đoạn đã chọn.');}
      return;
    }
    case 'undo-reset':case 'reset':
      if(action==='reset'){
        // Lượt đang có bài nộp được chuyển sang mục Lượt trước, kèm mọi phiên bản.
        const versions=allSubmissions();
        if(versions.length){
          // Giữ payload: gợi ý CV của lượt cũ cần số hồ sơ đã sàng lọc và số câu đã xác minh.
          const run={id:versions[0].id,archivedAt:Date.now(),mode:s.mode,versions};
          write(key+'-portfolio',[run,...pastRuns().filter(r=>r.id!==run.id)]);
        }
        write(key+'-before-reset',s);s=initial();
      }else{
        s=restoreChannelTabs(migrate(read(key+'-before-reset',s)));write(key+'-before-reset',null);if(s.tab===jdTab)s.tab='Inbox';
        // Lượt được khôi phục trở lại là lượt hiện tại, không lặp ở mục Lượt trước.
        const restoredId=allSubmissions()[0]?.id;
        if(restoredId)write(key+'-portfolio',pastRuns().filter(r=>r.id!==restoredId));
      }
      jdReturn='';desk=true;overlay=s.introSeen?'':'intro-role';selectedEmail='';mailQuery='';person='';choosingMore=false;facebookComposer=false;break;
    default:return;
  }
  render();
});
document.addEventListener('input',ev=>{
  const el=ev.target,{bind}=el.dataset;
  if(bind==='mail-search'){
    mailQuery=el.value;
    if(selectedEmail){
      selectedEmail='';
      render();
      const search=app.querySelector('[data-bind="mail-search"]');
      search.focus();
      return;
    }
    filterMail();
    return;
  }
  if(bind==='channel-draft')channelDraft(s.tab)[el.name]=el.value;
  else if(bind==='ats-decision'){
    if(!person)return;
    atsDraft(person).decision=el.value;
    const label=app.querySelector('.reason-label');
    if(label)label.textContent=CASE.decisions.find(([d])=>d===el.value)?.[2]??'Lý do';
  }
  else if(bind==='ats-reason'){if(!person)return;atsDraft(person).reason=el.value;}
  else if(bind==='recommendation'){
    s.recommendation=el.value;
    const error=app.querySelector('.recommendation-error');
    if(error&&el.value.trim())error.hidden=true;
  }
  else return;
  save();
});
document.addEventListener('submit',ev=>{
  const type=ev.target.dataset.form;if(!type)return;
  ev.preventDefault();
  const data=Object.fromEntries(new FormData(ev.target));
  if(type==='post-channel'){
    const channel=s.tab;
    if(!channelInfo(channel)||!channelAvailable(channel))return;
    const fields=channel==='career'?CASE.jobHubFields.map(([id])=>id):['body'];
    if(fields.some(id=>!data[id]?.trim())){toast('Điền nội dung trước khi đăng.');return;}
    const content=Object.fromEntries(fields.map(id=>[id,channel==='career'?data[id].trim():data[id]]));
    if(channel==='alumni')delete channelDraft(channel).body;
    s.delivery.starts[draftIndex()]=Date.now();
    s.posts.push({channel,channelLabel:channelInfo(channel)[1],...content});
    facebookComposer=false;
    toast('Tin tuyển dụng đã được đăng. Đang chờ ứng viên nộp hồ sơ.',3000);
  }else if(type==='decision'){
    if(!person)return;
    const draft=atsDraft(person), error=ev.target.querySelector('.field-error');
    const fail=message=>{error.hidden=false;error.textContent=message;};
    if(!draft.decision)return fail('Chọn một quyết định sàng lọc.');
    if(!draft.reason.trim())return fail('Nhập lý do trước khi lưu.');
    if(draft.decision==='interview'&&s.ats[person]?.decision!=='interview'&&proposals().length>=3)return fail('Đã có 3 ứng viên Đề xuất phỏng vấn. Đổi quyết định của một người khác trước.');
    s.ats[person]={decision:draft.decision,reason:draft.reason.trim(),savedAt:Date.now()};
    const next=addedIds().find(id=>!decided(id));
    if(next){person=next;toast('Đã lưu quyết định. Mở hồ sơ tiếp theo.');}
    else toast(screeningDone()?`Đã rà xong ${candidateIds().length} hồ sơ. Bấm Xem bàn giao để gửi đề xuất cho chị Mai.`:'Đã lưu quyết định. Thêm các CV còn lại từ Inbox.',4500);
  }else if(type==='handoff'){
    const formError=ev.target.querySelector('.handoff-error'), recError=ev.target.querySelector('.recommendation-error');
    formError.hidden=true;recError.hidden=true;
    const fail=message=>{formError.hidden=false;formError.textContent=message;};
    if(!screeningDone())return fail(`Rà hết ${candidateIds().length} hồ sơ trong ATS trước khi gửi.`);
    if(!proposals().length)return fail('Chọn ít nhất một ứng viên Đề xuất phỏng vấn trong ATS.');
    if(!s.recommendation.trim()){recError.hidden=false;ev.target.querySelector('#recommendation').focus();return;}
    if(s.submission?.ai?.status==='pending')return;
    // Nộp lại không ghi đè: bản trước chuyển vào lịch sử để người học đối chiếu.
    if(s.submission)(s.history??=[]).push(s.submission);
    const version=(s.history?.length??0)+1;
    s.submission={id:Date.now(),version,submittedAt:Date.now(),ids:proposals(),posts:structuredClone(s.posts),decisions:structuredClone(s.ats),recommendation:s.recommendation,feedback:report(),payload:reviewPayload()};
    viewVersion=null;
    overlay='feedback';
    requestReview(s.submission);
  }
  render();
});
modal.addEventListener('cancel',event=>{if(overlay.startsWith('intro-')||overlay==='jd-guide'||overlay==='posting-guide')event.preventDefault();});
modal.addEventListener('close',()=>{if(!modal.open)overlay='';});
render();
setInterval(refreshDeliveryUI,250);
// Bấm "Hồ sơ thực hành" trong menu tài khoản khi đang ở Workspace: chỉ đổi hash, nên mở Hồ sơ trải nghiệm tại chỗ.
addEventListener('hashchange',()=>{if(location.hash==='#profile'&&s.introSeen){overlay='portfolio';render();}});
