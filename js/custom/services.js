var mflService = angular.module('mflServices', [])
var URL = 'http://localhost:8181/dhis/api/';

mflService.service('FacilityOrgUnitService', function ($http) {
	return {
		getFacilityOrgUnitGrp: function () {
			return $http.get('http://localhost:8181/dhis/api/dataStore/facility/facility');
		}
	}
});

mflService.service('getFacilityService', function ($http) {

	return {
		getFacilities: function (grpId) {
			var facilitiesURL = 'organisationUnits.json?filter=organisationUnitGroups.name:eq:' + grpId + '&filter=ancestors.level:eq:1&fields=name,id,shortName,organisationUnitGroups[id,displayName]';

			return $http.get(URL + facilitiesURL);
		}
	}
});

mflService.service('getOrganisationUnitsServuce', function ($http) {
	return {
		//var nonFacilitiesURL = 'organisationUnits.json?filter=organisationUnitGroups.name:ne:' + grpId + '&fields=name,id';

		getOrganisationUnits: function () {
			var nonFacilitiesURL = 'organisationUnits.json?fields=name,id';
			return $http.get(URL + nonFacilitiesURL);
		}
	}
});

mflService.service('getLevelService', function ($http) {
	return {
		getOrgUnitLevels: function () {
			return $http.get(URL + 'organisationUnitLevels?fields=id,name');
		}
	}
});