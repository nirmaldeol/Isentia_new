(function() {
    'use strict';
//Game Component have  template url and controller and outward and inward bindings.
    angular
        .module('gameApp', [])
        .component('imageGame', {
            transclude: true,
            templateUrl: 'js/image-game/imagegame.html',
            controller: ImageGameController,
            bindings: {
                onCompleted: '&',
                imageSrc: '@',
                columns: '@',
                rows: '@'
            }
        });

/* IMage controller funtion for component controller have used storage service to save
LocalStorage variables and then paint the canvas and also methods to move the pieces 
I have used angularjs only then Jqueryand jquery=ui, As its not a good practices to mix 
angularjs with jquery.

*/ 
   function ImageGameController($scope, $element, $attrs, StorageService) {
        var ctrl = this;
        var swapFrom, swapTo, img;
        var pieces = [];
        var pieceWidth, pieceHeight;

        var canvas = $element.find("canvas")[0];
        var ctx = canvas.getContext("2d");

        var moveCount = 0;
        var message = false;
     ctrl.restart = restart;

 //Oninit function get called when page loads and it check for rows and col andset pieces.
        ctrl.$onInit = function onInit() {
            for (var y = 0; y < ctrl.rows; y++) {
                for (var x = 0; x < ctrl.columns; x++) {
                    pieces.push({
                        col: x,
                        row: y
                    });
                }
            }

            pieceWidth = canvas.width / ctrl.columns;
            pieceHeight = canvas.height / ctrl.rows;
            img = new Image();
            img.src = ctrl.imageSrc;
//Storage service get called and value stored are retrieved
            var StoredGame = StorageService.getvalue();
            //If loop to check values on Localstorage
            if (StoredGame.savedMoves !== null & StoredGame.pieces !== null) {
                moveCount = StoredGame.savedMoves;
                pieces = StoredGame.pieces;
                ctrl.onCompleted({totalMoves: moveCount, message: message });

                img.onload = start;
            } else {
                moveCount = 0;
                shuffle(pieces);
                img.onload = start;
            }
        };
//Restart button to restart game when completed
         function restart() {
            StorageService.setvalue(null, null);
            moveCount = 0;
            console.log(pieces);
            shuffle(pieces);
            message = false;
            ctrl.onCompleted({
                    totalMoves: moveCount,
                    message: message
                });

           start();
        }


//mousedown and mouseup event for differetn image pieces rectangles
//they look for rectangles and swap them when event happens
        ctrl.mousedown = function mousedown($event) {
            swapFrom = swapTo = getRectIndex($event.offsetX, $event.offsetY);
        };

        ctrl.mouseup = function mouseup($event) {
            swapTo = getRectIndex($event.offsetX, $event.offsetY);
            if (swapTo !== swapFrom) {
                swap(pieces, swapFrom, swapTo);
                render(pieces);

                if (isCompleted()) {
                    message = true;
                    StorageService.setvalue(null, null);
                    ctrl.onCompleted({
                        totalMoves: moveCount,
                        message: message
                    });

                } else {
                    StorageService.setvalue(moveCount, pieces);
                    message = false;
                    ctrl.onCompleted({
                        totalMoves: moveCount,
                        message: message
                    });
                }

            }

        };

        function start() {
             render(pieces);
               };
// tocheck if the pieces are in final order expected.
        function isCompleted() {
            moveCount++;

            function isSorted(element, index, array) {
                return element.col + element.row * ctrl.columns === index;
            }
            return pieces.every(isSorted);

        }
  //relative index gets calculated
        function getRectIndex(x, y) {
            return Math.floor(x / pieceWidth) + Math.floor(y / pieceHeight) * ctrl.rows;
        };

        function swap(arr, indexA, indexB) {
            var temp = arr[indexA];
            arr[indexA] = arr[indexB];
            arr[indexB] = temp;
        };

        function render(pieces) {
            var i = 0;
            for (var y = 0; y < ctrl.rows; y++) {
                for (var x = 0; x < ctrl.columns; x++) {
                    var p = pieces[i++];
                    ctx.drawImage(
                        img,
                        p.col * pieceWidth, p.row * pieceHeight, pieceWidth, pieceHeight,
                        x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight
                    );
                }
            }
        };

        function shuffle(a) {
            for (var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
            return a;
        };

    }
//Controller inject service to supply injections to component controller.
    ImageGameController.$inject = ['$scope', '$element', '$attrs', 'StorageService'];

})();