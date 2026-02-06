    //sns_link.js
    document.addEventListener('amica:rendered', () => {
    let out = document.getElementById('sns_ac');
    let ins = document.getElementById('insg');
    let twi = document.getElementById('twt');
    let yot = document.getElementById('yot');
    let lnk = document.getElementById('lnkin');

    ins.addEventListener('mouseover',function(){
        out.style.backgroundColor='beige';
        out.innerHTML="@jeshika.tom";
    });
    twi.addEventListener('mouseover',function(){
        out.style.backgroundColor='beige';
        out.innerHTML="@jeshika_tom";
    });
    yot.addEventListener('mouseover',function(){
        out.style.backgroundColor='beige';
        out.innerHTML="@jeshika_tom0815";
    });
    lnk.addEventListener('mouseover',function(){
        out.style.backgroundColor='beige';
        out.innerHTML="齊藤 巧海";
    });
    ins.addEventListener('mouseout',function(){
        out.style.backgroundColor='';
        out.innerHTML="";
    });
    twi.addEventListener('mouseout',function(){
        out.style.backgroundColor='';
        out.innerHTML="";
    });
    yot.addEventListener('mouseout',function(){
        out.style.backgroundColor='';
        out.innerHTML="";
    });
    lnk.addEventListener('mouseover',function(){
        out.style.backgroundColor='beige';
        out.innerHTML="";
    });

});