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

  /* jshint ignore:start */
  /* This code confuses the linter :| */

  angular.module('mustaskeClientApp')
         .factory('Socket', ['$log', 'socketFactory', '$rootScope', '$mdToast', 'RoomService', Socket]);

  var logger;

  function Socket($log, socketFactory, $rootScope, $mdToast, RoomService)
  {
    logger                   = $log;
    var hasConnectionError   = false;
    var connectionAttempts   = 0;
    var createdConnection    = true;
    var ioSocket             = io.connect(undefined, {reconnectionAttempts: 5, multiplex: false});
    var connectionErrorToast = $mdToast
      .simple()
      .hideDelay(0)
      .action('Close')
      .highlightAction(true)
      .textContent('Error connecting to server... Trying to reconnect.');

    var failedReconnectToast = $mdToast
      .simple()
      .hideDelay(0)
      .action('Close')
      .highlightAction(true)
      .textContent('Unable to reconnect to server... \nTry refreshing page.');

    var disconnectedToast = $mdToast
      .simple()
      .hideDelay(0)
      .action('Close')
      .highlightAction(true)
      .textContent('You have tragically been disconnected. Refresh the page to reconnect to create/rejoin room.');

    ioSocket.on('connect', function () {

      if (hasConnectionError)
      {
        hasConnectionError = false;
        connectionAttempts = 0;
        $mdToast.hide();
      }

      logger.info('connected', ioSocket.connected);
    });

    ioSocket.on('connect_error', function (data) {
      logger.error('Error connecting to socket', data);

      if (!hasConnectionError)
      {
        hasConnectionError = true;
        $mdToast.show(connectionErrorToast);
      }
    });

    //ioSocket.on('disconnect', function () {
    //  logger.error('Disconnected from socket');
    //
    //  if (!hasConnectionError)
    //  {
    //    hasConnectionError = true;
    //    $mdToast.show(disconnectedToast);
    //  }
    //});

    ioSocket.on('reconnect_failed', function (data) {
      logger.error('Failed to reconnecting to socket', data);
      $mdToast.show(failedReconnectToast);

      if (RoomService.hasRoom()) {
        $rootScope.$emit('reconnect.failed');
      }
    });

    return socketFactory(
      {
        ioSocket: ioSocket
      }
    );

  }

  /* jshint ignore:end */
})();
