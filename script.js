const canvas = document.getElementById("hack");
const ctx=canvas.getContext("2d");
let width;
let height;
const binary =[];
const fontSize=16;

function resizeCanvas(){
    width=canvas.width=window.innerWidth;
    height=canvas.height=window.innerHeight;
    binary.length=0;
    const columns=Math.floor(width/fontSize);
    for(let i=0;i,columns;i++){
        binary.push({
            x:i*fontSize,
            y:Math.random()*height,
            speed:1+Math.random()*2,
            length:5+Math.floor(Math.random()*15)
        });
    }
}