/**
 * WebdriverIO Standalone
 * Testing-Framework: Ava
 * Testing-Browser: Chrome /w chromedriver
 */
import test from 'ava';

let webdriverio = require('webdriverio');
const chromedriver = require('chromedriver');

const port = 9515;
const args = [
    '--url-base=wd/hub',
    `--port=${port}`
];
chromedriver.start(args);

const options = {
    port,
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

let client = webdriverio
    .remote(options)
    .on('error', (e) => console.error(e))
.once('end', () => {
    console.log('end');
chromedriver.stop();
});

//load up page before executing tests
test.before(async t => {
    await client.init()
        .url('http://google.de/');
});

//close client after executing tests
test.after.always(async t => {
    await client.end();
});

test('has a title', t => {
    return client.isExisting('title').then(result => {
        t.true(result);
});
});

test('has the right title', t => {
    return client.getTitle().then(result => {
        t.is(result, 'Google');
});
});
