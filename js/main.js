let fakeNewsApp = angular.module('fakeNewsApp', [
    'fakeNewsControllers',
    'fakeNewsServices',
    'angular-growl',
    'ngTagsInput'
])
    .config(['growlProvider', function (growlProvider) {
        growlProvider.onlyUniqueMessages(false);
        growlProvider.globalTimeToLive(3000);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalPosition('bottom-right');
    }])
    .run(function ($rootScope, $window) {
        $window.console.log("App started at" + new Date());
    });



