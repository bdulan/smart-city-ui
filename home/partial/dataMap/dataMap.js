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

        $scope.gas_station_locations = true;

        var greenIcon = L.icon({
            iconUrl: '../../../assets/images/1381989347.png',
            shadowUrl: '../../../assets/images/1381989347.png',

            iconSize:     [30, 30], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        var GSLayer = [];
        for (var i = 0; i <$scope.GSLs.length-1; i++){
           // GSLayer.push(L.circle([parseFloat($scope.GSLs[i].lat), parseFloat($scope.GSLs[i].long)], 80, {"color": "#0000ff"}));
           GSLayer.push(L.marker([parseFloat($scope.GSLs[i].lat), parseFloat($scope.GSLs[i].long)],{icon: greenIcon}));
        }
        var gasStations = L.layerGroup(GSLayer);

        var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmR1bGFuIiwiYSI6ImNpemZzOTYyYTAwbncycW5ueWYyaHkyeTkifQ.Iotxd_KBWcont6Hggmal1g', {
            id: 'mapid',
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
        });

        var map = L.map('mapid', {
            center: [centralCoordinates.lat, centralCoordinates.long],
            zoom: 13,
            layers: [grayscale, gasStations]
        });

        var baseMaps = {
            "Grayscale": grayscale
        };

        var overlayMaps = {
            "Cities" : gasStations
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);

        // setTimeout(function () {
        //     map.removeLayer(gasStations);
        //     setTimeout(function () {
        //         map.addLayer(gasStations)
        //     },3000)
        // },10000)

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
        $scope.ToggleDataPointView = function(dataPoint){
            if ($scope.gas_station_locations == true){
                map.addLayer(gasStations)
            } else {
                map.removeLayer(gasStations)
            }
        }

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


