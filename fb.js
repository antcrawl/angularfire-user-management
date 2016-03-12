//controller
var myApp=angular.module('app', ['firebase']);
myApp.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        var ref = new Firebase("https://popping-torch-5533.firebaseio.com/check1");
        return $firebaseAuth(ref);
    }
]);

myApp.controller('loginController', ['$scope','$firebaseObject','$firebaseAuth','Auth',loginController]);
function loginController($scope,$firebaseObject,$firebase,Auth){
    $scope.auth = Auth;
    $scope.signInWithFB=function(facebook){

        // any time auth status updates, add the user data to scope
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
            console.log("AuthData>>>",$scope.authData);
        });
        $scope.auth.$authWithOAuthPopup(facebook).then(function(authData) {
            console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
            console.error("Authentication failed: ", error);
        });
    };
}
