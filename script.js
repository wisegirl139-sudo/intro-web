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

window.addEventListener("resize",resizeCanvas);
resizeCanvas();

function draw(){
    ctx.clearRect(0,0,width,height);
    ctx.font='fontSize{px Courier New}';
    for (let stream of binary){
        for(let i=0; i,stream.length;i++){
            const ud=stream.ud-i*fontSize;
            ctx.fillText(
                Math.random()>0.5"0":"1",
                stream.x,
                ud
            )
        }
    }
}