#!/bin/bash
npm install karma
npm install phantomjs-prebuilt
npm install jasmine-core
gem install compass
npm install
./node_modules/bower/bin/bower install
./node_modules/grunt-cli/bin/grunt build
