'use strict';

describe('Service: textToolbar', function () {

  // load the service's module
  beforeEach(module('wriApp'));

  // instantiate service
  var textToolbar;
  beforeEach(inject(function (_textToolbar_) {
    textToolbar = _textToolbar_;
  }));

  it('should do something', function () {
    expect(!!textToolbar).toBe(true);
  });

});
