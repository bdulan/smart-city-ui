angular.module('home').controller('DatamapCtrl',function($scope,endpoints){

    //Point locations
    $scope.GSLs = endpoints.getGasStationLocations();

    $scope.ESLs = endpoints.getEVStationLocations();

    $scope.ECSs = endpoints.getExistingChargingStations();

    $scope.GSLs.$promise.then(function () {
        $scope.ESLs.$promise.then(function () {
            $scope.ECSs.$promise.then(function () {
                init();
            })
        })
    })

    var init = function () {

        const NUM_ALLOWED_DATA_POINTS = 4;
        const centralCoordinates = {
            lat: 42.27,
            long: -83.74
        };
        var numDataPointsActive = 0;
        var currentDataPoint = 0;
        var dataPointHash = [];

        var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
            denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
            aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
            golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

        var GSLayer = [];
        for (var i = 0; i <$scope.GSLs.length-1; i++){
           GSLayer.push(L.circle([parseFloat($scope.GSLs[i].lat), parseFloat($scope.GSLs[i].long)], 80, {"color": "#0000ff"}));
        }
        var gasStations = L.layerGroup(GSLayer);

        var cities = L.layerGroup([littleton, denver, aurora, golden]);

        var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmR1bGFuIiwiYSI6ImNpemZzOTYyYTAwbncycW5ueWYyaHkyeTkifQ.Iotxd_KBWcont6Hggmal1g', {
            id: 'mapid',
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
        });

        var map = L.map('mapid', {
            center: [39.73, -104.99],
            zoom: 10,
            layers: [grayscale, cities, gasStations]
        });

        var baseMaps = {
            "Grayscale": grayscale
        };

        var overlayMaps = {
            "Cities": cities,
            "Gas_Stations" : gasStations
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);

        setTimeout(function () {
            // map.removeLayer(cities);
        },10000)

/*

        The real code

        var mymap = L.map('mapid').setView([centralCoordinates.lat, centralCoordinates.long], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmR1bGFuIiwiYSI6ImNpemZzOTYyYTAwbncycW5ueWYyaHkyeTkifQ.Iotxd_KBWcont6Hggmal1g', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(mymap);

        var marker = L.marker([centralCoordinates.lat, centralCoordinates.long]).addTo(mymap);
        var center = L.circle([centralCoordinates.lat, centralCoordinates.long], 200, {"color": "#FF5500"}).addTo(mymap);
        var layerGroupPrime = L.layerGroup([center])



*/


        $scope.changeDataPointModel = function (dataPoint) {
            if ($scope.mapCheckBoxes[dataPoint] === true){
                addActiveDataPoint(dataPoint);
            } else {
                removeActiveDataPoint(dataPoint);
            }
        };

        var addActiveDataPoint = function (newDataPoint) {
            if (currentDataPoint > (NUM_ALLOWED_DATA_POINTS - 1)) {
                currentDataPoint = 0;
            }
            if (numDataPointsActive === NUM_ALLOWED_DATA_POINTS){
                $scope.mapCheckBoxes[dataPointHash[0]] = false;
                dataPointHash[0] = newDataPoint;
                currentDataPoint++;
            } else {
                numDataPointsActive++;
                dataPointHash.push(newDataPoint);
            }
        };

        var removeActiveDataPoint = function (oldDataPoint) {
            if (currentDataPoint > (NUM_ALLOWED_DATA_POINTS - 1)) {
                currentDataPoint = numDataPointsActive-1;
            }
            for(var i = 0; i<dataPointHash.length; i++){
                if (dataPointHash[i] === oldDataPoint){

                }
            }
            numDataPointsActive--;
        };

    }
});


