import {browser} from 'protractor';
import * as puppeteer from 'puppeteer-core';
import * as request from 'request-promise-native';
import {TIMEOUT} from '../helpers/timeoutHelper';

async function getElementByText(page: puppeteer.Page, elements: puppeteer.ElementHandle[], text: string) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const _text: string = await page.evaluate((el: HTMLElement) => el.innerText, element);
        console.log(_text);
        if (text === _text) {
            return element;
        }
    }
}

const sizeWindow = {
    width: 1366,
    height: 768
};

describe('Example suite (1)', () => {

    it('Example test with connect Puppeteer', async () => {

        await browser.manage().window().setSize(sizeWindow.width, sizeWindow.height);
        await browser.get('.');

        const capabilities = await browser.getCapabilities();

        const {debuggerAddress} = capabilities.get('goog:chromeOptions');

        const {webSocketDebuggerUrl} = await request({
            method: 'GET',
            uri: `http://${debuggerAddress}/json/version`,
            json: true
        });

        const devTools = await puppeteer.connect({
            browserWSEndpoint: webSocketDebuggerUrl,
            defaultViewport: sizeWindow
        });

        const target = await devTools.waitForTarget(t => t.type() === 'page');

        // https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-class-cdpsession
        // https://chromedevtools.github.io/devtools-protocol/
        // const client  = await target.createCDPSession();
        // await client.send('Network.enable');

        // https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-class-page
        const page = await target.page();

        // browser.puppeteer = page;

        // const iPhone = puppeteer.devices['iPhone 4'];
        // await page.emulate(iPhone);

        page.setDefaultTimeout(TIMEOUT.xl * 2);

        await page.setRequestInterception(true);

        page.on('request', (_request: puppeteer.Request) => {
            // console.log('request ' + _request.url());
            _request.continue();
        });

        page.on('requestfailed', (_request: puppeteer.Request) => {
            console.log('requestfailed ' + _request.url() + ' ' + _request.failure().errorText);
            console.log(_request.headers());
        });

        // page.on('response', (response: puppeteer.Response) => {
        //     console.log('GOT A RESPONSE, YO', response.status());
        //     console.log(response.securityDetails().protocol());
        // });
        //
        // page.on('requestfinished', _request => {
        //     console.log('requestfinished', _request.url() + ' ' + _request.response().status());
        // });

        await page.goto('https://www.epam.com/', {waitUntil: 'networkidle0'});
        await page.waitForSelector('[href="/careers"]', {visible: true});
        await page.click('[href="/careers"]');
        await page.waitForSelector('[data-view="searchForm"]', {visible: true});

        const input = await page.$x('//div[@class="recruiting-search__column"]/label[normalize-space(.)="Keyword or job ID"]/../input');
        await input[0].type('se');
        await page.waitForSelector('.autocomplete-suggestions', {visible: true});
        const suggestionsElms = await page.$$('.autocomplete-suggestion');
        const suggestion = await getElementByText(page, suggestionsElms, 'Security Engineer');
        await suggestion.click();

        await page.waitForXPath(
            '//div[@class="recruiting-search__column"]/label[normalize-space(.)="Location"]/../div/span',
            {
                visible: true
            }
        );

        const location = await page.$x('//div[@class="recruiting-search__column"]/label[normalize-space(.)="Location"]/../div/span');
        await location[0].click();

        await page.waitForNavigation({waitUntil: 'networkidle0'});
        // page.waitForRequest(urlOrPredicate[, options])

        await page.waitForSelector('.select2-results__options .open', {visible: true});
        const cities = await page.$$('.dropdown-cities li');

        const city = await getElementByText(page, cities, 'Polotsk');
        await city.click();

        await page.waitForNavigation({waitUntil: 'networkidle0'});

        await page.waitForSelector('.recruiting-search__submit', {visible: true});
        const submit = await page.$('.recruiting-search__submit');
        await submit.click();
        await page.waitForNavigation({waitUntil: 'networkidle0'});
    });
});
