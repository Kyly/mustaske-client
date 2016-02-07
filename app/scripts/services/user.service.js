/**
 * @ngdoc service
 * @name mustaskeClientApp.socket
 * @description
 * # socket
 * Service in the mustaskeClientApp.
 */

(function(){
  'use strict';

  angular.module('mustaskeClientApp')
    .service('UserService', [UserService]);

  var ctrl, user;
  function UserService()
  {
    ctrl = this;
    user = {};
  }

  UserService.prototype.setUser = function(newUser)
  {
    user = newUser;
  };

  UserService.prototype.setUserType = function(type)
  {
    user.type = type;
  };

  UserService.prototype.setUserId = function(id)
  {
    user.id = id;
  };

  UserService.prototype.setRoomName = function(roomName)
  {
    user.roomName = roomName;
  };

  UserService.prototype.getType = function()
  {
    return user.type;
  };

  UserService.prototype.isRoomOwner = function()
  {
    return user.type === 'owner';
  };

  UserService.prototype.getUserId = function()
  {
    return user.id;
  };

  UserService.prototype.getRoomName = function()
  {
    return user.roomName;
  };




})();
