'use strict';

describe('Directive: authorViewer', function () {

  // load the directive's module
  beforeEach(module('wriApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<author-viewer></author-viewer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the authorViewer directive');
  }));
});
