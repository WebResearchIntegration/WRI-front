'use strict';

describe('Controller: PreviewerCtrl', function () {

  // load the controller's module
  beforeEach(module('wriApp'));

  var PreviewerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreviewerCtrl = $controller('PreviewerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PreviewerCtrl.awesomeThings.length).toBe(3);
  });
});
