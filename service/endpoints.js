angular.module('smartCityUi').factory('endpoints',function($resource) {

    var endpoints = {};

    endpoints.getGasStationLocations = function() {
        var http = $resource('http://127.0.0.1:3000/gas_station_locations', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
        return http.query({});
    };

    endpoints.getEVStationLocations = function() {
        var http = $resource('http://127.0.0.1:3000/ev_station_locations', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
        return http.query({});
    };

    endpoints.getExistingChargingStations = function() {
        var http = $resource('http://127.0.0.1:3000/existing_charging_stations', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
        return http.query({});
    };


    return endpoints;
});
