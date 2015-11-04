;(function() {
    'use strict';

    angular
        .module('ultrashop.Catalog', [
            //'ngAnimate',
            //'ngAria',
            //'ngCookies',
            //'ngResource',
            //'ngSanitize',
            //'ngTouch',
            'ui.bootstrap',
            'ui.router'
        ])
        .run(['$log', function($log) {
            $log.debug('ultrashop.Catalog.run');
        }])
        .config(['$urlRouterProvider', '$stateProvider', 'AppConfig', function($urlRouterProvider, $stateProvider, AppConfig) {
            $urlRouterProvider.when('/', '/catalog');
            $stateProvider
                .state(AppConfig.root_state + '.catalog', {
                    url: '^/catalog',
                    controller: 'CatalogCtrl',
                    templateUrl: 'components/catalog/views/main.html'
                });

        }])
        .controller('CatalogCtrl', ['$scope', '$state', 'AppConfig', '$log', function($scope, $state, AppConfig, $log) {
            $log.debug('ultrashop.Catalog.controller', $scope.model);
            //$scope.model.state = $scope.model.state + '.catalog';
            //$log.debug('ultrashop.Catalog.controller', $scope.model);
        }]);
})();
