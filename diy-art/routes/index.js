// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID});
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();
const firebase = require("firebase");

const database = firebase.database();

router.get('/', (req, res) => {
	res.render('DIY', null)
});

router.get('/home', (req, res) => {
	res.render('DIY', null)
});

router.get('/signup', (req, res) => {

	const data = {
	 type: 'Sign Up'
	};

	res.render('signup', data)

});

router.get('/signin', (req, res) => {

	const data = {
	 type: 'Sign In'
	};

	res.render('signin', data);

});

router.post('/login1', (req, res) => {

  const body = req.body;
  const email = body.username;
  const password = body.pass;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
    res.render('DIY', null)
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  res.send(errorMessage.toString())
  // ...
});

});

router.post('/login', (req, res) => {

  const body = req.body;
  const email = body.username;
  const password = body.pass;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    res.render('DIY', null)
  })
	.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorMessage.toString())
    // ...
  });


});

router.post('/addProduct', (req,res) => {
	const body = req.body;
	const prodId = ''+body.Name+'_'+body.Price;
	const data = {
		name: body.Name,
		image: body.Image,
		price: body.Price
	};

	database.ref('products/' + prodId).set(data).then(function(){
		res.redirect('back');
	})
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			res.send(errorMessage.toString())
			// ...
		});
});

router.post('/add/:name/:price', (req,res) => {

	const name = req.params.name;
	const price = req.params.price;
	const cartId = name+"_"+price;
	const data = {
		name: name,
		price: price
	};

	database.ref('cart/' + cartId).set(data).then(function(){
		res.render('cart', null);
	})
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			res.send(errorMessage.toString())
			// ...
		});
});

router.get('/getCartItems', (req, res) => {
	const productRef = database.ref('cart/');

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
		res.render('cart', data)
		// ...
	});
});

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
  	 res.render('products', data)
  // ...
});
});


router.get('/getProducts', (req, res) => {
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

router.get('/addNewProduct/:name/:price/:image', (req,res) => {

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

router.get('/removeCartItem/:id', (req,res) => {

	const prodId = req.params.id;
	console.log(prodId);
	database.ref('cart').child(prodId).remove().then(function(){
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

/*  This route render json data */
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		app: process.env.TURBO_APP_ID,
		data: 'this is a sample json route.'
	})
});


router.get('/cart', (req, res) => {
	res.render('cart',null)
});


/*  This route sends text back as plain text. */
router.get('/send', (req, res) => {
	res.send('This is the Send Route')
});

/*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
	res.redirect('https://www.turbo360.co/landing')
});

module.exports = router;
