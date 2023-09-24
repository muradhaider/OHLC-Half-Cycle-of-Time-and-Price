#region Using declarations
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Xml.Serialization;
using NinjaTrader.Cbi;
using NinjaTrader.Gui;
using NinjaTrader.Gui.Chart;
using NinjaTrader.Gui.SuperDom;
using NinjaTrader.Gui.Tools;
using NinjaTrader.Data;
using NinjaTrader.NinjaScript;
using NinjaTrader.Core.FloatingPoint;
using NinjaTrader.NinjaScript.DrawingTools;
#endregion

//This namespace holds Indicators in this folder and is required. Do not change it. 
namespace NinjaTrader.NinjaScript.Indicators
{
	public class Wizard1 : Indicator
    {
        private int nBars = 144;
        private double wiz1, wiz2, trig1;
        private bool theTop, theBot, uShape, dShape;

        private Series<double>ohlc4Series;
		


        protected override void OnStateChange()
        {
            if (State == State.SetDefaults)
            {
                Description = @"Wizard 1";
                Name = "Wizard 1";
                Calculate = Calculate.OnEachTick;
                IsOverlay = true;
                AddPlot(new Stroke(Brushes.Blue, 3), PlotStyle.Bar, "Wiz1");
                AddPlot(new Stroke(Brushes.Blue, 4), PlotStyle.Dot, "TheTop");
                AddPlot(new Stroke(Brushes.Magenta, 4), PlotStyle.Dot, "TheBot");
                AddPlot(new Stroke(Brushes.Red, 4), PlotStyle.Dot, "UShape");
                AddPlot(new Stroke(Brushes.Yellow, 4), PlotStyle.Dot, "DShape");
            }
            else if (State == State.DataLoaded)
            {
                ohlc4Series = new Series<double>(this);
            }
        }

        protected override void OnBarUpdate()
        {
            ohlc4Series[0] = (High[0] + Low[0] + Close[0] + Open[0]) / 4.0;

            wiz1 = EMA(ohlc4Series, 5)[0] - EMA(ohlc4Series, 34)[0];
            wiz2 = EMA(ohlc4Series, 10)[0] - EMA(ohlc4Series, 68)[0];
            trig1 = SMA(ohlc4Series, 5)[0];

            Brush cColor = wiz2 >= 0 ? Brushes.Green : Brushes.Red;

            uShape = wiz1 <= 0 && wiz2 >= 0;
            dShape = wiz1 > 0 && wiz2 <= 0;
			
			// Calculate the highest high and lowest low of the last nBars bars
    		double highestHigh = MAX(ohlc4Series, NBars)[0];
   			double lowestLow = MIN(ohlc4Series, NBars)[0];
			
			
			// Check if the current value is equal to the highest high or lowest low
    		theTop = ohlc4Series[0] == highestHigh && wiz1 > 0 && wiz2 > 0;
    		theBot = ohlc4Series[0] == lowestLow && wiz1 < 0 && wiz2 < 0;

			
            //theTop = MAX(ohlc4Series, nBars)[0] == wiz1 && wiz1 > 0 && wiz2 > 0;
            //theBot = MIN(ohlc4Series, nBars)[0] == wiz1 && wiz1 < 0 && wiz2 < 0;

            // Plots
            PlotBrushes[0][0] = cColor;
            Values[0][0] = wiz1;

            if (theTop) Values[1][0] = 0;
            if (theBot) Values[2][0] = 0;
            if (uShape) Values[3][0] = 0;
            if (dShape) Values[4][0] = 0;
        }

        #region Properties
        [NinjaScriptProperty]
        [Range(1, int.MaxValue)]
        [Display(Name = "nBars", Description = "Consider how many bars?", Order = 1, GroupName = "Parameters")]
        public int NBars
        {
            get { return nBars; }
            set { nBars = Math.Max(1, value); }
        }
        #endregion
    }
}

#region NinjaScript generated code. Neither change nor remove.

namespace NinjaTrader.NinjaScript.Indicators
{
	public partial class Indicator : NinjaTrader.Gui.NinjaScript.IndicatorRenderBase
	{
		private Wizard1[] cacheWizard1;
		public Wizard1 Wizard1(int nBars)
		{
			return Wizard1(Input, nBars);
		}

		public Wizard1 Wizard1(ISeries<double> input, int nBars)
		{
			if (cacheWizard1 != null)
				for (int idx = 0; idx < cacheWizard1.Length; idx++)
					if (cacheWizard1[idx] != null && cacheWizard1[idx].NBars == nBars && cacheWizard1[idx].EqualsInput(input))
						return cacheWizard1[idx];
			return CacheIndicator<Wizard1>(new Wizard1(){ NBars = nBars }, input, ref cacheWizard1);
		}
	}
}

namespace NinjaTrader.NinjaScript.MarketAnalyzerColumns
{
	public partial class MarketAnalyzerColumn : MarketAnalyzerColumnBase
	{
		public Indicators.Wizard1 Wizard1(int nBars)
		{
			return indicator.Wizard1(Input, nBars);
		}

		public Indicators.Wizard1 Wizard1(ISeries<double> input , int nBars)
		{
			return indicator.Wizard1(input, nBars);
		}
	}
}

namespace NinjaTrader.NinjaScript.Strategies
{
	public partial class Strategy : NinjaTrader.Gui.NinjaScript.StrategyRenderBase
	{
		public Indicators.Wizard1 Wizard1(int nBars)
		{
			return indicator.Wizard1(Input, nBars);
		}

		public Indicators.Wizard1 Wizard1(ISeries<double> input , int nBars)
		{
			return indicator.Wizard1(input, nBars);
		}
	}
}

#endregion
