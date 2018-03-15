/**
 * Webdriver IO Testrunner
 * Testing-Framework: mocha
 * Testing-Browser: dependent on configurations in wdio.conf.js
 */
const assert = require('assert');

// Displays correct title on page
describe('Wilhelm von Humboldt', () => {
  it('should have the correct title', () => {
    // go to webpage
    browser.url('https://wvh-briefe.bbaw.de/');
    // get the displayed title
    const title = browser.getTitle();
    // check if the displayed title is the desired title
    assert.equal(title, 'Wilhelm von Humboldt: Sprachwissenschaftliche Korrespondenz');
  });
});

describe('Alexander von Humboldt auf Reisen', () => {
  it('should have Reisetagebücher in the navbar', () => {
    browser.url('http://edition-humboldt.de/index.xql');
    assert.equal(browser.element('nav a:nth-child(1)').getText(), 'Reisetagebücher');
  });

  it('should lead to the Reisetagebücher page when clicked in the navbar', () => {
    browser
      .url('http://edition-humboldt.de/index.xql')
      .element('nav a:nth-child(1)')
      .click();

    assert.equal(browser.getUrl(), 'http://edition-humboldt.de/reisetagebuecher/index.xql');
  });
});

// Testing if search field gives suggestions after input
describe('Google search', () => {
  it('should give suggestions for searching', () => {
    // open google.de
    browser.url('http://google.de');

    // check if certain element in browser is visible
    // (element in google.de for displaying the research-suggestions)
    // - shouldn't be visible at this point
    const searchSuggestionBeforeInput = browser.isVisible('.gstl_0.sbdd_a');

    // Write "hal" in the search field
    browser.setValue('#lst-ib', 'hal');

    // wait for 100 ms
    browser.pause(100);

    // check if certain element in browser is visible
    // (element in google.de for displaying the research-suggestions)
    // - should be visible at this point
    const searchSuggestionAfterInput = browser.isVisible('.gstl_0.sbdd_a');
    assert.equal(searchSuggestionBeforeInput, false);
    assert.equal(searchSuggestionAfterInput, true);
  });
});

