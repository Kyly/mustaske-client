!function(){"use strict";angular.module("mustaskeClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial"])}(),function(){"use strict";function a(a){console.log("Routing was initialized"),a.otherwise({redirectTo:"/recent-questions"}),a.when("/recent-questions",{templateUrl:"views/recent-questions.view.html",controller:"RecentQuestionsController",controllerAs:"ctrl"}).when("/top-questions",{templateUrl:"views/top-questions.view.html",controller:"TopQuestionsController",controllerAs:"ctrl"}).when("/polls",{templateUrl:"views/polls.view.html",controller:"AboutCtrl"}).when("/settings",{templateUrl:"views/settings.view.html",controller:"AboutCtrl"})}var b=angular.module("mustaskeClientApp");b.config(["$routeProvider",a])}(),function(){"use strict";function a(a,f){d=a,e=f,c(),b()}function b(){e.fontSet("fa","fontawesome")}function c(){d.definePalette("mustaskePrimary",{50:"#bad9ee",100:"#7db8de",200:"#519fd3",300:"#2c7bb0",400:"#266a97",500:"#20597f",600:"#1a4867",700:"#14374e",800:"#0e2636",900:"#07141d",A100:"#bad9ee",A200:"#7db8de",A400:"#266a97",A700:"#14374e",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 A100 A200"}),d.theme("default").primaryPalette("mustaskePrimary").accentPalette("grey")}angular.module("mustaskeClientApp").config(["$mdThemingProvider","$mdIconProvider",a]);var d,e}(),function(){"use strict";function a(a,b,e,f){d=e,c=this,c.selectedIndex=0,c.isFabOpen=!1,c.pages=[{label:"Recent Questions",url:"/recent-questions",icon:"fa fa-question-circle"},{label:"Top Questions",url:"/top-questions",icon:"fa fa-star"},{label:"Polls",url:"/polls",icon:"fa fa-bar-chart"},{label:"Settings",url:"/settings",icon:"fa fa-cog"}],a.$watch("ctrl.selectedIndex",function(a){d.debug("Changed location too",c.pages[a].url),f(function(){b.url(c.pages[a].url)})})}var b=angular.module("mustaskeClientApp");b.controller("AppController",["$scope","$location","$log","$timeout",a]);var c,d}(),angular.module("mustaskeClientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("mustaskeClientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),function(){"use strict";function a(){b=this,b.showRoom=!1,b.overlayHide=!1}angular.module("mustaskeClientApp").directive("loginOverlay",function(){return{templateUrl:"views/login-overlay.tpl.html",restrict:"E",controller:a,controllerAs:"ctrl"}});var b;a.prototype.isLoggedIn=function(){b.overlayHide=!0},a.prototype.toggleAlias=function(){b.showRoom=!b.showRoom}}(),function(){"use strict";function a(){return{templateUrl:"views/question-card.tpl.html",restrict:"E",scope:{question:"="},link:b}}function b(a){a.hide=!0,a.datailToggle=function(){a.hide=!a.hide}}angular.module("mustaskeClientApp").directive("questionCard",[a])}(),function(){"use strict";function a(a){c=a,b=this,b.questions=[new c({text:"Here is some sample question?",votes:100}),new c({text:"I'm not a popular question?",votes:3}),new c({text:"How do you do things?",votes:50})]}angular.module("mustaskeClientApp").service("SocketService",["QuestionDef",a]);var b,c;a.prototype.getRecentQuestions=function(){return b.questions},a.prototype.getTopQuestions=function(){return b.topQuestions=[new c({text:"Here is some sample question?",votes:100}),new c({text:"How do you do things?",votes:50})],b.topQuestions}}(),function(){"use strict";function a(){function a(a){this.question=a}return a.prototype.getText=function(){return this.question.text},a.prototype.getVotes=function(){return this.question.votes},a}angular.module("mustaskeClientApp").factory("QuestionDef",[a])}(),function(){"use strict";function a(a,e){b=this,b.topIndex=0,d=a,c=e,b.questions=c.getRecentQuestions(),d.debug("Questions: ",b.questions)}angular.module("mustaskeClientApp").controller("RecentQuestionsController",["$log","SocketService",a]);var b,c,d}(),function(){"use strict";function a(a,e){b=this,b.topIndex=0,d=a,c=e,b.topQuestions=c.getTopQuestions()}angular.module("mustaskeClientApp").controller("TopQuestionsController",["$log","SocketService",a]);var b,c,d}();