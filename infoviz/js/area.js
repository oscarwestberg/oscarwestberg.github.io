// -----------------------------------------
// Displays an area graph of a country's total energy production 
// and production sources over time.
// Can alternate to showing a single production source
// -----------------------------------------

function area() {

    // -----------------------------------------
    // Initial setup
    // -----------------------------------------

    var svg;
    var valueline;

    // Grab the area div with jquery
    var areaDiv = $("#area");

    // width and height is based on container div size
    var margin = {top: 10, right: 15, bottom: 35, left: 50},
        width = areaDiv.width() - margin.right - margin.left,
        height = areaDiv.height() - margin.top - margin.bottom;

    // Setup scales and axes
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.format("d"))
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("s"));

    //initialize tooltip
    var tooltip = d3.select("#tooltips")
        .append("div")
        .attr("class", "tooltip");

    var xDomain;

    // -----------------------------------------
    // Handle data
    // -----------------------------------------

    this.selectCountry = function(country) {
        data = new Array();
        data[0] = getEnergyData("Electricity production from coal sources (kWh)", country);
        data[1] = getEnergyData("Electricity production from hydroelectric sources (kWh)", country);
        data[2] = getEnergyData("Electricity production from natural gas sources (kWh)", country);
        data[3] = getEnergyData("Electricity production from nuclear sources (kWh)", country);
        data[4] = getEnergyData("Electricity production from oil sources (kWh)", country);

        // Converts 2D data into stacked data, adding a y0 baseline
        var stack = d3.layout.stack().values(function(d) { return d.values; });
        stack(data);

        draw(data);
    }

    // -----------------------------------------
    // Draw area graph
    // -----------------------------------------

    function draw(data) {
        x.domain(findXDomain(data));
        y.domain(findYDomain(data));
        xDomain = findXDomain(data);

        // Remove any previous areas to make way for a new one
        d3.select("#area svg").remove();
        d3.select("#back-button").remove();

        svg = d3.select("#area").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var colors = d3.scale.ordinal().range(qualitativeColors2);

        // Returns a displayable format of the data
        var area = d3.svg.area()
            .x(function(d) { return x(d.year); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y((d.y0 + d.y)); })
            .interpolate("monotone");

        // Used for handling displaying a vertical line when the user hovers outside the area graph
        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mousemove", function() { 
                CO2.mousemove(d3.mouse(this)[0], d3.extent(data[0].values, function(d) { return d.year; })); 
                focus2.select(".x").attr("transform", "translate(" + d3.mouse(this)[0] + ", 0)"); 
            })
            .on("mouseout", function() {                 
                CO2.mouseout(); 
                focus2.select(".x").attr("style", "stroke:none;"); 
            })
            .on("mouseover", function() {                 
                CO2.mouseover(); 
                focus2.select(".x").attr("style", "stroke:orange;"); 
            });

        var graph = svg.selectAll(".graph")
            .data(data)
            .enter().append("g")
            .attr("class", "graph")
            .style("fill", function(d, i) { return colors(i); })
            .append("path")
            .attr("class", "area")
            .attr("d", function(d) { return area(d.values); })
            .on('mouseover', function(d){
                var nodeSelection = d3.select(this)
                    .transition()
                    .duration(250)
                    .style({opacity:'0.83'})

                tooltip.text(d.name);
                tooltip.style("visibility", "visible");

                // Update vertical line and synchronize with CO2 view
                CO2.mouseover(); 
                focus2.select(".x").attr("style", "stroke:orange;");
            })
            .on('mouseout', function(d){
                var nodeSelection = d3.select(this)
                    .transition()
                    .duration(250)
                    .style({opacity:'1.0'});

                 tooltip.style("visibility", "hidden");

                // Update vertical line and synchronize with CO2 view
                CO2.mouseout(); 
                focus2.select(".x").attr("style", "stroke:none;");
            })
            .on("mousemove", function(){
                tooltip.style("top", (event.pageY-10)+"px")
                    .style("left",(event.pageX+10)+"px");

                // Update vertical line and synchronize with CO2 view
                CO2.mousemove(d3.mouse(this)[0], d3.extent(data[0].values, function(d) { return d.year; })); 
                focus2.select(".x").attr("transform", "translate(" + d3.mouse(this)[0] + ", 0)");
            })
            .on("click", function(d){
                drawOne(d.name, data);
            }); 

        // Display axes
        svg.append("g")
            .attr("class", "aAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "aAxis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);

        // Add a vertical focus line
        focus2 = svg.append("g")
            .attr("class", "focus2");

        focus2.append("line")
            .attr("class", "x")
            .attr("y1", 0)
            .attr("y2", y(0));

        // Axis labels
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 30)
            .text("Time");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", - 50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Electricity production from all sources (kWh)");
    }

    // -----------------------------------------
    // Draw one of the energy sources
    // -----------------------------------------

    function drawOne(dataType, data){
        var i = 0;
        for(i = 0; i < data.length; i++){
            if(dataType == data[i].name){
                break;
            }
        }

        // Remove any previous areas to make way for a new one
        d3.select("#area svg").remove();

        // Add back button
        $("#area-toolbar").append('<button id="back-button" type="button" class="btn btn-default module-button"><span class="glyphicon glyphicon-chevron-left"></span> Back</button>');
        $("#back-button").click(function() {
            draw(data);
        });

        // Define the line
        valueline = d3.svg.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.y); })
            .interpolate("monotone");

        // Scale the range of the data
        x.domain(d3.extent(data[i].values, function(d) { return d.year; }));
        y.domain([0, d3.max(data[i].values, function(d) { return d.y; })]);
        xDomain = findXDomain(data);

        // Create the svg area to draw in
        svg = d3.select("#area").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data[i].values));

        // Display axes
        svg.append("g")
            .attr("class", "aAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "aAxis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);

        // Add a vertical focus line
        focus2 = svg.append("g")
            .attr("class", "focus2");

        focus2.append("line")
            .attr("class", "x")
            .attr("y1", 0)
            .attr("y2", y(0));

        // Used for handling displaying the vertical line
        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mousemove", function() { 
                CO2.mousemove(d3.mouse(this)[0], d3.extent(data[i].values, function(d) { return d.year; })); 
                focus2.select(".x").attr("transform", "translate(" + d3.mouse(this)[0] + ",0)"); 
            })
            .on("mouseout", function() { 
                CO2.mouseout(); 
                focus2.select(".x").attr("style", "stroke:none;"); 
            })
            .on("mouseover", function() { 
                CO2.mouseover(); 
                focus2.select(".x").attr("style", "stroke:orange;"); 
            });

        // Axis labels
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 30)
            .text("Time");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", - 50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(dataType);
    }

    // -----------------------------------------
    // Called from the CO2 view, updates vertical line
    // -----------------------------------------

    this.mouseover = function () {
        focus2.select(".x").attr("style", "stroke:orange;");
    }

    // -----------------------------------------
    // Called from the CO2 view, updates vertical line
    // -----------------------------------------

    this.mousemove = function (pos, domain) {
        // Assume the two views have the same margins
        var CO2Width = $("#co2").width() - margin.right - margin.left;
        var position = pos/CO2Width;
        var year = (domain[1] - domain[0]) * position + domain[0];

        if(year > xDomain[1])
            newPos = width;
        else if(year < xDomain[0])
            newPos = 0;
        else {
            var diff = (xDomain[1] - year)/(xDomain[1] - xDomain[0]);
            newPos = (1 - diff) * width;
        }

        focus2.select(".x").attr("transform", "translate(" + newPos + ",0)");
    }

    // -----------------------------------------
    // Called from the CO2 view, updates vertical line
    // -----------------------------------------

    this.mouseout = function() {
        focus2.select(".x").attr("style", "stroke:none;");
    }

    // Initial view 
    this.selectCountry("World");
}
