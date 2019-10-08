

'use strict';

// IIFE
(function () {

    // Init data
    let data = [];

    // Fetch json data
    d3.json('/load_data', (d) => {

        // Parse
        return d.forEach(function (d) {
            d.experience_yr = +d.experience_yr;
            d.hw1_hrs = +d.hw1_hrs;
            d.age = +d.age;
        })
    }).then((d) => {

        // Redefine data
        data = d;

        createVis();


    }).catch((err) => {

        console.error(err);
    });

   
    function createVis() {

        // Get svg
        const svg = d3.select('#scatter');

        // Config
        const margin = {'top': 25, 'right': 30, 'bottom': 50, 'left': 64};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        //  Scales
        const scX = d3.scaleLinear()
            .domain(d3.extent(data, (d) => {
                return d.experience_yr;
            })).nice()
            .range([0, width]);

        const scY = d3.scaleLinear()
            .domain(d3.extent(data, (d) => {
                return d.hw1_hrs;
            })).nice()
            .range([height, 0]);

        const scRad = d3.scaleSqrt()
            .domain(d3.extent(data, (d) => {
                return d.age;
            })).nice()
            .range([2, 5]);


        // Config bubbles
        const radius = 10;

        // Generate bubbles
        const bubbles = container.selectAll('.bubble')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr('r', d => {
                return scRad(d.age);
            })
            .attr('cx', d => {
                return scX(d.experience_yr);
            })
            .attr('cy', d => {
                return scY(d.hw1_hrs);
            })
            .attr('fill', 'rgba(0, 0, 0, 0.75)');
        

        // Generate x- and y-axis
        // Build xAxis
        const xAxis = d3.axisBottom()
            .scale(scX)
            .ticks(2);

        // Config xAxis
        const xAxisPadding = 20;

        // Append xAxis
        container.append('g')
            .style('transform', `translate(0, ${containerH + xAxisPadding}px)`)
            .call(xAxis);
        
        // Build yAxis
        const yAxis = d3.axisLeft()
            .scale(scY)
            .ticks(3);

        // Config yAxis
        const yAxisPadding = -20;

        // Append yAxis
        container.append('g')
            .style('transform', `translate(${yAxisPadding}px, 0)`)
            .call(yAxis);

        // Set xLabel and yLabel
                // Config xLabel
        const xLabelPadding = 55;

        // Append xLabel
        const xLabel = container.append('g')
            .style('transform', `translate(${containerW / 2}px, ${containerH + xLabelPadding}px`)
            .append('text')
            .text('Experience')
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px');

        // Config yLabel
        const yLabelPadding = -55;

        // Append yLabel
        const yLabel = container.append('g')
            .style('transform', `rotate(270deg) translate(${-containerH / 2}px, ${yLabelPadding}px)`)
            .append('text')
            .text('HW1 Hours')
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px');
        

    }

})();


