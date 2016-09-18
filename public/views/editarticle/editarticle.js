app.controller("EditarticleCtrl", function($scope, $http,  $routeParams, $location) {
	var id =  $routeParams.id;
	$scope.updated = "false";
	$http.get("/home/article/" + id)
		.success(function(response){
			$scope.article = response;

		});
	
	$scope.update = function(title, body) {
		$http.put("/home/editarticle/" + id + ("/") + title + ("/") + body, $scope.article)
		.success(function(response){
			$scope.article = "";
			$scope.updated = "true";
		});
	};

	$scope.back = function() {
		window.history.back();

	};

});