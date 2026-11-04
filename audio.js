var DVAudio=(function(){var MAX=5*1048576,rec,chunks=[],stream,t0=0,acc=0,paused=false,ac,an,buf,bytes=0,onFull,lastPeak=0;
function start(cb){onFull=cb;return navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){stream=s;chunks=[];bytes=0;acc=0;paused=false;
var o={audioBitsPerSecond:32000};if(window.MediaRecorder&&MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))o.mimeType='audio/webm;codecs=opus';
rec=new MediaRecorder(s,o);rec.ondataavailable=function(e){if(e.data.size){chunks.push(e.data);bytes+=e.data.size;if(bytes>=MAX*0.97&&onFull){var f=onFull;onFull=null;f();}}};rec.start(500);t0=Date.now();
try{ac=new (window.AudioContext||window.webkitAudioContext)();var src=ac.createMediaStreamSource(s);an=ac.createAnalyser();an.fftSize=256;src.connect(an);buf=new Uint8Array(an.fftSize);}catch(e){an=null;}});}
function elapsed(){return (paused?acc:acc+(Date.now()-t0))/1000;}
function pause(){if(rec&&rec.state==='recording'){rec.pause();acc+=Date.now()-t0;paused=true;}}
function resume(){if(rec&&rec.state==='paused'){rec.resume();t0=Date.now();paused=false;}}
function isPaused(){return paused;}
function level(){if(!an||paused)return 0;an.getByteTimeDomainData(buf);var m=0;for(var i=0;i<buf.length;i++){var v=Math.abs(buf[i]-128);if(v>m)m=v;}lastPeak=m;return Math.min(1,m/80);}
function size(){return bytes;}
function db(){return paused?'-60.0':(20*Math.log10(Math.max(lastPeak/128,0.001))).toFixed(1);}
function perm(){if(navigator.permissions&&navigator.permissions.query)return navigator.permissions.query({name:'microphone'}).then(function(r){return r.state;}).catch(function(){return 'prompt';});return Promise.resolve('prompt');}
function ask(){return navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){s.getTracks().forEach(function(t){t.stop();});return true;});}
function remaining(){var e=elapsed(),r=(e>3&&bytes)?bytes/e:4000;return Math.max(0,Math.floor((MAX-bytes)/r));}
function stop(){return new Promise(function(res,rej){if(!rec||rec.state==='inactive')return rej(new Error('Not recording.'));var d=Math.round(elapsed());
rec.onstop=function(){stream.getTracks().forEach(function(t){t.stop();});try{ac&&ac.close();}catch(e){}an=null;
if(d<1)return rej(new Error('Recording too short.'));var b=new Blob(chunks,{type:rec.mimeType||'audio/webm'});if(b.size>MAX)return rej(new Error('Recording exceeds 5MB.'));res({blob:b,dur:d});};rec.stop();});}
function b64(b){return new Promise(function(r,j){var f=new FileReader();f.onload=function(){r(String(f.result).split(',')[1]);};f.onerror=j;f.readAsDataURL(b);});}
return{db:db,perm:perm,ask:ask,start:start,stop:stop,pause:pause,resume:resume,isPaused:isPaused,elapsed:elapsed,level:level,size:size,remaining:remaining,b64:b64};})();
