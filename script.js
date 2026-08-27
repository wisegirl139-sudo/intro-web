const canvas = document.getElementById("hack");
const ctx=canvas.getContext("2d");
let width;
let height;
const binary =[];
const fontSize=25;
let frameCount=0;

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
            length:5+Math.floor(Math.random()*15),
            chars:[]
        });
        const stream=binary[binary.length-1];
        for(let j=0;j<stream.length;j++){
            stream.chars.push(
                Math.random()>0.5?"0":"1"
            );
        }
    }
}
function draw(){
    frameCount++;
    ctx.clearRect(0,0,width,height);
    ctx.font=`${fontSize}px "Courier New",monospace`;
    for (let stream of binary){
        for(let i=0; i<stream.length;i++){
            const ud=stream.ud-i*fontSize;
            ctx.fillStyle="chartreuse";
            ctx.fillText(
            stream.chars[i],
            stream.x,
            ud,
            )            
            if (frameCount %10===0){
                stream.chars[i]=Math.random()>0.5?"0":"1"
            } 
        }
        stream.ud+=stream.speed;
        if(stream.ud>height+stream.length*fontSize){
            console.log("reset")
            stream.ud=-stream.length*fontSize;
        }
    }
    requestAnimationFrame(draw);
}
window.addEventListener("resize",resizeCanvas);
resizeCanvas();

draw();

