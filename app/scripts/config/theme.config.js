(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .config(['$mdThemingProvider', '$mdIconProvider', Theme]);

  var themingProvider, iconProvider;

  function Theme($mdThemingProvider, $mdIconProvider)
  {
    themingProvider = $mdThemingProvider;
    iconProvider = $mdIconProvider;

    configureColors();
    configureIcons();
  }

  function configureIcons()
  {
    iconProvider.fontSet('fa', 'fontawesome');
  }

  function configureColors()
  {
    var backGroundBlue = themingProvider.extendPalette('blue', {
      '500': '20597F'
    });
    themingProvider.definePalette('backGround', backGroundBlue);


    themingProvider.theme('default')
      .primaryPalette('backGround')
      .accentPalette('grey');
  }

})();
