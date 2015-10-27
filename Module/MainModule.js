var app = angular.module("mainModule", ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'View/Welcome.html'
            }
        )
        .when('/Projects',
            {
                templateUrl: 'View/ProjectsView.html'
            }
        )
        .when('/Contact',
            {
                templateUrl: 'View/Contact.html'
            }
        )
        .when('/About',
            {
                templateUrl: 'View/AboutView.html'
            }
        )
        .when('/Thanks',
            {
                templateUrl: 'View/Thank.html'
            }
        )
        .otherwise({ redirectTo: 'Welcome.html' });
    //$locationProvider.html5Mode(true);

});


