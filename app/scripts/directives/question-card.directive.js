(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name mustaskeClientApp.directive:questionCard
   * @description
   * # questionCard
   */
  angular.module('mustaskeClientApp')
    .directive('questionCard', ['$log', 'UserService', 'SocketService', QuestionCard]);

  var logger, userService, socketService;
  function QuestionCard($log, UserService, SocketService)
  {
    logger = $log;
    userService = UserService;
    socketService = SocketService;

    return {
      templateUrl: 'views/question-card.tpl.html',
      restrict: 'E',
      scope: {
        question: '='
      },
      link: linkFn
    };
  }

  function linkFn(scope)
  {
    scope.hide = true;
    scope.upVoted = false;

    scope.detailToggle = function()
    {
      scope.hide = !scope.hide;
    };

    scope.upVote = function (questionId)
    {
      socketService.upVoteQuestion(questionId).then(upVoteSuccess, upVoteFailure);
    };

    scope.isRoomOwner = userService.isRoomOwner();

    function upVoteSuccess()
    {
      scope.upVoted = true;
    }

    function upVoteFailure()
    {
      scope.upVoted = false;
    }
  }

})();
