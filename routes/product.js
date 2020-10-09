const express = require('express');
const router = express.Router();
const Products = require('../models/products');
const { Op } = require("sequelize");

// router.get('/', (req, res) => Products.findAll()
//     .then(products => {
//         res.send(products);
//     })
//     .catch(err => console.log(err))
// );
// router.get('/', (req, res) => Products.findAll({
//     where: {
//         productVendor: {
//             [Op.eq]: "Autoart Studio Design"
//         }
//     }
//     }).then(products => {
//         res.json(products);
//     })
//     .catch(err => console.log(err))
// );

router.get('/', function(req, res) {
    Products.findAll({
    where: {
        productVendor: {
            [Op.eq]: "Autoart Studio Design"
        }
    }
    }).then(products => {
        // console.log(typeof products);
        res.render('index', {
            products: products
        });
    })
    // res.render('index', {
    //     products: products
    // });
} );
router.get('/CarouselDieCastLegends', (req, res) => Products.findAll({
    where: {
        productVendor: {
            [Op.eq]: "Carousel DieCast Legends"
        }
    }
    }).then(products => {
        // console.log(typeof products);
        res.render('index', {
            products
        })
    })
    .catch(err => console.log(err))
);
router.get('/ClassicMetalCreations', (req, res) => Products.findAll({
    where: {
        productVendor: {
            [Op.eq]: "Classic Metal Creations"
        }
    }
    }).then(products => {
        res.send(products);
    })
    .catch(err => console.log(err))
);

module.exports = router;