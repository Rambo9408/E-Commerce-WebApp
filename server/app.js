const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = new express();
const connectDB = require('./database/connection');
const port = 3000;
const userRoutes = require('./routes/routes');

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB().catch((err)=>{
    console.error(err);    
});

app.use('/user',userRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
