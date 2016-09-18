var app = angular.module("webApp", ["ngRoute"]);

app.config(function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home/home.html',
            controller: "HomeCtrl",
            resolve: {
                loggedin: checkLoggedin
            }

        })
        .when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: "ProfileCtrl",
            resolve: {
                loggedin: checkLoggedin
            }


        })
        .when('/resources', {
            templateUrl: 'views/resources/resources.html',
            controller: 'ResCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when('/resources/editresource/:id', {
            templateUrl: 'views/editresource/editresource.html',
            controller: 'EditresourceCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when('/resources/createarticle/:id', {
            templateUrl: 'views/createarticle/createarticle.html',
            controller: 'CreatearticleCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })

    .when('/home/editarticle/:id', {
            templateUrl: 'views/editarticle/editarticle.html',
            controller: 'EditarticleCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when('/activitylog', {
            templateUrl: 'views/activitylog/activitylog.html',
            controller: "ActivitylogCtrl",
            resolve: {
                loggedin: checkLoggedin
            }

        })
        .otherwise({
            redirectTo: '/'
        })



});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            $rootScope.errorMessage = 'Need to log in.';
            deferred.reject();
            $location.url('/login');
        }


    });
    return deferred.promise;
};

app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $scope.logout = function() {
        $http.post("/logout")
            .success(function() {
                $rootScope.currentUser = null;
                $location.url("/login");

            });

    };


});

app.controller("LoginCtrl", function($scope, $http, $location, $rootScope) {
    $scope.login = function(user) {
        $http.post("/login", user)
            .success(function(user) {
                $rootScope.currentUser = user;
                $scope.user = "";
                $location.url("/home");
                $scope.error1 = "false";

            })
            .error(function() {
                $scope.error = "true";
            });
        $scope.error = "false";

    }

    $scope.register = function(user) {
        if (user.password == user.password2) {
            if (user.password != null || user.password2 != null) {
                $http.post("/register", user)
                    .success(function(response) {
                        if (response != null) {
                            $rootScope.currentUser = response;
                            $scope.user = "";
                            $scope.error1 = "false";

                            $location.url("/home");
                        } else {
                            $scope.error1 = "true";


                        }


                    });


            }
        }

        if (user.password == user.password2) {

            $scope.error2 = "false";

        } else {
            $scope.error2 = "true";
        }

        if (user.password == null && user.password2 == null) {
            $scope.error3 = "true";
        } else {
            $scope.error3 = "false";
        }

    }
});