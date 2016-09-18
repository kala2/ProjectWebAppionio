app.controller("CreatearticleCtrl", function($scope, $http, $routeParams, $location) {
    var id = $routeParams.id;
    $scope.created = "false";
    $http.get("/resources/" + id)
        .success(function(response) {
            $scope.resource = response;
        });

    $scope.savePost = function(id) {

        $http.post('/new-post/' + id, $scope.article)
            .success(function(response) {
                var article = "";
                $scope.articles = response;
                $scope.article = "";
                $scope.created = "true";

            });
    }

    $scope.resetarticle = function() {
        var article = "";
        $scope.article = "";
        $scope.selectedResource = "";

    }

    $scope.back = function() {
        window.history.back();
    };

});