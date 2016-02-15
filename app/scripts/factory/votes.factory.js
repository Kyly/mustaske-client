/**
 * @ngdoc factory
 * @name mustaskeClientApp.votes
 * @description
 * # votes
 * Factory in the mustaskeClientApp.
 * Container for votes data
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .factory('Votes', ['$log', VotesDef]);

  var logger;

  function VotesDef($log)
  {
    logger = $log;
    return (Votes);
  }

  var datumn, datumnMap, totalVotes;

  function Votes(labels, data)
  {
    datumn = data;
    datumnMap = {};
    angular.forEach(
      labels, function (value)
      {
        datumnMap[value] = 0;
      });
    datumn[0] = _.values(datumnMap);
  }

  Votes.prototype.updateVotes = function (data)
  {
    angular.forEach(
      data, function (value, key)
      {
        datumnMap[key] = value;
      });

    var values = _.values(datumnMap);

    totalVotes = _.foldl(
      values, function (acc, data)
      {
        return acc + data;
      }, 0);

    if (totalVotes <= 0)
    {
      return;
    }

    datumn[0] = _.map(
      values, function (val)
      {
        return (val / totalVotes) * 100;
      });
  };

  Votes.prototype.getTotalVotes = function ()
  {
    return totalVotes;
  };

  Votes.prototype.getDatumn = function ()
  {
    return datumn;
  };

})();
