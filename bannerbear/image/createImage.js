import createImageConfig from './createImageConfig.js';
import getCompanyLogo from '../../puppeteer/websiteLogo.js';
import contacts from '../../data/apolloContacts.js';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const API_KEY = process.env.BANNERBEAR_API_KEY;

const getImageUrl = async (uid) => {
  console.log('getting image');
  const response = await axios.get(
    `https://api.bannerbear.com/v2/images/${uid}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data.self;
};
const createImage = async (contactObj) => {
  let logoUrl;
  try {
    logoUrl = await getCompanyLogo(contactObj);
  } catch (error) {
    console.log('error: ', error);
    // If the company logo is not found, use emergent layer's logo
    logoUrl = 'https://i.imgur.com/NdiFKTx.png';
  }
  const name = contactObj['First Name'];
  const title = contactObj.Title;
  const config = await createImageConfig(name, logoUrl, title);

  const response = await axios.post(
    'https://api.bannerbear.com/v2/images',
    config,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  const uid = response.data.uid;
  const imageUrl = await getImageUrl(uid);

  console.log('imageUrl: ', imageUrl);

  return imageUrl;
};

export default createImage;
