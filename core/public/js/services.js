/**
 * Created by Steven on 3/28/2016.
 */
 (function (){
    var app = angular.module('DataManager',[]);

    app.service('ProfileService', ['$http', function ($http){
        var self = this;
        self.profile = null;

        self.getStudentDataForId = function(id, callback){
            // console.log(id);
            if(!self.profile || self.profile._id !== id) {
                $http({
                    method: 'GET',
                    url: "http://localhost:8080/student/" + id,
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        'Authorization': 'bearer ' + getToken('auth')
                    }
                }).then(function (data) {
                    console.log('get student data:');
                    console.log(data.data);
                    self.profile = data.data;
                    callback(self.profile);
                }, function errorCallback(response) {
                    console.log('error occured: ' + response);
                    callback('', 'err');
                });
            } else {
                 callback(self.profile);
            }
        };

        self.getStudentDataForIds = function(ids, callback){
            console.log("get student data for ids:");
            console.log(ids);
            // console.log(id);
                $http({
                    method: 'POST',
                    url: "http://localhost:8080/student/getstudents",
                    data: {
                        "_ids": ids
                    },
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        'Authorization': 'bearer ' + getToken('auth')
                    }
                }).then(function (data) {
                    console.log('get multiple students data:');
                    console.log(data.data);
                    callback(data.data);
                }, function errorCallback(response) {
                    console.log('error occured: ');
                    console.log(response);
                    callback('', 'err');
                });
        };

    }]).service('CompanyService', ['$http', function ($http){
        var self = this;
        self.company = null;

        self.getCurrentCompany = function(id, callback){
            // console.log(id);
            if(!self.company || self.company._id !== id) {
                $http({
                    method: 'POST',
                    // TODO: replace this id when company login is done
                    url: "http://localhost:8080/company/getCurrentCompany",
                    // url: "http://localhost:8080/company/" + id,
                    data: {
                        "token": getToken('auth')
                    },
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        'Authorization': 'bearer ' + getToken('auth')
                    }
                }).then(function (data) {
                    console.log('get current company data:');
                    console.log(data.data);
                    // self.company = data.data;
                    callback(self.company);
                }, function errorCallback(response) {
                    console.log('error occured: ' + response);
                    callback('', 'err');
                });
            } else {
                 callback(self.company);
            }
        };

        self.getCompanyDataForId = function(id, callback){
            // console.log(id);
            if(!self.company || self.company._id !== id) {
                $http({
                    method: 'GET',
                    // TODO: replace this id when company login is done
                    url: "http://localhost:8080/company/" + 5066549580791808,
                    // url: "http://localhost:8080/company/" + id,
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        'Authorization': 'bearer ' + getToken('auth')
                    }
                }).then(function (data) {
                    console.log('get company data:');
                    console.log(data.data);
                    self.company = data.data;
                    callback(self.company);
                }, function errorCallback(response) {
                    console.log('error occured: ' + response);
                    callback('', 'err');
                });
            } else {
                 callback(self.company);
            }
        };

        self.addStudentToWishList = function (studentId, callback) {
            $http({
                method: 'POST',
                // TODO: replace this id when company login is done
                url: "http://localhost:8080/company/addStudent",
                // url: "http://localhost:8080/company/" + id,
                data: {
                    "id": 5066549580791808,
                    "studentId": studentId
                },
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': 'bearer ' + getToken('auth')
                }
            }).then(function (data) {
                callback(data);
            }, function errorCallback(response) {
                console.log('error occured: ' );
                console.log(response);
                callback('', 'err');
            });
        };

        self.removeStudentFromWishList = function (studentId, callback) {
            $http({
                method: 'POST',
                // TODO: replace this id when company login is done
                url: "http://localhost:8080/company/removeStudent",
                data: {
                    "id": 5066549580791808,
                    "studentId": studentId
                },
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': 'bearer ' + getToken('auth')
                }
            }).then(function (data) {
                callback(data);
            }, function errorCallback(response) {
                console.log('error occured: ');
                console.log(response);
                callback('', 'err');
            });
        };

        self.switchStudentsInWishList = function (student1Id, student2Id, callback) {
            $http({
                method: 'POST',
                // TODO: replace this id when company login is done
                url: "http://localhost:8080/company/switchStudents",
                data: {
                    "id": 5066549580791808,
                    "student1Id": student1Id,
                    "student2Id": student2Id
                },
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': 'bearer ' + getToken('auth')
                }
            }).then(function (data) {
                callback(data);
            }, function errorCallback(response) {
                console.log('error occured: ');
                console.log(response);
                callback('', 'err');
            });
        };

    }]).service('TechPointDashboardService',['$http', function ($http){
        var self = this;
        self.userSummaryData = null;

        self.queryUserSummaryData = function(callback){
            $http({
                method: 'GET',
                url: "http://localhost:8080/student",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': 'bearer '+getToken('auth')
                }
            }).then(function (data) {
                self.userSummaryData = data.data;
                callback(self.userSummaryData);
            }, function errorCallback(response) {
                console.log('error occured: '+response);
                console.log('Here: '+getToken('auth'));
                callback('','err');
            });
            // if(self.userSummaryData){
            //     $http({
            //         method: 'GET',
            //         url: "localhost:8080/student",
            //         headers: {
            //             'Content-Type': "application/json",
            //             'Accept': "application/json"
            //         }
            //     }).then(function (data) {
            //         self.userSummaryData = data.data;
            //         callback(self.userSummaryData);
            //     });
            // }
            // else{
            //     callback(self.userSummaryData);
            // }
        };
    }]).service('AuthService',['$http', function ($http) {
        var self = this;
        self.jwtToken = null;

        self.login = function(email,password,callback){
            $http.post("http://localhost:8080/auth/login",{"email":email, "password": password}).then(function(data) {
                self.jwtToken = data.data['token'];
                //console.log('Here: '+self.jwtToken);
                callback(self.jwtToken);
            }, function errorCallback(response) {
                console.log('error occured: '+response);
                callback('','err');
            });
        };
    }]);
})();
