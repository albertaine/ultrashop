;(function() {
    'use strict';

    angular
        .module('ultrashop.NavBar', [
            'ui.bootstrap',
            'ui.router'
        ])
        .run(['$log', function($log) {
            //$log.debug('ultrashop.NavBar.run');
        }])
        .config(['$urlRouterProvider', '$stateProvider', 'AppConfig', function($urlRouterProvider, $stateProvider, AppConfig) {
            $urlRouterProvider.when('/', '/catalog');
            $stateProvider
                .state(AppConfig.root_state, {
                    url: '/',
                    controller: 'NavBarCtrl',
                    templateUrl: 'components/navbar/main.html'
                });

        }])
        .controller('NavBarCtrl', ['$scope', '$state', 'AppConfig', '$log', function($scope, $state, AppConfig, $log) {
            //$log.debug('ultrashop.NavBar.controller');

            $scope.model = {
                state: AppConfig.root_state
            };

        }]);

})();
