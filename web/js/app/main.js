define(function (require) {
    //Do setup work here
    "use strict";

    var SocketWrapper = require("app/SocketWrapper");
    var OhlcSocketWrapper = require("app/ohlc_socketwrapper");
    var Pred = require("app/pred");
    var Ohlc = require("app/ohlc");

    var pred_15 = new Pred(15);
    var pred_30 = new Pred(30);

    var m = new SocketWrapper(4321, 15, pred_15.series_actual, pred_15.series_prediction);
    var q = new SocketWrapper(4322, 30, pred_30.series_actual, pred_30.series_prediction);
    m.openConnection();
    q.openConnection();

    var ohlc_15 = new Ohlc(15);
    var a = new OhlcSocketWrapper(4321, 15, ohlc_15.series_global);
    a.openConnection();

    var ohlc_30 = new Ohlc(30);
    var b = new OhlcSocketWrapper(4322, 30, ohlc_30.series_global);
    b.openConnection();




});
