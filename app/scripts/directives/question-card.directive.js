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
    var voteControls = {
      isUpVoted: true
    };

    scope.voteControls = voteControls;

    scope.detailToggle = function()
    {
      logger.debug(scope.hide);
      scope.hide = !scope.hide;
    };

    scope.upVote = function (question)
    {
      if (!question.hasVotedUp)
      {
        question.hasVotedUp = true;
        if (question.hasVotedDown)
        {
          question.hasVotedDown = false;
        }
      } else {
        question.hasVotedUp = false;
      }
      socketService.upVoteQuestion(question.question_id);
    };

    scope.downVote = function (question)
    {
      if (!question.hasVotedDown)
      {
        question.hasVotedDown = true;
        if (question.hasVotedUp)
        {
          question.hasVotedUp = false;
        }
      } else {
        question.hasVotedDown = false;
      }
      socketService.downVoteQuestion(question.question_id);
    };

    scope.isRoomOwner = userService.isRoomOwner();
  }

})();
