var DVStat=(function(){var last={views:0,likes:0,online:0,shares:0};
function pick(r){last=r.s;return last;}
function load(ev){var p=ev==='view'?DVPageView.record():ev==='like'?DVPageLikes.record():ev==='share'?DVPageShare.record():DVAPI.call('stat',{});return p.then(pick);}
function online(){return DVActiveUsers.record();}
function analytics(){fetch('https://ipapi.co/json/').then(function(r){return r.json();}).then(function(d){return DVAPI.call('log',{ev:'visit',city:d.city,region:d.region,country:d.country_name,isp:d.org,tz:d.timezone,lang:navigator.language,plat:navigator.platform,scr:screen.width+'x'+screen.height,ua:navigator.userAgent});}).catch(function(){});}
return{load:load,online:online,analytics:analytics};})();
