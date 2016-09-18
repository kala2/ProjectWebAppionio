app.controller("ActivitylogCtrl", function($scope, $http) {


    $http.get('/resources')
        .success(function(response) {
            $scope.resources = response;
        });

    $scope.addLog = function() {

        $http.post('/activitylog', $scope.log)
            .success(function(response) {
                $scope.logs.push(response);
                $scope.resetLog();


            });
    };


    $scope.resetLog = function() {

        var log = "";
        $scope.log = "";
        $scope.selectedResource = "";
    };



    $scope.all = function() {
        $scope.notesall = true;
        $scope.notes = false;
        $http.get('/activitylog')
            .success(function(response) {
                var log = "";
                $scope.logs = response;
                $scope.log = "";
                $scope.resource = "";

            });
    };

    $scope.find = function(id) {
        $scope.notes = true;
        $scope.notesall = false;

        $http.get("/resources/" + id)
            .success(function(response) {
                $scope.resource = response;
            });
        $http.get("/activitylogid/" + id)
            .success(function(response) {
                $scope.logs = response;
            });
    };


    $scope.remove = function(id) {

        $http.delete("/activitylog/" + id)
            .success(function(response) {
                $scope.all();
                $scope.resource = "";
            });
    };
    $scope.all();
});