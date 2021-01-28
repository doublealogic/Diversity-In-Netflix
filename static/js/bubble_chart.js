// D3 Animated Bubble Plot

// Plot Setup

// Grabs width of the box container
var width = parseInt(d3.select("#bubble").style("width"));

// Determines height of the graph
var height = width - width / 3.9;

// Defines margin spacing for graph
var margin = 20;

// Placeholder for word labels
var wordLabelArea = 110;

// Adds padding for bottom and left axes label texts
var txtPadBottom = 40;
var txtPadLeft = 40;

// Creates graph canvas
var svg = d3
    .select("#bubble")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");