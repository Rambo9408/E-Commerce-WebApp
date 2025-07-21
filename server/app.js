const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./database/connection');
const categoryRoutes = require('./routes/categoryroutes');
const brandRoutes = require('./routes/brandroutes');
const authRoute = require('./routes/auth');
const prodRoute =  require('./routes/productroutes');

const port = process.env.PORT;
const app = new express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));


connectDB().catch((err)=>{
    console.error(err);    
});

app.use('/user',authRoute);
app.use('/category',categoryRoutes);
app.use('/brand',brandRoutes);
app.use('/auth', authRoute);
app.use('/products', prodRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
