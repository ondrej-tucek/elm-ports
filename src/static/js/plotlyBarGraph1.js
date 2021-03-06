var { color_func
    , color_lin_c
    , margin_l
    , margin_r
    , margin_b
    , margin_t
    } = require( './plotSettings.js' );


// https://addyosmani.com/resources/essentialjsdesignpatterns/book/
var plotlyBarGraph1 = (function () {

    function publicMakeGraph( dataXY ) {

        var dataX = dataXY[0],
            dataY = dataXY[1];

        var num = dataX.length;

        var marker_size = Array(num).fill(10),
            marker_lin_c = Array(num).fill(color_lin_c),
            marker_line_w = Array(num).fill(1.5),
            marker_opacity = Array(num).fill(1),
            marker_color = Array(num).fill(color_func);

        var trace2 = {
            x: ['A', 'B', 'C', 'D', 'E'],
            y: dataY,
            type: 'bar'
        };

        var layout2 = {
            // title: 'Plotly Bar',
            showlegend: false,
            xaxis: {
                showgrid: true,
                gridwidth: 1,
                tickfont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: 'red'
                },
                range: [-0.5, 4.5],
                tickvals: [0, 1, 2, 3, 4],
                ticktext: ['A', 'B', 'C', 'D', 'E']
            },
            yaxis: {
                showgrid: true,
                range: [0, 10.5],
                gridwidth: 2
            },
            margin: {
                l: margin_l,
                r: margin_r,
                b: margin_b,
                t: margin_t,
                // pad: margin_pad
            },
            // paper_bgcolor: color_bg_paper,
            // plot_bgcolor: color_bg_plot
        };

        // var layout = Object.assign({}, layout1, layout2);
        Plotly.newPlot('barGraph1', [trace2], layout2);
    }

    return {
        makeGraph: publicMakeGraph
    };

})();


module.exports = plotlyBarGraph1;
