;(function() {
    'use strict';

    angular.module('ultrashop.Sign', [
        'ultrashop.Config',
        'ultrashop.Auth',
        'ui.router'
    ])
        .controller('signInCtrl', signInController)
        .controller('modalSignInCtrl', modalSignInController)
        .controller('signUpCtrl', signUpController)
        .controller('signOutCtrl', signOutController)
        .config(signConfig);

    // @ngInject
    function signUpController(AuthFct, $state) {
        var self = this;

        function clean() {
            self.user = {
                'email': null,
                'password': null,
                'fullname': null
            };
        }

        clean();

        self.facebookSignUp = function() {
            AuthFct.facebookSignUp()
                .then(function(e) {
                    $state.go('main.catalog');
                });
        };

        self.signUp = function() {
            AuthFct.registerUser(self.user)
                .then(function(e) {
                    clean();
                    $state.go('main.catalog');
                });
        };
    }

    // @ngInject
    function signInController(AuthFct, $state, $rootScope) {
        var self = this;

        function clean() {
            self.user = {
                'email': null,
                'password': null,
                'fullname': null
            };
        }

        clean();

        self.facebookSignIn = function() {
            AuthFct.facebookSignIn()
                .then(function(e) {
                    $state.go('main.catalog');
                });
        };

        self.signIn = function() {
            AuthFct.loginUser(self.user)
                .then(function(e) {
                    clean();
                    $state.go('main.catalog');
                })
                .catch(function(error) {
                    //console.log('Error ', e);
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            console.log("INVALID_EMAIL: The specified user account email is invalid.");
                            //$rootScope.addAlert("INVALID_EMAIL: The specified user account email is invalid.");
                            break;
                        case "INVALID_PASSWORD":
                            console.log("INVALID_PASSWORD: The specified user account password is incorrect.");
                            //$rootScope.addAlert("INVALID_PASSWORD: The specified user account password is incorrect.", 'danger');
                            break;
                        case "INVALID_USER":
                            console.log("INVALID_USER: The specified user account does not exist.");
                            //$rootScope.addAlert("INVALID_USER: The specified user account does not exist.");
                            break;
                        default:
                            console.log("COMMON ERROR: Error logging user in: ", error);
                        //$rootScope.addAlert("COMMON ERROR: Error logging user in");
                    }
                    $state.go('main.signin');
                });
        };
    }

    // @ngInject
    function modalSignInController(AuthFct, $state, $scope, $uibModal, $log) {
        var self = this;

        function clean() {
            self.user = {
                'email': null,
                'password': null,
                'fullname': null
            };
        }

        clean();

        $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            $log.debug($scope.message);

            var modalInstance = $uibModal.open({
                templateUrl: 'components/_auth/views/modal-form.html',
                controller: ModalFormCtrl,
                windowClass: 'center-modal',
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                self.user.email = $scope.selected.email;
                self.user.password = $scope.selected.password;
                self.signIn();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        self.facebookSignIn = function() {
            AuthFct.facebookSignIn()
                .then(function(e) {
                    $state.go('main.catalog');
                });
        };

        self.signIn = function() {
            AuthFct.loginUser(self.user)
                .then(function(e) {
                    clean();
                    $state.go('main.catalog');
                })
                .catch(function(error) {
                    //console.log('Error ', e);
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            console.log("INVALID_EMAIL: The specified user account email is invalid.");
                            //$rootScope.addAlert("INVALID_EMAIL: The specified user account email is invalid.");
                            break;
                        case "INVALID_PASSWORD":
                            console.log("INVALID_PASSWORD: The specified user account password is incorrect.");
                            //$rootScope.addAlert("INVALID_PASSWORD: The specified user account password is incorrect.", 'danger');
                            break;
                        case "INVALID_USER":
                            console.log("INVALID_USER: The specified user account does not exist.");
                            //$rootScope.addAlert("INVALID_USER: The specified user account does not exist.");
                            break;
                        default:
                            console.log("COMMON ERROR: Error logging user in: ", error);
                            //$rootScope.addAlert("COMMON ERROR: Error logging user in");
                    }
                    $state.go('main.signin');
                });
        };
    }

    // @ngInject
    var ModalFormCtrl = function ($scope, $state, $uibModalInstance, userForm, AuthFct) {
        function clean() {
            $scope.user = {
                'email': null,
                'password': null
            };
        }

        clean();

        $scope.form = {};
        $scope.submitForm = function () {
            if ($scope.form.userForm.$valid) {
                $uibModalInstance.close({ email: $scope.user.email, password: $scope.user.password });
            } else {
                console.log('userform is not in scope');
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.facebookLogin = function() {
            $uibModalInstance.dismiss('cancel');
            AuthFct.facebookSignIn()
                .then(function(e) {
                    $state.go('main.catalog');
                });
        };
    };

    // @ngInject
    function signOutController(AuthFct, $scope, $log) {
        $scope.logOut = function() {
            $log.debug('logOut');
            AuthFct.logOut();
        };
    }

    // @ngInject
    function signConfig($stateProvider, AppConfig) {
        $stateProvider
            .state(AppConfig.root_state + '.signin', {
                url: '^/signin',
                templateUrl: 'components/_auth/views/sign-in.html',
                controller: 'signInCtrl',
                controllerAs: 'sic'
            })
            .state(AppConfig.root_state + '.signup', {
                url: '^/signup',
                templateUrl: 'components/_auth/views/sign-up.html',
                controller: 'signUpCtrl',
                controllerAs: 'suc'
            });
    }

})();
