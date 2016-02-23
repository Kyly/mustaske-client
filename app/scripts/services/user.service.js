/**
 * @ngdoc service
 * @name mustaskeClientApp.UserService
 * @description
 * # UserService
 * Service in the mustaskeClientApp.
 */

(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
         .service('UserService', ['$log', 'AppService', UserService]);

  var ctrl, user, logger, room;

  function UserService($log, AppService)
  {
    logger = $log;
    ctrl = this;
    ctrl.types = {
      AUDIENCE: 'audience',
      OWNER: 'owner'
    };

    init();
    _.once(AppService.manageClear(ctrl.clear));
  }

  function init() {
    user      = {answers: []};
    room      = {};
    user.type = ctrl.types.AUDIENCE;
  }

  UserService.prototype.clear = function ()
  {
    init();
  };

  UserService.prototype.setRoomData = function (data)
  {
    angular.extend(room, data);
  };

  UserService.prototype.setUser = function (newUser)
  {
    user = newUser;
  };

  UserService.prototype.setUserType = function (type)
  {
    user.type = type;
  };

  UserService.prototype.setUserId = function (id)
  {
    user.id = id;
  };

  UserService.prototype.getType = function ()
  {
    return user.type;
  };

  UserService.prototype.isRoomOwner = function ()
  {
    return user.type === 'owner';
  };

  UserService.prototype.getUserId = function ()
  {
    return user.id;
  };

  UserService.prototype.getRoomName = function ()
  {
    return room ? room.room_name : undefined;
  };

  UserService.prototype.getRoomId = function ()
  {
    return room ? room.room_id : undefined;
  };

  UserService.prototype.getAnswers = function ()
  {
    return user.answers;
  };

  UserService.prototype.addPollAnswer = function (answer)
  {
    if (!user.answers)
    {
      user.answers = [answer];
      return user.answers;
    }

    user.answers.push(answer);
    return user.answers;
  };

})();
