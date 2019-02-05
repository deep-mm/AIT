// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
var firebase = require("firebase");

var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('https://www.googleapis.com/auth/drive');

var flag = true;

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// global.document = new JSDOM('localhost:3000/home').window.document;
// var Blob = require('blob');
//
// var iframe = require('iframe')
// frame = iframe({ container: document.querySelector('#iframe-cont') , scrollingDisabled: false})

const products = {

	car: {
		title: 'Car',
		image: '/images/turbo.png',
		price: '50'
	},

	phone: {
		title: 'Phone',
		image: '/images/turbo.png',
		price: '1000'
	},

	car1: {
		title: 'Car',
		image: '/images/turbo.png',
		price: '50'
	},

	phone1: {
		title: 'Phone',
		image: '/images/turbo.png',
		price: '1000'
	},

	car2: {
		title: 'Car',
		image: '/images/turbo.png',
		price: '50'
	},

	phone2: {
		title: 'Phone',
		image: '/images/turbo.png',
		price: '1000'
	},

	car3: {
		title: 'Car',
		image: '/images/turbo.png',
		price: '50'
	},

	phone3: {
		title: 'Phone',
		image: '/images/turbo.png',
		price: '1000'
	}

}

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.get('/home', (req, res) => {

	res.render('DIY', null)
})

router.get('/signup', (req, res) => {

	const data = {
	 type: 'Sign Up'
	}
  res.render('signin', data)

})

router.get('/signin', (req, res) => {

	const data = {
	 type: 'Sign In'
	}
  res.render('signin', data)

})

router.post('/login1', (req, res) => {

  const body = req.body
  const email = body.username
  const password = body.pass

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

})

router.post('/login', (req, res) => {

  const body = req.body
  const email = body.username
  const password = body.pass

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


})

router.post('/addProduct', (req,res) => {
	const body = req.body
	const prodId = ''+body.Name+'_'+body.Price
	const data = {
		name: body.Name,
		image: body.Image,
		price: body.Price
	}

	database.ref('products/' + prodId).set(data);

  res.redirect('back');
})

router.get('/products', (req, res) => {
  var productRef = database.ref('products/');

  productRef.on('value', function(snapshot) {
    const prod = snapshot.val();
    const keys = Object.keys(prod)
  	const list = []
  	keys.forEach(key => {
  	list.push(prod[key])
  	})

  	 const data = {
  	 	products: list
  	 }
     //frame.setHTML({ body: 'Hello' })
  	 res.render('products', data)
  // ...
});
})

/*  This route render json data */
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		app: process.env.TURBO_APP_ID,
		data: 'this is a sample json route.'
	})
})


router.get('/cart', (req, res) => {
	res.render('cart',null)
})


/*  This route sends text back as plain text. */
router.get('/send', (req, res) => {
	res.send('This is the Send Route')
})

/*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
	res.redirect('https://www.turbo360.co/landing')
})

module.exports = router
