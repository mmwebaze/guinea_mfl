$(document).ready(function () {

	"use strict";
	var URL = 'http://localhost:8181/dhis/api/';
	var organisationUnitGroups = [];
	
	function getOrganisationUnitGroups(){
		//var lengte = 0;
		var orgUnitGrpEndpoint = 'organisationUnitGroups.json';
		$.get(URL + orgUnitGrpEndpoint, function(data, status){
		    //alert("Data: " + data.organisationUnitGroups[0].displayName + "\nStatus: " + status);


            $.ajax({
			type: 'GET',
			url: URL + 'dataStore/facility/ownership',
			success: function (response) {
				//console.debug('Hello there > '+lengte)
				//organisationUnitGroups = response.organisationUnitGroups;
				console.debug('>>>>> '+response.public)
			},
			error: function (response) {

			}
		    })
		});

		console.debug($.fn.jquery);
		//return lengte;
	}
	
	function getFacilities(){
		var faEndpoint = 'organisationUnits.json?filter=organisationUnitGroups.name:eq:facility&filter=ancestors.id:eq:Kku1LsPfrLK&fields=name,id,shortName,organisationUnitGroups[id,displayName]';
		
		$.ajax({
			type: 'GET',
			url: URL + faEndpoint,
			success: function (response) {
				$.each(response.organisationUnits, function (i, item) {
                var ownership = '';
				for (i = 0; i < item.organisationUnitGroups.length; i++){
                    if('public' == item.organisationUnitGroups[i].displayName){
                        ownership = 'public';
                    }
                    if('private' == item.organisationUnitGroups[i].displayName){
                        ownership = 'private';
                    }


				}
                 console.debug('+++++++++++ '+ownership);
					$('#dashlet_1 .table > tbody:last').append("<tr><td>"+ item.id+"</td><td>"+item.name+"</td><td></td><td>"+ownership+"</td><td></td></tr>");
					console.debug(item.id + ' - ' + item.name);
				});
			},
			error: function (response) {

			}
		});
	}
	getFacilities();
	console.debug(getOrganisationUnitGroups());
});