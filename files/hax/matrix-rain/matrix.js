// See http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
// for the original code. Reproduced without permission and then
// modified

// DONE: use more than just Chinese characters
// DONE: make the text scale to window's size, fixed 80 chars width
// DONE: discover how to change density/trail length/colours/speed
// DONE: more experiments around finding/changing display params
// DONE: make the parameters into variables so it is more easily
//       maintainable
// DONE: Can I change the fill fade so that it starts with a
//       different/bluer green before fading to greener green?
//         --> this might require drops[] to store the previous character as
//             well as the position, and then:
//               1. overdraw position-1 with previous saved char, in fade colour
//               2. draw position with new random char, in bluer colour
//               3. save the new char to the drop, increment position

var c;
var ctx;
var font_size;
var drops;
var characters;

//tweakable params
var DRAW_INTERVAL     = 42;  // bigger is slower, originally 33
var DRAW_COLUMNS      = 80;  // originally 10
var DRAW_FADE_ALPHA   = "rgba(0, 0, 0, 0.05)";  //smaller α = longer trail, originally 0.05
var DRAW_DENSITY      = 0.98;  //bigger = less dense display, originally 0.975
var DRAW_FONT         = "arial";
var DRAW_MATRIX_GREEN = "#7FF";
var DRAW_PHOSPHER_GRN = "#0C3";

function init(){
    c = document.getElementById("c");
    ctx = c.getContext("2d");

    //matrix characters - taken from the unicode charsets of a few real languages
    var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    var japanese = "あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゆよらりるれろわゐゑをんアイウエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤユヨラリルレロワヰヱヲンヴヵヶ";
    var english = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var greek = "ͰͲͶΆΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϢϤϦϨϪϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿ";
    var numbers = "0123456789";

    characters = chinese.concat(japanese, english, greek, numbers);

    //convert the string into an array of single characters
    characters = characters.split("");

    resize();
    setInterval(draw, DRAW_INTERVAL);
}

function resize(){
    //make the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    font_size = c.width / DRAW_COLUMNS;
    ctx.font = font_size + "px " + DRAW_FONT;

    var columns = c.width/font_size; //number of columns for the rain
    drops = [];                  //an array of drops - one per column
    for(var i = 0; i < columns; i++)
        drops[i] = {pos: c.height*Math.random(), char: " "};
}

//draw the code rain
function draw(){
    ctx.fillStyle = DRAW_FADE_ALPHA;
    ctx.fillRect(0, 0, c.width, c.height);

    for(var i = 0; i < drops.length; i++){
        //draw over the phosphor glow in prev character
        ctx.fillStyle = DRAW_PHOSPHER_GRN;
        ctx.fillText(drops[i].char, i*font_size, (drops[i].pos*font_size)-font_size);

        //a random character to draw
        drops[i].char = characters[Math.floor(Math.random()*characters.length)];

        //draw new character at current position
        ctx.fillStyle = DRAW_MATRIX_GREEN;
        ctx.fillText(drops[i].char, i*font_size, drops[i].pos*font_size);

        drops[i].pos++;

        //After the drop has crossed the bottom of the screen, send it back to
        //the top. Adding random chance affects how quickly the drop returns
        //(density of drops on screen) and scatters then on the Y axis
        if(drops[i].pos*font_size > c.height && Math.random() > DRAW_DENSITY)
            drops[i].pos = 0;
    }
}

window.onload = init;
window.addEventListener('resize', resize, false);
