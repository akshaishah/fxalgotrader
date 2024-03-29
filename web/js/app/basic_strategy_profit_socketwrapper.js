define(["c"], function(c) {
    "use strict";

    function BasicStrategySocketWrapper(socket, tf, series_profit) {
        if (!(this instanceof BasicStrategySocketWrapper)) {
            throw new TypeError("BasicStrategySocketWrapper constructor cannot be called as a function");
        }
        this.socket = socket;
        this.tf = tf;
        this.ws = new WebSocket("ws://localhost:" + socket);
        this.series_profit = series_profit;
        //this.tp = tp;
        //this.actual = arr1;
        //this.prediction = arr2;
    }




    BasicStrategySocketWrapper.prototype = {

        openConnection : function() {

            var self = this;

            this.ws.onopen = function() {
                console.log("Connected to basic strategy socketwrapper");
                this.binaryType = 'arraybuffer'
                this.sendcmd("sum",1,2)
            }
            this.ws.onmessage = function(event) {
                var data = JSON.parse(deserialize(event.data));
                self.dataHandler(data);
            }
            this.ws.onclose = function() {
                console.log("DIsconnected");
            }

            this.ws.sendcmd = function (args) {
                if(arguments.length<=1) return false;
                var len = arguments.length,data = {},i;
                // First argument used as func property, rest are used as arg properties
                data['func'] = arguments[0];
                for(i = 1;i<len;i++){
                    data['arg'+i] = arguments[i];
                }
                this.send(serialize(JSON.stringify(data)));
            };


        },

        dataHandler : function(data) {
            var x  = data.data;
            switch(x.table) {
                case "cdata":
                    // console.log(x.data);
                    var y =[new Date(x.data.dt*1000).getTime(), x.data.o, x.data.h, x.data.l, x.data.c];
                    //series_global.addPoint(y, true);
                    break;
                case "basic_strategy_profit":
                    //console.log(x);
                    //var act =[new Date(x.data.dt*1000).getTime(), x.data.actual];
                    //var pred =[new Date(x.data.dt*1000).getTime(), x.data.predictions];
                    var profit =[new Date(x.data.dt*1000).getTime(), x.data.capital];
                    var oldProfit = parseFloat($("#basic_strategy_header_text").text().split("%")[0]);
                    if (oldProfit <= (((x.data.capital-100000)/100000)*100).toFixed(2)) {
                        $("#basic_strategy_header_text").removeClass( "red" ).addClass( "green");
                        $("#basic_strategy_header_arrow").removeClass("red").addClass("green");
                        $("#basic_strategy_header_arrow").removeClass("glyphicon-arrow-down").addClass("glyphicon-arrow-up");
                    } else{
                        $("#basic_strategy_header_text").removeClass( "green" ).addClass( "red");
                        $("#basic_strategy_header_arrow").removeClass("green").addClass("red");
                        $("#basic_strategy_header_arrow").removeClass("glyphicon-arrow-up").addClass("glyphicon-arrow-down");
                    }
                    $("#basic_strategy_header_text").text((((x.data.capital-100000)/100000)*100).toFixed(2) + '%');
                    //this.series_actual.addPoint(act, true);
                    //console.log(x.data.actual);
                    //this.series_prediction.addPoint(pred, true);
                    this.series_profit.addPoint(profit, true);
                    break;
                case "basic_order_book":
                    console.log(x);
                    console.log(x.data.bid_ask);
                    if(x.data.bid_ask == "bid") {
                      //  $('#basic_strategy_table > tbody > tr:first').before('<tr><td>'+new Date(x.data.dt*1000)+'</td><td>'+ x.data.current_actual +'</td><td></td></tr>');
                        $('<tr><td>'+new Date(x.data.dt*1000)+'</td><td class="green">'+ x.data.current_actual+'</td><td></td></tr>').prependTo('#basic_strategy_table > tbody');
                    } else {
                        $('<tr><td>'+new Date(x.data.dt*1000)+'</td><td></td><td class="red">'+ x.data.current_actual+'</td></tr>').prependTo('#basic_strategy_table > tbody');
                    }
                    //var act =[new Date(x.data.dt*1000).getTime(), x.data.actual];
                    //var pred =[new Date(x.data.dt*1000).getTime(), x.data.predictions];
                    //var profit =[new Date(x.data.dt*1000).getTime(), x.data.capital];
                    //this.series_actual.addPoint(act, true);
                    //console.log(x.data.actual);
                    //this.series_prediction.addPoint(pred, true);
                    //this.series_profit.addPoint(profit, true);
                    break;

            }
        }
    }

    return BasicStrategySocketWrapper;

});/**
 * Created by shaha1 on 30/01/15.
 */
