(function() {
    'use strict';
//angular game module with main controller and service
    angular
        .module('gameApp')
        .controller('MainController', MainController)
        .service('StorageService', LocalStorage)

//THis is Local Storage service to store current state of the game
    function LocalStorage($window) {

        this.setvalue = function(totalMoves, pieces) {
            $window.localStorage.setItem("savedMoves", totalMoves);
            $window.localStorage.setItem("pieces", JSON.stringify(pieces));


        }
        this.getvalue = function() {
            var savedMoves = JSON.parse($window.localStorage.getItem('savedMoves'));
            var pieces = JSON.parse($window.localStorage.getItem('pieces'));
            var value = {};
            value.savedMoves = savedMoves;
            value.pieces = pieces;
            return value;

        }


    };

    function MainController($scope) {
        var vm = this;

        vm.gameCompleted = gameCompleted;
        vm.totalMoves = 0;
        vm.message= false;
        /*Component bound fuction to get value from game component and
        display the message og game completion when message boolean 
        is set true

        */
        function gameCompleted(totalMoves, message) {
            vm.totalMoves = totalMoves;
            vm.message = message;
        }
    };
/*controller injectors*/
    MainController.$inject = ['$scope'];
    LocalStorage.$inject = ['$window'];
})();