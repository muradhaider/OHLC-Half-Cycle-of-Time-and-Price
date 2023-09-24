const predef = require("./tools/predef");
const meta = require("./tools/meta");
const EMA = require("./tools/EMA");
const p = require("./tools/plotting");



function Highs(period) {
    function highs(input) {
        return highs.push(input);
    }
    highs.push = function (input) {
        highs.state.values.push(input);
        if (highs.state.values.length > period) {
            highs.state.values.shift();
        }
        return highs.state.values.reduce((a, b) => Math.max(a, b), 0);
    };

    highs.reset = () => highs.state = { values: [] };

    highs.reset();

    return highs;
}

function Lows(period) {
    function lows(input) {
        return lows.push(input);
    }
    lows.push = function (input) {
        lows.state.values.push(input);
        if (lows.state.values.length > period) {
            lows.state.values.shift();
        }
        return lows.state.values.reduce((a, b) => Math.min(a, b), Infinity);
    };

    lows.reset = () => lows.state = { values: [] };

    lows.reset();

    return lows;
}

class wizard1 {
    init() {
        this.wiz1EMA1 = EMA(this.props.wiz1EMA1);
        this.wiz1EMA2 = EMA(this.props.wiz1EMA2);
        this.wiz2EMA1 = EMA(this.props.wiz2EMA1);
        this.wiz2EMA2 = EMA(this.props.wiz2EMA2);
        this.n_bars = 144;
        
        this.highs = Highs(this.props.period);
        this.lows = Lows(this.props.period);
        
        this.uShapeMet = false;
        this.dShapeMet = false;
        
    }

      map(d, i, history) {
        let diff = this.wiz1EMA1(d.close()) - this.wiz1EMA2(d.close());
        let diff2 = this.wiz2EMA1(d.close()) - this.wiz2EMA2(d.close());
        
        let diffColor = { color: diff > 0 ? "green" : "red" };
        let diffColor2 = { color: diff2 < 0 ? "red" : "green" };
        
        
        //const uShape = diff <= 0 && diff2 >= 0;
        //const dShape = diff >= 0 && diff2 <= 0;
        
        let uShape = false;
        let dShape = false;
        
        let Upper = false; 
        let Lower = false; 
        
        if  (diff <= 0 && diff2 >= 0) { 
            uShape = true; 
        }
        
        if (dShape = diff >= 0 && diff2 <= 0) {
            dShape = true;
        }
        

        let theTop = this.highs(diff);
        let theBot = this.lows(diff);

        //let theTop = this.highs(d.value()); //highs.push(diff);
        //let theBot = this.highs(d.value()); //lows.push(diff);
        
        //let theTop = highs; 
        //let theBot = lows;
        
        if (theTop === diff && diff > 0 && diff2 > 0){
            Upper = true;
        }
        
        if (theBot === diff && diff < 0 && diff2 < 0){
            Lower = true;
        }
        
        //// Extremes
        //theTop = ta.highest(wiz1, n_bars) == wiz1 and wiz1 > 0 and wiz2 > 0
        //theBot = ta.lowest(wiz1, n_bars) == wiz1 and wiz1 < 0 and wiz2 < 0
        
      // TEST WITH MAKING IF STATEMENT FOR THE CONDITION, SET CONST VARIABLES TO FALSE AND THEN TRUE IN THE IF STATEMENT, TEST IF YOU CAN USE true : false instead of 1 : 0 
        
        //this.uShapeMet = uShape;
        //this.dShapeMet = dShape;
    
        //if (uShape == true) {
        //    this.uShapeMet = true;
        //    this.dShapeMet = false;
        //} else if (dShape == true) {
        //    this.dShapeMet = true;
        //    this.uShapeMet = false;
        //} else {
        //    this.uShapeMet = false;
        //    this.dShapeMet = false;
        //}


        
        // Set the style for dots based on conditions
        //let uShapeStyle = { color: uShapeMet === true ? 'blue' : 'blue' };
        //let dShapeStyle = { color: dShapeMet === true ? 'yellow' : 'yellow' };
        
        // Determine if a squeeze condition is met
        //const met = uShape || dShape ? 1 : 0;
        
        
        return {
            wiz1: diff,
            wiz2: diff2,
            value: diff,
            value2: diff2,
            style: { value: diffColor },
            style2: { value2: diffColor2 },
            uShape,
            dShape,
            uColor: this.props.uColor,
            dColor: this.props.dColor,
            Upper,
            Lower,
            theTopColor: this.props.theTopColor,
            theBotColor: this.props.theBotColor,
            //u_shape: uShape ? 1 : 0, // Use 1 for plotting dots
            //d_shape: dShape ? 1 : 0, // Use 1 for plotting dots
            //u_shape: uShapeMet,
            //d_shape: dShapeMet,
            //value3: uShapeMet,
            //value4: dShapeMet, 
            //style3: { value3: uShapeStyle },
            //style4: { value4: dShapeStyle } 
        }
    }   
}

