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
const args = [
  '--url-base=wd/hub',
  `--port=${port}`,
];

chromedriver.start(args);

const options = {
  port,
  desiredCapabilities: {
    browserName: browser
  }  
};

const client = webdriverio
  .remote(options)
  .on('error', e => console.error(e))
  .once('end', () => {
    chromedriver.stop();
  });

// load up page before executing tests
test.before(async (t) => {
  await client.init()
    .url('http://google.de/');
});

// close client after executing tests
test.after.always(async (t) => {
  await client.end();
});

test('has a title', (t) => client.isExisting('title').then(result => {
  t.true(result);
}));

test('has the right title', (t) => client.getTitle().then(result => {
  t.is(result, 'Google');
}));
