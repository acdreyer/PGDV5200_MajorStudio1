let xspacing = 20; // Distance between each horizontal location
// let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let phi = 3.14 / 2;
let amplitude = 40.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
var dots = 40;
let dx; // Value for incrementing x
var yvalues = []; // Using an array to store height values for the wave
let xarr = [];
const pi = 3.14;
var h = 20;
var lrealmax = 660; //mm
// var lmax;
// var l1 = map(353.4,0,764,0,660);
// var l2 = map(353.4,0,764,0,660);
// var l3 = map(353.4,0,764,0,660);
// var l4 = map(353.4,0,764,0,660);
// var l5 = map(353.4,0,764,0,660);
// var l6 = map(353.4,0,764,0,660);
// var l7 = map(353.4,0,764,0,660);

function preload() {
	img = loadImage('./assets/transverse_flute.jpg');

}



function setup() {


	var canvas = createCanvas(windowWidth / 2, windowHeight / 2);


	// Move the canvas so it’s inside our <div id="sketch-holder">.
	canvas.parent('sketch-holder');
	noStroke();

	dx = (pi * 2 / period) * xspacing;
	var lmax = 764;
	
	var lrealmin = map(353.4, 0, lmax, 0, 660); // interpolate holes
	// print("leffmin " + lrealmin)

	// loadImage('./assets/transverse_flute.jpg', img => {
	//   image(img, 0, 0);
	// });

}







function draw() {
	background(0);
	image(img, 0, 0, img.width / img.width * width, img.height / img.width * width);

	var palette = Brewer.sequential('YlGnBu', Infinity, -100, 100)
	// determine flute bounding length

	let x0 = 0;
	let y0 = 100;
	let pos = [100, 150];
	let leff = width;
	let w = width;


	let start = x0;
	let end = x0 + w;












	// Assign wavelength to mouse position
	if (mouseX <= 353.4) {
		leff = 353.4;
	}
	// else if (mouseX >= 678.4){leff = 678.4}
	else if (mouseX >= width) { leff = width }
	else {
		leff = mouseX

	};

	fill("#ffffff00");
	stroke(255)
	// the actual mouse position
	ellipse(leff, 20, 20, 20);

	var leffreal = map(leff,0,width,0,lrealmax);
	stroke(255)
	fill(255)
	textAlign(RIGHT)
	strokeWeight(1); line(leff,100,leff,140)
	strokeWeight(0.5);
	text("Air column length: " + round(leffreal) + "mm", leff-5, 80)
	textAlign(LEFT)
	strokeWeight(1); line(0,100,0,140)
	strokeWeight(0.5);
	text("Approx. Frequency*: " + round(343/2/leffreal*1000) + "Hz", 5, 80)
	text("Air Pressure distribution: ", 10, 200)
	text("*Note: Frequency not shown in real time", 10, 500)
	// text(mouseY,100,120)








	// fill(200);
	// length bar
	// var color = palette.colorForValue(leff)
	// fill(color)
	// rect(x0,y0,leff,h);



	for (i = 0; i <= 100; i++) {
		xarr[i] = map(i, 0, 100, 0, width)
	}
	// print(xarr[100])
	// yvalues = new Array(floor(leff / xspacing));
	// print(yvalues)
	// wave


	calcpressWave(xarr, leff);
	renderWave(xarr, leff, palette);
	renderWaveLong(xarr, leff, h, palette);



}







// https://p5js.org/examples/math-sine-wave.html
// ------------------------------calculate waveform
function calcpressWave(x, lmax) {
	// Increment theta (try different values for
	// 'angular velocity' here)
	// theta += 0.1;
	phi += 0.2 * map(lmax, 353.4, width, 1 * width / 353.4, 1);

	// For every x value, calculate a y value with sine function
	let angle = theta;
	for (let i = 0; i < x.length; i++) {
		angle = x[i] / lmax * pi;
		yvalues[i] = sin(angle) * amplitude * sin(phi);
	}
}

// --------------------------------------------------------------
function renderWave(x, lmax, palette) {
	noStroke();
	fill(255);

	// A simple way to draw the wave with an ellipse at each location
	for (let j = 0; j < (floor(xarr.length * lmax / width)); j++) {

		var color = palette.colorForValue(yvalues[j])
		fill(color)

		ellipse(xarr[j], height / 3 * 2.5 + yvalues[j], 5, 5);
	}
}


// --------------------------------------------------------------
function renderWaveLong(x, lmax, wdth, palette) {
	noStroke();
	fill(255);

	// A simple way to draw the wave with an ellipse at each location
	for (let j = 0; j < (floor(xarr.length * lmax / width)); j++) {

		var color = palette.colorForValue(yvalues[j])
		fill(color)

		rect(xarr[j], 120, lmax / (dots+2), h);
	}
}











// var convert = function () {
// 	document.getElementById("result").innerHTML = 
// 		"<font face=\"Geneva, Arial, Helvetica, sans-serif\">" +
// 		frequencyToNote() + "</font>";
// }

// var frequencyToNote = function() {
// 	var input = Number(document.getElementById("frequency").value);
// 	if (isNaN(input) || (input == 0))
// 		return "<font color=\"red\">Enter a numerical value for frequency</font>";
// 	if ((input < 27.5) || (input > 14080))
// 		return "<font color=\"red\">Enter a frequency in the range 27.5Hz (A0) and 14080Hz (A9)</font>";

// 	var A4 = 440.0;
// 	var A4_INDEX = 57;

// 	var notes = [
// 		"C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
// 		"C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
// 		"C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
// 		"C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
// 		"C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
// 		"C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
// 		"C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
// 		"C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
// 		"C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8",
// 		"C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9", "G#9", "A9", "A#9", "B9"
// 	];

// 	var MINUS = 0;
// 	var PLUS = 1;

// 	var frequency;
// 	var r = Math.pow(2.0, 1.0 / 12.0);
// 	var cent = Math.pow(2.0, 1.0 / 1200.0);
// 	var r_index = 0;
// 	var cent_index = 0;
// 	var side;

// 	frequency = A4;

// 	if (input >= frequency) {
// 		while (input >= r * frequency) {
// 			frequency = r * frequency;
// 			r_index++;
// 		}
// 		while (input > cent * frequency) {
// 			frequency = cent * frequency;
// 			cent_index++;
// 		}
// 		if ((cent * frequency - input) < (input - frequency))
// 			cent_index++;
// 		if (cent_index > 50) {
// 			r_index++;
// 			cent_index = 100 - cent_index;
// 			if (cent_index != 0)
// 				side = MINUS;
// 			else
// 				side = PLUS;
// 		}
// 		else
// 			side = PLUS;
// 	}

// 	else {
// 		while (input <= frequency / r) {
// 			frequency = frequency / r;
// 			r_index--;
// 		}
// 		while (input < frequency / cent) {
// 			frequency = frequency / cent;
// 			cent_index++;
// 		}
// 		if ((input - frequency / cent) < (frequency - input))
// 			cent_index++;
// 		if (cent_index >= 50) {
// 			r_index--;
// 			cent_index = 100 - cent_index;
// 			side = PLUS;
// 		}
// 		else {
// 			if (cent_index != 0)
// 				side = MINUS;
// 			else
// 				side = PLUS;
// 		}
// 	}

// 	var result = notes[A4_INDEX + r_index];
// 	if (side == PLUS)
// 		result = result + " plus ";
// 	else
// 		result = result + " minus ";
// 	result = result + cent_index + " cents";
// 	return result;
// }