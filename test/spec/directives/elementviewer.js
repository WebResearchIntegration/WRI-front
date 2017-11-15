'use strict';

describe('Directive: elementViewer', function () {

  // load the directive's module
  beforeEach(module('wriApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<element-viewer></element-viewer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the elementViewer directive');
  }));
});
