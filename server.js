require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/email', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('connected', () => {
	console.log('Mongoose Database Connected Successfully');
});

connection.on('error', (err) => {
	console.log('Mongoose default connection error: ' + err);
});

app.use('/mailapi/', require('./routes/mailController'));
app.use('/api/user', require('./routes/userController'));

app.use(express.static(__dirname + '/client/build/'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`your server - Api is running on port + ${PORT}`);
});
