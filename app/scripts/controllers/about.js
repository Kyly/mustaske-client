(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name mustaskeClientApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the mustaskeClientApp
   */

  angular.module('mustaskeClientApp')
    .controller('AboutCtrl', ['UserService',AboutCtrl]);
  var ctrl,userService;
  function AboutCtrl(UserService)
  {
    ctrl = this;
    ctrl.hide=false;
    //get buttons for polls
    ctrl.answer='A';

    //get owner for ng-if
    userService=UserService;
    ctrl.isOwner=userService.isRoomOwner();

    //the charts existing part
    ctrl.chartObject = {};
    ctrl.chartObject.type = 'ColumnChart';
    ctrl.chartObject.data = {'cols': [
      {id: 't', label: '', type: 'string'},
      {id: 's', label: '', type: 'number'}
    ], 'rows': [
      {c: [
        {v: 'A'},
        {v: 3},
      ]},
      {c: [
        {v: 'B'},
        {v: 1},
      ]},
      {c: [
        {v: 'C'},
        {v: 2},
      ]},
      {c: [
        {v: 'D'},
        {v: 2},
      ]},
      {c: [
        {v: 'E'},
        {v: 2},
      ]}
    ]};
    ctrl.chartObject.options = {
      'title': 'Poll Results'
    };
  }


})();
