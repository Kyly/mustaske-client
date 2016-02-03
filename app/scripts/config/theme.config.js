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
    themingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('light-blue');
  }

})();
