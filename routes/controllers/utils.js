'use strict';

var respond = function(res, status, success, error, obj) {
	var response = {
		success: success,
		error: error,
		object: obj
	};
	if (status == 204) {
		res.sendStatus(status);
	} else {
		res.status(status).json(response);
	}
};

module.exports = {
	respond: respond
}