var DVAPI=(function(){var URL_='PASTE_YOUR_WEB_APP_URL_HERE';
function call(a,b){b=b||{};b.uid=DVStore.uid;b.dev=DVStore.dev;if(!b.email)b.email=DVStore.get('dv_email');b.tok=DVStore.get('dv_tok');
if(URL_.indexOf('PASTE_')===0)return Promise.reject(new Error('Backend URL is not set in api.js.'));
return fetch(URL_+'?a='+a,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(b)}).then(function(r){return r.json();}).then(function(j){if(!j.ok)throw new Error(j.err||'Request failed.');return j;}).catch(function(e){if(e instanceof TypeError)throw new Error('Network error. Check your connection.');throw e;});}
return{call:call};})();
