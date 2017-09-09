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
var DRAW_INTERVAL = 42; // bigger is slower, originally 33
var DRAW_COLUMNS = 80;  //originally 10
var DRAW_FADE_ALPHA = "rgba(0, 0, 0, 0.05)";  //Black BG for the canvas translucent BG to show trail. smaller = longer trail, originally 0.05
var DRAW_DENSITY = 0.98;  //bigger constant results in less dense display. Original was 0.975
var DRAW_FONT = "arial";
var DRAW_MATRIX_GREEN = "#7FF";
var DRAW_PHOSPHER_GRN = "#0C3";

function init(){

    c = document.getElementById("c");
    ctx = c.getContext("2d");

    //matrix characters - taken from the unicode charsets of a few real languages
    var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    var japanese = "あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゆよらりるれろわゐゑをんアイウエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤユヨラリルレロワヰヱヲンヴヵヶ";
    var english = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var greek = "ͰͲͶ͹΂΃Ά΋ΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϢϤϦϨϪϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿ";
    var numbers = "0123456789";

    characters = chinese.concat(japanese, english, greek, numbers);

    //converting the string into an array of single characters
    characters = characters.split("");

    resize();
    setInterval(draw, DRAW_INTERVAL);
}

function resize(){
    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    font_size = c.width / DRAW_COLUMNS;
    var columns = c.width/font_size; //number of columns for the rain
    //an array of drops - one per column
    drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++)
        drops[x] = {pos: c.height*Math.random(), char: " "};
}

//drawing the characters
function draw()
{

    ctx.fillStyle = DRAW_FADE_ALPHA;
    ctx.fillRect(0, 0, c.width, c.height);
    var matrixGreen = DRAW_MATRIX_GREEN;
    var phospherGrn = DRAW_PHOSPHER_GRN;

    ctx.fillStyle = matrixGreen; //green text
    ctx.font = font_size + "px " + DRAW_FONT;
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
        //Draw over the phosphor glow in prev character
        ctx.fillStyle = phospherGrn;
        ctx.fillText(drops[i].char, i*font_size, (drops[i].pos*font_size)-font_size);

        //a random character to print
        drops[i].char = characters[Math.floor(Math.random()*characters.length)];

        //draw new character at current position
        ctx.fillStyle = matrixGreen;
        ctx.fillText(drops[i].char, i*font_size, drops[i].pos*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //to make the drops scattered on the Y axis
        if(drops[i].pos*font_size > c.height && Math.random() > DRAW_DENSITY)
            drops[i].pos = 0;

        //incrementing Y coordinate
        drops[i].pos++;
    }
}

window.onload = init;
window.addEventListener('resize', resize, false);
