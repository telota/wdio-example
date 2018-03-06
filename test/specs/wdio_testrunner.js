/**
 * Webdriver IO Testrunner
 * Testing-Framework: mocha
 * Testing-Browser: dependent on configurations in wdio.conf.js
 */

var assert = require('assert');
//Displays correct title on page
describe('load wvh page', function() {
    it('should have the right title', function () {
        browser.url('https://wvh-briefe.bbaw.de/');
        var title = browser.getTitle();
        assert.equal(title, 'Wilhelm von Humboldt: Sprachwissenschaftliche Korrespondenz');
    });
});


//Testing if search field gives suggestions after input
describe('Google search', function() {
    it('should give suggestions for searching', function () {
        browser.url('http://google.de');
        const searchSuggestionBeforeInput = browser.isVisible(".gstl_0.sbdd_a");
        browser.setValue('#lst-ib', "hal");
        browser.pause(100);
        const searchSuggestionAfterInput = browser.isVisible(".gstl_0.sbdd_a");
        assert.equal(searchSuggestionBeforeInput, false);
        assert.equal(searchSuggestionAfterInput, true);
    });
});



