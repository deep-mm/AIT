// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */

const players = [
	{name: 'Deep', age: 21, team: 'CSK'},
	{name: 'Amey', age: 21, team: 'MI'}
]

const teams = [
	{name: 'CSK', place:'Chennai' },
	{name: 'MI', place:'Mumbai' }
]

const db = {
	team: teams,
	player: players
}
// router.get('/players', (req, res) => {
//
// 	res.json({
// 		confirmation: 'success',
// 		data: players
// 	})
//
// })
//
// router.get('/team', (req,res) => {
//
// 	res.json({
// 		confirmation: 'success',
// 		data: team
// 	})
// })

router.get('/:resource', (req, res) => {

	const resource = req.params.resource
	const data = db[resource]

	//
	//
	// if(resource == 'team'){
	// 	res.json({
	// 	 		confirmation: 'success',
	// 	 		data: teams
	// 	 	})
	//
	// 		return;
	// }
	//
	// if(resource == 'player'){
	// 	res.json({
	// 	 		confirmation: 'success',
	// 	 		data: players
	// 	 	})
	//
	// 		return;
	// }

	res.json({
		confirmation: 'Success',
		data: data
	})
})



module.exports = router
