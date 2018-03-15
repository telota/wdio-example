/**
 * WebdriverIO Standalone
 * Testing-Framework: Ava
 * Testing-Browser: Chrome /w chromedriver
 */
import test from 'ava';

const webdriverio = require('webdriverio');
const chromedriver = require('chromedriver');

const port = 4444;
// Change value to firefox if necessary
const browser = 'chrome';

// only necessary for chromedriver (Chrome as testing browser)
const args = [
  '--url-base=wd/hub',
  `--port=${port}`,
];
// only necessary for chromedriver (Chrome as testing browser)
chromedriver.start(args);

// options for webdriverIO,
const options = {
  port,
  desiredCapabilities: {
    browserName: browser,
  },
};

// creating client-object for easy use in tests
// start webdriverIo with previously configured options
const client = webdriverio
  .remote(options)
  // if an error occurs, print it to the console
  .on('error', e => console.error(e))
  // if "end"- action is called: stop the chromedriver
  .once('end', () => {
    chromedriver.stop();
  });

// load up page before executing tests
test.before(async (t) => {
  // open google.de
  await client.init()
    .url('http://google.de/');
});

// close client after executing tests
test.after.always(async (t) => {
  // end the client session
  await client.end();
});

// testing if loaded up page (google.de) has a title object
test('it has a title', t => client.isExisting('title').then((result) => {
  t.true(result);
}));

// testing if loaded up page (google.de) has the correct title
test('it has the correct title', t => client.getTitle().then((result) => {
  t.is(result, 'Google');
}));
