var DVStore=(function(){var g=function(k){try{return localStorage.getItem(k);}catch(e){return null;}},s=function(k,v){try{localStorage.setItem(k,v);}catch(e){}};
function id(){var a=new Uint8Array(24);crypto.getRandomValues(a);return Array.from(a,function(b){return 'abcdefghijklmnopqrstuvwxyz0123456789'[b%36];}).join('');}
var uid=g('dv_uid');if(!uid||uid.length<12||uid.length>48){uid=id();s('dv_uid',uid);}
var dev=g('dv_dev');if(!dev){dev=id();s('dv_dev',dev);}
function db(){return new Promise(function(r,j){var q=indexedDB.open('dvc',1);q.onupgradeneeded=function(){q.result.createObjectStore('todo',{keyPath:'id'});};q.onsuccess=function(){r(q.result);};q.onerror=function(){j(q.error);};});}
function tx(m,f){return db().then(function(d){return new Promise(function(r,j){var t=d.transaction('todo',m),o=f(t.objectStore('todo'));t.oncomplete=function(){r(o&&o.result);};t.onerror=function(){j(t.error);};});});}
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
return{uid:uid,dev:dev,get:g,set:s,del:function(k){try{localStorage.removeItem(k);}catch(e){}},
todos:function(){return tx('readonly',function(o){return o.getAll();});},addTodo:function(t){return tx('readwrite',function(o){return o.put({id:Date.now(),t:t,done:false});});},putTodo:function(x){return tx('readwrite',function(o){return o.put(x);});},delTodo:function(i){return tx('readwrite',function(o){return o.delete(i);});}};})();
