// "Pick-up sticks"
//
// This is just a finger exercise to play with Javascript/HTML5 canvas. An old
// BASIC screen hack, similar to:
//
// 10 PRINT "Hello"
// 20 GOTO 10
//
// It draws random lines in random colours. I hacked it on my old Amstrad CPC
// 6128 in the mid 1980s. Things were much simpler back then, just 6 lines of
// code:
//
// 10 CLS
// 20 WHILE 1>0
// 30   GRAPHICS PEN 15*RND
// 40   MOVE 640*RND,400*RND
// 50   DRAW 640*RND,400*RND
// 60 WEND
//
// The default colours on the CPC are yellow on blue, so
// that is why it has a blue background.
//
// The fading idea is something new, as is the "TURBO" to speed up the line
// drawing: on the original 8-bit computer I just let it run flat out, but for
// the browser I want the redraws to be less frequent to be nicer in a
// multitasking environment.
//

var c;
var ctx;
var fade=false;

var DRAW_INTERVAL   = 30; // msec between repaints
var DRAW_BACKGROUND = "rgba(0,0,255,0.01)";
var DRAW_TURBO      = 20;

function init(){
    c = document.getElementById("c");
    ctx = c.getContext("2d");

    resize();
    setInterval(draw, DRAW_INTERVAL);
}

function resize(){
    //adjust the canvas to fill the window
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    //Also clears the context. The background canvas colour is determined by the
    //CSS, so no need to fillRect here.
}

function toggleFade() {
    fade = !fade;
}

function draw(){
    if (fade){
        ctx.fillStyle = DRAW_BACKGROUND;
        ctx.fillRect(0,0,c.width,c.height);
    }
    for(var i = 0; i < DRAW_TURBO; i++){
        ctx.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
        ctx.beginPath();
        ctx.moveTo(c.width * Math.random(), c.height * Math.random());
        ctx.lineTo(c.width * Math.random(), c.height * Math.random());
        ctx.stroke();
    }
}

window.onload = init;
window.addEventListener('resize', resize, false);
