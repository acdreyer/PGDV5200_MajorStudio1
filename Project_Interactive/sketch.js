


let xspacing = 16; // Distance between each horizontal location
// let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 40.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave



function setup(){
	var canvas = createCanvas(windowWidth/2, windowHeight/3*2);
	  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
	noStroke();
	
	
	
	
	// wave
	
	  //w = width + 16;
  dx = (3.14*2 / period) * xspacing;
  yvalues = new Array(floor(width / xspacing));
  
  
}







function draw(){
	background(255);

	let x = 50;
	let y = 30;

	let w = width-100;
	let h = 20;

	fill(200);
	rect(x,y, w, h);
	


	fill(0);
	// the actual mouse position
	ellipse(mouseX, 0, 20, 20);
	// the mapped mouse position
	ellipse(
		map(mouseX,0, width,x,w+x),
		y,
		// Make this also map to the Y position
		20,
		20
	)
	
	
	
	
	// wave
	  calcWave();
  renderWave();

	
	
}







// https://p5js.org/examples/math-sine-wave.html

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(0);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 3*2 + yvalues[x], 5, 5);
  }
}