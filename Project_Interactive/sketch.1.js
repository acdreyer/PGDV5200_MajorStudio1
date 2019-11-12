


let xspacing = 20; // Distance between each horizontal location
// let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let phi = 3.14/2;
let amplitude = 40.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dots = 50;
let dx; // Value for incrementing x
let yvalues = []; // Using an array to store height values for the wave
let xarr = [];
const pi = 3.14;


function preload(){
	img = loadImage('../assets/transverse_flute.jpg');
	
}



function setup(){
	
		//   loadImage('../assets/transverse_flute.jpg', img => {
  //   image(img, 0, 0);
  // });
	
	
	var canvas = createCanvas(windowWidth/2, windowHeight/2);
	
	
	  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
	noStroke();
	
	dx = (pi*2 / period) * xspacing;
  
}







function draw(){
	background(0);
image(img, 0, 0,img.width / img.width*width, img.height / img.width*width);
	
	
	// determine flute bounding length
	
	let x0 = 0;
	let y0 = 50;
	let pos = [100,150];
	let leff = width;
	let w = width;
	let h = 5;
	
	let start = x0;
	let end = x0+w;
	




	
	
	
	
	
	
	
	// Assign wavelength to mouse position
	if ( mouseX <= 353.4 ) {
		leff = 353.4;
	}
	// else if (mouseX >= 678.4){leff = 678.4}
	else if (mouseX >= width){leff = width}
	else{
		leff = mouseX
		
	};
	
	fill("#ffffff00");
	stroke(255)
	// the actual mouse position
	ellipse(leff, 20, 20, 20);
	
	stroke(255)
	text(mouseX,100,100)
	
	fill(200);
	rect(x0,y0,leff,h);
	
	
	
	for (i=0; i<=100; i++){
		xarr[i] = map(i,0,100,0,width)
	}
	// print(xarr[100])
  // yvalues = new Array(floor(leff / xspacing));
	// print(yvalues)
	// wave
	  calcWave(xarr,leff);
  renderWave(xarr,leff);

	
	
}







// https://p5js.org/examples/math-sine-wave.html

function calcWave(x,lmax) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  // theta += 0.1;
  phi += 0.1;

  // For every x value, calculate a y value with sine function
  let angle = theta;
  for (let i = 0; i < x.length; i++) {
    angle = x[i]/lmax *pi;
    yvalues[i] = sin(angle) * amplitude*sin(phi);
  }
}

function renderWave(x,lmax) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let j = 0; j < (floor (xarr.length*lmax/width)); j++) {
    ellipse(xarr[j] , height / 3*2 + yvalues[j], 5, 5);
  }
}