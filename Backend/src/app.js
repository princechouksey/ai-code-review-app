const express = require('express');
const projectRoutes = require('./routes/project.routes');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: "https://ai-code-review-app-frontend.onrender.com/", // your frontend URL
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.use('/projects', projectRoutes)



module.exports = app;
