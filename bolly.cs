//
// Copyright (C) 2023, NinjaTrader LLC <www.ninjatrader.com>.
// NinjaTrader reserves the right to modify or overwrite this NinjaScript component with each release.
//
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
using NinjaTrader.Data;
using NinjaTrader.NinjaScript;
using NinjaTrader.Core.FloatingPoint;
using NinjaTrader.NinjaScript.DrawingTools;
#endregion

// This namespace holds indicators in this folder and is required. Do not change it.
namespace NinjaTrader.NinjaScript.Indicators
{
    public class Bolly : Indicator
    {
        private SMA sma;
        private StdDev stdDev;

        protected override void OnStateChange()
        {
            if (State == State.SetDefaults)
            {
                // ... (Your original settings above)
                AddPlot(Brushes.Green, NinjaTrader.Custom.Resource.BollingerUpperBand);
                AddPlot(Brushes.Yellow, NinjaTrader.Custom.Resource.BollingerMiddleBand);
                AddPlot(Brushes.Green, NinjaTrader.Custom.Resource.BollingerLowerBand);

                // Add plots for the additional upper and lower bands
                AddPlot(Brushes.Goldenrod, "Upper2");
                AddPlot(Brushes.Goldenrod, "Lower2");
                AddPlot(Brushes.Red, "Upper3");
                AddPlot(Brushes.Red, "Lower3");
                AddPlot(Brushes.Purple, "Upper4");
                AddPlot(Brushes.Purple, "Lower4");
            }
            else if (State == State.DataLoaded)
            {
                sma = SMA(Period);
                stdDev = StdDev(Period);
            }
        }

        protected override void OnBarUpdate()
        {
            double sma0 = sma[0];
            double stdDev0 = stdDev[0];

            Upper[0] = sma0 + NumStdDev * stdDev0;
            Lower[0] = sma0 - NumStdDev * stdDev0;
			
			Middle[0]		= sma0;

            // Calculate values for the additional upper and lower bands
            Upper2[0] = sma0 + 2.6 * stdDev0;
            Lower2[0] = sma0 - 2.6 * stdDev0;

            Upper3[0] = sma0 + 3 * stdDev0;
            Lower3[0] = sma0 - 3 * stdDev0;

            Upper4[0] = sma0 + 3.6 * stdDev0;
            Lower4[0] = sma0 - 3.6 * stdDev0;
        }

        // ... (Your original properties above)
		#region Properties
		[Browsable(false)]
		[XmlIgnore()]
		public Series<double> Lower
		{
			get { return Values[2]; }
		}

		[Browsable(false)]
		[XmlIgnore()]
		public Series<double> Middle
		{
			get { return Values[1]; }
		}

		[Range(0, int.MaxValue), NinjaScriptProperty]
		[Display(ResourceType = typeof(Custom.Resource), Name = "NumStdDev", GroupName = "NinjaScriptParameters", Order = 0)]
		public double NumStdDev
		{ get; set; }

		[Range(1, int.MaxValue), NinjaScriptProperty]
		[Display(ResourceType = typeof(Custom.Resource), Name = "Period", GroupName = "NinjaScriptParameters", Order = 1)]
		public int Period
		{ get; set; }

		[Browsable(false)]
		[XmlIgnore()]
		public Series<double> Upper
		{
			get { return Values[0]; }
		}
        // Define Series for the additional upper and lower bands
        [Browsable(false)]
        [XmlIgnore()]
        public Series<double> Upper2
        {
            get { return Values[3]; }
        }

        [Browsable(false)]
        [XmlIgnore()]
        public Series<double> Lower2
        {
            get { return Values[4]; }
        }

        [Browsable(false)]
        [XmlIgnore()]
        public Series<double> Upper3
        {
            get { return Values[5]; }
        }

        [Browsable(false)]
        [XmlIgnore()]
        public Series<double> Lower3
        {
            get { return Values[6]; }
        }

        [Browsable(false)]
        [XmlIgnore()]
        public Series<double> Upper4
        {
            get { return Values[7]; }
        }

        [Browsable(false)]
        [XmlIgnore()]
        public Series<double> Lower4
        {
            get { return Values[8]; }
        }
		#endregion
    }
}

#region NinjaScript generated code. Neither change nor remove.

namespace NinjaTrader.NinjaScript.Indicators
{
	public partial class Indicator : NinjaTrader.Gui.NinjaScript.IndicatorRenderBase
	{
		private Bolly[] cacheBolly;
		public Bolly Bolly(double numStdDev, int period)
		{
			return Bolly(Input, numStdDev, period);
		}

		public Bolly Bolly(ISeries<double> input, double numStdDev, int period)
		{
			if (cacheBolly != null)
				for (int idx = 0; idx < cacheBolly.Length; idx++)
					if (cacheBolly[idx] != null && cacheBolly[idx].NumStdDev == numStdDev && cacheBolly[idx].Period == period && cacheBolly[idx].EqualsInput(input))
						return cacheBolly[idx];
			return CacheIndicator<Bolly>(new Bolly(){ NumStdDev = numStdDev, Period = period }, input, ref cacheBolly);
		}
	}
}

namespace NinjaTrader.NinjaScript.MarketAnalyzerColumns
{
	public partial class MarketAnalyzerColumn : MarketAnalyzerColumnBase
	{
		public Indicators.Bolly Bolly(double numStdDev, int period)
		{
			return indicator.Bolly(Input, numStdDev, period);
		}

		public Indicators.Bolly Bolly(ISeries<double> input , double numStdDev, int period)
		{
			return indicator.Bolly(input, numStdDev, period);
		}
	}
}

namespace NinjaTrader.NinjaScript.Strategies
{
	public partial class Strategy : NinjaTrader.Gui.NinjaScript.StrategyRenderBase
	{
		public Indicators.Bolly Bolly(double numStdDev, int period)
		{
			return indicator.Bolly(Input, numStdDev, period);
		}

		public Indicators.Bolly Bolly(ISeries<double> input , double numStdDev, int period)
		{
			return indicator.Bolly(input, numStdDev, period);
		}
	}
}

#endregion
