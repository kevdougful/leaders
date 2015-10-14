'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var debug = require('debug')('leaders:app');
var http = require('http');
var models = require('./models');

var app = express();
var routes = require('./routes/index');
var apiRoutes = require('./routes/api');

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

app.use('/api', apiRoutes);
app.use('/', routes);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server;
models.sequelize.sync().then(function() {
	server = http.createServer(app).listen(port, function() {
		debug('Express server listening on port ' + port);
	});
	server.on('error', onError);
	server.on('listening', onListening);
});

function normalizePort(val) {
	var port = parseInt(val, 10);
	if (isNaN(port)) {
	// named pipe
		return val;
	}
	if (port >= 0) {
	// port number
		return port;
	}
	return false;
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}
