;(function() {
    'use strict';

    angular
        .module('ultrashop.Vacancies', [
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
            $log.debug('ultrashop.Vacancies.run');
        }])
        .config(['$urlRouterProvider', '$stateProvider', 'AppConfig', function($urlRouterProvider, $stateProvider, AppConfig) {
            $urlRouterProvider.when('/', '/vacancies');
            $stateProvider
                .state(AppConfig.root_state + '.vacancies', {
                    url: '^/vacancies',
                    controller: 'VacanciesCtrl',
                    templateUrl: 'components/about/vacancies/main.html'
                });

        }])
        .controller('VacanciesCtrl', ['$scope', '$state', 'AppConfig', '$log', function($scope, $state, AppConfig, $log) {
            $log.debug('ultrashop.Vacancies.controller');
        }]);
})();
