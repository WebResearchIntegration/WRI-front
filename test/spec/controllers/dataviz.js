'use strict';

describe('Controller: DatavizCtrl', function () {

  // load the controller's module
  beforeEach(module('wriApp'));

  var DatavizCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatavizCtrl = $controller('DatavizCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DatavizCtrl.awesomeThings.length).toBe(3);
  });
});
