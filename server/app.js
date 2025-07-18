const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./database/connection');
const userRoutes = require('./routes/routes');
const authRoute = require('./routes/auth');

const port = process.env.PORT;
const app = new express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB().catch((err)=>{
    console.error(err);    
});

app.use('/user',authRoute);
app.use('/category',userRoutes);
app.use('/auth', authRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
