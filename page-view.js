var DVPageView={record:function(){if(sessionStorage.getItem('dv_pv'))return DVAPI.call('stat',{});try{sessionStorage.setItem('dv_pv','1');}catch(e){}return DVAPI.call('stat',{ev:'view'});}};
