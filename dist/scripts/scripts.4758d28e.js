!function(){"use strict";angular.module("mustaskeClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial","ngMessages","googlechart","btford.socket-io"])}(),function(){"use strict";function a(a){console.log("Routing was initialized"),a.otherwise({redirectTo:"/recent-questions"}),a.when("/recent-questions",{templateUrl:"views/recent-questions.view.html",controller:"RecentQuestionsController",controllerAs:"ctrl"}).when("/top-questions",{templateUrl:"views/top-questions.view.html",controller:"TopQuestionsController",controllerAs:"ctrl"}).when("/polls",{templateUrl:"views/polls.view.html",controller:"AboutController",controllerAs:"ctrl"}).when("/settings",{templateUrl:"views/settings.view.html",controller:"SettingsController",controllerAs:"ctrl"})}var b=angular.module("mustaskeClientApp");b.config(["$routeProvider",a])}(),function(){"use strict";function a(a,f){d=a,e=f,c(),b()}function b(){e.fontSet("fa","fontawesome")}function c(){d.definePalette("mustaskePrimary",{50:"#bad9ee",100:"#7db8de",200:"#519fd3",300:"#2c7bb0",400:"#266a97",500:"#20597f",600:"#1a4867",700:"#14374e",800:"#0e2636",900:"#07141d",A100:"#bad9ee",A200:"#7db8de",A400:"#266a97",A700:"#14374e",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 A100 A200"});var a={50:"#ffffff",100:"#f9f9f9",200:"#ececec",300:"#dfdfdf",400:"#d3d3d3",500:"#C6C6C6",600:"#b9b9b9",700:"#acacac",800:"#a0a0a0",900:"#939393",A100:"#ffffff",A200:"#ffffff",A400:"#ffffff",A700:"#868686"};d.definePalette("mustaskeAccent",a),d.theme("default").primaryPalette("mustaskePrimary").accentPalette("mustaskeAccent")}angular.module("mustaskeClientApp").config(["$mdThemingProvider","$mdIconProvider",a]);var d,e}(),function(){"use strict";angular.module("mustaskeClientApp").run(["$rootScope","$location",function(a,b){a.$on("$locationChangeStart",function(a,b,c){console.log("$locationChangeStart",a,"Next",b,"current",c)})}])}(),function(){"use strict";angular.module("mustaskeClientApp").directive("loginOverlay",function(){return{templateUrl:"views/login-overlay.tpl.html",restrict:"E",controller:"OverlayController",controllerAs:"ctrl"}})}(),function(){"use strict";function a(a,f,g){return c=a,d=f,e=g,{templateUrl:"views/question-card.tpl.html",restrict:"E",scope:{question:"="},link:b}}function b(a){a.hide=!0;var b={isUpVoted:!0};a.voteControls=b,a.detailToggle=function(){c.debug(a.hide),a.hide=!a.hide},a.upVote=function(a){a.hasVotedUp?a.hasVotedUp=!1:(a.hasVotedUp=!0,a.hasVotedDown&&(a.hasVotedDown=!1)),e.upVoteQuestion(a.question_id)},a.downVote=function(a){a.hasVotedDown?a.hasVotedDown=!1:(a.hasVotedDown=!0,a.hasVotedUp&&(a.hasVotedUp=!1)),e.downVoteQuestion(a.question_id)},a.isRoomOwner=d.isRoomOwner()}angular.module("mustaskeClientApp").directive("questionCard",["$log","UserService","SocketService",a]);var c,d,e}(),function(){"use strict";function a(a,e){return d=a,c=e,{templateUrl:"views/question-input-fab.tpl.html",restrict:"E",scope:{},link:b}}function b(a){a.openOpenBottomSheet=function(){c.show({templateUrl:"views/question-input-bottom-sheet.tpl.html",controller:"QuestionInputController",controllerAs:"ctrl",clickOutsideToClose:!1}).then(function(a){d.debug(a)})}}angular.module("mustaskeClientApp").directive("questionInputFab",["$log","$mdBottomSheet",a]);var c,d}(),function(){"use strict";function a(){return{templateUrl:"views/topbar.tpl.html",restrict:"E"}}angular.module("mustaskeClientApp").directive("topbar",[a])}(),function(){"use strict";function a(a){return c=a,{templateUrl:"views/clicker-input-button.tpl.html",restrict:"E",scope:{},link:b}}function b(a){a.openOpenBottomSheet=function(){c.show({templateUrl:"views/clicker-input-bottom-sheet.tpl.html",controller:"ClickerInputController",controllerAs:"ctrl",clickOutsideToClose:!1})}}angular.module("mustaskeClientApp").directive("clickerInput",["$mdBottomSheet",a]);var c}(),function(){"use strict";function a(a,b,h,i){e=a,d=h,f=b,g=i,c=this,c.events={JOIN_ROOM:"join room",CREATE_ROOM:"create room",NEW_QUESTION:"new question",UP_VOTE_QUESTION:"upvote question",DOWN_VOTE_QUESTION:"downvote question"}}function b(a){var b=f.defer();return d.on(a,function(c){e.debug("SocketService:response",a,c),c?b.resolve(c):b.reject(c)}),b.promise}angular.module("mustaskeClientApp").service("SocketService",["$log","$q","Socket","RoomService",a]);var c,d,e,f,g;a.prototype.joinRoom=function(a){return e.debug("SocketService#joinRoom:roomId:",a),d.emit(c.events.JOIN_ROOM,a),b(c.events.JOIN_ROOM)},a.prototype.createRoom=function(a){return e.debug("SocketService#createRoom:roomName:",a),d.emit(c.events.CREATE_ROOM,a),b(c.events.CREATE_ROOM)},a.prototype.newQuestion=function(a){e.debug("SocketService#newQuestion:question:",a),d.emit(c.events.NEW_QUESTION,a)},a.prototype.upVoteQuestion=function(a){var b=g.getRoomId();e.debug("SocketService#upVoteQuestion:questionId:",a,b),d.emit(c.events.UP_VOTE_QUESTION,{room_id:b,question_id:a})},a.prototype.downVoteQuestion=function(a){var b=g.getRoomId();e.debug("SocketService#upVoteQuestion:questionId:",a,b),d.emit(c.events.DOWN_VOTE_QUESTION,{room_id:b,question_id:a})},a.prototype.dismissQuestion=function(){},a.prototype.warnUser=function(){},a.prototype.newPoll=function(){},a.prototype.closePoll=function(){},a.prototype.io=function(){return d},a.prototype.deleteRoom=function(a){e.debug("SocketService#deleteRoom:roomId:",a),d.emit("leave room",a)}}(),function(){"use strict";function a(a,e){b=this,c=a,d=e}angular.module("mustaskeClientApp").service("SettingsService",["SocketService","UserService",a]);var b,c,d}(),function(){"use strict";function a(a){d=a,b=this,c={},e={},b.types={AUDIENCE:"audience",OWNER:"owner"},c.type=b.types.AUDIENCE}angular.module("mustaskeClientApp").service("UserService",["$log",a]);var b,c,d,e;a.prototype.setRoomData=function(a){angular.extend(e,a)},a.prototype.setUser=function(a){c=a},a.prototype.setUserType=function(a){c.type=a},a.prototype.setUserId=function(a){c.id=a},a.prototype.getType=function(){return c.type},a.prototype.isRoomOwner=function(){return"owner"===c.type},a.prototype.getUserId=function(){return c.id},a.prototype.getRoomName=function(){return e?e.room_name:void 0},a.prototype.getRoomId=function(){return e?e.room_id:void 0}}(),function(){"use strict";function a(a){c=a,d=this,b={room_name:"",room_id:"",questions:[],top_questions:[]}}angular.module("mustaskeClientApp").service("RoomService",["$log",a]);var b,c,d;a.prototype.setRoomData=function(a){b.room_name=a.room_name,b.room_id=a.room_id,a.questions&&a.questions.length>0&&b.questions.push.apply(b.questions,a.questions),a.top_questions&&a.top_questions.length>0&&b.top_questions.push.apply(b.top_questions,a.top_questions)},a.prototype.addQuestion=function(a){b.questions.unshift(a)},a.prototype.getTopQuestions=function(){return b.questions},a.prototype.getQuestions=function(){return b.questions},a.prototype.getRoomId=function(){return b.room_id},a.prototype.getRoomName=function(){return b.room_name},a.prototype.updateVote=function(a){angular.forEach(b.questions,function(b){b.question_id===a.question_id&&(b.question_score=a.question_score)})}}(),function(){"use strict";function a(a,c){b=a;var d=io.connect();return b.debug("check 1",d.connected),d.on("connect",function(){b.debug("check 2",d.connected)}),c({ioSocket:d})}angular.module("mustaskeClientApp").factory("Socket",["$log","socketFactory",a]);var b}(),function(){"use strict";function a(a,c,d,e,f,g){m=d,l=c,k=f,j=e,n=g,i=a,h=this,h.showRoom=!1,h.overlayHide=!1,h.isLeaving=!1,h.roomName="",b()}function b(){k.io().on("leave room",function(){l.appCtrl.selectedIndex=0,h.isLeaving=!0,h.roomName="",i.debug("Leave room"),h.overlayHide=!1})}function c(a){i.debug("Failed to join room: ",a)}function d(a){j.setRoomData(a),n.setRoomData(a),i.debug(j.getType()),i.debug(j.getRoomName()),m.roomName=j.getRoomName(),h.overlayHide=!0}function e(a){i.debug("Failed to join room: ",a)}function f(a){j.setRoomData(a),n.setRoomData(a),j.setUserType("owner"),i.debug(j.getType()),i.debug(j.getRoomName()),m.roomName=n.getRoomName(),m.roomId=n.getRoomId(),h.overlayHide=!0}var g=angular.module("mustaskeClientApp");g.controller("OverlayController",["$log","$scope","$rootScope","UserService","SocketService","RoomService",a]);var h,i,j,k,l,m,n;a.prototype.joinRoom=function(){k.joinRoom(h.roomName).then(d,c)},a.prototype.createRoom=function(){k.createRoom(h.roomName).then(f,e)},a.prototype.toggleAlias=function(){h.showRoom=!h.showRoom}}(),function(){"use strict";function a(a,c,h,i,j,k){e=h,f=j,g=k,d=this,d.selectedIndex=0,d.isFabOpen=!1,d.pages=[{label:"Recent Questions",url:"/recent-questions",icon:"fa fa-question-circle"},{label:"Top Questions",url:"/top-questions",icon:"fa fa-star"},{label:"Polls",url:"/polls",icon:"fa fa-bar-chart"},{label:"Settings",url:"/settings",icon:"fa fa-cog"}],a.$watch("appCtrl.selectedIndex",function(a){e.debug("Current: ",a),e.debug("Changed location too",d.pages[a].url),i(function(){c.url(d.pages[a].url)})}),b()}function b(){f.io().on(f.events.NEW_QUESTION,function(a){g.addQuestion(a)}),f.io().on(f.events.UP_VOTE_QUESTION,function(a){g.updateVote(a)}),f.io().on(f.events.DOWN_VOTE_QUESTION,function(a){g.updateVote(a)})}var c=angular.module("mustaskeClientApp");c.controller("AppController",["$scope","$location","$log","$timeout","SocketService","RoomService",a]);var d,e,f,g}(),function(){"use strict";function a(a,c){e=a,f=c,d=this,d.isOwner=!1,d.buttons=["A","B","C","D","E"],d.counter=0,d.isPollStarted=!0,b()}function b(){d.chartObject={},d.chartObject.type="ColumnChart",d.answerB=[{v:"B"},{v:3}],d.chartObject.data={cols:[{id:"t",label:"Answer",type:"string"},{id:"s",label:"Students",type:"number"}],rows:[{c:[{v:"A"},{v:3}]},{c:d.answerB},{c:[{v:"C"},{v:1}]},{c:[{v:"D"},{v:2}]},{c:[{v:"E"},{v:2}]}]},d.chartObject.options={title:"Poll Results"}}var c=angular.module("mustaskeClientApp");c.controller("AboutController",["$interval","$scope",a]);var d,e,f;a.prototype.setAnswer=function(a){this.answer=a,console.log(a)},a.prototype.startPoll=function(){var a=this;this.isPollStarted=!0,e(function(){a.counter++},1e3)},a.prototype.stopPoll=function(){console.log("called"),this.isPollStarted=!1}}(),function(){"use strict";function a(a,e){d=a,b=this,b.topIndex=0,c=e,b.questions=c.getQuestions(),d.debug("Questions: ",b.questions)}angular.module("mustaskeClientApp").controller("RecentQuestionsController",["$log","RoomService",a]);var b,c,d}(),function(){"use strict";function a(a,f,g){e=a,d=g,c=f,b=this,b.topIndex=0,b.topQuestions=d.getTopQuestions(),e.debug("Top Questions: ",b.topQuestions)}angular.module("mustaskeClientApp").controller("TopQuestionsController",["$log","SocketService","RoomService",a]);var b,c,d,e;a.prototype.zeroOrNull=function(a){return void 0!==a.question_score&&a.question_score>0}}(),function(){"use strict";function a(a,g,h,i){b=this,e=a,f=i,c=h,d=g,b.newQuestion=""}angular.module("mustaskeClientApp").controller("QuestionInputController",["$log","$mdBottomSheet","SocketService","RoomService",a]);var b,c,d,e,f;a.prototype.submitQuestion=function(a){var e={room_id:f.getRoomId(),question_text:b.newQuestion};c.newQuestion(e),d.hide(b.newQuestion),a&&a.preventDefault()}}(),function(){"use strict";function a(a,h,i,j){g=a,d=h,e=i,f=j,b=this,b.roomId=d.getRoomId(),c=e.isRoomOwner(),b.message=c?"Delete Room":"Leave Room"}angular.module("mustaskeClientApp").controller("SettingsController",["$log","RoomService","UserService","SocketService",a]);var b,c,d,e,f,g;a.prototype.removeRoom=function(){f.deleteRoom(b.roomId)}}(),function(){"use strict";function a(a,g,h,i){b=this,e=a,f=i,c=h,d=g,console.log("hello started clickers"),b.newAnswer="",b.buttons=["A","B","C","D","E"]}angular.module("mustaskeClientApp").controller("ClickerInputController",["$log","$mdBottomSheet","SocketService","RoomService",a]);var b,c,d,e,f;a.prototype.submitAnswer=function(a,b){console.log(b)}}();