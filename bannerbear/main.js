import createImage from './image/createImage.js';
import contacts from '../data/apolloContacts.js';
import fs from 'fs';

let updatedContacts = contacts;
const createDynamicImages = async () => {
  for (const contact of updatedContacts) {
    const imageUrl = await createImage(contact);
    console.log('imageUrl: ', imageUrl);
    contact['Invite Image Url'] = imageUrl;
  }
  fs.writeFileSync(
    './updatedContacts',
    `export default ${JSON.stringify(updatedContacts)}`,
    'utf8'
  );
};

createDynamicImages();
