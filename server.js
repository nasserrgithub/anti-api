const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');

const app = express();
const db = knex ({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '22JuLy20',
		database: 'antiguild'
	}
})

app.use(bodyParser.json());
app.use(cors());


//controllers
app.get('/', (req,res) => {
	res.send('Back-end is working!')
})

app.post('/register', (req,res) => {
	const {ign} = req.body;
	db('players')
	.insert({
		ign: ign,
		joined: new Date()
	})
	.returning('*')
	.then(player => {
		res.json(player[0])
	})
	
})

app.get('/worldboss', (req,res) => {
	db.select('ign').from('players').orderBy('id').then(data => res.json(data))
})



app.listen(3000, () => {
	console.log(`App is runnin on port 3000`)
});