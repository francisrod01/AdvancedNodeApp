const Page = require("./helpers/page");

let page;
const baseUrl = 'http://localhost:3000';

describe("header tests", () => {
  beforeEach(async () => {
    page = await Page.build();
    await page.goto(baseUrl);
  });

  afterEach(async () => {
    await page.close();
  });

  test("We can launch a browser", async () => {
    const text = await page.getContentsOf("a.brand-logo");

    expect(text).toEqual("Blogster");
  });

  test("clicking Log in starts OAuth flow", async () => {
    await page.click('a[href="/auth/google"]');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
  });

  test("When signed in, shows logout button", async () => {
    await page.login();

    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual("Logout");
  });
});
