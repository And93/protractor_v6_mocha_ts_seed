import {browser} from 'protractor';
import {expect} from 'chai';
import {describe, it} from 'mocha';

const sizeWindow = {
    width: 1366,
    height: 768
};

describe('Example suite (1)', () => {

    it('Example test with connect Puppeteer', async () => {

        await browser.manage().window().setSize(sizeWindow.width, sizeWindow.height);
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        expect(elemIsDisplayed).to.be.true;
    });
});
