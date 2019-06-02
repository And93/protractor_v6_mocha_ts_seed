import {browser} from 'protractor';
import {expect} from 'chai';

describe('Example suite (3)', () => {

    it('Example test (3.1)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        expect(elemIsDisplayed).to.be.true;
    });
});
