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

const plaidClient = new PlaidApi(configuration);
const app = express();
app.use(cors());
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
  
  app.get('/api/transactions', async function (request, response, next) {
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
 
  
app.listen(8000, () => {
   console.log("server has started");
});