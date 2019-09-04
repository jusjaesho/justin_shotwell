var margin = {top: 40, right: 40, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom;

var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate("+margin.left+","+margin.top+")");

d3.csv("notre_dame_womens_basketball.csv", function(error, data) {

  data.forEach(function(d) {
        d.diff = +d.diff;
        d.game = +d.game;
        d.season_num = +d.season_num;
        d.win = 0;
    })//data.forEach

    //// Find the unique season number(season_num) ////

    var years = d3.set(data.map(function(d) { return d.season_num; })).values();

    for (var i = 0; i < years.length; i++) {
        years[i] = +years[i]
    };

    for (var i = 0; i < years.length; i++) {

      var w = 0;
      var l = 0;

      for (var j = 0; j < data.length; j++) {

        if (years[i] == data[j].season_num) {

          if (data[j].result == "w") {
            w++
            data[j].win = w
          } else {
            l++
            data[j].loss = l
          }
        }
      }
    }

    for (var i = 0; i < data.length; i++) {

      if (data[i].win == 0) {
        data[i].level = -data[i].loss
      }
      else {
        data[i].level = data[i].win
      }

      data[i].id = data[i].opponent.split(' ').join('_')

    }

    var r = width / (years.length) / 4.5;
    var green = "#00843D"; // Notre Dame Green
    var red = "#990000"; // USC Garbage Red

    var x = d3.scaleLinear()
      .range([20, width - 20])
      .domain(d3.extent(data, function(d) {return d.season_num;} ))

    var y = d3.scaleLinear()
      .range([height - 20, 20])
      .domain(d3.extent(data, function(d) {return d.level;} ))

    var circle = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("stroke", "black")
      .attr("fill", function(d) {
        if (d.level > 0) {
          return green;
        } else {
          return red
        }
        })
      .attr("class", d => d.id)
      .attr("cx", d => x(d.season_num))
      .attr("cy", d => y(d.level))
      .attr("r", r)
      .attr("opacity", 1)


  circle.on("mouseover", function(d) {

    var thisClass = d3.select(this).attr("class")

    d3.select("#team")
        .text(d.opponent)
        .transition()
        .style("opacity", 1);

    d3.selectAll("circle")
      .attr("opacity", 0.3)
    d3.selectAll("." + thisClass)
      .attr("opacity", 1)
      .attr("fill", function(d) {
      if (d.level > 0) {
        return green;
      } else {
        return red;
      }})
      .attr("r", r)

  })

  circle.on("mouseout", function(d) {

    circle.attr("opacity", 1)
          .attr("fill", function(d) {
      if (d.level > 0) {
        return green;
      } else {
        return red
      }
    })
          .attr("r", r)

     d3.select("#team")
        .transition()
        .style("opacity", 0);

  })

  svg.append("text")
    .attr("id", "team")
    .attr("x", width / 2)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .style("font-size", "50px")
    .style("fill", "#555");

  svg.append("line")
    .attr("x1", 10)
    .attr("x2", width - 10)
    .attr("y1", y(0))
    .attr("y2", y(0))
    .attr("stroke", "black")
    .attr("stroke-width", 4)

  var font = "22px";

  svg.append("text")
    .attr("x", 4)
    .attr("y", y(0) + 6)
    .text(years[0] + 1977)
    .attr("font-size", font)
    .attr("text-anchor","end")

  svg.append("text")
    .attr("x", width - 4)
    .attr("y", y(0) + 6)
    .text(years[years.length - 1] + 1977)
    .attr("font-size", font)
    .attr("text-anchor","start")

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

})
