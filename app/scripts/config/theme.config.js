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
        '50': '#3f7baf',
        '100': '#386e9c',
        '200': '#316189',
        '300': '#2a5377',
        '400': '#244664',
        '500': '#1D3951',
        '600': '#162c3e',
        '700': '#101f2b',
        '800': '#ffffff',
        '900': '#ffffff',
        'A100': '#4988be',
        'A200': '#5c94c5',
        'A400': '#6fa1cb',
        'A700': '#ffffff',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': '50 100 200 A100 A200'
      });

    //var mustaskeAccent = {
    themingProvider.definePalette(
      'mustaskeAccent',{
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#fbfbfb',
        '400': '#efefef',
        '500': '#E2E2E2',
        '600': '#d5d5d5',
        '700': '#c8c8c8',
        '800': '#bcbcbc',
        '900': '#afafaf',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#a2a2a2'
    });

    //themingProvider.definePalette('mustaskeAccent', mustaskeAccent);

    themingProvider.theme('default')
      .primaryPalette('mustaskePrimary')
      .accentPalette('mustaskeAccent');
  }

})();
