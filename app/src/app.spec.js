'use strict';
describe('Weather Module', function () {
    var ctrl, scope, httpBackend;
    // load the controller's module
    beforeEach(function () {
        module('myApp');
    });
    describe('myCtrl', function () {
        beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            ctrl = $controller('myCtrl', {
                $scope: scope
            });
        }));
        describe('#getTime', function () {
            it('should convert unixTimeStamp and return readable date', function () {
                var UnixTimeStamp = 1472579768; // Unix Timestamp for Tuesday, August 30th 2016
                expect(scope.getTime(UnixTimeStamp)).toBe('Tue, Aug 30th 2016');
            });
            it('should convert unixTimeStamp and return readable date', function () {
                var UnixTimeStamp = 1471824000; // Unix Timestamp for Monday, August 22nd 2016
                expect(scope.getTime(UnixTimeStamp)).toBe('Sun, Aug 21st 2016');
            });
        });
        describe('#dateOrdinals', function () {
            it('should return "st" as prefix as per the date, eg: 1st', function () {
                var date = 1; // date 1st 
                expect(scope.dateOrdinals(date)).toBe('1st');
            });
            it('should return "nd" as prefix as per the date, eg: 22nd', function () {
                var date = 22; // date 22nd 
                expect(scope.dateOrdinals(date)).toBe('22nd');
            });
            it('should return "rd" as prefix as per the date, eg: 3rd', function () {
                var date = 3; // date 3rd 
                expect(scope.dateOrdinals(date)).toBe('3rd');
            });
            it('should return "th" as prefix as per the date, eg: 4th', function () {
                var date = 4; // date 4th 
                expect(scope.dateOrdinals(date)).toBe('4th');
            });
        });
        describe('#init', function () {
            it('should call api and return data if no api error', function () {
                var fakeData = {
                    daily: {
                        data: [{
                                time: 1472540400
                                , apparentTemperatureMax: "75.79"
                                , apparentTemperatureMin: "57.96"
                                , summary: "Mostly cloudy in the morning."
                            }
                                , {
                                time: 1472626800
                                , apparentTemperatureMax: "72.33"
                                , apparentTemperatureMin: "57.23"
                                , summary: "Light rain starting in the afternoon."
                            }]
                    }
                };
                httpBackend.whenJSONP("https://api.forecast.io/forecast/3d03ddb61ef8a5ddd53233ee9dc2f308/47.6062,-122.3320?callback=JSON_CALLBACK").respond(200, fakeData);
                httpBackend.flush();
                expect(scope.data1).toEqual(fakeData.daily.data);
            });
            it('should call api and data1 is undefined if api error occurs', function () {
                var error = {};
                httpBackend.whenJSONP("https://api.forecast.io/forecast/3d03ddb61ef8a5ddd53233ee9dc2f308/47.6062,-122.3320?callback=JSON_CALLBACK").respond(404, error);
                httpBackend.flush();
                expect(scope.data1).not.toBeDefined();
            });
        });
    });
});