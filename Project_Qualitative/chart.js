// Request the data
// d3.json('./data/data.json', function(err, response) {
d3.json('./prepareDataset/narrVizData_v1.json', function(err, response) {

	var svg, scenes, charactersMap, width, height, sceneWidth;
	// var fpath = './prepareDataset/downloads/'
	var fpath = './images/'

	// Get the data in the format we need to feed to d3.layout.narrative().scenes
	scenes = wrangle(response);

	console.dir(scenes);

	// Some defaults
	sceneWidth = 33;
	width = scenes.length * sceneWidth * 3;
	height = 905;
	labelSize = [100, 150];

	var lgndspace = 25;
	var lgndoffset = -40;
	var lgnddata =	[
				{ name: 'Name', 	affil: 'staffwpn',	y: height * 2 / 3 + lgndspace * 1 +lgndoffset },
				{ name: 'Poled Weapon', affil: 'staffwpn', y: height * 2 / 3 + lgndspace * 2 +lgndoffset },
				{ name: 'Helmet',	affil: 'helmet',	y: height * 2 / 3 + lgndspace * 3 +lgndoffset },
				{ name: 'Sword',	affil: 'other', 	y: height * 2 / 3 + lgndspace * 4 +lgndoffset },
				{ name: 'Gun',		affil: 'gun',		y: height * 2 / 3 + lgndspace * 5 +lgndoffset }
			];




	// Add the text for the axis
	d3.select('body')
		.append('svg')
		.attr('width', 400)
		.attr('height', 30)
		.append('text')
		.attr('class', 'textaxislegend')
		.attr('x', 0)
		.attr('y', 20)
		.text('Time: Quarter Centuries →');


	// The container element (this is the HTML fragment);
	svg = d3.select("body").append('svg')
		.attr('id', 'narrative-chart')
		.attr('width', width)
		.attr('height', height);

	// -----------------------------------------------------------











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
		.pathSpace(72) //space between images
		.groupMargin(200)
		.labelSize([50, 18])
		.scenePadding([20, sceneWidth / 2, 30, sceneWidth / 2])
		.labelPosition('left')
		.layout();



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




	d3.selectAll('#narrative-chart').data([null])
		.append('g').attr('class', 'legendbox2')
		.append('rect')
		.attr('x', 837)
		.attr('y', height* 0.12-20)
		.attr('width', 590)
		.attr('height', 62)
		.style('fill','rgba(96,96,96,0.7)');

	// add the box label

	d3.select('g.legendbox2').data([null])
		.append('text')
		.attr('x', 846)
		.attr('y', height * 0.12)
		// .attr('width', 230)
		// .attr('height', 200)
		.attr('class', 'categoryquestionbox')
		.text('♦ How did Medieval and Renaissance Arms and Armor compare?');
	d3.select('g.legendbox2').data([null])
		.append('text')
		.attr('x', 846)
		.attr('y', height * 0.12 +30)
		// .attr('width', 230)
		// .attr('height', 200)
		.attr('class', 'categoryquestionbox2')
		.text('♦ Which weapons existed when in the European context?');



	// ---------------------------------------------------------

	// // Draw the legend


	// create the box
	d3.selectAll('#narrative-chart').data([null])
		.append('g').attr('class', 'legendbox')
		.append('rect')
		.attr('x', 50)
		.attr('y', height * 2 / 3 +lgndoffset)
		.attr('width', 230)
		.attr('height', 150)

	// add the box label

	d3.select('g.legendbox').data([null])
		.append('text')
		.attr('x', 70)
		.attr('y', height * 2 / 3 + 25 +lgndoffset)
		// .attr('width', 230)
		// .attr('height', 200)
		.attr('class', 'categorylegendmain')
		.text('Item categories')

	// create the legend entries
	d3.selectAll('#narrative-chart').selectAll('g.legendbox')
	.data( lgnddata).enter().append('text')
		.attr('class',  function(d) {  return 'categorylegend ' + d.affil })
		.attr('x', 70)
		.attr('y', function(d) { return d.y + 5 })
		// .attr('width', 100)
		// .attr('height', 200)
		.text(function(d) { return d.name });

	// Draw the legend lines
	d3.selectAll('#narrative-chart').selectAll('g.legendbox')
	.data( lgnddata).enter().append('line')
		.attr('class', function(d) { return d.affil })
		.attr('x1', 180)
		.attr('y1', function(d) { return d.y  })
		.attr('x2', 250)
		.attr('y2', function(d) { return d.y  });





	//--------------------------------------------------------------

	// // Draw the outerbox
	svg
		.selectAll('rect2')
		.data([null])
		.enter()
		.append('rect')
		.attr('class', 'boundingbox')
		.attr('width', width)
		.attr('height', height)
	// .style('background', '0.5')	



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
			obj[i].appearances[ind].time = obj[i].images[ind].time; //assign time period

			let j = obj[i].images.findIndex(function(element) { //check the item
				return element.character == val.character.name;
			});

			obj[i].appearances[ind].imagename = obj[i].images[j].imagenames[0]; //add the filename

			if (obj[i].images[j].imagenames[0] == null) { //if filename empty, add from previous time range
				obj[i].appearances[ind].imagename = obj[i - 1].appearances[ind].imagename
			}

		})
	};

	// console.log(obj[0].appearances)
	// console.log(obj[0].images)

	// Make images less repetetive
	// for (let i = 1; i < obj.length; i++) {

	// 	obj[i].appearances.forEach(function(val, ind) {

	// 		let j = obj[i].images.findIndex(function(element) {		//check the item
	// 			return element.character == val.character.name;
	// 		});

	// 		if (obj[i].appearances[ind].imagename == obj[i-1].appearances[ind].imagename){
	// 			obj[i].appearances[ind].imagename
	// 		}

	// 		if (obj[i].images[j].imagenames[0] == null){	//if filename empty, add from previous time range
	// 		obj[i].appearances[ind].imagename = obj[i-1].appearances[ind].imagename
	// 		} 

	// 	})
	// };














	// -----------------------------------------------------------------------
	// do the drawing












	// 

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
		.attr('y', 50)
		.attr('x', sceneWidth * 0.5)
		.attr('rx', 0)
		.attr('ry', 0)

	// -----------------------------------------------------------

	// Draw the time legends
	// svg.selectAll('.periodtext').data(narrative.scenes()).enter()
	svg.selectAll('.periodtext').data(obj).enter()
		.append('text').attr('class', 'periodtext')
		.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x);
			y = 10 + 0 * Math.round(d.y);
			return 'translate(' + [x, y] + ')';
		})
		.attr('y', '10px')
		.attr('x', '-20px')
		.text(function(d) { return d.label });
		
			// Draw the time legends
	// svg.selectAll('.periodtext').data(narrative.scenes()).enter()
	svg.selectAll('.periodtext2').data(obj).enter()
		.append('text').attr('class', 'periodtext2')
		.attr('transform', function(d) {
			var x, y;
			x = Math.round(d.x);
			y = height -20 + 0 * Math.round(d.y);
			return 'translate(' + [x, y] + ')';
		})
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
			.attr('width', sceneWidth * 2)
			.attr('height', 400 * 0.15)
			// .attr('transform', 'rotate(90 0 0)')
			.attr('xlink:href', function(d) { return './prepareDataset/downloads/' + d.imagename })
			.append('svg:title').text(function(d){return d.character.name});
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
				x = Math.round(d.x);
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