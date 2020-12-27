const canvas = document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");

const CANVAS_SIZE=700;
const INITIAL_COLOR="black";

ctx.width=CANVAS_SIZE;
ctx.height=CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth=2.5;
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;

let painting = false;
let filling = false;

function startPainting(event){
    painting=true;
}

function stopPainting(){
    painting=false;
}

function onMouseMove(event){
    //console.log(event);
    const x =event.offsetX;
    const y =event.offsetY;
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

function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    //console.log(event.target.value);
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const img=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=img;
    link.download="downloadfile";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

Array.from(colors).forEach(color=>
    color.addEventListener("click",handleColorClick)
);
