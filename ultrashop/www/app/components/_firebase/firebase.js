;(function() {
    'use strict';

    angular.module('ultrashop.Firebase', [
        'firebase'
    ])
        .constant('FIREBASE_URL', 'https://ultrashop.firebaseio.com/')
        .factory('dbc', dbcFactory);

    // @ngInject
    function dbcFactory(FIREBASE_URL, $firebaseAuth) {
        var o = {};

        var reference = new Firebase(FIREBASE_URL);

        o.getRef = function() {
            return reference;
        };



        return o;
    }

})();
