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
                templateUrl: 'View/Contact.html',
                controller: "ContactController",
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
        .when('/Projects/FaceLock',
            {
                templateUrl: 'View/FaceLock.html',
                controller: "FaceLockController",
            }
        );

        //.otherwise({ redirectTo: 'Welcome.html' });
    //$locationProvider.html5Mode(true);

});


