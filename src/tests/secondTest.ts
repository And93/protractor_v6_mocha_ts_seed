import {browser} from 'protractor';
import {getUsersList, setUser} from '../helpers/userProvider/userHelper';

describe('Example suite (2)', () => {

    it('Example test (2.1)', async () => {

        await setUser();
        await getUsersList();

        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (2.2)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (2.3)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (2.4)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (2.5)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (2.6)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (2.7)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (2.8)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });
});
