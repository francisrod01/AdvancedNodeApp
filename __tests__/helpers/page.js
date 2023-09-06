const puppeteer = require('puppeteer');
const userFactory = require('../factories/userFactory');
const sessionFactory = require('../factories/sessionFactory');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page, browser);

    return new Proxy(customPage, {
      get: function(target, property) {
        return target[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page, browser) {
    this.page = page;
    this.browser = browser;
  }

  close() {
    return this.browser.close();
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: sig });
    // await this.page.goto('http://localhost:3000', {"waitUntil" : "networkidle0"});
    await this.page.goto('http://localhost:3000');
    await this.page.waitForSelector('a[href="/auth/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }
}

module.exports = CustomPage;
