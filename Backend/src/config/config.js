// config.js
const { config } = require('dotenv');
config(); // Loads .env variables into process.env

const _config = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY, 
    MONGODB_URI: process.env.MONGODB_URI  
};



module.exports = _config;
