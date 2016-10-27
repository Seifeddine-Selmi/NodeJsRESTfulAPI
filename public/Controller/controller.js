var myApp = angular.module('myApp', []);
 myApp.controller('AppCtrl', function ($scope, $http) {


var refresh = function() {
     $http.get('/contactlist').success(function (contactlist) {
        $scope.contactlist = contactlist.reverse();
        $scope.contact = "";
    });

 };

 refresh();

 
 $scope.addcontact = function () {
    $http.post('/contactlist', $scope.contact).success(function (reponse) {
        $scope.contactlist.unshift(reponse);
        //console.log('Added:', reponse);
        refresh();
    });
};

$scope.remove = function (id, contact) {
    $http.delete('/contactlist/' + id).success(function (res) {
        $scope.contactlist.splice($scope.contactlist.indexOf(contact), 1);
       // console.log('Deleted:', res, contact);
     
    });
};
$scope.edit = function (id, contact) {
    if (contact.contenteditable) {
        delete contact.contenteditable;
        $scope.update(id, contact);
    } else {
        contact.contenteditable = true;
    }

};
$scope.update = function (id, contact) {
    $http.put('/contactlist/' + id, contact).success(function (res) {
        // console.log('Updated:', res);
    });
};

});
