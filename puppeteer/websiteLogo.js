import puppeteer from 'puppeteer';

const delay = (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

const getCompanyLogo = async (contactObj) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });

  const companyLinkedinUrl = contactObj['Company Linkedin Url'];
  await page.goto(companyLinkedinUrl, { waitUntil: 'load' });
  await delay(1000);

  const logoSelector =
    '#organization_guest_contextual-sign-in > div > section > main > div > img';
  await page.waitForSelector(logoSelector);

  // Download the logo
  const logoUrl = await page.evaluate((selector) => {
    const imgElement = document.querySelector(selector);
    return imgElement.src;
  }, logoSelector);

  await browser.close();

  return logoUrl;
};

export default getCompanyLogo;
