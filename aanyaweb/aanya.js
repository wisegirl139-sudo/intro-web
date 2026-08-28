const starcont=document.body;
const starim= "img/star.png"
for(let i = 0;i<4;i++){
    const star=document.createElement("img");
    star.src=starim;
    star.classList.add("star");
    star.style.left="-50px";
    star.style.top=(20+i*4)+"%";
    star.style.animationDuration=(3+Math.random()*2)+"s";
    document.body.appendChild(star);
}