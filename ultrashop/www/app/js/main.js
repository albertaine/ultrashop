;(function() {
	'use strict';

	angular
		.module('ultrashopApp', [
			//'ngAnimate',
			//'ngAria',
			//'ngCookies',
			//'ngMessages',
			//'ngResource',
			//'ngSanitize',
			//'ngTouch',
			'ui.bootstrap',
			//'ui.bootstrap.datetimepicker',
			'ui.router',
			//'treeGrid',
			//'pascalprecht.translate',
			//'ultrashop.lib',
			//'nasos.Directive',
			'ultrashop.Firebase',
			'ultrashop.Auth',
			'ultrashop.Sign',
			'ultrashop.Config',
			'ultrashop.NavBar',
			'ultrashop.Catalog',
			'ultrashop.Vacancies'//,
			//'nasos.Search',
			//'nasos.Handbooks'
		])
		.config([
			'$urlRouterProvider',
			'$stateProvider',
			'$logProvider',
			//'$translateProvider',
			//'NavBar.Localization',
			//'Search.Localization',
			//'Handbooks.Localization',

			function(
				$urlRouterProvider,
				$stateProvider,
				$logProvider,
				//$translateProvider,
				NavBar//,
				//Search,
				//Handbooks
			) {
/*
				var modules = [NavBar, Search, Handbooks];

				_.each(modules, function(module) {
					_.extend(en, module['en']);
					_.extend(ru, module['ru']);
				});

				$translateProvider.translations('en', en);
				$translateProvider.translations('ru', ru);

				$translateProvider.preferredLanguage('ru');
				$translateProvider.fallbackLanguage('en');

				$translateProvider.useSanitizeValueStrategy('escape');
*/
				$logProvider.debugEnabled(true);

				// if the path doesn't match any of the urls you configured
				// otherwise will take care of routing the user to the specified url
				$urlRouterProvider.when('', '/');
				$urlRouterProvider.otherwise('/');

			}
		])
		.run(['$rootScope', '$state', '$stateParams', '$log', function ($rootScope,   $state,   $stateParams, $log) {
			$log.debug('ultrashopApp.run');
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;

			$rootScope.currentUser = {
				fullName: null
			};
		}
		]);
})();
