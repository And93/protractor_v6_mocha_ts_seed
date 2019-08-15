import {browser} from 'protractor';
import {expect} from 'chai';
import * as puppeteer from 'puppeteer-core';
import * as request from 'request-promise-native';

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

        // const cdpSession = await target.createCDPSession();
        // https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-class-cdpsession
        // https://chromedevtools.github.io/devtools-protocol/
        // await cdpSession.send('Network.enable');

        const page = await target.page();
        // https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-class-page

        await page.setRequestInterception(true);
        await page.on('request', interceptedRequest => {
            console.log(interceptedRequest.headers());
            interceptedRequest.continue();
        });

        await page.goto('https://angular.io/docs');

        const elemIsDisplayed = await browser.$('mat-sidenav-content').isDisplayed();
        expect(elemIsDisplayed).to.be.true;
    });
});
