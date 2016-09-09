var app = angular.module("myApp", ["ngRoute"]);
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: 'src/view/weather.html'
        , controller: "myCtrl"
    });
}]);
app.controller("myCtrl", function ($scope, $http) {
    $http.jsonp("https://api.forecast.io/forecast/3d03ddb61ef8a5ddd53233ee9dc2f308/47.6062,-122.3320?callback=JSON_CALLBACK").then(function (response) {
        console.log(response);
        $scope.data1 = response.data.daily.data;
    }, function (error) {
        console.log("Error: " + error);
    });
    $scope.getTime = function (UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var day = daysInWeek[a.getDay()];
        var time = day.substring(0,3) + ', ' + month.substring(0,3) + ' ' + $scope.dateOrdinals(date) + ' ' + year;
        return time;
    };
    $scope.dateOrdinals = function (d) {
        if (d > 3 && d < 21) return d + 'th';
        switch (d % 10) {
        case 1:
            return d + "st";
        case 2:
            return d + "nd";
        case 3:
            return d + "rd";
        default:
            return d + "th";
        }
    };
});