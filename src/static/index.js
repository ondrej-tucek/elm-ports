// pull in desired CSS/SASS files
require( './styles/main.scss' );

var $ = jQuery = require( '../../node_modules/jquery/dist/jquery.js' );           // <--- remove if jQuery not needed
require( '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js' );   // <--- remove if Bootstrap's JS not needed

var plotlyBarGraph1 = require( '../static/js/plotlyBarGraph1.js' );
var plotlyLineGraph1 = require( '../static/js/plotlyLineGraph1.js' );

// inject bundled Elm app into div#main
// require( './js/main.js' );
var Elm = require( '../elm/Main' );
var app = Elm.Main.embed( document.getElementById( 'main' ) );


app.ports.pushItem.subscribe(function(item) {
    var itemList = addItem(item);
    app.ports.itemList.send(itemList);
});


items = []
var addItem = function(item) {
    items.push(item);

    return items;
};


app.ports.sendGraphData.subscribe(function(dataXY) {
    plotlyLineGraph1.makeGraph(dataXY);
    plotlyBarGraph1.makeGraph(dataXY);
});
