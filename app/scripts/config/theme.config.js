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
    themingProvider.definePalette('mustaskePrimary', {
      '50': '#bad9ee',
      '100': '#7db8de',
      '200': '#519fd3',
      '300': '#2c7bb0',
      '400': '#266a97',
      '500': '#20597f',
      '600': '#1a4867',
      '700': '#14374e',
      '800': '#0e2636',
      '900': '#07141d',
      'A100': '#bad9ee',
      'A200': '#7db8de',
      'A400': '#266a97',
      'A700': '#14374e',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 A100 A200'
    });

    //var backGroundBlue = themingProvider.extendPalette('blue', {
    //  '500': '20597F'
    //});
    //themingProvider.definePalette('backGround', backGroundBlue);


    themingProvider.theme('default')
      .primaryPalette('mustaskePrimary')
      .accentPalette('grey');
  }

})();
