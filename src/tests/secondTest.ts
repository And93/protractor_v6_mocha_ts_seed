import {browser} from 'protractor';
import {expect} from 'chai';
import {describe, it, before, beforeEach, afterEach, after} from 'mocha';

describe('Example suite (2)', () => {

    before(() => console.log('START'));
    beforeEach(() => browser.get('.'));

    context('NEW DESCRIBE', () => {
        it('Example test (2.1)', async () => {
            const elemIsDisplayed = await browser.$('#intro').isDisplayed();
            expect(elemIsDisplayed).to.be.true;
        });
    });


    // describe(), context(), it(), specify(), before(), after(), beforeEach(), and afterEach()
    // describe() === context()
    // it() === specify()

    //
    // it('Example test (2.2)', async () => {
    //     const elemIsDisplayed = await browser.$('#intro').isDisplayed();
    //
    //     await browser.sleep(6000);
    //     expect(elemIsDisplayed).to.be.true;
    // });
    //
    // it('Example test (2.3)', async () => {
    //     const elemIsDisplayed = await browser.$('#intro').isDisplayed();
    //     expect(elemIsDisplayed).to.be.false;
    // });
    //
    // it.skip('Example test (2.4)', async () => {
    //     const elemIsDisplayed = await browser.$('#intro').isDisplayed();
    //     expect(elemIsDisplayed).to.be.false;
    // });

    afterEach(async () => await browser.executeScript(() => console.log(window)));
    after(() => console.log('FINISH'));
});
