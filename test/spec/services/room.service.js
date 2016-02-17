'use strict';

describe('Service: room.service', function () {

  // load the service's module
  beforeEach(module('mustaskeClientApp'));

  // instantiate service
  var room.service;
  beforeEach(inject(function (_room.service_) {
    room.service = _room.service_;
  }));

  it('should do something', function () {
    expect(!!room.service).toBe(true);
  });

});
