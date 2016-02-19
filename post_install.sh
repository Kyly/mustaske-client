#!/bin/bash
#npm install karma
#npm install phantomjs-prebuilt
#npm install jasmine-core
npm install grunt-contrib-compass --save-dev
gem update --system
gem install compass
./node_modules/bower/bin/bower install
./node_modules/grunt-cli/bin/grunt
bundle install

