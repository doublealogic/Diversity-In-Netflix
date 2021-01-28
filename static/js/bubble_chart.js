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

// Import Trakt API and IMDB API Data Here

function visualize(theData) {
    var selectedXAxis = "poverty";
    var selectedYAxis = "obesity";

    var xMin;
    var xMax;
    var yMin;
    var yMax;
  
    var toolTip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([40, -60])
      .html(function(d) {
        var theX;
        var theState = "<div>" + d.state + "</div>";
        var theY = "<div>" + selectedYAxis + ": " + d[selectedYAxis] + "%</div>";
        if (selectedXAxis === "poverty") {
          theX = "<div>" + selectedXAxis + ": " + d[selectedXAxis] + "%</div>";
        }
        else {
          theX = "<div>" +
          selectedXAxis +
            ": " +
            parseFloat(d[selectedXAxis]).toLocaleString("en") +
            "</div>";
        }
        return theState + theX + theY;
      });
    svg.call(toolTip);
  
    function xMinMax() {
      xMin = d3.min(theData, function(d) {
        return parseFloat(d[selectedXAxis]) * 0.90;
      });
  
      xMax = d3.max(theData, function(d) {
        return parseFloat(d[selectedXAxis]) * 1.10;
      });
    }
  
    function yMinMax() {
      yMin = d3.min(theData, function(d) {
        return parseFloat(d[selectedYAxis]) * 0.90;
      });
  
      yMax = d3.max(theData, function(d) {
        return parseFloat(d[selectedYAxis]) * 1.10;
      });
    }
  
    function labelChange(axis, clickedText) {
      d3
        .selectAll(".aText")
        .filter("." + axis)
        .filter(".active")
        .classed("active", false)
        .classed("inactive", true);
  
      clickedText.classed("inactive", false).classed("active", true);
    }
  
    xMinMax();
    yMinMax();
  
    var xScale = d3
      .scaleLinear()
      .domain([xMin, xMax])
      .range([margin + labelArea, width - margin]);
    var yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])

      .range([height - margin - labelArea, margin]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
  
    function tickCount() {
      if (width <= 500) {
        xAxis.ticks(5);
        yAxis.ticks(5);
      }
      else {
        xAxis.ticks(10);
        yAxis.ticks(10);
      }
    }
    tickCount();
  
    svg
      .append("g")
      .call(xAxis)
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
    svg
      .append("g")
      .call(yAxis)
      .attr("class", "yAxis")
      .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
  
    var theCircles = svg.selectAll("g theCircles").data(theData).enter();
  
    theCircles
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d[selectedXAxis]);
      })
      .attr("cy", function(d) {
        return yScale(d[selectedYAxis]);
      })
      .attr("r", circRadius)
      .attr("class", function(d) {
        return "stateCircle " + d.abbr;
      })
      // Hover rules
      .on("mouseover", function(d) {
        // Show the tooltip
        toolTip.show(d, this);
        // Highlight the state circle's border
        d3.select(this).style("stroke", "#323232");
      })
      .on("mouseout", function(d) {
        // Remove the tooltip
        toolTip.hide(d);
        // Remove highlight
        d3.select(this).style("stroke", "#e3e3e3");
      });
  
    theCircles
      .append("text")
      .text(function(d) {
        return d.abbr;
      })
      .attr("dx", function(d) {
        return xScale(d[selectedXAxis]);
      })
      .attr("dy", function(d) {
        return yScale(d[selectedYAxis]) + circRadius / 2.5;
      })
      .attr("font-size", circRadius)
      .attr("class", "stateText")

      // Hover Rules
      .on("mouseover", function(d) {
        toolTip.show(d);
        d3.select("." + d.abbr).style("stroke", "#323232");
      })
      .on("mouseout", function(d) {
        toolTip.hide(d);
        d3.select("." + d.abbr).style("stroke", "#e3e3e3");
      });
  
    // The following below makes the graph dynamic.
  
    // Select all axis text and add this d3 click event.
    d3.selectAll(".aText").on("click", function() {

      var self = d3.select(this);
  
      if (self.classed("inactive")) {
        var axis = self.attr("data-axis");
        var name = self.attr("data-name");
  
        // When x is the saved axis, execute this:
        if (axis === "x") {
            selectedXAxis = name;
  
          // Change the min and max of the x-axis
          xMinMax();
  
          // Update the domain of x.
          xScale.domain([xMin, xMax]);
  
          svg.select(".xAxis").transition().duration(300).call(xAxis);
  
          d3.selectAll("circle").each(function() {

            d3
              .select(this)
              .transition()
              .attr("cx", function(d) {
                return xScale(d[selectedXAxis]);
              })
              .duration(300);
          });
  
          d3.selectAll(".stateText").each(function() {
            d3
              .select(this)
              .transition()
              .attr("dx", function(d) {
                return xScale(d[selectedXAxis]);
              })
              .duration(300);
          });
  
          // Finally, change the classes of the last active label and the clicked label.
          labelChange(axis, self);
        }
        else {
          selectedYAxis = name;
  
          // Change the min and max of the y-axis.
          yMinMax();
  
          // Update the domain of y.
          yScale.domain([yMin, yMax]);
  
          // Update Y Axis
          svg.select(".yAxis").transition().duration(300).call(yAxis);
  
          d3.selectAll("circle").each(function() {

            d3
              .select(this)
              .transition()
              .attr("cy", function(d) {
                return yScale(d[selectedYAxis]);
              })
              .duration(300);
          });
  
          d3.selectAll(".stateText").each(function() {
            d3
              .select(this)
              .transition()
              .attr("dy", function(d) {
                return yScale(d[selectedYAxis]) + circRadius / 3;
              })
              .duration(300);
          });
  
          labelChange(axis, self);
        }
      }
    });
  
// Mobile Responsive Functionality
    d3.select(window).on("resize", resize);
  
    function resize() {
      width = parseInt(d3.select("#bubble").style("width"));
      height = width - width / 3.9;
      leftTxtY = (height + wordLabelArea) / 2 - wordLabelArea;
  
      svg.attr("width", width).attr("height", height);
  
      xScale.range([margin + wordLabelArea, width - margin]);
      yScale.range([height - margin - wordLabelArea, margin]);
  
      svg
        .select(".xAxis")
        .call(xAxis)
        .attr("transform", "translate(0," + (height - margin - wordLabelArea) + ")");
  
      svg.select(".yAxis").call(yAxis);
  
      // Update the ticks on each axis.
      tickCount();
  
      // Update the labels.
      xTextRefresh();
      yTextRefresh();
  
      // Updates each bubble's radius.
      bblGet();
  
      d3
        .selectAll("#bubble")
        .attr("cy", function(d) {
          return yScale(d[selectedYAxis]);
        })
        .attr("cx", function(d) {
          return xScale(d[selectedXAxis]);
        })
        .attr("r", function() {
          return bubbleRadius;
        });
  
      d3
        .selectAll(".stateText")
        .attr("dy", function(d) {
          return yScale(d[selectedYAxis]) + bubbleRadius / 3;
        })
        .attr("dx", function(d) {
          return xScale(d[selectedXAxis]);
        })
        .attr("r", bubbleRadius / 3);
    }
  }