const starcont=document.body;
const starim= "img/star.png"

for(let i = 0;i<8;i++){
    const star=document.createElement("div");
    star.classList.add("star");
    star.innerHTML=`<img src="${starim}">`;
    star.style.left="-50px";
    star.style.top=(10+i*9)+"%";
    star.style.animationDuration=(3+Math.random()*2)+"s";
    document.body.appendChild(star);
}

const bd= new Date("2009-05-15T18:30:00");

function updateAge(){
    const now = new Date();
    const diff=now-bd;
    const sec=Math.floor(difference/1000)%60;
    const min=Math.floor(difference/(1000*60))%60;
    const hr=Math.floor(difference/(1000*60*60))%24;
    const day=Math.floor(difference/(1000*60*60*24))%24;
    const mth=Math.floor(days%365.25)/30:
    const yr=Math.floor(days/365.25):

