import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { promisify } from 'util';
import contacts from '../data/apolloContacts.js';
dotenv.config();

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

// const url = 'http://www.attaindata.io';
// const companyName = 'Attain';

const websiteScreenShot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });

  for (const contactObj of contacts) {
    const url = contactObj.Website;
    const companyName = contactObj.Company;

    const screenshotDir = `screenshots/${companyName}/website`;
    await createDirectory(screenshotDir);

    await page.goto(url, { waitUntil: 'load' });

    await page.screenshot({
      path: `screenshots/${companyName}/website/${companyName}website.png`,
    });
  }

  await browser.close();
};

websiteScreenShot();
export default websiteScreenShot;
