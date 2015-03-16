// ------------------------------------------------------
// Displays a pie chart of energy consumption per sector
// ------------------------------------------------------
function pie() {
  var pieDiv = $("#pie");

  var margin = {top: 15, right: 120, bottom: 20, left: 120},
      width = pieDiv.width() - margin.right - margin.left,
      height = pieDiv.height() - margin.top - margin.bottom,
  	radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(qualitativeColors);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0); // increase inner radius to create donut shape

  // Outer arc for text labels
  var outerArc = d3.svg.arc()
    .innerRadius(radius * 1.05)
    .outerRadius(radius * 1.05);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

  var svg = d3.select("#pie").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

  svg.append("g")
    .attr("class", "slices");
  svg.append("g")
    .attr("class", "labels");
  svg.append("g")
    .attr("class", "lines");
  svg.append("g")
    .attr("class", "title");

  this.selectCountry = function(country) {
    var countries = $.grep(CO2Data.SECTOR, function(c){ return c["Region/Country/Economy"] === country; });

    if (countries.length == 0) {
      console.error("ERROR: pie.js: Country '" + country + "' not found.");
      return;
    } else if (countries.length == 1) {
      var countryData = countries[0];
    } else {
      console.error("ERROR: pie.js: Multiple countries '" + country + "' found.");
      return;
    }

    var totalEmissions =  niceNumber(countryData["Electricity and heat production"]) + 
                          niceNumber(countryData["Manuf. industries and construction"]) + 
                          niceNumber(countryData["Other energy industries**"]) +
                          niceNumber(countryData["Transport"]) +
                          niceNumber(countryData["Other sectors"]);

    var data = [  {"sector" : "Electr. and heat",
                    "value" : niceNumber(countryData["Electricity and heat production"]),
                    "percentage" :  Math.round(100*niceNumber(countryData["Electricity and heat production"])/totalEmissions) + "%"},
                  {"sector" : "Industries",
                   "value" : niceNumber(countryData["Manuf. industries and construction"]) + niceNumber(countryData["Other energy industries**"]),
                   "percentage" : Math.round(100*(niceNumber(countryData["Manuf. industries and construction"]) +  niceNumber(countryData["Other energy industries**"]))/totalEmissions) + "%"},
                  {"sector" : "Transport",
                   "value" : niceNumber(countryData["Transport"]),
                   "percentage" : Math.round(100*niceNumber(countryData["Transport"])/totalEmissions) + "%"},
                  {"sector" : "Residential",
                   "value" : niceNumber(countryData["of which: residential"]),
                   "percentage" : Math.round(100*niceNumber(countryData["of which: residential"])/totalEmissions) + "%"},
                  {"sector" : "Other",
                   "value" : niceNumber(countryData["Other sectors"]) - niceNumber(countryData["of which: residential"]),
                   "percentage" : Math.round(100*(niceNumber(countryData["Other sectors"]) - niceNumber(countryData["of which: residential"]))/totalEmissions) + "%"}];

    draw(country, data);
  }

/*
  function drawText(country) {
    title
      .transition().duration(1000/2)
      .style("opacity", 0)
      .transition().duration(1000/2)
      .style("opacity", 1)
      .text(country);
  }
*/
  function draw(country, data) { 
    // Pie slices
    var slice = svg.select(".slices").selectAll("path.slice")
      .data(pie(data));

    slice.enter()
      .insert("path")
      .style("fill", function(d) { return color(d.data.sector); })
      .attr("class", "slice");

    slice
      .transition().duration(1000)
      .attrTween("d", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        }
      })

    slice.exit().remove();

    // Pie slice percentage
    var percentage = svg.select(".slices").selectAll("text")
      .data(pie(data));

    percentage.enter()
      .append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle");

    percentage
      .transition().duration(1000)
      .attrTween("transform", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t)
          return "translate(" + arc.centroid(d2) + ")";
        }
      })
      .text(function(d) { return d.data.percentage; });

    percentage.exit().remove();

    // Text labels
    var text = svg.select(".labels")
      .selectAll("text")
      .data(pie(data));

    text.enter().append("text").
      attr("dy", ".35em").
      text(function(d) {
        return d.data.sector;
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text.transition().duration(1000)
      .attrTween("transform", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * 1.05 * (midAngle(d2) < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        };
      })
      .styleTween("text-anchor", function(d){
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start":"end";
        };
      });

    text.exit().remove();

    // Lines to labels
    var polyline = svg.select(".lines").selectAll("polyline")
      .data(pie(data));

    polyline.enter()
      .append("polyline");

    polyline.transition().duration(1000)
      .attrTween("points", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit().remove();
  }

  this.selectCountry("World");
}