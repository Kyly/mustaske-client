'use strict';

describe('Controller: QuestionCardControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('mustaskeClientApp'));

  var QuestionCardControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionCardControllerCtrl = $controller('QuestionCardControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(QuestionCardControllerCtrl.awesomeThings.length).toBe(3);
  });
});
