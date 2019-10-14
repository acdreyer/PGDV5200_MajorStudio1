// Request the data
// d3.json('./data/data.json', function(err, response) {
d3.json('./prepareDataset/narrVizData.json', function(err, response) {
	
	var svg, scenes, charactersMap, width, height, sceneWidth;
	var fpath = './prepareDataset/downloads/'

	// Get the data in the format we need to feed to d3.layout.narrative().scenes
	scenes = wrangle(response);

// console.log(scenes);
	// Some defaults
	sceneWidth = 45;
	width = scenes.length * sceneWidth * 3;
	height = 700;
	labelSize = [150, 15];





	// The container element (this is the HTML fragment);
	svg = d3.select("body").append('svg')
		.attr('id', 'narrative-chart')
		.attr('width', width)
		.attr('height', height);

	// -----------------------------------------------------------
	// // Draw the outerbox
	svg
	.selectAll('rect')
		.data([null])
		.enter()
		.append('rect')
		.attr('class', 'boundingbox')
		.attr('width', width)
		.attr('height', height+10)
		.style('background','#c1c1c1');


	// Calculate the actual width of every character label.
	scenes.forEach(function(scene) {
		scene.characters.forEach(function(character) {
			character.width = svg.append('text')
				.attr('opacity', 0)
				.attr('class', 'temp')
				.text(character.name)
				.node().getComputedTextLength() + 10;
		});
	});

	// Remove all the temporary labels.
	svg.selectAll('text.temp').remove();

	// Do the layout
	narrative = d3.layout.narrative()
		.scenes(scenes)
		.size([width, height])
		.pathSpace(30)				//space between images
		.groupMargin(10)
		.labelSize([100, 18])
		.scenePadding([20, sceneWidth / 2, 20, sceneWidth / 2])
		.labelPosition('left')
		.layout();


// construct new dataset for the viz with images
var obj = narrative.scenes();
console.log(obj.length);
for (let i =0; i < obj.length; i++){
	obj[i].label = response.halfcentrs[i];
	obj[i].images = response.scnimages[i];
}
console.log(obj);



	// Get the extent so we can re-size the SVG appropriately.
	svg.attr('height', narrative.extent()[1]);






	// ------------------links
	// Draw links
	svg.selectAll('.link').data(narrative.links()).enter()
		.append('path')
		.attr('class', function(d) {
			return 'link ' + d.character.affiliation.toLowerCase();
		})
		.attr('d', narrative.link());



	// Draw the lines to divide times
	svg.selectAll('.periodlines').data(narrative.scenes()).enter()
		.append('g').attr('class', 'periodlines')
		.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x) ;//+ 0.5;
			// y = Math.round(d.y) + 0.5;
			y = 0;
			return 'translate(' + [x, y] + ')';
		})
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', 0)
		.attr('y2', height);





	// -----------------------------------------------------------
	// Draw the scenes
	svg.selectAll('.scene').data(narrative.scenes()).enter()
		.append('g').attr('class', 'scene')
		.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x) + 0.5;
			y = Math.round(d.y) + 0.5;
			return 'translate(' + [x, y] + ')';
		})
		// .append('rect')
		// .attr('width', sceneWidth*1.2)
		// .attr('height', function(d) {
		// 	return d.height*0.8;
		// })
		.attr('y', 10)
		.attr('x', -sceneWidth*0.5*0 )
		.attr('rx', 0)
		.attr('ry', 0)
	// .append('xlabel')
	// 	.attr('class','text')
	// 	.attr('y', '10px')
	// 	.attr('x', '-20px')
	// 	.text('Label test');

	// -----------------------------------------------------------











