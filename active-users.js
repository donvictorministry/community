var DVActiveUsers={record:function(){if(sessionStorage.getItem('dv_au'))return Promise.resolve();try{sessionStorage.setItem('dv_au','1');}catch(e){}return DVAPI.call('stat',{ev:'online'});}};
