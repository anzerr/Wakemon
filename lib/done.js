 
 var app = angular.module("CatApp", []);
app.controller("CatController", function($scope) {
	 $scope.inventory = {
		0:{
			"text":"done"
		},
		1:{
			"text":"in"
		},
		2:{
			"text":"angular"
		},
		3:{
			"text":":)"
		},
	 }
});
