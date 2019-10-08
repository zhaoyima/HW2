
'use strict';

// IIFE
(function () {

    // Init data
    let data = [];

    // Fetch json data
    d3.json('/load_data', (d) => {

        return d;
    }).then((d) => {

        // Redefine data
        data = d['users'];

        createVis();
    }).catch((err) => {

        console.error(err);
    });


    // Function createVis

    function createVis() {

        // Get svg
        const svg = d3.select('#barChart');

        // Config
        const margin = {'top': 25, 'right': 54, 'bottom': 50, 'left': 10};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        // Set ageMap
        x.domain(data.map(function (d) {
            return d.Run;
        }));

        y.domain([0, d3.max(data, function (d) {
            return Number(d.Speed);
        })]);

        g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))


        // X Scale
        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.age })
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Histogram and bins
        var histogram = d3.histogram()
            .value(function(d) { return d.age; })
            .domain(x.domain())
            .thresholds(x.ticks(13));

        var bins = histogram(data);

        // Y Scale
        var y = d3.scaleLinear()
            .range([height, 0]);
            y.domain([0, d3.max(bins, function(d) { return d.length; })]);
            svg.append("g")
            .call(d3.axisLeft(y));
    

        // Config transition
        // Create bars
        // Create rects
        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#69b3a2")

        // Add y-label
        // Add x-label

	    svgContainer.selectAll(".text")
	        .data(data)
	        .enter()
	        .append("text")
	        .attr("class","label")
	        .attr("x", (function(d) { return xScale(d.age) + xScale.rangeBand() / 2 ; }  ))
	        .attr("y", function(d) { return yScale(d.lengh) + 1; })
	        .attr("dy", ".75em")
	        .text(function(d) { return d.length; });
  


    }


})();

