// -----------------------------------------
// Displays a Chroropleth map of all countries
// -----------------------------------------
function map() {
    var mode = "CO2 per capita";
    $("#map-button").html("Change to rate of change");
    var country;

    // Legend size variables
    var legendRectSize = 18;
    var legendSpacing = 6;
    var legendWidth = 115;

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", move);

    // Grab the map div with jquery
    var mapDiv = $("#map");

    var quantize = d3.scale.quantize()
        .domain(d3.extent(CO2Data.CO2POP, function(d) {
            if(!isNaN(d["2008"])) {
                return parseFloat(d["2008"]);
            }
            else
                return 0;
        }))
        .range(sequentialColors);

    //console.log(JSON.stringify(CO2Data.CO2POP));

    // var data = []
    // for(country in CO2Data.CO2POP) {
    //     data.push({"country" : CO2Data.CO2POP[country]["Region/Country/Economy"], "2008" : niceNumber(CO2Data.CO2POP[country]["2008"])})
    // }

    // console.log(JSON.stringify(data));

    // width and height is based on container div size
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = mapDiv.width() - margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;
        scale = Math.min(width*0.16, height*0.3);

    // Create the svg area to draw in
    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "map")
        .call(zoom);

    // The view in the map
    var projection = d3.geo.mercator()
        .center([0, 15])
        .scale(scale)
        .translate([width / 2, height / 2]);

    // Draws edges in the map
    var path = d3.geo.path().projection(projection);

    // Create graphics variable
    g = svg.append("g");

    //initialize tooltip
    var tooltip = d3.select("#tooltips")
        .append("div")
        .attr("class", "tooltip");

    // load data and draw the map
    d3.json("data/world-topo.json", function(error, world) {
        var countries = topojson.feature(world, world.objects.countries).features;
        draw(countries);
    });


    function draw(countries) {
        country = g.selectAll(".country").data(countries);

        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", function(d) {
                var countries = $.grep(CO2Data.CO2POP, function(c){ return c["Region/Country/Economy"] === d.properties.name; });
                if(countries.length == 1)
                {
                    //console.log(quantize(countries[0]["2008"]));
                    return quantize(countries[0]["2008"]);
                }

                return 'gray';
            })
            .on('mouseover', function(d){
                var nodeSelection = d3.select(this)
                    .transition()
                    .duration(250)
                    .style({opacity:'0.83'})

                tooltip.text(d.properties.name);
                tooltip.style("visibility", "visible");
            })
            .on('mouseout', function(d){
                var nodeSelection = d3.select(this)
                    .transition()
                    .duration(250)
                    .style({opacity:'1.0'});

                 tooltip.style("visibility", "hidden");
            })
            .on("mousemove", function(){
                tooltip.style("top", (event.pageY-10)+"px")
                    .style("left",(event.pageX+10)+"px");
            })
            // Selection
            .on("click", function(d) {
                selFeature(d.properties.name);
            });

        country.exit().remove();

        updateMode();
    };

    function updateMode() {
        if(mode == "CO2 per capita") {
             country
                 .attr("fill", function(d) {
                    var countries = $.grep(CO2Data.CO2POP, function(c){ return c["Region/Country/Economy"] === d.properties.name; });
                    if(countries.length == 1) {
                        return quantize(countries[0]["2008"]);
                    }
                    return 'gray';
                })
                .on('mouseover', function(d) {
                    var nodeSelection = d3.select(this)
                        .transition()
                        .duration(250)
                        .style({opacity:'0.83'})

                    var countries = $.grep(CO2Data.CO2POP, function(c){ return c["Region/Country/Economy"] === d.properties.name; });
                    var value = countries.length == 1 ? countries[0]["2008"] : "-";

                    tooltip.text(d.properties.name + ", " + value);
                    tooltip.style("visibility", "visible");
            });

            // Create a legend
            var legend = svg.selectAll('.legend');
            legend.remove();

            legend = svg.selectAll('.legend')
                .data(reverseArray(quantize.range()))
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function(d, i) {
                    var height = legendRectSize + legendSpacing;
                    var vert = i * height;
                    return 'translate(' + 0 + ',' + vert + ')';
                });

            // White background
            legend.append('rect')
                .attr('width', legendWidth)
                .attr('height', legendRectSize  + legendSpacing)
                .style('fill', 'white');

            // Colored square
            legend.append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', function(d) { return d;})
                .style('stroke', sequentialColors);

            legend.append('text')
                .attr('x', legendRectSize + legendSpacing + 10)
                .attr('y', legendRectSize + legendSpacing - 10)
                .text(function(d) {
                    var extent = quantize.invertExtent(d);
                    return parseFloat(extent[0]).toFixed(2) + ' - ' + parseFloat(extent[1]).toFixed(2);
                });

        } else {
            country
                .attr("fill", function(d) {
                    var countries = $.grep(CO2Data.CHANGE, function(c){ return c["country"] === d.properties.name; });
                    if(countries.length == 1) {
                        return quantize(countries[0]["value"]);
                    }
                    return 'gray';
                })
                .on('mouseover', function(d) {
                    var nodeSelection = d3.select(this)
                        .transition()
                        .duration(250)
                        .style({opacity:'0.83'})

                    var countries = $.grep(CO2Data.CHANGE, function(c){ return c["country"] === d.properties.name; });
                    var value = countries.length == 1 ? countries[0]["value"] : "-";

                    var string = d.properties.name;
                    string += parseFloat(Math.round(value * 100) / 100) ? ", " + parseFloat(Math.round(value * 100) / 100).toFixed(2) : "";
                    tooltip.text(string);
                    tooltip.style("visibility", "visible");
                });

            // Create legend
            var legend = svg.selectAll('.legend');
            legend.remove();
            
            legend = svg.selectAll('.legend')
                .data(reverseArray(quantize.range()))
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function(d, i) {
                    var height = legendRectSize + legendSpacing;
                    var vert = i * height;
                    return 'translate(' + 0 + ',' + vert + ')';
                });

            // White background
            legend.append('rect')
                .attr('width', legendWidth)
                .attr('height', legendRectSize  + legendSpacing)
                .style('fill', 'white');

            // Colored square
            legend.append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', function(d) { return d;})
                .style('stroke', divergingColors);

            legend.append('text')
                .attr('x', legendRectSize + legendSpacing + 10)
                .attr('y', legendRectSize + legendSpacing - 10)
                .text(function(d) {
                    var extent = quantize.invertExtent(d);
                    return parseFloat(extent[0]).toFixed(2) + ' - ' + parseFloat(extent[1]).toFixed(2);
                });
        }
    }

    //zoom and panning method
    function move() {
        var t = d3.event.translate;
        var s = d3.event.scale;

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
    }

    this.switchMode = function() {
        if(mode == "CO2 per capita") {
            quantize = d3.scale.quantize()
                .domain([-d3.max(CO2Data.CHANGE, function(d) { return Math.abs(d.value);}),
                         d3.max(CO2Data.CHANGE, function(d) { return Math.abs(d.value);})])
                .range(reverseArray(divergingColors));

            $("#map-button").html("Change to CO2/capita");
            $("#map-label").html("CO2 emissions rate of change");
            mode = "CO2 derivate";
            updateMode();
        }
        else {
            quantize = d3.scale.quantize()
            .domain(d3.extent(CO2Data.CO2POP, function(d) {
                if(!isNaN(d["2008"])) {
                    return parseFloat(d["2008"]);
                }
                else
                    return 0;
            }))
            .range(sequentialColors);

            $("#map-button").html("Change to rate of change");
            $("#map-label").html("CO2 emissions 2008");
            mode = "CO2 per capita";
            updateMode();
        }
    }

    // Method for selecting features of other components
    function selFeature(value) {
        selectCountry(value);
        pie.selectCountry(value);
        CO2.selectCountry(value);
        area.selectCountry(value);
    }


}