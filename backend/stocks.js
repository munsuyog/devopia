const axios = require('axios');

function calculateRSI(prices, period = 14) {
    const delta = prices.map((price, i) => i > 0 ? price - prices[i - 1] : 0);
    const gain = delta.map(d => d > 0 ? d : 0);
    const loss = delta.map(d => d < 0 ? -d : 0);

    let avgGain = gain.slice(0, period).reduce((sum, value) => sum + value, 0) / period;
    let avgLoss = loss.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

    let rs = avgLoss !== 0 ? avgGain / avgLoss : Infinity;
    let rsi = 100 - (100 / (1 + rs));

    for (let i = period; i < prices.length; i++) {
        avgGain = (avgGain * (period - 1) + gain[i]) / period;
        avgLoss = (avgLoss * (period - 1) + loss[i]) / period;

        rs = avgLoss !== 0 ? avgGain / avgLoss : Infinity;
        rsi = 100 - (100 / (1 + rs));
    }

    return rsi;
}


// Function to fetch historical stock prices from Alpha Vantage API
async function fetchHistoricalPrices(symbol, apiKey) {
    try {
        const response = await axios.get('https://alpha-vantage.p.rapidapi.com/query', {
            params: {
                interval: 'weekly',
                function: 'TIME_SERIES_WEEKLY',
                symbol: symbol,
                datatype: 'json',
                output_size: 'full'
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
        });

        const data = response.data['Weekly Time Series'];

        // Extracting closing prices from the response
        const prices = Object.values(data).map(item => parseFloat(item['4. close']));

        return prices;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Main function
async function main() {
    const symbol = 'TCS'; // Example stock symbol (International Business Machines Corporation)
    const apiKey = '6ad21e80a0mshf4b5c79de90889dp1a9896jsnf3beed8f2b7e'; // Your Alpha Vantage API key

    try {
        const prices = await fetchHistoricalPrices(symbol, apiKey);
        const rsi = calculateRSI(prices);

        console.log('RSI:', rsi);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the main function
main();
