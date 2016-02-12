(function ()
{
  'use strict';
  angular.module('mustaskeClientApp').run(
    function ($rootScope, $location)
    {
      //Do your $on in here, like this:
      $rootScope.$on(
        '$locationChangeStart', function (event, next, current)
        {
          console.log('$locationChangeStart', event, 'Next', next,'current', current);
          ////Do your things
          //if(!$rootScope.isFormValid()){
          //  //prevent location change.
          //  event.preventDefault();
          //}
        });
    });

})();
