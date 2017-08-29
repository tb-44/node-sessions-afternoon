const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');

const swag_controllers = require('./controllers/swag_controllers');
const auth_constrollers = require('./controllers/auth_controllers');
const cart_controllers = require('./controllers/cart_controllers');
const search_controllers = require('./controllers/search_controllers');

let app = express();

app.use( bodyParser.json() );
app.use( session({
  secret: 'AnythingBaby',
  resave: false,
  saveUninitialized: false
}));

app.use( checkForSession );
app.use( express.static( `${__dirname}/../public/build` ) );

app.get('/api/swag', swag_controllers.read);

app.post('/api/login', auth_constrollers.login );
app.post('/api/register', auth_constrollers.register );
app.post('/api/signout', auth_constrollers.signout );
app.get('/api/getUser', auth_constrollers.getUser);

app.post('/api/cart', cart_controllers.add );
app.post('/api/cart/checkout', cart_controllers.checkout );
app.delete('/api/cart', cart_controllers.delete );

app.get('/api/search', search_controllers.search );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
