app.controller("ProfileCtrl", function($scope, $http, $location, $rootScope) {
    $scope.updated = "false";
    $scope.profile = function(user) {

        if (user.password == user.password2) {
            if (user.password != null || user.password2 != null) {
                $http.put("/profile", user)
                    .success(function(response) {
                        if (response != null) {
                            $rootScope.currentUser = response;
                            $scope.user = "";

                            $scope.updated = "true";
                            $location.url("/profile");
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