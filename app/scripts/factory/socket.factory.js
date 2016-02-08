/**
 * @ngdoc service
 * @name mustaskeClientApp.socket
 * @description
 * # socket
 * Factory in the mustaskeClientApp.
 */
(function ()
{

  'use strict';

  angular.module('mustaskeClientApp')
    .factory('Socket', ['$log', 'socketFactory', Socket]);

  var logger;

  function Socket($log, socketFactory)
  {
    logger = $log;
    var ioSocket = io.connect();

    logger.debug('check 1', ioSocket.connected);
    ioSocket.on('connect', function() {
      logger.debug('check 2', ioSocket.connected);
    });

    return socketFactory(
      {
        ioSocket: ioSocket
      }
    );
  }

})();
