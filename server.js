const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('req-flash');

app.set('view engine', 'ejs');
app.set('veiw', path.join(__dirname + '../frontend/view/'));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
//  cookie: { secure: true }
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/product'));
app.use('/cart', require('./routes/cart'));

app.get('*', function(req,res,next) {
    res.locals.cart = req.session.cart;
    next();
 });
// app.get('/', (req, res) => {
//     const products = res;
//     res.render('index', {
//         products: products
//     });
// });


app.listen(4000, () => 
    console.log(`Express server running on port 4000`)
);