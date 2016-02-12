#!/bin/bash
npm install karma
npm install phantomjs-prebuilt
gem install compass
./node_modules/bower/bin/bower install
./node_modules/grunt-cli/bin/grunt
