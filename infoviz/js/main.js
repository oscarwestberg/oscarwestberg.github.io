// -----------------------------------------
// Main js file
// -----------------------------------------

// Global variables to be used in different modules
var energyData = {};
var CO2Data = {};
var pie, area, CO2, map;
var qualitativeColors = ['rgb(141,211,199)','rgb(255,255,179)','rgb(190,186,218)','rgb(251,128,114)','rgb(128,177,211)','rgb(253,180,98)','rgb(179,222,105)','rgb(252,205,229)','rgb(217,217,217)','rgb(188,128,189)','rgb(204,235,197)','rgb(255,237,111)'];
var qualitativeColors2 = ['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)','rgb(152,78,163)','rgb(255,127,0)','rgb(255,255,51)']
var sequentialColors = ['rgb(255,255,204)','rgb(255,237,160)','rgb(254,217,118)','rgb(254,178,76)','rgb(253,141,60)','rgb(252,78,42)','rgb(227,26,28)','rgb(189,0,38)','rgb(128,0,38)'];
var divergingColors = ['rgb(215,48,39)','rgb(244,109,67)','rgb(253,174,97)','rgb(254,224,139)','rgb(255,255,191)','rgb(217,239,139)','rgb(166,217,106)','rgb(102,189,99)','rgb(26,152,80)'];

$("#clear-button").click(function() {
	clearSelection();
});

$("#right-button").click(function() {
	CO2.changeMode();
});

$("#map-button").click(function() {
  map.switchMode();
});

var selectCountry = function(country) {
	$("#selection > .country").remove();
	$("#selection").append('<div class="toolbar-item country"><strong class="btn btn-info">' + country + '</strong></div>');
}

var clearSelection = function() {
	selectCountry("World");
	pie.selectCountry("World");
  CO2.selectCountry("World");
  area.selectCountry("World");
}

// Create modules when data is loaded
var dataLoaded = function() {
  calcCO2change(CO2Data);
  console.log(energyData);
  console.log(CO2Data);
  pie = new pie();
  area = new area();
  CO2 = new CO2();
  map = new map();
}

loadData(energyData, CO2Data, dataLoaded);