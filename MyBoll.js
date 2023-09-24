const predef = require("./tools/predef");
const meta = require("./tools/meta");
const StdDev = require("./tools/StdDev");

class MyBollv1 {
    init() {
        this.stdDev1 = StdDev(this.props.period);
        this.stdDev2 = StdDev(this.props.period);
        this.stdDev3 = StdDev(this.props.period);
        this.stdDev4 = StdDev(this.props.period);
    }

    map(d) {
        const stdev1 = this.stdDev1(d.value());
        const stdev2 = this.stdDev2(d.value());
        const stdev3 = this.stdDev3(d.value());
        const stdev4 = this.stdDev4(d.value());
        
        const avg = this.stdDev1.avg();
        
        const halfWidth1 = stdev1 * this.props.deviation1;
        const lowerBand1 = avg - halfWidth1;
        const upperBand1 = avg + halfWidth1;
        
        const halfWidth2 = stdev2 * this.props.deviation2;
        const lowerBand2 = avg - halfWidth2;
        const upperBand2 = avg + halfWidth2;
        
        const halfWidth3 = stdev3 * this.props.deviation3;
        const lowerBand3 = avg - halfWidth3;
        const upperBand3 = avg + halfWidth3;
        
        const halfWidth4 = stdev4 * this.props.deviation4;
        const lowerBand4 = avg - halfWidth4;
        const upperBand4 = avg + halfWidth4;

        return { 
            upper1: upperBand1,
            middle: avg,
            lower1: lowerBand1,
            upper2: upperBand2,
            lower2: lowerBand2,
            upper3: upperBand3,
            lower3: lowerBand3,
            upper4: upperBand4,
            lower4: lowerBand4
        };
    }

    filter(d, i) {
        return i >= this.props.period;
    }
}

module.exports = {
    name: "MyBoll",
    description: "MyBollv1",
    calculator: MyBollv1,
    params: {
        period: predef.paramSpecs.period(18),
        deviation1: predef.paramSpecs.number(2, 0.01, 0.01),
        deviation2: predef.paramSpecs.number(2.6, 0.01, 0.01),
        deviation3: predef.paramSpecs.number(3, 0.01, 0.01),
        deviation4: predef.paramSpecs.number(3.6, 0.01, 0.01)
    },
    plots: {
        middle: { title: "Middle Band" },
        upper1: { title: "Upper Band 1" },
        lower1: { title: "Lower Band 1" },
        upper2: { title: "Upper Band 2" },
        lower2: { title: "Lower Band 2" },
        upper3: { title: "Upper Band 3" },
        lower3: { title: "Lower Band 3" },
        upper4: { title: "Upper Band 4" },
        lower4: { title: "Lower Band 4" }
    },
    
    tags: ['My Tools'],
    schemeStyles: {
    dark: {
        middle: predef.styles.plot({ 
            color: "#ffa44f", 
            lineStyle: 3, 
            lineWidth: 2 
        }),
        upper1: predef.styles.plot({ 
            color: "#b2001e",
            lineStyle: 1, 
            lineWidth: 2
        }),
        lower1: predef.styles.plot({ 
            color: "#35a24a",
            lineStyle: 1, 
            lineWidth: 2
        }),
        upper2: predef.styles.plot({ 
            color: "#your_color",
            lineStyle: 1, 
            lineWidth: 2
        }),
        lower2: predef.styles.plot({ 
            color: "#your_color",
            lineStyle: 1, 
            lineWidth: 2
        }),
        upper3: predef.styles.plot({ 
            color: "#your_color",
            lineStyle: 1, 
            lineWidth: 2,
            fill: "#ffa500" // Solid orange fill color
        }),
        lower3: predef.styles.plot({ 
            color: "#your_color",
            lineStyle: 1, 
            lineWidth: 2,
            fill: "#ffa500" // Solid orange fill color
        }),
        upper4: predef.styles.plot({ 
            color: "#your_color",
            lineStyle: 1, 
            lineWidth: 2,
            fill: "#ffa500" // Solid orange fill color
            
        }),
        lower4: predef.styles.plot({ 
            color: "#your_color",
            lineStyle: 1, 
            lineWidth: 2,
            fill: "#ffa500" // Solid orange fill color
        })
    }
}
};
