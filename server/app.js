const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./database/connection');
const categoryRoutes = require('./routes/categoryroutes');
const brandRoutes = require('./routes/brandroutes');
const authRoute = require('./routes/auth');
const prodRoute = require('./routes/productroutes');
const offerController = require("./controllers/offercontroller");

const port = process.env.PORT;
const app = new express();

app.use(cors());

/* There are various ways to log the http request other then morgan like:- 

"morgan" :- You want quick and easy logging
"Custom middleware":- You want simple logging, minimal setup
"winston" / "pino":- You need production-ready, structured logs
"express-winston":- You want advanced HTTP logging + winston

*/

/*There are varius format in which we can define morgan like: 

'combined'	Standard Apache combined log output (IP, user agent, etc.)
'common'	Shorter Apache common format (no referrer or user agent)
'dev'	Color-coded concise output (method, URL, status, response time)
'short'	Shorter than 'common' — good for quick debugging
'tiny'	Very minimal output (method, URL, status, response time)

 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


connectDB().catch((err) => {
    console.error(err);
});

app.use('/user', authRoute);
app.use('/category', categoryRoutes);
app.use('/brand', brandRoutes);
app.use('/auth', authRoute);
app.use('/products', prodRoute);

app.use('/offers/add/:id', offerController.createOffer);
app.use('/offers/update/:id', offerController.updateOffer);
app.use('/offers/delete/:id', offerController.deleteOffer);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
