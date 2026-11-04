(function(){'use strict';
var $=function(s){return document.querySelector(s);};
var S={sq:null,squads:[],msgs:[],since:0,role:'',lim:0,rec:[],pend:[],roster:[],show:20,filt:'recent',stat:{views:0,likes:0,online:0,shares:0},blob:null,dur:0,edit:null};

/* ================= EDIT THIS BLOCK: your ministry details ================= */
var CFG={
 ministry:'[Ministry Name]',founded:'[Year Founded]',city:'[City, Country]',
 tagline:'Unite and Nurture Believers.',version:'1.0',
 address:'[Street Address, City, State, Country]',hours:'[Service days and times, e.g. Sundays 9:00 AM]',
 email:'CONTACT_EMAIL',phone:'CONTACT_NUMBER',whatsapp:'CONTACT_NUMBER',facebook:'CONTACT_PAGE',
 prayerLine:'[Prayer line number]',website:'[www.yourministry.org]',
 bank:'[Bank name]',acctName:'[Account name]',acctNo:'[Account number]',momo:'[Mobile money number]',
 devName:'[Developer Name]',devRole:'[Developer Role / Title]',
 teamName:'[Team Member Name]',teamRole:'[Ministry Position]'
};
/* ========================================================================== */

var ic=function(d){return '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="'+d+'"/></svg>';};
var D={menu:'M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z',dots:'M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
home:'M12 3 2 12h3v8h5v-6h4v6h5v-8h3z',play:'M8 5v14l11-7z',mic:'M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11z',
chat:'M4 4h16v12H7l-3 3z',send:'M2 21l21-9L2 3v7l15 2-15 2z',back:'M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z',
sun:'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 13h2v-2H2zm18 0h2v-2h-2zM11 2v2h2V2zm0 18v2h2v-2zM5.99 4.58 4.58 5.99l1.41 1.41 1.42-1.41zm12.02 12.02-1.42 1.41 1.42 1.42 1.41-1.42zM18.01 7.4l1.41-1.41-1.41-1.41-1.42 1.41zM5.99 16.6l-1.41 1.41 1.41 1.42 1.42-1.42z',
moon:'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.4 5.4 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
list:'M3 13h2v-2H3zm0 4h2v-2H3zm0-8h2V7H3zm4 4h14v-2H7zm0 4h14v-2H7zM7 7v2h14V7z',
share:'M18 16a3 3 0 0 0-2 .8l-7-4a3 3 0 0 0 0-1.6l7-4A3 3 0 1 0 15 5l-7 4a3 3 0 1 0 0 6l7 4a3 3 0 1 0 3-3z',
dl:'M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z',info:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2zm0-8h-2V7h2z',
heart:'M12 21l-1.5-1.3C5 15 2 12 2 8.5A4.5 4.5 0 0 1 6.5 4C8.2 4 9.8 4.8 12 7c2.2-2.2 3.8-3 5.5-3A4.5 4.5 0 0 1 22 8.5c0 3.5-3 6.5-8.5 11.2z',
check:'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',close:'M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z',
mail:'M2 5h20v14H2zm2 2v1l8 5 8-5V7z',wa:'M4 20l1.3-4.2A8 8 0 1 1 8.2 18.8zm5-12c0 4 3 7 7 7l1-2-2-1-1 1c-1-.5-2.5-2-3-3l1-1-1-2z',
ph:'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2 4 1.4V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h4.6l1.4 4z',
hp:'M12 1a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h3a3 3 0 0 0 3-3v-7a9 9 0 0 0-9-9z',
addu:'M15 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 10V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
out:'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z',
pause:'M6 19h4V5H6zm8-14v14h4V5z',stop:'M6 6h12v12H6z'};
var G=function(k){return ic(D[k]);};

/* ---------- desktop blocker ---------- */
var ua=navigator.userAgent;if(!/Android/i.test(ua)||!/Mobile/i.test(ua)){$('#block').style.display='flex';return;}

/* ---------- ui helpers ---------- */
function load(on){$('#load').classList.toggle('on',on);}
var tt;function toast(m,e){var t=$('#toast');t.textContent=m;t.className='on'+(e?' err':'');clearTimeout(tt);tt=setTimeout(function(){t.className='';},2800);}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function busy(p,ok){load(true);return p.then(function(r){load(false);if(ok)ok(r);return r;}).catch(function(e){load(false);toast(e.message,true);if(/Session expired/.test(e.message))signout(true);});}

/* ---------- Android back button: layer stack ---------- */
var LY=[],skip=0;
function push(f){LY.push(f);history.pushState({dv:1},'');}
function back(){var f=LY.pop();if(!f)return;f();skip++;history.back();}
function closeAll(){var n=LY.length;if(!n)return;while(LY.length)LY.pop()();skip++;history.go(-n);}
window.addEventListener('popstate',function(){if(skip>0){skip--;return;}var f=LY.pop();if(f)f();});

var mo=false;
function modal(h){$('#mb').innerHTML=h;if(!mo){mo=true;$('#modal').classList.add('on');push(function(){mo=false;$('#modal').classList.remove('on');$('#mb').innerHTML='';});}}
function close(){if(mo)back();}
function confirmBox(msg,yes,title,label){modal('<h2 class="dt">'+esc(title||'Confirm')+'</h2><p class="dm">'+esc(msg)+'</p><div class="dbtn"><button class="btn alt" id="cn">Cancel</button><button class="btn red" id="cy">'+esc(label||'Confirm')+'</button></div>');$('#cn').onclick=close;$('#cy').onclick=function(){close();yes();};}
function logoutDialog(){confirmBox('Are you sure you want to log out?',function(){signout();},'Log out','Log out');}
function side(id){$('#'+id).classList.add('open');$('#sc').classList.add('on');push(function(){$('#'+id).classList.remove('open');$('#sc').classList.remove('on');});}
var pgOpen=false;
function page(t,h){var p=$('#pg');p.innerHTML='<div class="bar"><button id="pb" aria-label="Back">'+G('back')+'</button><b>'+esc(t)+'</b></div><div class="body">'+h+'</div>';p.classList.add('on');p.scrollTop=0;
if(!pgOpen){pgOpen=true;push(function(){pgOpen=false;p.classList.remove('on');p.innerHTML='';});}$('#pb').onclick=back;}
$('#sc').onclick=back;

/* ---------- theme ---------- */
function dark(){return DVStore.get('dv_dark')==='1';}
function theme(){document.body.classList.toggle('dark-mode',dark());}theme();

/* ---------- header, nav ---------- */
$('#bm').innerHTML=G('menu');$('#bd').innerHTML=G('dots');
var NAV=[['home','Home','home'],['play','Play','play'],['rec','Record','mic'],['chat','Chat','chat']];
$('#nav').innerHTML=NAV.map(function(n){return '<button data-v="'+n[0]+'">'+G(n[2])+'<span>'+n[1]+'</span></button>';}).join('');
function go(v){document.querySelectorAll('.view').forEach(function(x){x.classList.toggle('on',x.id==='v-'+v);});document.querySelectorAll('#nav button').forEach(function(b){b.classList.toggle('on',b.dataset.v===v);});R[v]&&R[v]();}
$('#nav').onclick=function(e){var b=e.target.closest('button');if(b)go(b.dataset.v);};

/* ---------- left sidebar ---------- */
var LI=[['About the App','info'],['About Developer','user'],['Team','user'],['How to Use','list'],['Terms of Use','list'],['Support Us','heart'],['Contact Us','mail']];
$('#L').innerHTML='<div class="sh"><div class="top"><button id="lc" aria-label="Close menu">'+G('back')+'</button></div><div class="brand"><img src="assets/logo.png" alt="DV-Community"><div><b>DV-Community</b>'+esc(CFG.tagline)+'</div></div></div><div class="sb">'+LI.map(function(x,i){return '<button class="mi" data-i="'+i+'">'+G(x[1])+x[0]+'</button>';}).join('')+'<div class="vf">Version '+CFG.version+'</div></div>';
$('#lc').onclick=back;$('#bm').onclick=function(){side('L');};

/* ---------- right sidebar (Chrome-style menu) ---------- */
function mask(m){m=String(m||'');var p=m.split('@');return p[0].charAt(0)+'***@'+(p[1]||'');}
function drawRight(){var em=DVStore.get('dv_email'),on=!!DVStore.get('dv_tok'),d=dark();
$('#Rr').innerHTML='<div class="sb"><button class="acct mi" data-k="acct" style="height:auto;padding:12px"><span class="av2">'+G('user')+'</span><span><b>User Account</b><small>'+(on?esc(mask(em)):'Not signed in')+'</small></span></button><div class="mcard">'
+'<button class="mi" data-k="todo">'+G('list')+'To-do-list</button><button class="mi" data-k="dark">'+G(d?'sun':'moon')+(d?'Light mode':'Dark mode')+'</button><button class="mi" data-k="share">'+G('share')+'Share App</button><button class="mi" data-k="inst">'+G('dl')+'Install App</button></div>'
+'<button class="mi lo" data-k="out">'+G('out')+'Log out</button></div>';}
drawRight();$('#bd').onclick=function(){drawRight();side('Rr');};
$('#Rr').onclick=function(e){var b=e.target.closest('button');if(!b)return;var k=b.dataset.k;
if(k==='acct')acct();else if(k==='todo')todo();else if(k==='dark'){DVStore.set('dv_dark',dark()?'0':'1');theme();drawRight();toast('Theme updated');}
else if(k==='share')share();else if(k==='inst'){if(dip){dip.prompt();}else toast('Open the browser menu and choose Add to Home screen.');}else if(k==='out')logoutDialog();};
var dip;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dip=e;});
window.addEventListener('appinstalled',function(){toast('DV-Community installed');});

