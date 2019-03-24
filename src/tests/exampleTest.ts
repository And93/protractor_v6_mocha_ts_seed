import {browser} from "protractor";

describe('Example suite', () => {

    it('Example test', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    })
});
