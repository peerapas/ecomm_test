const express = require('express');
const router = express.Router();
const Products = require('../models/products');
const { Op } = require("sequelize");

router.get('/add/:productCode', (req, res) => {
    const productCode = req.params.productCode;
    Products.findAll({ where: { productCode: productCode }}

    ).then(target => {
        if(typeof req.session.cart == 'undefined'){
            req.session.cart = [];
            req.session.cart.push({
                product: target,
                qty: 1
            });
        }else{
            req.session.cart.push({
            product: target,
            qty: 1
        });
        }
        // res.send(req.session.cart[0].product[0].productCode)
        // console.log(req.session.cart[0].product)
        req.flash('success', 'Product added!');
        res.redirect('back');
    })
});

router.get('/checkout', function (req, res) {

    if (req.session.cart && req.session.cart.length == 0) {
        delete req.session.cart;
        res.redirect('/cart/checkout');
    } else {
        res.render('checkout', {
            title: 'Checkout',
            cart: req.session.cart
        });
    }

});

router.get('/update/:product', function (req, res) {

    var targetCode = req.params.product;
    var cart = req.session.cart;
    var action = req.query.action;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product[0].productCode == targetCode) {
            switch (action) {
                case "add":
                    cart[i].qty++;
                    break;
                case "remove":
                    cart[i].qty--;
                    if (cart[i].qty < 1)
                        cart.splice(i, 1);
                    break;
                case "clear":
                    cart.splice(i, 1);
                    if (cart.length == 0)
                        delete req.session.cart;
                    break;
                default:
                    console.log('update problem');
                    break;
            }
            break;
        }
    }

    req.flash('success', 'Cart updated!');
    res.redirect('/cart/checkout');

});

router.get('/clear', function (req, res) {

    delete req.session.cart;
    
    req.flash('success', 'Cart cleared!');
    res.redirect('/cart/checkout');

});

module.exports = router;