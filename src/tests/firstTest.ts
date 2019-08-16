import {browser} from 'protractor';
import {expect} from 'chai';
import * as puppeteer from 'puppeteer-core';
import * as request from 'request-promise-native';
import {TIMEOUT} from '../helpers/timeoutHelper';

describe('Example suite (1)', () => {

    it('Example test with connect Puppeteer', async () => {
        await browser.get('.');

        const capabilities = await browser.getCapabilities();
        const {debuggerAddress} = capabilities.get('goog:chromeOptions');

        const {webSocketDebuggerUrl} = await request({
            method: 'GET',
            uri: `http://${debuggerAddress}/json/version`,
            json: true
        });

        const devTools = await puppeteer.connect({
            browserWSEndpoint: webSocketDebuggerUrl
        });

        const target = await devTools.waitForTarget(t => t.type() === 'page');

        // const client  = await target.createCDPSession();
        // https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-class-cdpsession
        // https://chromedevtools.github.io/devtools-protocol/
        // await client.send('Network.enable');

        const page = await target.page();
        // https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-class-page

        // page.setDefaultTimeout(TIMEOUT.xl * 2);
        await page.setViewport(await browser.manage().window().getSize());

        await page.setRequestInterception(true);

        page.on('request', _request => {
            console.log('request ' + _request.url());
            _request.continue();
        });

        page.on('requestfailed', _request => {
            console.log('requestfailed ' + _request.url() + ' ' + _request.failure().errorText);
        });

        page.on('response', resp => {
            console.log('GOT A RESPONSE, YO', resp.status());
        });

        await page.goto('https://angular.io/assdsdsda');

        await browser.wait(browser.ExpectedConditions.invisibilityOf(browser.$('#page-not-found')), TIMEOUT.xl);

        const elemIsDisplayed = await browser.$('mat-sidenav-content').isDisplayed();
        expect(elemIsDisplayed).to.be.true;
    });
});
