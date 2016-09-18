app.controller("EditresourceCtrl", function($scope, $http, $routeParams, $location) {
    var id = $routeParams.id;
    $scope.updated = "false";
    $http.get("/resources/" + id)
        .success(function(response) {
            $scope.resource = response;
        });

    $scope.update = function() {
        console.log($scope.resource._id);
        $http.put("/resources/" + $scope.resource._id, $scope.resource)
            .success(function(response) {
                $scope.resource = "";
                $scope.updated = "true";
            });
    };

    $scope.back = function() {
        window.history.back();
    };

});