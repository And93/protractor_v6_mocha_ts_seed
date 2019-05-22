import {browser} from 'protractor';
import {getUsersList, setUser} from '../helpers/userProvider/userHelper';

describe('Example suite (3)', () => {

    it('Example test (3.1)', async () => {

        await setUser();
        await getUsersList();

        await browser.get('.');
        const elemIsDisplayed = await browser.$('#intro').isDisplayed();
        console.log(elemIsDisplayed);
    });
});
