'use strict';

describe('Service: DataCollect', function () {

  // load the service's module
  beforeEach(module('wriApp'));

  // instantiate service
  var DataCollect;
  beforeEach(inject(function (_DataCollect_) {
    DataCollect = _DataCollect_;
  }));

  it('should do something', function () {
    expect(!!DataCollect).toBe(true);
  });

});