/* ---------- page content (edit the CFG block above) ---------- */
function CT(){return '<div class="row4"><a style="background:#B3261E" href="mailto:'+CFG.email+'" aria-label="Gmail">'+G('mail')+'</a><a style="background:#25D366" href="https://wa.me/'+CFG.whatsapp+'" aria-label="WhatsApp">'+G('wa')+'</a><a style="background:#1877F2" href="https://facebook.com/'+CFG.facebook+'" aria-label="Facebook"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><path fill="#1877F2" d="M13 19v-6h2.2l.4-2.6H13V9.7c0-.8.3-1.3 1.4-1.3h1.3V6.1c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v1.9H8.4V13h2.1v6z"/></svg></a><a style="background:#188038" href="tel:'+CFG.phone+'" aria-label="Phone">'+G('ph')+'</a></div>';}
function C(t,h){return '<div class="card">'+(t?'<h2 class="ch">'+t+'</h2>':'')+h+'</div>';}
function UL(a){return '<ul class="ul">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
function HERO(){return '<div class="hdr"><img src="assets/logo.png" width="96" height="96" alt="DV-Community"><h1>DV-Community</h1><p>'+CFG.tagline+'</p></div>';}
var BIO='[EDIT] I am a servant of Christ, called to use technology to serve the body of Christ.\nDV-Community began with a simple burden: believers need small, safe places to encourage one another every day.\nEvery feature was built with prayer, simplicity and love for the Church in mind.\nMy vision is to reach many people through technology-enabled platforms that glorify God.\nThank you for being part of this journey.';
function bio(t){return '<p id="bio" style="white-space:pre-line;max-height:7em;overflow:hidden;text-align:center">'+esc(t)+'</p><button class="btn alt" id="sm" style="display:block;margin:10px auto">Show More</button>';}
var PG=[
 function(){return ['About the App',HERO()+C('About DV-Community','<p>DV-Community is a small-group voice-note community built for Christian believers. Members are gathered into Squads of twelve, each guided by a Squad Moderator, so that every voice is heard and every believer is known by name.</p><p>It is a ministry of <b>'+CFG.ministry+'</b>, established '+CFG.founded+' in '+CFG.city+'.</p>')
 +C('Our Vision','<p>A worldwide family of believers united in love, prayer and the Word of God, encouraging one another every day.</p>')
 +C('Our Mission',UL(['Unite believers in small, safe, accountable groups.','Nurture faith through voice notes, testimonies and prayer.','Equip leaders to shepherd their Squad with care.']))
 +C('Core Values',UL(['<b>Love:</b> we honour every member.','<b>Prayer:</b> we cover one another daily.','<b>Fellowship:</b> we walk together.','<b>Integrity:</b> we speak truth with grace.','<b>Encouragement:</b> we build each other up.','<b>Safety:</b> we protect every Squad.']))
 +C('What You Can Do',UL(['Send and hear voice notes within your Squad.','Chat, reply, edit and like messages.','Keep a private to-do list on your phone.','Install the app on your Android home screen.']))
 +C('Statement of Faith','<p>[EDIT to match your ministry]</p>'+UL(['The Bible is the inspired, infallible Word of God.','One God, eternally existing as Father, Son and Holy Spirit.','Salvation is by grace through faith in Jesus Christ alone.','The Holy Spirit empowers believers for godly living.','The Church is the body of Christ, called to love and serve.']))
 +'<div class="vf">DV-Community v'+CFG.version+'<br>'+CFG.ministry+'</div>'];},
 function(){return ['About Developer','<div class="ring"><i></i><img src="assets/logo.png" width="160" height="160" alt="Developer"></div><h2 style="text-align:center">'+CFG.devName+'</h2><p style="text-align:center;color:var(--text-secondary)">'+CFG.devRole+'</p>'+bio(BIO)+C('Why DV-Community','<p>[EDIT] Too many believers feel unseen. DV-Community gives every person a small circle where their voice matters, in an app that is free, simple and built for Android.</p>')+C('Get in touch','<p style="margin-bottom:12px">Reach the developer through any channel below.</p>'+CT())];},
 function(){return ['Team','<img class="av t" src="assets/logo.png" width="150" height="150" alt="Team"><h2 style="text-align:center">'+CFG.teamName+'</h2><p style="text-align:center;color:var(--text-secondary)">'+CFG.teamRole+'</p>'+bio('[EDIT] A faithful member of the ministry team, serving with joy.\nShe or he coordinates prayer, welcomes new Squads and supports Squad Moderators.\nTheir passion is to see every believer growing in Christ.')
 +C('How We Are Organised',UL(['<b>Application Owner:</b> oversees the whole community and appoints Squad Moderators.','<b>Squad Moderators:</b> ordinary members who welcome new believers, warn and remove disruptive members.','<b>Prayer Team:</b> [EDIT] intercedes for every request.','<b>Technical Support:</b> [EDIT] keeps the app running.']))+C('Serve With Us','<p>Would you like to serve as a Squad Moderator or volunteer? Contact us and we will pray with you.</p>')];},
 function(){var st=[['Open your Squad invite link on your Android phone.'],['Tap the three dots, choose User Account and verify your email with the 6-digit code.'],['Wait for your Squad Moderator to approve you. You will see your Squad when approved.'],['Record tab: press and hold the big Talk button. Slide up to lock hands-free. Release to preview, then Send.'],['Play tab: listen to voice notes from your Squad.'],['Chat tab: send short messages, reply, edit and like.'],['Daily limits: 2 voice notes (5MB each) and 2 messages (250 characters) every 24 hours.'],['Install the app: three dots, Install App. Switch Light or Dark mode from the same menu.']];
 return ['How to Use',st.map(function(s,i){return '<div class="card step"><i>'+(i+1)+'</i><p>'+s[0]+'</p></div>';}).join('')+C('Good to know',UL(['Be kind. Speak life. Pray for one another.','Your to-do list stays on your phone, even if you clear the browser cache.','If something looks wrong, contact us from the left menu.']))];},
 function(){var T=[['1. Acceptance','By using DV-Community you agree to these terms and to the guidance of your Squad Moderator.'],['2. Who may join','You must be at least [EDIT 13] years old and join through a Squad invite link using a valid email address.'],['3. Your account','We verify your email with a one-time code. You are responsible for activity on your device.'],['4. Squads and moderators','Each Squad has up to twelve members. Moderators may approve or reject requests, warn and ban members of their Squad. The Application Owner may override any decision.'],['5. Respectful conduct','No hate, harassment, abuse, spam, adult or unlawful content. Speak with love and truth.'],['6. Voice notes and messages','Daily limits apply and may be changed by the owner. Do not record other people without permission.'],['7. Privacy','We store your email, a device ID, your messages and voice notes so the service works. We do not collect your IP address. [EDIT retention period].'],['8. Suspension','We may restrict or ban accounts and devices that break these terms.'],['9. No warranty','The app is provided as a ministry service without guarantees of availability.'],['10. Changes','We may update these terms. Continued use means you accept the updated terms.'],['11. Contact','Questions: '+CFG.email]];
 return ['Terms of Use',C('','<p><i>Last updated: [EDIT date]</i></p>')+T.map(function(x){return C(x[0],'<p>'+x[1]+'</p>');}).join('')];},
 function(){return ['Support Us',HERO()+C('Partner With Us','<p>DV-Community is sustained by the freewill giving of believers who want every Christian to have a safe place to be encouraged. Your gift keeps the app free, ad-free and open to every Squad.</p>')
 +C('Ways to Give','<p><b>Bank:</b> '+CFG.bank+'<br><b>Account name:</b> '+CFG.acctName+'<br><b>Account number:</b> '+CFG.acctNo+'<br><b>Mobile money:</b> '+CFG.momo+'</p>')
 +C('Where Your Gift Goes',UL(['Secure hosting and voice storage.','New features for Squads.','Outreach to new believers and communities.']))
 +C('Other Ways to Help',UL(['Pray for the ministry and its leaders.','Share the app with fellow believers.','Volunteer as a Squad Moderator.']))
 +C('Thank You','<p>"God loves a cheerful giver." May the Lord multiply your seed.</p><p style="margin-top:12px">Contact us about giving:</p><p style="margin-top:12px">'+CT()+'</p>')];},
 function(){return ['Contact Us',HERO()+C('Our Office','<p><b>'+CFG.ministry+'</b><br>'+CFG.address+'<br><b>Hours:</b> '+CFG.hours+'</p>')+C('Reach Us','<p><b>Email:</b> '+CFG.email+'<br><b>Phone:</b> '+CFG.phone+'<br><b>Prayer line:</b> '+CFG.prayerLine+'<br><b>Website:</b> '+CFG.website+'</p>')
 +C('Prayer Requests','<p>Need prayer? Send us a message and our prayer team will stand with you.</p>')+C('Tap a channel','<p style="margin-bottom:12px">We reply as quickly as we can.</p>'+CT())];}];
$('#L').addEventListener('click',function(e){var b=e.target.closest('.mi');if(!b)return;var p=PG[b.dataset.i]();page(p[0],p[1]);var s=$('#sm');if(s)s.onclick=function(){var o=$('#bio').style.maxHeight==='none';$('#bio').style.maxHeight=o?'7em':'none';s.textContent=o?'Show More':'Show Less';};});

/* ---------- share ---------- */
function share(){var u=location.href.split('?')[0],t=encodeURIComponent('Join DV-Community: Unite and Nurture Believers. '+u);var B=function(c,l,a){return '<button class="btn" '+a+' style="width:100%;margin:6px 0;background:'+c+'">'+l+'</button>';};
modal('<h2 class="dt">Share App</h2><div id="sh">'+B('#25D366','WhatsApp','data-s="https://wa.me/?text='+t+'"')+B('#1877F2','Facebook','data-s="https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(u)+'"')+B('#1DA1F2','Twitter','data-s="https://twitter.com/intent/tweet?text='+t+'"')+B('#0082FC','Bluetooth','id="bt"')+B('#1877F2','Android share sheet','id="ns"')+'<button class="btn alt" id="cl" style="width:100%;margin:6px 0">Close</button></div>');
$('#sh').onclick=function(e){var s=e.target.dataset.s;if(s){window.open(s,'_blank');DVStat.load('share').catch(function(){});}};$('#cl').onclick=close;
$('#bt').onclick=$('#ns').onclick=function(){if(navigator.share)navigator.share({title:'DV-Community',url:u}).then(function(){DVStat.load('share').catch(function(){});}).catch(function(){});else toast('Sharing is not available on this device.',true);};}

/* ---------- to-do ---------- */
function todo(){page('To-do-list','<textarea id="tx" maxlength="400" rows="4" placeholder="Write a task (400 characters max)"></textarea><button class="btn" id="ta" style="width:100%">Add task</button><div id="tl" style="margin-top:12px"></div>');
function draw(){DVStore.todos().then(function(a){$('#tl').innerHTML=a.sort(function(x,y){return y.id-x.id;}).map(function(x){return '<div class="card todo'+(x.done?' done':'')+'" data-id="'+x.id+'"><button data-a="d">'+G('check')+'</button><p>'+esc(x.t)+'</p><button data-a="x">'+G('close')+'</button></div>';}).join('')||'<div class="card">No tasks yet.</div>';});}
draw();$('#ta').onclick=function(){var v=$('#tx').value.trim();if(!v)return toast('Write a task first.',true);DVStore.addTodo(v).then(function(){$('#tx').value='';toast('Task saved');draw();});};
$('#tl').onclick=function(e){var b=e.target.closest('button'),c=e.target.closest('.todo');if(!b)return;var id=+c.dataset.id;if(b.dataset.a==='x')confirmBox('Delete this task?',function(){DVStore.delTodo(id).then(draw);},'Delete task','Delete');else DVStore.todos().then(function(a){var x=a.filter(function(y){return y.id===id;})[0];x.done=!x.done;DVStore.putTodo(x).then(draw);});};}

/* ---------- account ---------- */
function acct(){var em=DVStore.get('dv_email');
if(DVStore.get('dv_tok')){modal('<h2 class="dt">Account</h2><p class="dm">Signed in as '+esc(mask(em))+'</p><button class="btn red" id="lo" style="width:100%">Log out</button><button class="btn alt" id="cl" style="width:100%;margin-top:8px">Close</button>');$('#lo').onclick=function(){close();logoutDialog();};$('#cl').onclick=close;return;}
modal('<h2 class="dt">Verify your email</h2><input id="em" type="email" placeholder="Email address"><button class="btn" id="se" style="width:100%">Send code</button><button class="btn alt" id="cl" style="width:100%;margin-top:8px">Close</button>');$('#cl').onclick=close;
$('#se').onclick=function(){var m=$('#em').value.trim().toLowerCase();busy(DVAPI.call('vsend',{email:m}),function(){toast('Verification code has been sent to your email');modal('<h2 class="dt">Enter code</h2><input id="cd" inputmode="numeric" maxlength="6" placeholder="6-digit code"><button class="btn" id="vf" style="width:100%">Verify</button>');
$('#vf').onclick=function(){busy(DVAPI.call('vverify',{email:m,code:$('#cd').value}),function(r){DVStore.set('dv_email',m);DVStore.set('dv_tok',r.tok);toast('You have verified your email');modal('<h2 class="dt">Welcome to DV-Community</h2><p class="dm">'+esc(CFG.tagline)+'</p><button class="btn" id="ok" style="width:100%">Open app</button>');drawRight();$('#ok').onclick=function(){close();boot();};});};});};}
function signout(q){closeAll();DVStore.del('dv_tok');DVStore.del('dv_email');S.sq=null;S.squads=[];S.msgs=[];S.since=0;S.role='';S.pend=[];S.roster=[];drawRight();go('home');if(!q)toast('You have logged out');}

/* ---------- data ---------- */
function boot(){if(!DVStore.get('dv_tok'))return;var c=DVStore.get('dv_inv');var j=c?DVAPI.call('join',{code:c}).then(function(r){DVStore.del('dv_inv');toast(r.status==='Pending'?'Request sent. Waiting for the Squad Moderator.':'Joined');}).catch(function(e){DVStore.del('dv_inv');toast(e.message,true);}):Promise.resolve();
busy(j.then(function(){return DVAPI.call('me');}),function(r){S.squads=r.squads;S.lim=r.x;S.sq=S.sq||(r.squads[0]&&r.squads[0].sq);sync(true);});}
function sync(f){if(!S.sq||!DVStore.get('dv_tok'))return;DVAPI.call('sync',{sq:S.sq,since:f?0:S.since}).then(function(r){S.role=r.role;S.pend=r.pend||[];S.roster=r.roster||[];
if(r.warns&&r.warns.length){modal('<h2 class="dt">Warning</h2>'+r.warns.map(function(w){return '<p class="dm">'+esc(w)+'</p>';}).join('')+'<button class="btn" id="ak" style="width:100%">I understand</button>');$('#ak').onclick=function(){close();DVAPI.call('ack').catch(function(){});};}
if(f)S.msgs=r.msgs;else r.msgs.forEach(function(m){var i=S.msgs.findIndex(function(x){return x.id===m.id;});if(i<0)S.msgs.push(m);else S.msgs[i]=m;});S.msgs.forEach(function(m){if(m.t>S.since)S.since=m.t;});draw();})
.catch(function(e){if(/Session expired/.test(e.message))return signout(true);if(/pending/.test(e.message))S.role='Pending';if(f)toast(e.message,true);});}
var pn=0;setInterval(function(){if(!document.hidden){pn++;sync(pn%5===0);}},60000);
function isTxt(m){return String(m.u).indexOf('TXT:')===0;}
function qt(d){var p=S.msgs.filter(function(x){return x.id===String(d).slice(3);})[0];return p&&isTxt(p)?'<small class="q">'+esc(String(p.u).slice(4,44))+'</small>':'';}
function ts(t){return new Date(t).toLocaleString([], {dateStyle:'short',timeStyle:'short'});}

/* ---------- views ---------- */
var R={
home:function(){var s=S.stat;
$('#v-home').innerHTML='<div class="card"><div class="hero"><div><b>'+s.views+'</b>Views</div><div><b>'+s.likes+'</b>Likes</div><div><b>'+s.online+'</b>Online</div><div><b>'+s.shares+'</b>Shares</div></div><button class="btn alt" id="lk" style="width:100%;margin-top:10px">Like this app</button></div>'
+'<div class="tiles"><button class="tile" data-f="recent">'+G('hp')+'<span>Recent Audio</span></button><button class="tile" data-f="mine">'+G('mic')+'<span>Recently Recorded</span></button><button class="tile" data-f="shared">'+G('share')+'<span>Shared Audio</span></button><button class="tile" id="su">'+G('addu')+'<span>Signup</span></button></div>'
+(S.pend&&S.pend.length?'<div class="card"><h2 class="ch">Join requests</h2>'+S.pend.map(function(p){return '<div style="margin-top:8px">'+esc(p.e)+'<div style="display:flex;gap:8px"><button class="btn" style="flex:1" data-d="1" data-t="'+esc(p.id)+'">Approve</button><button class="btn red" style="flex:1" data-d="0" data-t="'+esc(p.id)+'">Reject</button></div></div>';}).join('')+'</div>':'')
+(S.roster&&S.roster.length?'<div class="card"><h2 class="ch">Squad members</h2>'+S.roster.map(function(p){return '<div style="margin-top:8px">'+esc(p.e)+'<div style="display:flex;gap:8px"><button class="btn alt" style="flex:1" data-w="'+esc(p.id)+'">Warn</button><button class="btn red" style="flex:1" data-x="'+esc(p.id)+'">Ban</button></div></div>';}).join('')+'</div>':'')
+(!DVStore.get('dv_tok')?'<div class="card"><p>Open your Squad invite link and tap Signup to verify your email.</p></div>':S.squads.length?'':'<div class="card"><p>You have no approved Squad yet.</p></div>');
$('#lk').onclick=function(){busy(DVStat.load('like'),function(){R.home();toast('Thank you');});};$('#su').onclick=acct;},
play:function(){var a=S.msgs.filter(function(m){return !isTxt(m);});if(S.filt==='mine')a=[];if(S.filt==='shared')a=a.filter(function(m){return m.s===DVStore.uid;});if(S.filt==='recent')a=a.filter(function(m){return m.s!==DVStore.uid;});
$('#v-play').innerHTML=(S.filt==='mine'?S.rec:a.map(function(m){return {u:m.u,t:m.t,o:m.s===DVStore.uid};})).map(function(m){return '<div class="b vn '+(m.o||S.filt==='mine'?'out':'in')+'"><audio controls preload="none" src="'+esc(m.u)+'"></audio><small>'+ts(m.t)+'</small></div>';}).join('')||'<div class="card">No audio yet.</div>';},
rec:function(){if(recOn)return;
$('#v-rec').innerHTML='<div class="card"><label>Send to</label><select id="ds">'+S.squads.map(function(s){return '<option value="'+s.sq+'"'+(s.sq===S.sq?' selected':'')+'>'+esc(s.name)+'</option>';}).join('')+'</select></div>'
+'<button class="btn ptt" id="pt">Push to hold &amp; Talk</button><p id="rh" style="text-align:center;margin:8px 0 12px;color:var(--text-secondary)">Hold to record. Slide up to lock.</p><div class="rp" id="rp"><div class="rtop"><span>OPUS</span><span>32 KBPS</span><span>MAX 5 MB</span></div><div class="rmic">'+G('mic')+'</div><div class="rt" id="rtm">00:00</div><div class="rn" id="rn">voice-note.webm</div><div class="mt" id="mt"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>'
+'<div class="rb"><button id="rpa" aria-label="Pause">'+G('pause')+'</button><button id="rst" aria-label="Stop">'+G('stop')+'</button></div><div class="rs"><span id="rsz">Recording 0.0 KB</span><span id="rlf">Time left 21:50</span></div></div>'
+'<div id="pv"></div>';
var b=$('#pt');b.addEventListener('touchstart',startRec,{passive:false});b.addEventListener('touchmove',moveRec,{passive:false});b.addEventListener('touchend',endRec,{passive:false});b.addEventListener('touchcancel',endRec,{passive:false});b.addEventListener('contextmenu',function(e){e.preventDefault();});
$('#rpa').onclick=function(){if(DVAudio.isPaused()){DVAudio.resume();$('#rpa').innerHTML=G('pause');}else{DVAudio.pause();$('#rpa').innerHTML=G('play');}};$('#rst').onclick=finish;},
chat:function(){draw();}};

/* ---------- recorder ---------- */
var rt=null,recOn=false,locked=false,held=false,y0=0;
function fmt(s){s=Math.max(0,Math.floor(s));return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2);}
function kb(b){return b<1000000?(b/1024).toFixed(1)+' KB':(b/1048576).toFixed(2)+' MB';}
function stamp(){var d=new Date(),p=function(n){return ('0'+n).slice(-2);};return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds());}
function tick(){if(!$('#rtm'))return;$('#rtm').textContent=fmt(DVAudio.elapsed());$('#rsz').textContent='Recording '+kb(DVAudio.size());$('#rlf').textContent='Time left '+fmt(DVAudio.remaining());var n=Math.round(DVAudio.level()*10);document.querySelectorAll('#mt i').forEach(function(e,i){e.classList.toggle('on',i<n);});}
function startRec(e){e.preventDefault();if(recOn)return;if(!S.sq)return toast('Join and get approved in a Squad first.',true);recOn=true;held=true;locked=false;y0=e.touches[0].clientY;
DVAudio.start(function(){toast('You reached the 5MB limit');finish();}).then(function(){$('#rp').classList.add('on');$('#pt').classList.add('rec');$('#rh').textContent='Release to stop. Slide up to lock.';$('#rn').textContent='voice-note-'+stamp()+'.webm';$('#rpa').innerHTML=G('pause');if(navigator.vibrate)navigator.vibrate(30);clearInterval(rt);rt=setInterval(tick,120);tick();if(!held&&!locked)finish();})
.catch(function(){recOn=false;toast('Microphone permission is required.',true);});}
function moveRec(e){e.preventDefault();if(!recOn||locked)return;if(y0-e.touches[0].clientY>80){locked=true;$('#rh').textContent='Locked. Use Pause or Stop.';if(navigator.vibrate)navigator.vibrate(20);}}
function endRec(e){e.preventDefault();held=false;if(recOn&&!locked&&DVAudio.elapsed()>0)finish();}
function finish(){if(!recOn)return;recOn=false;clearInterval(rt);var p=$('#rp'),b=$('#pt');
DVAudio.stop().then(function(r){if(p)p.classList.remove('on');if(b)b.classList.remove('rec');$('#rh').textContent='Hold to record. Slide up to lock.';S.blob=r.blob;S.dur=r.dur;var u=URL.createObjectURL(r.blob);S.rec.unshift({u:u,t:Date.now()});
$('#pv').innerHTML='<div class="card"><p>Preview ('+fmt(r.dur)+', '+kb(r.blob.size)+')</p><audio controls src="'+u+'"></audio><div style="display:flex;gap:8px;margin-top:10px"><button class="btn red" id="dc" style="flex:1">Discard</button><button class="btn" id="sn" style="flex:1">Send</button></div></div>';
$('#dc').onclick=function(){S.blob=null;$('#pv').innerHTML='';};
$('#sn').onclick=function(){if(!S.blob)return;busy(DVAudio.b64(S.blob).then(function(d){return DVAPI.call('send',{type:'aud',sq:$('#ds').value,data:d,mime:S.blob.type,dur:S.dur});}),function(){S.blob=null;$('#pv').innerHTML='';toast('Voice note sent');sync(false);});};})
.catch(function(x){if(p)p.classList.remove('on');if(b)b.classList.remove('rec');if(x&&x.message!=='Not recording.')toast(x.message,true);});}

/* ---------- chat ---------- */
var re=null;
function draw(){if($('#v-home').classList.contains('on'))R.home();else if($('#v-play').classList.contains('on'))R.play();
if(!$('#v-chat').classList.contains('on'))return;var ms=S.msgs.filter(isTxt),vis=ms.slice(-S.show);
var h=(ms.length>S.show?'<button class="btn alt" id="mo" style="width:100%;margin-bottom:8px">Load older</button>':'')+'<div id="msgs">'+vis.map(function(m){var me=m.s===DVStore.uid,rp=String(m.d).indexOf('re:')===0;return '<div class="b '+(me?'out':'in')+(rp?' re':'')+'" data-id="'+m.id+'">'+(rp?qt(m.d):'')+'<span>'+esc(String(m.u).slice(4))+'</span><small>'+ts(m.t)+'</small><div class="act"><button data-a="l">'+G('heart')+' '+(m.l||'')+'</button><button data-a="r">Reply</button>'+(me?'<button data-a="e">Edit</button>':'')+'</div></div>';}).join('')+'</div><div id="cbar"><textarea id="ci" rows="1" '+(S.lim?'maxlength="'+S.lim+'"':'')+' placeholder="Message"></textarea><button id="cs" aria-label="Send">'+G('send')+'</button></div>';
var kv=$('#ci')?$('#ci').value:'';$('#v-chat').innerHTML=h;if(kv)$('#ci').value=kv;var mo2=$('#mo');if(mo2)mo2.onclick=function(){S.show+=20;draw();};
$('#cs').onclick=function(){var t=$('#ci').value.trim();if(!t)return;var ed=S.edit;busy(DVAPI.call(ed?'edit':'send',{type:'txt',sq:S.sq,text:t,re:re,id:ed}),function(){re=null;S.edit=null;toast(ed?'Message updated':'Message sent');sync(true);});};
$('#msgs').onclick=function(e){var b=e.target.closest('button'),c=e.target.closest('.b');if(!b)return;var id=c.dataset.id,a=b.dataset.a;if(a==='l')busy(DVAPI.call('like',{sq:S.sq,id:id}),function(){sync(true);});else if(a==='r'){re=id;$('#ci').focus();toast('Replying to message');}else{S.edit=id;var m=S.msgs.filter(function(x){return x.id===id;})[0];$('#ci').value=String(m.u).slice(4);$('#ci').focus();toast('Editing message');}};}

document.addEventListener('click',function(e){var b=e.target.closest('[data-f],[data-d],[data-w],[data-x]');if(!b)return;var d=b.dataset;
if(d.f){S.filt=d.f;go('play');}
else if(d.d!==undefined){var ok=d.d==='1',run=function(){busy(DVAPI.call('decide',{sq:S.sq,target:d.t,ok:ok}),function(){toast(ok?'Member approved':'Request rejected');sync(true);});};if(ok)run();else confirmBox('Reject this request?',run,'Reject request','Reject');}
else if(d.x)confirmBox('Ban this member from the squad? The owner can review and reverse this.',function(){busy(DVAPI.call('mban',{sq:S.sq,target:d.x}),function(){toast('Member banned');sync(true);});},'Ban member','Ban');
else if(d.w){modal('<h2 class="dt">Warn member</h2><textarea id="wt" maxlength="120" rows="3" placeholder="Warning (120 characters max)"></textarea><div class="dbtn"><button class="btn alt" id="wc">Cancel</button><button class="btn" id="ws">Send</button></div>');$('#wc').onclick=close;$('#ws').onclick=function(){var t=$('#wt').value.trim();if(!t)return toast('Write the warning first.',true);close();busy(DVAPI.call('warn',{sq:S.sq,target:d.w,text:t}),function(){toast('Warning sent');});};}});

/* ---------- start ---------- */
var q=new URLSearchParams(location.search).get('c');if(q){DVStore.set('dv_inv',q);history.replaceState(null,'',location.pathname);}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
DVStat.load('view').then(function(s){S.stat=s;R.home();}).catch(function(){R.home();});DVStat.analytics();DVStat.online().catch(function(){});
if(!DVStore.get('dv_tok'))setTimeout(acct,600);else boot();
go('home');})();
