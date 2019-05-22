import {browser} from 'protractor';
import {getUsersList, setUser} from '../helpers/userProvider/userHelper';

describe('Example suite (1)', () => {

    it('Example test (1.1)', async () => {

        await setUser();
        await getUsersList();

        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });

    it('Example test (1.2)', async () => {
        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
        await browser.sleep(60000);
        await getUsersList();
    });
});
