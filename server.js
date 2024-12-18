// server.js

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Set up OpenAI API key from .env
const openaiApiKey = process.env.OPENAI_API_KEY;

// Chatbot endpoint
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-003", // You can change to another model
                prompt: userMessage,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${openaiApiKey}`,
                },
            }
        );

        const chatbotMessage = response.data.choices[0].text.trim();
        res.json({ reply: chatbotMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error with OpenAI API");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
