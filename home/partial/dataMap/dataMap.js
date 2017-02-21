angular.module('home').controller('DatamapCtrl',function($scope,endpoints){

    //Point locations
    $scope.GSLs = endpoints.getGasStationLocations();

    $scope.ESLs = endpoints.getEVStationLocations();

    $scope.ECSs = endpoints.getExistingChargingStations();



    const NUM_ALLOWED_DATA_POINTS = 4;
    const centralCoordinates = {
        lat: "42.276238",
        long: "-83.741310"
    };
    var numDataPointsActive = 0;
    var currentDataPoint = 0;
    var dataPointHash = [];

    $scope.img_url = 'https://maps.googleapis.com/maps/api/streetview?size=1000x500&location=' +  centralCoordinates.lat + ',' + centralCoordinates.long +'&heading=151.78&pitch=-0.76&key=AIzaSyApzRBeT_oR34kOUhGy275z4G6a6kLSwgQ';

    angular.extend($scope, {
        osloCenter: {
            lat: 59.91,
            lng: 10.75,
            zoom: 12
        },
        markers: {
            osloMarker: {
                lat: 59.91,
                lng: 10.75,
                message: "I want to travel here!",
                focus: true,
                draggable: false
            }
        },
        defaults: {
            scrollWheelZoom: false
        }
    });

    $scope.mapCheckBoxes = {
        commute_routes : false,
        service_stations : false,
        stops_lt_30 : false,
        parking : false,
        existing_chargers : false,
        poi : false,
        stops_gt_30 : false,
        sugg_char_station_location : false
    };

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
});


