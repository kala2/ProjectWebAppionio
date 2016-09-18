app.controller("HomeCtrl", function($scope, $http, $location, $rootScope, $routeParams) {

    $http.get('/resources')
        .success(function(response) {
            $scope.resources = response;
        });

    $scope.all = function() {
        $http.get('/home')
            .success(function(response) {
                $scope.articles = response;

            });
    };

    $scope.remove = function(id, id2) {

        $http.delete("/home/" + id)
            .success(function(response) {
                $http.get("/home/article/" + id2)
                    .success(function(response) {
                        $http.get('/resources')
                            .success(function(response) {
                                $scope.resources = response;
                            });
                        $scope.articles = response;

                    });
            });
    };

    $scope.find = function(id) {

        $http.get("/home/" + id)
            .success(function(response) {
                $scope.articles2 = response;

            });
    };


    $scope.callArticle = function(id) {

        $http.get("/home/article/" + id)
            .success(function(response) {
                $scope.articles = response;

            });

    };



    $scope.addComment = function(id, comment) {

        $http.put("/home/" + id, {
                "comment": comment
            })
            .success(function(response) {
                $http.get("/home/article/" + id)
                    .success(function(response) {
                        $scope.articles = response;
                    });
            });
    };

    $scope.addScope = function(idarticle, idcomment, reply) {

        $scope.idcomment = idcomment;

    };

    $scope.addScopeResource = function(id) {

        $http.get("/resources/" + id)
            .success(function(response) {
                $scope.resource = response;
            });
        $http.get("/home/" + id)
            .success(function(response) {
                $scope.articles2 = response;

            });

    };

    $scope.addReply = function(idarticle, idcomment, reply) {

        idcomment = $scope.idcomment;

        $http.put("/home/" + idarticle + ("/") + idcomment, {
                "reply": reply
            })
            .success(function(response) {
                $http.get("/home/article/" + idarticle)
                    .success(function(response) {
                        $scope.articles = response;
                    });
            });
    };

    $scope.removeComment = function(id, id2) {

        $http.put("/home/article/" + id + ("/") + id2)
            .success(function(response) {
                $http.get("/home/article/" + id)
                    .success(function(response) {
                        $scope.articles = response;
                    });
            });
    };

    $scope.removeReply = function(idarticle, idcomment, idreply) {

        $http.put("/home/article/" + idarticle + ("/") + idcomment + ("/") + idreply)
            .success(function(response) {
                $http.get("/home/article/" + idarticle)
                    .success(function(response) {
                        $scope.articles = response;
                    });
            });

    };

});