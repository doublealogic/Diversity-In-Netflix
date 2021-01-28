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

// Sets up the radius for each bubble in the graph.
var bubbleRadius;
function bblGet() {
    if (width <= 530) {
        bubbleRadius = 5;
    }
    else {
        bubbleRadius = 10;
    }
}
bblGet();

// Axes Labels

// Creates group element to nest the bottom axis labels
svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

let botTxtX = (width - wordLabelArea) / 2 + wordLabelArea;
let botTxtY = (height - margin - txtPadBottom);

function xTextRefresh() {
    xText.attr(
        "transform",
        "translate(" +
            botTxtX + ", " + botTxtY + ")"
    );
}
xTextRefresh();

let leftTxtX = margin + txtPadBottom;
let leftTxtY = (height + wordLabelArea) / 2 - wordLabelArea;

function yTextRefresh() {
    yText.attr(
        "transform",
        "translate(" + leftTxtX + ", " + leftTxtY + ")rotate(-90)"
    );
  }
  yTextRefresh();