// See http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
// for the original code. Reproduced without permission and then
// modified

// DONE: use more than just Chinese characters
// DONE: make the text scale to window's size, fixed 80 chars width
// DONE: discover how to change density/trail length/colours/speed
// TODO: more experiments around finding/changing display params
// TODO: make the parameters into variables so it is more easily
//       maintainable
// TODO: Can I change the fill fade so that it starts with a
//       different/bluer green before fading to greener green?
//         --> this might require two loops?


var c;
var ctx;
var font_size;
var drops;
var characters;

function init(){

    c = document.getElementById("c");
    ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

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
    // bigger is slower, originally 33
    setInterval(draw, 50);
}

function resize(){
    font_size = c.width / 80;  // originally 10;
    var columns = c.width/font_size; //number of columns for the rain
    //an array of drops - one per column
    drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++)
	      drops[x] = 1;
}

//drawing the characters
function draw()
{
	//Black BG for the canvas
	//translucent BG to show trail. smaller = longer trail,
        //originally 0.05
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
        var matrixGreen = "#0F5";
        var phospherGrn = "#F00";

	ctx.fillStyle = matrixGreen; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random character to print
		var text = characters[Math.floor(Math.random()*characters.length)];
		//var text= characters[i];
                //x = i*font_size, y = value of drops[i]*font_size

                //ctx.fillStyle = phospherGrn;
                ctx.fillText(text, i*font_size, drops[i]*font_size);

                //ctx.fillStyle = matrixGreen;
		//ctx.fillText(text, i*font_size, (drops[i]-1)*font_size);

		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops
		//scattered on the Y axis
                //bigger constant results in less dense
		//display. Original was 0.975
		if(drops[i]*font_size > c.height && Math.random() > 0.99)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i]++;
	}
}

window.onload = init;
window.addEventListener('resize', resize, false);
