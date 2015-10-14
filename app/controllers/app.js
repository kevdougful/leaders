'use strict';

app.controller('AppController', function($scope, APP) {
	$scope.version = APP.VERSION;
});