function tradePlotter(canvas, indicatorInstance, history) { 
    for (let i = 0; i < history.data.length; ++i) {
        const item = history.get(i); 
            if (item.uShape === true || item.dShape === true) { 
                const x = p.x.get(item); 
                //const y = 0;
            
                canvas.drawLine(
                    p.offset(x, item.uShape),
                    p.offset(x, item.dShape),
                    { 
                        color: item.uShape ? item.uColor : item.dColor, 
                        relativeWidth: 1.0,
                        opacity: 100.0,
                    });
            }
        }
    }
    
function HLPlotter(canvas, indicatorInstance, history) { 
    for (let i = 0; i < history.data.length; ++i) {
        const item = history.get(i);
            if (item.Upper === true || item.Lower === true) {
                const x = p.x.get(item);
                    
                    
                canvas.drawLine(
                    p.offset(x, item.Upper),
                    p.offset(x, item.Lower),
                    {
                        color: item.Upper ? item.theTopColor : item.theBotColor,
                        relativeWidth: 1.0,
                        opacity: 100.0,
                    });
            }
        }
    }


module.exports = {
    name: "wizard1",
    description: "wizard1",
    calculator: wizard1,
    params: {
        wiz1EMA1: predef.paramSpecs.period(5),
        wiz1EMA2: predef.paramSpecs.period(34),
        wiz2EMA1: predef.paramSpecs.period(10),
        wiz2EMA2: predef.paramSpecs.period(68),
        period: predef.paramSpecs.period(144),
        uColor: predef.paramSpecs.color('purple'),
        dColor: predef.paramSpecs.color('yellow'),
        theTopColor: predef.paramSpecs.color('blue'),
        theBotColor: predef.paramSpecs.color('pink'),
    },
    tags: [predef.tags.Oscillators],
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    plots: {
        wiz1: { title: "wiz1", displayOnly: true },
        wiz2: { title: "wiz2", displayOnly: true },
        uShape: { title: "uShape", displayOnly: true },
        dShape: { title: "dShape", displayOnly: true },
        Upper: { title: "Upper", displayOnly: true },
        Lower: { title: "Lower", displayOnly: true },
        //u_shape: { title: "u_shape", display: 1},
        //d_shape: { title: "d_shape", displayOnly: 1 }
        //isHighestHigh: { title: "isHighestHigh",displayOnly: true }
        //diff3: { title: "diff3", displayOnly: true }
    },    
    plotter: [
        predef.plotters.histogram,
        predef.plotters.singleline("wiz1"),
        predef.plotters.singleline("wiz2"),
        //predef.plotters.dots("uShape"),
        //predef.plotters.dots("dShape"),
        predef.plotters.custom(tradePlotter),
        predef.plotters.custom(HLPlotter),
        //predef.plotters.dots("u_shape"),
        //predef.plotters.dots("d_shape")
        //predef.plotters.custom(customUShapeDotsPlotter)

        //{ type: 'dots', field: 'uShape', color: 'blue', condition: function(data) {
        //   return data.uShape === true;
        //} },
        //{ type: 'dots', field: 'dShape', color: 'yellow', condition: function(data) {
        //    return data.dShape === true;
        //} }
    ],
    schemeStyles: {
        dark: {
            wiz1: {color: "green", lineStyle: 1},
            wiz2: {color: "red", lineStyle: 1},
            uShape: {color: "purple", style: 4},
            dShape: {color: "yellow", style: 4},
            Upper: {color: "blue", style: 4},
            Lower: {color: "pink", style: 4},
            //u_shape: {color: "transparent", style: 4},
            //d_shape: {color: "transparent", style: 4}
        }
    }
};