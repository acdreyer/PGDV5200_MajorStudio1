// Request the data
// d3.json('./data/data.json', function(err, response) {
d3.json('./prepareDataset/narrVizData.json', function(err, response) {

	var svg, scenes, charactersMap, width, height, sceneWidth;
	// var fpath = './prepareDataset/downloads/'
	var fpath = './images/'

	// Get the data in the format we need to feed to d3.layout.narrative().scenes
	scenes = wrangle(response);

	console.dir(scenes);

	// Some defaults
	sceneWidth = 33;
	width = scenes.length * sceneWidth * 3;
	height =900;
	labelSize = [200, 150];


// Add the text for the legend
		d3.select('body')		
		.append('svg')
		.attr('width', 400)
		.attr('height', 30)
		.append('text')
		.attr('class', 'textaxislegend')
		.attr('x', 0)
		.attr('y',20)
		.text('Time: Quarter centuries');


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
		.attr('height', height )
		.style('background', '#c1c1c1')
		

		
		


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
		.pathSpace(60) //space between images
		.groupMargin(200)
		.labelSize([50, 18])
		.scenePadding([20, sceneWidth / 2, 20, sceneWidth / 2])
		.labelPosition('left')
		.layout();




	// ------------------------------------------------------------------------

	// construct new dataset for the viz with images
	try {
		var obj = narrative.scenes();
		console.log(obj.length);
		console.log(obj);
		for (let i = 0; i < obj.length; i++) {
			obj[i].label = response.halfcentrs[i];
			obj[i].images = response.scnimages[i];
		}
	}
	catch (err) { console.log(err) };


// Match the object names in each scene with the image filenames
	for (let i = 0; i < obj.length; i++) {

		obj[i].appearances.forEach(function(val, ind) {
			obj[i].appearances[ind].time = obj[i].images[ind].time;		//assign time period

			let j = obj[i].images.findIndex(function(element) {		//check the item
				return element.character == val.character.name;
			});
			
			obj[i].appearances[ind].imagename = obj[i].images[j].imagenames[0]; //add the filename
			
			
			if (obj[i].images[j].imagenames[0] == null){	//if filename empty, add from previous time range
			obj[i].appearances[ind].imagename = obj[i-1].appearances[ind].imagename
			} 
			
		})
	};

	// console.log(obj[0].appearances)
	// console.log(obj[0].images)















	// -----------------------------------------------------------------------
	// do the drawing


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
			x = Math.round(d.x); //+ 0.5;
			// y = Math.round(d.y) + 0.5;
			y = 0;
			return 'translate(' + [x, y] + ')';
		})
		.append('line')
		.attr('x1', sceneWidth)
		.attr('y1', 0)
		.attr('x2', sceneWidth)
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
		// .attr('width', sceneWidth*2)
		// .attr('height', function(d) {
		// 	return d.height*0.8;
		// })
		.attr('y', 20)
		.attr('x', sceneWidth * 0.5 )
		.attr('rx', 0)
		.attr('ry', 0)

	// -----------------------------------------------------------

	// Draw the time legends
	// svg.selectAll('.periodtext').data(narrative.scenes()).enter()
	svg.selectAll('.periodtext').data(obj).enter()
		.append('text').attr('class', 'periodtext')
		.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x) ;
			y = 10 + 0 * Math.round(d.y);
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
		.text(function(d) { return d.label });

	// -----------------------------------------------------------
























	// -----------------------------------------------------------
	// Draw appearances
	svg.selectAll('.scene').selectAll('.appearance').data(function(d) {
			return d.appearances;
		}).enter().append('circle')
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		})
		.attr('r', function() {
			return 0.5;
		})
		.attr('class', function(d) {
			return 'appearance ' + d.character.affiliation;
		});





	// console.log('**********')
	// console.dir(obj[10].appearances)
	// console.dir(obj[10].images)
	// console.log('**********')

	// Draw figures at time periods
	// Since figures are added after the fact, split these into two different sections.
	// The 2nd time around selecting add the correct figure names. It would be nice
	// in future to structure data by merging both into one.

	// First create the images
	svg.selectAll('.scene').selectAll('.appearanceimg').data(
		function(obj) { return obj.appearances; }
	).enter().call(function(s) {
		var d, g, text;

		// d = obj.appearances;

		g = s.append('g').attr('class', function(d) {
			return 'appearanceimg image ' + d.character.affiliation;
		});
//===================================================================
		g.append('svg:image')
			.attr('y', -25)
			.attr('x', -sceneWidth * 0.5)
			.attr('width', sceneWidth*2)
			.attr('height', 400 * 0.15)
			// .attr('transform', 'rotate(90 0 0)')
			.attr('xlink:href', function(d) { return './prepareDataset/downloads/' + d.imagename }); 
//===================================================================

		g.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x);
			y = Math.round(d.y);
			return 'translate(' + [x, y] + ')';
		});
		
		// g.append('rect')
		// 	.attr('y', -25)
		// 	.attr('x', -sceneWidth * 0.5)
		// 	.attr('width', sceneWidth*2)
		// 	.attr('height', 400 * 0.15)
		// 	.attr('class', noappear)
		// 	.attr('stroke', 'none' )

		// text = g.append('g').attr('class', 'text');
		// g.append('text').attr('class', 'color')
		// .text('as'
		// function(d) {return d.character.id;}
		// );
	});

	// // use for debugging filenames
	// svg.selectAll('.scene').selectAll('.appearanceimg').data(
	// 		function(obj) { return obj.appearances; }
	// 	).append('text').attr('class', 'addedcolor')
	// 	.text(function(d) {
	// 		return d.imagename
	// 	});








	// ---------------------------------------------------------------------------
	// ---------------------------------------------------------------------------

	// console.log(narrative.introductions())
	// Draw intro nodes
	svg.selectAll('.intro').data(narrative.introductions())
		.enter().call(function(s) {
			var g, text;

			g = s.append('g').attr('class', 'intro');

			g.append('rect')
				.attr('y', -4)
				.attr('x', -4)
				.attr('width', 4)
				.attr('height', 8);

			text = g.append('g').attr('class', 'text');

			// Apppend two actual 'text' nodes to fake an 'outside' outline.
			text.append('text');
			text.append('text').attr('class', 'color');

			g.attr('transform', function(d) {
				var x, y;
				x = Math.round(d.x) ;
				y = Math.round(d.y);
				return 'translate(' + [x, y] + ')';
			});

			g.selectAll('text')
				.attr('text-anchor', 'end')
				.attr('y', '20px')
				.attr('x', '20px')
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



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------




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