'use strict';

describe('Service: Selector', function () {

  // load the service's module
  beforeEach(module('wriApp'));

  // instantiate service
  var Selector;
  beforeEach(inject(function (_Selector_) {
    Selector = _Selector_;
  }));

  it('should do something', function () {
    expect(!!Selector).toBe(true);
  });

});
