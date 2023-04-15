import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { promisify } from 'util';
dotenv.config();
import contacts from '../data/apolloContacts.js';

const mkdir = promisify(fs.mkdir);

const delay = (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

const createDirectory = async (path) => {
  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
};

const testContactObj = {
  'First Name': 'Cameron',
  'Last Name': 'Smith',
  Title: 'Director, Accounting and FP&A',
  Company: 'Attain',
  'Company Name for Emails': 'Attain',
  Email: 'csmith@attaindata.io',
  'Email Status': 'Verified',
  'Email Confidence': '',
  Seniority: 'Director',
  Departments: 'Finance',
  'Contact Owner': 'phil@emergentlayer.app',
  'First Phone': "'+1 312-608-2815",
  'Work Direct Phone': '',
  'Home Phone': '',
  'Mobile Phone': '',
  'Corporate Phone': "'+1 312-608-2815",
  'Other Phone': '',
  Stage: 'Cold',
  Lists: 'FP&A - US - Information Technology/Computer Software/Internet',
  'Last Contacted': '',
  'Account Owner': 'phil@emergentlayer.app',
  '# Employees': 80,
  Industry: 'information technology & services',
  Keywords: '',
  'Person Linkedin Url': 'http://www.linkedin.com/in/cjosephsmith',
  Website: 'http://www.attaindata.io',
  'Company Linkedin Url': 'http://www.linkedin.com/company/attain-data',
  'Facebook Url': '',
  'Twitter Url': 'https://twitter.com/AttainData',
  City: 'Chicago',
  State: 'Illinois',
  Country: 'United States',
  'Company Address':
    '515 North State Street, Chicago, Illinois, United States, 60654',
  'Company City': 'Chicago',
  'Company State': 'Illinois',
  'Company Country': 'United States',
  'Company Phone': "'+1 312-608-2815",
  'SEO Description':
    'Attain provides marketers and strategists access to millions of consumers’ consented purchase data sourced from bank transactions, retail accounts, and receipts.',
  Technologies:
    'Gmail, Google Apps, Amazon AWS, Salesforce, Greenhouse.io, Mobile Friendly, Google Tag Manager',
  'Annual Revenue': '',
  'Total Funding': 60000000,
  'Latest Funding': 'Series A',
  'Latest Funding Amount': 60000000,
  'Last Raised At': '2021-08-16',
  'Email Sent': '',
  'Email Open': false,
  'Email Bounced': false,
  Replied: false,
  Demoed: false,
  'Number of Retail Locations': '',
  'Apollo Contact Id': '6433fc8c1486430001e18c66',
  'Apollo Account Id': '6433fc8f1486430001e19386',
};

export const login = async () => {
  const linkedinLogin = process.env.LINKEDIN_LOGIN;
  const linkedinPass = process.env.LINKEDIN_PASSWORD;

  const loginLinkedinUrl = 'https://www.linkedin.com/uas/login';

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });

  await page.goto(loginLinkedinUrl, { waitUntil: 'load' });

  // await page.type('#email-address', linkedinLogin);
  // await page.type('#password', linkedinPass);

  await page.waitForSelector('#username');
  await page.waitForSelector('#password');
  const emailInput = await page.$('#username');
  const passwordInput = await page.$('#password');
  await emailInput.type(linkedinLogin);
  await delay(1000);
  await passwordInput.type(linkedinPass);
  await page.click(
    '#organic-div > form > div.login__form_action_container > button'
  );

  //when linkedin redirect to their authWall after logging in... really annoying...
  try {
    await page.waitForSelector('#main-content > div > form > p > button', {
      timeout: 3000,
    });
    await page.click('#main-content > div > form > p > button');
    await page.waitForSelector('#session_key');
    await page.type('#session_key', linkedinLogin);
    await page.type('#session_password', linkedinPass);
  } catch (error) {}

  return page;
};

const linkedinProfileScreenShot = async () => {
  const page = await login();

  for (const contactObj of contacts) {
    const url = contactObj['Person Linkedin Url'];
    const companyName = contactObj.Company;
    const screenshotDir = `screenshots/${companyName}/people`;
    const apolloContactId = contactObj['Apollo Contact Id'];
    const parsedUrl = new URL(url);
    const pathSegments = parsedUrl.pathname.split('/');
    const urlSuffix = pathSegments.filter((segment) => segment).pop();

    await createDirectory(screenshotDir);

    await page.goto(url, { waitUntil: 'load' });

    await delay(1000); //just in case linkedin is being annoying and fake loads on me

    await page.screenshot({
      path: `${screenshotDir}/${apolloContactId}_${urlSuffix}.png`,
    });
  }
};

linkedinProfileScreenShot();
export default linkedinProfileScreenShot;
