# Description
Simple WebdriverIO examples for standalone and testrunner use.

Includes examples for the use of chromedriver (chrome as a testing browser) and the testing framework "ava" in 
standalone use of wdio.

#### Standalone
One test: *wdio_standlone.js* for standalone testing with ava and chrome as the testing-browser

#### Testrunner
One test: *wdio_testrunner.js* for usage of the testrunner with configuration file

#Usage

####Standalone
* Start Selenium Standalone Server
* Start Chrome-Driver
* run ```npm test```

####Testrunner
* run ```node_modules/.bin/wdio wdio.conf.js```