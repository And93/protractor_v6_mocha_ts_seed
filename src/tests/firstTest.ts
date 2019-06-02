import {browser} from 'protractor';
import {expect} from 'chai';

describe('Example suite (1)', () => {

    it('Example test (1.1)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        expect(elemIsDisplayed).to.be.true;
    });
});