// console.log(narrative.scenes());

	// Draw the time legends
	// svg.selectAll('.periodtext').data(narrative.scenes()).enter()
	svg.selectAll('.periodtext').data(obj).enter()
		.append('text').attr('class', 'text')
		.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x)+25;
			y = 0*Math.round(d.y);
			return 'translate(' + [x, y] + ')';
		})
		// .append('rect')
		// .attr('width', sceneWidth * 2)
		// .attr('height', '12px')
		// .attr('y', 0)
		// .attr('x', -sceneWidth * 0.5)
		// .attr('class', 'text')
		.attr('y', '10px')
		.attr('x', '-20px')
		.text( function(d){ return d.label   }  );


	// -----------------------------------------------------------
























	// -----------------------------------------------------------
	// Draw appearances
	svg.selectAll('.scene').selectAll('.appearance').data(function(d){
		return d.appearances;
	}).enter().append('circle')
		.attr('cx', function(d){
			return d.x;
		})
		.attr('cy', function(d){
			return d.y;
		})
		.attr('r', function(){
			return 2;
		})
		.attr('class', function(d){
			return 'appearance ' + d.character.affiliation;
		});













	// Draw figures at time periods
	svg.selectAll('.scene').selectAll('.appearance2').data(function(d) {
		return d.appearances;
	}).enter().call(function(s) {
		var g, text;

		g = s.append('g').attr('class', 'label');

		g.append('svg:image')
			.attr('y', -30)
			.attr('x', -sceneWidth*0.5 )
			.attr('width', sceneWidth)
			.attr('height', 400 * 0.15)
			.attr('transform', 'rotate(90 0 0)')
			// .attr('xlink:href', './images/Image1.jpg');
			// .attr('xlink:href', './images/14.25.32_002dec2014.jpg');
			.attr('xlink:href', 'fff');
			// .text( function(d){ return d.images  } );



		text = g.append('g').attr('class', 'text');

		// Apppend two actual 'text' nodes to fake an 'outside' outline.
		text.append('text');
		text.append('text').attr('class', 'color')
		// .text(function(d){ return 'fpath' + d.images.imagenames[0]  })

		g.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x);
			y = Math.round(d.y);
			return 'translate(' + [x, y] + ')';
		});



	});







// ----------------------------------------------

	// Draw intro nodes
	svg.selectAll('.intro').data(narrative.introductions())
		.enter().call(function(s) {
			var g, text;

			g = s.append('g').attr('class', 'intro');

			// g.append('rect')
			// 	.attr('y', -4)
			// 	.attr('x', -4)
			// 	.attr('width', 4)
			// 	.attr('height', 8);

			// g.append('svg:image')
			// 	.attr('y', -30)
			// 	.attr('x', -10)
			// 	.attr('width', 225 * 0.15)
			// 	.attr('height', 400 * 0.15)
			// 	.attr('xlink:href', './images/Image1.jpg');


			text = g.append('g').attr('class', 'text');

			// Apppend two actual 'text' nodes to fake an 'outside' outline.
			text.append('text');
			text.append('text').attr('class', 'color');

			g.attr('transform', function(d) {
				var x, y;
				x = Math.round(d.x);
				y = Math.round(d.y);
				return 'translate(' + [x, y] + ')';
			});

			g.selectAll('text')
				.attr('text-anchor', 'end')
				.attr('y', '5px')
				.attr('x', '-20px')
				.text(function(d) { return d.character.name; });

			g.select('.color')
				.attr('class', function(d) {
					return 'color ' + d.character.affiliation;
				});

			g.select('rect')
				.attr('class', function(d) {
					return d.character.affiliation;
				});

		});

});

function wrangle(data) {

	var charactersMap = {};

	return data.scenes.map(function(scene) {
		return {
			characters: scene.map(function(id) {
				return characterById(id);
			}).filter(function(d) { return (d); })
		};
	});

	// Helper to get characters by ID from the raw data
	function characterById(id) {
		charactersMap = charactersMap || {};
		charactersMap[id] = charactersMap[id] || data.characters.find(function(character) {
			return character.id === id;
		});
		return charactersMap[id];
	}

}