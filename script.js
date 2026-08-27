const canvas = document.getElementById("hack");
const ctx=canvas.getContext("2d");
let width;
let height;
const binary =[];
const fontSize=20;


function resizeCanvas(){
    width=canvas.width=window.innerWidth;
    height=canvas.height=window.innerHeight;
    binary.length=0;
    const columns=Math.floor(width/fontSize);
    for(let i=0;i<columns;i++){
        binary.push({
            x:i*fontSize,
            ud:Math.random()*height,
            speed:2+Math.random()*3,
            length:5+Math.floor(Math.random()*15)
        });
    }
}
function draw(){
    ctx.clearRect(0,0,width,height);
    ctx.font=`${fontSize}px "Courier New",monospace`;
    for (let stream of binary){
        for(let i=0; i<stream.length;i++){
            const ud=stream.ud-i*fontSize;
            ctx.fillStyle="chartreuse";
            ctx.fillText(
                Math.random()>0.5?"0":"1",
                stream.x,
                ud
            )
        }
        stream.ud+=stream.speed;
        if(stream.ud>height+stream.length*fontSize.height){
            console.log("reset")
            stream.ud=-stream.length*fontSize;
        }
    }
    requestAnimationFrame(draw);
}
window.addEventListener("resize",resizeCanvas);
resizeCanvas();

draw();

