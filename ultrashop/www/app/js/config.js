;(function() {
    'use strict';

    angular
        .module('ultrashop.Config', [])
        .constant('AppConfig', {
            //backend_url: '/models',
            root_state: 'main'
        })
        .run(['$log', function($log) {
            $log.debug('ultrashop.Config.run');
        }]);
})();
