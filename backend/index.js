const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': '661a0da39efbdb001c3bc7fc',
            'PLAID-SECRET': '9c12f565ff15490a64fc4df3a71166',
        },
    },
});

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8000'] // Whitelist the domains you want to allow
};
const plaidClient = new PlaidApi(configuration);
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/hello", (request, response) => {
    response.json({message: "hello " + request.body.name});
});

app.post('/create_link_token', async function (request, response) {
    const plaidRequest = {
        user: {
            client_user_id: 'user_good',
        },
        client_name: 'Plaid Test App',
        products: ['auth'],
        language: 'en',
        redirect_uri: 'http://localhost:5173/',
        country_codes: ['US'],
    };
    try {
        const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
        response.json(createTokenResponse.data);
    } catch (error) {
        response.status(500).send("failure");
        // handle error
    }
});

app.post("/auth", async function(request, response) {
   try {
       const access_token = request.body.access_token;
       const plaidRequest = {
           access_token: access_token,
       };
       const plaidResponse = await plaidClient.authGet(plaidRequest);
       response.json(plaidResponse.data);
   } catch (e) {
       response.status(500).send("failed");
   }
});

app.post('/exchange_public_token', async function (
    request,
    response,
    next,
) {
    const publicToken = request.body.public_token;
    try {
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });
        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        const accessToken = plaidResponse.data.access_token;
        response.json({ accessToken });
    } catch (error) {
        response.status(500).send("failed");
    }
});
app.post('/api/investments', async function (request, response, next) {
    const publicToken = request.body.access_token;
    try {
      const holdingsResponse = await plaidClient.investmentsHoldingsGet({
        access_token: publicToken
      });
      console.log(holdingsResponse);
      response.json({ error: null, holdings: holdingsResponse.data });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/holdings', async function (request, response, next) {
    const publicToken = request.body.access_token;
    const startDate = request.body.start_date;
    const endDate = request.body.end_date;
    try {
      const holdingsResponse = await plaidClient.investmentsTransactionsGet({
        access_token: publicToken,
        start_date: startDate,
        end_date: endDate
      });
      console.log(holdingsResponse);
      response.json({ error: null, holdings: holdingsResponse.data });
    } catch (error) {
      next(error);
    }
  });


  app.get('/api/balance', function (request, response, next) {
    try {
    const publicToken = request.body.access_token;
      Promise.resolve()
        .then(async function () {
          const balanceResponse = await plaidClient.accountsBalanceGet({
            access_token: publicToken,
          });
          console.log(balanceResponse);
          response.json(balanceResponse.data);
        })
        .catch(error => {
          throw error; // Re-throwing the error to be caught by the outer catch block
        });
    } catch (error) {
      next(error); // Passes the error to the Express error handler
    }
  });
  
  app.get('/api/accounts', async function (request, response, next) {
    const ACCESS_TOKEN = request.body.access_token;
    try {
      const accountsResponse = await plaidClient.accountsGet({
        access_token: ACCESS_TOKEN,
      });
      console.log(accountsResponse);
      response.json(accountsResponse.data);
    } catch (error) {
      next(error); // Passes the error to the Express error handler
    }
  });
  
  app.post('/api/transactions', async function (request, response, next) {
    try {
      // Set cursor to empty to receive all historical updates
      let cursor = null;
      const ACCESS_TOKEN = request.body.access_token;
  
      // New transaction updates since "cursor"
      let added = [];
      let modified = [];
      // Removed transaction ids
      let removed = [];
      let hasMore = true;
      // Iterate through each page of new transaction updates for item
      while (hasMore) {
        const requestParams = {
          access_token: ACCESS_TOKEN,
          cursor: cursor,
        };
        const syncResponse = await plaidClient.transactionsSync(requestParams);
        const data = syncResponse.data;
        // Add this page of results
        added = added.concat(data.added);
        modified = modified.concat(data.modified);
        removed = removed.concat(data.removed);
        hasMore = data.has_more;
        // Update cursor to the next cursor
        cursor = data.next_cursor;
        console.log(syncResponse);
      }
  
      const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
      // Return the 8 most recent transactions
      const recentlyAdded = [...added].sort(compareTxnsByDateAscending).slice(-8);
      response.json({ latest_transactions: recentlyAdded });
    } catch (error) {
      next(error); // Passes the error to the Express error handler
    }
  });

  app.get('/api/liabilities', async function (request, response, next) {
    const ACCESS_TOKEN = request.body.access_token;
    try {
      const accountsResponse = await plaidClient.liabilitiesGet({
        access_token: ACCESS_TOKEN,
      });
      console.log(accountsResponse);
      response.json(accountsResponse.data);
    } catch (error) {
      next(error); // Passes the error to the Express error handler
    }
  });
 
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
app.post('/api/get_rsi', async function(req, res) {
    const symbol = req.body.symbol; // Example stock symbol (International Business Machines Corporation)
    const apiKey = '6ad21e80a0mshf4b5c79de90889dp1a9896jsnf3beed8f2b7e'; // Your Alpha Vantage API key

    try {
        const prices = await fetchHistoricalPrices(symbol, apiKey);
        const rsi = calculateRSI(prices);

        res.json({rsi: rsi});
    } catch (error) {
        console.error('Error:', error);
    }
});

  
app.listen(8000, () => {
   console.log("server has started");
});