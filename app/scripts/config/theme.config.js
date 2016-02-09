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
    themingProvider.definePalette(
      'mustaskePrimary', {
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

    var mustaskeAccent = {
      '50': '#ffffff',
      '100': '#f9f9f9',
      '200': '#ececec',
      '300': '#dfdfdf',
      '400': '#d3d3d3',
      '500': '#C6C6C6',
      '600': '#b9b9b9',
      '700': '#acacac',
      '800': '#a0a0a0',
      '900': '#939393',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#868686'
    };

    themingProvider.definePalette('mustaskeAccent', mustaskeAccent);

    themingProvider.theme('default')
      .primaryPalette('mustaskePrimary')
      .accentPalette('mustaskeAccent');
  }

})();
