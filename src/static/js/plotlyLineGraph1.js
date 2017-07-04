var { color_func
    , color_sel_pnt
    , color_lin_c
    , margin_l
    , margin_r
    , margin_b
    , margin_t
    } = require( './plotSettings.js' );


// https://addyosmani.com/resources/essentialjsdesignpatterns/book/
var plotlyLineGraph1 = (function () {

    function publicMakeGraph( dataXY ) {

        var myPlot = document.getElementById('lineGraph1');

        var dataX = dataXY[0],
            dataY = dataXY[1];

        var num = dataX.length;

        var marker_size = Array(num).fill(10),
            marker_lin_c = Array(num).fill(color_lin_c),
            marker_line_w = Array(num).fill(1.5),
            marker_opacity = Array(num).fill(1),
            marker_color = Array(num).fill(color_func);


        var trace1 = {
            x: dataX.sort(),
            y: dataY,
            marker: {
                // size: 10,
                size: marker_size,
                line: {
                    color: marker_lin_c,
                    width: marker_line_w
                },
                opacity: marker_opacity,
                color: marker_color
            },
            type: 'scatter'
        };

        var layout1 = {
            xaxis: {
                nticks: 10,
                showgrid: true,
                rangemode: 'tozero',
                range: [0, 10.5],
                gridwidth: 1,
                hoverformat: '.2f'
            },
            yaxis: {
                showgrid: true,
                range: [0, 10.5],
                gridwidth: 2,
                hoverformat: '.2f'
            },
            margin: {
                l: margin_l,
                r: margin_r,
                b: margin_b,
                t: margin_t,
                // pad: margin_pad
            },
            hovermode:'closest',
            // paper_bgcolor: bgcolor_paper,
            // plot_bgcolor: bgcolor_plot
        };

        var data = [trace1];
        Plotly.newPlot('lineGraph1', data, layout1, {displayModeBar: false});


        myPlot.on('plotly_hover', function(data){
            var sel_pnt = data.points[0].pointNumber;
            marker_size[sel_pnt] = 16;
            marker_opacity[sel_pnt] = 1;
            marker_color[sel_pnt] = color_sel_pnt;

            var update = {
                'marker': {
                    color: marker_color,
                    size: marker_size,
                    opacity: marker_opacity,
                    line: {
                        color: marker_lin_c,
                        width: marker_line_w
                    }
                }
            };
            Plotly.restyle('lineGraph1', update);
        });


        myPlot.on('plotly_unhover', function(data){
            var sel_pnt = data.points[0].pointNumber;
            marker_size[sel_pnt] = 10;
            marker_opacity[sel_pnt] = 1;
            marker_color[sel_pnt] = color_func;

            var update = {
                'marker': {
                    color: marker_color,
                    size: marker_size,
                    opacity: marker_opacity,
                    line: {
                        color: marker_lin_c,
                        width: marker_line_w
                    }
                }
            };
            Plotly.restyle('lineGraph1', update);
        });
    }

    return {
        makeGraph: publicMakeGraph
    };

})();


module.exports = plotlyLineGraph1;
