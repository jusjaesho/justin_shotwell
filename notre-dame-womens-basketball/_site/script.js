var margin = {top: 40, right: 40, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom;

var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate("+margin.left+","+margin.top+")");

d3.csv("notre_dame_womens_basketball.csv", function(error, data) {

  console.log(data)

})

var font = "22px";

svg.append("text")
  .attr("x", 0)
  .attr("y", height + 20)
  .text("Losses")
  .attr("font-size", font)
  .attr("text-anchor","start")

svg.append("text")
  .attr("x", 0)
  .attr("y", -20)
  .text("Wins")
  .attr("font-size", font)
  .attr("text-anchor","start")
