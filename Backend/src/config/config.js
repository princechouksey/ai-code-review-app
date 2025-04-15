const {config}  = require('dotenv')
config()
const _config = {
    GEMINI_API_KEY:process.env.GEMINI_API_KEY, 
    MONGODB_URI:process.env.MONGODB_URI  
}
// console.log(_config.GEMINI_API_KEY),
// console.log(process.env.MONGODB_URI);

module.exports = _config