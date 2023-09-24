# OHLC-Half-Cycle-of-Time-and-Price
Overview: This project introduces a custom technical indicator designed for the financial markets. Developed in collaboration with an experienced Chicago CME market technician, the indicator combines various technical analysis components to provide traders with valuable insights into market dynamics and potential trading opportunities.

Key Features:

Bollinger Bands with Dynamic Standard Deviations: The indicator utilizes Bollinger Bands for technical analysis. However, it's essential to note that the OHLC (Open, High, Low, Close) calculations pertain to the oscillator component and not the bands themselves. The Bollinger Bands do not use a fixed 144-bar lookback period; instead, they employ dynamic standard deviations from the mean. These standard deviations are adjusted as follows:
2.6 Standard Deviations
3 Standard Deviations
3.6 Standard Deviations
4 Standard Deviations

Oscillator with Exponential Moving Averages (EMAs): The indicator includes an oscillator that calculates the difference between four different Exponential Moving Averages (EMAs) and the highest high and lowest low over the past 144 bars. This oscillator serves as a robust tool for identifying trends and gauging market momentum.

Elliott Wave Pattern Detection: Leveraging chaos theory, the indicator identifies potential Elliott Wave patterns, including "3 up, 3 down" and "4 up, 4 down" sequences. These patterns are invaluable for traders engaged in wave analysis, aiding in precise trend recognition and predictive analytics.

Technical Implementation: The indicator is implemented using JavaScript and C#, ensuring compatibility with a variety of trading platforms and software tools, making it highly accessible for traders across different environments.

Practical Application: Traders and analysts can seamlessly apply this custom indicator to financial charts, enabling them to decode market trends, pinpoint potential trend reversals, and identify wave patterns. It empowers traders to make well-informed decisions and effectively manage risk within their trading strategies.

This custom technical indicator represents a potent addition to a trader's toolkit, enhancing their technical analysis capabilities and assisting them in navigating the complexities of financial markets. It should be noted that the indicator's effectiveness may vary based on market conditions and should be utilized in conjunction with other analytical techniques and risk management strategies to optimize trading outcomes.
