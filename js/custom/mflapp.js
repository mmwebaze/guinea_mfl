/*jslint white:true */
/*global angular */
(function () {

	var app = angular.module('mfl_app', ['d2Menu', 'ngRoute', 'mflServices']);

	app.config(function ($routeProvider) {
		$routeProvider
			.when("/dashboard", {
				templateUrl: "partials/dashboard.html",
				controller: "dashlet_1"
			})
			.when("/settings", {
				templateUrl: "partials/settings.html"
			})
			.otherwise({
				redirectTo: "dashboard"
			});
	});
	app.controller("dashlet_1", function ($scope, FacilityOrgUnitService, getFacilityService) {
		$scope.facilityGroup;

		FacilityOrgUnitService.getFacilityOrgUnitGrp().then(function (result) {
			getFacilityService.getFacilities(result.data.organisationUnitGroup).then(function (response) {

				$scope.facilities = response.data.organisationUnits;
			});

			$scope.ownershipFilter = function (item) {
				if (item.displayName === 'public')
					return 'public';

				if (item.displayName === 'private')
					return 'private';
			}
		});
	});

	app.controller("orgunitsController", function ($scope, getOrganisationUnitsServuce) {
		getOrganisationUnitsServuce.getOrganisationUnits().then(function (result) {
			$scope.orgUnits = result.data.organisationUnits;
			console.debug($scope.orgUnits);
		});
	});

	app.controller("levelController", function ($scope, getLevelService) {
		getLevelService.getOrgUnitLevels().then(function (result) {
			$scope.levels = result.data.organisationUnitLevels;
			console.debug($scope.levels)
		});
	});
}());