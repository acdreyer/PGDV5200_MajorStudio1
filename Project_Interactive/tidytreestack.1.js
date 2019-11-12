// d3.json('../data/aerophTree_test1.json', function(err, response) {
d3.json('../preparedata/data/aerophVizDataNestmod2_c.json', function(err, response) {

  if (err) { console.log(err) }
  else {

    var imagepath = "../preparedata/downloads/"


    console.log(response)

    var pubs = response;






    // var chartDiv = d3.select("#theTidyTreePage");
    // var svg = d3.select(chartDiv).append("svg");
    // Extract the width and height that was computed by CSS.
    var element = d3.select('#theTidyTreePage').node();
    thisheight = element.getBoundingClientRect().height;


    // -----------------------------------------------------
    var diameter = 600;


    var margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 0
      },
      width = diameter * 2,
      height = diameter;

    var i = 0,
      duration = 200,
      root;

    var tree = d3.layout.tree()
      .size([80, diameter / 2 - 80])
      .separation(function(a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      });

    var diagonal = d3.svg.diagonal.radial()
      .projection(function(d) {
        return [d.y, d.x / 180 * Math.PI];
      });

    // var addpict = d3.select("#theTidyTree").append("div")

    var svg = d3.select("#theTidyTree").append("svg")
      .attr("width","1500px")
      .attr("height", thisheight)
      .append("g")
      .attr("transform", "translate(" + diameter / 2 + "," + thisheight / 2 + ")rotate(50)");
    // .attr("transform", "rotate(45)translate(300,300)");

    console.log("The diameter is" + diameter)

    root = pubs;
    root.x0 = height / 2;
    root.y0 = 0;

    // root.children.forEach(collapse); // start with all children collapsed
    update(root);

    d3.select(self.frameElement).style("height", "600px");

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) {
        d.y = d.depth * 140;
      });

      // Update the nodes…
      var node = svg.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id = ++i);
        });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        // .attr("transform", function(d) { return "rotate(" + (d.x -45) + ")translate(" + d.y + ")"; })
        // .attr("transform", function(d) { return "rotate( 0 )translate(" + d.x + "," + d.y + ")"; })
        .on("click", click);


      nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) {
          return d._children ? "#444" : "#777";
        });


      nodeEnter.append("text")
        .attr("x", 12)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .attr("transform", function(d) {
          if (!d.x) {
            console.log("called");
            return "rotate(-50)";
          }
          else {
            return d.x < 180 ? "translate(0)" : "rotate(-50)translate(-" + (d.key.length * 8.5) + ")";
          }
        })
        .text(function(d) {

          if (d.materials) { return d.materials }
          else {
            return d.key;
          }


        })
        .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      // var nodeUpdate = node.transition()
      //   .duration(duration)
      //   .attr("transform", function(d) {
      //     return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
      //   })
      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
          if (!d.x) {
            console.log("called");
            return "rotate(-50)";
          }
          else {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
          }
        });



      nodeUpdate.select("circle")
        .attr("r", 8)
        .style("fill", function(d) {
          return d._children ? "#333" : "#fff";
        });


      nodeUpdate.select("text")
        .style("fill-opacity", 1)
        .style("font-style", function(d) {
          return d._children ? "normal" : "italic";
        })
        .attr("transform", function(d) {

          if (!d.x) {
            return "rotate(0)"
          }
          else {
            return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.key.length + 50) + ")";
          }
        });

      // TODO: appropriate transform
      var nodeExit = node.exit().transition()
        .duration(duration)
        // .attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
        .remove();

      nodeExit.select("circle")
        // .attr("r", 1e-6);
        .attr("r", 15);
      nodeExit.select("circle")
        .style("stroke", "#000");

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);



      // Update the links…
      var linkpath = svg.selectAll("path.linkpath")
        .data(links, function(d) {
          return d.target.id;
        });

      // Enter any new links at the parent's previous position.
      linkpath.enter().insert("path", "g")
        .attr("class", "linkpath")
        .attr("d", function(d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        });

      // Transition links to their new position.
      linkpath.transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      linkpath.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }


    // Toggle children on click.
    // function click(d) {
    //   if (d.children) {
    //     d._children = d.children;
    //     d.children = null;
    //   } else {
    //     d.children = d._children;
    //     d._children = null;
    //   }

    //   update(d);
    // }










    //     	svg.selectAll('.scene').selectAll('.appearanceimg').data(
    // 		function(obj) { return obj.appearances; }
    // 	).enter().call(function(s) {
    // 		var d, g, text;

    // 		// d = obj.appearances;

    // 		g = s.append('g').attr('class', function(d) {
    // 			return 'appearanceimg image ' + d.character.affiliation;
    // 		});
    // 		//===================================================================
    // 		g.append('svg:image')
    // 			.attr('y', -25)
    // 			.attr('x', -sceneWidth * 0.5)
    // 			.attr('width', sceneWidth * 2)
    // 			.attr('height', 400 * 0.15)
    // 			// .attr('transform', 'rotate(90 0 0)')
    // 			.attr('xlink:href', function(d) { return './prepareDataset/downloads/' + d.imagename })
    // 			.append('svg:title').text(function(d){return d.character.name});
    // 		//===================================================================














    // https://stackoverflow.com/questions/19167890/d3-js-tree-layout-collapsing-other-nodes-when-expanding-one?rq=1
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      }
      else {
        d.children = d._children;
        d._children = null;
      }
      
      // add image to gallery
      if (d.filename) {
        d3.select('#theTidyTreeImage')
          .append('img')
          .attr('class', 'picturegraph')
          // .style('width','100%')
          .style('height','200px')
          .attr('src',  imagepath + d.filename );
          // .attr('href', d.objectURL   );

        d3.select('#theTidyTreeImagetext')
          .append('p')
          .append('text')
          .attr("font-size","10px")
          .text( "Name: " +  d.name + "\nCountry: " +  d.country + "\nMaterials: " +  d.materials     );
      }
      
      
      // If the node has a parent, then collapse its child nodes except for this clicked node.
      if (d.parent && d.children) {
        d.parent.children.forEach(function(element) {
          if (d !== element) {
            collapse(element);
          }
        });
      }
      update(d);
    }


    // Collapse nodes
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }


  } //if
}) //json read