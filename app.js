const canvas = document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");

ctx.width=700;
ctx.height=700;

ctx.strokeStyle="#2c2c2c";
ctx.lineWidth=1;

let painting = false;

function startPainting(event){
    painting=true;
}

function stopPainting(){
    painting=false;
}

function onMouseMove(event){
    console.log(event);
    const x =event.pageX;
    const y =event.pageY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
        //console.log("creating path in ",x,y);
    }else{
        //console.log("creating line in ",x,y);
        ctx.lineTo(x,y);
        ctx.stroke();
        //ctx.closePath();
    }
    //console.log(x,y)
}

function changeColor(event){
    console.log(event.target.style);
}
function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle=color;
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

Array.from(colors).forEach(color=>
    color.addEventListener("click",handleColorClick));
