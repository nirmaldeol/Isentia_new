describe('imageGame', function() {

  // Load the module that contains the `image-game` component before each test
  beforeEach(module('gameApp'));

  // Test the controller
  describe('ImageGameController', function() {

    it('Check all the bindings with component', inject(function($rootScope ,$componentController) {
      var scope = $rootScope.$new();
     var element;
      var ctrl = $componentController('imageGame',{$scope:scope, $element :element},{rows: "3", columns:"3", "image-src":"../img/isentia.jpg"});


      expect(ctrl.rows).toBe(3);
      expect(ctrl.columns).toBe(3);
      expect(ctrl.imageSrc).toBe('../img/isentia.jpg');
    }));

  });

});