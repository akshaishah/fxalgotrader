define(["jquery", "highcharts-theme"], function($, Highcharts) {
    "use strict";

    function SvrError(tf) {
        if (!(this instanceof SvrError)) {
            throw new TypeError("Prediction constructor cannot be called as a function");
        }
        this.timeframe = tf;
        this.series_profit;
        this.setSeries();

    }

    SvrError.prototype = {



        setSeries : function() {
            var self = this;
            console.log(self);

            $('#svr_error').highcharts({
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    events: {
                        load: function () {
                            console.log(self);
                            // set up the updating of the chart each second
                            //this.setSeries(this.series[0], this.series[1]);
                            //this.series_prediction = this.series[1];
                            self.series_profit = this.series[0];
                            console.log(self);
                            //new ws(4321, 15, series_actual, series_prediction).openConnection()
                        }
                    }
                },

                rangeSelector: {
                    buttons: [{
                        count: 1,
                        type: 'minute',
                        text: '1M'
                    }, {
                        count: 5,
                        type: 'minute',
                        text: '5M'
                    }, {
                        type: 'all',
                        text: 'All'
                    }, {
                        count: 1,
                        type: 'day',
                        text: '1D'
                    }],
                    inputEnabled: false,
                    selected: 0
                },
                title: {
                    text: 'SVR MAPE'
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: '% Error'
                    }
                },
                spline: {
                    connectNulls: true
                },
                legend: {
                    enabled: true
                },
                exporting: {
                    enabled: false
                },


                series: [{
                    name: 'Capital',
                    enableMouseTracking: false,
                    marker: {
                        enabled: false
                    }
                }]
            });
        }
    }

    return SvrError;

});/**
 * Created by shaha1 on 27/01/15.
 */





/**
 * Created by shaha1 on 30/01/15.
 */
