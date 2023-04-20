import { askBigBrother } from './askBigBrother.js';
import askGPT from '../gpt/askGPT.js';
import prompts from '../gpt/prompts.js';
import contacts from '../data/apolloContacts.js';
// import contacts from '../data/just3contacts.js';
import fs from 'fs';

//takes in contact data
//ask big brother
//take big brother's answer to askgpt
//write emails to file

const flow = async () => {
  let contactsWithEmails = [];
  for (const contact of contacts) {
    const title = contact.Title;
    const bigBroAnswer = await askBigBrother(prompts.askBigBro(title));
    console.log('bigBroAnswer: ', bigBroAnswer);
    const email = await askGPT(prompts.bigBroToEmail(bigBroAnswer));
    console.log('email: ', email);
    contactsWithEmails.push({ ...contact, email });
  }
  fs.writeFileSync('emails.json', JSON.stringify(contactsWithEmails));
};

flow();
