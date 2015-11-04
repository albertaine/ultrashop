;(function() {
    'use strict';

    angular.module('ultrashop.Auth', [
        'ultrashop.Firebase'
    ])
        .factory('AuthFct', AuthFctFn);

    // @ngInject
    function AuthFctFn(dbc, $firebaseAuth, $rootScope, $firebaseObject, $state, $log) {
        var o = {};

        var ref = dbc.getRef();
        var authObj = $firebaseAuth(ref);
        var usersRef = ref.child('users');

        o.auth = function(_user) {
            console.log('=== auth ===');

            return authObj.$authWithPassword(_user);
        };

        o.checkAuth = function() {
        };

        o.onAuth = function() {
            console.log('=== onAuth ===');

            authObj.$onAuth(function(authData) {
                if (authData) {
                    $rootScope.userLoggedIn = true;
                    var user = $firebaseObject(usersRef.child(authData.uid));
                    user.$loaded(function(_user) {
                        $rootScope.currentUser.fullName = _user.fullname;
                        $rootScope.currentUser.id = _user.$id;
                    });
                    //console.log('=== onAuth === Logged in as ', authData.uid, ', user email = ', authData.password.email);
                    console.log('=== onAuth === Logged in as ', authData.uid);
                }
                else {
                    $rootScope.userLoggedIn = false;
                    $rootScope.currentUser.fullname = null;
                    $rootScope.currentUser.id = null;
                    console.log('Not logged in');
                }
                //o.checkAuth();
            });
        };

        o.onAuth();

        o.require = function() {
            return authObj.$requireAuth();
        };

        o.loginUser = function(_user) {
            $log.debug('Auth user: ' + _user.email + ', ' + _user.password);
            return authObj.$authWithPassword({
                email: _user.email,
                password: _user.password
            });
        };

        o.isUserLoggedIn = function() {
            return authObj.$getAuth() ? true : false;
        };

        o.registerUser = function(newUser) {
            console.log('=== registerUser === ' + newUser.email + ', ' + newUser.password);

            return authObj.$createUser(
                {
                    email: newUser.email,
                    password: newUser.password
                })
                .then(function(authData) {
                    console.log('User registered with id = ' + authData.uid);

                    // Create new user in Users list
                    usersRef.child(authData.uid).set({
                        fullname: newUser.fullname || 'Dear Friend',
                        email: newUser.email,
                        regDate: Firebase.ServerValue.TIMESTAMP
                    });

                    return authObj.$authWithPassword({
                        email: newUser.email,
                        password: newUser.password
                    });
                })
                .then(function(authData) {
                    console.log('=== authObj.createUser === Logged in as ' + authData.uid);
                })
                .catch(function(error) {
                    console.error('Authentication failed ' + error);
                });
        };

        o.logOut = function() {
            authObj.$unauth();
            //o.checkAuth();
            $state.go('main.catalog');
        };

        o.facebookSignUp = function() {
            return authObj.$authWithOAuthPopup('facebook')
                .then(function(authData) {

                    // Create new user in Users list
                    usersRef.child(authData.uid).set({
                        fullname: authData.facebook.displayName,
                        email: null,
                        facebookId: authData.facebook.id,
                        avatar: authData.facebook.profileImageURL,
                        regDate: Firebase.ServerValue.TIMESTAMP
                    });

                    console.log('Facebook sign up ', authData);
                });
        };
/*
        o.facebookSignIn = function() {
            return authObj.$authWithOAuthPopup('facebook')
                .then(function(authData) {
                    console.log('Facebook sign in ', authData);
                });
        };
*/
        o.facebookSignIn = function() {
            return authObj.$authWithOAuthPopup("facebook", function(error, authData) { /* Your Code */ }, {
                remember: "sessionOnly"/*,
                scope: "email,user_likes"*/
            });
        };

        return o;
    }

})();
