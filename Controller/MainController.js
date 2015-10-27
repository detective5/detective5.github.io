app.controller("MainCtrl", function ($scope) {

})
app.controller("ContactController", function ($scope, $http, $location) {
    $scope.formInfo = {
        Email:"",
        Title: "",
        Message:""
    };
    $scope.submitOnclick = function () {
        $http.post("View/Email.php", { Title: this.formInfo.Title, Message: this.formInfo.Message, Email: this.formInfo.Email }).
        success(function (data, status, headers, config) {
            $location.path("/Thanks");
        }).
        error(function (data, status, headers, config) {
            alert("error");
        });
    }
});

