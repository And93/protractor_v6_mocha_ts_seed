import {browser} from 'protractor';

describe('Example suite (3)', () => {

    it('Example test (3.1)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });
});
