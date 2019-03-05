const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID});
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();
const firebase = require("firebase");

const database = firebase.database();

router.get('/products', (req, res) => {
    const productRef = database.ref('products/');

    productRef.on('value', function(snapshot) {
        const prod = snapshot.val();
        const keys = Object.keys(prod);
        const list = [];
        keys.forEach(key => {
            list.push(prod[key])
        });

        const data = {
            products: list
        };
        //frame.setHTML({ body: 'Hello' })
        res.json({
            confirmation: 'success',
            app: process.env.TURBO_APP_ID,
            data: data
        })
        // ...
    });
});

router.get('/products/add/:name/:price/:image', (req,res) => {

    const name = req.params.name;
    const price = req.params.price;
    const image = req.params.image;
    const prodId = ''+name+'_'+price;
    const data = {
        name: name,
        image: image,
        price: price
    };

    database.ref('products/' + prodId).set(data).then(function(){
        res.json({
            confirmation: 'success',
            app: process.env.TURBO_APP_ID
        })
    })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            res.send(errorMessage.toString())
            // ...
        });
});

router.post('/products/add', (req,res) => {

    const body = req.body;
    const name= body.Name;
    const price = body.Price;
    const image = body.Image;
    const prodId = ''+name+'_'+price;
    const data = {
        name: name,
        image: image,
        price: price
    };

    database.ref('products/' + prodId).set(data).then(function(){
        res.json({
            confirmation: 'success',
            app: process.env.TURBO_APP_ID
        })
    })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            res.send(errorMessage.toString())
            // ...
        });
});

router.get('/products/:id', (req, res) => {
    const productRef = database.ref('products/');

    productRef.on('value', function(snapshot) {
        const prod = snapshot.val();

        const data = {
            product: prod[id]
        };
        //frame.setHTML({ body: 'Hello' })
        res.json({
            confirmation: 'success',
            app: process.env.TURBO_APP_ID,
            data: data
        })
        // ...
    });
});

router.get('/products/delete/:id', (req, res) => {
    const prodId = req.params.id+'';

    database.ref('products').child(prodId).remove().then(function(){
        res.json({
            confirmation: 'success',
            app: process.env.TURBO_APP_ID
        })
    })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            res.send(errorMessage.toString())
            // ...
        });
});

module.exports = router;