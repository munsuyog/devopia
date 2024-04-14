export const getTransactions = async () => {
    try {
        
        const requestData = {
            access_token: "access-sandbox-046a3e5d-8724-49d8-b2ca-20fe0710a381",
            start_date: "2018-01-01",
            end_date: "2023-07-02"
        };

        const response = await fetch('http://localhost:8000/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
        });

        // Check if the response is successful (status 200-299)
        if (response.ok) {
            // Parse the response body as JSON
            const data = await response.json();
            return data;
        } else {
            // If the response is not successful, throw an error
            throw new Error(`Request failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error(error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

export const getInvestments = async () => {
    try {
        const requestData = {
            access_token: "access-sandbox-5dba78fc-1691-4d6f-8282-872361b1fc71",
            start_date: "2018-01-01",
            end_date: "2023-07-02"
        };

        const response = await fetch('http://localhost:8000/api/investments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
        });

        // Check if the response is successful (status 200-299)
        if (response.ok) {
            // Parse the response body as JSON
            const data = await response.json();
            return data;
        } else {
            // If the response is not successful, throw an error
            throw new Error(`Request failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error(error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

export const getBalance = async () => {
    try {
        const requestData = {
            access_token: "access-sandbox-046a3e5d-8724-49d8-b2ca-20fe0710a381"
        };

        const response = await fetch('http://localhost:8000/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
        });

        // Check if the response is successful (status 200-299)
        if (response.ok) {
            // Parse the response body as JSON
            const data = await response.json();
            return data;
        } else {
            // If the response is not successful, throw an error
            throw new Error(`Request failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error(error);
        throw error; // Rethrow the error to be caught by the caller
    }
}


export async function getRSIFromEndpoint(symbol) {
    const endpoint = 'http://localhost:8000/api/get_rsi';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Assuming your endpoint expects a JSON body with the symbol
            },
            body: JSON.stringify({ symbol: symbol })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rsi = await response.json();
        return rsi;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch RSI from endpoint');
    }
}
