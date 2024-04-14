require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const openai = require('openai');
const cors = require('cors');

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));

// Create OpenAI client using API key from environment variable
const client = new openai.OpenAI(process.env.OPENAI_API_KEY);

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to handle POST requests to /ask
app.post('/ask', async (req, res) => {
    const { query } = req.body;

    // Prompt specific to finance
    const prompt = `Discuss finance-related topics: ${query}`;

    try {
        // Call OpenAI API to generate response
        const response = await client.completion.create({
            engine: 'davinci',
            prompt: prompt,
            max_tokens: 150
        });

        // Filter or analyze the response to ensure it's finance-related
        const financeResponse = response.data.choices[0].text.trim();
        // Example filter: Check if response contains finance-related keywords
        if (containsFinanceKeywords(financeResponse)) {
            res.json({ answer: financeResponse });
        } else {
            res.json({ answer: "I couldn't find relevant information about finance." });
        }
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Function to check if response contains finance-related keywords
function containsFinanceKeywords(response) {
    const financeKeywords = ['finance', 'investment', 'stocks', 'bonds', 'economy', 'market'];
    for (const keyword of financeKeywords) {
        if (response.toLowerCase().includes(keyword)) {
            return true;
        }
    }
    return false;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
