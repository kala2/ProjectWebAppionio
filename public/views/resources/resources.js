app.controller("ResCtrl", function($scope, $http) {


    $scope.addResource = function() {

        $http.post('/resources', $scope.resource)
            .success(function(response) {
                $scope.resources.push(response);
                $scope.all();


            });
    };

    $scope.all = function() {
        $http.get('/resources')
            .success(function(response) {
                var resource = "";
                $scope.resources = response;
                $scope.resource = "";
            });
    };

    $scope.remove = function(id) {
        $http.delete("/resources/" + id)
            .success(function(response) {
                $http.delete("/deletearticles/" + id)
                    .success(function(response) {
                        $http.delete("/deletelogs/" + id)
                            .success(function(response) {
                                $scope.all();
                            });
                    });
            });
    };

    $scope.savePost = function() {

        $http.post('/new-post', $scope.article)
            .success(function(response) {
                var article = "";
                $scope.articles = response;
                $scope.article = "";

            });
    }
    $scope.resetarticle = function() {
        var article = "";
        $scope.article = "";
        $scope.selectedResource = "";

    }

    $scope.all();



});